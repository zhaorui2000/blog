import { Subject, debounceTime } from 'rxjs';
export default function debounce(func: Function, time: number = 700) {
  const subject = new Subject();
  let isWait = false;
  subject.pipe(debounceTime(time)).subscribe(() => {
    isWait = false;
  });
  let result = function (...args: any[]) {
    if (!isWait) {
      func.call(null, ...args);
      isWait = true;
    }
    subject.next(undefined);
  };
  return result;
}
