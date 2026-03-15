import { Eye, EyeOff } from "lucide-react";
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
    <div className="relative px-4 pb-24 min-h-screen max-w-fit mx-auto flex flex-col items-center">
      <div className="sticky top-0 w-105.5 p-4 mb-6 bg-slate-700/50 backdrop-blur-sm grid grid-cols-3">
        <button
          onClick={toggleDiacritics}
          className="rounded-md border px-4 py-2 border-yellow-400/50 bg-white/10 flex gap-2 items-center justify-around"
        >
          {showDiacritics ? <EyeOff className="size-4" /> : <Eye className="size-4" />} ゛゜
        </button>
        <button
          onClick={togglePalatalizers}
          className="rounded-md border px-4 py-2 border-white/50 bg-sky-500/10 col-start-3 flex gap-2 items-center justify-around"
        >
          {showPalatalizers ? <EyeOff className="size-4" /> : <Eye className="size-4" />} やゆよ
        </button>
      </div>

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
      </Toolbar>
    </div>
  );
};
