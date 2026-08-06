import { SECTIONS } from "@/lib/sections";
import { Card } from "@/components/ui/Card";
import { ContinueCard } from "@/components/modules/ContinueCard";
import { ResetProgressButton } from "@/components/modules/ResetProgressButton";
import { WelcomeCard } from "@/components/help/WelcomeCard";

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-2 text-4xl font-extrabold">Bienvenido</h1>
      <p className="mb-8 text-xl text-ink-soft">
        Elige qué quieres aprender hoy. Puedes ir a tu ritmo, sin apuros.
      </p>

      <WelcomeCard />

      <ContinueCard />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {SECTIONS.map((section) => (
          <Card key={section.id} href={`/${section.id}`}>
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <span aria-hidden="true" className="text-6xl">
                {section.icon}
              </span>
              <h2 className="text-2xl font-extrabold">{section.title}</h2>
              <p className="text-lg text-ink-soft">{section.description}</p>
            </div>
          </Card>
        ))}
      </div>

      <ResetProgressButton />
    </div>
  );
}
