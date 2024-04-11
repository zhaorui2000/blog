import dayjs from 'dayjs';
import { ObjTime } from './type';
import transToObjTime from './transToObjTime';

export default function (obj: ObjTime | dayjs.Dayjs) {
  let result: ObjTime = {};
  if (dayjs.isDayjs(obj)) {
    result = transToObjTime(obj);
  } else {
    result = { hour: Number(obj?.hour ?? 0), minute: obj?.minute ?? 0, second: obj?.second ?? 0 };
  }
  const operate = {
    add(newObj: ObjTime | dayjs.Dayjs) {
      if (dayjs.isDayjs(newObj)) {
        newObj = transToObjTime(newObj);
      }
      result = {
        hour: Number(result.hour) + Number(newObj.hour),
        minute: Number(result.minute) + Number(newObj.minute),
        second: Number(result.second) + Number(newObj.second),
      };
      return this;
    },
    subtract(newObj: ObjTime | dayjs.Dayjs) {
      if (dayjs.isDayjs(newObj)) {
        newObj = transToObjTime(newObj);
      }
      result = {
        hour: Number(result.hour) - Number(newObj.hour),
        minute: Number(result.minute) - Number(newObj.minute),
        second: Number(result.second) - Number(newObj.second),
      };
      return this;
    },
    done() {
      return result;
    },
  };
  return operate;
}
