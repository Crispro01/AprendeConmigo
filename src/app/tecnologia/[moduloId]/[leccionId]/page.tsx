import { LessonPage } from "@/components/pages/LessonPage";
import { getLessonsForModule, getModules } from "@/lib/content";

export function generateStaticParams() {
  return getModules("tecnologia").flatMap((module) =>
    getLessonsForModule("tecnologia", module.id).map((lesson) => ({
      moduloId: module.id,
      leccionId: lesson.id,
    })),
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ moduloId: string; leccionId: string }>;
}) {
  const { moduloId, leccionId } = await params;
  return (
    <LessonPage
      sectionId="tecnologia"
      moduleId={moduloId}
      lessonId={leccionId}
    />
  );
}
