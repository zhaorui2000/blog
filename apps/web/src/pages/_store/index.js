import { persistentAtom } from '@nanostores/persistent';
import { atom } from 'nanostores';
import { log } from './../store';

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
}

export function resetList(startIndex = 0) {
  log.trace('重置列表', '参数:下标', startIndex);
}
