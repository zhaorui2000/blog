import { persistentAtom } from '@nanostores/persistent';
import { WebLogService } from '@blog/utils';

export const log = new WebLogService();
export const $list = persistentAtom(
  'list',
  [
    { title: '1', start: '', end: '' },
    { title: '2', start: '', end: '' },
  ],
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);
