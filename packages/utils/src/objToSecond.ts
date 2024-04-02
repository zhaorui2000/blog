import { ObjTime } from "./type";

export default function (obj: ObjTime) {
    const { hour = 0, minute = 0, second = 0 } = obj;
    return Number(hour) * 3600 + Number(minute) * 60 + Number(second)
}