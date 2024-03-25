import dayjs from 'dayjs';
import { type UnitType } from 'dayjs';
export default function transToDayjs(obj: Record<UnitType, number>) {
  return Object.entries(obj).reduce((pre,[key, value]) => {
    return pre.set(key as UnitType, value);
  },dayjs());
}
