"use client";

import { useEffect, useState } from "react";
import { HelpContent } from "@/components/help/HelpContent";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "bienvenida-vista-v1";

export function WelcomeCard() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const seen = localStorage.getItem(STORAGE_KEY);
      if (!seen) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // si no se puede guardar, la tarjeta puede volver a aparecer, no es grave
    }
    setVisible(false);
  }

  return (
    <div className="mb-8 rounded-3xl border-2 border-brand bg-brand-soft p-6">
      <h2 className="mb-1 text-2xl font-extrabold">¿Primera vez aquí? 👋</h2>
      <p className="mb-4 text-lg text-ink-soft">
        Aquí tienes algunas cosas que te van a servir para empezar.
      </p>
      <HelpContent />
      <Button onClick={dismiss} variant="primary" className="mt-6">
        Entendido
      </Button>
    </div>
  );
}
