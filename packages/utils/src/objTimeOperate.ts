import dayjs from "dayjs";
import { ObjTime } from "./type";

export default function (obj: ObjTime | dayjs.Dayjs) {
  let hour = 0, minute = 0, second = 0;
  if (dayjs.isDayjs(obj)) {
    hour = obj.get("hour")
    minute = obj.get("minute")
    second = obj.get("second")
  } else {
    hour = Number(obj.hour) ?? 0
    minute = Number(obj.minute) ?? 0
    second = Number(obj.second) ?? 0
  }
  let result = { hour, minute, second }
  const operate = {
    add(newObj: ObjTime) {
      result = { hour: Number(result.hour) + Number(newObj.hour), minute: Number(result.minute) + Number(newObj.minute), second: Number(result.second) + Number(newObj.second) }
      return this;
    },
    subtract(newObj: ObjTime) {
      result = { hour: Number(result.hour) - Number(newObj.hour), minute: Number(result.minute) - Number(newObj.minute), second: Number(result.second) - Number(newObj.second) }
      return this;
    },
    done() {
      return result
    }
  }
  return operate
} 