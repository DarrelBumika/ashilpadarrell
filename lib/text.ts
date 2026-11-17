export type TextWord = { text: string; bold?: boolean };
export type TextLine = TextWord[];
export type TextBlock = TextLine[];

/** Flattens display lines into a single readable string for aria-label. */
export const toPlainText = (block: TextBlock) =>
  block.map((line) => line.map((word) => word.text).join(" ")).join(" ");
