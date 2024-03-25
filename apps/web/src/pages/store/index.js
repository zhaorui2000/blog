import { persistentAtom } from '@nanostores/persistent';
import { WebLogService } from '@blog/utils';

export const log = new WebLogService();
export const $list = persistentAtom('list', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});
