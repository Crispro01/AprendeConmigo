# 📖 Aprende Conmigo

**Alfabetización y tecnología básica para personas adultas mayores.**

Un sitio web gratuito y de acceso libre — sin registro, sin cuentas, sin backend — con lecciones de lectura, escritura, números y uso del celular, pensado desde cero para personas con poca o ninguna experiencia digital.

Proyecto de vinculación con la sociedad.

[![Publicado en GitHub Pages](https://github.com/Crispro01/AprendeConmigo/actions/workflows/deploy.yml/badge.svg)](https://github.com/Crispro01/AprendeConmigo/actions/workflows/deploy.yml)
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)
![Sin backend](https://img.shields.io/badge/backend-ninguno%2C_sitio_est%C3%A1tico-0B5FFF)

---

## ✨ Qué incluye

- **118 lecciones** repartidas en 10 módulos de alfabetización (vocales, consonantes, sílabas, palabras, lectura, escritura, números y dinero) y 8 módulos de tecnología (el celular, WhatsApp, videollamadas, internet, seguridad y trámites en línea).
- **720 ejercicios de práctica** — opción múltiple, completar palabra, escribir palabra y emparejar tocando la pantalla — con al menos 10 por lección en los temas de letras y de sumas/restas, para poder repasar.
- **Texto a voz** en cada lección y en cada ejercicio, usando la Web Speech API del navegador (sin archivos de audio, sin costo).
- **Analogías** en cada lección, para relacionar conceptos nuevos con cosas de la vida diaria.
- **Diseño accesible**: tipografía Atkinson Hyperlegible, tamaño de letra ajustable (A / A+ / A++), alto contraste, botones grandes, sin límites de tiempo.
- **Progreso local**, sin cuentas: cada lección completada se guarda en el propio dispositivo, con opción de reiniciarlo.
- **Hoja de práctica imprimible** por lección, lista para usarse en papel o guardarse como PDF.
- **100 % estático**: no depende de ningún servidor ni base de datos (ver el porqué en [`docs/informe-vinculacion.md`](docs/informe-vinculacion.md)).

## 🧩 Cómo funciona

Todo el contenido educativo vive en `content/`, en archivos JSON simples y validados, separados por completo del código. Cualquier persona voluntaria puede agregar o corregir una lección sin tocar una sola línea de código — la guía está en [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md).

```
content/
├── alfabetizacion/   10 módulos, 65 lecciones
└── tecnologia/        8 módulos, 50 lecciones
```

## 🛠️ Stack técnico

- [Next.js](https://nextjs.org) 16 (App Router) + React 19 + TypeScript, exportado como sitio estático.
- [Tailwind CSS](https://tailwindcss.com) v4, para el sistema de diseño accesible.
- [zod](https://zod.dev), para validar el contenido en tiempo de compilación.
- Web Speech API del navegador, para la lectura en voz alta.
- `localStorage`, para el progreso individual sin necesidad de cuentas.

## 🚀 Cómo correrlo localmente

```bash
npm install          # instala las dependencias
npm run dev           # servidor de desarrollo en http://localhost:3000
npm run validate-content   # revisa que todo el contenido esté bien formado
npm run build          # genera el sitio estático final (carpeta out/)
```

## 🌐 Despliegue

El sitio se publica automáticamente en **GitHub Pages** mediante GitHub Actions cada vez que se sube un cambio a `main` (ver [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)). 

## 📄 Documentación

- [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md) — cómo agregar o editar una lección, sin saber programar.

