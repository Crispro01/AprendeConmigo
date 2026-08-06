"use client";

import { Button } from "@/components/ui/Button";

export function PrintButton() {
  return (
    <Button
      onClick={() => window.print()}
      variant="secondary"
      className="print:hidden"
    >
      🖨️ Imprimir esta lección
    </Button>
  );
}
