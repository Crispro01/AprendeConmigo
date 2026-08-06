CARRERA DESARROLLO DE SOFTWARE

VINCULACIÓN CON LA SOCIEDAD

**Aprende Conmigo: plataforma web de alfabetización y tecnología básica para adultos mayores.** Desarrollo de un sitio estático accesible con Next.js para la enseñanza autónoma de lectura, escritura y uso del celular.

[Nombre del estudiante]

[correo institucional]

Quito, Ecuador

2026

---

## Introducción

En Ecuador, una parte importante de la población adulta mayor no completó procesos formales de alfabetización y, adicionalmente, enfrenta una segunda brecha: el uso básico de la tecnología (celulares inteligentes, aplicaciones de mensajería, internet). Ambas carencias limitan su autonomía en tareas cotidianas como leer una etiqueta de medicina, comunicarse con su familia por WhatsApp o realizar un trámite en línea.

El presente proyecto de vinculación con la sociedad responde a esta doble necesidad mediante el desarrollo de **Aprende Conmigo**, una plataforma web gratuita y de acceso libre, diseñada específicamente para personas adultas mayores con poca o ninguna experiencia digital. El sistema combina dos programas de estudio autónomos: alfabetización (lectura, escritura y números) y alfabetización tecnológica básica (uso del celular, WhatsApp, internet seguro y trámites en línea).

A diferencia de sistemas de gestión institucional que dependen de bases de datos centralizadas y procesos administrativos (como el descrito en el informe de referencia de este mismo programa de vinculación, orientado a la gestión de evidencias de acreditación CACES), este proyecto está orientado directamente al usuario final: una persona adulta mayor que abre un enlace desde su celular y, sin necesidad de registrarse, empieza a aprender. Esa diferencia de público determinó decisiones de arquitectura muy distintas, entre ellas la ausencia deliberada de un backend, que se explica en detalle en este informe.

La solución se construyó con **Next.js** (React) exportado como sitio 100% estático, con un sistema de texto a voz basado en la **Web Speech API** del navegador, un modelo de contenido en archivos JSON validados con **zod** para que voluntarios sin conocimientos de programación puedan mantenerlo, y un sistema de accesibilidad pensado desde cero para el público objetivo: letras grandes, alto contraste, botones táctiles amplios y navegación simple.

## Objetivo Principal

Diseñar e implementar una plataforma web accesible y de uso autónomo que permita a personas adultas mayores aprender, a su propio ritmo, alfabetización básica (lectura, escritura y números) y alfabetización tecnológica (uso del celular e internet), sin requerir registro, conexión constante a un servidor ni asistencia técnica externa.

## Objetivos Específicos

- Analizar las necesidades de accesibilidad del público objetivo (baja visión, poca experiencia digital) y traducirlas en un sistema de diseño concreto (tipografía, tamaños, contraste, tamaño de botones).
- Diseñar un modelo de contenido estructurado en JSON que separe el contenido educativo del código, para que voluntarios no técnicos puedan agregar o corregir lecciones.
- Desarrollar una interfaz web (frontend) en Next.js que presente el contenido en forma de módulos y lecciones, con navegación simple y consistente.
- Implementar un sistema de lectura en voz alta (texto a voz) integrado en cada lección y en cada ejercicio de práctica, usando la Web Speech API del navegador.
- Implementar ejercicios interactivos de práctica (opción múltiple, completar palabra, escribir palabra y emparejar) con retroalimentación inmediata.
- Implementar un sistema de seguimiento de progreso sin necesidad de cuentas de usuario, utilizando almacenamiento local del navegador.
- Elaborar el contenido pedagógico completo: 10 módulos y 65 lecciones de alfabetización, y 8 módulos y 50 lecciones de tecnología básica, con más de 700 ejercicios de práctica en total.

---

## CAPÍTULO 1: CONCEPTOS

### Alfabetización de personas adultas mayores

