import { Copy, X } from "lucide-react";
import { useReducer } from "react";

import { Kana, Toolbar } from "./components";
import { hiraganas as allHiraganas, katakanas as allKatakanas, type SyllabaryType } from "./data";
import "./index.css";
import "@fontsource/noto-sans-jp/400.css";
import { useKanaProps, useSelectedKanas } from "./hooks";
import { twMerge } from "tailwind-merge";

interface State {
  type: SyllabaryType;
  allKanas: typeof allHiraganas | typeof allKatakanas;
}

interface Action {
  type: "setHiragana" | "setKatakana";
}

export const App = () => {
  const { showDiacritics, showPalatalizers, toggleDiacritics, togglePalatalizers } = useKanaProps();
  const { kanas, clearKanas } = useSelectedKanas();
  const [shownType, toggleShownType] = useReducer<"kana" | "romaji", []>(
    (old) => (old === "kana" ? "romaji" : "kana"),
    "kana",
  );

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
      <h1 className="text-3xl pt-4 pb-7 capitalize">{type}s</h1>

      {kanas.length > 0 && (
        <Toolbar position="top">
          <Toolbar.ButtonGroup>
            <Toolbar.Button
              onClick={() =>
                navigator.clipboard.writeText(
                  kanas.map((kana) => (shownType === "kana" ? kana.char : kana.romaji)).join(""),
                )
              }
            >
              <Copy className="size-4" />
            </Toolbar.Button>
            <Toolbar.Button
              className="flex flex-col w-auto px-3 py-1 gap-y-2 overflow-hidden"
              onClick={toggleShownType}
            >
              <div
                className={twMerge(
                  "text-2xl transition-[margin] duration-75",
                  shownType === "kana" ? "mt-8" : "-mt-10",
                )}
              >
                {kanas.map((kana) => kana.char).join("")}
              </div>
              <div className={twMerge("text-2xl")}>{kanas.map((kana) => kana.romaji).join("")}</div>
            </Toolbar.Button>
            <Toolbar.Button onClick={clearKanas}>
              <X className="size-4" />
            </Toolbar.Button>
          </Toolbar.ButtonGroup>
        </Toolbar>
      )}

      <div className="flex flex-col items-center gap-5">
        {allKanas.map((kanasRow, index) => (
          <div key={index} className="flex gap-2.5">
            {kanasRow.map((kana) => (
              <div key={kana.char} className="h-fit">
                <Kana kana={kana} />
              </div>
            ))}
          </div>
        ))}
      </div>

      <Toolbar color="vibrant">
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
