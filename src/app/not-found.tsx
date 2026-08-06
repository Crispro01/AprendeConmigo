import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 py-20 text-center">
      <span aria-hidden="true" className="text-7xl">
        🔎
      </span>
      <h1 className="text-3xl font-extrabold">No encontramos esta página</h1>
      <p className="text-xl text-ink-soft">
        Puede que el enlace esté mal escrito o que la lección ya no exista.
      </p>
      <Button href="/">⬅ Volver al inicio</Button>
    </div>
  );
}
