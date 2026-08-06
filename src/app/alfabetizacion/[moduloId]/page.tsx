import { ModuleLessonsPage } from "@/components/pages/ModuleLessonsPage";
import { getModules } from "@/lib/content";

export function generateStaticParams() {
  return getModules("alfabetizacion").map((module) => ({
    moduloId: module.id,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ moduloId: string }>;
}) {
  const { moduloId } = await params;
  return <ModuleLessonsPage sectionId="alfabetizacion" moduleId={moduloId} />;
}
