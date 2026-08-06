import { HelpContent } from "@/components/help/HelpContent";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Cómo usar esta página — Aprende Conmigo",
};

export default function AyudaPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Button href="/" variant="ghost" className="mb-6">
        ⬅ Inicio
      </Button>
      <h1 className="mb-2 text-4xl font-extrabold">Cómo usar esta página</h1>
      <p className="mb-8 text-xl text-ink-soft">
        Aquí tienes las cosas más importantes para saber antes de empezar.
      </p>
      <div className="rounded-3xl border-2 border-border bg-white p-6">
        <HelpContent />
      </div>
    </div>
  );
}
