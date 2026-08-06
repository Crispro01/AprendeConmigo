"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { TEXT_SIZE_STORAGE_KEY } from "@/lib/textSize";

export type TextSize = "normal" | "large" | "xlarge";

export const TEXT_SIZE_LABELS: Record<TextSize, string> = {
  normal: "Normal",
  large: "Grande",
  xlarge: "Muy grande",
};

type TextSizeContextValue = {
  size: TextSize;
  setSize: (size: TextSize) => void;
};

export const TextSizeContext = createContext<TextSizeContextValue | null>(
  null,
);

export function TextSizeProvider({ children }: { children: ReactNode }) {
  const [size, setSizeState] = useState<TextSize>("normal");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(TEXT_SIZE_STORAGE_KEY);
      if (stored === "normal" || stored === "large" || stored === "xlarge") {
        setSizeState(stored);
      }
    } catch {
      // localStorage no disponible, se queda en "normal"
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-text-size", size);
  }, [size]);

  const setSize = useCallback((next: TextSize) => {
    setSizeState(next);
    try {
      localStorage.setItem(TEXT_SIZE_STORAGE_KEY, next);
    } catch {
      // si falla el guardado, el tamaño igual se aplica en esta sesión
    }
  }, []);

  return (
    <TextSizeContext.Provider value={{ size, setSize }}>
      {children}
    </TextSizeContext.Provider>
  );
}
