import { useReducer, type ReactNode } from "react";

import type { BaseChar } from "../../data";
import { SelectedKanasContext } from "./SelectedKanasContext";

interface State {
  kanas: BaseChar[];
}

type Action =
  | {
      type: "addKana";
      kana: BaseChar;
    }
  | {
      type: "clearKanas";
    };

export const SelectedKanasContextProvider = ({ children }: { children: ReactNode }) => {
  const [{ kanas }, dispatch] = useReducer<State, [Action]>(
    ({ kanas }, action) => {
      switch (action.type) {
        case "addKana": {
          return { kanas: [...kanas, action.kana] };
        }
        case "clearKanas": {
          return { kanas: [] };
        }
      }
    },
    { kanas: [] },
  );
  return (
    <SelectedKanasContext.Provider
      value={{
        kanas,
        addKana: (kana) => dispatch({ type: "addKana", kana }),
        clearKanas: () => dispatch({ type: "clearKanas" }),
      }}
    >
      {children}
    </SelectedKanasContext.Provider>
  );
};
