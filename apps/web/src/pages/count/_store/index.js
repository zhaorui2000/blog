import { atom } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';
export const $count = persistentAtom('count', 0, {
  decode: (value) => Number(value),
});
