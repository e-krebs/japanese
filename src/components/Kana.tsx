import { twMerge } from "tailwind-merge";

import type { Char } from "../data";
import { useKanaProps } from "../hooks";

interface KanaProps {
  kana: Char;
  isDiacritic?: boolean;
  isPalatalizer?: boolean;
  hasPalatalizers?: boolean;
}

export const Kana = ({
  kana,
  isDiacritic = false,
  isPalatalizer = false,
  hasPalatalizers: overrideHasPalatalizers = false,
}: KanaProps) => {
  const { showDiacritics, showPalatalizers } = useKanaProps();

  const hasDiacritics = !!(kana["゛"] || kana["゜"]);
  const hasPalatalizers = overrideHasPalatalizers || !!(kana["や"] || kana["ゆ"] || kana["よ"]);

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
          {kana.char}
        </div>
        <div className={twMerge("text-base", (isDiacritic || isPalatalizer) && "text-xs")}>
          {kana.romaji}
        </div>
      </div>
      {showDiacritics && (
        <>
          {kana["゛"] && (
            <Kana
              kana={{ char: kana["゛"].char, romaji: kana["゛"].romaji }}
              isDiacritic={true}
              hasPalatalizers={!!(kana["゛"]?.["や"] || kana["゛"]?.["ゆ"] || kana["゛"]?.["よ"])}
            />
          )}
          {kana["゜"] && (
            <Kana
              kana={{ char: kana["゜"].char, romaji: kana["゜"].romaji }}
              isDiacritic={true}
              hasPalatalizers={!!(kana["゜"]?.["や"] || kana["゜"]?.["ゆ"] || kana["゜"]?.["よ"])}
            />
          )}
        </>
      )}
      {showPalatalizers && hasPalatalizers && (
        <div className="flex overflow-visible max-w-17.5">
          <div className="grid grid-cols-[repeat(3,minmax(auto,1fr))]">
            {kana["や"] && <Kana kana={kana["や"]} isPalatalizer={true} />}
            {kana["ゆ"] && <Kana kana={kana["ゆ"]} isPalatalizer={true} />}
            {kana["よ"] && <Kana kana={kana["よ"]} isPalatalizer={true} />}
            {showDiacritics && (
              <>
                {(kana["゛"]?.["や"] || kana["゛"]?.["ゆ"] || kana["゛"]?.["よ"]) && (
                  <>
                    {kana["゛"]?.["や"] && (
                      <Kana kana={kana["゛"]["や"]} isPalatalizer={true} isDiacritic={true} />
                    )}
                    {kana["゛"]?.["ゆ"] && (
                      <Kana kana={kana["゛"]["ゆ"]} isPalatalizer={true} isDiacritic={true} />
                    )}
                    {kana["゛"]?.["よ"] && (
                      <Kana kana={kana["゛"]["よ"]} isPalatalizer={true} isDiacritic={true} />
                    )}
                  </>
                )}
                {(kana["゜"]?.["や"] || kana["゜"]?.["ゆ"] || kana["゜"]?.["よ"]) && (
                  <>
                    {kana["゜"]?.["や"] && (
                      <Kana kana={kana["゜"]["や"]} isPalatalizer={true} isDiacritic={true} />
                    )}
                    {kana["゜"]?.["ゆ"] && (
                      <Kana kana={kana["゜"]["ゆ"]} isPalatalizer={true} isDiacritic={true} />
                    )}
                    {kana["゜"]?.["よ"] && (
                      <Kana kana={kana["゜"]["よ"]} isPalatalizer={true} isDiacritic={true} />
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