La alfabetización de adultos mayores es un proceso pedagógico distinto al de la alfabetización infantil: parte de una persona con experiencia de vida y vocabulario oral amplio, pero sin fluidez en la lectura y escritura formal. Los materiales efectivos para este público priorizan la repetición espaciada, la conexión constante con la vida cotidiana (dinero, comida, familia) y la ausencia de presión de tiempo, evitando el tono infantilizado que suele desmotivar a este grupo etario.

### Alfabetización digital básica

Se define como el conjunto mínimo de habilidades necesarias para operar un teléfono inteligente y sus aplicaciones más comunes (llamadas, mensajería, cámara, navegador) de forma segura. Para personas adultas mayores, este aprendizaje debe incluir explícitamente contenidos de seguridad digital (reconocimiento de estafas, protección de contraseñas), dado que este grupo es un objetivo frecuente de fraudes en línea.

### Accesibilidad web para baja visión y baja experiencia digital

El diseño accesible aplicado en este proyecto se basa en las pautas WCAG (Web Content Accessibility Guidelines), particularmente en los criterios de contraste de color (relación mínima 4.5:1 para texto normal, verificada en este proyecto con una relación superior a 17:1 entre el texto principal y el fondo), tamaño de texto ajustable por el usuario, y tamaño mínimo de áreas táctiles (44×44 px según WCAG; este proyecto usa 64 px como estándar).

### Arquitectura de sitios web: estática vs. dinámica con backend

Una aplicación web dinámica tradicional depende de un servidor (backend) que procesa peticiones, autentica usuarios y consulta una base de datos en cada interacción. Un sitio estático, en cambio, se genera por completo en el momento de la compilación (build) y se sirve como archivos HTML, CSS y JavaScript fijos, sin lógica de servidor propia.

**Tabla 1**
*Sitio dinámico con backend vs. sitio estático sin backend*

| Característica | Con backend | Estático (sin backend) |
|---|---|---|
| Procesamiento | En un servidor, por cada petición | Ninguno; los archivos ya están generados |
| Base de datos | Sí, consultada en tiempo real | No aplica |
| Costo de hosting | Servidor activo (recurrente) | Archivos estáticos (gratuito en la mayoría de proveedores) |
| Velocidad de carga | Depende del servidor y la red | Muy alta; ideal para conexiones lentas |
| Cuentas de usuario | Posibles y comunes | No aplica sin backend adicional |
| Mantenimiento | Requiere administrar servidor y base de datos | Solo requiere volver a compilar el sitio |
| Punto único de falla | El servidor puede caerse | No hay servidor que se pueda caer |
| Caso de uso ideal | Datos que cambian por usuario en tiempo real | Contenido igual para todos los visitantes |

*Nota:* comparación aplicada a la decisión de arquitectura de este proyecto.

### Texto a voz en el navegador (Web Speech API)

La Web Speech API es una interfaz estándar de los navegadores modernos que permite convertir texto en voz (`SpeechSynthesis`) sin depender de un servicio externo ni de archivos de audio pregrabados. Utiliza las voces instaladas en el sistema operativo del dispositivo del usuario, lo que evita costos de generación o alojamiento de audio.

### Almacenamiento local del navegador (localStorage)

`localStorage` es un mecanismo del navegador que permite guardar pequeñas cantidades de información (en este proyecto, qué lecciones completó la persona) directamente en el dispositivo del usuario, sin enviarla a ningún servidor. La información persiste entre sesiones, pero es local a ese navegador y ese dispositivo.

---

## ¿Por qué este sistema no utiliza un backend?

Esta es una de las decisiones de arquitectura más importantes del proyecto y se justifica en cuatro puntos concretos:

