// GitHub Pages sirve el sitio bajo /AprendeConmigo/, no en la raíz del
// dominio. next/link y next/image ajustan sus rutas a esto automáticamente,
// pero cualquier ruta escrita a mano (como las imágenes de las lecciones)
// no lo hace y debe pasar por withBasePath().
export const BASE_PATH =
  process.env.GITHUB_PAGES === "true" ? "/AprendeConmigo" : "";

export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`;
}
