import { z } from "zod";

export const ContentBlockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("text"), text: z.string() }),
  z.object({ type: z.literal("step"), number: z.number(), text: z.string() }),
  z.object({ type: z.literal("tip"), text: z.string() }),
  z.object({ type: z.literal("analogy"), text: z.string() }),
  z.object({ type: z.literal("image"), src: z.string(), alt: z.string() }),
]);
export type ContentBlock = z.infer<typeof ContentBlockSchema>;

export const ExerciseSchema = z.discriminatedUnion("type", [
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
    pairs: z
      .array(z.object({ left: z.string(), right: z.string() }))
      .min(2),
  }),
]);
export type Exercise = z.infer<typeof ExerciseSchema>;

export const LessonSchema = z.object({
  id: z.string(),
  moduleId: z.string(),
  title: z.string(),
  order: z.number(),
  estimatedMinutes: z.number().optional(),
  content: z.array(ContentBlockSchema).min(1),
  exercises: z.array(ExerciseSchema).default([]),
});
export type Lesson = z.infer<typeof LessonSchema>;

export const ModuleMetaSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  order: z.number(),
});
export type ModuleMeta = z.infer<typeof ModuleMetaSchema>;

export const ModulesFileSchema = z.array(ModuleMetaSchema);