1. **No existen cuentas de usuario.** El sistema fue diseñado para acceso completamente libre: cualquier persona entra a cualquier lección sin registrarse. Sin autenticación, no hay necesidad de un servidor que valide credenciales.
2. **El progreso es individual y local.** Qué lecciones completó una persona se guarda únicamente en el navegador de su propio dispositivo (`localStorage`), no se comparte ni se consulta desde otro lugar. No hace falta una base de datos central para algo que nunca se sincroniza entre dispositivos.
3. **El audio no depende de archivos ni de un servicio externo.** La lectura en voz alta usa la Web Speech API del propio navegador; no hay archivos de audio que generar, subir ni alojar en un servidor.
4. **El contenido es igual para todas las personas visitantes.** Las 118 lecciones son fijas y no cambian según quién las visita, por lo que pueden generarse una sola vez (en el momento de compilar el sitio) y servirse como archivos estáticos, en lugar de reconstruirse en cada visita mediante consultas a una base de datos.

**Consecuencias prácticas de esta decisión:**

- El sitio se puede alojar gratis (por ejemplo, en Vercel o GitHub Pages), sin costo de servidor ni de base de datos.
- No existe un servidor que se pueda caer: si el proveedor de hosting está disponible, el sitio funciona.
- La carga es más rápida, un factor crítico para el público objetivo, que frecuentemente usa datos móviles limitados o conexiones lentas.
- El proyecto puede ser mantenido a largo plazo por voluntarios sin experiencia en administración de servidores.

**Límite de esta decisión:** si en el futuro el programa de vinculación necesitara ver el progreso agregado de todas las personas usuarias (por ejemplo, para reportar resultados ante la institución), sería necesario incorporar un backend con base de datos. Esta posibilidad se documenta como recomendación al final de este informe y no se implementó en esta fase por no ser un requisito del alcance actual.

---

## PROPUESTA DE IMPLEMENTACIÓN

**Nombre de la propuesta**

Aprende Conmigo: alfabetización y tecnología básica para personas adultas mayores.

**Objetivo de la implementación**

Poner a disposición del programa de vinculación una herramienta digital gratuita y autónoma que las personas adultas mayores puedan usar tanto en sesiones presenciales guiadas como de forma independiente desde su propio celular.

**Responsable(s)**

[Nombre del estudiante]

**Fecha de implementación**

Por definir

**Público objetivo**

Personas adultas mayores con poca o ninguna experiencia en lectura, escritura o uso de dispositivos móviles, participantes del programa de vinculación con la sociedad.

**Número de participantes estimado**

Por definir

**Recursos a usar**

Celular o computadora con navegador de internet, conexión a datos móviles o wifi (solo para la primera carga de cada página).

**Contenido del programa (módulos)**

*Alfabetización:*
1. Antes de leer
2. Las vocales
3. Primeras consonantes
4. Más consonantes
5. Sonidos especiales
6. Formo sílabas
7. Mis primeras palabras
8. Leo frases y textos cortos
9. Escribo
10. Números y dinero

*Tecnología:*
1. Conozco mi celular
2. Llamadas y contactos
3. Cámara y fotos
4. WhatsApp desde cero
5. Videollamadas
6. Internet y buscar información
7. Seguridad en internet
8. Trámites y servicios en línea

---

## CAPÍTULO 2: DESARROLLO DEL SISTEMA

### Arquitectura general

El sistema se construyó como una aplicación **Next.js** (versión 16, App Router) configurada en modo `output: "export"`, lo que genera un sitio 100% estático en el momento de la compilación (`npm run build`). No existe una carpeta `api/` ni funciones de servidor: toda la lógica que en un sistema tradicional correría en el backend (leer y validar el contenido de las lecciones) se ejecuta una sola vez, durante la compilación, no en cada visita.

```
next.config.ts
------------------------------------
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};
```

[ESPACIO PARA CAPTURA DE PANTALLA]
*Ilustración 1. Página de inicio de Aprende Conmigo, con acceso directo a las dos secciones (Alfabetización y Tecnología) sin necesidad de registro.*

### Modelo de contenido

Cada lección es un archivo JSON independiente, validado con la librería **zod**, que define bloques de contenido y ejercicios de práctica. Este diseño permite que una persona voluntaria sin conocimientos de programación pueda agregar o corregir una lección editando texto plano, sin tocar el código de la aplicación.

