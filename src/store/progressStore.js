import { persistentAtom } from '@nanostores/persistent';
import { atom } from 'nanostores';

export const $progressList = persistentAtom('progressList', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
  listen: false,
});

export const $progressGroup = persistentAtom('progressGroup', [], {
  encode(value) {
    return JSON.stringify(value);
  },
  decode(value) {
    return JSON.parse(value);
  },
  listen: false,
});

export const $isShowEdit = atom(false);
export const $isShowAddMinute = atom(false);
export const $editIndex = atom(-1);
export const $groupIndex = persistentAtom('groupIndex', 1);
