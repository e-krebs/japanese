import { createContext } from "react";

import type { BaseChar } from "../../data";

interface SelectedKanasContextData {
  kanas: BaseChar[];
  addKana: (kana: BaseChar) => void;
  clearKanas: () => void;
}

export const SelectedKanasContext = createContext<SelectedKanasContextData | null>(null);