```
Bloques de contenido disponibles:
  text     → un párrafo de explicación
  step     → un paso numerado dentro de una instrucción
  tip      → un consejo destacado
  analogy  → una comparación con algo cotidiano, para relacionar conceptos
  image    → una imagen o emoji ilustrativo

Tipos de ejercicio disponibles:
  multiple-choice          → opción múltiple
  fill-in-the-blank-choice → completar una palabra con opciones
  type-word                → escribir la respuesta con el teclado
  match-pairs               → emparejar elementos tocando la pantalla
```

Ejemplo simplificado de una lección real del sistema:

```json
{
  "id": "vocal-a",
  "moduleId": "m2-vocales",
  "title": "La A",
  "order": 1,
  "estimatedMinutes": 6,
  "content": [
    { "type": "text", "text": "La A es la primera vocal..." },
    { "type": "step", "number": 1, "text": "Abre bien la boca y di: A." },
    { "type": "analogy", "text": "La A es como la puerta principal de una casa..." },
    { "type": "image", "src": "A a", "alt": "La letra A mayúscula y minúscula" },
    { "type": "tip", "text": "Practica diciendo palabras que empiecen con A..." }
  ],
  "exercises": [ /* 10 ejercicios de práctica */ ]
}
```

Si un archivo de contenido tiene un error (por ejemplo, un campo faltante), el proceso de compilación se detiene y muestra exactamente en qué archivo y campo está el problema, evitando publicar contenido inválido.

### Estructura del repositorio

```
alfabetizacion-app/
├── content/                    Contenido editable (JSON, no código)
│   ├── alfabetizacion/         10 módulos, 65 lecciones
│   └── tecnologia/             8 módulos, 50 lecciones
├── docs/
│   └── CONTENT_GUIDE.md        Guía para voluntarios sin experiencia técnica
├── scripts/
│   └── validate-content.mjs    Validador de contenido (npm run validate-content)
├── src/
│   ├── app/                    Rutas de Next.js (Home, secciones, módulos, lecciones)
│   ├── components/             Componentes de interfaz, accesibilidad, ejercicios
│   ├── context/                Estado compartido (tamaño de texto, progreso)
│   ├── hooks/                  useTextToSpeech, useProgress, useTextSize
│   └── lib/                    Esquemas de validación, lectura de contenido
└── public/                     Imágenes y manifest de la aplicación
```

[ESPACIO PARA CAPTURA DE PANTALLA]
*Ilustración 2. Lista de módulos de la sección Alfabetización, con barra de progreso por módulo.*

### Sistema de accesibilidad

Se implementó un sistema de diseño accesible desde cero, resumido en la siguiente tabla:

| Elemento | Decisión de diseño |
|---|---|
| Tipografía | Atkinson Hyperlegible, diseñada específicamente para baja visión |
| Tamaño de texto | 3 niveles ajustables por la persona usuaria (Normal, Grande, Muy grande), guardado en su dispositivo |
| Contraste | Texto casi negro sobre fondo casi blanco, verificado con una relación de contraste superior a 17:1 |
| Botones | Mínimo 64 px de alto (WCAG exige 44 px), con separación amplia entre ellos |
| Navegación | Sin límites de tiempo, sin auto-avance, siempre se puede repetir una lección |
| Íconos | Siempre acompañados de texto visible, nunca solo un ícono |

[ESPACIO PARA CAPTURA DE PANTALLA]
*Ilustración 3. Control de tamaño de letra (A / A+ / A++) visible en la parte superior de cada página.*

### Texto a voz

Se implementó un hook de React (`useTextToSpeech`) que encapsula el uso de la Web Speech API: detección de compatibilidad del navegador, selección automática de la mejor voz en español disponible en el dispositivo (con orden de preferencia `es-419` → `es-EC` → cualquier variante de español), lectura del contenido bloque por bloque, y controles grandes de Escuchar, Pausar, Reanudar y Detener, con dos velocidades de lectura (Lento y Normal).

