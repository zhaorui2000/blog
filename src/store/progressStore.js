import { persistentAtom } from '@nanostores/persistent';
import LZString from 'lz-string';

export const $progressList = persistentAtom('progressList', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
  listen: false,
});

export const $progressGroup = persistentAtom('progressGroup', [], {
  encode(value) {
    return LZString.compress(JSON.stringify(value));
  },
  decode(value) {
    return JSON.parse(LZString.decompress(value));
  },
  listen: false,
});
