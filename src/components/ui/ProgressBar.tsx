type ProgressBarProps = {
  completed: number;
  total: number;
  label?: string;
};

export function ProgressBar({ completed, total, label }: ProgressBarProps) {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div>
      {label && (
        <p className="mb-1 text-base font-semibold text-ink-soft">{label}</p>
      )}
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${completed} de ${total} lecciones completadas`}
        className="h-4 w-full overflow-hidden rounded-full bg-brand-soft"
      >
        <div
          className="h-full rounded-full bg-brand transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-1 text-base text-ink-soft">
        {completed} de {total} lecciones completadas
      </p>
    </div>
  );
}
