import fs from "node:fs";
import path from "node:path";
import {
  LessonSchema,
  ModulesFileSchema,
  type Lesson,
  type ModuleMeta,
} from "@/lib/schema";
import type { SectionId } from "@/lib/sections";

const CONTENT_ROOT = path.join(process.cwd(), "content");

function readJson(filePath: string): unknown {
  const raw = fs.readFileSync(filePath, "utf-8");
  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(
      `No se pudo leer el archivo de contenido "${filePath}": el JSON no es válido.\n${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
}

export function getModules(sectionId: SectionId): ModuleMeta[] {
  const filePath = path.join(CONTENT_ROOT, sectionId, "modules.json");
  const raw = readJson(filePath);
  const result = ModulesFileSchema.safeParse(raw);
  if (!result.success) {
    throw new Error(
      `Error en "${filePath}":\n${result.error.issues
        .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
        .join("\n")}`,
    );
  }
  return [...result.data].sort((a, b) => a.order - b.order);
}

export function getModule(
  sectionId: SectionId,
  moduleId: string,
): ModuleMeta | undefined {
  return getModules(sectionId).find((m) => m.id === moduleId);
}

export function getLessonsForModule(
  sectionId: SectionId,
  moduleId: string,
): Lesson[] {
  const dirPath = path.join(CONTENT_ROOT, sectionId, moduleId);
  if (!fs.existsSync(dirPath)) return [];

  const files = fs
    .readdirSync(dirPath)
    .filter((f) => f.endsWith(".json"))
    .sort();

  const lessons = files.map((file) => {
    const filePath = path.join(dirPath, file);
    const raw = readJson(filePath);
    const result = LessonSchema.safeParse(raw);
    if (!result.success) {
      throw new Error(
        `Error en "${filePath}":\n${result.error.issues
          .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
          .join("\n")}`,
      );
    }
    return result.data;
  });

  return lessons.sort((a, b) => a.order - b.order);
}

export function getLesson(
  sectionId: SectionId,
  moduleId: string,
  lessonId: string,
): Lesson | undefined {
  return getLessonsForModule(sectionId, moduleId).find(
    (l) => l.id === lessonId,
  );
}

type FlatLesson = { moduleId: string; lesson: Lesson };

function getAllLessons(sectionId: SectionId): FlatLesson[] {
  const modules = getModules(sectionId);
  return modules.flatMap((module) =>
    getLessonsForModule(sectionId, module.id).map((lesson) => ({
      moduleId: module.id,
      lesson,
    })),
  );
}

export type AdjacentLessonRef = {
  moduleId: string;
  lessonId: string;
  title: string;
};

export function getAdjacentLessons(
  sectionId: SectionId,
  moduleId: string,
  lessonId: string,
): { previous: AdjacentLessonRef | null; next: AdjacentLessonRef | null } {
  const flat = getAllLessons(sectionId);
  const index = flat.findIndex(
    (item) => item.moduleId === moduleId && item.lesson.id === lessonId,
  );
  if (index === -1) return { previous: null, next: null };

  const toRef = (item: FlatLesson | undefined): AdjacentLessonRef | null =>
    item
      ? {
          moduleId: item.moduleId,
          lessonId: item.lesson.id,
          title: item.lesson.title,
        }
      : null;

  return {
    previous: toRef(flat[index - 1]),
    next: toRef(flat[index + 1]),
  };
}
