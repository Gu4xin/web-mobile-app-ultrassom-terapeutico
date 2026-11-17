import { createContext, useContext } from 'react';

type AccessibilityContextValue = {
  fontScale: number;
  setFontScale: (fontScale: number) => void;
};

export const AccessibilityContext =
  createContext<AccessibilityContextValue | null>(null);

export function useAccessibility() {
  const context = useContext(AccessibilityContext);

  if (!context) {
    throw new Error(
      'useAccessibility must be used within AccessibilityContext.Provider',
    );
  }

  return context;
}
