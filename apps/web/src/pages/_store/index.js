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
    "title":"[string]【标题】",
    "index":"[number]【下标】",
    "label":"[string]【分类标签】"
  }
*/
export const $list = persistentAtom('list', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});
export const $isShowAdd = atom(false);
export const $addData = atom(false);
export const $endOfDay = persistentAtom(
  'endOfDay',
  { hour: 1, minute: 0, second: 0 },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);

export function sortList({ divideTime = { hour: 0, minute: 0, second: 0 } } = {}) {
  log.trace('重新计算列表顺序', '参数', [...arguments]);
  $list.set(
    produce($list.get(), (draft) => {
      // ------- 排序 -------
      draft.sort((a, b) => {
        return objToSecond(
          objTimeOperate(a.startTime).subtract(b.startTime).add(a.startTimeOffset).subtract(b.startTimeOffset).done(),
        );
      });
    }),
  );
}
export function calcList({ startIndex = 0 } = {}) {
  log.trace('重新计算开始时间偏移', '参数', [...arguments]);
  // ------- 重新计算开始时间偏移 -------
  let totalOffset = { hour: 0, minute: 0, second: 0 };
  $list.set(
    produce($list.get(), (draft) => {
      for (let i = startIndex; i < draft.length; ++i) {
        if (draft[i].isLock) {
          totalOffset = { hour: 0, minute: 0, second: 0 };
        } else {
          totalOffset = objTimeOperate(totalOffset).add(draft[i].durationOffset).done();
        }
        draft[i].startTimeOffset = objTimeOperate(draft[i].startTimeOffset).add(totalOffset).done();
        draft[i].index = i;
      }
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
  sortList();
}
