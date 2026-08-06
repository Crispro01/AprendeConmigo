import { LessonPage } from "@/components/pages/LessonPage";
import { getLessonsForModule, getModules } from "@/lib/content";

export function generateStaticParams() {
  return getModules("alfabetizacion").flatMap((module) =>
    getLessonsForModule("alfabetizacion", module.id).map((lesson) => ({
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
      sectionId="alfabetizacion"
      moduleId={moduloId}
      lessonId={leccionId}
    />
  );
}
