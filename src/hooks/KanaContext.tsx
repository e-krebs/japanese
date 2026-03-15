import { createContext } from "react";

interface KanaContextData {
  showDiacritics: boolean;
  showPalatalizers: boolean;
  toggleDiacritics: () => void;
  togglePalatalizers: () => void;
}

export const KanaContext = createContext<KanaContextData | null>(null);
