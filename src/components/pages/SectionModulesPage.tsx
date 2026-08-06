import { getModules, getLessonsForModule } from "@/lib/content";
import { getSection, type SectionId } from "@/lib/sections";
import { ModuleCard } from "@/components/modules/ModuleCard";
import { Button } from "@/components/ui/Button";

export function SectionModulesPage({ sectionId }: { sectionId: SectionId }) {
  const section = getSection(sectionId)!;
  const modules = getModules(sectionId);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Button href="/" variant="ghost" className="mb-6">
        ⬅ Inicio
      </Button>
      <h1 className="mb-2 text-4xl font-extrabold">
        <span aria-hidden="true">{section.icon}</span> {section.title}
      </h1>
      <p className="mb-8 text-xl text-ink-soft">{section.description}</p>
      <div className="flex flex-col gap-6">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            sectionId={sectionId}
            module={module}
            totalLessons={getLessonsForModule(sectionId, module.id).length}
          />
        ))}
      </div>
    </div>
  );
}
