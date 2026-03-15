import { useReducer } from "react";

import { Kana, Toolbar } from "./components";
import { hiraganas as allHiraganas, katakanas as allKatakanas, type SyllabaryType } from "./data";
import "./index.css";
import "@fontsource/noto-sans-jp/400.css";
import { useKanaProps } from "./hooks";

interface State {
  type: SyllabaryType;
  allKanas: typeof allHiraganas | typeof allKatakanas;
}

interface Action {
  type: "setHiragana" | "setKatakana";
}

export const App = () => {
  const { showDiacritics, showPalatalizers, toggleDiacritics, togglePalatalizers } = useKanaProps();

  const [{ type, allKanas }, dispatch] = useReducer<State, [Action]>(
    (state, action) => {
      switch (action.type) {
        case "setHiragana": {
          return { ...state, type: "hiragana", allKanas: allHiraganas };
        }
        case "setKatakana": {
          return { ...state, type: "katakana", allKanas: allKatakanas };
        }
      }
    },
    { type: "hiragana", allKanas: allHiraganas },
  );

  return (
    <div className="relative p-4 pb-24 min-h-screen max-w-fit mx-auto flex flex-col items-center">
      <div className="flex flex-col items-center gap-5">
        {allKanas.map((kanasRow, index) => (
          <div key={index} className="flex gap-2.5">
            {kanasRow.map((kana) => (
              <div key={kana.char}>
                <Kana kana={kana} />
              </div>
            ))}
          </div>
        ))}
      </div>

      <Toolbar>
        <Toolbar.ButtonGroup>
          <Toolbar.Button
            selected={type === "hiragana"}
            onClick={() => dispatch({ type: "setHiragana" })}
          >
            あ
          </Toolbar.Button>
          <Toolbar.Button
            selected={type === "katakana"}
            onClick={() => dispatch({ type: "setKatakana" })}
          >
            ア
          </Toolbar.Button>
        </Toolbar.ButtonGroup>
        <Toolbar.ToggleButton
          title="toggle diacritics"
          toggled={showDiacritics}
          onToggle={toggleDiacritics}
          className="text-base pl-4.5 pt-4"
        >
          ゛゜
        </Toolbar.ToggleButton>
        <Toolbar.ToggleButton
          title="toggle palatalizers"
          toggled={showPalatalizers}
          onToggle={togglePalatalizers}
          className="text-[9px]"
        >
          やゆよ
        </Toolbar.ToggleButton>
      </Toolbar>
    </div>
  );
};
