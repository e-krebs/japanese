import { useContext } from "react";

import { SelectedKanasContext } from "./SelectedKanasContext";

export const useSelectedKanas = () => {
  const context = useContext(SelectedKanasContext);
  if (!context) {
    throw new Error("useSelectedKanas must be used within a SelectedKanasContextProvider");
  }
  return context;
};
