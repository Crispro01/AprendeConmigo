export function TipBlock({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border-2 border-brand bg-brand-soft p-4">
      <span aria-hidden="true" className="text-2xl">
        💡
      </span>
      <p className="text-xl leading-relaxed">
        <span className="font-bold">Consejo: </span>
        {text}
      </p>
    </div>
  );
}
