import { useReducer, type ReactNode } from "react";

import { KanaContext } from "./KanaContext";

interface State {
  showDiacritics: boolean;
  showPalatalizers: boolean;
}

interface Action {
  type: "toggleDiacritics" | "togglePalatalizers";
}

export const KanaContextProvider = ({ children }: { children: ReactNode }) => {
  const [{ showDiacritics, showPalatalizers }, dispatch] = useReducer<State, [Action]>(
    (state, action) => {
      switch (action.type) {
        case "toggleDiacritics":
          return { ...state, showDiacritics: !state.showDiacritics };
        case "togglePalatalizers":
          return { ...state, showPalatalizers: !state.showPalatalizers };
      }
    },
    {
      showDiacritics: false,
      showPalatalizers: false,
    },
  );
  return (
    <KanaContext.Provider
      value={{
        showDiacritics,
        showPalatalizers,
        toggleDiacritics: () => dispatch({ type: "toggleDiacritics" }),
        togglePalatalizers: () => dispatch({ type: "togglePalatalizers" }),
      }}
    >
      {children}
    </KanaContext.Provider>
  );
};
