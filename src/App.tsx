import { Eye, EyeOff } from "lucide-react";
import { useReducer } from "react";
import { twMerge } from "tailwind-merge";

import { hiraganas as allHiraganas, type Char } from "./data";
import "./index.css";
import "@fontsource/noto-sans-jp/400.css";

const Kana = ({
  data,
  showDiacritics = false,
  showPalatalizers = false,
  isDiacritic = false,
  isPalatalizer = false,
  hasPalatalizers: overrideHasPalatalizers = false,
}: {
  data: Char;
  showDiacritics?: boolean;
  showPalatalizers?: boolean;
  isDiacritic?: boolean;
  isPalatalizer?: boolean;
  hasPalatalizers?: boolean;
}) => {
  const hasDiacritics = !!(data["゛"] || data["゜"]);
  const hasPalatalizers = overrideHasPalatalizers || !!(data["や"] || data["ゆ"] || data["よ"]);

  return (
    <>
      <div
        className={twMerge(
          "px-4 py-2 w-17.5 flex flex-col items-center border border-slate-500 rounded-md",
          (isDiacritic || isPalatalizer) && "w-auto flex-row justify-center gap-2",
          (hasPalatalizers || isPalatalizer) && "bg-sky-500/10",
          (hasDiacritics || isDiacritic) && "border-yellow-400/50",
        )}
      >
        <div
          className={twMerge("text-4xl text-nowrap", (isDiacritic || isPalatalizer) && "text-xs")}
        >
          {data.char}
        </div>
        <div className={twMerge("text-base", (isDiacritic || isPalatalizer) && "text-xs")}>
          {data.romaji}
        </div>
      </div>
      {showDiacritics && (
        <>
          {data["゛"] && (
            <Kana
              data={{ char: "゛", romaji: data["゛"].romaji }}
              isDiacritic={true}
              showDiacritics={showDiacritics}
              showPalatalizers={showPalatalizers}
              hasPalatalizers={!!(data["゛"]?.["や"] || data["゛"]?.["ゆ"] || data["゛"]?.["よ"])}
            />
          )}
          {data["゜"] && (
            <Kana
              data={{ char: "゜", romaji: data["゜"].romaji }}
              isDiacritic={true}
              showDiacritics={showDiacritics}
              showPalatalizers={showPalatalizers}
              hasPalatalizers={!!(data["゜"]?.["や"] || data["゜"]?.["ゆ"] || data["゜"]?.["よ"])}
            />
          )}
        </>
      )}
      {showPalatalizers && hasPalatalizers && (
        <div className="flex overflow-visible max-w-17.5">
          <div className="grid grid-cols-[repeat(3,minmax(auto,1fr))]">
            {data["や"] && (
              <Kana
                data={data["や"]}
                isPalatalizer={true}
                showDiacritics={showDiacritics}
                showPalatalizers={showPalatalizers}
              />
            )}
            {data["ゆ"] && (
              <Kana
                data={data["ゆ"]}
                isPalatalizer={true}
                showDiacritics={showDiacritics}
                showPalatalizers={showPalatalizers}
              />
            )}
            {data["よ"] && (
              <Kana
                data={data["よ"]}
                isPalatalizer={true}
                showDiacritics={showDiacritics}
                showPalatalizers={showPalatalizers}
              />
            )}
            {showDiacritics && (
              <>
                {(data["゛"]?.["や"] || data["゛"]?.["ゆ"] || data["゛"]?.["よ"]) && (
                  <>
                    {data["゛"]?.["や"] && (
                      <Kana
                        data={data["゛"]["や"]}
                        isPalatalizer={true}
                        isDiacritic={true}
                        showDiacritics={showDiacritics}
                        showPalatalizers={showPalatalizers}
                      />
                    )}
                    {data["゛"]?.["ゆ"] && (
                      <Kana
                        data={data["゛"]["ゆ"]}
                        isPalatalizer={true}
                        isDiacritic={true}
                        showDiacritics={showDiacritics}
                        showPalatalizers={showPalatalizers}
                      />
                    )}
                    {data["゛"]?.["よ"] && (
                      <Kana
                        data={data["゛"]["よ"]}
                        isPalatalizer={true}
                        isDiacritic={true}
                        showDiacritics={showDiacritics}
                        showPalatalizers={showPalatalizers}
                      />
                    )}
                  </>
                )}
                {(data["゜"]?.["や"] || data["゜"]?.["ゆ"] || data["゜"]?.["よ"]) && (
                  <>
                    {data["゜"]?.["や"] && (
                      <Kana
                        data={data["゜"]["や"]}
                        isPalatalizer={true}
                        isDiacritic={true}
                        showDiacritics={showDiacritics}
                        showPalatalizers={showPalatalizers}
                      />
                    )}
                    {data["゜"]?.["ゆ"] && (
                      <Kana
                        data={data["゜"]["ゆ"]}
                        isPalatalizer={true}
                        isDiacritic={true}
                        showDiacritics={showDiacritics}
                        showPalatalizers={showPalatalizers}
                      />
                    )}
                    {data["゜"]?.["よ"] && (
                      <Kana
                        data={data["゜"]["よ"]}
                        isPalatalizer={true}
                        isDiacritic={true}
                        showDiacritics={showDiacritics}
                        showPalatalizers={showPalatalizers}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

interface State {
  showDiacritics: boolean;
  showPalatalizers: boolean;
}

interface Action {
  type: "toggleDiacritics" | "togglePalatalizers";
}

export const App = () => {
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
    <div className="relative px-4 pb-6 min-h-screen max-w-fit mx-auto flex flex-col items-center">
      <div className="sticky top-0 w-105.5 p-4 mb-6 bg-slate-700/50 backdrop-blur-sm grid grid-cols-3">
        <button
          onClick={() => dispatch({ type: "toggleDiacritics" })}
          className="border-yellow-400/50 bg-white/10 flex gap-2 items-center justify-around"
        >
          {showDiacritics ? <EyeOff className="size-4" /> : <Eye className="size-4" />} ゛゜
        </button>
        <button
          onClick={() => dispatch({ type: "togglePalatalizers" })}
          className="border-white/50 bg-sky-500/10 col-start-3 flex gap-2 items-center justify-around"
        >
          {showPalatalizers ? <EyeOff className="size-4" /> : <Eye className="size-4" />} やゆよ
        </button>
      </div>

      <div className="flex flex-col items-center gap-5">
        {allHiraganas.map((hiraganas, index) => (
          <div key={index} className="flex gap-2.5">
            {hiraganas.map((data) => (
              <div key={data.char}>
                <Kana
                  data={data}
                  showDiacritics={showDiacritics}
                  showPalatalizers={showPalatalizers}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
