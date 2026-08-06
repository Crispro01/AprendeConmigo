type Pair = { left: string; right: string };

type PrintableMatchPairsProps = {
  instructions: string;
  pairs: Pair[];
};

const LETTERS = ["A", "B", "C", "D", "E", "F"];

function rotatedOrder(length: number): number[] {
  if (length <= 1) return [0];
  return Array.from({ length }, (_, i) => (i + 1) % length);
}

export function PrintableMatchPairs({
  instructions,
  pairs,
}: PrintableMatchPairsProps) {
  const rightOrder = rotatedOrder(pairs.length);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-bold">{instructions}</p>
      <p className="text-base text-ink-soft">
        Escribe la letra que corresponde en la línea de cada número.
      </p>
      <div className="mt-2 grid grid-cols-2 gap-x-8 gap-y-2">
        <div className="flex flex-col gap-2">
          {pairs.map((pair, index) => (
            <div key={`left-${index}`} className="flex items-center gap-2 text-lg">
              <span className="inline-block w-10 border-b-2 border-ink text-center">
                {index + 1}
              </span>
              <span>{pair.left}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {rightOrder.map((pairIndex, position) => (
            <div key={`right-${pairIndex}`} className="flex items-center gap-2 text-lg">
              <span aria-hidden="true">{LETTERS[position] ?? position + 1}.</span>
              <span>{pairs[pairIndex].right}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
