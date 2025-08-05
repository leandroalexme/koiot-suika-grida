var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/array_util.ts
var forEach = (array, cb) => {
  for (let i = 0, len = array.length; i < len; i++) {
    cb(array[i], i);
  }
};
var arrMap = (array, cb) => {
  const ret = [];
  for (let i = 0, len = array.length; i < len; i++) {
    ret.push(cb(array[i], i));
  }
  return ret;
};
var arrMapRevert = (array, cb) => {
  const ret = [];
  for (let i = array.length - 1; i >= 0; i--) {
    ret.push(cb(array[i], i));
  }
  return ret;
};
var arrEvery = (array, cb) => {
  for (let i = 0, len = array.length; i < len; i++) {
    if (!cb(array[i], i)) {
      return false;
    }
  }
  return true;
};
var swap = (arr, i, j) => {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
};

// src/color.ts
var parseRGBAStr = ({ r, g, b, a }) => {
  return `rgba(${r},${g},${b},${a})`;
};
var parseRGBStr = ({
  r,
  g,
  b
}) => {
  return `rgb(${r},${g},${b})`;
};
var normalizeHex = (hex) => {
  hex = hex.toUpperCase();
  const match = hex.match(/[0-9A-F]{1,6}/);
  if (!match) {
    return "";
  }
  hex = match[0];
  if (hex.length === 6) {
    return hex;
  }
  if (hex.length === 4 || hex.length === 5) {
    hex = hex.slice(0, 3);
  }
  if (hex.length === 3) {
    return hex.split("").map((c) => c + c).join("");
  }
  return hex.padEnd(6, hex);
};
var parseRGBToHex = (rgb) => {
  const { r, g, b } = rgb;
  const hex = r << 16 | g << 8 | b;
  return hex.toString(16).toUpperCase().padStart(6, "0");
};
var parseHexToRGB = (hex) => {
  hex = normalizeHex(hex);
  if (!hex) {
    return null;
  }
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return { r, g, b };
};
var parseHexToRGBA = (hex) => {
  hex = normalizeHex(hex);
  if (!hex) {
    return null;
  }
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const aStr = hex.slice(6, 8);
  const a = aStr ? parseInt(aStr, 16) / 255 : 1;
  return { r, g, b, a };
};

