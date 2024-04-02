import { ObjTime } from "./type";

export default function (obj: ObjTime) {
  const { hour = 0, minute = 0, second = 0 } = obj;
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