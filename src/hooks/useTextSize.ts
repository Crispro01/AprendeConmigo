"use client";

import { useContext } from "react";
import { TextSizeContext } from "@/context/TextSizeContext";

export function useTextSize() {
  const ctx = useContext(TextSizeContext);
  if (!ctx) {
    throw new Error("useTextSize debe usarse dentro de TextSizeProvider");
  }
  return ctx;
}