Este mismo sistema se extendió a cada ejercicio de práctica de forma individual, de manera que una persona que todavía no lee con fluidez pueda escuchar tanto la explicación de la lección como la pregunta de cada ejercicio.

[ESPACIO PARA CAPTURA DE PANTALLA]
*Ilustración 4. Botón "Escuchar" en una lección, con controles de pausa y velocidad de lectura.*

### Progreso sin cuentas de usuario

El avance de cada persona se guarda en `localStorage` bajo una clave versionada (`progreso-v1`), con la siguiente estructura simplificada:

```json
{
  "alfabetizacion": { "m2-vocales": { "vocal-a": true } },
  "tecnologia": { },
  "ultimaLeccion": {
    "seccion": "alfabetizacion",
    "moduloId": "m2-vocales",
    "leccionId": "vocal-a"
  }
}
```

Con esta información se muestran marcas de verificación por lección, barras de progreso por módulo, una tarjeta de "Continuar donde quedé" en la página de inicio, y una opción para reiniciar el progreso (útil si varias personas comparten un mismo dispositivo).

[ESPACIO PARA CAPTURA DE PANTALLA]
*Ilustración 5. Tarjeta "Continuar donde quedé" y opción de reiniciar progreso en la página de inicio.*

### Ejercicios interactivos

Se implementaron cuatro tipos de ejercicio con retroalimentación inmediata al tocar la respuesta, sin necesidad de un botón "enviar" en la mayoría de los casos:

[ESPACIO PARA CAPTURA DE PANTALLA]
*Ilustración 6. Ejercicio de opción múltiple, con retroalimentación visual inmediata.*

[ESPACIO PARA CAPTURA DE PANTALLA]
*Ilustración 7. Ejercicio de emparejar tocando la pantalla, usado como alternativa accesible al arrastrar y soltar.*

### Vista imprimible

Cada lección incluye un botón "Imprimir esta lección" que genera, usando exclusivamente hojas de estilo CSS específicas para impresión (sin librerías adicionales), una hoja de práctica en papel: las preguntas de opción múltiple se convierten en opciones para encerrar en un círculo, las de escribir palabra en una línea en blanco, y las de emparejar en dos columnas para relacionar a mano. Este mismo mecanismo, usando la opción "Guardar como PDF" del propio navegador al imprimir, permite obtener un archivo PDF sin necesidad de generarlo en un servidor.

[ESPACIO PARA CAPTURA DE PANTALLA]
*Ilustración 8. Hoja de práctica impresa, con espacio para nombre y fecha.*

### FrontEnd

Para la interfaz se utilizaron las siguientes herramientas:

- **Next.js 16** (App Router) con **React 19** y **TypeScript**, para la estructura de páginas y componentes.
- **Tailwind CSS v4**, para el sistema de diseño accesible.
- **zod**, para la validación del contenido en el momento de la compilación.
- **next/font**, para cargar la tipografía Atkinson Hyperlegible de forma optimizada.
- **clsx**, utilidad menor para combinar clases de estilo de forma condicional.

Comandos principales utilizados durante el desarrollo:

- `npx create-next-app@latest`: creación del proyecto base.
- `npm install zod clsx`: instalación de las dependencias adicionales.
- `npm run dev`: servidor de desarrollo local.
- `npm run validate-content`: valida los 118 archivos de contenido sin necesidad de compilar todo el sitio.
- `npm run build`: genera el sitio estático final, listo para publicarse.

[ESPACIO PARA CAPTURA DE PANTALLA]
*Ilustración 9. Consola mostrando `npm run build` generando las 145 páginas del sitio sin errores.*

### Resultados de la implementación

| Indicador | Cantidad |
|---|---|
| Módulos de alfabetización | 10 |
| Lecciones de alfabetización | 65 |
| Módulos de tecnología | 8 |
| Lecciones de tecnología | 50 |
| Total de lecciones | 118 |
| Total de ejercicios de práctica | 720 |
| Páginas generadas por el sitio | 145 |
| Tipos de bloque de contenido | 5 |
| Tipos de ejercicio | 4 |
| Costo de hosting | $0 (sitio estático) |

