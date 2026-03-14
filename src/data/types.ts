import { type hiraganas } from "./hiraganas";

export type SyllabaryType = "hiragana" | "katakana";

export type Diacritic = "゛" | "゜";
export type Palatalizer = "や" | "ゆ" | "よ";

export interface BaseChar {
  char: string;
  romaji: string;
}

export type Char = BaseChar & {
  [Key in Diacritic | Palatalizer]?: Char;
};

export type Hiraganas = typeof hiraganas;
