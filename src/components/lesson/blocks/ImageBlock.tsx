import { withBasePath } from "@/lib/basePath";

export function ImageBlock({ src, alt }: { src: string; alt: string }) {
  const isFilePath = src.startsWith("/");

  if (isFilePath) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={withBasePath(src)}
        alt={alt}
        loading="lazy"
        className="mx-auto max-h-64 w-auto rounded-2xl"
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className="flex justify-center py-2 text-8xl leading-none"
    >
      <span aria-hidden="true">{src}</span>
    </div>
  );
}