---

## Despliegue

Para publicar el sitio se utilizará **GitHub Pages**, el servicio de hosting estático gratuito de GitHub. Es una opción coherente con la arquitectura del proyecto: al ser un sitio 100% estático (sin backend, como se explicó anteriormente), no se necesita un servidor propio, solo un lugar donde alojar los archivos HTML, CSS y JavaScript ya generados por `npm run build`.

### Configuración necesaria en el proyecto

GitHub Pages publica el sitio bajo una subruta con el nombre del repositorio (por ejemplo, `https://usuario.github.io/AprendeConmigo/`), a menos que se configure un dominio propio. Como el proyecto genera todas sus rutas internas (enlaces, imágenes, manifest, ícono) desde la raíz (`/`), es necesario indicarle a Next.js esa subruta mediante la opción `basePath`, para que todos los enlaces y archivos se resuelvan correctamente una vez publicados:

```
next.config.ts
------------------------------------
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "AprendeConmigo";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isGithubPages ? `/${repoName}` : "",
  trailingSlash: true,
};
```

Controlar esta configuración con una variable de entorno (`GITHUB_PAGES`) permite que el sitio siga funcionando con normalidad en `localhost` durante el desarrollo, y que la subruta solo se aplique al compilar específicamente para GitHub Pages.

Adicionalmente, GitHub Pages usa por defecto un procesador llamado Jekyll, que ignora cualquier carpeta cuyo nombre empiece con guion bajo. Next.js genera su carpeta de archivos internos como `_next/`, por lo que es obligatorio agregar un archivo vacío llamado `.nojekyll` dentro de la carpeta exportada (`out/`), para que GitHub Pages sirva esa carpeta sin filtrarla.

### Despliegue automático con GitHub Actions (recomendado)

Se recomienda automatizar la publicación mediante un flujo de GitHub Actions, de modo que cada cambio subido a la rama principal (`main`) se publique solo, sin pasos manuales. El archivo de flujo se ubica en `.github/workflows/deploy.yml`:

```yaml
name: Publicar en GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run validate-content
      - run: GITHUB_PAGES=true npm run build
      - run: touch out/.nojekyll
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Antes de publicar, este flujo ejecuta también `npm run validate-content`, de modo que un error en el contenido de una lección (por ejemplo, un archivo JSON mal formado enviado por una persona voluntaria) detiene la publicación en lugar de romper el sitio ya publicado.

**Pasos de configuración en GitHub (una sola vez):**

1. En el repositorio de GitHub, ir a **Settings → Pages**.
2. En "Build and deployment", elegir la fuente **GitHub Actions** (no "Deploy from a branch").
3. Subir el archivo de flujo (`deploy.yml`) y hacer *push* a la rama `main`.
4. Verificar en la pestaña **Actions** que el flujo se ejecute sin errores.
5. La URL final del sitio queda disponible en **Settings → Pages**, con el formato `https://usuario.github.io/AprendeConmigo/`.

### Alternativa manual (sin GitHub Actions)

Si se prefiere no automatizar el proceso, es posible publicar manualmente con el paquete `gh-pages`:

```
npm install -D gh-pages
GITHUB_PAGES=true npm run build
npx gh-pages -d out
```

Esta alternativa exige repetir el proceso cada vez que se actualice el contenido, por lo que se recomienda únicamente para una primera publicación de prueba.

### Consideraciones adicionales

- **Dominio propio (opcional):** GitHub Pages permite conectar un dominio personalizado agregando un archivo `CNAME` en la carpeta `public/`. En ese caso, `basePath` debe quedar vacío, ya que el sitio pasaría a servirse desde la raíz del dominio en lugar de una subruta.
- **Metadatos para compartir el enlace:** una vez definida la URL final, se debe actualizar la variable `NEXT_PUBLIC_SITE_URL` (usada para generar la imagen de vista previa al compartir el enlace por WhatsApp) con la dirección real de GitHub Pages.
- **HTTPS:** GitHub Pages provee certificado HTTPS automático, un requisito para que la Web Speech API (lectura en voz alta) funcione correctamente en todos los navegadores.

