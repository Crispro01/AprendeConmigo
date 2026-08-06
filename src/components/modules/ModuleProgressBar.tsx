"use client";

import { ProgressBar } from "@/components/ui/ProgressBar";
import { useProgress } from "@/hooks/useProgress";
import type { SectionId } from "@/lib/sections";

type ModuleProgressBarProps = {
  sectionId: SectionId;
  moduleId: string;
  total: number;
};

export function ModuleProgressBar({
  sectionId,
  moduleId,
  total,
}: ModuleProgressBarProps) {
  const { completedCount } = useProgress();
  return <ProgressBar completed={completedCount(sectionId, moduleId)} total={total} />;
}
