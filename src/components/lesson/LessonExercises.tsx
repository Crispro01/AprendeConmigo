import type { Exercise } from "@/lib/schema";
import { ExerciseRenderer } from "@/components/lesson/exercises/ExerciseRenderer";
import { PrintableExerciseRenderer } from "@/components/lesson/print/PrintableExerciseRenderer";
import { ListenIconButton } from "@/components/tts/ListenIconButton";
import { exerciseToSpeechTexts } from "@/lib/exerciseSpeech";

export function LessonExercises({ exercises }: { exercises: Exercise[] }) {
  if (exercises.length === 0) return null;

  return (
    <section aria-labelledby="practica-heading" className="flex flex-col gap-6">
      <h2 id="practica-heading" className="text-3xl font-extrabold">
        Practica
      </h2>
      {exercises.map((exercise, index) => (
        <div
          key={index}
          className="rounded-2xl border-2 border-border bg-white p-6 print:rounded-none print:border-0 print:border-b print:border-ink print:p-0 print:py-4"
        >
          <div className="mb-4 flex justify-end print:hidden">
            <ListenIconButton
              texts={exerciseToSpeechTexts(exercise)}
              label={`el ejercicio ${index + 1}`}
            />
          </div>
          <div className="print:hidden">
            <ExerciseRenderer exercise={exercise} />
          </div>
          <div className="hidden print:block">
            <PrintableExerciseRenderer exercise={exercise} />
          </div>
        </div>
      ))}
    </section>
  );
}
