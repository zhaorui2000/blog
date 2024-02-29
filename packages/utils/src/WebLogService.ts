import { persistentAtom } from '@nanostores/persistent';
import { type WritableAtom } from 'nanostores';

export enum LOG_LEVEL {
  TRACE = 0,
  DEBUG = 1,
  INFO = 2,
  WARN = 3,
  ERROR = 4,
}

type ArgsType = any[];

export interface IWebLogService {
  trace(...args: ArgsType): void;
  debug(...args: ArgsType): void;
  info(...args: ArgsType): void;
  warn(...args: ArgsType): void;
  error(...args: ArgsType): void;
  setLevel(enabled: LOG_LEVEL): void;
}

export default class WebLogService implements IWebLogService {
  private _logLevel$: WritableAtom<number> = persistentAtom<number>('_logLevel', LOG_LEVEL.INFO, {
    encode: String,
    decode: Number,
  });

  trace(...args: ArgsType): void {
    if (this._logLevel$.get() <= LOG_LEVEL.TRACE) {
      this._log(LOG_LEVEL.TRACE, ...args);
    }
  }
  debug(...args: ArgsType): void {
    if (this._logLevel$.get() <= LOG_LEVEL.DEBUG) {
      this._log(LOG_LEVEL.DEBUG, ...args);
    }
  }
  info(...args: ArgsType): void {
    if (this._logLevel$.get() <= LOG_LEVEL.INFO) {
      this._log(LOG_LEVEL.INFO, ...args);
    }
  }
  warn(...args: ArgsType): void {
    if (this._logLevel$.get() <= LOG_LEVEL.WARN) {
      this._log(LOG_LEVEL.WARN, ...args);
    }
  }
  error(...args: ArgsType): void {
    if (this._logLevel$.get() <= LOG_LEVEL.ERROR) {
      this._log(LOG_LEVEL.ERROR, ...args);
    }
  }

  setLevel(logLevel: LOG_LEVEL): void {
    this._logLevel$.set(logLevel);
  }

  private _log(logLevel: LOG_LEVEL, ...args: ArgsType): void {
    const color = {
      [LOG_LEVEL.TRACE]: '#909399',
      [LOG_LEVEL.DEBUG]: '#67c23a',
      [LOG_LEVEL.INFO]: '#409eff',
      [LOG_LEVEL.WARN]: '#e6a23c',
      [LOG_LEVEL.ERROR]: '#f56c6c',
    }[logLevel];
    const bgColor = {
      [LOG_LEVEL.TRACE]: '#f4f4f5',
      [LOG_LEVEL.DEBUG]: '#f0f9eb',
      [LOG_LEVEL.INFO]: '#ecf5ff',
      [LOG_LEVEL.WARN]: '#fdf6ec',
      [LOG_LEVEL.ERROR]: '#fef0f0',
    }[logLevel];
    const bdColor = {
      [LOG_LEVEL.TRACE]: '#e9e9eb',
      [LOG_LEVEL.DEBUG]: '#e1f3d8',
      [LOG_LEVEL.INFO]: '#d9ecff',
      [LOG_LEVEL.WARN]: '#faecd8',
      [LOG_LEVEL.ERROR]: '#fde2e2',
    }[logLevel];
    console.log(
      `%c${LOG_LEVEL[logLevel]}%c ${args[0]}`,
      `color:${color};background-color:${bgColor};border:1px solid ${bdColor};padding:.5rem 1.5rem;border-radius: 4px`,
      `color:${color}`,
    );
    for (let i = 1; i < args.length; i = i + 2) {
      console.log(
        `%c${args[i]}`,
        `color:${color};background-color:${bgColor};border:1px solid ${bdColor};padding:.125rem .375rem;border-radius: 2px`,
        args[i + 1]
      );
    }
  }
}
