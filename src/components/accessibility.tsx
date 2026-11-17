import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

type AccessibilityContextValue = {
  scale: number;
  decrease: () => void;
  increase: () => void;
};

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1);
  const value = useMemo(
    () => ({
      scale,
      decrease: () => setScale((current) => Math.max(0.85, Math.round((current - 0.1) * 100) / 100)),
      increase: () => setScale((current) => Math.min(1.4, Math.round((current + 0.1) * 100) / 100)),
    }),
    [scale],
  );

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility precisa estar dentro de AccessibilityProvider.");
  }
  return context;
}
