import type { ContentBlock } from "@/lib/schema";
import { TextBlock } from "@/components/lesson/blocks/TextBlock";
import { StepBlock } from "@/components/lesson/blocks/StepBlock";
import { TipBlock } from "@/components/lesson/blocks/TipBlock";
import { AnalogyBlock } from "@/components/lesson/blocks/AnalogyBlock";
import { ImageBlock } from "@/components/lesson/blocks/ImageBlock";

export function LessonRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "text":
            return <TextBlock key={index} text={block.text} />;
          case "step":
            return (
              <StepBlock key={index} number={block.number} text={block.text} />
            );
          case "tip":
            return <TipBlock key={index} text={block.text} />;
          case "analogy":
            return <AnalogyBlock key={index} text={block.text} />;
          case "image":
            return <ImageBlock key={index} src={block.src} alt={block.alt} />;
        }
      })}
    </div>
  );
}

export function blocksToSpeechTexts(blocks: ContentBlock[]): string[] {
  return blocks
    .map((block) => {
      if (block.type === "text") return block.text;
      if (block.type === "step") return `Paso ${block.number}. ${block.text}`;
      if (block.type === "tip") return `Consejo: ${block.text}`;
      if (block.type === "analogy") return `Piénsalo así: ${block.text}`;
      return null;
    })
    .filter((t): t is string => Boolean(t));
}
