# Cómo agregar o editar una lección (sin saber programar)

Todo el contenido del sitio vive en la carpeta `content/`, en archivos de texto con formato **JSON**. No necesitas tocar ningún archivo de código para agregar o corregir una lección.

## Dónde está cada cosa

```
content/
  alfabetizacion/
    modules.json          <- lista de los 10 módulos de alfabetización
    m2-vocales/
      01-vocal-a.json      <- una lección
      02-vocal-e.json
      ...
  tecnologia/
    modules.json          <- lista de los 8 módulos de tecnología
    m1-mi-celular/
      01-partes-celular.json
      ...
```

Cada módulo es una carpeta. Dentro de cada carpeta hay un archivo `.json` por lección. El nombre del archivo empieza con un número (01, 02, 03...) que solo sirve para ordenarlos en la carpeta — el orden real que se muestra en el sitio lo define el campo `"order"` dentro del archivo.

## Cómo agregar una lección nueva

1. Copia un archivo de lección que ya exista en el mismo módulo (por ejemplo `content/alfabetizacion/m2-vocales/01-vocal-a.json`) y pégalo con un nombre nuevo, como `06-nueva-leccion.json`.
2. Ábrelo y cambia los campos siguiendo la plantilla de abajo.
3. Guarda el archivo.
4. Corre `npm run validate-content` para comprobar que no haya errores (ver más abajo).
5. Sube el cambio en una rama y abre un Pull Request en GitHub. Automáticamente se generará un link de vista previa para revisar cómo se ve la lección antes de publicarla.

## Plantilla de una lección

```json
{
  "id": "mi-nueva-leccion",
  "moduleId": "m2-vocales",
  "title": "Título que va a ver la persona",
  "order": 6,
  "estimatedMinutes": 5,
  "content": [
    { "type": "text", "text": "Un párrafo de introducción." },
    { "type": "step", "number": 1, "text": "Primer paso a seguir." },
    { "type": "step", "number": 2, "text": "Segundo paso a seguir." },
    { "type": "analogy", "text": "Una comparación con algo de la vida diaria, para relacionar el concepto." },
    { "type": "tip", "text": "Un consejo útil, aparece resaltado." },
    { "type": "image", "src": "🏠", "alt": "Descripción de la imagen para quien no puede verla" }
  ],
  "exercises": [
    {
      "type": "multiple-choice",
      "question": "¿Cuál de estas es la respuesta correcta?",
      "options": ["Correcta", "Incorrecta 1", "Incorrecta 2"],
      "correctIndex": 0
    }
  ]
}
```

- `"id"`: identificador corto de la lección, sin espacios ni tildes (usa guiones: `mi-nueva-leccion`). Debe ser único dentro del módulo.
- `"moduleId"`: el nombre de la carpeta del módulo donde está la lección (debe coincidir exactamente).
- `"order"`: un número que decide el orden de la lección dentro del módulo (1, 2, 3...).
- `"content"`: la lista de bloques que se muestran en la lección, en el orden en que aparecen. Puedes usar tantos como quieras, combinando los 5 tipos disponibles (ver abajo).
- `"exercises"`: la lista de ejercicios de práctica al final de la lección. Puede ir vacía (`[]`) si la lección no tiene ejercicio.

## Tipos de bloque de contenido (`content`)

| Tipo | Campos | Para qué sirve |
|---|---|---|
| `text` | `text` | Un párrafo normal de explicación. |
| `step` | `number`, `text` | Un paso numerado dentro de una instrucción (aparece con un círculo grande con el número). |
| `tip` | `text` | Un consejo destacado con el ícono 💡. |
| `analogy` | `text` | Una comparación con algo cotidiano ("Piénsalo así: ...") que ayuda a relacionar un concepto nuevo con algo que la persona ya conoce. Aparece con el ícono 🔗. Se recomienda incluir una por lección. |
| `image` | `src`, `alt` | Una imagen grande. Si `src` es un emoji (como `"🏠"`), se muestra grande en el centro. Si `src` es una ruta que empieza con `/` (por ejemplo `/images/casa.png`), se muestra la foto real. `alt` siempre debe describir la imagen en palabras, para quienes usan lector de pantalla. |

## Tipos de ejercicio (`exercises`)

| Tipo | Campos | Para qué sirve |
|---|---|---|
| `multiple-choice` | `question`, `options` (2 o más), `correctIndex` (posición de la respuesta correcta, empezando en 0) | Pregunta de opción múltiple. |
| `fill-in-the-blank-choice` | igual que `multiple-choice` | Igual que arriba, pero pensado para completar una palabra con un espacio en blanco, por ejemplo `"question": "C_SA"`. |
| `type-word` | `question`, `answer` | La persona escribe la respuesta con el teclado (no importan mayúsculas ni tildes al comparar). |
| `match-pairs` | `instructions`, `pairs` (lista de `{ "left": "...", "right": "..." }`, mínimo 2 pares) | Ejercicio de emparejar tocando un elemento de la izquierda y luego el de la derecha que corresponde. |

## Agregar un módulo nuevo

Si quieres agregar un módulo completo (no solo una lección):

1. Crea una carpeta nueva dentro de `content/alfabetizacion/` o `content/tecnologia/`, por ejemplo `m11-nuevo-modulo`.
2. Agrega una entrada nueva en el `modules.json` de esa sección, con `id` igual al nombre de la carpeta:

```json
{
  "id": "m11-nuevo-modulo",
  "title": "Título del módulo",
  "description": "Descripción corta de una línea.",
  "icon": "📚",
  "order": 11
}
```

3. Agrega archivos de lección dentro de la nueva carpeta, siguiendo la plantilla de arriba.

## Revisar que todo esté bien antes de subir

Corre este comando desde la carpeta del proyecto:

```
npm run validate-content
```

Si hay un error (por ejemplo, un campo mal escrito o un archivo con formato inválido), el comando te va a decir exactamente en qué archivo está el problema y qué falta corregir.

También puedes correr `npm run build` — si el contenido tiene errores, el sitio no va a compilar y vas a ver el mismo tipo de mensaje señalando el archivo exacto.
