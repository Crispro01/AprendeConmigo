import type { MetadataRoute } from "next";
import { withBasePath } from "@/lib/basePath";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aprende Conmigo — Alfabetización y tecnología",
    short_name: "Aprende Conmigo",
    description:
      "Lecciones gratuitas de lectura, escritura y tecnología básica para personas adultas mayores.",
    start_url: withBasePath("/"),
    display: "standalone",
    background_color: "#FFFDF7",
    theme_color: "#0B5FFF",
    lang: "es",
    icons: [
      {
        src: withBasePath("/icon.svg"),
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
