import { useContext } from "react";

import { KanaContext } from "./KanaContext";

export const useKanaProps = () => {
  const context = useContext(KanaContext);
  if (!context) {
    throw new Error("useKanaProps must be used within a KanaContextProvider");
  }
  return context;
};
