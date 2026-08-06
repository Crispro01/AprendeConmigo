import { notFound } from "next/navigation";
import { getAdjacentLessons, getLesson, getModule } from "@/lib/content";
import type { SectionId } from "@/lib/sections";
import {
  LessonRenderer,
  blocksToSpeechTexts,
} from "@/components/lesson/LessonRenderer";
import { ListenButton } from "@/components/tts/ListenButton";
import { LessonExercises } from "@/components/lesson/LessonExercises";
import { LessonCompleteButton } from "@/components/lesson/LessonCompleteButton";
import { LessonNavigation } from "@/components/lesson/LessonNavigation";
import { PrintButton } from "@/components/lesson/PrintButton";
import { Button } from "@/components/ui/Button";

type LessonPageProps = {
  sectionId: SectionId;
  moduleId: string;
  lessonId: string;
};

export function LessonPage({ sectionId, moduleId, lessonId }: LessonPageProps) {
  const module = getModule(sectionId, moduleId);
  const lesson = getLesson(sectionId, moduleId, lessonId);
  if (!module || !lesson) notFound();

  const { previous, next } = getAdjacentLessons(sectionId, moduleId, lessonId);
  const speechTexts = [lesson.title, ...blocksToSpeechTexts(lesson.content)];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Button
        href={`/${sectionId}/${moduleId}`}
        variant="ghost"
        className="mb-6 print:hidden"
      >
        ⬅ {module.title}
      </Button>

      <h1 className="mb-6 text-4xl font-extrabold">{lesson.title}</h1>

      <div className="mb-6 hidden gap-8 text-lg print:flex">
        <p>
          Nombre: <span className="inline-block w-48 border-b-2 border-ink">&nbsp;</span>
        </p>
        <p>
          Fecha: <span className="inline-block w-32 border-b-2 border-ink">&nbsp;</span>
        </p>
      </div>

      <div className="mb-8 flex flex-wrap items-start gap-4">
        <ListenButton texts={speechTexts} />
        <PrintButton />
      </div>

      <div className="mb-10">
        <LessonRenderer blocks={lesson.content} />
      </div>

      <div className="mb-10">
        <LessonExercises exercises={lesson.exercises} />
      </div>

      <div className="mb-8 print:hidden">
        <LessonCompleteButton
          sectionId={sectionId}
          moduleId={moduleId}
          lessonId={lessonId}
          lessonTitle={lesson.title}
          moduleTitle={module.title}
        />
      </div>

      <div className="print:hidden">
        <LessonNavigation
          sectionId={sectionId}
          moduleId={moduleId}
          previous={previous}
          next={next}
        />
      </div>
    </div>
  );
}
