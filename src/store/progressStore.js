import { persistentAtom } from "@nanostores/persistent";

export const $progressList = persistentAtom('progressList', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
  listen: false
});