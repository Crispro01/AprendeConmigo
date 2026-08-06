export function PrintableTypeWord({ question }: { question: string }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-bold">{question}</p>
      <p className="text-base text-ink-soft">Escribe tu respuesta:</p>
      <div className="mt-2 h-8 border-b-2 border-ink" />
    </div>
  );
}
