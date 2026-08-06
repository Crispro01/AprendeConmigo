type HelpItem = {
  icon: string;
  title: string;
  description: string;
};

const HELP_ITEMS: HelpItem[] = [
  {
    icon: "🔊",
    title: "Escucha el texto",
    description:
      "Toca el botón 'Escuchar' en cualquier lección para que te lean el texto en voz alta.",
  },
  {
    icon: "🔤",
    title: "Agranda la letra",
    description:
      "Usa los botones A, A+ y A++ arriba de la página para cambiar el tamaño del texto.",
  },
  {
    icon: "🔓",
    title: "No necesitas registrarte",
    description:
      "Puedes entrar directo a cualquier lección, sin usuario ni contraseña.",
  },
  {
    icon: "✅",
    title: "Tu progreso se guarda solo",
    description:
      "Cada lección que completes queda marcada automáticamente en este celular o computadora.",
  },
  {
    icon: "⏱️",
    title: "Ve a tu ritmo",
    description:
      "No hay tiempos límite. Puedes repetir una lección las veces que quieras.",
  },
];

export function HelpContent() {
  return (
    <ul className="flex flex-col gap-4">
      {HELP_ITEMS.map((item) => (
        <li key={item.title} className="flex items-start gap-4">
          <span aria-hidden="true" className="text-3xl">
            {item.icon}
          </span>
          <div>
            <p className="text-xl font-bold">{item.title}</p>
            <p className="text-lg text-ink-soft">{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
