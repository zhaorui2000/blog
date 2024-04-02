import { persistentAtom } from '@nanostores/persistent';
import { atom } from 'nanostores';
import { produce } from 'immer';
import { log } from './../store';

export const $list = persistentAtom('list', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});
export const $isShowAdd = atom(false);
export const $addData = atom(false);

export function updateList() {
  log.trace('重新计算列表');
  $list.set(
    produce($list.get(), (draft) => {
      draft.sort((a, b) => {
        return (
          (a.start.hour + a.diff.hour - b.start.hour - b.diff.hour) * 60 +
          (a.start.minute + a.diff.minute - b.start.minute - b.diff.minute)
        );
      });
      let totalDiff = { hour: 0, minute: 0, second: 0 };
      for (let i = 0; i < draft.length; ++i) {
        const { diff, isLock, endDiff } = draft[i];
        if (isLock) {
          totalDiff = { hour: 0, minute: 0, second: 0 };
          continue;
        }
        totalDiff = {
          hour: totalDiff.hour + diff.hour,
          minute: totalDiff.minute + diff.minute,
          second: totalDiff.second + diff.second,
        };
        draft[i].diff = totalDiff;
      }
    }),
  );
}
