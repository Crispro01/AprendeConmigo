import { Card } from "@/components/ui/Card";
import { ModuleProgressBar } from "@/components/modules/ModuleProgressBar";
import type { ModuleMeta } from "@/lib/schema";
import type { SectionId } from "@/lib/sections";

type ModuleCardProps = {
  sectionId: SectionId;
  module: ModuleMeta;
  totalLessons: number;
};

export function ModuleCard({ sectionId, module, totalLessons }: ModuleCardProps) {
  return (
    <Card href={`/${sectionId}/${module.id}`}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="text-5xl">
            {module.icon}
          </span>
          <div>
            <h3 className="text-2xl font-extrabold">{module.title}</h3>
            <p className="text-lg text-ink-soft">{module.description}</p>
          </div>
        </div>
        <ModuleProgressBar
          sectionId={sectionId}
          moduleId={module.id}
          total={totalLessons}
        />
      </div>
    </Card>
  );
}
