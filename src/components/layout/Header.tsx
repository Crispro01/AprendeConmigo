import Link from "next/link";
import { TextSizeControl } from "@/components/accessibility/TextSizeControl";

export function Header() {
  return (
    <header className="border-b-2 border-border bg-white print:hidden">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link
          href="/"
          className="text-2xl font-extrabold text-brand no-underline"
        >
          Aprende Conmigo
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/ayuda"
            className="flex min-h-12 items-center gap-2 rounded-2xl border-2 border-border px-4 py-2 text-lg font-bold text-ink hover:bg-brand-soft"
          >
            <span aria-hidden="true">❓</span> Ayuda
          </Link>
          <TextSizeControl />
        </div>
      </div>
    </header>
  );
}
