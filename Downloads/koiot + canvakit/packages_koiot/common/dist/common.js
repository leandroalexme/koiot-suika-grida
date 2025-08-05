class o {
  constructor() {
    this.listeners = /* @__PURE__ */ new Map();
  }
  on(t, n) {
    this.listeners.has(t) || this.listeners.set(t, /* @__PURE__ */ new Set()), this.listeners.get(t).add(n);
  }
  off(t, n) {
    const i = this.listeners.get(t);
    i && (i.delete(n), i.size === 0 && this.listeners.delete(t));
  }
  emit(t, ...n) {
    const i = this.listeners.get(t);
    i && i.forEach((r) => {
      try {
        r(...n);
      } catch (s) {
        console.error(`Error in event listener for "${String(t)}":`, s);
      }
    });
  }
  removeAllListeners() {
    this.listeners.clear();
  }
}
function x() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
    const t = Math.random() * 16 | 0;
    return (e === "x" ? t : t & 3 | 8).toString(16);
  });
}
function l() {
  return window.devicePixelRatio || 1;
}
function c(e) {
  let t = null, n;
  return (...i) => {
    n = i, t === null && (t = requestAnimationFrame(() => {
      e(...n), t = null;
    }));
  };
}
function u(e, t, n) {
  return Math.min(Math.max(e, t), n);
}
function a(e, t, n) {
  return e >= n.x && e <= n.x + n.width && t >= n.y && t <= n.y + n.height;
}
function f(e, t, n, i, r) {
  return {
    x: (e - i) * n,
    y: (t - r) * n
  };
}
function h(e, t, n, i, r) {
  return {
    x: e / n + i,
    y: t / n + r
  };
}
function d() {
}
function g() {
  let e = 0;
  return () => (++e).toString();
}
function m() {
}
function p() {
}
function w() {
  return navigator.platform.indexOf("Win") > -1;
}
export {
  o as EventEmitter,
  m as arrayUtil,
  u as clamp,
  p as commonUtils,
  x as genUuid,
  l as getDevicePixelRatio,
  g as increaseIdGenerator,
  a as isPointInRect,
  w as isWindows,
  d as noop,
  c as rafThrottle,
  f as sceneToViewport,
  h as viewportToScene
};
