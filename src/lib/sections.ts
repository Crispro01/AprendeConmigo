export type SectionId = "alfabetizacion" | "tecnologia";

export type SectionMeta = {
  id: SectionId;
  title: string;
  description: string;
  icon: string;
};

export const SECTIONS: SectionMeta[] = [
  {
    id: "alfabetizacion",
    title: "Aprender a leer y escribir",
    description:
      "Lecciones paso a paso: letras, palabras, lectura, escritura y números.",
    icon: "📖",
  },
  {
    id: "tecnologia",
    title: "Aprender a usar el celular",
    description:
      "Lecciones paso a paso: el celular, WhatsApp, internet y trámites en línea.",
    icon: "📱",
  },
];

export function getSection(id: string): SectionMeta | undefined {
  return SECTIONS.find((s) => s.id === id);
}
