import fs from "node:fs";
import path from "node:path";
import { z } from "zod";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const SECTIONS = ["alfabetizacion", "tecnologia"];

const ContentBlockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("text"), text: z.string() }),
  z.object({ type: z.literal("step"), number: z.number(), text: z.string() }),
  z.object({ type: z.literal("tip"), text: z.string() }),
  z.object({ type: z.literal("analogy"), text: z.string() }),
  z.object({ type: z.literal("image"), src: z.string(), alt: z.string() }),
]);

const ExerciseSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("multiple-choice"),
    question: z.string(),
    options: z.array(z.string()).min(2),
    correctIndex: z.number().int().min(0),
  }),
  z.object({
    type: z.literal("fill-in-the-blank-choice"),
    question: z.string(),
    options: z.array(z.string()).min(2),
    correctIndex: z.number().int().min(0),
  }),
  z.object({
    type: z.literal("type-word"),
    question: z.string(),
    answer: z.string(),
  }),
  z.object({
    type: z.literal("match-pairs"),
    instructions: z.string(),
    pairs: z.array(z.object({ left: z.string(), right: z.string() })).min(2),
  }),
]);

const LessonSchema = z.object({
  id: z.string(),
  moduleId: z.string(),
  title: z.string(),
  order: z.number(),
  estimatedMinutes: z.number().optional(),
  content: z.array(ContentBlockSchema).min(1),
  exercises: z.array(ExerciseSchema).default([]),
});

const ModuleMetaSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  order: z.number(),
});

let errorCount = 0;

function reportError(filePath, issues) {
  errorCount += 1;
  console.error(`\n✖ Error en ${path.relative(process.cwd(), filePath)}`);
  for (const issue of issues) {
    console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
  }
}

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");
  try {
    return JSON.parse(raw);
  } catch (error) {
    errorCount += 1;
    console.error(`\n✖ Error en ${path.relative(process.cwd(), filePath)}`);
    console.error(`  - El archivo no tiene un formato JSON válido: ${error.message}`);
    return null;
  }
}

for (const sectionId of SECTIONS) {
  const sectionDir = path.join(CONTENT_ROOT, sectionId);
  const modulesPath = path.join(sectionDir, "modules.json");

  if (!fs.existsSync(modulesPath)) {
    errorCount += 1;
    console.error(`\n✖ No se encontró ${path.relative(process.cwd(), modulesPath)}`);
    continue;
  }

  const modulesRaw = readJson(modulesPath);
  if (modulesRaw === null) continue;

  const modulesResult = z.array(ModuleMetaSchema).safeParse(modulesRaw);
  if (!modulesResult.success) {
    reportError(modulesPath, modulesResult.error.issues);
    continue;
  }

  const seenIds = new Set();
  for (const module of modulesResult.data) {
    if (seenIds.has(module.id)) {
      errorCount += 1;
      console.error(`\n✖ Módulo repetido "${module.id}" en ${path.relative(process.cwd(), modulesPath)}`);
    }
    seenIds.add(module.id);

    const moduleDir = path.join(sectionDir, module.id);
    if (!fs.existsSync(moduleDir)) {
      console.warn(
        `\n⚠ El módulo "${module.id}" no tiene carpeta de lecciones todavía (${path.relative(process.cwd(), moduleDir)}).`,
      );
      continue;
    }

    const files = fs.readdirSync(moduleDir).filter((f) => f.endsWith(".json"));
    const lessonIds = new Set();

    for (const file of files) {
      const filePath = path.join(moduleDir, file);
      const raw = readJson(filePath);
      if (raw === null) continue;

      const result = LessonSchema.safeParse(raw);
      if (!result.success) {
        reportError(filePath, result.error.issues);
        continue;
      }

      if (result.data.moduleId !== module.id) {
        errorCount += 1;
        console.error(`\n✖ Error en ${path.relative(process.cwd(), filePath)}`);
        console.error(
          `  - moduleId: dice "${result.data.moduleId}" pero debería ser "${module.id}" (el nombre de la carpeta).`,
        );
      }

      if (lessonIds.has(result.data.id)) {
        errorCount += 1;
        console.error(
          `\n✖ Lección repetida "${result.data.id}" dentro del módulo "${module.id}"`,
        );
      }
      lessonIds.add(result.data.id);
    }
  }
}

if (errorCount > 0) {
  console.error(`\n${errorCount} error(es) encontrados en el contenido.\n`);
  process.exit(1);
} else {
  console.log("✔ Todo el contenido es válido.");
}
