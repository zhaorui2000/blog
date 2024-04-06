import { persistentAtom } from '@nanostores/persistent';
import { atom } from 'nanostores';
import { log } from './../store';
import { produce } from 'immer';
import { objToSecond, objTimeOperate } from '@blog/utils';

/*
  {
    "startTime":"[objTime]【开始时间】",
    "duration":"[objTime]【持续时间】",
    "isLock":"[boolean]是否锁定",
    "startTimeOffset":"[objTime]【开始时间偏移】",
    "durationOffset":"[objTime]【持续时间偏移】",
    "id":"[string]【唯一key】",
    "title":"[string]【标题】"
  }
*/
export const $list = persistentAtom('list', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});
export const $isShowAdd = atom(false);
export const $addData = atom(false);

export function updateList(startIndex = 0) {
  log.trace('重新计算列表', '参数:下标', startIndex);
  $list.set(
    produce($list.get(), (draft) => {
      draft.sort((a, b) => {
        return objToSecond(
          objTimeOperate(a.startTime).subtract(b.startTime).add(a.startTimeOffset).subtract(b.startTimeOffset).done(),
        );
      });
    }),
  );
}

export function resetList(startIndex = 0) {
  log.trace('重置列表', '参数:下标', startIndex);
  $list.set(
    produce($list.get(), (draft) => {
      for (let i = startIndex; i < draft.length; ++i) {
        draft[i].startTimeOffset = { hour: 0, minute: 0, second: 0 };
        draft[i].durationOffset = { hour: 0, minute: 0, second: 0 };
      }
    }),
  );
  updateList();
}
