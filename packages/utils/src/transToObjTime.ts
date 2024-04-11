import dayjs from "dayjs";

export default function transToObjTime(obj: dayjs.Dayjs) {
  let hour = 0, minute = 0, second = 0;
  if (dayjs.isDayjs(obj)) {
    hour = obj.get("hour")
    minute = obj.get("minute")
    second = obj.get("second")
  }
  return { hour, minute, second }
} 