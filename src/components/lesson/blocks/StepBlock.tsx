export function StepBlock({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex items-start gap-4">
      <span
        aria-hidden="true"
        className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-brand text-2xl font-extrabold text-white"
      >
        {number}
      </span>
      <p className="pt-1 text-2xl leading-relaxed">
        <span className="sr-only">Paso {number}: </span>
        {text}
      </p>
    </div>
  );
}
