import { persistentAtom } from '@nanostores/persistent';
import { WebLogService } from '@blog/utils';
import { atom } from 'nanostores';

export const log = new WebLogService();
export const $list = persistentAtom('list', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});
export const $isShowAdd = atom(false);
export const $addData = atom(false);