[ESPACIO PARA CAPTURA DE PANTALLA]
*Ilustración 10. Configuración de GitHub Pages en Settings → Pages, mostrando la fuente "GitHub Actions" y la URL final publicada.*

---

## Usuarios del sistema

A diferencia de un sistema institucional con roles diferenciados (analista, autoridad, administrador), **Aprende Conmigo no tiene usuarios ni contraseñas**. Esta es una decisión de diseño intencional, coherente con la ausencia de backend explicada anteriormente: cualquier persona que abra el enlace del sitio puede empezar a usarlo de inmediato, sin fricción de registro, lo cual es especialmente importante para un público con baja experiencia digital, para quien un formulario de inicio de sesión puede ser, por sí solo, una barrera de acceso.

---

## Conclusiones

- La ausencia de backend no es una limitación técnica sino una decisión de arquitectura alineada con los requisitos reales del proyecto: acceso libre, progreso individual y contenido igual para todas las personas usuarias. Esto permitió un sitio más rápido, más barato de mantener y sin punto único de falla.
- Separar el contenido educativo (archivos JSON) del código de la aplicación permite que personas voluntarias sin experiencia en programación puedan mantener y ampliar el material, siguiendo la guía `CONTENT_GUIDE.md`, sin depender de quien desarrolló el sistema.
- La Web Speech API demostró ser una alternativa viable a grabar y alojar archivos de audio: sin costo adicional, sin necesidad de almacenamiento, aunque con la limitación de depender de las voces instaladas en cada dispositivo.
- Diseñar la accesibilidad desde el inicio (tipografía, contraste, tamaño de botones) resultó más simple que intentar adaptarla después, y es un principio aplicable a cualquier proyecto dirigido a un público con necesidades específicas.
- El volumen de contenido pedagógico (118 lecciones, 720 ejercicios) demuestra que un sitio estático puede escalar en cantidad de contenido sin perder rendimiento, ya que todo se genera una sola vez durante la compilación.

## Recomendaciones

- Si el programa de vinculación necesita en el futuro reportar el avance agregado de todas las personas participantes ante la institución, se recomienda incorporar un backend simple (por ejemplo, con una base de datos como Supabase) exclusivamente para ese fin, sin eliminar el modo de acceso libre actual.
- Se recomienda completar la incorporación de fotografías reales en las lecciones que todavía usan imágenes ilustrativas genéricas (emoji), para reforzar el reconocimiento visual de objetos y procedimientos reales del celular.
- Se recomienda una prueba de usabilidad presencial con personas adultas mayores reales, incluyendo el uso de un lector de pantalla (por ejemplo, TalkBack en Android), antes de una publicación a gran escala.
- Se recomienda evaluar la incorporación de un manifest de aplicación web progresiva (PWA) más completo, que permita instalar el sitio como ícono en la pantalla de inicio del celular, reduciendo aún más la fricción de acceso para el público objetivo.
- Se recomienda producir material impreso (usando la vista imprimible ya implementada) para las sesiones presenciales del programa, dirigido a personas sin celular propio.

## Referencias

Mozilla Developer Network. (n.d.). *SpeechSynthesis API*. MDN Web Docs. https://developer.mozilla.org/es/docs/Web/API/SpeechSynthesis

Vercel. (n.d.). *Static Exports*. Next.js Documentation. https://nextjs.org/docs/app/guides/static-exports

W3C. (2018). *Web Content Accessibility Guidelines (WCAG) 2.1*. World Wide Web Consortium. https://www.w3.org/TR/WCAG21/

Braille Institute. (n.d.). *Atkinson Hyperlegible Font*. https://www.brailleinstitute.org/freefont/

Colby, C. (n.d.). *Zod: TypeScript-first schema validation*. https://zod.dev
