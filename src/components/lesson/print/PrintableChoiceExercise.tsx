type PrintableChoiceExerciseProps = {
  question: string;
  options: string[];
};

export function PrintableChoiceExercise({
  question,
  options,
}: PrintableChoiceExerciseProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-bold">{question}</p>
      <p className="text-base text-ink-soft">
        Encierra en un círculo la respuesta correcta.
      </p>
      <ul className="flex flex-col gap-1">
        {options.map((option, index) => (
          <li key={index} className="flex items-center gap-2 text-lg">
            <span aria-hidden="true">○</span>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}
