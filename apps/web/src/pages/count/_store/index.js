import { atom } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';
export const $count = persistentAtom('count-value', 0, {
  decode: (value) => Number(value),
});
export const $isLock = persistentAtom('count-isLock', false, {
  decode: (value) => value === 'true',
});
export const $isAutoLock = persistentAtom('count-isAutoLock', false, {
  decode: (value) => value === 'true',
});
export const $isFast = persistentAtom('count-isFast', false, {
  decode: (value) => value === 'true',
});
