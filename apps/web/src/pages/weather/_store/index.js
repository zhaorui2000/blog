import { persistentAtom } from '@nanostores/persistent';
export const $showType = persistentAtom('weather-show-type', [16], {
  decode: (value) => JSON.parse(value),
  encode: (value) => JSON.stringify(value),
});
