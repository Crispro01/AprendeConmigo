import type { SectionId } from "@/lib/sections";

const STORAGE_KEY = "progreso-v1";

export type LastLessonRef = {
  seccion: SectionId;
  moduloId: string;
  leccionId: string;
  tituloLeccion: string;
  tituloModulo: string;
};

export type ProgressData = {
  alfabetizacion: Record<string, Record<string, boolean>>;
  tecnologia: Record<string, Record<string, boolean>>;
  ultimaLeccion: LastLessonRef | null;
};

export const EMPTY_PROGRESS: ProgressData = {
  alfabetizacion: {},
  tecnologia: {},
  ultimaLeccion: null,
};

export function loadProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      alfabetizacion: parsed.alfabetizacion ?? {},
      tecnologia: parsed.tecnologia ?? {},
      ultimaLeccion: parsed.ultimaLeccion ?? null,
    };
  } catch {
    return EMPTY_PROGRESS;
  }
}

function saveProgress(data: ProgressData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // si no se puede guardar, el progreso solo dura la sesión actual
  }
}

export function markLessonComplete(
  data: ProgressData,
  section: SectionId,
  moduleId: string,
  lessonId: string,
  meta: { tituloLeccion: string; tituloModulo: string },
): ProgressData {
  const next: ProgressData = {
    ...data,
    [section]: {
      ...data[section],
      [moduleId]: {
        ...data[section][moduleId],
        [lessonId]: true,
      },
    },
    ultimaLeccion: {
      seccion: section,
      moduloId: moduleId,
      leccionId: lessonId,
      tituloLeccion: meta.tituloLeccion,
      tituloModulo: meta.tituloModulo,
    },
  };
  saveProgress(next);
  return next;
}

export function isLessonComplete(
  data: ProgressData,
  section: SectionId,
  moduleId: string,
  lessonId: string,
): boolean {
  return Boolean(data[section][moduleId]?.[lessonId]);
}

export function getModuleCompletedCount(
  data: ProgressData,
  section: SectionId,
  moduleId: string,
): number {
  const moduleProgress = data[section][moduleId];
  if (!moduleProgress) return 0;
  return Object.values(moduleProgress).filter(Boolean).length;
}

export function hasAnyProgress(data: ProgressData): boolean {
  return (
    Object.keys(data.alfabetizacion).length > 0 ||
    Object.keys(data.tecnologia).length > 0 ||
    data.ultimaLeccion !== null
  );
}

export function resetProgress(): ProgressData {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // si no se puede borrar del almacenamiento, igual reiniciamos en memoria
  }
  return EMPTY_PROGRESS;
}
