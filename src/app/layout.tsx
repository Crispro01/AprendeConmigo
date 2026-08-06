import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import { TextSizeProvider } from "@/context/TextSizeContext";
import { ProgressProvider } from "@/context/ProgressContext";
import { textSizeInitScript } from "@/lib/textSize";
import { withBasePath } from "@/lib/basePath";
import { Header } from "@/components/layout/Header";
import { SkipToContent } from "@/components/layout/SkipToContent";

const bodyFont = Atkinson_Hyperlegible({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const title = "Aprende Conmigo — Alfabetización y tecnología";
const description =
  "Lecciones sencillas y gratuitas de lectura, escritura y tecnología básica para personas adultas mayores.";

// Actualizar con el dominio real una vez desplegado, para que las vistas
// previas de WhatsApp/redes usen la URL correcta en vez de localhost.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  manifest: withBasePath("/manifest.webmanifest"),
  openGraph: {
    title,
    description,
    type: "website",
    locale: "es_EC",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B5FFF",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${bodyFont.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: textSizeInitScript() }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <TextSizeProvider>
          <ProgressProvider>
            <SkipToContent />
            <Header />
            <main id="contenido-principal" className="flex-1">
              {children}
            </main>
          </ProgressProvider>
        </TextSizeProvider>
      </body>
    </html>
  );
}