// src/common.ts
import { v4 as uuidv4 } from "uuid";
var noop = () => {
};
var genUuid = () => {
  return uuidv4();
};
var increaseIdGenerator = () => {
  let count = 0;
  return () => {
    const id = String(count);
    count++;
    return id;
  };
};
var objectNameGenerator = {
  maxIdxMap: /* @__PURE__ */ new Map(),
  gen(type) {
    var _a;
    let idx = (_a = this.maxIdxMap.get(type)) != null ? _a : 0;
    idx++;
    this.maxIdxMap.set(type, idx);
    return `${type} ${idx}`;
  },
  setMaxIdx(objectName) {
    var _a;
    const match = objectName.match(/^(.*)\s+(\d+)$/);
    if (match) {
      const [, type, idxStr] = match;
      const idx = Number(idxStr);
      this.maxIdxMap.set(type, Math.max((_a = this.maxIdxMap.get(type)) != null ? _a : 0, idx));
    }
  }
};
var getClosestTimesVal = (value, segment) => {
  const n = Math.floor(value / segment);
  const left = segment * n;
  const right = segment * (n + 1);
  return value - left <= right - value ? left : right;
};
var viewportCoordsToSceneUtil = (x, y, zoom, scrollX, scrollY, round = false) => {
  let newX = scrollX + x / zoom;
  let newY = scrollY + y / zoom;
  if (round) {
    newX = Math.round(newX);
    newY = Math.round(newY);
  }
  return {
    x: newX,
    y: newY
  };
};
var sceneCoordsToViewportUtil = (x, y, zoom, scrollX, scrollY) => {
  return {
    x: (x - scrollX) * zoom,
    y: (y - scrollY) * zoom
  };
};
var nearestPixelVal = (n) => {
  const left = Math.floor(n);
  const right = Math.ceil(n);
  return (n - left < right - n ? left : right) + 0.5;
};
var isSameArray = (a1, a2) => {
  if (a1.length !== a2.length)
    return false;
  const map = /* @__PURE__ */ new Map();
  for (let i = 0, len = a1.length; i < len; i++) {
    map.set(a1[i], true);
  }
  for (let i = 0, len = a2.length; i < len; i++) {
    if (!map.get(a2[i])) {
      return false;
    }
  }
  return true;
};
var remainDecimal = (num, precision = 2) => {
  return Number(num.toFixed(precision));
};
var parseToNumber = (str, precision = 2) => {
  if (!str)
    return NaN;
  const num = Number(str);
  if (Number.isNaN(num)) {
    return NaN;
  }
  return remainDecimal(num, precision);
};
var shallowCompareArrays = (a1, a2) => {
  if (a1.length !== a2.length) {
    return false;
  }
  for (let i = 0, len = a1.length; i < len; i++) {
    if (a1[i] !== a2[i])
      return false;
  }
  return true;
};
var getDevicePixelRatio = () => {
  return window.devicePixelRatio || 1;
};
var calcCoverScale = (w, h, cw, ch) => {
  if (w === 0 || h === 0)
    return 1;
  const scaleW = cw / w;
  const scaleH = ch / h;
  const scale = Math.max(scaleW, scaleH);
  return scale;
};
var getClosestValInSortedArr = (sortedArr, target) => {
  if (sortedArr.length === 0) {
    throw new Error("sortedArr can not be empty");
  }
  if (sortedArr.length === 1) {
    return sortedArr[0];
  }
  let left = 0;
  let right = sortedArr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (sortedArr[mid] === target) {
      return sortedArr[mid];
    } else if (sortedArr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  if (left >= sortedArr.length) {
    return sortedArr[right];
  }
  if (right < 0) {
    return sortedArr[left];
  }
  return Math.abs(sortedArr[right] - target) <= Math.abs(sortedArr[left] - target) ? sortedArr[right] : sortedArr[left];
};
var isWindows = () => {
  return navigator.platform.toLowerCase().includes("win") || navigator.userAgent.includes("Windows");
};
var escapeHtml = (str) => {
  if (typeof str == "string") {
    return str.replace(/<|&|>/g, (matches) => {
      return {
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;"
      }[matches];
    });
  }
  return "";
};
var getContentLength = (content) => {
  let count = 0;
  for (const _ of content) {
    count++;
  }
  return count;
};
var sliceContent = (content, start, end) => {
  let res = "";
  let i = 0;
  for (const char of content) {
    if (end !== void 0 && i >= end) {
      break;
    }
    if (i >= start) {
      res += char;
    }
    i++;
  }
  return res;
};

// src/event_emitter.ts
var EventEmitter = class {
  constructor() {
    __publicField(this, "eventMap", {});
  }
  on(eventName, listener) {
    if (!this.eventMap[eventName]) {
      this.eventMap[eventName] = [];
    }
    this.eventMap[eventName].push(listener);
    return this;
  }
  emit(eventName, ...args) {
    const listeners = this.eventMap[eventName];
    if (!listeners || listeners.length === 0)
      return false;
    listeners.forEach((listener) => {
      listener(...args);
    });
    return true;
  }
  off(eventName, listener) {
    if (this.eventMap[eventName]) {
      this.eventMap[eventName] = this.eventMap[eventName].filter(
        (item) => item !== listener
      );
    }
    return this;
  }
};

// src/lodash.ts
import cloneDeep from "lodash.clonedeep";
import debounce from "lodash.debounce";
import isEqual from "lodash.isequal";
import omit from "lodash.omit";
import pick from "lodash.pick";
import throttle from "lodash.throttle";
export {
  EventEmitter,
  arrEvery,
  arrMap,
  arrMapRevert,
  calcCoverScale,
  cloneDeep,
  debounce,
  escapeHtml,
  forEach,
  genUuid,
  getClosestTimesVal,
  getClosestValInSortedArr,
  getContentLength,
  getDevicePixelRatio,
  increaseIdGenerator,
  isEqual,
  isSameArray,
  isWindows,
  nearestPixelVal,
  noop,
  normalizeHex,
  objectNameGenerator,
  omit,
  parseHexToRGB,
  parseHexToRGBA,
  parseRGBAStr,
  parseRGBStr,
  parseRGBToHex,
  parseToNumber,
  pick,
  remainDecimal,
  sceneCoordsToViewportUtil,
  shallowCompareArrays,
  sliceContent,
  swap,
  throttle,
  viewportCoordsToSceneUtil
};
//# sourceMappingURL=common.es.js.map
