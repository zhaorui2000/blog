import WebLogService from './WebLogService';
import debounce from './debounce';
import transToDayjs from './transToDayjs';
import isNil from './isNil';
import isObject from './isObject';
import secondToObj from './secondToObj';
import objToSecond from './objToSecond';
import objTimeOperate from './objTimeOperate';
import transToObjTime from './transToObjTime';
import isMathMediaMaxWidth from './dom/isMathMediaMaxWidth';
import axios from './axios';
import * as randash from 'radash';
export {
  axios,
  transToObjTime,
  isNil,
  WebLogService,
  debounce,
  transToDayjs,
  isObject,
  secondToObj,
  objToSecond,
  objTimeOperate,
};
export const dom = { isMathMediaMaxWidth };
export default randash;
