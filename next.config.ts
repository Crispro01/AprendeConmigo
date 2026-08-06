import type { NextConfig } from "next";

// GitHub Pages publica el sitio bajo /AprendeConmigo/ (el nombre del repo),
// no en la raíz del dominio. GITHUB_PAGES lo activa solo en ese build; en
// desarrollo local y en otros hostings (Vercel, dominio propio) queda vacío.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "AprendeConmigo";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isGithubPages ? `/${repoName}` : "",
  trailingSlash: true,
};

export default nextConfig;
