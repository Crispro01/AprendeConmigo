"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { SectionId } from "@/lib/sections";
import {
  EMPTY_PROGRESS,
  getModuleCompletedCount,
  hasAnyProgress,
  isLessonComplete,
  loadProgress,
  markLessonComplete,
  resetProgress,
  type ProgressData,
} from "@/lib/progress";

type ProgressContextValue = {
  hydrated: boolean;
  data: ProgressData;
  markComplete: (
    section: SectionId,
    moduleId: string,
    lessonId: string,
    meta: { tituloLeccion: string; tituloModulo: string },
  ) => void;
  isComplete: (section: SectionId, moduleId: string, lessonId: string) => boolean;
  completedCount: (section: SectionId, moduleId: string) => number;
  hasProgress: boolean;
  reset: () => void;
};

export const ProgressContext = createContext<ProgressContextValue | null>(
  null,
);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ProgressData>(EMPTY_PROGRESS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setData(loadProgress());
    setHydrated(true);
  }, []);

  const markComplete = useCallback(
    (
      section: SectionId,
      moduleId: string,
      lessonId: string,
      meta: { tituloLeccion: string; tituloModulo: string },
    ) => {
      setData((prev) =>
        markLessonComplete(prev, section, moduleId, lessonId, meta),
      );
    },
    [],
  );

  const isComplete = useCallback(
    (section: SectionId, moduleId: string, lessonId: string) =>
      isLessonComplete(data, section, moduleId, lessonId),
    [data],
  );

  const completedCount = useCallback(
    (section: SectionId, moduleId: string) =>
      getModuleCompletedCount(data, section, moduleId),
    [data],
  );

  const reset = useCallback(() => {
    setData(resetProgress());
  }, []);

  return (
    <ProgressContext.Provider
      value={{
        hydrated,
        data,
        markComplete,
        isComplete,
        completedCount,
        hasProgress: hasAnyProgress(data),
        reset,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}
