import dayjs from 'dayjs';

export default function time2Arr(time = dayjs()) {
  return dayjs(time).format('HH:mm:ss').split(':');
}
