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
    "calcStartTimeOffset":"[objTime]【计算开始时间偏移】",
    "selfStartTimeOffset":"[objTime]【开始时间偏移】",
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
export const $currentSelectLabel = persistentAtom('currentSelectLabel', '全部');
export const $labelList = persistentAtom(
  'labelList',
  [
    {
      name: '星期一',
    },
    {
      name: '星期二',
    },
    {
      name: '星期三',
    },
    {
      name: '星期四',
    },
    {
      name: '星期五',
    },
    {
      name: '星期六',
    },
    {
      name: '星期日',
    },
  ],
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);
export const $isShowAdd = atom(false);
export const $addData = atom(false);
export const $endOfDay = persistentAtom(
  'endOfDay',
  { hour: 0, minute: 0, second: 0 },
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
      return draft
        .toSorted((a, b) =>
          objToSecond(
            objTimeOperate(a.startTime)
              .add(a.selfStartTimeOffset)
              .add(a.calcStartTimeOffset)
              .subtract(b.startTime)
              .subtract(b.selfStartTimeOffset)
              .subtract(b.calcStartTimeOffset)
              .done(),
          ),
        )
        .map((item, index) => ({ ...item, index }));
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
        draft[i] = { ...draft[i], index: i, calcStartTimeOffset: totalOffset };
        if (draft[i].isLock) {
          totalOffset = { hour: 0, minute: 0, second: 0 };
        } else {
          totalOffset = objTimeOperate(totalOffset).add(draft[i].durationOffset).done();
        }
      }
    }),
  );
}

export function resetList(startIndex = 0) {
  log.trace('重置列表', '参数:下标', startIndex);
  $list.set(
    produce($list.get(), (draft) => {
      for (let i = startIndex; i < draft.length; ++i) {
        draft[i].selfStartTimeOffset = { hour: 0, minute: 0, second: 0 };
        draft[i].calcStartTimeOffset = { hour: 0, minute: 0, second: 0 };
        draft[i].durationOffset = { hour: 0, minute: 0, second: 0 };
      }
    }),
  );
  sortList();
}
