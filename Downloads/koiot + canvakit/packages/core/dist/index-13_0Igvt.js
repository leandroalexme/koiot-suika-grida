var Qo = Object.defineProperty;
var ta = (s, t, e) => t in s ? Qo(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var g = (s, t, e) => ta(s, typeof t != "symbol" ? t + "" : t, e);
class Bi {
  constructor(t, e, n) {
    this.desc = t, this.editor = e, this.elements = n;
  }
  redo() {
    var t;
    for (const e of this.elements) {
      e.setDeleted(!1);
      const n = e.getParent();
      n && n.insertChild(e, (t = e.attrs.parentIndex) == null ? void 0 : t.position);
    }
    this.editor.selectedElements.setItems(this.elements);
  }
  undo() {
    this.elements.forEach((t) => {
      t.setDeleted(!0), t.removeFromParent();
    }), this.editor.selectedElements.clear();
  }
}
let Un;
const ea = new Uint8Array(16);
function na() {
  if (!Un && (Un = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !Un))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return Un(ea);
}
const at = [];
for (let s = 0; s < 256; ++s)
  at.push((s + 256).toString(16).slice(1));
function sa(s, t = 0) {
  return at[s[t + 0]] + at[s[t + 1]] + at[s[t + 2]] + at[s[t + 3]] + "-" + at[s[t + 4]] + at[s[t + 5]] + "-" + at[s[t + 6]] + at[s[t + 7]] + "-" + at[s[t + 8]] + at[s[t + 9]] + "-" + at[s[t + 10]] + at[s[t + 11]] + at[s[t + 12]] + at[s[t + 13]] + at[s[t + 14]] + at[s[t + 15]];
}
const ia = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), tr = {
  randomUUID: ia
};
function ra(s, t, e) {
  if (tr.randomUUID && !s)
    return tr.randomUUID();
  s = s || {};
  const n = s.random || (s.rng || na)();
  return n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, sa(n);
}
var V = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function re(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
function Fd(s) {
  if (s.__esModule) return s;
  var t = s.default;
  if (typeof t == "function") {
    var e = function n() {
      return this instanceof n ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    e.prototype = t.prototype;
  } else e = {};
  return Object.defineProperty(e, "__esModule", { value: !0 }), Object.keys(s).forEach(function(n) {
    var i = Object.getOwnPropertyDescriptor(s, n);
    Object.defineProperty(e, n, i.get ? i : {
      enumerable: !0,
      get: function() {
        return s[n];
      }
    });
  }), e;
}
var is = { exports: {} };
is.exports;
(function(s, t) {
  var e = 200, n = "__lodash_hash_undefined__", i = 9007199254740991, r = "[object Arguments]", o = "[object Array]", a = "[object Boolean]", h = "[object Date]", l = "[object Error]", d = "[object Function]", u = "[object GeneratorFunction]", p = "[object Map]", m = "[object Number]", x = "[object Object]", y = "[object Promise]", S = "[object RegExp]", w = "[object Set]", b = "[object String]", C = "[object Symbol]", I = "[object WeakMap]", M = "[object ArrayBuffer]", E = "[object DataView]", T = "[object Float32Array]", k = "[object Float64Array]", L = "[object Int8Array]", W = "[object Int16Array]", D = "[object Int32Array]", _ = "[object Uint8Array]", Y = "[object Uint8ClampedArray]", j = "[object Uint16Array]", St = "[object Uint32Array]", Tt = /[\\^$.*+?()[\]{}|]/g, U = /\w*$/, Ct = /^\[object .+?Constructor\]$/, Pt = /^(?:0|[1-9]\d*)$/, O = {};
  O[r] = O[o] = O[M] = O[E] = O[a] = O[h] = O[T] = O[k] = O[L] = O[W] = O[D] = O[p] = O[m] = O[x] = O[S] = O[w] = O[b] = O[C] = O[_] = O[Y] = O[j] = O[St] = !0, O[l] = O[d] = O[I] = !1;
  var bt = typeof V == "object" && V && V.Object === Object && V, wt = typeof self == "object" && self && self.Object === Object && self, J = bt || wt || Function("return this")(), Ce = t && !t.nodeType && t, N = Ce && !0 && s && !s.nodeType && s, In = N && N.exports === Ce;
  function ks(c, f) {
    return c.set(f[0], f[1]), c;
  }
  function Et(c, f) {
    return c.add(f), c;
  }
  function Tn(c, f) {
    for (var v = -1, P = c ? c.length : 0; ++v < P && f(c[v], v, c) !== !1; )
      ;
    return c;
  }
  function Pn(c, f) {
    for (var v = -1, P = f.length, z = c.length; ++v < P; )
      c[z + v] = f[v];
    return c;
  }
  function $e(c, f, v, P) {
    for (var z = -1, H = c ? c.length : 0; ++z < H; )
      v = f(v, c[z], z, c);
    return v;
  }
  function Ne(c, f) {
    for (var v = -1, P = Array(c); ++v < c; )
      P[v] = f(v);
    return P;
  }
  function En(c, f) {
    return c == null ? void 0 : c[f];
  }
  function Ye(c) {
    var f = !1;
    if (c != null && typeof c.toString != "function")
      try {
        f = !!(c + "");
      } catch {
      }
    return f;
  }
  function kn(c) {
    var f = -1, v = Array(c.size);
    return c.forEach(function(P, z) {
      v[++f] = [z, P];
    }), v;
  }
  function Ve(c, f) {
    return function(v) {
      return c(f(v));
    };
  }
  function An(c) {
    var f = -1, v = Array(c.size);
    return c.forEach(function(P) {
      v[++f] = P;
    }), v;
  }
  var As = Array.prototype, Ds = Function.prototype, be = Object.prototype, je = J["__core-js_shared__"], Dn = function() {
    var c = /[^.]+$/.exec(je && je.keys && je.keys.IE_PROTO || "");
    return c ? "Symbol(src)_1." + c : "";
  }(), Rn = Ds.toString, Bt = be.hasOwnProperty, Me = be.toString, Rs = RegExp(
    "^" + Rn.call(Bt).replace(Tt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), oe = In ? J.Buffer : void 0, Ie = J.Symbol, Xe = J.Uint8Array, Mt = Ve(Object.getPrototypeOf, Object), _n = Object.create, Bn = be.propertyIsEnumerable, _s = As.splice, Ue = Object.getOwnPropertySymbols, Te = oe ? oe.isBuffer : void 0, Hn = Ve(Object.keys, Object), Pe = At(J, "DataView"), ae = At(J, "Map"), kt = At(J, "Promise"), Ee = At(J, "Set"), Ze = At(J, "WeakMap"), he = At(Object, "create"), qe = ut(Pe), ce = ut(ae), Je = ut(kt), Qe = ut(Ee), tn = ut(Ze), Jt = Ie ? Ie.prototype : void 0, Ln = Jt ? Jt.valueOf : void 0;
  function Ot(c) {
    var f = -1, v = c ? c.length : 0;
    for (this.clear(); ++f < v; ) {
      var P = c[f];
      this.set(P[0], P[1]);
    }
  }
  function Bs() {
    this.__data__ = he ? he(null) : {};
  }
  function Hs(c) {
    return this.has(c) && delete this.__data__[c];
  }
  function Ls(c) {
    var f = this.__data__;
    if (he) {
      var v = f[c];
      return v === n ? void 0 : v;
    }
    return Bt.call(f, c) ? f[c] : void 0;
  }
  function Wn(c) {
    var f = this.__data__;
    return he ? f[c] !== void 0 : Bt.call(f, c);
  }
  function en(c, f) {
    var v = this.__data__;
    return v[c] = he && f === void 0 ? n : f, this;
  }
  Ot.prototype.clear = Bs, Ot.prototype.delete = Hs, Ot.prototype.get = Ls, Ot.prototype.has = Wn, Ot.prototype.set = en;
  function rt(c) {
    var f = -1, v = c ? c.length : 0;
    for (this.clear(); ++f < v; ) {
      var P = c[f];
      this.set(P[0], P[1]);
    }
  }
  function Ws() {
    this.__data__ = [];
  }
  function zs(c) {
    var f = this.__data__, v = Ae(f, c);
    if (v < 0)
      return !1;
    var P = f.length - 1;
    return v == P ? f.pop() : _s.call(f, v, 1), !0;
  }
  function Gs(c) {
    var f = this.__data__, v = Ae(f, c);
    return v < 0 ? void 0 : f[v][1];
  }
  function Os(c) {
    return Ae(this.__data__, c) > -1;
  }
  function Ks(c, f) {
    var v = this.__data__, P = Ae(v, c);
    return P < 0 ? v.push([c, f]) : v[P][1] = f, this;
  }
  rt.prototype.clear = Ws, rt.prototype.delete = zs, rt.prototype.get = Gs, rt.prototype.has = Os, rt.prototype.set = Ks;
  function ht(c) {
    var f = -1, v = c ? c.length : 0;
    for (this.clear(); ++f < v; ) {
      var P = c[f];
      this.set(P[0], P[1]);
    }
  }
  function Fs() {
    this.__data__ = {
      hash: new Ot(),
      map: new (ae || rt)(),
      string: new Ot()
    };
  }
  function $s(c) {
    return de(this, c).delete(c);
  }
  function Ns(c) {
    return de(this, c).get(c);
  }
  function Ys(c) {
    return de(this, c).has(c);
  }
  function Vs(c, f) {
    return de(this, c).set(c, f), this;
  }
  ht.prototype.clear = Fs, ht.prototype.delete = $s, ht.prototype.get = Ns, ht.prototype.has = Ys, ht.prototype.set = Vs;
  function yt(c) {
    this.__data__ = new rt(c);
  }
  function js() {
    this.__data__ = new rt();
  }
  function Xs(c) {
    return this.__data__.delete(c);
  }
  function Us(c) {
    return this.__data__.get(c);
  }
  function Zs(c) {
    return this.__data__.has(c);
  }
  function qs(c, f) {
    var v = this.__data__;
    if (v instanceof rt) {
      var P = v.__data__;
      if (!ae || P.length < e - 1)
        return P.push([c, f]), this;
      v = this.__data__ = new ht(P);
    }
    return v.set(c, f), this;
  }
  yt.prototype.clear = js, yt.prototype.delete = Xs, yt.prototype.get = Us, yt.prototype.has = Zs, yt.prototype.set = qs;
  function ke(c, f) {
    var v = on(c) || Re(c) ? Ne(c.length, String) : [], P = v.length, z = !!P;
    for (var H in c)
      Bt.call(c, H) && !(z && (H == "length" || di(H, P))) && v.push(H);
    return v;
  }
  function zn(c, f, v) {
    var P = c[f];
    (!(Bt.call(c, f) && $n(P, v)) || v === void 0 && !(f in c)) && (c[f] = v);
  }
  function Ae(c, f) {
    for (var v = c.length; v--; )
      if ($n(c[v][0], f))
        return v;
    return -1;
  }
  function Ht(c, f) {
    return c && rn(f, hn(f), c);
  }
  function nn(c, f, v, P, z, H, F) {
    var K;
    if (P && (K = H ? P(c, z, H, F) : P(c)), K !== void 0)
      return K;
    if (!Wt(c))
      return c;
    var tt = on(c);
    if (tt) {
      if (K = ci(c), !f)
        return oi(c, K);
    } else {
      var $ = Ft(c), ct = $ == d || $ == u;
      if (Nn(c))
        return De(c, f);
      if ($ == x || $ == r || ct && !H) {
        if (Ye(c))
          return H ? c : {};
        if (K = Lt(ct ? {} : c), !f)
          return ai(c, Ht(K, c));
      } else {
        if (!O[$])
          return H ? c : {};
        K = li(c, $, nn, f);
      }
    }
    F || (F = new yt());
    var xt = F.get(c);
    if (xt)
      return xt;
    if (F.set(c, K), !tt)
      var et = v ? hi(c) : hn(c);
    return Tn(et || c, function(lt, ot) {
      et && (ot = lt, lt = c[ot]), zn(K, ot, nn(lt, f, v, P, ot, c, F));
    }), K;
  }
  function Js(c) {
    return Wt(c) ? _n(c) : {};
  }
  function Qs(c, f, v) {
    var P = f(c);
    return on(c) ? P : Pn(P, v(c));
  }
  function ti(c) {
    return Me.call(c);
  }
  function ei(c) {
    if (!Wt(c) || ui(c))
      return !1;
    var f = an(c) || Ye(c) ? Rs : Ct;
    return f.test(ut(c));
  }
  function ni(c) {
    if (!Kn(c))
      return Hn(c);
    var f = [];
    for (var v in Object(c))
      Bt.call(c, v) && v != "constructor" && f.push(v);
    return f;
  }
  function De(c, f) {
    if (f)
      return c.slice();
    var v = new c.constructor(c.length);
    return c.copy(v), v;
  }
  function sn(c) {
    var f = new c.constructor(c.byteLength);
    return new Xe(f).set(new Xe(c)), f;
  }
  function le(c, f) {
    var v = f ? sn(c.buffer) : c.buffer;
    return new c.constructor(v, c.byteOffset, c.byteLength);
  }
  function Gn(c, f, v) {
    var P = f ? v(kn(c), !0) : kn(c);
    return $e(P, ks, new c.constructor());
  }
  function On(c) {
    var f = new c.constructor(c.source, U.exec(c));
    return f.lastIndex = c.lastIndex, f;
  }
  function si(c, f, v) {
    var P = f ? v(An(c), !0) : An(c);
    return $e(P, Et, new c.constructor());
  }
  function ii(c) {
    return Ln ? Object(Ln.call(c)) : {};
  }
  function ri(c, f) {
    var v = f ? sn(c.buffer) : c.buffer;
    return new c.constructor(v, c.byteOffset, c.length);
  }
  function oi(c, f) {
    var v = -1, P = c.length;
    for (f || (f = Array(P)); ++v < P; )
      f[v] = c[v];
    return f;
  }
  function rn(c, f, v, P) {
    v || (v = {});
    for (var z = -1, H = f.length; ++z < H; ) {
      var F = f[z], K = void 0;
      zn(v, F, K === void 0 ? c[F] : K);
    }
    return v;
  }
  function ai(c, f) {
    return rn(c, Kt(c), f);
  }
  function hi(c) {
    return Qs(c, hn, Kt);
  }
  function de(c, f) {
    var v = c.__data__;
    return gi(f) ? v[typeof f == "string" ? "string" : "hash"] : v.map;
  }
  function At(c, f) {
    var v = En(c, f);
    return ei(v) ? v : void 0;
  }
  var Kt = Ue ? Ve(Ue, Object) : pi, Ft = ti;
  (Pe && Ft(new Pe(new ArrayBuffer(1))) != E || ae && Ft(new ae()) != p || kt && Ft(kt.resolve()) != y || Ee && Ft(new Ee()) != w || Ze && Ft(new Ze()) != I) && (Ft = function(c) {
    var f = Me.call(c), v = f == x ? c.constructor : void 0, P = v ? ut(v) : void 0;
    if (P)
      switch (P) {
        case qe:
          return E;
        case ce:
          return p;
        case Je:
          return y;
        case Qe:
          return w;
        case tn:
          return I;
      }
    return f;
  });
  function ci(c) {
    var f = c.length, v = c.constructor(f);
    return f && typeof c[0] == "string" && Bt.call(c, "index") && (v.index = c.index, v.input = c.input), v;
  }
  function Lt(c) {
    return typeof c.constructor == "function" && !Kn(c) ? Js(Mt(c)) : {};
  }
  function li(c, f, v, P) {
    var z = c.constructor;
    switch (f) {
      case M:
        return sn(c);
      case a:
      case h:
        return new z(+c);
      case E:
        return le(c, P);
      case T:
      case k:
      case L:
      case W:
      case D:
      case _:
      case Y:
      case j:
      case St:
        return ri(c, P);
      case p:
        return Gn(c, P, v);
      case m:
      case b:
        return new z(c);
      case S:
        return On(c);
      case w:
        return si(c, P, v);
      case C:
        return ii(c);
    }
  }
  function di(c, f) {
    return f = f ?? i, !!f && (typeof c == "number" || Pt.test(c)) && c > -1 && c % 1 == 0 && c < f;
  }
  function gi(c) {
    var f = typeof c;
    return f == "string" || f == "number" || f == "symbol" || f == "boolean" ? c !== "__proto__" : c === null;
  }
  function ui(c) {
    return !!Dn && Dn in c;
  }
  function Kn(c) {
    var f = c && c.constructor, v = typeof f == "function" && f.prototype || be;
    return c === v;
  }
  function ut(c) {
    if (c != null) {
      try {
        return Rn.call(c);
      } catch {
      }
      try {
        return c + "";
      } catch {
      }
    }
    return "";
  }
  function Fn(c) {
    return nn(c, !0, !0);
  }
  function $n(c, f) {
    return c === f || c !== c && f !== f;
  }
  function Re(c) {
    return fi(c) && Bt.call(c, "callee") && (!Bn.call(c, "callee") || Me.call(c) == r);
  }
  var on = Array.isArray;
  function _e(c) {
    return c != null && Yn(c.length) && !an(c);
  }
  function fi(c) {
    return Vn(c) && _e(c);
  }
  var Nn = Te || mi;
  function an(c) {
    var f = Wt(c) ? Me.call(c) : "";
    return f == d || f == u;
  }
  function Yn(c) {
    return typeof c == "number" && c > -1 && c % 1 == 0 && c <= i;
  }
  function Wt(c) {
    var f = typeof c;
    return !!c && (f == "object" || f == "function");
  }
  function Vn(c) {
    return !!c && typeof c == "object";
  }
  function hn(c) {
    return _e(c) ? ke(c) : ni(c);
  }
  function pi() {
    return [];
  }
  function mi() {
    return !1;
  }
  s.exports = Fn;
})(is, is.exports);
var oa = is.exports;
const A = /* @__PURE__ */ re(oa);
var aa = "Expected a function", er = NaN, ha = "[object Symbol]", ca = /^\s+|\s+$/g, la = /^[-+]0x[0-9a-f]+$/i, da = /^0b[01]+$/i, ga = /^0o[0-7]+$/i, ua = parseInt, fa = typeof V == "object" && V && V.Object === Object && V, pa = typeof self == "object" && self && self.Object === Object && self, ma = fa || pa || Function("return this")(), ya = Object.prototype, xa = ya.toString, va = Math.max, wa = Math.min, yi = function() {
  return ma.Date.now();
};
function Sa(s, t, e) {
  var n, i, r, o, a, h, l = 0, d = !1, u = !1, p = !0;
  if (typeof s != "function")
    throw new TypeError(aa);
  t = nr(t) || 0, Si(e) && (d = !!e.leading, u = "maxWait" in e, r = u ? va(nr(e.maxWait) || 0, t) : r, p = "trailing" in e ? !!e.trailing : p);
  function m(E) {
    var T = n, k = i;
    return n = i = void 0, l = E, o = s.apply(k, T), o;
  }
  function x(E) {
    return l = E, a = setTimeout(w, t), d ? m(E) : o;
  }
  function y(E) {
    var T = E - h, k = E - l, L = t - T;
    return u ? wa(L, r - k) : L;
  }
  function S(E) {
    var T = E - h, k = E - l;
    return h === void 0 || T >= t || T < 0 || u && k >= r;
  }
  function w() {
    var E = yi();
    if (S(E))
      return b(E);
    a = setTimeout(w, y(E));
  }
  function b(E) {
    return a = void 0, p && n ? m(E) : (n = i = void 0, o);
  }
  function C() {
    a !== void 0 && clearTimeout(a), l = 0, n = h = i = a = void 0;
  }
  function I() {
    return a === void 0 ? o : b(yi());
  }
  function M() {
    var E = yi(), T = S(E);
    if (n = arguments, i = this, h = E, T) {
      if (a === void 0)
        return x(h);
      if (u)
        return a = setTimeout(w, t), m(h);
    }
    return a === void 0 && (a = setTimeout(w, t)), o;
  }
  return M.cancel = C, M.flush = I, M;
}
function Si(s) {
  var t = typeof s;
  return !!s && (t == "object" || t == "function");
}
function Ca(s) {
  return !!s && typeof s == "object";
}
function ba(s) {
  return typeof s == "symbol" || Ca(s) && xa.call(s) == ha;
}
function nr(s) {
  if (typeof s == "number")
    return s;
  if (ba(s))
    return er;
  if (Si(s)) {
    var t = typeof s.valueOf == "function" ? s.valueOf() : s;
    s = Si(t) ? t + "" : t;
  }
  if (typeof s != "string")
    return s === 0 ? s : +s;
  s = s.replace(ca, "");
  var e = da.test(s);
  return e || ga.test(s) ? ua(s.slice(2), e ? 2 : 8) : la.test(s) ? er : +s;
}
var Ma = Sa;
const Ia = /* @__PURE__ */ re(Ma);
var rs = { exports: {} };
rs.exports;
(function(s, t) {
  var e = 200, n = "__lodash_hash_undefined__", i = 1, r = 2, o = 9007199254740991, a = "[object Arguments]", h = "[object Array]", l = "[object AsyncFunction]", d = "[object Boolean]", u = "[object Date]", p = "[object Error]", m = "[object Function]", x = "[object GeneratorFunction]", y = "[object Map]", S = "[object Number]", w = "[object Null]", b = "[object Object]", C = "[object Promise]", I = "[object Proxy]", M = "[object RegExp]", E = "[object Set]", T = "[object String]", k = "[object Symbol]", L = "[object Undefined]", W = "[object WeakMap]", D = "[object ArrayBuffer]", _ = "[object DataView]", Y = "[object Float32Array]", j = "[object Float64Array]", St = "[object Int8Array]", Tt = "[object Int16Array]", U = "[object Int32Array]", Ct = "[object Uint8Array]", Pt = "[object Uint8ClampedArray]", O = "[object Uint16Array]", bt = "[object Uint32Array]", wt = /[\\^$.*+?()[\]{}|]/g, J = /^\[object .+?Constructor\]$/, Ce = /^(?:0|[1-9]\d*)$/, N = {};
  N[Y] = N[j] = N[St] = N[Tt] = N[U] = N[Ct] = N[Pt] = N[O] = N[bt] = !0, N[a] = N[h] = N[D] = N[d] = N[_] = N[u] = N[p] = N[m] = N[y] = N[S] = N[b] = N[M] = N[E] = N[T] = N[W] = !1;
  var In = typeof V == "object" && V && V.Object === Object && V, ks = typeof self == "object" && self && self.Object === Object && self, Et = In || ks || Function("return this")(), Tn = t && !t.nodeType && t, Pn = Tn && !0 && s && !s.nodeType && s, $e = Pn && Pn.exports === Tn, Ne = $e && In.process, En = function() {
    try {
      return Ne && Ne.binding && Ne.binding("util");
    } catch {
    }
  }(), Ye = En && En.isTypedArray;
  function kn(c, f) {
    for (var v = -1, P = c == null ? 0 : c.length, z = 0, H = []; ++v < P; ) {
      var F = c[v];
      f(F, v, c) && (H[z++] = F);
    }
    return H;
  }
  function Ve(c, f) {
    for (var v = -1, P = f.length, z = c.length; ++v < P; )
      c[z + v] = f[v];
    return c;
  }
  function An(c, f) {
    for (var v = -1, P = c == null ? 0 : c.length; ++v < P; )
      if (f(c[v], v, c))
        return !0;
    return !1;
  }
  function As(c, f) {
    for (var v = -1, P = Array(c); ++v < c; )
      P[v] = f(v);
    return P;
  }
  function Ds(c) {
    return function(f) {
      return c(f);
    };
  }
  function be(c, f) {
    return c.has(f);
  }
  function je(c, f) {
    return c == null ? void 0 : c[f];
  }
  function Dn(c) {
    var f = -1, v = Array(c.size);
    return c.forEach(function(P, z) {
      v[++f] = [z, P];
    }), v;
  }
  function Rn(c, f) {
    return function(v) {
      return c(f(v));
    };
  }
  function Bt(c) {
    var f = -1, v = Array(c.size);
    return c.forEach(function(P) {
      v[++f] = P;
    }), v;
  }
  var Me = Array.prototype, Rs = Function.prototype, oe = Object.prototype, Ie = Et["__core-js_shared__"], Xe = Rs.toString, Mt = oe.hasOwnProperty, _n = function() {
    var c = /[^.]+$/.exec(Ie && Ie.keys && Ie.keys.IE_PROTO || "");
    return c ? "Symbol(src)_1." + c : "";
  }(), Bn = oe.toString, _s = RegExp(
    "^" + Xe.call(Mt).replace(wt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Ue = $e ? Et.Buffer : void 0, Te = Et.Symbol, Hn = Et.Uint8Array, Pe = oe.propertyIsEnumerable, ae = Me.splice, kt = Te ? Te.toStringTag : void 0, Ee = Object.getOwnPropertySymbols, Ze = Ue ? Ue.isBuffer : void 0, he = Rn(Object.keys, Object), qe = Kt(Et, "DataView"), ce = Kt(Et, "Map"), Je = Kt(Et, "Promise"), Qe = Kt(Et, "Set"), tn = Kt(Et, "WeakMap"), Jt = Kt(Object, "create"), Ln = ut(qe), Ot = ut(ce), Bs = ut(Je), Hs = ut(Qe), Ls = ut(tn), Wn = Te ? Te.prototype : void 0, en = Wn ? Wn.valueOf : void 0;
  function rt(c) {
    var f = -1, v = c == null ? 0 : c.length;
    for (this.clear(); ++f < v; ) {
      var P = c[f];
      this.set(P[0], P[1]);
    }
  }
  function Ws() {
    this.__data__ = Jt ? Jt(null) : {}, this.size = 0;
  }
  function zs(c) {
    var f = this.has(c) && delete this.__data__[c];
    return this.size -= f ? 1 : 0, f;
  }
  function Gs(c) {
    var f = this.__data__;
    if (Jt) {
      var v = f[c];
      return v === n ? void 0 : v;
    }
    return Mt.call(f, c) ? f[c] : void 0;
  }
  function Os(c) {
    var f = this.__data__;
    return Jt ? f[c] !== void 0 : Mt.call(f, c);
  }
  function Ks(c, f) {
    var v = this.__data__;
    return this.size += this.has(c) ? 0 : 1, v[c] = Jt && f === void 0 ? n : f, this;
  }
  rt.prototype.clear = Ws, rt.prototype.delete = zs, rt.prototype.get = Gs, rt.prototype.has = Os, rt.prototype.set = Ks;
  function ht(c) {
    var f = -1, v = c == null ? 0 : c.length;
    for (this.clear(); ++f < v; ) {
      var P = c[f];
      this.set(P[0], P[1]);
    }
  }
  function Fs() {
    this.__data__ = [], this.size = 0;
  }
  function $s(c) {
    var f = this.__data__, v = De(f, c);
    if (v < 0)
      return !1;
    var P = f.length - 1;
    return v == P ? f.pop() : ae.call(f, v, 1), --this.size, !0;
  }
  function Ns(c) {
    var f = this.__data__, v = De(f, c);
    return v < 0 ? void 0 : f[v][1];
  }
  function Ys(c) {
    return De(this.__data__, c) > -1;
  }
  function Vs(c, f) {
    var v = this.__data__, P = De(v, c);
    return P < 0 ? (++this.size, v.push([c, f])) : v[P][1] = f, this;
  }
  ht.prototype.clear = Fs, ht.prototype.delete = $s, ht.prototype.get = Ns, ht.prototype.has = Ys, ht.prototype.set = Vs;
  function yt(c) {
    var f = -1, v = c == null ? 0 : c.length;
    for (this.clear(); ++f < v; ) {
      var P = c[f];
      this.set(P[0], P[1]);
    }
  }
  function js() {
    this.size = 0, this.__data__ = {
      hash: new rt(),
      map: new (ce || ht)(),
      string: new rt()
    };
  }
  function Xs(c) {
    var f = At(this, c).delete(c);
    return this.size -= f ? 1 : 0, f;
  }
  function Us(c) {
    return At(this, c).get(c);
  }
  function Zs(c) {
    return At(this, c).has(c);
  }
  function qs(c, f) {
    var v = At(this, c), P = v.size;
    return v.set(c, f), this.size += v.size == P ? 0 : 1, this;
  }
  yt.prototype.clear = js, yt.prototype.delete = Xs, yt.prototype.get = Us, yt.prototype.has = Zs, yt.prototype.set = qs;
  function ke(c) {
    var f = -1, v = c == null ? 0 : c.length;
    for (this.__data__ = new yt(); ++f < v; )
      this.add(c[f]);
  }
  function zn(c) {
    return this.__data__.set(c, n), this;
  }
  function Ae(c) {
    return this.__data__.has(c);
  }
  ke.prototype.add = ke.prototype.push = zn, ke.prototype.has = Ae;
  function Ht(c) {
    var f = this.__data__ = new ht(c);
    this.size = f.size;
  }
  function nn() {
    this.__data__ = new ht(), this.size = 0;
  }
  function Js(c) {
    var f = this.__data__, v = f.delete(c);
    return this.size = f.size, v;
  }
  function Qs(c) {
    return this.__data__.get(c);
  }
  function ti(c) {
    return this.__data__.has(c);
  }
  function ei(c, f) {
    var v = this.__data__;
    if (v instanceof ht) {
      var P = v.__data__;
      if (!ce || P.length < e - 1)
        return P.push([c, f]), this.size = ++v.size, this;
      v = this.__data__ = new yt(P);
    }
    return v.set(c, f), this.size = v.size, this;
  }
  Ht.prototype.clear = nn, Ht.prototype.delete = Js, Ht.prototype.get = Qs, Ht.prototype.has = ti, Ht.prototype.set = ei;
  function ni(c, f) {
    var v = Re(c), P = !v && $n(c), z = !v && !P && _e(c), H = !v && !P && !z && Vn(c), F = v || P || z || H, K = F ? As(c.length, String) : [], tt = K.length;
    for (var $ in c)
      Mt.call(c, $) && !(F && // Safari 9 has enumerable `arguments.length` in strict mode.
      ($ == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      z && ($ == "offset" || $ == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      H && ($ == "buffer" || $ == "byteLength" || $ == "byteOffset") || // Skip index properties.
      li($, tt))) && K.push($);
    return K;
  }
  function De(c, f) {
    for (var v = c.length; v--; )
      if (Fn(c[v][0], f))
        return v;
    return -1;
  }
  function sn(c, f, v) {
    var P = f(c);
    return Re(c) ? P : Ve(P, v(c));
  }
  function le(c) {
    return c == null ? c === void 0 ? L : w : kt && kt in Object(c) ? Ft(c) : Kn(c);
  }
  function Gn(c) {
    return Wt(c) && le(c) == a;
  }
  function On(c, f, v, P, z) {
    return c === f ? !0 : c == null || f == null || !Wt(c) && !Wt(f) ? c !== c && f !== f : si(c, f, v, P, On, z);
  }
  function si(c, f, v, P, z, H) {
    var F = Re(c), K = Re(f), tt = F ? h : Lt(c), $ = K ? h : Lt(f);
    tt = tt == a ? b : tt, $ = $ == a ? b : $;
    var ct = tt == b, xt = $ == b, et = tt == $;
    if (et && _e(c)) {
      if (!_e(f))
        return !1;
      F = !0, ct = !1;
    }
    if (et && !ct)
      return H || (H = new Ht()), F || Vn(c) ? rn(c, f, v, P, z, H) : ai(c, f, tt, v, P, z, H);
    if (!(v & i)) {
      var lt = ct && Mt.call(c, "__wrapped__"), ot = xt && Mt.call(f, "__wrapped__");
      if (lt || ot) {
        var Qt = lt ? c.value() : c, $t = ot ? f.value() : f;
        return H || (H = new Ht()), z(Qt, $t, v, P, H);
      }
    }
    return et ? (H || (H = new Ht()), hi(c, f, v, P, z, H)) : !1;
  }
  function ii(c) {
    if (!Yn(c) || gi(c))
      return !1;
    var f = Nn(c) ? _s : J;
    return f.test(ut(c));
  }
  function ri(c) {
    return Wt(c) && an(c.length) && !!N[le(c)];
  }
  function oi(c) {
    if (!ui(c))
      return he(c);
    var f = [];
    for (var v in Object(c))
      Mt.call(c, v) && v != "constructor" && f.push(v);
    return f;
  }
  function rn(c, f, v, P, z, H) {
    var F = v & i, K = c.length, tt = f.length;
    if (K != tt && !(F && tt > K))
      return !1;
    var $ = H.get(c);
    if ($ && H.get(f))
      return $ == f;
    var ct = -1, xt = !0, et = v & r ? new ke() : void 0;
    for (H.set(c, f), H.set(f, c); ++ct < K; ) {
      var lt = c[ct], ot = f[ct];
      if (P)
        var Qt = F ? P(ot, lt, ct, f, c, H) : P(lt, ot, ct, c, f, H);
      if (Qt !== void 0) {
        if (Qt)
          continue;
        xt = !1;
        break;
      }
      if (et) {
        if (!An(f, function($t, ge) {
          if (!be(et, ge) && (lt === $t || z(lt, $t, v, P, H)))
            return et.push(ge);
        })) {
          xt = !1;
          break;
        }
      } else if (!(lt === ot || z(lt, ot, v, P, H))) {
        xt = !1;
        break;
      }
    }
    return H.delete(c), H.delete(f), xt;
  }
  function ai(c, f, v, P, z, H, F) {
    switch (v) {
      case _:
        if (c.byteLength != f.byteLength || c.byteOffset != f.byteOffset)
          return !1;
        c = c.buffer, f = f.buffer;
      case D:
        return !(c.byteLength != f.byteLength || !H(new Hn(c), new Hn(f)));
      case d:
      case u:
      case S:
        return Fn(+c, +f);
      case p:
        return c.name == f.name && c.message == f.message;
      case M:
      case T:
        return c == f + "";
      case y:
        var K = Dn;
      case E:
        var tt = P & i;
        if (K || (K = Bt), c.size != f.size && !tt)
          return !1;
        var $ = F.get(c);
        if ($)
          return $ == f;
        P |= r, F.set(c, f);
        var ct = rn(K(c), K(f), P, z, H, F);
        return F.delete(c), ct;
      case k:
        if (en)
          return en.call(c) == en.call(f);
    }
    return !1;
  }
  function hi(c, f, v, P, z, H) {
    var F = v & i, K = de(c), tt = K.length, $ = de(f), ct = $.length;
    if (tt != ct && !F)
      return !1;
    for (var xt = tt; xt--; ) {
      var et = K[xt];
      if (!(F ? et in f : Mt.call(f, et)))
        return !1;
    }
    var lt = H.get(c);
    if (lt && H.get(f))
      return lt == f;
    var ot = !0;
    H.set(c, f), H.set(f, c);
    for (var Qt = F; ++xt < tt; ) {
      et = K[xt];
      var $t = c[et], ge = f[et];
      if (P)
        var Qi = F ? P(ge, $t, et, f, c, H) : P($t, ge, et, c, f, H);
      if (!(Qi === void 0 ? $t === ge || z($t, ge, v, P, H) : Qi)) {
        ot = !1;
        break;
      }
      Qt || (Qt = et == "constructor");
    }
    if (ot && !Qt) {
      var jn = c.constructor, Xn = f.constructor;
      jn != Xn && "constructor" in c && "constructor" in f && !(typeof jn == "function" && jn instanceof jn && typeof Xn == "function" && Xn instanceof Xn) && (ot = !1);
    }
    return H.delete(c), H.delete(f), ot;
  }
  function de(c) {
    return sn(c, hn, ci);
  }
  function At(c, f) {
    var v = c.__data__;
    return di(f) ? v[typeof f == "string" ? "string" : "hash"] : v.map;
  }
  function Kt(c, f) {
    var v = je(c, f);
    return ii(v) ? v : void 0;
  }
  function Ft(c) {
    var f = Mt.call(c, kt), v = c[kt];
    try {
      c[kt] = void 0;
      var P = !0;
    } catch {
    }
    var z = Bn.call(c);
    return P && (f ? c[kt] = v : delete c[kt]), z;
  }
  var ci = Ee ? function(c) {
    return c == null ? [] : (c = Object(c), kn(Ee(c), function(f) {
      return Pe.call(c, f);
    }));
  } : pi, Lt = le;
  (qe && Lt(new qe(new ArrayBuffer(1))) != _ || ce && Lt(new ce()) != y || Je && Lt(Je.resolve()) != C || Qe && Lt(new Qe()) != E || tn && Lt(new tn()) != W) && (Lt = function(c) {
    var f = le(c), v = f == b ? c.constructor : void 0, P = v ? ut(v) : "";
    if (P)
      switch (P) {
        case Ln:
          return _;
        case Ot:
          return y;
        case Bs:
          return C;
        case Hs:
          return E;
        case Ls:
          return W;
      }
    return f;
  });
  function li(c, f) {
    return f = f ?? o, !!f && (typeof c == "number" || Ce.test(c)) && c > -1 && c % 1 == 0 && c < f;
  }
  function di(c) {
    var f = typeof c;
    return f == "string" || f == "number" || f == "symbol" || f == "boolean" ? c !== "__proto__" : c === null;
  }
  function gi(c) {
    return !!_n && _n in c;
  }
  function ui(c) {
    var f = c && c.constructor, v = typeof f == "function" && f.prototype || oe;
    return c === v;
  }
  function Kn(c) {
    return Bn.call(c);
  }
  function ut(c) {
    if (c != null) {
      try {
        return Xe.call(c);
      } catch {
      }
      try {
        return c + "";
      } catch {
      }
    }
    return "";
  }
  function Fn(c, f) {
    return c === f || c !== c && f !== f;
  }
  var $n = Gn(/* @__PURE__ */ function() {
    return arguments;
  }()) ? Gn : function(c) {
    return Wt(c) && Mt.call(c, "callee") && !Pe.call(c, "callee");
  }, Re = Array.isArray;
  function on(c) {
    return c != null && an(c.length) && !Nn(c);
  }
  var _e = Ze || mi;
  function fi(c, f) {
    return On(c, f);
  }
  function Nn(c) {
    if (!Yn(c))
      return !1;
    var f = le(c);
    return f == m || f == x || f == l || f == I;
  }
  function an(c) {
    return typeof c == "number" && c > -1 && c % 1 == 0 && c <= o;
  }
  function Yn(c) {
    var f = typeof c;
    return c != null && (f == "object" || f == "function");
  }
  function Wt(c) {
    return c != null && typeof c == "object";
  }
  var Vn = Ye ? Ds(Ye) : ri;
  function hn(c) {
    return on(c) ? ni(c) : oi(c);
  }
  function pi() {
    return [];
  }
  function mi() {
    return !1;
  }
  s.exports = fi;
})(rs, rs.exports);
var Ta = rs.exports;
const vn = /* @__PURE__ */ re(Ta);
var Pa = 200, Hi = "__lodash_hash_undefined__", mo = 9007199254740991, Ea = "[object Arguments]", ka = "[object Function]", Aa = "[object GeneratorFunction]", Da = "[object Symbol]", Ra = /[\\^$.*+?()[\]{}|]/g, _a = /^\[object .+?Constructor\]$/, Ba = /^(?:0|[1-9]\d*)$/, Ha = typeof V == "object" && V && V.Object === Object && V, La = typeof self == "object" && self && self.Object === Object && self, Li = Ha || La || Function("return this")();
function Wa(s, t, e) {
  switch (e.length) {
    case 0:
      return s.call(t);
    case 1:
      return s.call(t, e[0]);
    case 2:
      return s.call(t, e[0], e[1]);
    case 3:
      return s.call(t, e[0], e[1], e[2]);
  }
  return s.apply(t, e);
}
function za(s, t) {
  var e = s ? s.length : 0;
  return !!e && Ka(s, t, 0) > -1;
}
function Ga(s, t) {
  for (var e = -1, n = s ? s.length : 0, i = Array(n); ++e < n; )
    i[e] = t(s[e], e, s);
  return i;
}
function Wi(s, t) {
  for (var e = -1, n = t.length, i = s.length; ++e < n; )
    s[i + e] = t[e];
  return s;
}
function Oa(s, t, e, n) {
  for (var i = s.length, r = e + -1; ++r < i; )
    if (t(s[r], r, s))
      return r;
  return -1;
}
function Ka(s, t, e) {
  if (t !== t)
    return Oa(s, Fa, e);
  for (var n = e - 1, i = s.length; ++n < i; )
    if (s[n] === t)
      return n;
  return -1;
}
function Fa(s) {
  return s !== s;
}
function $a(s, t) {
  for (var e = -1, n = Array(s); ++e < s; )
    n[e] = t(e);
  return n;
}
function Na(s, t) {
  return s.has(t);
}
function Ya(s, t) {
  return s == null ? void 0 : s[t];
}
function Va(s) {
  var t = !1;
  if (s != null && typeof s.toString != "function")
    try {
      t = !!(s + "");
    } catch {
    }
  return t;
}
function yo(s, t) {
  return function(e) {
    return s(t(e));
  };
}
var ja = Array.prototype, Xa = Function.prototype, Ms = Object.prototype, xi = Li["__core-js_shared__"], sr = function() {
  var s = /[^.]+$/.exec(xi && xi.keys && xi.keys.IE_PROTO || "");
  return s ? "Symbol(src)_1." + s : "";
}(), xo = Xa.toString, wn = Ms.hasOwnProperty, zi = Ms.toString, Ua = RegExp(
  "^" + xo.call(wn).replace(Ra, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
), ir = Li.Symbol, Za = yo(Object.getPrototypeOf, Object), qa = Ms.propertyIsEnumerable, Ja = ja.splice, rr = ir ? ir.isConcatSpreadable : void 0, Ci = Object.getOwnPropertySymbols, or = Math.max, Qa = vo(Li, "Map"), fn = vo(Object, "create");
function ye(s) {
  var t = -1, e = s ? s.length : 0;
  for (this.clear(); ++t < e; ) {
    var n = s[t];
    this.set(n[0], n[1]);
  }
}
function th() {
  this.__data__ = fn ? fn(null) : {};
}
function eh(s) {
  return this.has(s) && delete this.__data__[s];
}
function nh(s) {
  var t = this.__data__;
  if (fn) {
    var e = t[s];
    return e === Hi ? void 0 : e;
  }
  return wn.call(t, s) ? t[s] : void 0;
}
function sh(s) {
  var t = this.__data__;
  return fn ? t[s] !== void 0 : wn.call(t, s);
}
function ih(s, t) {
  var e = this.__data__;
  return e[s] = fn && t === void 0 ? Hi : t, this;
}
ye.prototype.clear = th;
ye.prototype.delete = eh;
ye.prototype.get = nh;
ye.prototype.has = sh;
ye.prototype.set = ih;
function Ke(s) {
  var t = -1, e = s ? s.length : 0;
  for (this.clear(); ++t < e; ) {
    var n = s[t];
    this.set(n[0], n[1]);
  }
}
function rh() {
  this.__data__ = [];
}
function oh(s) {
  var t = this.__data__, e = Is(t, s);
  if (e < 0)
    return !1;
  var n = t.length - 1;
  return e == n ? t.pop() : Ja.call(t, e, 1), !0;
}
function ah(s) {
  var t = this.__data__, e = Is(t, s);
  return e < 0 ? void 0 : t[e][1];
}
function hh(s) {
  return Is(this.__data__, s) > -1;
}
function ch(s, t) {
  var e = this.__data__, n = Is(e, s);
  return n < 0 ? e.push([s, t]) : e[n][1] = t, this;
}
Ke.prototype.clear = rh;
Ke.prototype.delete = oh;
Ke.prototype.get = ah;
Ke.prototype.has = hh;
Ke.prototype.set = ch;
function Fe(s) {
  var t = -1, e = s ? s.length : 0;
  for (this.clear(); ++t < e; ) {
    var n = s[t];
    this.set(n[0], n[1]);
  }
}
function lh() {
  this.__data__ = {
    hash: new ye(),
    map: new (Qa || Ke)(),
    string: new ye()
  };
}
function dh(s) {
  return Ts(this, s).delete(s);
}
function gh(s) {
  return Ts(this, s).get(s);
}
function uh(s) {
  return Ts(this, s).has(s);
}
function fh(s, t) {
  return Ts(this, s).set(s, t), this;
}
Fe.prototype.clear = lh;
Fe.prototype.delete = dh;
Fe.prototype.get = gh;
Fe.prototype.has = uh;
Fe.prototype.set = fh;
function os(s) {
  var t = -1, e = s ? s.length : 0;
  for (this.__data__ = new Fe(); ++t < e; )
    this.add(s[t]);
}
function ph(s) {
  return this.__data__.set(s, Hi), this;
}
function mh(s) {
  return this.__data__.has(s);
}
os.prototype.add = os.prototype.push = ph;
os.prototype.has = mh;
function yh(s, t) {
  var e = Gi(s) || wo(s) ? $a(s.length, String) : [], n = e.length, i = !!n;
  for (var r in s)
    i && (r == "length" || Ah(r, n)) || e.push(r);
  return e;
}
function Is(s, t) {
  for (var e = s.length; e--; )
    if (Wh(s[e][0], t))
      return e;
  return -1;
}
function xh(s, t, e, n) {
  var i = -1, r = za, o = !0, a = s.length, h = [], l = t.length;
  if (!a)
    return h;
  t.length >= Pa && (r = Na, o = !1, t = new os(t));
  t:
    for (; ++i < a; ) {
      var d = s[i], u = d;
      if (d = d !== 0 ? d : 0, o && u === u) {
        for (var p = l; p--; )
          if (t[p] === u)
            continue t;
        h.push(d);
      } else r(t, u, n) || h.push(d);
    }
  return h;
}
function vh(s, t, e, n, i) {
  var r = -1, o = s.length;
  for (e || (e = kh), i || (i = []); ++r < o; ) {
    var a = s[r];
    e(a) ? Wi(i, a) : i[i.length] = a;
  }
  return i;
}
function wh(s, t, e) {
  var n = t(s);
  return Gi(s) ? n : Wi(n, e(s));
}
function Sh(s) {
  if (!Oi(s) || Rh(s))
    return !1;
  var t = Co(s) || Va(s) ? Ua : _a;
  return t.test(Lh(s));
}
function Ch(s) {
  if (!Oi(s))
    return Bh(s);
  var t = _h(s), e = [];
  for (var n in s)
    n == "constructor" && (t || !wn.call(s, n)) || e.push(n);
  return e;
}
function bh(s, t) {
  return s = Object(s), Mh(s, t, function(e, n) {
    return n in s;
  });
}
function Mh(s, t, e) {
  for (var n = -1, i = t.length, r = {}; ++n < i; ) {
    var o = t[n], a = s[o];
    e(a, o) && (r[o] = a);
  }
  return r;
}
function Ih(s, t) {
  return t = or(t === void 0 ? s.length - 1 : t, 0), function() {
    for (var e = arguments, n = -1, i = or(e.length - t, 0), r = Array(i); ++n < i; )
      r[n] = e[t + n];
    n = -1;
    for (var o = Array(t + 1); ++n < t; )
      o[n] = e[n];
    return o[t] = r, Wa(s, this, o);
  };
}
function Th(s) {
  return wh(s, Kh, Eh);
}
function Ts(s, t) {
  var e = s.__data__;
  return Dh(t) ? e[typeof t == "string" ? "string" : "hash"] : e.map;
}
function vo(s, t) {
  var e = Ya(s, t);
  return Sh(e) ? e : void 0;
}
var Ph = Ci ? yo(Ci, Object) : Mo, Eh = Ci ? function(s) {
  for (var t = []; s; )
    Wi(t, Ph(s)), s = Za(s);
  return t;
} : Mo;
function kh(s) {
  return Gi(s) || wo(s) || !!(rr && s && s[rr]);
}
function Ah(s, t) {
  return t = t ?? mo, !!t && (typeof s == "number" || Ba.test(s)) && s > -1 && s % 1 == 0 && s < t;
}
function Dh(s) {
  var t = typeof s;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? s !== "__proto__" : s === null;
}
function Rh(s) {
  return !!sr && sr in s;
}
function _h(s) {
  var t = s && s.constructor, e = typeof t == "function" && t.prototype || Ms;
  return s === e;
}
function Bh(s) {
  var t = [];
  if (s != null)
    for (var e in Object(s))
      t.push(e);
  return t;
}
function Hh(s) {
  if (typeof s == "string" || Oh(s))
    return s;
  var t = s + "";
  return t == "0" && 1 / s == -1 / 0 ? "-0" : t;
}
function Lh(s) {
  if (s != null) {
    try {
      return xo.call(s);
    } catch {
    }
    try {
      return s + "";
    } catch {
    }
  }
  return "";
}
function Wh(s, t) {
  return s === t || s !== s && t !== t;
}
function wo(s) {
  return zh(s) && wn.call(s, "callee") && (!qa.call(s, "callee") || zi.call(s) == Ea);
}
var Gi = Array.isArray;
function So(s) {
  return s != null && Gh(s.length) && !Co(s);
}
function zh(s) {
  return bo(s) && So(s);
}
function Co(s) {
  var t = Oi(s) ? zi.call(s) : "";
  return t == ka || t == Aa;
}
function Gh(s) {
  return typeof s == "number" && s > -1 && s % 1 == 0 && s <= mo;
}
function Oi(s) {
  var t = typeof s;
  return !!s && (t == "object" || t == "function");
}
function bo(s) {
  return !!s && typeof s == "object";
}
function Oh(s) {
  return typeof s == "symbol" || bo(s) && zi.call(s) == Da;
}
function Kh(s) {
  return So(s) ? yh(s) : Ch(s);
}
var Fh = Ih(function(s, t) {
  return s == null ? {} : (t = Ga(vh(t), Hh), bh(s, xh(Th(s), t)));
});
function Mo() {
  return [];
}
var $h = Fh;
const Nh = /* @__PURE__ */ re($h);
var Yh = 9007199254740991, Vh = "[object Arguments]", jh = "[object Function]", Xh = "[object GeneratorFunction]", Uh = "[object Symbol]", Zh = typeof V == "object" && V && V.Object === Object && V, qh = typeof self == "object" && self && self.Object === Object && self, Jh = Zh || qh || Function("return this")();
function Qh(s, t, e) {
  switch (e.length) {
    case 0:
      return s.call(t);
    case 1:
      return s.call(t, e[0]);
    case 2:
      return s.call(t, e[0], e[1]);
    case 3:
      return s.call(t, e[0], e[1], e[2]);
  }
  return s.apply(t, e);
}
function tc(s, t) {
  for (var e = -1, n = s ? s.length : 0, i = Array(n); ++e < n; )
    i[e] = t(s[e], e, s);
  return i;
}
function ec(s, t) {
  for (var e = -1, n = t.length, i = s.length; ++e < n; )
    s[i + e] = t[e];
  return s;
}
var Ki = Object.prototype, nc = Ki.hasOwnProperty, Fi = Ki.toString, ar = Jh.Symbol, sc = Ki.propertyIsEnumerable, hr = ar ? ar.isConcatSpreadable : void 0, cr = Math.max;
function ic(s, t, e, n, i) {
  var r = -1, o = s.length;
  for (e || (e = hc), i || (i = []); ++r < o; ) {
    var a = s[r];
    e(a) ? ec(i, a) : i[i.length] = a;
  }
  return i;
}
function rc(s, t) {
  return s = Object(s), oc(s, t, function(e, n) {
    return n in s;
  });
}
function oc(s, t, e) {
  for (var n = -1, i = t.length, r = {}; ++n < i; ) {
    var o = t[n], a = s[o];
    e(a, o) && (r[o] = a);
  }
  return r;
}
function ac(s, t) {
  return t = cr(t === void 0 ? s.length - 1 : t, 0), function() {
    for (var e = arguments, n = -1, i = cr(e.length - t, 0), r = Array(i); ++n < i; )
      r[n] = e[t + n];
    n = -1;
    for (var o = Array(t + 1); ++n < t; )
      o[n] = e[n];
    return o[t] = r, Qh(s, this, o);
  };
}
function hc(s) {
  return dc(s) || lc(s) || !!(hr && s && s[hr]);
}
function cc(s) {
  if (typeof s == "string" || yc(s))
    return s;
  var t = s + "";
  return t == "0" && 1 / s == -1 / 0 ? "-0" : t;
}
function lc(s) {
  return uc(s) && nc.call(s, "callee") && (!sc.call(s, "callee") || Fi.call(s) == Vh);
}
var dc = Array.isArray;
function gc(s) {
  return s != null && pc(s.length) && !fc(s);
}
function uc(s) {
  return Io(s) && gc(s);
}
function fc(s) {
  var t = mc(s) ? Fi.call(s) : "";
  return t == jh || t == Xh;
}
function pc(s) {
  return typeof s == "number" && s > -1 && s % 1 == 0 && s <= Yh;
}
function mc(s) {
  var t = typeof s;
  return !!s && (t == "object" || t == "function");
}
function Io(s) {
  return !!s && typeof s == "object";
}
function yc(s) {
  return typeof s == "symbol" || Io(s) && Fi.call(s) == Uh;
}
var xc = ac(function(s, t) {
  return s == null ? {} : rc(s, tc(ic(t), cc));
}), vc = xc;
const To = /* @__PURE__ */ re(vc);
var Po = "Expected a function", lr = NaN, wc = "[object Symbol]", Sc = /^\s+|\s+$/g, Cc = /^[-+]0x[0-9a-f]+$/i, bc = /^0b[01]+$/i, Mc = /^0o[0-7]+$/i, Ic = parseInt, Tc = typeof V == "object" && V && V.Object === Object && V, Pc = typeof self == "object" && self && self.Object === Object && self, Ec = Tc || Pc || Function("return this")(), kc = Object.prototype, Ac = kc.toString, Dc = Math.max, Rc = Math.min, vi = function() {
  return Ec.Date.now();
};
function _c(s, t, e) {
  var n, i, r, o, a, h, l = 0, d = !1, u = !1, p = !0;
  if (typeof s != "function")
    throw new TypeError(Po);
  t = dr(t) || 0, as(e) && (d = !!e.leading, u = "maxWait" in e, r = u ? Dc(dr(e.maxWait) || 0, t) : r, p = "trailing" in e ? !!e.trailing : p);
  function m(E) {
    var T = n, k = i;
    return n = i = void 0, l = E, o = s.apply(k, T), o;
  }
  function x(E) {
    return l = E, a = setTimeout(w, t), d ? m(E) : o;
  }
  function y(E) {
    var T = E - h, k = E - l, L = t - T;
    return u ? Rc(L, r - k) : L;
  }
  function S(E) {
    var T = E - h, k = E - l;
    return h === void 0 || T >= t || T < 0 || u && k >= r;
  }
  function w() {
    var E = vi();
    if (S(E))
      return b(E);
    a = setTimeout(w, y(E));
  }
  function b(E) {
    return a = void 0, p && n ? m(E) : (n = i = void 0, o);
  }
  function C() {
    a !== void 0 && clearTimeout(a), l = 0, n = h = i = a = void 0;
  }
  function I() {
    return a === void 0 ? o : b(vi());
  }
  function M() {
    var E = vi(), T = S(E);
    if (n = arguments, i = this, h = E, T) {
      if (a === void 0)
        return x(h);
      if (u)
        return a = setTimeout(w, t), m(h);
    }
    return a === void 0 && (a = setTimeout(w, t)), o;
  }
  return M.cancel = C, M.flush = I, M;
}
function Bc(s, t, e) {
  var n = !0, i = !0;
  if (typeof s != "function")
    throw new TypeError(Po);
  return as(e) && (n = "leading" in e ? !!e.leading : n, i = "trailing" in e ? !!e.trailing : i), _c(s, t, {
    leading: n,
    maxWait: t,
    trailing: i
  });
}
function as(s) {
  var t = typeof s;
  return !!s && (t == "object" || t == "function");
}
function Hc(s) {
  return !!s && typeof s == "object";
}
function Lc(s) {
  return typeof s == "symbol" || Hc(s) && Ac.call(s) == wc;
}
function dr(s) {
  if (typeof s == "number")
    return s;
  if (Lc(s))
    return lr;
  if (as(s)) {
    var t = typeof s.valueOf == "function" ? s.valueOf() : s;
    s = as(t) ? t + "" : t;
  }
  if (typeof s != "string")
    return s === 0 ? s : +s;
  s = s.replace(Sc, "");
  var e = bc.test(s);
  return e || Mc.test(s) ? Ic(s.slice(2), e ? 2 : 8) : Cc.test(s) ? lr : +s;
}
var Wc = Bc;
const $i = /* @__PURE__ */ re(Wc);
var zc = Object.defineProperty, Gc = (s, t, e) => t in s ? zc(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e, Oc = (s, t, e) => (Gc(s, t + "", e), e), gr = (s, t) => {
  for (let e = 0, n = s.length; e < n; e++)
    t(s[e], e);
}, ue = (s, t) => {
  const e = [];
  for (let n = 0, i = s.length; n < i; n++)
    e.push(t(s[n], n));
  return e;
}, Eo = (s, t, e) => {
  const n = s[t];
  s[t] = s[e], s[e] = n;
}, ft = ({ r: s, g: t, b: e, a: n }) => `rgba(${s},${t},${e},${n})`, Kc = (s) => {
  s = s.toUpperCase();
  const t = s.match(/[0-9A-F]{1,6}/);
  return t ? (s = t[0], s.length === 6 ? s : ((s.length === 4 || s.length === 5) && (s = s.slice(0, 3)), s.length === 3 ? s.split("").map((e) => e + e).join("") : s.padEnd(6, s))) : "";
}, Zn = (s) => {
  const { r: t, g: e, b: n } = s;
  return (t << 16 | e << 8 | n).toString(16).toUpperCase().padStart(6, "0");
}, it = (s) => {
  if (s = Kc(s), !s)
    return null;
  const t = parseInt(s.slice(0, 2), 16), e = parseInt(s.slice(2, 4), 16), n = parseInt(s.slice(4, 6), 16), i = s.slice(6, 8), r = i ? parseInt(i, 16) / 255 : 1;
  return { r: t, g: e, b: n, a: r };
}, xe = () => {
}, pn = () => ra(), Fc = () => {
  let s = 0;
  return () => {
    const t = String(s);
    return s++, t;
  };
}, ur = {
  maxIdxMap: /* @__PURE__ */ new Map(),
  gen(s) {
    var t;
    let e = (t = this.maxIdxMap.get(s)) != null ? t : 0;
    return e++, this.maxIdxMap.set(s, e), `${s} ${e}`;
  },
  setMaxIdx(s) {
    var t;
    const e = s.match(/^(.*)\s+(\d+)$/);
    if (e) {
      const [, n, i] = e, r = Number(i);
      this.maxIdxMap.set(n, Math.max((t = this.maxIdxMap.get(n)) != null ? t : 0, r));
    }
  }
}, Q = (s, t) => {
  const e = Math.floor(s / t), n = t * e, i = t * (e + 1);
  return s - n <= i - s ? n : i;
}, ko = (s, t, e, n, i, r = !1) => {
  let o = n + s / e, a = i + t / e;
  return r && (o = Math.round(o), a = Math.round(a)), {
    x: o,
    y: a
  };
}, $c = (s, t, e, n, i) => ({
  x: (s - n) * e,
  y: (t - i) * e
}), hs = (s) => {
  const t = Math.floor(s), e = Math.ceil(s);
  return (s - t < e - s ? t : e) + 0.5;
}, Nc = (s, t) => {
  if (s.length !== t.length)
    return !1;
  const e = /* @__PURE__ */ new Map();
  for (let n = 0, i = s.length; n < i; n++)
    e.set(s[n], !0);
  for (let n = 0, i = t.length; n < i; n++)
    if (!e.get(t[n]))
      return !1;
  return !0;
}, fr = (s, t = 2) => Number(s.toFixed(t)), bi = () => window.devicePixelRatio || 1, Yc = (s, t, e, n) => {
  if (s === 0 || t === 0)
    return 1;
  const i = e / s, r = n / t;
  return Math.max(i, r);
}, pr = (s, t) => {
  if (s.length === 0)
    throw new Error("sortedArr can not be empty");
  if (s.length === 1)
    return s[0];
  let e = 0, n = s.length - 1;
  for (; e <= n; ) {
    const i = Math.floor((e + n) / 2);
    if (s[i] === t)
      return s[i];
    s[i] < t ? e = i + 1 : n = i - 1;
  }
  return e >= s.length ? s[n] : n < 0 ? s[e] : Math.abs(s[n] - t) <= Math.abs(s[e] - t) ? s[n] : s[e];
}, Vc = () => navigator.platform.toLowerCase().includes("win") || navigator.userAgent.includes("Windows"), jc = (s) => typeof s == "string" ? s.replace(/<|&|>/g, (t) => ({
  "<": "&lt;",
  ">": "&gt;",
  "&": "&amp;"
})[t]) : "", mt = class {
  constructor() {
    Oc(this, "eventMap", {});
  }
  on(s, t) {
    return this.eventMap[s] || (this.eventMap[s] = []), this.eventMap[s].push(t), this;
  }
  emit(s, ...t) {
    const e = this.eventMap[s];
    return !e || e.length === 0 ? !1 : (e.forEach((n) => {
      n(...t);
    }), !0);
  }
  off(s, t) {
    return this.eventMap[s] && (this.eventMap[s] = this.eventMap[s].filter(
      (e) => e !== t
    )), this;
  }
};
class Xc {
  constructor(t) {
    g(this, "redoStack", []);
    g(this, "undoStack", []);
    g(this, "isEnableRedoUndo", !0);
    g(this, "emitter", new mt());
    g(this, "isBatching", !1);
    this.editor = t;
  }
  redo() {
    var t, e;
    if (this.isEnableRedoUndo && this.redoStack.length > 0) {
      const n = this.redoStack.pop(), i = n.isBatched, r = [n];
      if (i) {
        for (; this.redoStack.length > 0 && this.redoStack.at(-1).isBatched; ) {
          const o = this.redoStack.pop();
          r.push(o);
        }
        console.log("------- [redo] batched start -----");
      }
      for (const o of r) {
        const a = o.command;
        console.log(
          `%c Redo %c [${a.desc}]`,
          "background: #f04; color: #ee0",
          ""
        ), this.undoStack.push(o), (e = (t = o.hooks) == null ? void 0 : t.beforeRedo) == null || e.call(t), a.redo();
      }
      i && console.log("------- [redo] batched end -----"), this.editor.render(), this.emitStatusChange();
    }
  }
  undo() {
    var t, e;
    if (this.isEnableRedoUndo && this.undoStack.length > 0) {
      const n = this.undoStack.pop(), i = n.isBatched, r = [n];
      if (i) {
        for (; this.undoStack.length > 0 && this.undoStack.at(-1).isBatched; ) {
          const o = this.undoStack.pop();
          r.push(o);
        }
        console.log("------- [undo] batched start -----");
      }
      for (const o of r) {
        const a = o.command;
        console.log(
          `%c Undo %c [${a.desc}]`,
          "background: #40f; color: #eee",
          ""
        ), this.redoStack.push(o), (e = (t = o.hooks) == null ? void 0 : t.beforeUndo) == null || e.call(t), a.undo();
      }
      i && console.log("------- [undo] batched end -----"), this.editor.render(), this.emitStatusChange();
    }
  }
  enableRedoUndo() {
    this.isEnableRedoUndo = !0;
  }
  disableRedoUndo() {
    this.isEnableRedoUndo = !1;
  }
  batchCommandStart() {
    this.isBatching = !0;
  }
  batchCommandEnd() {
    this.isBatching = !1;
  }
  pushCommand(t, e) {
    this.emitter.emit("beforeExecCmd"), console.log(
      `%c Exec %c [${t.desc}]`,
      "background: #222; color: #bada55",
      ""
    );
    const n = { command: t };
    this.isBatching && (n.isBatched = !0), e && (n.hooks = e), this.undoStack.push(n), this.redoStack = [], this.emitStatusChange();
  }
  emitStatusChange() {
    this.emitter.emit("change", {
      canRedo: this.redoStack.length > 0,
      canUndo: this.undoStack.length > 0
    });
  }
  on(t, e) {
    this.emitter.on(t, e);
  }
  off(t, e) {
    this.emitter.off(t, e);
  }
  clearRecords() {
    this.redoStack = [], this.undoStack = [], this.emitStatusChange();
  }
}
class $d {
  constructor(t, e) {
    this.desc = t, this.cmds = e;
  }
  redo() {
    for (const t of this.cmds)
      t.redo();
  }
  undo() {
    for (let t = this.cmds.length - 1; t >= 0; t--)
      this.cmds[t].undo();
  }
}
class se {
  constructor(t, e, n, i) {
    if (this.desc = t, this.elements = e, this.attrs = n, this.prevAttrs = i, e.length !== i.length)
      throw new Error(
        `elements 和 preAttrs 数量不匹配 ${e.length} ${i.length}`
      );
  }
  redo() {
    var n;
    const { elements: t, attrs: e } = this;
    for (let i = 0, r = this.elements.length; i < r; i++) {
      const o = Array.isArray(e) ? e[i] : A(e), a = t[i];
      if (o.parentIndex && a.removeFromParent(), a.updateAttrs(o), o.parentIndex) {
        const h = a.getParent();
        h && h.insertChild(a, (n = a.attrs.parentIndex) == null ? void 0 : n.position);
      }
    }
  }
  undo() {
    var n;
    const { elements: t, prevAttrs: e } = this;
    for (let i = 0, r = this.elements.length; i < r; i++) {
      const o = t[i], a = e[i];
      if (t[i].updateAttrs(e[i]), "parentIndex" in a && a.parentIndex === void 0)
        o.removeFromParent();
      else if (a.parentIndex) {
        const h = o.getParent();
        h && h.insertChild(o, (n = o.attrs.parentIndex) == null ? void 0 : n.position);
      }
    }
  }
}
g(se, "type", "SetElementsAttrs");
class Ps {
  constructor(t, e, n, i, r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set()) {
    this.desc = t, this.editor = e, this.originAttrsMap = n, this.updatedAttrsMap = i, this.removedIds = r, this.newIds = o, n.size !== i.size && (console.warn(
      `originAttrsMap 和 updatedAttrsMap 数量不匹配 ${n.size} ${i.size}`
    ), console.log("origin:", n), console.log("update:", i));
  }
  redo() {
    var n;
    const t = this.updatedAttrsMap, e = this.editor.doc;
    for (const [i, r] of t) {
      const o = e.getGraphicsById(i);
      if (!o) {
        console.warn(`graphics ${i} is lost.`);
        return;
      }
      r.parentIndex && o.removeFromParent(), o.updateAttrs(r), r.parentIndex && o.insertAtParent(o.attrs.parentIndex.position);
    }
    for (const i of this.removedIds) {
      const r = e.getGraphicsById(i);
      r && (r.setDeleted(!0), r.removeFromParent());
    }
    for (const i of this.newIds) {
      const r = e.getGraphicsById(i);
      if (r) {
        r.setDeleted(!1);
        const o = (n = r.attrs.parentIndex) == null ? void 0 : n.position;
        o ? r.insertAtParent(o) : console.error("position lost");
      }
    }
  }
  undo() {
    var n;
    const t = this.originAttrsMap, e = this.editor.doc;
    for (const [i, r] of t) {
      const o = e.getGraphicsById(i);
      if (!o) {
        console.warn(`graphics ${i} is lost.`);
        return;
      }
      r.parentIndex && o.removeFromParent(), o.updateAttrs(r), r.parentIndex && o.insertAtParent(o.attrs.parentIndex.position);
    }
    for (const i of this.removedIds) {
      const r = e.getGraphicsById(i);
      if (r) {
        r.setDeleted(!1);
        const o = (n = r.attrs.parentIndex) == null ? void 0 : n.position;
        o ? r.insertAtParent(o) : console.error("position lost");
      }
    }
    for (const i of this.newIds) {
      const r = e.getGraphicsById(i);
      r && (r.setDeleted(!0), r.removeFromParent());
    }
    this.newIds.size !== 0 && this.editor.selectedElements.clear();
  }
}
g(Ps, "type", "UpdateGraphicsAttrs");
var Ao = { exports: {} };
(function(s, t) {
  (function(e, n) {
    n(s);
  })(V, function(e) {
    function n(w, b) {
      if (!(w instanceof b))
        throw new TypeError("Cannot call a class as a function");
    }
    /**
     *  @preserve  JavaScript implementation of
     *  Algorithm for Automatically Fitting Digitized Curves
     *  by Philip J. Schneider
     *  "Graphics Gems", Academic Press, 1990
     *
     *  The MIT License (MIT)
     *
     *  https://github.com/soswow/fit-curves
     */
    function i(w, b, C) {
      if (!Array.isArray(w))
        throw new TypeError("First argument should be an array");
      if (w.forEach(function(T) {
        if (!Array.isArray(T) || T.some(function(k) {
          return typeof k != "number";
        }) || T.length !== w[0].length)
          throw Error("Each point should be an array of numbers. Each point should have the same amount of numbers.");
      }), w = w.filter(function(T, k) {
        return k === 0 || !T.every(function(L, W) {
          return L === w[k - 1][W];
        });
      }), w.length < 2)
        return [];
      var I = w.length, M = x(w[1], w[0]), E = x(w[I - 2], w[I - 1]);
      return r(w, M, E, b, C);
    }
    function r(w, b, C, I, M) {
      var E = 20, T, k, L, W, D, _, Y, j, St, Tt, U, Ct, Pt;
      if (w.length === 2)
        return Ct = y.vectorLen(y.subtract(w[0], w[1])) / 3, T = [w[0], y.addArrays(w[0], y.mulItems(b, Ct)), y.addArrays(w[1], y.mulItems(C, Ct)), w[1]], [T];
      k = d(w);
      var O = o(w, k, k, b, C, M);
      if (T = O[0], W = O[1], _ = O[2], W === 0 || W < I)
        return [T];
      if (W < I * I)
        for (L = k, D = W, Y = _, Pt = 0; Pt < E; Pt++) {
          L = h(T, w, L);
          var bt = o(w, k, L, b, C, M);
          if (T = bt[0], W = bt[1], _ = bt[2], W < I)
            return [T];
          if (_ === Y) {
            var wt = W / D;
            if (wt > 0.9999 && wt < 1.0001)
              break;
          }
          D = W, Y = _;
        }
      if (U = [], j = y.subtract(w[_ - 1], w[_ + 1]), j.every(function(Ce) {
        return Ce === 0;
      })) {
        j = y.subtract(w[_ - 1], w[_]);
        var J = [-j[1], j[0]];
        j[0] = J[0], j[1] = J[1];
      }
      return St = y.normalize(j), Tt = y.mulItems(St, -1), U = U.concat(r(w.slice(0, _ + 1), b, St, I, M)), U = U.concat(r(w.slice(_), Tt, C, I, M)), U;
    }
    function o(w, b, C, I, M, E) {
      var T, k, L;
      T = a(w, C, I, M);
      var W = u(w, T, b);
      return k = W[0], L = W[1], E && E({
        bez: T,
        points: w,
        params: b,
        maxErr: k,
        maxPoint: L
      }), [T, k, L];
    }
    function a(w, b, C, I) {
      var M, E, T, k, L, W, D, _, Y, j, St, Tt, U, Ct, Pt, O, bt, wt = w[0], J = w[w.length - 1];
      for (M = [wt, null, null, J], E = y.zeros_Xx2x2(b.length), U = 0, Ct = b.length; U < Ct; U++)
        O = b[U], bt = 1 - O, T = E[U], T[0] = y.mulItems(C, 3 * O * (bt * bt)), T[1] = y.mulItems(I, 3 * bt * (O * O));
      for (k = [[0, 0], [0, 0]], L = [0, 0], U = 0, Ct = w.length; U < Ct; U++)
        O = b[U], T = E[U], k[0][0] += y.dot(T[0], T[0]), k[0][1] += y.dot(T[0], T[1]), k[1][0] += y.dot(T[0], T[1]), k[1][1] += y.dot(T[1], T[1]), Pt = y.subtract(w[U], S.q([wt, wt, J, J], O)), L[0] += y.dot(T[0], Pt), L[1] += y.dot(T[1], Pt);
      return W = k[0][0] * k[1][1] - k[1][0] * k[0][1], D = k[0][0] * L[1] - k[1][0] * L[0], _ = L[0] * k[1][1] - L[1] * k[0][1], Y = W === 0 ? 0 : _ / W, j = W === 0 ? 0 : D / W, Tt = y.vectorLen(y.subtract(wt, J)), St = 1e-6 * Tt, Y < St || j < St ? (M[1] = y.addArrays(wt, y.mulItems(C, Tt / 3)), M[2] = y.addArrays(J, y.mulItems(I, Tt / 3))) : (M[1] = y.addArrays(wt, y.mulItems(C, Y)), M[2] = y.addArrays(J, y.mulItems(I, j))), M;
    }
    function h(w, b, C) {
      return C.map(function(I, M) {
        return l(w, b[M], I);
      });
    }
    function l(w, b, C) {
      var I = y.subtract(S.q(w, C), b), M = S.qprime(w, C), E = y.mulMatrix(I, M), T = y.sum(y.squareItems(M)) + 2 * y.mulMatrix(I, S.qprimeprime(w, C));
      return T === 0 ? C : C - E / T;
    }
    function d(w) {
      var b = [], C, I, M;
      return w.forEach(function(E, T) {
        C = T ? I + y.vectorLen(y.subtract(E, M)) : 0, b.push(C), I = C, M = E;
      }), b = b.map(function(E) {
        return E / I;
      }), b;
    }
    function u(w, b, C) {
      var I, M, E, T, k, L, W, D;
      M = 0, E = Math.floor(w.length / 2);
      var _ = p(b, 10);
      for (k = 0, L = w.length; k < L; k++)
        W = w[k], D = m(b, C[k], _, 10), T = y.subtract(S.q(b, D), W), I = T[0] * T[0] + T[1] * T[1], I > M && (M = I, E = k);
      return [M, E];
    }
    var p = function(b, C) {
      for (var I, M = [0], E = b[0], T = 0, k = 1; k <= C; k++)
        I = S.q(b, k / C), T += y.vectorLen(y.subtract(I, E)), M.push(T), E = I;
      return M = M.map(function(L) {
        return L / T;
      }), M;
    };
    function m(w, b, C, I) {
      if (b < 0)
        return 0;
      if (b > 1)
        return 1;
      for (var M, E, T, k, L, W = 1; W <= I; W++)
        if (b <= C[W]) {
          k = (W - 1) / I, T = W / I, E = C[W - 1], M = C[W], L = (b - E) / (M - E) * (T - k) + k;
          break;
        }
      return L;
    }
    function x(w, b) {
      return y.normalize(y.subtract(w, b));
    }
    var y = function() {
      function w() {
        n(this, w);
      }
      return w.zeros_Xx2x2 = function(C) {
        for (var I = []; C--; )
          I.push([0, 0]);
        return I;
      }, w.mulItems = function(C, I) {
        return C.map(function(M) {
          return M * I;
        });
      }, w.mulMatrix = function(C, I) {
        return C.reduce(function(M, E, T) {
          return M + E * I[T];
        }, 0);
      }, w.subtract = function(C, I) {
        return C.map(function(M, E) {
          return M - I[E];
        });
      }, w.addArrays = function(C, I) {
        return C.map(function(M, E) {
          return M + I[E];
        });
      }, w.addItems = function(C, I) {
        return C.map(function(M) {
          return M + I;
        });
      }, w.sum = function(C) {
        return C.reduce(function(I, M) {
          return I + M;
        });
      }, w.dot = function(C, I) {
        return w.mulMatrix(C, I);
      }, w.vectorLen = function(C) {
        return Math.hypot.apply(Math, C);
      }, w.divItems = function(C, I) {
        return C.map(function(M) {
          return M / I;
        });
      }, w.squareItems = function(C) {
        return C.map(function(I) {
          return I * I;
        });
      }, w.normalize = function(C) {
        return this.divItems(C, this.vectorLen(C));
      }, w;
    }(), S = function() {
      function w() {
        n(this, w);
      }
      return w.q = function(C, I) {
        var M = 1 - I, E = y.mulItems(C[0], M * M * M), T = y.mulItems(C[1], 3 * M * M * I), k = y.mulItems(C[2], 3 * M * I * I), L = y.mulItems(C[3], I * I * I);
        return y.addArrays(y.addArrays(E, T), y.addArrays(k, L));
      }, w.qprime = function(C, I) {
        var M = 1 - I, E = y.mulItems(y.subtract(C[1], C[0]), 3 * M * M), T = y.mulItems(y.subtract(C[2], C[1]), 6 * M * I), k = y.mulItems(y.subtract(C[3], C[2]), 3 * I * I);
        return y.addArrays(y.addArrays(E, T), k);
      }, w.qprimeprime = function(C, I) {
        return y.addArrays(y.mulItems(y.addArrays(y.subtract(C[2], y.mulItems(C[1], 2)), C[0]), 6 * (1 - I)), y.mulItems(y.addArrays(y.subtract(C[3], y.mulItems(C[2], 2)), C[1]), 6 * I));
      }, w;
    }();
    e.exports = i, e.exports.fitCubic = r, e.exports.createTangent = x;
  });
})(Ao);
var Uc = Ao.exports;
const Do = /* @__PURE__ */ re(Uc);
var Zc = Object.defineProperty, mr = Object.getOwnPropertySymbols, qc = Object.prototype.hasOwnProperty, Jc = Object.prototype.propertyIsEnumerable, It = Math.pow, Mi = (s, t, e) => t in s ? Zc(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e, yr = (s, t) => {
  for (var e in t || (t = {}))
    qc.call(t, e) && Mi(s, e, t[e]);
  if (mr)
    for (var e of mr(t))
      Jc.call(t, e) && Mi(s, e, t[e]);
  return s;
}, Dt = (s, t, e) => (Mi(s, typeof t != "symbol" ? t + "" : t, e), e), R = class {
  /**
   * @param a - x scale
   * @param b - y skew
   * @param c - x skew
   * @param d - y scale
   * @param tx - x translation
   * @param ty - y translation
   */
  constructor(s = 1, t = 0, e = 0, n = 1, i = 0, r = 0) {
    Dt(this, "a"), Dt(this, "b"), Dt(this, "c"), Dt(this, "d"), Dt(this, "tx"), Dt(this, "ty"), this.a = s, this.b = t, this.c = e, this.d = n, this.tx = i, this.ty = r;
  }
  /**
   * Sets the matrix properties.
   * @param a - Matrix component
   * @param b - Matrix component
   * @param c - Matrix component
   * @param d - Matrix component
   * @param tx - Matrix component
   * @param ty - Matrix component
   * @returns This matrix. Good for chaining method calls.
   */
  set(s, t, e, n, i, r) {
    return this.a = s, this.b = t, this.c = e, this.d = n, this.tx = i, this.ty = r, this;
  }
  /**
   * Creates an array from the current Matrix object.
   * @returns The newly created array which contains the matrix
   */
  getArray() {
    return [this.a, this.b, this.c, this.d, this.tx, this.ty];
  }
  /**
   * Get a new position with the current transformation applied.
   * Can be used to go from a child's coordinate space to the world coordinate space. (e.g. rendering)
   * @param pos - The origin
   * @returns {IPoint} The new point, transformed through this matrix
   */
  apply(s) {
    const t = s.x, e = s.y;
    return {
      x: this.a * t + this.c * e + this.tx,
      y: this.b * t + this.d * e + this.ty
    };
  }
  /**
   * Get a new position with the inverse of the current transformation applied.
   * Can be used to go from the world coordinate space to a child's coordinate space. (e.g. input)
   * @param pos - The origin
   * @returns {IPoint} The new point, inverse-transformed through this matrix
   */
  applyInverse(s) {
    const t = this.a, e = this.b, n = this.c, i = this.d, r = this.tx, o = this.ty, a = 1 / (t * i + n * -e), h = s.x, l = s.y;
    return {
      x: i * a * h + -n * a * l + (o * n - r * i) * a,
      y: t * a * l + -e * a * h + (-o * t + r * e) * a
    };
  }
  /**
   * Translates the matrix on the x and y.
   * @param x - How much to translate x by
   * @param y - How much to translate y by
   * @returns This matrix. Good for chaining method calls.
   */
  translate(s, t) {
    return this.tx += s, this.ty += t, this;
  }
  /**
   * Applies a scale transformation to the matrix.
   * @param x - The amount to scale horizontally
   * @param y - The amount to scale vertically
   * @returns This matrix. Good for chaining method calls.
   */
  scale(s, t) {
    return this.a *= s, this.d *= t, this.c *= s, this.b *= t, this.tx *= s, this.ty *= t, this;
  }
  /**
   * Applies a rotation transformation to the matrix.
   * @param angle - The angle in radians.
   * @returns This matrix. Good for chaining method calls.
   */
  rotate(s) {
    const t = Math.cos(s), e = Math.sin(s), n = this.a, i = this.c, r = this.tx;
    return this.a = n * t - this.b * e, this.b = n * e + this.b * t, this.c = i * t - this.d * e, this.d = i * e + this.d * t, this.tx = r * t - this.ty * e, this.ty = r * e + this.ty * t, this;
  }
  /**
   * Appends the given Matrix to this Matrix.
   * @param matrix - The matrix to append.
   * @returns This matrix. Good for chaining method calls.
   */
  append(s) {
    const t = this.a, e = this.b, n = this.c, i = this.d;
    return this.a = s.a * t + s.b * n, this.b = s.a * e + s.b * i, this.c = s.c * t + s.d * n, this.d = s.c * e + s.d * i, this.tx = s.tx * t + s.ty * n + this.tx, this.ty = s.tx * e + s.ty * i + this.ty, this;
  }
  /**
   * Appends two matrix's and sets the result to this matrix. AB = A * B
   * @param a - The matrix to append.
   * @param b - The matrix to append.
   * @returns This matrix. Good for chaining method calls.
   */
  appendFrom(s, t) {
    const e = s.a, n = s.b, i = s.c, r = s.d, o = s.tx, a = s.ty, h = t.a, l = t.b, d = t.c, u = t.d;
    return this.a = e * h + n * d, this.b = e * l + n * u, this.c = i * h + r * d, this.d = i * l + r * u, this.tx = o * h + a * d + t.tx, this.ty = o * l + a * u + t.ty, this;
  }
  /**
   * Prepends the given Matrix to this Matrix.
   * @param matrix - The matrix to prepend
   * @returns This matrix. Good for chaining method calls.
   */
  prepend(s) {
    const t = this.tx;
    if (s.a !== 1 || s.b !== 0 || s.c !== 0 || s.d !== 1) {
      const e = this.a, n = this.c;
      this.a = e * s.a + this.b * s.c, this.b = e * s.b + this.b * s.d, this.c = n * s.a + this.d * s.c, this.d = n * s.b + this.d * s.d;
    }
    return this.tx = t * s.a + this.ty * s.c + s.tx, this.ty = t * s.b + this.ty * s.d + s.ty, this;
  }
  /**
   * Inverts this matrix
   * @returns This matrix. Good for chaining method calls.
   */
  invert() {
    const s = this.a, t = this.b, e = this.c, n = this.d, i = this.tx, r = s * n - t * e;
    return this.a = n / r, this.b = -t / r, this.c = -e / r, this.d = s / r, this.tx = (e * this.ty - n * i) / r, this.ty = -(s * this.ty - t * i) / r, this;
  }
  /** Checks if this matrix is an identity matrix */
  isIdentity() {
    return this.a === 1 && this.b === 0 && this.c === 0 && this.d === 1 && this.tx === 0 && this.ty === 0;
  }
  /**
   * Resets this Matrix to an identity (default) matrix.
   * @returns This matrix. Good for chaining method calls.
   */
  identity() {
    return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this;
  }
  /**
   * Creates a new Matrix object with the same values as this one.
   * @returns A copy of this matrix. Good for chaining method calls.
   */
  clone() {
    const s = new R();
    return s.a = this.a, s.b = this.b, s.c = this.c, s.d = this.d, s.tx = this.tx, s.ty = this.ty, s;
  }
  /**
   * Changes the values of the given matrix to be the same as the ones in this matrix
   * @param matrix - The matrix to copy to.
   * @returns The matrix given in parameter with its values updated.
   */
  copyTo(s) {
    return s.a = this.a, s.b = this.b, s.c = this.c, s.d = this.d, s.tx = this.tx, s.ty = this.ty, s;
  }
  /**
   * Changes the values of the matrix to be the same as the ones in given matrix
   * @param matrix - The matrix to copy from.
   * @returns this
   */
  copyFrom(s) {
    return this.a = s.a, this.b = s.b, this.c = s.c, this.d = s.d, this.tx = s.tx, this.ty = s.ty, this;
  }
  /**
   * check to see if two matrices are the same
   * @param matrix - The matrix to compare to.
   */
  equals(s) {
    return s.a === this.a && s.b === this.b && s.c === this.c && s.d === this.d && s.tx === this.tx && s.ty === this.ty;
  }
  // #if _DEBUG
  toString() {
    return `[Matrix a=${this.a} b=${this.b} c=${this.c} d=${this.d} tx=${this.tx} ty=${this.ty}]`;
  }
  // #endif
}, Ii = Math.PI * 2;
function mn(s) {
  return s * 180 / Math.PI;
}
var Ro = (s) => (s = s % Ii, s < 0 && (s += Ii), s), Ti = (s) => (s = s % 360, s < 0 && (s += 360), s), Qc = (s, t) => {
  const e = s.x * t.x + s.y * t.y, n = Math.sqrt(s.x * s.x + s.y * s.y) * Math.sqrt(t.x * t.x + t.y * t.y);
  let i = e / n;
  return i > 1 ? i = 1 : i < -1 && (i = -1), Math.acos(i);
}, _t = (s, t, e) => {
  const n = s.x * t.x + s.y * t.y, i = Math.sqrt(s.x * s.x + s.y * s.y) * Math.sqrt(t.x * t.x + t.y * t.y);
  let r = n / i;
  r > 1 ? r = 1 : r < -1 && (r = -1);
  let o = Math.acos(r);
  const a = s.x * t.y - s.y * t.x;
  return (e ? a > 0 : a < 0) && (o = Ii - o), o;
}, We = (s, t = { x: 0, y: -1 }) => {
  const n = new R(
    s[0],
    s[1],
    s[2],
    s[3],
    0,
    0
  ).apply(t);
  return _t(t, n);
}, _o = (s) => s[0] * s[3] - s[1] * s[2] < 0, Pi = (s, t) => ({
  x: (s.x + t.x) / 2,
  y: (s.y + t.y) / 2
}), zt = (s, t) => ({
  x: s.x + t.x,
  y: s.y + t.y
}), Yt = (s, t) => ({
  x: s.x - t.x,
  y: s.y - t.y
}), qn = (s) => s.x === 0 && s.y === 0, tl = 1e-10, Ni = (s, t, e = tl) => Math.abs(s.x - t.x) < e && Math.abs(s.y - t.y) < e, q = (s, t) => Math.sqrt(Math.pow(s.x - t.x, 2) + Math.pow(s.y - t.y, 2)), cs = (s, t, e) => s * (1 - e) + t * e, ee = (s, t, e) => ({
  x: cs(s.x, t.x, e),
  y: cs(s.y, t.y, e)
}), ln = (s) => {
  const t = Math.sqrt(s.x * s.x + s.y * s.y);
  return {
    x: s.x / t,
    y: s.y / t
  };
}, el = (s, t, e) => {
  const n = Yt(s[1], s[0]), i = {
    x: -n.y,
    y: n.x
  }, r = ln(i), o = {
    x: t.x + r.x * e,
    y: t.y + r.y * e
  }, a = {
    x: t.x - r.x * e,
    y: t.y - r.y * e
  };
  return [o, a];
}, Jn = (s, t) => {
  if (s.length === 4) {
    const [e, n, i, r] = s, o = t * t, a = 1 - t, h = a * a, l = h * a, d = 3 * t * h, u = 3 * o * a, p = o * t;
    return {
      x: l * e.x + d * n.x + u * i.x + p * r.x,
      y: l * e.y + d * n.y + u * i.y + p * r.y
    };
  }
  for (; s.length > 1; ) {
    const e = [];
    for (let n = 0, i = s.length - 1; n < i; n++)
      e.push(ee(s[n], s[n + 1], t));
    s = e;
  }
  return s[0];
}, nl = (s, t, e) => {
  const n = s.point, i = t.point, r = zt(s.point, s.out), o = zt(t.point, t.in), a = ee(n, r, e), h = ee(r, o, e), l = ee(o, i, e), d = ee(a, h, e), u = ee(h, l, e), p = ee(d, u, e);
  return [
    {
      point: s.point,
      in: s.in,
      out: Yt(a, s.point)
    },
    {
      point: p,
      in: Yt(d, p),
      out: Yt(u, p)
    },
    {
      point: t.point,
      in: Yt(l, t.point),
      out: t.out
    }
  ];
}, Ei = () => [1, 0, 0, 1, 0, 0], vt = (s, t) => {
  const e = s[0], n = s[1], i = s[2], r = s[3];
  return [
    t[0] * e + t[1] * i,
    t[0] * n + t[1] * r,
    t[2] * e + t[3] * i,
    t[2] * n + t[3] * r,
    t[4] * e + t[5] * i + s[4],
    t[4] * n + t[5] * r + s[5]
  ];
}, pe = (s, t) => ({
  x: t.x * s[0] + t.y * s[2] + s[4],
  y: t.x * s[1] + t.y * s[3] + s[5]
}), Yi = (s, t) => pe(Rt(s), t), Rt = (s) => {
  const t = s[0], e = s[1], n = s[2], i = s[3], r = s[4], o = t * i - e * n;
  return [
    i / o,
    -e / o,
    -n / o,
    t / o,
    (n * s[5] - i * r) / o,
    -(t * s[5] - e * r) / o
  ];
}, sl = (s, t, e, n, i) => {
  if (!e)
    return { x: s, y: t };
  const r = Math.cos(e), o = Math.sin(e);
  return {
    x: (s - n) * r - (t - i) * o + n,
    y: (s - n) * o + (t - i) * r + i
  };
}, xr = 0.5522847498307936, Vi = (s, t) => ({
  x: Math.min(s.x, t.x),
  y: Math.min(s.y, t.y),
  width: Math.abs(s.x - t.x),
  height: Math.abs(s.y - t.y)
}), ji = (s, t, e = 0) => (t.transform && (s = new R(...t.transform).applyInverse(s)), s.x >= -e && s.y >= -e && s.x <= t.width + e && s.y <= t.height + e), vr = (s, t, e, n = 0) => {
  const i = t.x - n, r = t.y - n, o = t.width + n * 2, a = t.height + n * 2;
  return s.x >= i && s.y >= r && s.x <= i + o && s.y <= r + a ? s.x <= i + e[0] && s.y <= r + e[0] ? It(s.x - i - e[0], 2) + It(s.y - r - e[0], 2) <= It(e[0], 2) : s.x >= i + o - e[1] && s.y <= r + e[1] ? It(s.x - i - o + e[1], 2) + It(s.y - r - e[1], 2) <= It(e[1], 2) : s.x >= i + o - e[2] && s.y >= r + a - e[2] ? It(s.x - i - o + e[2], 2) + It(s.y - r - a + e[2], 2) <= It(e[2], 2) : s.x <= i + e[3] && s.y >= r + a - e[3] ? It(s.x - i - e[3], 2) + It(s.y - r - a + e[3], 2) <= It(e[3], 2) : !0 : !1;
}, Se = ({ x: s, y: t, width: e, height: n }) => {
  const i = s + e, r = t + n;
  return Vi({ x: s, y: t }, { x: i, y: r });
}, il = (s, t) => s.x <= t.x + t.width && s.x + s.width >= t.x && s.y <= t.y + t.height && s.y + s.height >= t.y, ki = (s, t) => {
  typeof t == "number" && (t = [t, t, t, t]);
  const { x: e, y: n, width: i, height: r } = s;
  return {
    x: e - t[3],
    y: n - t[0],
    width: i + t[1] + t[3],
    height: r + t[0] + t[2]
  };
}, rl = (s) => {
  const { x: t, y: e, width: n, height: i } = s, r = n / 2, o = i / 2;
  return [
    { x: t + r, y: e },
    { x: t + n, y: e + o },
    { x: t + r, y: e + i },
    { x: t, y: e + o }
  ];
}, ol = (s, t) => {
  const { x: e, y: n } = s, i = t.x - s.x, r = t.y - s.y, o = Ro(Math.atan2(r, i)), a = e + i / 2, h = n + r / 2, l = sl(e, n, -o, a, h);
  return {
    x: l.x,
    y: l.y,
    width: Math.sqrt(i * i + r * r),
    height: 0,
    rotation: o
  };
}, ne = (s, t) => {
  const { x: e, y: n, width: i, height: r } = s;
  let o = [
    { x: e, y: n },
    { x: e + i, y: n },
    { x: e + i, y: n + r },
    { x: e, y: n + r }
  ];
  if (t) {
    const a = new R(...t);
    o = o.map((h) => {
      const l = a.apply(h);
      return { x: l.x, y: l.y };
    });
  }
  return o;
}, Bo = (s) => {
  const t = new R(
    s.transform[0],
    s.transform[1],
    s.transform[2],
    s.transform[3],
    0,
    0
  ), e = t.apply({ x: s.width, y: 0 }), n = t.apply({ x: 0, y: s.height }), i = { x: 0, y: 0 };
  return {
    width: q(e, i),
    height: q(n, i)
  };
}, es = (s) => {
  const t = Bo(s), e = t.width ? s.width / t.width : 1, n = t.height ? s.height / t.height : 1, i = new R().scale(e, n), r = new R(...s.transform).append(i);
  return {
    width: t.width,
    height: t.height,
    transform: r.getArray()
  };
}, Xi = (s) => ({
  minX: s.x,
  minY: s.y,
  maxX: s.x + s.width,
  maxY: s.y + s.height
}), jt = (s) => ({
  x: s.minX,
  y: s.minY,
  width: s.maxX - s.minX,
  height: s.maxY - s.minY
}), al = (s, t = 0) => {
  const { minX: e, minY: n, maxX: i, maxY: r } = Xi(s);
  if (t <= 0)
    return [
      { type: "M", points: [{ x: e, y: n }] },
      { type: "L", points: [{ x: i, y: n }] },
      { type: "L", points: [{ x: i, y: r }] },
      { type: "L", points: [{ x: e, y: r }] },
      { type: "Z", points: [] }
    ];
  const o = s.width / 2, a = s.height / 2, h = Math.min(t, o, a), l = h === o, d = h === a, u = h * xr, p = h * xr, m = [
    // left top
    { type: "M", points: [{ x: e, y: n + h }] },
    {
      type: "C",
      points: [
        { x: e, y: n + h - p },
        { x: e + h - u, y: n },
        { x: e + h, y: n }
      ]
    }
  ];
  return l || m.push({
    type: "L",
    points: [{ x: i - h, y: n }]
  }), m.push({
    type: "C",
    points: [
      { x: i - h + u, y: n },
      { x: i, y: n + h - p },
      { x: i, y: n + h }
    ]
  }), d || m.push({
    type: "L",
    points: [{ x: i, y: r - h }]
  }), m.push({
    type: "C",
    points: [
      { x: i, y: r - h + p },
      { x: i - h + u, y: r },
      { x: i - h, y: r }
    ]
  }), l || m.push({
    type: "L",
    points: [{ x: e + h, y: r }]
  }), m.push({
    type: "C",
    points: [
      { x: e + h - u, y: r },
      { x: e, y: r - h + p },
      { x: e, y: r - h }
    ]
  }), d || m.push({
    type: "L",
    points: [{ x: e, y: n + h }]
  }), m.push({
    type: "Z",
    points: []
  }), m;
}, Ho = (s, t, e = 0) => t.x >= s.minX - e && t.y >= s.minY - e && t.x <= s.maxX + e && t.y <= s.maxY + e, Ut = (s) => {
  if (s.length === 0)
    throw new Error("the count of boxes can not be 0");
  let t = 1 / 0, e = 1 / 0, n = -1 / 0, i = -1 / 0;
  for (const r of s)
    t = Math.min(t, r.minX), e = Math.min(e, r.minY), n = Math.max(n, r.maxX), i = Math.max(i, r.maxY);
  return {
    minX: t,
    minY: e,
    maxX: n,
    maxY: i
  };
}, Ai = (s, t) => s.minX <= t.maxX && s.maxX >= t.minX && s.minY <= t.maxY && s.maxY >= t.minY, wr = (s, t) => s.minX <= t.minX && s.minY <= t.minY && s.maxX >= t.maxX && s.maxY >= t.maxY, Sn = (s) => {
  let t = 1 / 0, e = 1 / 0, n = -1 / 0, i = -1 / 0;
  for (const r of s)
    t = Math.min(t, r.x), e = Math.min(e, r.y), n = Math.max(n, r.x), i = Math.max(i, r.y);
  return {
    minX: t,
    minY: e,
    maxX: n,
    maxY: i
  };
}, un = (s, t) => {
  let e = 0, n = 0, i = s.width, r = s.height;
  t && (e -= t, n -= t, i += t * 2, r += t * 2);
  const o = s.transform, a = ne({
    x: e,
    y: n,
    width: i,
    height: r
  }).map((h) => pe(o, h));
  return Sn(a);
}, hl = (s) => {
  const t = 0.5522847498307936, { minX: e, minY: n, maxX: i, maxY: r } = Xi(s), o = (e + i) / 2, a = (n + r) / 2, h = s.width / 2, l = s.height / 2, d = h * t, u = l * t;
  return [
    { type: "M", points: [{ x: i, y: a }] },
    // right bottom
    {
      type: "C",
      points: [
        { x: i, y: a + u },
        { x: o + d, y: r },
        { x: o, y: r }
      ]
    },
    // left bottom
    {
      type: "C",
      points: [
        { x: o - d, y: r },
        { x: e, y: a + u },
        { x: e, y: a }
      ]
    },
    // left top
    {
      type: "C",
      points: [
        { x: e, y: a - u },
        { x: o - d, y: n },
        { x: o, y: n }
      ]
    },
    // right top
    {
      type: "C",
      points: [
        { x: i, y: a - u },
        { x: o + d, y: n },
        { x: i, y: a }
      ]
    },
    {
      type: "Z",
      points: []
    }
  ];
}, Di = (s, t, e, n = !0) => {
  if (s.x === t.x && s.y === t.y)
    return {
      t: 0,
      point: { x: s.x, y: s.y }
    };
  const i = t.x - s.x, r = t.y - s.y;
  let o = ((e.x - s.x) * i + (e.y - s.y) * r) / (i * i + r * r);
  n || (o = Math.max(0, Math.min(1, o)));
  const a = {
    x: s.x + o * i,
    y: s.y + o * r
  };
  return {
    t: o,
    point: a
  };
}, cl = (s, t, e = 4) => {
  let n = { x: 0, y: 0 }, i = 1 / 0;
  for (let r = 1; r <= e; r++) {
    const o = Math.PI / e * r, a = {
      x: s.x + Math.cos(o),
      y: s.y + Math.sin(o)
    }, { point: h } = Di(s, a, t), l = q(h, t);
    if (l === 0)
      return h;
    l < i && (i = l, n = h);
  }
  return n;
}, ll = (s, t, e, n) => {
  const { x: i, y: r } = s, { x: o, y: a } = t, { x: h, y: l } = e, { x: d, y: u } = n, p = a - r, m = i - o, x = i * a - o * r, y = u - l, S = h - d, w = h * u - d * l, b = p * S - m * y;
  if (Math.abs(b) < 1e-9)
    return null;
  const C = (x * S - w * m) / b, I = (p * w - x * y) / b;
  return { x: C, y: I };
}, dl = (s, t) => {
  const e = Do(
    s.map(({ point: i }) => [i.x, i.y]),
    t
  ), n = [];
  for (let i = 0, r = e.length; i <= r; i++) {
    const o = e[i], a = e[i - 1], h = o ? {
      x: o[0][0],
      y: o[0][1]
    } : {
      x: a[3][0],
      y: a[3][1]
    }, l = o ? {
      x: o[1][0] - h.x,
      y: o[1][1] - h.y
    } : { x: 0, y: 0 }, d = a ? {
      x: a[2][0] - h.x,
      y: a[2][1] - h.y
    } : { x: 0, y: 0 };
    n.push({
      point: h,
      in: d,
      out: l
    });
  }
  return n;
}, gl = (s, t, e) => {
  const n = s.segs;
  if (!s.closed && (t < 0 || t >= n.length - 1))
    return n.splice(t, 1), s;
  let r = t + 1;
  s.closed && (r %= n.length);
  const o = n[t], a = n[r], h = nl(o, a, e);
  return r === 0 ? (s.segs.splice(t, 1, h[0], h[1]), s.segs.splice(0, 1, h[2])) : s.segs.splice(t, 2, ...h), s;
}, ul = (s, t) => {
  const e = s.segs;
  if (e.length <= 1)
    return s.segs = [], s;
  if (!s.closed && (t <= 0 || t >= e.length - 1))
    return e.splice(t, 1), s;
  let i = t - 1, r = t + 1;
  s.closed && (i %= e.length, r %= e.length);
  const o = e[t], a = e[i], h = e[r];
  if (qn(a.out) && qn(h.in) && qn(o.in) && qn(o.out))
    return e.splice(t, 1), s;
  const d = [
    a.point,
    zt(a.out, a.point),
    zt(o.in, o.point),
    o.point
  ], u = [
    o.point,
    zt(o.out, o.point),
    zt(h.in, h.point),
    h.point
  ], p = [
    Jn(d, 0.3),
    Jn(d, 0.6)
  ], m = [
    Jn(u, 0.3),
    Jn(u, 0.6)
  ], x = Do(
    [
      a.point,
      ...p,
      o.point,
      ...m,
      h.point
    ].map(({ x: M, y: E }) => [M, E]),
    9999
  )[0], y = Yt(
    {
      x: x[1][0],
      y: x[1][1]
    },
    a.point
  ), S = Yt(
    {
      x: x[2][0],
      y: x[2][1]
    },
    h.point
  );
  let w = ln(a.out);
  (Number.isNaN(w.x) || Number.isNaN(w.y)) && (w = ln(y));
  let b = ln(h.in);
  (Number.isNaN(b.x) || Number.isNaN(b.y)) && (b = ln(S));
  const C = q({ x: 0, y: 0 }, y), I = q({ x: 0, y: 0 }, S);
  return a.out = {
    x: w.x * C,
    y: w.y * C
  }, h.in = {
    x: b.x * I,
    y: b.y * I
  }, e.splice(t, 1), s;
}, fl = class {
  // lookup table
  constructor(s) {
    Dt(this, "points"), Dt(this, "dpoints", []), Dt(this, "_bbox", null), Dt(this, "lut", []), this.points = s, this.dpoints[0] = {
      x: 3 * (s[1].x - s[0].x),
      y: 3 * (s[1].y - s[0].y)
    }, this.dpoints[1] = {
      x: 3 * (s[2].x - s[1].x),
      y: 3 * (s[2].y - s[1].y)
    }, this.dpoints[2] = {
      x: 3 * (s[3].x - s[2].x),
      y: 3 * (s[3].y - s[2].y)
    };
  }
  compute(s) {
    const t = s * s, e = 1 - s, n = e * e, i = n * e, r = 3 * s * n, o = 3 * t * e, a = t * s, [h, l, d, u] = this.points;
    return {
      x: i * h.x + r * l.x + o * d.x + a * u.x,
      y: i * h.y + r * l.y + o * d.y + a * u.y
    };
  }
  extrema() {
    const s = this.dpoints, t = [
      ...Sr(s[0].x, s[1].x, s[2].x),
      ...Sr(s[0].y, s[1].y, s[2].y)
    ].filter((e) => e >= 0 && e <= 1);
    return Array.from(new Set(t));
  }
  getBbox() {
    if (!this._bbox) {
      const s = this.extrema().map((t) => this.compute(t));
      this._bbox = Sn([
        ...s,
        this.points[0],
        this.points[3]
      ]);
    }
    return this._bbox;
  }
  hitTest(s, t) {
    if (!Ho(this.getBbox(), s, t))
      return !1;
    const e = this.getLookupTable();
    let n = Number.MAX_SAFE_INTEGER, i = -1;
    for (let l = 0; l < e.length; l++) {
      const d = e[l], u = q(s, d.pt);
      if (u <= t)
        return !0;
      u < n && (n = u, i = l);
    }
    const r = e[i].t, o = i > 0 ? e[i - 1].t : r, a = i < e.length - 1 ? e[i + 1].t : r, h = 1e-3;
    for (let l = o; l <= a; l += h) {
      const d = this.compute(l);
      if (q(s, d) <= t)
        return !0;
    }
    return !1;
  }
  getLookupTable() {
    if (this.lut.length === 0)
      for (let t = 0; t <= 100; t++) {
        const e = t / 100, n = this.compute(e);
        this.lut[t] = { t: e, pt: n };
      }
    return this.lut;
  }
  project(s) {
    const t = this.getLookupTable();
    let e = Number.MAX_SAFE_INTEGER, n = -1;
    for (let l = 0; l < t.length; l++) {
      const d = t[l], u = q(s, d.pt);
      if (u < e && (e = u, n = l, u === 0))
        break;
    }
    if (e === 0) {
      const l = this.compute(t[n].t);
      return {
        point: l,
        t: t[n].t,
        dist: q(s, l)
      };
    }
    let i = t[n].t;
    const r = n > 0 ? t[n - 1].t : i, o = n < t.length - 1 ? t[n + 1].t : i, a = 1e-3;
    for (let l = r; l <= o; l += a) {
      const d = this.compute(l), u = q(s, d);
      if (u < e && (e = u, i = l, u === 0))
        break;
    }
    i < 0 && (i = 0), i > 1 && (i = 1);
    const h = this.compute(i);
    return {
      point: h,
      t: i,
      dist: q(s, h)
    };
  }
  toCommand() {
    const [s, t, e, n] = this.points;
    return s.x === t.x && t.x === e.x && e.x === n.x ? [
      { type: "M", points: [s] },
      { type: "C", points: [t, e, n] }
    ] : [
      { type: "M", points: [s] },
      { type: "C", points: [t, e, n] }
    ];
  }
}, Sr = (s, t, e) => {
  const n = s - 2 * t + e;
  if (n !== 0) {
    const i = t * t - s * e;
    if (i < 0)
      return [];
    const r = Math.sqrt(i), o = s - t;
    return r === 0 ? [(o - r) / n] : [(o - r) / n, (o + r) / n];
  } else return s !== t ? [s / (s - t) / 2] : [];
}, ls = class {
  constructor(s) {
    Dt(this, "bezierLists");
    const t = [];
    for (let e = 0; e < s.length; e++) {
      const n = s[e], i = n.segs;
      t[e] = {
        isClosed: n.closed,
        curves: []
      };
      for (let r = 1; r <= i.length; r++) {
        if (r === i.length && !n.closed)
          continue;
        const o = i[r % i.length], a = i[r - 1];
        t[e].curves.push(
          new fl([
            a.point,
            ls.getHandleOut(a),
            ls.getHandleIn(o),
            o.point
          ])
        );
      }
    }
    this.bezierLists = t;
  }
  static getHandleIn(s) {
    return zt(s.point, s.in);
  }
  static getHandleOut(s) {
    return zt(s.point, s.out);
  }
  getBbox() {
    let s = 1 / 0, t = 1 / 0, e = -1 / 0, n = -1 / 0;
    for (const { curves: i } of this.bezierLists)
      for (const r of i) {
        const o = r.getBbox();
        s = Math.min(s, o.minX), t = Math.min(t, o.minY), e = Math.max(e, o.maxX), n = Math.max(n, o.maxY);
      }
    return {
      minX: s,
      minY: t,
      maxX: e,
      maxY: n
    };
  }
  getBRect() {
    const s = this.getBbox();
    return s.minX === 1 / 0 ? { x: 0, y: 0, width: 100, height: 100 } : {
      x: s.minX,
      y: s.minY,
      width: s.maxX - s.minX,
      height: s.maxY - s.minY
    };
  }
  hitTest(s, t) {
    for (const { curves: e } of this.bezierLists)
      for (const n of e)
        if (n.hitTest(s, t))
          return !0;
    return !1;
  }
  project(s, t = 1 / 0) {
    const e = {
      dist: t,
      point: { x: 0, y: 0 },
      index: [-1, -1],
      t: -1
    };
    for (let n = 0; n < this.bezierLists.length; n++) {
      const { curves: i } = this.bezierLists[n];
      for (let r = 0; r < i.length; r++) {
        const a = i[r].project(s);
        if (a.dist < e.dist && (e.dist = a.dist, e.point = a.point, e.index = [n, r], e.t = a.t), a.dist === 0)
          break;
      }
    }
    return e.index[0] === -1 ? null : e;
  }
  toCommands() {
    const s = [];
    for (const { isClosed: t, curves: e } of this.bezierLists) {
      for (let n = 0; n < e.length; n++) {
        const r = e[n].toCommand();
        n === 0 ? s.push(...r) : s.push(...r.slice(1));
      }
      t && s.push({
        type: "Z",
        points: []
      });
    }
    return s;
  }
}, ve = (s, t) => s.map(
  (e) => e.type + e.points.map(
    (n) => Cr(n.x, t) + " " + Cr(n.y, t)
  ).join(" ")
).join(" "), Cr = (s, t = 2) => Number(s.toFixed(t)), pl = ({
  center: s,
  r: t,
  startAngle: e,
  endAngle: n,
  angleDir: i = !0
}) => {
  i === !1 && ([e, n] = [n, e]);
  const r = (n - e + Math.PI * 2) % (Math.PI * 2), o = r / 2, a = 4 * (1 - Math.cos(o)) / (3 * Math.sin(o)), h = new R().rotate(e).scale(t, t).translate(s.x, s.y);
  n -= e, e = 0;
  const l = h.apply({
    x: 1,
    y: 0
  }), d = h.apply({
    x: 1,
    y: a
  }), u = h.apply({
    x: Math.cos(r) + a * Math.sin(r),
    y: Math.sin(r) - a * Math.cos(r)
  }), p = h.apply({
    x: Math.cos(r),
    y: Math.sin(r)
  });
  return i ? [l, d, u, p] : [p, u, d, l];
}, ml = (s, t) => {
  const e = s.width / 2, n = s.height / 2, i = [{ x: e, y: 0 }], r = Math.PI * 2 / t, o = new R().translate(-e, -n).rotate(r).translate(e, n);
  let a = i[0];
  for (let l = 1; l < t; l++) {
    const { x: d, y: u } = o.apply(a), p = { x: d, y: u };
    i.push(p), a = p;
  }
  const h = s.width / s.height;
  for (let l = 1; l < t; l++) {
    const d = i[l];
    d.x = cs(e, d.x, h);
  }
  return i;
}, yl = (s, t) => {
  let e;
  for (let n = 0; n < s.length; n++) {
    const i = s[n], r = s[(n + 1) % s.length], o = {
      x: r.x - i.x,
      y: r.y - i.y
    }, a = {
      x: t.x - i.x,
      y: t.y - i.y
    }, h = Math.sign(o.x * a.y - o.y * a.x);
    if (h !== 0) {
      if (e === void 0)
        e = h;
      else if (e !== h)
        return !1;
    }
  }
  return !0;
}, xl = (s, t) => {
  let e = !1;
  for (let n = 0; n < s.length; n++) {
    let i = s[n], r = s[(n + 1) % s.length];
    if (i.y > r.y && ([i, r] = [r, i]), i.y <= t.y && r.y > t.y) {
      const o = (t.x - i.x) * (r.y - i.y) - (r.x - i.x) * (t.y - i.y);
      if (o === 0)
        return !0;
      o > 0 && (e = !e);
    }
  }
  return e;
}, Lo = (s, t) => {
  const e = [];
  for (let n = 0; n < s.length; n++) {
    const i = s[(n - 1 + s.length) % s.length], r = s[n], o = s[(n + 1) % s.length], a = vl(
      Pi(i, r),
      r,
      Pi(r, o),
      t
    ), h = wl([i, r], [r, o], a);
    if (n === 0)
      e.push({
        type: "M",
        points: [h.start]
      });
    else {
      const d = e[e.length - 1].points, u = d[d.length - 1];
      Ni(h.start, u) || e.push({
        type: "L",
        points: [h.start]
      });
    }
    const l = pl({
      center: h.center,
      r: a,
      startAngle: h.startAngle,
      endAngle: h.endAngle,
      angleDir: h.angleDir
    });
    e.push({
      type: "C",
      points: [l[1], l[2], l[3]]
    });
  }
  return e.push({
    type: "Z",
    points: []
  }), e;
}, vl = (s, t, e, n) => {
  const i = {
    x: t.x - s.x,
    y: t.y - s.y
  }, r = {
    x: t.x - e.x,
    y: t.y - e.y
  }, o = Qc(i, r) / 2, a = Math.tan(o) * q(s, t), h = Math.tan(o) * q(t, e);
  return Math.min(n, a, h);
}, wl = (s, t, e) => {
  const n = s[0], i = s[1], r = t[0], o = t[1], a = {
    x: n.x - i.x,
    y: n.y - i.y
  }, h = {
    x: o.x - r.x,
    y: o.y - r.y
  }, l = a.x * h.y - h.x * a.y;
  if (l === 0)
    return null;
  let d, u;
  l < 0 ? (d = {
    x: a.y,
    y: -a.x
  }, u = {
    x: -h.y,
    y: h.x
  }) : (d = {
    x: -a.y,
    y: a.x
  }, u = {
    x: h.y,
    y: -h.x
  });
  const p = e / q(n, i), m = {
    x: d.x * p,
    y: d.y * p
  }, x = [
    {
      x: n.x + m.x,
      y: n.y + m.y
    },
    {
      x: i.x + m.x,
      y: i.y + m.y
    }
  ], y = e / q(r, o), S = {
    x: u.x * y,
    y: u.y * y
  }, w = [
    {
      x: r.x + S.x,
      y: r.y + S.y
    },
    {
      x: o.x + S.x,
      y: o.y + S.y
    }
  ], b = ll(
    x[0],
    x[1],
    w[0],
    w[1]
  ), { point: C } = Di(n, i, b, !0), { point: I } = Di(r, o, b, !0), M = { x: 1, y: 0 }, E = _t(M, {
    x: C.x - b.x,
    y: C.y - b.y
  }), T = _t(M, {
    x: I.x - b.x,
    y: I.y - b.y
  });
  return {
    center: b,
    start: C,
    end: I,
    startAngle: E,
    endAngle: T,
    angleDir: l < 0
    // positive --> clockwise
  };
}, Wo = (s, t, e, n = {
  keepPolarSnap: !1,
  scaleFromCenter: !1
}) => {
  if (!["se", "ne", "nw", "sw"].includes(s))
    throw new Error(`invalid type "${s}"`);
  const i = s === "se" || s === "ne";
  let r = { x: 0, y: 0 };
  n.scaleFromCenter ? r = new R(...e.transform).apply({
    x: e.width / 2,
    y: e.height / 2
  }) : i ? r = {
    x: e.transform[4],
    y: e.transform[5]
  } : r = new R(...e.transform).apply({
    x: e.width,
    y: e.height
  }), n.keepPolarSnap && (t = cl(r, t));
  let o = q(t, r);
  if (n.scaleFromCenter && (o *= 2), i) {
    const a = {
      x: t.x - r.x,
      y: t.y - r.y
    }, h = _t(
      { x: 1, y: 0 },
      {
        x: t.x - r.x,
        y: t.y - r.y
      }
    ), l = new R().rotate(h).translate(r.x, r.y);
    return n.scaleFromCenter && l.translate(-a.x, -a.y), {
      width: o,
      height: 0,
      transform: l.getArray()
    };
  } else {
    const a = {
      x: r.x - t.x,
      y: r.y - t.y
    }, h = _t({ x: 1, y: 0 }, a), l = new R().rotate(h), d = l.apply({ x: o, y: e.height });
    return l.translate(
      r.x - d.x,
      r.y - d.y
    ), n.scaleFromCenter && l.translate(a.x, a.y), {
      width: o,
      height: 0,
      transform: l.getArray()
    };
  }
}, Qn = (s, t) => ({
  width: s * 2,
  height: t * 2
}), Sl = {
  sw: {
    getLocalOrigin: (s) => ({ x: s, y: 0 }),
    getNewSize: (s, t) => ({
      width: t.x - s.x,
      height: s.y - t.y
    }),
    isBaseWidthWhenKeepRatio: (s) => s,
    getSizeWhenScaleFromCenter: Qn
  },
  se: {
    getLocalOrigin: () => ({ x: 0, y: 0 }),
    getNewSize: (s, t) => ({
      width: s.x - t.x,
      height: s.y - t.y
    }),
    isBaseWidthWhenKeepRatio: (s) => s,
    getSizeWhenScaleFromCenter: Qn
  },
  nw: {
    getLocalOrigin: (s, t) => ({ x: s, y: t }),
    getNewSize: (s, t) => ({
      width: t.x - s.x,
      height: t.y - s.y
    }),
    isBaseWidthWhenKeepRatio: (s) => s,
    getSizeWhenScaleFromCenter: Qn
  },
  ne: {
    getLocalOrigin: (s, t) => ({ x: 0, y: t }),
    getNewSize: (s, t) => ({
      width: s.x - t.x,
      height: t.y - s.y
    }),
    isBaseWidthWhenKeepRatio: (s) => s,
    getSizeWhenScaleFromCenter: Qn
  },
  n: {
    getLocalOrigin: (s, t) => ({ x: s / 2, y: t }),
    getNewSize: (s, t, e) => ({
      width: e.width,
      height: t.y - s.y
    }),
    isBaseWidthWhenKeepRatio: () => !1,
    getSizeWhenScaleFromCenter: (s, t) => ({
      width: s,
      height: t * 2
    })
  },
  s: {
    getLocalOrigin: (s) => ({ x: s / 2, y: 0 }),
    getNewSize: (s, t, e) => ({
      width: e.width,
      height: s.y - t.y
    }),
    isBaseWidthWhenKeepRatio: () => !1,
    getSizeWhenScaleFromCenter: (s, t) => ({
      width: s,
      height: t * 2
    })
  },
  e: {
    getLocalOrigin: (s, t) => ({ x: 0, y: t / 2 }),
    getNewSize: (s, t, e) => ({
      width: s.x - t.x,
      height: e.height
    }),
    isBaseWidthWhenKeepRatio: () => !0,
    getSizeWhenScaleFromCenter: (s, t) => ({
      width: s * 2,
      height: t
    })
  },
  w: {
    getLocalOrigin: (s, t) => ({ x: s, y: t / 2 }),
    getNewSize: (s, t, e) => ({
      width: t.x - s.x,
      height: e.height
    }),
    isBaseWidthWhenKeepRatio: () => !0,
    getSizeWhenScaleFromCenter: (s, t) => ({
      width: s * 2,
      height: t
    })
  }
}, ds = (s, t, e, n) => {
  const i = Sl[s];
  if (!i)
    throw new Error(`resize type ${s} is invalid`);
  const {
    keepRatio: r,
    scaleFromCenter: o,
    noChangeWidthAndHeight: a,
    flip: h = !0
  } = n ?? {}, l = new R(...e.transform), d = {
    width: 0,
    height: 0,
    transform: l.clone()
  }, u = o ? { x: e.width / 2, y: e.height / 2 } : i.getLocalOrigin(e.width, e.height), p = l.applyInverse(t);
  let m = i.getNewSize(p, u, e);
  if (o && (m = i.getSizeWhenScaleFromCenter(m.width, m.height)), r) {
    const I = e.width / e.height, E = Math.abs(m.width / m.height) > I;
    i.isBaseWidthWhenKeepRatio(E) ? m.height = Math.sign(m.height) * Math.abs(m.width) / I : m.width = Math.sign(m.width) * Math.abs(m.height) * I;
  }
  const x = new R(), y = Math.sign(m.width) || 1, S = Math.sign(m.height) || 1;
  a ? (x.scale(m.width / e.width, m.height / e.height), d.width = e.width, d.height = e.height) : (d.width = Math.abs(m.width), d.height = Math.abs(m.height), x.scale(y, S)), d.transform = d.transform.append(x);
  const w = d.transform.apply(
    o ? { x: d.width / 2, y: d.height / 2 } : i.getLocalOrigin(d.width, d.height)
  ), b = l.apply(u), C = {
    x: b.x - w.x,
    y: b.y - w.y
  };
  if (d.transform.prepend(new R().translate(C.x, C.y)), !h) {
    const I = new R().translate(-d.width / 2, -d.height / 2).scale(y, S).translate(d.width / 2, d.height / 2);
    d.transform.append(I);
  }
  return {
    width: d.width,
    height: d.height,
    transform: d.transform.getArray()
  };
}, Cl = (s, t, e) => {
  const n = s.width / 2, i = s.height / 2, r = new Array(t * 2);
  r[0] = { x: n, y: 0 };
  const o = Math.PI * 2 / t, a = new R().translate(-n, -i).rotate(o).translate(n, i);
  let h = r[0];
  for (let u = 1; u < t; u++) {
    const { x: p, y: m } = a.apply(h), x = { x: p, y: m };
    r[u * 2] = x, h = x;
  }
  const l = new R().translate(-n, -i).rotate(o / 2).translate(n, i);
  h = ee(
    { x: n, y: i },
    l.apply(r[0]),
    e
  ), r[1] = h;
  for (let u = 1; u < t; u++) {
    const { x: p, y: m } = a.apply(h), x = { x: p, y: m };
    r[u * 2 + 1] = x, h = x;
  }
  const d = s.width / s.height;
  for (let u = 1; u < r.length; u++) {
    const p = r[u];
    p.x = cs(n, p.x, d);
  }
  return r;
}, cn = null, zo = () => cn || (cn = document.createElement("canvas").getContext("2d"), cn.fontKerning = "none", cn), bl = (s, t) => {
  const e = [], n = { x: 0, y: 0 }, i = zo();
  i.font = `${t.fontSize}px ${t.fontFamily}`;
  for (const r of s) {
    const o = i.measureText(r);
    e.push({
      position: yr({}, n),
      width: o.width,
      height: o.fontBoundingBoxAscent + o.fontBoundingBoxDescent,
      fontBoundingBoxAscent: o.fontBoundingBoxAscent
    }), n.x += o.width;
  }
  return e.push({
    position: yr({}, n),
    width: 0,
    height: 0,
    fontBoundingBoxAscent: 0
  }), e;
}, Ml = (s, t) => {
  const e = zo();
  e.font = `${t.fontSize}px ${t.fontFamily}`;
  const n = e.measureText(s);
  return {
    width: n.width,
    height: n.fontBoundingBoxAscent + n.fontBoundingBoxDescent,
    fontBoundingBoxAscent: n.fontBoundingBoxAscent
  };
};
const br = Math.PI * 2, Gt = Math.PI / 2;
var B = /* @__PURE__ */ ((s) => (s.Solid = "Solid", s.Image = "Image", s))(B || {});
const Il = {
  type: "Solid",
  attrs: { r: 217, g: 217, b: 217, a: 1 },
  visible: !0
}, Tl = {
  type: "Image",
  attrs: {},
  visible: !0
}, Nd = {
  Solid: Il,
  Image: Tl
}, Go = (() => {
  const s = document.createElement("canvas");
  s.width = 4, s.height = 4;
  const t = s.getContext("2d");
  for (let e = 0; e < s.width; e++)
    for (let n = 0; n < s.height; n++) {
      const i = (e + n) % 2 === 0 ? "black" : "white";
      t.fillStyle = i, t.fillRect(e, n, 1, 1);
    }
  return s;
})(), Yd = Go.toDataURL(), Mr = (s) => {
  if (!s || s.length === 0)
    return !1;
  for (const t of s)
    if (t.visible !== !1 && (t.type === "Solid" && t.attrs.a !== 0 || t.type === "Image" && t.attrs.opacity !== 0))
      return !0;
  return !1;
};
var G = /* @__PURE__ */ ((s) => (s.Graph = "Graph", s.Rect = "Rect", s.Ellipse = "Ellipse", s.Text = "Text", s.Line = "Line", s.Path = "Path", s.RegularPolygon = "RegularPolygon", s.Star = "Star", s.Frame = "Frame", s.Canvas = "Canvas", s.Document = "Document", s))(G || {}), nt = /* @__PURE__ */ ((s) => (s.Left = "Left", s.HCenter = "HCenter", s.Right = "Right", s.Top = "Top", s.VCenter = "VCenter", s.Bottom = "Bottom", s))(nt || {}), Vt = /* @__PURE__ */ ((s) => (s.Front = "Front", s.Back = "Back", s.Forward = "Forward", s.Backward = "Backward", s))(Vt || {});
const Oo = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
function He(s, t, e) {
  const n = e[0];
  if (t != null && s >= t)
    throw new Error(s + " >= " + t);
  if (s.slice(-1) === n || t && t.slice(-1) === n)
    throw new Error("trailing zero");
  if (t) {
    let o = 0;
    for (; (s[o] || n) === t[o]; )
      o++;
    if (o > 0)
      return t.slice(0, o) + He(s.slice(o), t.slice(o), e);
  }
  const i = s ? e.indexOf(s[0]) : 0, r = t != null ? e.indexOf(t[0]) : e.length;
  if (r - i > 1) {
    const o = Math.round(0.5 * (i + r));
    return e[o];
  } else
    return t && t.length > 1 ? t.slice(0, 1) : e[i] + He(s.slice(1), null, e);
}
function Ko(s) {
  if (s.length !== Fo(s[0]))
    throw new Error("invalid integer part of order key: " + s);
}
function Fo(s) {
  if (s >= "a" && s <= "z")
    return s.charCodeAt(0) - 97 + 2;
  if (s >= "A" && s <= "Z")
    return 90 - s.charCodeAt(0) + 2;
  throw new Error("invalid order key head: " + s);
}
function dn(s) {
  const t = Fo(s[0]);
  if (t > s.length)
    throw new Error("invalid order key: " + s);
  return s.slice(0, t);
}
function Ir(s, t) {
  if (s === "A" + t[0].repeat(26))
    throw new Error("invalid order key: " + s);
  const e = dn(s);
  if (s.slice(e.length).slice(-1) === t[0])
    throw new Error("invalid order key: " + s);
}
function Tr(s, t) {
  Ko(s);
  const [e, ...n] = s.split("");
  let i = !0;
  for (let r = n.length - 1; i && r >= 0; r--) {
    const o = t.indexOf(n[r]) + 1;
    o === t.length ? n[r] = t[0] : (n[r] = t[o], i = !1);
  }
  if (i) {
    if (e === "Z")
      return "a" + t[0];
    if (e === "z")
      return null;
    const r = String.fromCharCode(e.charCodeAt(0) + 1);
    return r > "a" ? n.push(t[0]) : n.pop(), r + n.join("");
  } else
    return e + n.join("");
}
function Pl(s, t) {
  Ko(s);
  const [e, ...n] = s.split("");
  let i = !0;
  for (let r = n.length - 1; i && r >= 0; r--) {
    const o = t.indexOf(n[r]) - 1;
    o === -1 ? n[r] = t.slice(-1) : (n[r] = t[o], i = !1);
  }
  if (i) {
    if (e === "a")
      return "Z" + t.slice(-1);
    if (e === "A")
      return null;
    const r = String.fromCharCode(e.charCodeAt(0) - 1);
    return r < "Z" ? n.push(t.slice(-1)) : n.pop(), r + n.join("");
  } else
    return e + n.join("");
}
function Nt(s, t, e = Oo) {
  if (s != null && Ir(s, e), t != null && Ir(t, e), s != null && t != null && s >= t)
    throw new Error(s + " >= " + t);
  if (s == null) {
    if (t == null)
      return "a" + e[0];
    const h = dn(t), l = t.slice(h.length);
    if (h === "A" + e[0].repeat(26))
      return h + He("", l, e);
    if (h < t)
      return h;
    const d = Pl(h, e);
    if (d == null)
      throw new Error("cannot decrement any more");
    return d;
  }
  if (t == null) {
    const h = dn(s), l = s.slice(h.length), d = Tr(h, e);
    return d ?? h + He(l, null, e);
  }
  const n = dn(s), i = s.slice(n.length), r = dn(t), o = t.slice(r.length);
  if (n === r)
    return n + He(i, o, e);
  const a = Tr(n, e);
  if (a == null)
    throw new Error("cannot increment any more");
  return a < t ? a : n + He(i, null, e);
}
function we(s, t, e, n = Oo) {
  if (e === 0)
    return [];
  if (e === 1)
    return [Nt(s, t, n)];
  if (t == null) {
    let o = Nt(s, t, n);
    const a = [o];
    for (let h = 0; h < e - 1; h++)
      o = Nt(o, t, n), a.push(o);
    return a;
  }
  if (s == null) {
    let o = Nt(s, t, n);
    const a = [o];
    for (let h = 0; h < e - 1; h++)
      o = Nt(s, o, n), a.push(o);
    return a.reverse(), a;
  }
  const i = Math.floor(e / 2), r = Nt(s, t, n);
  return [
    ...we(s, r, i, n),
    r,
    ...we(r, t, e - i - 1, n)
  ];
}
const Pr = (s, t, e, n) => {
  const i = [t - n / 2, e - n / 2], r = [t + n / 2, e - n / 2], o = [t - n / 2, e + n / 2], a = [t + n / 2, e + n / 2];
  gs(s, i[0], i[1], a[0], a[1]), gs(s, r[0], r[1], o[0], o[1]);
}, gs = (s, t, e, n, i) => {
  s.beginPath(), s.moveTo(t, e), s.lineTo(n, i), s.closePath(), s.stroke();
}, Er = (s, t, e, n) => {
  s.translate(e, n), s.rotate(t), s.translate(-e, -n);
}, El = (s, t, e, n, i, r) => {
  s.beginPath(), s.moveTo(t + r, e), s.lineTo(t + n - r, e), s.arcTo(t + n, e, t + n, e + r, r), s.lineTo(t + n, e + i - r), s.arcTo(t + n, e + i, t + n - r, e + i, r), s.lineTo(t + r, e + i), s.arcTo(t, e + i, t, e + i - r, r), s.lineTo(t, e + r), s.arcTo(t, e, t + r, e, r), s.closePath();
}, Zt = (s, t) => {
  const e = s.getChildren();
  let n = 0;
  const i = new RegExp(`^${t}\\s+(\\d+)`);
  for (const r of e) {
    const o = r.attrs.objectName.match(i);
    if (o) {
      const a = parseInt(o[1]);
      a > n && (n = a);
    }
  }
  return `${t} ${n + 1}`;
}, kr = (s) => {
  s.sort(([e], [n]) => e - n);
  const t = [];
  for (const [e, n] of s) {
    const i = t.at(-1);
    i && i[1] >= e ? i[1] = Math.max(n, i[1]) : t.push([e, n]);
  }
  return t;
}, yn = (s, t, e) => {
  for (let n = t.length - 1; n >= 0; n--) {
    const i = t[n];
    if (!(e != null && e(i)) && pt(i) && !i.isGroup() && i.hitTest(s))
      return yn(s, i.getChildren(), e) || i;
  }
  return null;
}, Ar = (s) => ({
  ...s,
  midX: s.minX / 2 + s.maxX / 2,
  midY: s.minY / 2 + s.maxY / 2
}), kl = (s) => ({
  x: s.minX / 2 + s.maxX / 2,
  y: s.minY / 2 + s.maxY / 2
}), Dr = (s) => {
  const t = /* @__PURE__ */ new Map();
  for (const e of s) {
    const { x: n, y: i } = e;
    t.has(n) || t.set(n, []), t.get(n).push(i);
  }
  return t;
}, Rr = (s) => {
  const t = /* @__PURE__ */ new Map();
  for (const e of s) {
    const { x: n, y: i } = e;
    t.has(i) || t.set(i, []), t.get(i).push(n);
  }
  return t;
}, Al = (s) => {
  const t = _t(
    { x: 0, y: -1 },
    {
      x: s.width,
      y: s.height
    }
  ), { width: e, height: n } = s, i = t % Gt;
  if (i < Math.PI / 8 || i > Math.PI * 3 / 8)
    Math.abs(e) > Math.abs(n) ? s.height = 0 : s.width = 0;
  else {
    const r = Math.min(Math.abs(e), Math.abs(n)), o = Math.max(Math.abs(e), Math.abs(n)), a = r + (o - r) / 2;
    s.height = (Math.sign(n) || 1) * a, s.width = (Math.sign(e) || 1) * a;
  }
  return s;
}, ie = (s) => s.reduce((t, e) => {
  const n = /* @__PURE__ */ new Set();
  for (const i of e.getFrameParentIds()) {
    if (t.has(i))
      break;
    n.add(i);
  }
  return n.size === 0 ? t : (t.forEach((i) => {
    n.add(i);
  }), n);
}, /* @__PURE__ */ new Set()), Es = (s, t = !1) => {
  const e = /* @__PURE__ */ new Set();
  for (const n of s) {
    if (e.has(n))
      return e;
    t && e.add(n), pt(n) && Es(n.getChildren(), !0).forEach((r) => {
      e.add(r);
    });
  }
  return e;
}, xn = (s, t, e, n) => {
  for (const i of t) {
    const r = s.doc.getGraphicsById(i);
    r && pt(r) && r.isGroup() && !r.isEmpty() && r.updateSizeByChildren(e, n);
  }
}, Dl = (s) => {
  let t;
  const e = function(...n) {
    t === void 0 && (t = requestAnimationFrame(() => {
      t = void 0, s(n);
    }));
  };
  return e.cancel = () => {
    t !== void 0 && cancelAnimationFrame(t), t = void 0;
  }, e;
}, $o = (s) => {
  var t;
  return s && typeof s.getContext > "u" && typeof s.save == "function" && "canvas" in s ? s : s && typeof s.getOriginalContext == "function" && ((t = s.getOriginalContext) == null ? void 0 : t.call(s)) || null;
}, Cn = (s) => {
  const { originCtx: t, viewSize: e, draw: n } = s, i = $o(t);
  if (!i) {
    console.warn("drawLayer: impossível extrair CanvasRenderingContext2D, pulando layer drawing");
    return;
  }
  i.save();
  const r = document.createElement("canvas");
  r.width = e.width, r.height = e.height;
  const o = r.getContext("2d");
  return o.setTransform(i.getTransform()), n(o), i.resetTransform(), i.drawImage(r, 0, 0), i.restore(), r;
};
class X {
  constructor(t, e) {
    g(this, "type", G.Graph);
    g(this, "attrs");
    g(this, "doc");
    g(this, "_cacheBboxWithStroke", null);
    g(this, "_cacheBbox", null);
    g(this, "_cacheMinBbox", null);
    /** hide graphics temporarily, it's possible that attrs.visible is true */
    g(this, "noRender", !1);
    g(this, "_deleted", !1);
    g(this, "_sortDirty", !1);
    g(this, "noCollectUpdate");
    g(this, "updatedKeys", /* @__PURE__ */ new Set());
    g(this, "children", []);
    g(this, "isContainer", !1);
    var r, o;
    this.doc = e.doc;
    const n = t.transform ?? Ei(), i = e.advancedAttrs;
    i && !t.transform && (i.x !== void 0 && (n[4] = i.x), i.y !== void 0 && (n[5] = i.y)), this.attrs = { ...t }, (r = this.attrs).id ?? (r.id = pn()), this.attrs.transform = n, (o = this.attrs).strokeWidth ?? (o.strokeWidth = 1), this.attrs.objectName ? ur.setMaxIdx(t.objectName) : this.attrs.objectName = ur.gen(this.attrs.type ?? ""), this.noCollectUpdate = !!(e != null && e.noCollectUpdate);
  }
  getAttrs() {
    return A(this.attrs);
  }
  shouldUpdateBbox(t) {
    return t.x !== void 0 || t.y !== void 0 || t.width !== void 0 || t.height !== void 0 || t.transform !== void 0 || "strokeWidth" in t || "parentIndex" in t;
  }
  clearBboxCache() {
    this._cacheBbox = null, this._cacheBboxWithStroke = null, this._cacheMinBbox = null;
  }
  getUpdatedAttrs() {
    const t = To(this.attrs, [...this.updatedKeys]);
    return this.updatedKeys.clear(), t;
  }
  updateAttrs(t, e) {
    if (this.shouldUpdateBbox(t) && this.clearBboxCache(), "strokeWidth" in t && t.strokeWidth === void 0 && (t.strokeWidth = 1), !t.transform && (t.x !== void 0 || t.y !== void 0)) {
      const n = A(this.attrs.transform);
      t.x && (n[4] = t.x), t.y && (n[5] = t.y), this.attrs.transform = n, this.updatedKeys.add("transform");
    }
    t.rotate !== void 0 && this.setRotate(t.rotate), t = Nh(t, "x", "y", "rotate");
    for (const n in t)
      this.updatedKeys.add(n), this.attrs[n] = t[n];
    (!this.noCollectUpdate || this.attrs.parentIndex) && this.doc.collectUpdatedGraphics(this.attrs.id);
  }
  cancelCollectUpdate() {
    this.noCollectUpdate = !0;
  }
  /** render stroke width */
  getStrokeWidth() {
    var t;
    return (t = this.attrs.stroke) != null && t.length ? this.attrs.strokeWidth ?? 0 : 0;
  }
  getBboxWithStroke() {
    if (this._cacheBboxWithStroke)
      return this._cacheBboxWithStroke;
    const t = un(
      {
        ...this.getSize(),
        transform: this.getWorldTransform()
      },
      this.getStrokeWidth() / 2
    );
    return this._cacheBboxWithStroke = t, t;
  }
  getBbox() {
    return un({
      ...this.getSize(),
      transform: this.getWorldTransform()
    });
  }
  getLocalBbox() {
    if (this._cacheBbox)
      return this._cacheBbox;
    const t = un({
      ...this.getSize(),
      transform: this.attrs.transform
    });
    return this._cacheBbox = t, t;
  }
  getMinBbox() {
    return this.getBbox();
  }
  getWorldBboxVerts() {
    const t = {
      x: 0,
      y: 0,
      width: this.attrs.width,
      height: this.attrs.height
    };
    return ne(t, this.getWorldTransform());
  }
  getLocalPosition() {
    return { x: this.attrs.transform[4], y: this.attrs.transform[5] };
  }
  getWorldPosition() {
    const t = this.getWorldTransform();
    return { x: t[4], y: t[5] };
  }
  getX() {
    return this.attrs.transform[4];
  }
  getY() {
    return this.attrs.transform[5];
  }
  getSize() {
    return { width: this.attrs.width, height: this.attrs.height };
  }
  getOpacity() {
    return this.attrs.opacity ?? 1;
  }
  getRect() {
    return {
      ...this.getLocalPosition(),
      width: this.attrs.width,
      height: this.attrs.height
    };
  }
  getTransformedSize() {
    return Bo(this.attrs);
  }
  getLocalCenter() {
    return new R(...this.attrs.transform).apply({
      x: this.attrs.width / 2,
      y: this.attrs.height / 2
    });
  }
  getWorldCenter() {
    return new R(...this.getWorldTransform()).apply({
      x: this.attrs.width / 2,
      y: this.attrs.height / 2
    });
  }
  isStrokeShouldRender() {
    return Mr(this.attrs.stroke);
  }
  isFillShouldRender() {
    return Mr(this.attrs.fill);
  }
  hitTest(t, e = 0) {
    return ji(
      t,
      {
        ...this.getSize(),
        transform: this.getWorldTransform()
      },
      e + this.getStrokeWidth() / 2
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getHitGraphics(t, e) {
    const { tol: n = 0 } = e;
    return !this.isVisible() || this.isLock() || !this.isFillShouldRender() && !this.isStrokeShouldRender() ? null : this.hitTest(t, n) ? this : null;
  }
  hitTestChildren(t, e = 0) {
    if (!this.isContainer)
      return this.hitTest(t, e);
    if (!this.hitTest(t, e))
      return !1;
    const n = this.getChildren();
    for (let i = n.length - 1; i >= 0; i--)
      if (n[i].hitTest(t, e))
        return !0;
    return !1;
  }
  intersectWithChildrenBox(t) {
    if (!this.isContainer)
      return this.intersectWithBox(t);
    if (!this.intersectWithBox(t))
      return !1;
    const e = this.getChildren();
    for (const n of e)
      if (n.isVisible() && n.intersectWithBox(t))
        return !0;
    return !1;
  }
  strokeAABBIntersectWithBox(t) {
    return Ai(t, this.getBboxWithStroke());
  }
  /**
   * whether the element intersect with the box
   */
  intersectWithBox(t) {
    let e = !1;
    if (!Ai(t, this.getMinBbox()))
      e = !1;
    else {
      const n = this.getRotate();
      if (!n || n % Gt == 0)
        e = !0;
      else {
        const [i, r, o, a] = ne(
          jt(t),
          Rt(this.getWorldTransform())
        ), h = Math.min(i.x, r.x, o.x, a.x), l = Math.min(i.y, r.y, o.y, a.y), d = Math.max(i.x, r.x, o.x, a.x), u = Math.max(i.y, r.y, o.y, a.y), p = {
          x: h,
          y: l,
          width: d - h,
          height: u - l
        };
        e = il(p, {
          x: 0,
          y: 0,
          ...this.getSize()
        });
      }
    }
    return e;
  }
  /**
   * whether the element contain with the rect
   */
  containWithBox(t) {
    const e = this.getMinBbox();
    return wr(t, e) || wr(e, t);
  }
  /**
   * calculate new attributes by control handle
   */
  calcNewAttrsByControlHandle(t, e, n, i, r = !1, o = !1, a) {
    const h = this.getParentWorldTransform();
    n = {
      width: n.width,
      height: n.height,
      transform: i
    };
    const l = this.attrs.height === 0 ? Wo(t, e, n, {
      keepPolarSnap: r,
      scaleFromCenter: o
    }) : ds(t, e, n, {
      keepRatio: r,
      scaleFromCenter: o,
      flip: a
    });
    return l.transform = vt(Rt(h), l.transform), l;
  }
  /**
   * update attributes by control handle
   * @param type
   * @param newPos
   * @param oldRect
   * @param isShiftPressing
   * @param isAltPressing
   * @param flipWhenResize
   * @returns if width or height is zero, return true; otherwise return undefined
   */
  updateByControlHandle(t, e, n, i, r = !1, o = !1, a) {
    const h = this.calcNewAttrsByControlHandle(
      t,
      e,
      n,
      i,
      r,
      o,
      a
    );
    this.updateAttrs(h, { finishRecomputed: !0 });
  }
  shouldSkipDraw(t) {
    return !!(!this.isVisible() || this.getOpacity() * (t.opacity ?? 1) === 0 || t.viewportArea && !this.strokeAABBIntersectWithBox(t.viewportArea));
  }
  draw(t) {
    if (this.shouldSkipDraw(t)) return;
    const { ctx: e } = t;
    e.save(), e.transform(...this.attrs.transform);
    for (const n of this.children)
      n.draw(t);
    e.restore();
  }
  drawOutline(t, e, n) {
    const { width: i, height: r } = this.attrs;
    t.transform(...this.getWorldTransform()), t.strokeStyle = e, t.lineWidth = n, t.beginPath(), t.rect(0, 0, i, r), t.stroke(), t.closePath();
  }
  /**
   * fill image
   *
   * reference: https://mp.weixin.qq.com/s/TSpZv_0VJtxPTCCzEqDl8Q
   */
  fillImage(t, e, n, i = !0, r = 0) {
    const o = e.attrs.src, a = this.attrs.width, h = this.attrs.height, l = 0, d = 0;
    let u;
    if (t.imageSmoothingEnabled = i, o ? (n.addImg(o), u = n.getImg(o)) : (t.imageSmoothingEnabled = !1, u = Go), !u)
      return;
    const p = Yc(u.width, u.height, a, h), m = u.width / 2 - a / p / 2, x = u.height / 2 - h / p / 2;
    r && (t.save(), El(t, l, d, a, h, r), t.clip()), t.drawImage(
      u,
      m,
      x,
      a / p,
      h / p,
      l,
      d,
      a,
      h
    ), r && t.restore();
  }
  /**
   * Helper para extrair CanvasRenderingContext2D quando necessário
   */
  getCanvas2DContext(t) {
    return $o(t);
  }
  static dMove(t, e, n) {
    for (const i of t) {
      const r = i.getWorldTransform();
      r[4] += e, r[5] += n, i.setWorldTransform(r);
    }
  }
  toJSON() {
    return { ...this.attrs };
  }
  isVisible() {
    return this.attrs.visible ?? !0;
  }
  isLock() {
    return this.attrs.lock ?? !1;
  }
  isDeleted() {
    return this._deleted;
  }
  setDeleted(t) {
    this._deleted = t, this.doc.collectDeletedGraphics(this);
  }
  /**
   * get simple info (for layer panel)
   */
  toObject() {
    return {
      type: this.type,
      id: this.attrs.id,
      name: this.attrs.objectName,
      visible: this.isVisible(),
      lock: this.isLock(),
      children: this.children.map((t) => t.toObject())
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getControlHandles(t, e) {
    return [];
  }
  getRotate() {
    return We(this.getWorldTransform());
  }
  getRotateDegree() {
    return mn(Ro(this.getRotate()));
  }
  setRotate(t, e) {
    const n = this.getRotate(), i = t - n;
    e ?? (e = this.getWorldCenter());
    const r = new R().translate(-e.x, -e.y).rotate(i).translate(e.x, e.y);
    this.prependWorldTransform(r.getArray());
  }
  prependWorldTransform(t) {
    const e = this.getParentWorldTransform(), n = vt(
      t,
      vt(e, this.attrs.transform)
    );
    this.updateAttrs(
      es({
        ...this.getSize(),
        transform: vt(Rt(e), n)
      })
    );
  }
  dRotate(t, e, n) {
    const r = new R().translate(-n.x, -n.y).rotate(t).translate(n.x, n.y).append(new R(...e)).getArray();
    this.setWorldTransform(r);
  }
  getInfoPanelAttrs() {
    const t = this.getTransformedSize(), e = this.getWorldPosition();
    return [
      {
        label: "X",
        key: "x",
        value: e.x,
        uiType: "number"
      },
      {
        label: "Y",
        key: "y",
        value: e.y,
        uiType: "number"
      },
      {
        label: "W",
        key: "width",
        value: t.width,
        uiType: "number"
      },
      {
        label: "H",
        key: "height",
        value: t.height,
        uiType: "number"
      },
      {
        label: "R",
        key: "rotation",
        value: this.getRotateDegree(),
        suffixValue: "°",
        uiType: "number"
      }
    ];
  }
  toSVGSegment(t) {
    const e = this.getSVGTagHead(t);
    if (!e)
      return console.warn(
        `please implement getSVGTagHead method of "${this.type}" type`
      ), "";
    const n = [], { fillPaints: i, strokePaints: r } = this.getFillAndStrokesToSVG();
    if (i.length <= 1 && r.length <= 1) {
      const d = i[0];
      if (d) {
        const p = {};
        if (d.type === B.Solid) {
          p.fill = "#" + Zn(d.attrs);
          const m = d.attrs.a;
          m !== 1 && (p["fill-opacity"] = m);
        }
        n.push(p);
      }
      const u = r[0];
      if (u) {
        const p = {};
        if (u.type === B.Solid) {
          p.stroke = "#" + Zn(u.attrs);
          const m = u.attrs.a;
          m !== 1 && (p["stroke-opacity"] = m);
        }
        n.push(p);
      }
    } else {
      for (const d of i)
        if (d && d.type === B.Solid) {
          const u = {
            fill: "#" + Zn(d.attrs)
          }, p = d.attrs.a;
          p !== 1 && (u["fill-opacity"] = p), n.push(u);
        }
      for (const d of r)
        if (d && d.type === B.Solid) {
          const u = {
            stroke: "#" + Zn(d.attrs)
          }, p = d.attrs.a;
          p !== 1 && (u["stroke-opacity"] = p), n.push(u);
        }
    }
    const o = this.attrs.strokeWidth ?? 0, a = o > 1 ? ` stroke-width="${o}"` : "";
    let h = "";
    const l = this.getSVGTagTail();
    for (const d of n) {
      let u = "", p;
      for (p in d)
        u += ` ${p}="${d[p]}"`;
      h += e + u + a + l;
    }
    return h;
  }
  getSVGTagHead(t) {
    return "";
  }
  getSVGTagTail() {
    return `/>
`;
  }
  getFillAndStrokesToSVG() {
    return {
      fillPaints: this.attrs.fill ?? [],
      strokePaints: this.attrs.stroke ?? []
    };
  }
  getLayerIconPath() {
    return "M0.5 0.5H11.5V11.5H0.5V0.5Z";
  }
  getWorldTransform() {
    const t = this.getParent();
    return t ? vt(t.getWorldTransform(), this.attrs.transform) : [...this.attrs.transform];
  }
  getChildren() {
    return this.isContainer ? (this._sortDirty && this.sortChildren(), [...this.children]) : [];
  }
  getChildrenCount() {
    return this.children.length;
  }
  setChildren(t) {
    if (!this.isContainer)
      return;
    const e = we(null, null, t.length);
    for (let n = 0; n < t.length; n++)
      t[n].updateAttrs({
        parentIndex: {
          guid: this.attrs.id,
          position: e[n]
        }
      });
  }
  insertAtParent(t) {
    const e = this.getParent();
    e && e.insertChild(this, t);
  }
  insertChild(t, e) {
    if (!this.isContainer) {
      console.warn(`graphics "${this.type}" is not container`);
      return;
    }
    if (this.children.some((i) => i.attrs.id === t.attrs.id)) {
      e && this.sortChildren();
      return;
    }
    if (!e) {
      const i = this.getMaxChildIndex();
      e = Nt(i, null);
    }
    t.removeFromParent();
    const n = {
      guid: this.attrs.id,
      position: e
    };
    vn(t.attrs.parentIndex, n) || t.updateAttrs({
      parentIndex: n
    }), this.children.push(t), e && this.sortChildren();
  }
  removeChild(t) {
    this.children = this.children.filter(
      (e) => e.attrs.id !== t.attrs.id
    );
  }
  markSortDirty() {
    this._sortDirty = !0;
  }
  sortChildren() {
    X.sortGraphicsArray(this.children);
  }
  static sortGraphicsArray(t) {
    return t.sort((e, n) => {
      var i, r;
      return (((i = e.attrs.parentIndex) == null ? void 0 : i.position) ?? "") < (((r = n.attrs.parentIndex) == null ? void 0 : r.position) ?? "") ? -1 : 1;
    }), t;
  }
  getParentId() {
    var t;
    return (t = this.attrs.parentIndex) == null ? void 0 : t.guid;
  }
  getParent() {
    const t = this.getParentId();
    if (t)
      return this.doc.getGraphicsById(t);
  }
  getParentWorldTransform() {
    const t = this.getParent();
    return t ? t.getWorldTransform() : Ei();
  }
  removeFromParent() {
    const t = this.getParent();
    t && t.removeChild(this);
  }
  getMaxChildIndex() {
    if (this.children.length === 0)
      return null;
    if (!this._sortDirty)
      return this.children.at(-1).getSortIndex() ?? null;
    let t = this.children[0].getSortIndex();
    for (let e = 1; e < this.children.length; e++) {
      const n = this.children[e].getSortIndex();
      n > t && (t = n);
    }
    return t;
  }
  getMinChildIndex() {
    if (this.children.length === 0)
      return null;
    if (!this._sortDirty)
      return this.children.at(0).getSortIndex() ?? null;
    let t = this.children[0].getSortIndex();
    for (let e = 1; e < this.children.length; e++) {
      const n = this.children[e].getSortIndex();
      n < t && (t = n);
    }
    return t;
  }
  getSortIndex() {
    var t;
    return ((t = this.attrs.parentIndex) == null ? void 0 : t.position) ?? "";
  }
  getNextSibling() {
    const t = this.getParent();
    if (!t)
      return null;
    const e = t.getChildren(), n = e.findIndex((i) => i === this);
    return n == -1 && console.warn("index should not be -1!"), e[n + 1] ?? null;
  }
  getSortIndexPath() {
    const t = [];
    let e = this;
    for (; e; )
      t.push(e.getSortIndex()), e = e.getParent();
    return t.reverse(), t;
  }
  static sortGraphics(t) {
    const e = t.map((n) => ({
      path: n.getSortIndexPath(),
      val: n
    }));
    return e.sort((n, i) => {
      const r = Math.max(n.path.length, i.path.length);
      for (let o = 0; o < r; o++) {
        const a = n.path[o], h = i.path[o];
        if (a !== h)
          return a < h ? -1 : 1;
      }
      return n.path.length < i.path.length ? -1 : 1;
    }), e.map((n) => n.val);
  }
  containAncestor(t) {
    let e = this;
    for (; e; ) {
      if (e.attrs.id === t)
        return !0;
      e = e.getParent();
    }
    return !1;
  }
  forEachParent(t) {
    let e = !1;
    const n = () => {
      e = !0;
    };
    let i = this.getParent();
    for (; i && (t(i, n), !e); )
      i = i.getParent();
  }
  getParentIds() {
    const t = [];
    return this.forEachParent((e) => {
      t.push(e.attrs.id);
    }), t;
  }
  getFrameParentIds() {
    const t = [];
    return this.forEachParent((e, n) => {
      if (e.type === G.Canvas) {
        n();
        return;
      }
      t.push(e.attrs.id);
    }), t;
  }
  setWorldTransform(t) {
    const e = this.getParentWorldTransform(), n = vt(Rt(e), t);
    this.updateAttrs({
      transform: n
    });
  }
  forEachVisibleChildNode(t) {
    if (this.isVisible()) {
      for (const e of this.children)
        e.forEachVisibleChildNode(t);
      t(this);
    }
  }
}
class bn extends X {
  constructor(e, n) {
    super({ ...e, type: G.Ellipse }, n);
    g(this, "type", G.Ellipse);
  }
  hitTest(e, n = 0) {
    const i = this.attrs, r = i.width / 2, o = i.height / 2, a = this.getStrokeWidth();
    n = n + a / 2;
    const h = i.width / 2 + n, l = i.height / 2 + n, u = new R(...this.getWorldTransform()).applyInverse(e);
    return (u.x - r) ** 2 / h ** 2 + (u.y - o) ** 2 / l ** 2 <= 1;
  }
  draw(e) {
    if (this.shouldSkipDraw(e)) return;
    const n = this.getOpacity() * (e.opacity ?? 1), { ctx: i, imgManager: r, smooth: o } = e, a = this.attrs, h = a.width / 2, l = a.height / 2;
    i.save(), i.transform(...a.transform), n < 1 && (i.globalAlpha = n);
    const d = (u) => {
      u.beginPath(), u.ellipse(
        h,
        l,
        a.width / 2,
        a.height / 2,
        0,
        0,
        br
      );
      for (const p of a.fill ?? [])
        p.visible !== !1 && (p.type === B.Solid ? (u.fillStyle = ft(p.attrs), u.fill()) : p.type === B.Image && (r ? (u.clip(), this.fillImage(u, p, r, o)) : console.warn("ImgManager is not provided")));
      if (a.strokeWidth) {
        u.lineWidth = a.strokeWidth;
        for (const p of a.stroke ?? [])
          p.visible !== !1 && (p.type === B.Solid ? (u.strokeStyle = ft(p.attrs), u.stroke()) : (p.type, B.Image));
      }
      u.closePath();
    };
    if (n !== 1)
      Cn({
        originCtx: i,
        viewSize: this.doc.getDeviceViewSize(),
        draw: d
      });
    else {
      const u = this.getCanvas2DContext(i);
      u ? d(u) : console.warn("Ellipse drawing requer CanvasRenderingContext2D - operação não suportada");
    }
    i.restore();
  }
  drawOutline(e, n, i) {
    const { width: r, height: o } = this.attrs, a = r / 2, h = o / 2;
    e.transform(...this.getWorldTransform()), e.strokeStyle = n, e.lineWidth = i, e.beginPath(), e.ellipse(a, h, r / 2, o / 2, 0, 0, br), e.stroke(), e.closePath();
  }
  getSVGTagHead(e) {
    const n = [...this.attrs.transform];
    e && (n[4] += e.x, n[5] += e.y);
    const i = this.attrs.width / 2, r = this.attrs.height / 2;
    return this.attrs.width === this.attrs.height ? `<circle cx="${i}" cy="${r}" r="${i}" transform="matrix(${n.join(
      " "
    )})"` : `<ellipse cx="${i}" cy="${r}" rx="${i}" ry="${r}" transform="matrix(${n.join(
      " "
    )})"`;
  }
  getLayerIconPath() {
    const o = this.getBbox(), a = o.maxX - o.minX, h = o.maxY - o.minY, l = 11 / Math.max(a, h), d = new R().prepend(new R(...this.getWorldTransform())).translate(-o.minX - a / 2, -o.minY - h / 2).scale(l, l).translate(12 / 2, 12 / 2), u = this.attrs, p = hl({
      x: 0,
      y: 0,
      width: u.width,
      height: u.height
    });
    return p.forEach((m) => {
      m.points.forEach((x, y) => {
        m.points[y] = d.apply(x);
      });
    }), ve(p, 5);
  }
}
class Mn extends X {
  constructor(e, n) {
    super({ ...e, type: G.Frame }, n);
    g(this, "type", G.Frame);
    g(this, "isContainer", !0);
  }
  // children 中有图形 size 进行了更新，frame 需要重新 size
  updateSizeByChildren(e, n) {
    const i = jt(
      Ut(
        this.children.filter((l) => l.isVisible()).map((l) => l.getLocalBbox())
      )
    );
    if (i.x === 0 && i.y === 0 && i.width === this.attrs.width && i.height === this.attrs.height)
      return;
    for (const l of this.children) {
      const d = l.attrs.id;
      e.set(
        d,
        Object.assign(
          {
            transform: [...l.attrs.transform]
          },
          e.get(d) ?? {}
        )
      );
      const u = new R(...l.attrs.transform).translate(
        -i.x,
        -i.y
      );
      l.updateAttrs({
        transform: u.getArray()
      });
      const p = Object.assign(n.get(d) ?? {}, {
        transform: [...l.attrs.transform]
      });
      n.set(d, p);
    }
    const r = new R().translate(i.x, i.y), o = new R(...this.attrs.transform).append(r), a = this.attrs.id;
    e.has(a) || e.set(a, {
      width: this.attrs.width,
      height: this.attrs.height,
      transform: [...this.attrs.transform]
    });
    const h = {
      width: i.width,
      height: i.height,
      transform: o.getArray()
    };
    this.updateAttrs(h), n.set(a, h);
  }
  isEmpty() {
    return this.children.length === 0;
  }
  isFillShouldRender() {
    return !0;
  }
  _realDraw(e, n) {
    const i = this.attrs, { fill: r, strokeWidth: o, stroke: a, transform: h } = n || this.attrs, { ctx: l, imgManager: d, smooth: u } = e;
    l.save(), l.transform(...h);
    const p = e.opacity ?? 1;
    p < 1 && (l.globalAlpha = p), l.beginPath(), l.rect(0, 0, i.width, i.height);
    for (const m of r ?? [])
      if (m.visible !== !1)
        switch (m.type) {
          case B.Solid: {
            l.fillStyle = ft(m.attrs), l.fill();
            break;
          }
          case B.Image:
            if (d) {
              const x = this.getCanvas2DContext(l);
              x ? this.fillImage(x, m, d, u) : console.warn("fillImage requer CanvasRenderingContext2D - operação não suportada");
            } else
              console.warn("ImgManager is not provided");
        }
    if (o) {
      l.lineWidth = o;
      for (const m of a ?? [])
        if (m.visible !== !1)
          switch (m.type) {
            case B.Solid: {
              l.strokeStyle = ft(m.attrs), l.stroke();
              break;
            }
            case B.Image:
          }
    }
    l.closePath(), l.restore();
  }
  isGroup() {
    return this.attrs.resizeToFit;
  }
  drawText(e, n, i) {
    if (!this.isVisible()) return;
    const r = this.getRotate(), o = new R().translate(-n, -i).rotate(r).translate(n, i);
    e.save(), e.fillStyle = "#acacac", e.font = "11px sans-serif", e.transform(...o.getArray()), e.fillText(this.attrs.objectName, n, i), e.restore();
  }
  draw(e) {
    if (this.shouldSkipDraw(e)) return;
    const n = this.getOpacity() * (e.opacity ?? 1);
    e = {
      ...e,
      opacity: n
    }, this.isGroup() || this._realDraw(e);
    const { ctx: i } = e;
    this.isGroup() || (i.save(), i.clip()), super.draw(e), this.isGroup() || i.restore();
  }
  hitTest(e, n = 0) {
    const r = new R(...this.getWorldTransform()).applyInverse(e);
    return Ho(
      {
        minX: 0,
        minY: 0,
        maxX: this.attrs.width,
        maxY: this.attrs.height
      },
      r,
      n + (this.attrs.strokeWidth ?? 0) / 2
    );
  }
  getHitGraphics(e, n) {
    if (!this.isVisible() || this.isLock()) return null;
    const { parentIdSet: i } = n, r = this.getChildren();
    if (this.isGroup()) {
      for (let o = r.length - 1; o >= 0; o--) {
        const h = r[o].getHitGraphics(e, n);
        if (h) {
          const l = h.getParent();
          return l && !i.has(l.attrs.id) ? l : h;
        }
      }
      if (this.isHitTitle(e, n))
        return this;
    } else {
      if (r.length === 0)
        return super.getHitGraphics(e, n);
      for (let o = r.length - 1; o >= 0; o--) {
        const h = r[o].getHitGraphics(e, n);
        if (h)
          return h;
      }
      if (this.isHitTitle(e, n))
        return this;
    }
    return null;
  }
  isHitTitle(e, n) {
    const r = 12 / n.zoom, o = 80 / n.zoom, a = new R(...this.getWorldTransform()).append(
      new R().translate(0, -r)
    ), h = {
      width: o,
      height: r,
      transform: a.getArray()
    };
    return ji(e, h, n.tol);
  }
  getLayerIconPath() {
    return this.isGroup() ? "M7 1H5V2H7V1ZM9.5 10H10V9.5H11V11H9.5V10ZM2 5V7H1V5H2ZM10 2.5V2H9.5V1H11V2.5H10ZM10 5V7H11V5H10ZM2 2.5V2H2.5V1H1V2.5H2ZM1 9.5H2V10H2.5V11H1V9.5ZM7 10H5V11H7V10Z" : "M4 0.5V3H8V0.5H9V3H11.5V4H9V8H11.5V9H9V11.5H8V9H4V11.5H3V9H0.5V8H3V4H0.5V3H3V0.5H4ZM8 8V4H4V8H8Z";
  }
}
const pt = (s) => s instanceof Mn;
class Ui extends X {
  constructor(e, n) {
    super({ ...e, height: 0, type: G.Line }, n);
    g(this, "type", G.Line);
  }
  draw(e) {
    if (this.shouldSkipDraw(e)) return;
    const n = this.getOpacity() * (e.opacity ?? 1), { ctx: i } = e, { width: r, transform: o, stroke: a, strokeWidth: h } = this.attrs;
    if (i.save(), i.transform(...o), n < 1 && (i.globalAlpha = n), i.beginPath(), i.moveTo(0, 0), i.lineTo(r, 0), h) {
      i.lineWidth = h;
      for (const l of a ?? [])
        switch (l.type) {
          case B.Solid: {
            i.strokeStyle = ft(l.attrs), i.stroke();
            break;
          }
          case B.Image:
        }
      i.closePath(), i.restore();
    }
  }
  drawOutline(e, n, i) {
    e.transform(...this.getWorldTransform()), e.beginPath(), e.moveTo(0, 0), e.lineTo(this.attrs.width, 0), e.lineWidth = i, e.strokeStyle = n, e.stroke(), e.closePath();
  }
  getSVGTagHead(e) {
    const n = [...this.attrs.transform];
    e && (n[4] += e.x, n[5] += e.y);
    const i = this.getTransformedSize();
    return `<line x1="0" y1="0" x2="${i.width}" y2="${i.height}" transform="matrix(${n.join(" ")})"`;
  }
  getFillAndStrokesToSVG() {
    return {
      fillPaints: [],
      strokePaints: this.attrs.stroke ?? []
    };
  }
  getLayerIconPath() {
    const o = this.getWorldTransform();
    let a = [
      pe(o, { x: 0, y: 0 }),
      pe(o, { x: this.attrs.width, y: 0 })
    ];
    const h = Sn(a), l = h.maxX - h.minX, d = h.maxY - h.minY, u = 11 / Math.max(l, d), p = new R().translate(-h.minX - l / 2, -h.minY - d / 2).scale(u, u).translate(11 / 2, 11 / 2);
    return a = a.map((m) => p.apply(m)), `M${a[0].x.toFixed(5)} ${a[0].y.toFixed(
      5
    )} L${a[1].x.toFixed(5)} ${a[1].y.toFixed(5)}`;
  }
}
class gt extends X {
  constructor(e, n) {
    super({ ...e, type: G.Path }, n);
    g(this, "type", G.Path);
    g(this, "geoPath", null);
  }
  static computeRect(e) {
    return new ls(e).getBRect();
  }
  static recomputeAttrs(e, n) {
    const i = gt.computeRect(e);
    for (const o of e)
      for (const a of o.segs)
        a.point = {
          x: a.point.x - i.x,
          y: a.point.y - i.y
        };
    const r = new R(...n).apply(i);
    return {
      x: r.x,
      y: r.y,
      width: i.width,
      height: i.height,
      pathData: e
    };
  }
  checkAndFixUpdatedAttrs(e) {
    ("width" in e || "height" in e) && "pathData" in e && (delete e.width, delete e.height, console.warn(
      "width or height and pathData cannot coexist when updating attribute, removed width and height"
    ));
  }
  clearBboxCache() {
    super.clearBboxCache(), this.geoPath = null;
  }
  getGeoPath() {
    return this.geoPath || (this.geoPath = new ls(this.attrs.pathData)), this.geoPath;
  }
  /**
   * update attributes
   * TODO: optimize
   */
  updateAttrs(e, n) {
    if (n != null && n.finishRecomputed) {
      super.updateAttrs(e);
      return;
    }
    e = A(e), this.checkAndFixUpdatedAttrs(e);
    const i = Object.keys(e);
    if (e.pathData) {
      const r = e.transform ?? this.attrs.transform;
      this.attrs.pathData = e.pathData, e = {
        ...e,
        ...gt.recomputeAttrs(e.pathData, r)
      };
    }
    if (i.includes("width") || i.includes("height")) {
      const r = this.recomputedPathData(
        e.width ?? this.attrs.width,
        e.height ?? this.attrs.height
      );
      this.attrs.pathData = r;
    }
    super.updateAttrs(e);
  }
  calcNewAttrsByControlHandle(e, n, i, r, o, a, h) {
    const l = this.getParentWorldTransform();
    i = {
      width: i.width,
      height: i.height,
      transform: r
    };
    const d = this.attrs.height === 0 ? Wo(e, n, i, {
      keepPolarSnap: o,
      scaleFromCenter: a
    }) : ds(e, n, i, {
      keepRatio: o,
      scaleFromCenter: a,
      flip: h
    });
    d.transform = vt(Rt(l), d.transform);
    const u = d, p = this.recomputedPathData(d.width, d.height);
    return { ...u, pathData: p };
  }
  recomputedPathData(e, n) {
    const i = e / (this.attrs.width || 1), r = n / (this.attrs.height || 1), o = A(this.attrs.pathData);
    for (const a of o)
      for (const h of a.segs)
        h.point.x *= i, h.point.y *= r, h.in.x *= i, h.in.y *= r, h.out.x *= i, h.out.y *= r;
    return o;
  }
  draw(e) {
    if (this.shouldSkipDraw(e)) return;
    const n = this.getOpacity() * (e.opacity ?? 1);
    this._realDraw({ ...e, opacity: n });
  }
  drawOutline(e, n, i) {
    this._realDraw(
      { ctx: e },
      {
        stroke: [
          {
            type: B.Solid,
            attrs: it(n)
          }
        ],
        strokeWidth: i,
        transform: this.getWorldTransform()
      }
    );
  }
  _realDraw(e, n) {
    const { pathData: i } = this.attrs, r = (n == null ? void 0 : n.transform) ?? this.attrs.transform, { fill: o, strokeWidth: a, stroke: h } = n || this.attrs, { ctx: l, imgManager: d, smooth: u } = e;
    l.save(), l.transform(...r);
    const p = e.opacity ?? 1;
    p < 1 && (l.globalAlpha = p);
    const m = (x) => {
      x.beginPath();
      for (const y of i) {
        const S = y.segs[0];
        if (!S) continue;
        x.moveTo(S.point.x, S.point.y);
        const w = y.segs;
        for (let b = 1; b <= w.length; b++) {
          if (b === w.length && !y.closed)
            continue;
          const C = w[b % w.length], I = w[b - 1], M = C.point.x, E = C.point.y, T = gt.getHandleOut(I), k = gt.getHandleIn(C);
          !T && !k ? x.lineTo(M, E) : x.bezierCurveTo(
            T.x,
            T.y,
            k.x,
            k.y,
            M,
            E
          );
        }
        y.closed && x.closePath();
      }
      for (const y of o ?? [])
        if (y.visible !== !1)
          switch (y.type) {
            case B.Solid: {
              x.fillStyle = ft(y.attrs), x.fill();
              break;
            }
            case B.Image:
              d ? (x.clip(), this.fillImage(x, y, d, u)) : console.warn("ImgManager is not provided");
          }
      if (a) {
        x.lineWidth = a;
        for (const y of h ?? [])
          if (y.visible !== !1)
            switch (y.type) {
              case B.Solid: {
                x.strokeStyle = ft(y.attrs), x.stroke();
                break;
              }
              case B.Image:
            }
      }
      x.closePath();
    };
    if (p !== 1)
      Cn({
        originCtx: l,
        viewSize: this.doc.getDeviceViewSize(),
        draw: m
      });
    else {
      const x = this.getCanvas2DContext(l);
      x ? m(x) : console.warn("Path drawing requer CanvasRenderingContext2D - operação não suportada");
    }
    l.restore();
  }
  hitTest(e, n = 0) {
    var a;
    if (!super.hitTest(e, n))
      return !1;
    if ((a = this.attrs.fill) != null && a.length)
      return !0;
    const r = new R(...this.getWorldTransform()).applyInverse(e);
    return this.getGeoPath().hitTest(r, n + this.getStrokeWidth() / 2);
  }
  toJSON() {
    return {
      ...super.toJSON(),
      pathData: this.attrs.pathData
    };
  }
  static getHandleIn(e) {
    return zt(e.point, e.in);
  }
  static getHandleOut(e) {
    return zt(e.point, e.out);
  }
  static getSeg(e, n, i) {
    const r = e[n];
    return r ? r.segs[i] ?? null : null;
  }
  getLastSeg(e, n) {
    const i = this.getSegCount(e) - 1;
    return this.getSeg(e, i, n);
  }
  getSeg(e, n, i) {
    let r = gt.getSeg(this.attrs.pathData, e, n);
    if (r = A(r), r && (i != null && i.applyTransform)) {
      const o = new R(...this.getWorldTransform()), a = o.apply(r.point);
      r.point.x = a.x, r.point.y = a.y, o.tx = 0, o.ty = 0;
      const h = o.apply(r.in);
      r.in.x = h.x, r.in.y = h.y;
      const l = o.apply(r.out);
      r.out.x = l.x, r.out.y = l.y;
    }
    return r;
  }
  getClosestAnchor(e) {
    const n = new R(...this.getWorldTransform()), i = n.applyInverse(e.point), r = this.attrs.pathData;
    let o = 1 / 0, a = null, h = -1, l = -1;
    for (let d = 0; d < r.length; d++) {
      const u = r[d];
      for (let p = u.segs.length - 1; p >= 0; p--) {
        const m = u.segs[p], x = q(m.point, i);
        x < e.tol && (o = x, a = m.point, h = p, l = d);
      }
    }
    return a ? {
      pathItemIndex: l,
      segIndex: h,
      dist: o,
      point: n.apply(a)
    } : null;
  }
  project(e, n = 1 / 0) {
    const i = this.getGeoPath(), r = new R(...this.getWorldTransform());
    e = r.applyInverse(e);
    const o = i.project(e, n);
    return o ? {
      dist: o.dist,
      point: r.apply(o.point),
      pathItemIndex: o.index[0],
      segIndex: o.index[1],
      t: o.t
    } : null;
  }
  setSeg(e, n, i) {
    const r = this.attrs.pathData, o = { ...r[e] }, a = this.getSeg(e, n);
    if (!a)
      throw new Error(`can not find pathIdx ${e} segIdx ${n}`);
    i = A(i);
    const h = this.getWorldTransform();
    if (i.point) {
      const d = new R(...h).invert().apply(i.point);
      i.point.x = d.x, i.point.y = d.y;
    }
    if (i.in || i.out) {
      const l = new R(
        h[0],
        h[1],
        h[2],
        h[3],
        0,
        0
      ).invert();
      if (i.in) {
        const d = l.apply(i.in);
        i.in.x = d.x, i.in.y = d.y;
      }
      if (i.out) {
        const d = l.apply(i.out);
        i.out.x = d.x, i.out.y = d.y;
      }
    }
    o.segs[n] = {
      ...a,
      ...i
    }, this.updateAttrs({ pathData: r });
  }
  addSeg(e, n) {
    const i = this.attrs.pathData, r = i[e];
    if (!r)
      throw new Error(`pathIdx ${e} is out of range`);
    const a = new R(...this.getWorldTransform()).invert().apply(n.point);
    r.segs.push({
      point: a,
      in: n.in,
      out: n.out
    }), this.updateAttrs({ pathData: i });
  }
  addEmptyPath() {
    const e = this.attrs.pathData;
    e.push({
      segs: [],
      closed: !1
    }), this.updateAttrs({ pathData: e });
  }
  setPathItemClosed(e, n) {
    const i = this.attrs.pathData, r = i[e];
    if (!r)
      throw new Error(`pathIdx ${e} is out of range`);
    r.closed = n, this.updateAttrs({ pathData: i });
  }
  checkPathItemClosed(e) {
    const i = this.attrs.pathData[e];
    if (!i)
      throw new Error(`pathIdx ${e} is out of range`);
    return i.closed;
  }
  getPathItemCount() {
    return this.attrs.pathData.length;
  }
  hasPath(e) {
    return !!this.attrs.pathData[e];
  }
  getSegCount(e) {
    const n = this.attrs.pathData[e];
    return n ? n.segs.length : 0;
  }
  deleteSegAndHeal(e, n) {
    const i = A(this.attrs.pathData), r = i[e];
    if (!r)
      throw new Error(`can not find pathIdx ${e}`);
    ul(r, n), this.updateAttrs({ pathData: i });
  }
  insertSeg(e, n, i) {
    const r = A(this.attrs.pathData), o = r[e];
    if (!o)
      throw new Error(`can not find pathIdx ${e}`);
    gl(o, n, i), this.updateAttrs({ pathData: r });
  }
  getSVGTagHead(e) {
    const n = [...this.attrs.transform];
    e && (n[4] += e.x, n[5] += e.y);
    let i = "";
    for (const r of this.attrs.pathData) {
      const o = r.segs[0];
      if (!o) continue;
      i += `M${o.point.x} ${o.point.y}`;
      const a = r.segs;
      for (let h = 1; h <= a.length; h++) {
        if (h === a.length && !r.closed)
          continue;
        const l = a[h % a.length], d = a[h - 1], u = l.point.x, p = l.point.y, m = gt.getHandleOut(d), x = gt.getHandleIn(l);
        !m && !x ? i += `L${u} ${p}` : i += `C${m.x} ${m.y} ${x.x} ${x.y} ${u} ${p}`;
      }
      r.closed && (i += "Z");
    }
    return `<path d="${i}" transform="matrix(${n.join(" ")})"`;
  }
  getLayerIconPath() {
    const o = this.getBbox(), a = o.maxX - o.minX, h = o.maxY - o.minY, l = 11 / Math.max(a, h), d = new R().prepend(new R(...this.getWorldTransform())).translate(-o.minX - a / 2, -o.minY - h / 2).scale(l, l).translate(12 / 2, 12 / 2), p = this.getGeoPath().toCommands();
    return p.forEach((m) => {
      m.points.forEach((x, y) => {
        m.points[y] = d.apply(x);
      });
    }), ve(p, 5);
  }
}
class st {
  constructor(t) {
    g(this, "cx");
    g(this, "cy");
    g(this, "rotation");
    g(this, "transform");
    g(this, "type");
    g(this, "graphics");
    g(this, "padding");
    /** rotation will follow rotated bbox */
    g(this, "isTransformHandle");
    g(this, "hitTest");
    g(this, "getCursor");
    this.cx = t.cx ?? 0, this.cy = t.cy ?? 0, t.rotation !== void 0 && (this.rotation = t.rotation), t.transform && (this.transform = t.transform), this.type = t.type, this.padding = t.padding ?? 0, this.graphics = t.graphics, this.getCursor = t.getCursor, t.hitTest && (this.hitTest = t.hitTest), this.isTransformHandle = t.isTransformHandle ?? !1, this.graphics.cancelCollectUpdate();
  }
}
const te = (s, t) => {
  if (!t)
    return "default";
  if (t.height === 0)
    return "move";
  if (s === "n" || s === "s") {
    const o = new R().rotate(Gt).prepend(new R(...t.transform)).rotate(Gt), a = We([
      o.a,
      o.b,
      o.c,
      o.d,
      o.tx,
      o.ty
    ]);
    return { type: "resize", degree: mn(a) };
  }
  const e = We(t.transform), n = _o(t.transform);
  let i = 0;
  switch (s) {
    case "se":
    case "nw":
      i = -45;
      break;
    case "ne":
    case "sw":
      i = 45;
      break;
    case "e":
    case "w":
      i = 90;
      break;
    default:
      console.warn("unknown type", s);
  }
  return { type: "resize", degree: mn(e) + (n ? -i : i) };
}, gn = (s, t) => {
  if (!t)
    return "default";
  const e = We(t.transform), n = _o(t.transform);
  let i = 0;
  return t.height === 0 ? i = {
    neRotation: 90,
    seRotation: 90,
    swRotation: 270,
    nwRotation: 270
  }[s] : i = {
    neRotation: 45,
    seRotation: 135,
    swRotation: 225,
    nwRotation: 315
  }[s], { type: "rotation", degree: Ti(
    mn(e) + (n ? -i : i)
  ) };
}, Rl = (s, t) => {
  const e = () => ({
    width: s.size,
    height: s.size,
    fill: [
      {
        type: B.Solid,
        attrs: it(s.fill)
      }
    ],
    stroke: [
      {
        type: B.Solid,
        attrs: it(s.stroke)
      }
    ],
    strokeWidth: 1
  }), n = {
    doc: t,
    noCollectChange: !0
  }, i = new st({
    graphics: new dt(
      {
        objectName: "nw",
        ...e()
      },
      n
    ),
    type: "nw",
    padding: 3,
    getCursor: te,
    isTransformHandle: !0
  }), r = new st({
    graphics: new dt(
      {
        objectName: "ne",
        ...e()
      },
      n
    ),
    type: "ne",
    padding: 3,
    getCursor: te,
    isTransformHandle: !0
  }), o = new st({
    graphics: new dt(
      {
        objectName: "se",
        ...e()
      },
      n
    ),
    type: "se",
    padding: 3,
    getCursor: te,
    isTransformHandle: !0
  }), a = new st({
    graphics: new dt(
      {
        objectName: "sw",
        ...e()
      },
      n
    ),
    type: "sw",
    padding: 3,
    getCursor: te,
    isTransformHandle: !0
  }), h = s.size * 2.5, l = new st({
    graphics: new dt(
      {
        objectName: "nwRotation",
        ...e(),
        width: h,
        height: h,
        visible: !1
      },
      n
    ),
    type: "nwRotation",
    getCursor: gn,
    isTransformHandle: !0
  }), d = new st({
    graphics: new dt(
      {
        objectName: "neRotation",
        ...e(),
        width: h,
        height: h,
        visible: !1
      },
      n
    ),
    type: "neRotation",
    getCursor: gn,
    isTransformHandle: !0
  }), u = new st({
    graphics: new dt(
      {
        objectName: "seRotation",
        ...e(),
        width: h,
        height: h,
        visible: !1
      },
      n
    ),
    type: "seRotation",
    getCursor: gn,
    isTransformHandle: !0
  }), p = new st({
    graphics: new dt(
      {
        objectName: "swRotation",
        ...e(),
        width: h,
        height: h,
        visible: !1
      },
      n
    ),
    type: "swRotation",
    getCursor: gn,
    isTransformHandle: !0
  }), m = function(b, C, I) {
    return !I || I.width === 0 || I.height === 0 ? !1 : this.graphics.hitTest(b, C);
  }, x = new st({
    graphics: new dt(
      {
        objectName: "n",
        ...e(),
        visible: !1
      },
      n
    ),
    type: "n",
    hitTest: m,
    getCursor: te,
    isTransformHandle: !0
  }), y = new st({
    graphics: new dt(
      {
        objectName: "e",
        ...e(),
        visible: !1
      },
      n
    ),
    type: "e",
    hitTest: m,
    getCursor: te,
    isTransformHandle: !0
  }), S = new st({
    graphics: new dt(
      {
        objectName: "s",
        ...e(),
        visible: !1
      },
      n
    ),
    type: "s",
    hitTest: m,
    getCursor: te,
    isTransformHandle: !0
  }), w = new st({
    graphics: new dt(
      {
        objectName: "w",
        ...e(),
        visible: !1
      },
      n
    ),
    type: "w",
    hitTest: m,
    getCursor: te,
    isTransformHandle: !0
  });
  return /* @__PURE__ */ new Map([
    ["n", x],
    ["e", y],
    ["s", S],
    ["w", w],
    ["nwRotation", l],
    ["neRotation", d],
    ["seRotation", u],
    ["swRotation", p],
    ["nw", i],
    ["ne", r],
    ["se", o],
    ["sw", a]
  ]);
}, No = [
  "n",
  "e",
  "s",
  "w",
  "nwRotation",
  "neRotation",
  "seRotation",
  "swRotation",
  "nw",
  "ne",
  "se",
  "sw"
];
class _l {
  constructor(t) {
    g(this, "transformHandles");
    g(this, "customHandlesVisible", !1);
    g(this, "customHandles", []);
    g(this, "selectedBoxRect", null);
    g(this, "enableTransformControl", !0);
    g(this, "onHoverItemChange", () => {
      if (!this.editor.pathEditor.isActive()) {
        const t = this.editor.selectedElements.getHoverItem(), e = this.editor.selectedElements.size() === 1, n = e ? this.editor.selectedElements.getItems()[0] : null, i = this.editor.selectedBox.isHover();
        if (e && n && (t === n || i)) {
          const r = this.editor.zoomManager.getZoom();
          this.setCustomHandles(n.getControlHandles(r, !0));
        } else
          this.setCustomHandles([]);
      }
      this.editor.render();
    });
    this.editor = t;
    const e = t.setting;
    this.transformHandles = Rl(
      {
        size: e.get("handleSize"),
        fill: e.get("handleFill"),
        stroke: e.get("handleStroke"),
        strokeWidth: e.get("handleStrokeWidth")
      },
      t.doc
    );
  }
  bindEvents() {
    this.editor.selectedElements.on("hoverItemChange", this.onHoverItemChange), this.editor.selectedBox.on("hoverChange", this.onHoverItemChange), this.editor.zoomManager.on("zoomChange", this.onHoverItemChange), this.editor.commandManager.on("change", this.onHoverItemChange);
  }
  unbindEvents() {
    this.editor.selectedElements.off("hoverItemChange", this.onHoverItemChange), this.editor.selectedBox.off("hoverChange", this.onHoverItemChange), this.editor.zoomManager.off("zoomChange", this.onHoverItemChange), this.editor.commandManager.off("change", this.onHoverItemChange);
  }
  updateTransformHandles(t) {
    const e = this.editor.zoomManager.getZoom(), n = this.editor.setting.get("handleSize"), i = this.editor.setting.get("handleStrokeWidth"), r = this.editor.setting.get("neswHandleWidth"), o = {
      x: 0,
      y: 0,
      width: t.width,
      height: t.height
    }, a = (() => {
      const x = ne(o, t.transform), y = n / 2 / e, S = ne(
        ki(o, y),
        t.transform
      ), w = 40, b = new Array(4).fill(0);
      t.width * e < w && (b[1] = b[3] = r / 2 / e), t.height * e < w && (b[0] = b[2] = r / 2 / e);
      const C = ki(o, b), I = new R(...t.transform), M = rl(C).map((E) => {
        const { x: T, y: k } = I.apply(E);
        return { x: T, y: k };
      });
      return {
        nw: x[0],
        ne: x[1],
        se: x[2],
        sw: x[3],
        n: M[0],
        e: M[1],
        s: M[2],
        w: M[3],
        nwRotation: S[0],
        neRotation: S[1],
        seRotation: S[2],
        swRotation: S[3]
      };
    })();
    for (const x of No) {
      const y = a[x], S = this.transformHandles.get(x);
      if (!S) {
        console.warn(`handle ${x} not found`);
        continue;
      }
      S.cx = y.x, S.cy = y.y;
    }
    const h = this.transformHandles.get("n"), l = this.transformHandles.get("s"), d = this.transformHandles.get("w"), u = this.transformHandles.get("e");
    h.graphics.attrs.width = l.graphics.attrs.width = t.width * e - n - i, d.graphics.attrs.height = u.graphics.attrs.height = t.height * e - n - i, h.graphics.attrs.height = l.graphics.attrs.height = d.graphics.attrs.width = u.graphics.attrs.width = r;
    const p = new R().rotate(Gt).prepend(new R(...t.transform)).rotate(Gt), m = We([
      p.a,
      p.b,
      p.c,
      p.d,
      p.tx,
      p.ty
    ]);
    h.rotation = m, l.rotation = m;
  }
  checkEnableRender(t) {
    const e = ne(
      {
        x: 0,
        y: 0,
        width: t.width,
        height: t.height
      },
      t.transform
    ).map((i) => this.editor.toViewportPt(i.x, i.y)), n = this.editor.setting.get("sizeIndicatorMinSize");
    return !(q(e[0], e[1]) < n && q(e[1], e[2]) < n);
  }
  draw(t) {
    if (this.selectedBoxRect = t, t) {
      if (!this.checkEnableRender(t))
        return;
      this.updateTransformHandles(t);
    }
    const e = [];
    this.shouldRenderTransformControl() && e.push(...Array.from(this.transformHandles.values())), this.customHandlesVisible && e.push(...this.customHandles);
    const n = this.editor.ctx, i = t ? We(t.transform) : 0;
    e.forEach((r) => {
      const o = r.graphics;
      if (o.type !== G.Path) {
        const { x: a, y: h } = this.editor.toViewportPt(r.cx, r.cy);
        o.updateAttrs({
          transform: [
            1,
            0,
            0,
            1,
            a - o.attrs.width / 2,
            h - o.attrs.height / 2
          ]
        });
      }
      t && r.isTransformHandle && o.setRotate(i), r.rotation !== void 0 && o.setRotate(r.rotation), o.isVisible() && (n.save(), o.draw({ ctx: n }), n.restore());
    });
  }
  getHandleInfoByPoint(t) {
    const e = [];
    if (this.shouldRenderTransformControl() && e.push(...Array.from(this.transformHandles.values())), this.customHandlesVisible && e.push(...this.customHandles), e.length === 0)
      return null;
    const n = this.editor.toViewportPt(t.x, t.y), i = this.editor.selectedBox.getBox();
    for (let r = e.length - 1; r >= 0; r--) {
      const o = e[r], a = o.type;
      if (!o) {
        console.warn(`handle ${a} not found`);
        continue;
      }
      if (o.hitTest ? o.hitTest(n, o.padding, i) : o.graphics.hitTest(n, o.padding))
        return {
          handleName: a,
          cursor: o.getCursor(a, i)
        };
    }
    return null;
  }
  shouldRenderTransformControl() {
    return this.selectedBoxRect && this.enableTransformControl;
  }
  setCustomHandles(t) {
    this.customHandles = t;
  }
  getCustomHandlesIntersectedWithRect(t) {
    const e = this.editor.toViewportPt(t.x, t.y), n = this.editor.toViewportPt(
      t.x + t.width,
      t.y + t.height
    ), i = {
      minX: e.x,
      minY: e.y,
      maxX: n.x,
      maxY: n.y
    };
    return this.customHandles.filter(
      (r) => r.graphics.intersectWithBox(i)
    );
  }
  clearCustomHandles() {
    this.customHandles = [];
  }
  hasCustomHandles() {
    return this.customHandles.length > 0;
  }
  showCustomHandles() {
    this.customHandlesVisible || (this.customHandlesVisible = !0, this.editor.render());
  }
  hideCustomHandles() {
    this.customHandlesVisible && (this.customHandlesVisible = !1, this.editor.render());
  }
}
const _r = (s) => No.includes(s);
class dt extends X {
  constructor(e, n) {
    super(
      {
        ...e,
        type: G.Rect
      },
      n
    );
    g(this, "type", G.Rect);
  }
  getAttrs() {
    return A({
      ...this.attrs,
      cornerRadius: this.attrs.cornerRadius ?? 0
    });
  }
  toJSON() {
    return {
      ...super.toJSON(),
      cornerRadius: this.attrs.cornerRadius
    };
  }
  getMaxCornerRadius() {
    return Math.min(this.attrs.width, this.attrs.height) / 2;
  }
  _realDraw(e, n) {
    const { ctx: i, imgManager: r, smooth: o } = e, a = this.attrs, { fill: h, strokeWidth: l, stroke: d, transform: u } = n || this.attrs;
    i.save(), i.transform(...u);
    const p = (x) => {
      x.beginPath(), a.cornerRadius ? x.roundRect(0, 0, a.width, a.height, a.cornerRadius) : x.rect(0, 0, a.width, a.height);
      for (const y of h ?? [])
        if (y.visible !== !1)
          switch (y.type) {
            case B.Solid: {
              x.fillStyle = ft(y.attrs), x.fill();
              break;
            }
            case B.Image:
              if (r) {
                const S = this.getMaxCornerRadius(), w = Math.min(
                  a.cornerRadius ?? 0,
                  S
                );
                this.fillImage(x, y, r, o, w);
              } else
                console.warn("ImgManager is not provided");
          }
      if (l) {
        x.lineWidth = l;
        for (const y of d ?? [])
          if (y.visible !== !1)
            switch (y.type) {
              case B.Solid: {
                x.strokeStyle = ft(y.attrs), x.stroke();
                break;
              }
              case B.Image:
            }
      }
      x.closePath();
    }, m = e.opacity ?? 1;
    if (m < 1 && (i.globalAlpha = m), m !== 1)
      Cn({
        originCtx: i,
        viewSize: this.doc.getDeviceViewSize(),
        draw: p
      });
    else {
      const x = this.getCanvas2DContext(i);
      x ? p(x) : console.warn("Rect drawing requer CanvasRenderingContext2D - operação não suportada");
    }
    i.restore();
  }
  draw(e) {
    if (this.shouldSkipDraw(e)) return;
    const n = this.getOpacity() * (e.opacity ?? 1);
    this._realDraw({ ...e, opacity: n });
  }
  drawOutline(e, n, i) {
    this._realDraw(
      { ctx: e },
      {
        stroke: [{ type: B.Solid, attrs: it(n) }],
        strokeWidth: i,
        transform: this.getWorldTransform()
      }
    );
  }
  /**
   * get rect before transform
   */
  getRect() {
    return {
      ...this.getLocalPosition(),
      width: this.attrs.width,
      height: this.attrs.height
    };
  }
  createCornerRadiusHandleGraph() {
    return new bn(
      {
        objectName: "cornerRadius",
        width: 8,
        height: 8,
        fill: [{ type: B.Solid, attrs: it("#fff") }],
        stroke: [{ type: B.Solid, attrs: it("#1592fe") }],
        strokeWidth: 1
      },
      { doc: this.doc }
    );
  }
  hitTest(e, n = 0) {
    const r = new R(...this.getWorldTransform()).applyInverse(e), o = this.getMaxCornerRadius(), a = new Array(4).fill(
      Math.min(this.attrs.cornerRadius ?? 0, o)
    ), l = this.getStrokeWidth() / 2, d = {
      x: 0,
      y: 0,
      width: this.attrs.width,
      height: this.attrs.height
    }, u = vr(
      r,
      d,
      a,
      n + l
    );
    return this.isFillShouldRender() ? u : u ? !vr(
      r,
      d,
      a.map((p) => Math.max(0, p - l)),
      -l - n
    ) : !1;
  }
  getControlHandles(e, n) {
    let i = 0;
    n && (i = 14 / e);
    const r = 108, o = this.attrs;
    if (o.width * e < r || o.height * e < r)
      return [];
    const a = Math.min(o.width, o.height) / 2, h = o.cornerRadius ?? 0, l = [
      h,
      h,
      h,
      h
    ], d = [], u = {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }, p = [
      {
        type: "nwCornerRadius",
        origin: { x: u.x, y: u.y },
        direction: { x: 1, y: 1 },
        cornerRadius: l[0]
      },
      {
        type: "neCornerRadius",
        origin: { x: u.x + u.width, y: u.y },
        direction: { x: -1, y: 1 },
        cornerRadius: l[1]
      },
      {
        type: "seCornerRadius",
        origin: { x: u.x + u.width, y: u.y + u.height },
        direction: { x: -1, y: -1 },
        cornerRadius: l[2]
      },
      {
        type: "swCornerRadius",
        origin: { x: u.x, y: u.y + u.height },
        direction: { x: 1, y: -1 },
        cornerRadius: l[3]
      }
    ];
    for (let m = 0; m < p.length; m++) {
      const x = p[m];
      let y = x.cornerRadius;
      y < i ? y = i : y > a && (y = a);
      let S = x.origin.x + x.direction.x * y, w = x.origin.y + x.direction.y * y;
      const C = new R(...this.getWorldTransform()).apply({ x: S, y: w });
      S = C.x, w = C.y;
      const I = new st({
        cx: S,
        cy: w,
        type: x.type,
        graphics: this.createCornerRadiusHandleGraph(),
        getCursor: () => "default"
      });
      d.push(I);
    }
    return d;
  }
  calcNewAttrsByControlHandle(e, n, i, r, o, a, h) {
    const l = {};
    if (e.endsWith("CornerRadius")) {
      const d = this.attrs, p = new R(...r).applyInverse(n);
      let m = { x: 0, y: 0 }, x = { x: 0, y: 0 };
      const y = {
        x: 0,
        y: 0,
        width: d.width,
        height: d.height
      };
      switch (e) {
        case "nwCornerRadius": {
          m = { x: 1, y: 1 }, x = { x: p.x - y.x, y: p.y - y.y };
          break;
        }
        case "neCornerRadius": {
          m = { x: -1, y: 1 }, x = { x: p.x - (y.x + y.width), y: p.y - y.y };
          break;
        }
        case "seCornerRadius": {
          m = { x: -1, y: -1 }, x = {
            x: p.x - (y.x + y.width),
            y: p.y - (y.y + y.height)
          };
          break;
        }
        case "swCornerRadius": {
          m = { x: 1, y: -1 }, x = { x: p.x - y.x, y: p.y - (y.y + y.height) };
          break;
        }
      }
      const S = (m.x * x.x + m.y * x.y) / Math.sqrt(m.x * m.x + m.y * m.y);
      l.cornerRadius = Math.min(
        this.getMaxCornerRadius(),
        Math.round(Math.max(S, 0) * Math.cos(Math.PI / 4))
      );
    } else
      Object.assign(
        l,
        super.calcNewAttrsByControlHandle(
          e,
          n,
          i,
          r,
          o,
          a,
          h
        )
      );
    return l;
  }
  getInfoPanelAttrs() {
    return [
      ...super.getInfoPanelAttrs(),
      {
        label: "C",
        key: "cornerRadius",
        value: this.attrs.cornerRadius ?? 0,
        uiType: "number"
      }
    ];
  }
  getSVGTagHead(e) {
    const n = [...this.attrs.transform];
    e && (n[4] += e.x, n[5] += e.y);
    const i = this.attrs.cornerRadius ?? 0, r = i > 1 ? ` rx="${i}"` : "";
    return `<rect width="${this.attrs.width}" height="${this.attrs.height}" transform="matrix(${n.join(" ")})"${r}`;
  }
  getLayerIconPath() {
    const o = this.getBbox(), a = o.maxX - o.minX, h = o.maxY - o.minY, l = 11 / Math.max(a, h), d = new R().prepend(new R(...this.getWorldTransform())).translate(-o.minX - a / 2, -o.minY - h / 2).scale(l, l).translate(12 / 2, 12 / 2), u = this.attrs, p = al(
      {
        x: 0,
        y: 0,
        width: u.width,
        height: u.height
      },
      this.attrs.cornerRadius
    );
    return p.forEach((m) => {
      m.points.forEach((x, y) => {
        m.points[y] = d.apply(x);
      });
    }), ve(p, 5);
  }
}
class Zi extends X {
  constructor(e, n) {
    super(
      {
        ...e,
        type: G.RegularPolygon
      },
      n
    );
    g(this, "type", G.RegularPolygon);
  }
  getAttrs() {
    return A({ ...this.attrs, count: this.attrs.count });
  }
  toJSON() {
    return {
      ...super.toJSON(),
      count: this.attrs.count
    };
  }
  getPoints() {
    return ml(this.getSize(), this.attrs.count);
  }
  getMinBbox() {
    if (this._cacheMinBbox)
      return this._cacheMinBbox;
    const e = new R(...this.attrs.transform), n = this.getPoints().map((r) => e.apply(r)), i = Sn(n);
    return this._cacheMinBbox = i, i;
  }
  draw(e) {
    if (this.shouldSkipDraw(e)) return;
    const n = this.getOpacity() * (e.opacity ?? 1);
    this._realDraw({ ...e, opacity: n });
  }
  drawOutline(e, n, i) {
    this._realDraw(
      { ctx: e },
      {
        stroke: [{ type: B.Solid, attrs: it(n) }],
        strokeWidth: i,
        transform: this.getWorldTransform()
      }
    );
  }
  _realDraw(e, n) {
    const i = this.attrs, { fill: r, strokeWidth: o, stroke: a, transform: h } = n || this.attrs, { ctx: l, imgManager: d, smooth: u } = e;
    l.save(), l.transform(...h ?? i.transform);
    const p = e.opacity ?? 1;
    p < 1 && (l.globalAlpha = p);
    const m = (x) => {
      const y = this.toPathCmds();
      x.beginPath();
      for (const S of y)
        S.type === "M" ? x.moveTo(S.points[0].x, S.points[0].y) : S.type === "L" ? x.lineTo(S.points[0].x, S.points[0].y) : S.type === "C" ? x.bezierCurveTo(
          S.points[0].x,
          S.points[0].y,
          S.points[1].x,
          S.points[1].y,
          S.points[2].x,
          S.points[2].y
        ) : S.type === "Z" && x.closePath();
      for (const S of r ?? [])
        if (S.visible !== !1)
          switch (S.type) {
            case B.Solid: {
              x.fillStyle = ft(S.attrs), x.fill();
              break;
            }
            case B.Image:
              d ? (x.clip(), this.fillImage(x, S, d, u)) : console.warn("ImgManager is not provided");
          }
      if (o) {
        x.lineWidth = o;
        for (const S of a ?? [])
          if (S.visible !== !1)
            switch (S.type) {
              case B.Solid: {
                x.strokeStyle = ft(S.attrs), x.stroke();
                break;
              }
              case B.Image:
            }
      }
      x.closePath();
    };
    if (p !== 1)
      Cn({
        originCtx: l,
        viewSize: this.doc.getDeviceViewSize(),
        draw: m
      });
    else {
      const x = this.getCanvas2DContext(l);
      x ? m(x) : console.warn("RegularPolygon drawing requer CanvasRenderingContext2D - operação não suportada");
    }
    l.restore();
  }
  getInfoPanelAttrs() {
    return [
      ...super.getInfoPanelAttrs(),
      {
        label: "N",
        key: "count",
        value: this.attrs.count,
        min: 3,
        max: 60,
        uiType: "number"
      },
      {
        label: "C",
        key: "cornerRadius",
        value: this.attrs.cornerRadius ?? 0,
        min: 0,
        max: 100,
        uiType: "number"
      }
    ];
  }
  updateAttrs(e, n) {
    super.updateAttrs(e, n);
  }
  hitTest(e, n) {
    const r = new R(...this.getWorldTransform()).applyInverse(e);
    return yl(this.getPoints(), r);
  }
  getSVGTagHead(e) {
    const n = [...this.attrs.transform];
    return e && (n[4] += e.x, n[5] += e.y), (this.attrs.cornerRadius ?? 0) > 0 ? `<path d="${ve(
      this.toPathCmds(),
      10
    )}" transform="matrix(${n.join(" ")})"` : `<polygon points="${this.getPoints().map((o) => `${o.x},${o.y}`).join(" ")}" transform="matrix(${n.join(" ")})"`;
  }
  toPathCmds() {
    let e = [];
    const n = this.getPoints(), i = this.attrs.cornerRadius ?? 0;
    return i > 0 ? e = Lo(n, i) : (e = n.map((r, o) => ({
      type: o === 0 ? "M" : "L",
      points: [r]
    })), e.push({ type: "Z", points: [] })), e;
  }
  getLayerIconPath() {
    const o = this.getBbox(), a = o.maxX - o.minX, h = o.maxY - o.minY, l = 11 / Math.max(a, h), d = new R().prepend(new R(...this.getWorldTransform())).translate(-o.minX - a / 2, -o.minY - h / 2).scale(l, l).translate(12 / 2, 12 / 2), u = this.toPathCmds();
    for (const p of u)
      p.points = p.points.map((m) => d.apply(m));
    return ve(u, 5);
  }
}
class Yo extends X {
  constructor(e, n) {
    super(
      {
        ...e,
        type: G.Star
      },
      n
    );
    g(this, "type", G.Star);
  }
  getAttrs() {
    return A({ ...this.attrs, count: this.attrs.count });
  }
  toJSON() {
    return {
      ...super.toJSON(),
      count: this.attrs.count
    };
  }
  getPoints() {
    return Cl(this.getSize(), this.attrs.count, this.attrs.starInnerScale);
  }
  getMinBbox() {
    if (this._cacheMinBbox)
      return this._cacheMinBbox;
    const e = new R(...this.attrs.transform), n = this.getPoints().map((r) => e.apply(r)), i = Sn(n);
    return this._cacheMinBbox = i, i;
  }
  draw(e) {
    if (this.shouldSkipDraw(e)) return;
    const n = this.getOpacity() * (e.opacity ?? 1);
    this._realDraw({ ...e, opacity: n });
  }
  drawOutline(e, n, i) {
    this._realDraw(
      { ctx: e },
      {
        stroke: [{ type: B.Solid, attrs: it(n) }],
        strokeWidth: i,
        transform: this.getWorldTransform()
      }
    );
  }
  _realDraw(e, n) {
    const { fill: i, strokeWidth: r, stroke: o, transform: a } = n || this.attrs, { ctx: h, imgManager: l, smooth: d } = e;
    h.save(), h.transform(...a);
    const u = e.opacity ?? 1;
    u < 1 && (h.globalAlpha = u);
    const p = (m) => {
      const x = this.toPathCmds();
      m.beginPath();
      for (const y of x)
        y.type === "M" ? m.moveTo(y.points[0].x, y.points[0].y) : y.type === "L" ? m.lineTo(y.points[0].x, y.points[0].y) : y.type === "C" ? m.bezierCurveTo(
          y.points[0].x,
          y.points[0].y,
          y.points[1].x,
          y.points[1].y,
          y.points[2].x,
          y.points[2].y
        ) : y.type === "Z" && m.closePath();
      for (const y of i ?? [])
        if (y.visible !== !1)
          switch (y.type) {
            case B.Solid: {
              m.fillStyle = ft(y.attrs), m.fill();
              break;
            }
            case B.Image:
              l ? (m.clip(), this.fillImage(m, y, l, d)) : console.warn("ImgManager is not provided");
          }
      if (r) {
        m.lineWidth = r;
        for (const y of o ?? [])
          if (y.visible !== !1)
            switch (y.type) {
              case B.Solid: {
                m.strokeStyle = ft(y.attrs), m.stroke();
                break;
              }
              case B.Image:
            }
      }
      m.closePath();
    };
    if (u !== 1)
      Cn({
        originCtx: h,
        viewSize: this.doc.getDeviceViewSize(),
        draw: p
      });
    else {
      const m = this.getCanvas2DContext(h);
      m ? p(m) : console.warn("Star drawing requer CanvasRenderingContext2D - operação não suportada");
    }
    h.restore();
  }
  getInfoPanelAttrs() {
    return [
      ...super.getInfoPanelAttrs(),
      {
        label: "N",
        key: "count",
        value: this.attrs.count,
        min: 3,
        max: 60,
        uiType: "number"
      },
      {
        label: "C",
        key: "cornerRadius",
        value: this.attrs.cornerRadius ?? 0,
        uiType: "number"
      },
      {
        label: "T",
        key: "starInnerScale",
        value: this.attrs.starInnerScale,
        min: 1e-3,
        max: 1,
        uiType: "percent"
      }
    ];
  }
  updateAttrs(e, n) {
    super.updateAttrs(e, n);
  }
  hitTest(e, n) {
    const r = new R(...this.getWorldTransform()).applyInverse(e);
    return xl(this.getPoints(), r);
  }
  getSVGTagHead(e) {
    const n = [...this.attrs.transform];
    return e && (n[4] += e.x, n[5] += e.y), (this.attrs.cornerRadius ?? 0) > 0 ? `<path d="${ve(
      this.toPathCmds(),
      10
    )}" transform="matrix(${n.join(" ")})"` : `<polygon points="${this.getPoints().map((o) => `${o.x},${o.y}`).join(" ")}" transform="matrix(${n.join(" ")})"`;
  }
  toPathCmds() {
    let e = [];
    const n = this.getPoints(), i = this.attrs.cornerRadius ?? 0;
    return i > 0 ? e = Lo(n, i) : (e = n.map((r, o) => ({
      type: o === 0 ? "M" : "L",
      points: [r]
    })), e.push({ type: "Z", points: [] })), e;
  }
  getLayerIconPath() {
    const o = this.getBbox(), a = o.maxX - o.minX, h = o.maxY - o.minY, l = 11 / Math.max(a, h), d = new R().prepend(new R(...this.getWorldTransform())).translate(-o.minX - a / 2, -o.minY - h / 2).scale(l, l).translate(12 / 2, 12 / 2), u = this.toPathCmds();
    for (const p of u)
      p.points = p.points.map((m) => d.apply(m));
    return ve(u, 5);
  }
}
function Bl(s, t = {}) {
  return {
    paragraphs: [{
      spans: [{ text: s, style: t }],
      alignment: "left"
    }],
    defaultStyle: {
      fontSize: 16,
      fontFamily: "Arial",
      color: "#000000",
      fontWeight: "normal",
      fontStyle: "normal",
      ...t
    }
  };
}
function Hl(s, t = {}) {
  const e = [], n = /(\*\*(.+?)\*\*|\*(.+?)\*|__(.+?)__)|([^*_]+)/g;
  let i;
  for (; (i = n.exec(s)) !== null; )
    i[2] ? e.push({
      text: i[2],
      style: { ...t, fontWeight: "bold" }
    }) : i[3] ? e.push({
      text: i[3],
      style: { ...t, fontStyle: "italic" }
    }) : i[4] ? e.push({
      text: i[4],
      style: { ...t, textDecoration: "underline" }
    }) : i[5] && e.push({
      text: i[5],
      style: t
    });
  return {
    paragraphs: [{
      spans: e.filter((r) => r.text.length > 0),
      alignment: "left"
    }],
    defaultStyle: {
      fontSize: 16,
      fontFamily: "Arial",
      color: "#000000",
      fontWeight: "normal",
      fontStyle: "normal",
      ...t
    }
  };
}
class Ll {
  constructor(t) {
    g(this, "canvasKit");
    this.canvasKit = t;
  }
  /**
   * Renderiza um RichTextDocument usando CanvasKit nativo
   */
  renderRichText(t, e, n, i, r) {
    var l;
    if ((l = t.getOriginalContext) != null && l.call(t))
      throw new Error("RichTextRenderer requer CanvasKit - Canvas2D não suportado");
    const o = t;
    if (!o.canvas || !o.canvasKit)
      throw new Error("Renderer não é CanvasKit válido");
    let a = 0, h = 0;
    for (const d of e.paragraphs) {
      const u = this.renderParagraph(
        o.canvas,
        d,
        e.defaultStyle,
        n,
        i + a,
        r
      );
      a += u.height, h = Math.max(h, u.width);
    }
    return { width: h, height: a };
  }
  /**
   * Renderiza um parágrafo individual
   */
  renderParagraph(t, e, n, i, r, o) {
    const a = new this.canvasKit.ParagraphStyle({
      textAlign: this.getTextAlign(e.alignment || "left"),
      maxLines: e.maxLines,
      ellipsis: e.ellipsis,
      heightMultiplier: e.lineHeight || 1
    }), h = this.canvasKit.ParagraphBuilder.Make(a);
    for (const m of e.spans) {
      const x = this.createTextStyle(m.style, n);
      h.pushStyle(x), h.addText(m.text), h.pop();
    }
    const l = h.build(), d = o || 1e3;
    l.layout(d), l.paint(t, i, r);
    const u = l.getHeight(), p = Math.min(l.getMaxIntrinsicWidth(), d);
    return l.delete(), h.delete(), { width: p, height: u };
  }
  /**
   * Converte IRichTextStyle para CanvasKit TextStyle
   */
  createTextStyle(t, e) {
    const n = { ...e, ...t };
    return new this.canvasKit.TextStyle({
      color: this.parseColor(n.color || "#000000"),
      fontSize: n.fontSize || 16,
      fontFamilies: [n.fontFamily || "Arial"],
      fontWeight: this.getFontWeight(n.fontWeight || "normal"),
      fontStyle: this.getFontSlant(n.fontStyle || "normal"),
      decoration: this.getTextDecoration(n.textDecoration || "none"),
      letterSpacing: n.letterSpacing || 0,
      wordSpacing: n.wordSpacing || 0
    });
  }
  /**
   * Converte string color para CanvasKit color
   */
  parseColor(t) {
    if (t.startsWith("#")) {
      const e = t.slice(1), n = parseInt(e.slice(0, 2), 16) / 255, i = parseInt(e.slice(2, 4), 16) / 255, r = parseInt(e.slice(4, 6), 16) / 255;
      return Float32Array.from([n, i, r, 1]);
    }
    return Float32Array.from([0, 0, 0, 1]);
  }
  /**
   * Converte alignment string para CanvasKit TextAlign
   */
  getTextAlign(t) {
    switch (t) {
      case "center":
        return this.canvasKit.TextAlign.Center;
      case "right":
        return this.canvasKit.TextAlign.Right;
      case "justify":
        return this.canvasKit.TextAlign.Justify;
      default:
        return this.canvasKit.TextAlign.Left;
    }
  }
  /**
   * Converte font weight para CanvasKit FontWeight
   */
  getFontWeight(t) {
    if (typeof t == "number") return t;
    switch (t) {
      case "bold":
        return this.canvasKit.FontWeight.Bold;
      case "bolder":
        return this.canvasKit.FontWeight.ExtraBold;
      case "lighter":
        return this.canvasKit.FontWeight.Light;
      default:
        return this.canvasKit.FontWeight.Normal;
    }
  }
  /**
   * Converte font style para CanvasKit FontSlant
   */
  getFontSlant(t) {
    switch (t) {
      case "italic":
        return this.canvasKit.FontSlant.Italic;
      case "oblique":
        return this.canvasKit.FontSlant.Oblique;
      default:
        return this.canvasKit.FontSlant.Upright;
    }
  }
  /**
   * Converte text decoration para CanvasKit TextDecoration
   */
  getTextDecoration(t) {
    switch (t) {
      case "underline":
        return this.canvasKit.TextDecoration.Underline;
      case "overline":
        return this.canvasKit.TextDecoration.Overline;
      case "line-through":
        return this.canvasKit.TextDecoration.LineThrough;
      default:
        return this.canvasKit.TextDecoration.NoDecoration;
    }
  }
  /**
   * Mede as dimensões de um RichTextDocument sem renderizar
   */
  measureRichText(t, e) {
    let n = 0, i = 0;
    for (const r of t.paragraphs) {
      const o = this.measureParagraph(r, t.defaultStyle, e);
      n += o.height, i = Math.max(i, o.width);
    }
    return { width: i, height: n };
  }
  /**
   * Mede um parágrafo individual
   */
  measureParagraph(t, e, n) {
    const i = new this.canvasKit.ParagraphStyle({
      textAlign: this.getTextAlign(t.alignment || "left"),
      maxLines: t.maxLines,
      ellipsis: t.ellipsis,
      heightMultiplier: t.lineHeight || 1
    }), r = this.canvasKit.ParagraphBuilder.Make(i);
    for (const d of t.spans) {
      const u = this.createTextStyle(d.style, e);
      r.pushStyle(u), r.addText(d.text), r.pop();
    }
    const o = r.build(), a = n || 1e3;
    o.layout(a);
    const h = o.getHeight(), l = Math.min(o.getMaxIntrinsicWidth(), a);
    return o.delete(), r.delete(), { width: l, height: h };
  }
}
const Wl = 80, zl = 30, Br = document.createElement("canvas").getContext("2d");
class ze extends X {
  constructor(e, n) {
    super(
      {
        ...e,
        type: G.Text,
        width: e.width ?? Wl,
        height: e.height ?? zl
      },
      n
    );
    g(this, "type", G.Text);
    g(this, "_glyphs", null);
    g(this, "contentMetrics", null);
    g(this, "richTextRenderer", null);
    if (e.autoFit) {
      Br.font = `${e.fontSize}px ${e.fontFamily}`;
      const { width: i } = Br.measureText(e.content);
      this.attrs.width = i, this.attrs.height = e.fontSize;
    }
  }
  updateAttrs(e) {
    const n = "content" in e && e.content !== this.attrs.content, i = "fontSize" in e || "fontFamily" in e, r = "fontFamily" in e && e.fontFamily !== this.attrs.fontFamily;
    (n || i || r) && (this._glyphs = null), super.updateAttrs(e);
  }
  draw(e) {
    if (this.shouldSkipDraw(e)) return;
    const n = this.getOpacity() * (e.opacity ?? 1), { transform: i, fill: r, fontSize: o, content: a, fontFamily: h, enableRichText: l, enableMarkdown: d } = this.attrs, { ctx: u } = e;
    u.save(), u.transform(...i), n < 1 && (u.globalAlpha = n), (l || d) && this.canUseRichText(u) ? this.drawRichText(u, r) : this.drawSimpleText(u, r, a, o, h), u.restore();
  }
  /**
   * Verifica se pode usar Rich Text (requer CanvasKit)
   */
  canUseRichText(e) {
    return e && typeof e.getOriginalContext == "function" && e.getOriginalContext() === null;
  }
  /**
   * Desenha texto usando CanvasKit Rich Text nativo
   */
  drawRichText(e, n) {
    try {
      if (!e || !e.canvasKit)
        throw new Error("CanvasKit não disponível no contexto");
      this.richTextRenderer || (this.richTextRenderer = new Ll(e.canvasKit));
      const i = this.getRichTextDocument();
      this.richTextRenderer.renderRichText(
        e,
        // passa o renderer CanvasKit
        i,
        0,
        // x
        0,
        // y (já fizemos transform)
        this.attrs.width
        // maxWidth
      ), console.log("✅ Rich text renderizado com CanvasKit nativo");
    } catch (i) {
      console.warn("⚠️ Rich text falhou, usando fallback:", i), this.drawSimpleText(e, n, this.attrs.content, this.attrs.fontSize, this.attrs.fontFamily);
    }
  }
  /**
   * Desenha texto simples (compatibilidade)
   */
  drawSimpleText(e, n, i, r, o) {
    e.beginPath(), e.font = `${r}px ${o ?? "sans-serif"}`;
    for (const a of n ?? [])
      switch (a.type) {
        case B.Solid: {
          e.fillStyle = ft(a.attrs);
          break;
        }
        case B.Image:
      }
    e.fontKerning = "none", e.translate(0, this.getContentMetrics().fontBoundingBoxAscent), e.fillText(i, 0, 0);
  }
  /**
   * Obtém ou cria o documento Rich Text
   */
  getRichTextDocument() {
    var i, r;
    if (this.attrs.richText)
      return this.attrs.richText;
    const e = ((r = (i = this.attrs.fill) == null ? void 0 : i[0]) == null ? void 0 : r.type) === B.Solid ? ft(this.attrs.fill[0].attrs) : "#000000", n = {
      fontSize: this.attrs.fontSize,
      fontFamily: this.attrs.fontFamily,
      color: e,
      fontWeight: "normal",
      fontStyle: "normal"
    };
    return this.attrs.enableMarkdown ? Hl(this.attrs.content, n) : Bl(this.attrs.content, n);
  }
  getSVGTagHead(e) {
    const n = [...this.attrs.transform];
    return n[5] += this.attrs.fontSize, e && (n[4] += e.x, n[5] += e.y), `<text x="0" y="0" transform="matrix(${n.join(" ")})"`;
  }
  getSVGTagTail() {
    return `>${jc(this.attrs.content)}</text>`;
  }
  getLayerIconPath() {
    return "M0 0H11V3H10V1H6V9H7.5V10H3.5V9H5V1H1V3H0V0Z";
  }
  getGlyphs() {
    return this._glyphs ? this._glyphs : (this._glyphs = bl(this.attrs.content, {
      fontSize: this.attrs.fontSize,
      fontFamily: this.attrs.fontFamily
    }), this._glyphs);
  }
  getContentMetrics() {
    return this.contentMetrics ? this.contentMetrics : (this.contentMetrics = Ml(this.attrs.content, {
      fontSize: this.attrs.fontSize,
      fontFamily: this.attrs.fontFamily
    }), this.contentMetrics);
  }
  getContentLength() {
    return this.getGlyphs().length - 1;
  }
  isFillShouldRender() {
    return !0;
  }
  getCursorIndex(e) {
    e = Yi(this.getWorldTransform(), e);
    const n = this.getGlyphs();
    let i = 0, r = n.length - 1;
    for (; i <= r; ) {
      const o = Math.floor((i + r) / 2), a = n[o];
      e.x < a.position.x ? r = o - 1 : i = o + 1;
    }
    return i === 0 ? 0 : i >= n.length ? n.length - 1 : n[i].position.x - e.x > e.x - n[r].position.x ? r : i;
  }
}
const qt = {
  Rect: "Rect",
  Ellipse: "Ellipse",
  Line: "Line",
  RegularPolygon: "Polygon",
  Star: "Star",
  Path: "Path",
  Text: "Text",
  Group: "Group",
  Frame: "Frame"
};
class Z {
  constructor(t) {
    g(this, "originAttrsMap", /* @__PURE__ */ new Map());
    g(this, "updatedAttrsMap", /* @__PURE__ */ new Map());
    g(this, "removedIds", /* @__PURE__ */ new Set());
    g(this, "newIds", /* @__PURE__ */ new Set());
    g(this, "isCommitDone", !1);
    this.editor = t;
  }
  recordOld(t, e) {
    return this.originAttrsMap.set(t, e), this;
  }
  update(t, e) {
    return this.updatedAttrsMap.set(t, e), this;
  }
  remove(t) {
    return this.removedIds.add(t), this;
  }
  addNewIds(t) {
    for (const e of t)
      this.newIds.add(e);
    return this;
  }
  updateParentSize(t) {
    return xn(
      this.editor,
      ie(t),
      this.originAttrsMap,
      this.updatedAttrsMap
    ), this;
  }
  updateNodeSize(t) {
    return xn(
      this.editor,
      t,
      this.originAttrsMap,
      this.updatedAttrsMap
    ), this;
  }
  commit(t) {
    if (this.isCommitDone) {
      console.error("It had committed before, can not commit again!");
      return;
    }
    this.editor.commandManager.pushCommand(
      new Ps(
        t,
        this.editor,
        this.originAttrsMap,
        this.updatedAttrsMap,
        this.removedIds,
        this.newIds
      )
    ), this.isCommitDone = !0;
  }
}
const Gl = (s, t) => {
  const n = {
    [nt.Left]: (o) => o.x,
    [nt.HCenter]: (o) => o.x + o.width / 2,
    [nt.Right]: (o) => o.x + o.width,
    [nt.Top]: (o) => o.y,
    [nt.VCenter]: (o) => o.y + o.height / 2,
    [nt.Bottom]: (o) => o.y + o.height
  }[t];
  if (!n)
    return !1;
  const i = s.map((o) => jt(o)), r = n(i[0]);
  return i.every((o) => n(o) === r);
}, Be = (s, t) => {
  if (s.selectedElements.size() < 2) {
    console.warn("can align zero or two elements, fail silently");
    return;
  }
  const e = s.selectedElements.getItems(), n = e.map((h) => h.getBbox()), i = e.map((h) => h.getWorldTransform()), r = Ut(n);
  if (Gl(n, t))
    return;
  const o = new Z(s), a = (h, l, d, u) => {
    o.recordOld(h.attrs.id, {
      transform: A(h.attrs.transform)
    });
    const p = A(l);
    p[4] += d, p[5] += u, h.setWorldTransform(p), o.update(h.attrs.id, {
      transform: A(h.attrs.transform)
    });
  };
  switch (t) {
    case nt.Left: {
      for (let h = 0; h < e.length; h++) {
        const l = e[h], d = r.minX - n[h].minX;
        d !== 0 && a(l, i[h], d, 0);
      }
      break;
    }
    case nt.HCenter: {
      const h = r.minX / 2 + r.maxX / 2;
      for (let l = 0; l < e.length; l++) {
        const d = e[l], u = h - (n[l].minX / 2 + n[l].maxX / 2);
        u !== 0 && a(d, i[l], u, 0);
      }
      break;
    }
    case nt.Right: {
      for (let h = 0; h < e.length; h++) {
        const l = e[h], d = r.maxX - n[h].maxX;
        d !== 0 && a(l, i[h], d, 0);
      }
      break;
    }
    case nt.Top: {
      for (let h = 0; h < e.length; h++) {
        const l = e[h], d = r.minY - n[h].minY;
        d !== 0 && a(l, i[h], 0, d);
      }
      break;
    }
    case nt.VCenter: {
      const h = r.minY / 2 + r.maxY / 2;
      for (let l = 0; l < e.length; l++) {
        const d = e[l], u = h - (n[l].minY / 2 + n[l].maxY / 2);
        u !== 0 && a(d, i[l], 0, u);
      }
      break;
    }
    case nt.Bottom: {
      for (let h = 0; h < e.length; h++) {
        const l = e[h], d = r.maxY - n[h].maxY;
        d !== 0 && a(l, i[h], 0, d);
      }
      break;
    }
    default: {
      console.warn("invalid type:", t);
      break;
    }
  }
  o.updateParentSize(e), o.commit("Align " + t), s.render();
}, ts = (s, t) => {
  s.selectedElements.size() === 0 && console.warn("can't arrange, no element");
  const e = s.selectedElements.getItems(), n = new Z(s), i = /* @__PURE__ */ new Map();
  for (const o of e) {
    const a = o.getParent();
    i.has(a) || i.set(a, /* @__PURE__ */ new Set()), i.get(a).add(o);
  }
  let r = !0;
  switch (t) {
    case Vt.Front: {
      r = Ol(n, i);
      break;
    }
    case Vt.Back: {
      r = Kl(n, i);
      break;
    }
    case Vt.Forward: {
      r = Fl(n, i);
      break;
    }
    case Vt.Backward: {
      r = $l(n, i);
      break;
    }
    default:
      console.warn(`invalid type ${t}`);
      break;
  }
  r ? (n.commit(`Arrange ${t}`), s.render()) : console.log("No need to arrange.");
}, Ol = (s, t) => {
  let e = !1;
  for (const [n, i] of t) {
    if (n.getChildrenCount() === i.size)
      continue;
    const { count: r } = jo(
      n.getChildren(),
      i
    );
    if (r === i.size)
      continue;
    e = !0;
    const o = n.getMaxChildIndex(), a = X.sortGraphicsArray(
      Array.from(i)
    ), h = we(
      o,
      null,
      a.length
    );
    for (let l = 0; l < a.length; l++) {
      const d = a[l];
      s.recordOld(d.attrs.id, {
        parentIndex: A(d.attrs.parentIndex)
      }), d.updateAttrs({
        parentIndex: {
          guid: n.attrs.id,
          position: h[l]
        }
      }), s.update(d.attrs.id, {
        parentIndex: A(d.attrs.parentIndex)
      });
    }
    n.markSortDirty(), n.sortChildren();
  }
  return e;
}, Kl = (s, t) => {
  let e = !1;
  for (const [n, i] of t) {
    if (n.getChildrenCount() === i.size)
      continue;
    const { count: r } = Vo(
      n.getChildren(),
      i
    );
    if (r === i.size)
      continue;
    e = !0;
    const o = n.getMinChildIndex(), a = X.sortGraphicsArray(
      Array.from(i)
    ), h = we(
      null,
      o,
      a.length
    );
    for (let l = 0; l < a.length; l++) {
      const d = a[l];
      s.recordOld(d.attrs.id, {
        parentIndex: A(d.attrs.parentIndex)
      }), d.updateAttrs({
        parentIndex: {
          guid: n.attrs.id,
          position: h[l]
        }
      }), s.update(d.attrs.id, {
        parentIndex: A(d.attrs.parentIndex)
      });
    }
    n.markSortDirty(), n.sortChildren();
  }
  return e;
}, Fl = (s, t) => {
  var n;
  let e = !1;
  for (const [i, r] of t) {
    if (i.getChildrenCount() === r.size)
      continue;
    const o = i.getChildren(), { index: a, count: h } = jo(o, r);
    if (h !== r.size) {
      e = !0;
      for (let l = a; l >= 0; l--) {
        const d = o[l];
        if (r.has(d)) {
          const u = o[l + 1].getSortIndex(), p = ((n = o[l + 2]) == null ? void 0 : n.getSortIndex()) ?? null, m = Nt(u, p);
          Eo(o, l, l + 1), s.recordOld(d.attrs.id, {
            parentIndex: A(d.attrs.parentIndex)
          }), d.updateAttrs({
            parentIndex: {
              guid: i.attrs.id,
              position: m
            }
          }), s.update(d.attrs.id, {
            parentIndex: A(d.attrs.parentIndex)
          });
        }
      }
      i.markSortDirty(), i.sortChildren();
    }
  }
  return e;
}, $l = (s, t) => {
  var n;
  let e = !1;
  for (const [i, r] of t) {
    if (i.getChildrenCount() === r.size)
      continue;
    const o = i.getChildren(), { index: a, count: h } = Vo(o, r);
    if (h !== r.size) {
      e = !0;
      for (let l = a; l <= o.length; l++) {
        const d = o[l];
        if (r.has(d)) {
          const u = ((n = o[l - 2]) == null ? void 0 : n.getSortIndex()) ?? null, p = o[l - 1].getSortIndex(), m = Nt(u, p);
          Eo(o, l, l - 1), s.recordOld(d.attrs.id, {
            parentIndex: A(d.attrs.parentIndex)
          }), d.updateAttrs({
            parentIndex: {
              guid: i.attrs.id,
              position: m
            }
          }), s.update(d.attrs.id, {
            parentIndex: A(d.attrs.parentIndex)
          });
        }
      }
      i.markSortDirty(), i.sortChildren();
    }
  }
  return e;
}, Vo = (s, t) => {
  let e = 0, n = 0;
  for (; e < s.length && t.has(s[e]); e++)
    n++;
  return { index: e, count: n };
}, jo = (s, t) => {
  let e = s.length - 1, n = 0;
  for (; e >= 0 && t.has(s[e]); e--)
    n++;
  return { index: e, count: n };
}, Vd = {
  exportOriginFile: (s, t = "design") => {
    const e = s.sceneGraph.toJSON(), n = new Blob([e], {
      type: "application/json"
    });
    Nl(n, t + ".suika");
  }
}, Nl = (s, t) => {
  const e = URL.createObjectURL(s), n = document.createElement("a");
  n.href = e, n.setAttribute("download", t), n.click();
}, Yl = (s, t) => {
  Xo(s, t, { x: -1, y: 1 });
}, Vl = (s, t) => {
  Xo(s, t, { x: 1, y: -1 });
}, Xo = (s, t, e) => {
  const n = t.length;
  if (n === 0) {
    console.warn("graphics should not be empty");
    return;
  }
  let i;
  n === 1 ? i = t[0].getWorldCenter() : i = kl(
    Ut(t.map((o) => o.getBbox()))
  );
  const r = new R().translate(-i.x, -i.y).scale(e.x, e.y).translate(i.x, i.y);
  jl(s, t, r.getArray(), "Flip Vertical");
}, jl = (s, t, e, n) => {
  const i = new Z(s);
  for (const r of t)
    i.recordOld(r.attrs.id, {
      transform: A(r.attrs.transform)
    }), r.prependWorldTransform(e), i.update(r.attrs.id, {
      transform: A(r.attrs.transform)
    });
  i.updateParentSize(t), i.commit(n);
}, Xl = (s, t) => {
  if (s.length === 0) {
    console.warn("graphics should not be empty");
    return;
  }
  s = X.sortGraphics(s);
  const e = ie(s), n = s.at(-1), i = n.getParent(), r = Rt(i.getWorldTransform()), o = n.getSortIndex(), a = jt(
    Ut(
      s.map((u) => un({
        ...u.getSize(),
        transform: vt(
          r,
          u.getWorldTransform()
        )
      }))
    )
  ), h = new Mn(
    {
      objectName: Zt(
        i,
        qt.Group
      ),
      width: a.width,
      height: a.height,
      resizeToFit: !0
    },
    {
      advancedAttrs: {
        x: a.x,
        y: a.y
      },
      doc: t.doc
    }
  );
  i.insertChild(h, o);
  const l = Rt(h.getWorldTransform()), d = new Z(t);
  d.addNewIds([h.attrs.id]);
  for (const u of s)
    d.recordOld(u.attrs.id, {
      parentIndex: A(u.attrs.parentIndex),
      transform: A(u.attrs.transform)
    }), u.updateAttrs({
      transform: vt(l, u.getWorldTransform())
    }), h.insertChild(u), d.update(u.attrs.id, {
      parentIndex: A(u.attrs.parentIndex),
      transform: A(u.attrs.transform)
    });
  d.updateNodeSize(e), d.commit("group"), t.sceneGraph.addItems([h]), t.selectedElements.setItems([h]);
}, jd = {
  importOriginFile: (s) => {
    Ul(".suika", (t) => {
      s.setContents(JSON.parse(t));
    });
  }
};
function Ul(s, t) {
  const e = document.createElement("input");
  e.type = "file", e.accept = s, e.style.display = "none", e.addEventListener("change", function(n) {
    var o;
    const i = (o = n.target.files) == null ? void 0 : o[0];
    if (!i) return;
    const r = new FileReader();
    r.onload = function(a) {
      var l;
      const h = (l = a.target) == null ? void 0 : l.result;
      h && t(h);
    }, r.readAsText(i);
  }), e.click();
}
const Hr = {
  setX({
    editor: s,
    graphicsArr: t,
    val: e,
    isDelta: n = !1
  }) {
    if (t.length === 0)
      return;
    const i = new Z(s);
    for (const r of t) {
      i.recordOld(r.attrs.id, {
        transform: A(r.attrs.transform)
      });
      const o = r.getWorldTransform(), a = n ? o[4] + e : e;
      o[4] = a, r.setWorldTransform(o), i.update(r.attrs.id, {
        transform: A(r.attrs.transform)
      });
    }
    i.updateParentSize(t), i.commit("Update X of Elements");
  },
  setY({
    editor: s,
    graphicsArr: t,
    val: e,
    isDelta: n = !1
  }) {
    if (t.length === 0)
      return;
    const i = new Z(s);
    for (const r of t) {
      i.recordOld(r.attrs.id, {
        transform: A(r.attrs.transform)
      });
      const o = r.getWorldTransform(), a = n ? o[5] + e : e;
      o[5] = a, r.setWorldTransform(o), i.update(r.attrs.id, {
        transform: A(r.attrs.transform)
      });
    }
    i.updateParentSize(t), i.commit("Update Y of Elements");
  },
  setWidth({
    editor: s,
    graphicsArr: t,
    val: e,
    isDelta: n = !1
  }) {
    let i = !1;
    if (t.length === 0)
      return !1;
    const r = new Z(s);
    for (const o of t) {
      r.recordOld(o.attrs.id, { width: o.attrs.width });
      let a = n ? o.attrs.width + e : e;
      a <= 0 && (a = 1e-7), a !== o.attrs.width && (i = !0), o.updateAttrs({ width: a }), r.update(o.attrs.id, { width: o.attrs.width });
    }
    return i && (r.updateParentSize(t), r.commit("Update Width of Elements")), i;
  },
  setHeight({
    editor: s,
    graphicsArr: t,
    val: e,
    isDelta: n = !1
  }) {
    if (t.length === 0)
      return !1;
    let i = !1;
    const r = new Z(s);
    for (const o of t) {
      r.recordOld(o.attrs.id, {
        height: o.attrs.height
      });
      let a = n ? o.attrs.height + e : e;
      a <= 0 && (a = 0), a !== o.attrs.height && (i = !0), o.updateAttrs({ height: a }), r.update(o.attrs.id, { height: o.attrs.height });
    }
    return i && (r.updateParentSize(t), r.commit("Update Height of Elements")), i;
  },
  setRotation({
    editor: s,
    graphicsArr: t,
    rotation: e,
    isDelta: n = !1
  }) {
    if (t.length === 0)
      return;
    const i = new Z(s);
    for (const r of t) {
      i.recordOld(r.attrs.id, {
        transform: A(r.attrs.transform)
      });
      const o = n ? r.getRotate() + e : e;
      r.setRotate(o), i.update(r.attrs.id, {
        transform: A(r.attrs.transform)
      });
    }
    i.updateParentSize(t), i.commit("Update Rotation");
  },
  setCornerRadius({
    editor: s,
    graphicsArr: t,
    val: e,
    isDelta: n = !1
  }) {
    if (t.length === 0)
      return !1;
    let i = !1;
    const r = t.filter(
      (a) => a.type === G.Rect || a.type === G.RegularPolygon || a.type === G.Star
    ), o = new Z(s);
    for (const a of r) {
      o.recordOld(a.attrs.id, {
        cornerRadius: a.attrs.cornerRadius
      });
      const h = a.attrs.cornerRadius ?? 0;
      let l = n ? h + e : e;
      l <= 0 && (l = 0), l !== h && (i = !0), a.updateAttrs({ cornerRadius: l }), o.update(a.attrs.id, {
        cornerRadius: a.attrs.cornerRadius
      });
    }
    return i && o.commit("Update CornerRadius of Elements"), i;
  },
  setCount({
    editor: s,
    graphicsArr: t,
    val: e,
    isDelta: n = !1
  }) {
    if (t.length === 0)
      return;
    let i = !1;
    const r = t.filter(
      (a) => a.type === G.RegularPolygon || a.type === G.Star
    ), o = new Z(s);
    for (const a of r) {
      o.recordOld(a.attrs.id, {
        count: a.attrs.count
      });
      const h = a.attrs.count ?? 0;
      let l = n ? h + e : e;
      l <= 3 && (l = 3), l !== h && (i = !0), a.updateAttrs({ count: l }), o.update(a.attrs.id, {
        count: a.attrs.count
      });
    }
    return i && o.commit("Update Count of Elements"), i;
  },
  setStarInnerScale({
    editor: s,
    graphicsArr: t,
    val: e,
    isDelta: n = !1
  }) {
    if (t.length === 0)
      return;
    let i = !1;
    const r = t.filter(
      (a) => a.type === G.Star
    ), o = new Z(s);
    for (const a of r) {
      o.recordOld(a.attrs.id, {
        starInnerScale: a.attrs.starInnerScale
      });
      const h = a.attrs.starInnerScale ?? 0;
      let l = n ? h + e : e;
      l <= 1e-3 && (l = 1e-3), l !== h && (i = !0), a.updateAttrs({ starInnerScale: l }), o.update(a.attrs.id, {
        starInnerScale: a.attrs.starInnerScale
      });
    }
    return i && o.commit("Update StarInnerScale of Elements"), i;
  },
  /**
   * show graphs when at least one graphics is hidden
   * and
   * hide graphs when all graphs are shown
   */
  toggleVisible(s, t) {
    if (t.length === 0)
      return;
    const e = t.some((i) => !i.isVisible()), n = new Z(s);
    for (const i of t)
      n.recordOld(i.attrs.id, {
        visible: i.attrs.visible
      }), i.updateAttrs({
        visible: e
      }), n.update(i.attrs.id, { visible: e });
    n.updateParentSize(t), n.commit("update visible of graphs");
  },
  /**
   * lock / unlock
   */
  toggleLock(s, t) {
    if (t.length === 0)
      return;
    const e = t.some((i) => !i.isLock()), n = t.map((i) => ({ lock: i.attrs.lock }));
    t.forEach((i) => {
      i.updateAttrs({
        lock: e
      });
    }), s.commandManager.pushCommand(
      new se(
        "update lock of graphs",
        t,
        { lock: e },
        n
      )
    );
  },
  /** set name of graphics */
  setGraphName(s, t, e) {
    const n = [{ objectName: t.attrs.objectName }];
    t.updateAttrs({
      objectName: e
    }), s.commandManager.pushCommand(
      new se(
        "update name of graphics",
        [t],
        { objectName: e },
        n
      )
    );
  }
}, Zl = (s, t) => {
  var a;
  const e = s.filter(
    (h) => pt(h)
  );
  if (e.length === 0) {
    console.log("no frame graphics, no ungroup");
    return;
  }
  const n = ie(s), i = /* @__PURE__ */ new Map();
  for (const h of e) {
    const l = h.getParentId();
    if (!l) {
      console.warn(`graphics ${l} lost`);
      continue;
    }
    i.has(l) || i.set(l, /* @__PURE__ */ new Set()), i.get(l).add(h);
  }
  const r = new Z(t);
  let o = [];
  for (const [h, l] of i) {
    const u = t.doc.getGraphicsById(h).getChildren();
    for (let p = 0; p < u.length; p++) {
      const m = u[p];
      if (!pt(m) || !l.has(m))
        continue;
      const x = ((a = u[p - 1]) == null ? void 0 : a.getSortIndex()) ?? null, y = m.getSortIndex();
      m.removeFromParent(), m.setDeleted(!0), r.remove(m.attrs.id);
      const S = ql(
        r,
        h,
        m,
        x,
        y
      );
      o = o.concat(S);
    }
  }
  r.updateNodeSize(n), r.commit("ungroup"), t.selectedElements.setItems(o), t.selectedElements.setHoverItem(null);
}, ql = (s, t, e, n, i) => {
  const r = e.getChildren(), o = we(n, i, r.length);
  for (let a = 0; a < r.length; a++) {
    const h = r[a], l = h.getWorldTransform();
    s.recordOld(h.attrs.id, {
      parentIndex: A(h.attrs.parentIndex),
      transform: A(h.attrs.transform)
    }), h.updateAttrs({
      parentIndex: {
        guid: t,
        position: o[a]
      }
    }), h.insertAtParent(o[a]), h.setWorldTransform(l), s.update(h.attrs.id, {
      parentIndex: A(h.attrs.parentIndex),
      transform: A(h.attrs.transform)
    });
  }
  return r;
};
class Jl {
  constructor(t) {
    g(this, "isBound", !1);
    this.editor = t;
  }
  bindKey() {
    if (this.isBound) {
      console.warn("CommandKeyBinding has been bound, please destroy it first");
      return;
    }
    this.isBound = !0;
    const t = this.editor, e = () => t.commandManager.undo();
    t.keybindingManager.register({
      key: { metaKey: !0, keyCode: "KeyZ" },
      winKey: { ctrlKey: !0, keyCode: "KeyZ" },
      when: (D) => !D.isToolDragging,
      actionName: "Undo",
      action: e
    });
    const n = () => t.commandManager.redo();
    t.keybindingManager.register({
      key: { metaKey: !0, shiftKey: !0, keyCode: "KeyZ" },
      winKey: { ctrlKey: !0, shiftKey: !0, keyCode: "KeyZ" },
      when: (D) => !D.isToolDragging,
      actionName: "Redo",
      action: n
    });
    const i = () => {
      t.hostEventManager.isEnableDelete && t.selectedElements.removeFromScene();
    };
    t.keybindingManager.register({
      key: [{ keyCode: "Backspace" }, { keyCode: "Delete" }],
      when: (D) => !D.isToolDragging,
      actionName: "Delete",
      action: i
    });
    const r = () => {
      t.selectedElements.selectAll(), t.render();
    };
    t.keybindingManager.register({
      key: { metaKey: !0, keyCode: "KeyA" },
      winKey: { ctrlKey: !0, keyCode: "KeyA" },
      actionName: "Select All",
      action: r
    });
    const o = () => {
      this.editor.toolManager.getActiveToolName() === "select" ? t.selectedElements.clear() : this.editor.toolManager.setActiveTool("select"), t.render();
    };
    t.keybindingManager.register({
      key: { keyCode: "Escape" },
      when: (D) => !D.isToolDragging,
      actionName: "Back to Select Tool or Cancel Select",
      action: o
    });
    const a = () => {
      t.setting.set("enableRuler", !t.setting.get("enableRuler")), t.render();
    };
    t.keybindingManager.register({
      key: { shiftKey: !0, keyCode: "KeyR" },
      actionName: "Toggle Rulers",
      action: a
    });
    const h = () => {
      t.zoomManager.zoomToFit(), t.render();
    };
    t.keybindingManager.register({
      key: { shiftKey: !0, keyCode: "Digit1" },
      actionName: "Zoom To Fit",
      action: h
    });
    const l = () => {
      t.zoomManager.zoomToSelection(), t.render();
    };
    t.keybindingManager.register({
      key: { shiftKey: !0, keyCode: "Digit2" },
      actionName: "Zoom To Selection",
      action: l
    });
    const d = () => {
      t.zoomManager.zoomIn({ isLevelZoom: !0 }), t.render();
    };
    t.keybindingManager.register({
      key: [{ metaKey: !0, keyCode: "Equal" }, { keyCode: "Equal" }],
      winKey: { ctrlKey: !0, keyCode: "Equal" },
      actionName: "Zoom In",
      action: d
    });
    const u = () => {
      t.zoomManager.zoomOut({ isLevelZoom: !0 }), t.render();
    };
    t.keybindingManager.register({
      key: [{ metaKey: !0, keyCode: "Minus" }, { keyCode: "Minus" }],
      winKey: { ctrlKey: !0, keyCode: "Minus" },
      actionName: "Zoom Out",
      action: u
    });
    const p = () => {
      t.zoomManager.setZoomAndUpdateViewport(1), t.render();
    };
    t.keybindingManager.register({
      key: [
        { metaKey: !0, keyCode: "Digit0" },
        { shiftKey: !0, keyCode: "Digit0" }
      ],
      winKey: [
        { ctrlKey: !0, keyCode: "Digit0" },
        { shiftKey: !0, keyCode: "Digit0" }
      ],
      actionName: "Zoom To 100%",
      action: p
    });
    const m = () => {
      t.setting.set(
        "enablePixelGrid",
        !t.setting.get("enablePixelGrid")
      ), t.render();
    };
    t.keybindingManager.register({
      key: { metaKey: !0, keyCode: "Quote" },
      winKey: { ctrlKey: !0, keyCode: "Quote" },
      actionName: "Toggle Grid",
      action: m
    });
    const x = () => {
      t.setting.set("snapToGrid", !t.setting.get("snapToGrid")), t.render();
    };
    t.keybindingManager.register({
      key: { shiftKey: !0, metaKey: !0, keyCode: "Quote" },
      winKey: { shiftKey: !0, ctrlKey: !0, keyCode: "Quote" },
      actionName: "Snap To Grid",
      action: x
    });
    const y = () => {
      ts(t, Vt.Front), t.render();
    };
    t.keybindingManager.register({
      key: { keyCode: "BracketRight" },
      when: (D) => !D.isToolDragging,
      actionName: "Front",
      action: y
    });
    const S = () => {
      ts(t, Vt.Back), t.render();
    };
    t.keybindingManager.register({
      key: { keyCode: "BracketLeft" },
      when: (D) => !D.isToolDragging,
      actionName: "Back",
      action: S
    });
    const w = () => {
      ts(t, Vt.Forward), t.render();
    };
    t.keybindingManager.register({
      key: { metaKey: !0, keyCode: "BracketRight" },
      winKey: { ctrlKey: !0, keyCode: "BracketRight" },
      when: (D) => !D.isToolDragging,
      actionName: "Forward",
      action: w
    });
    const b = () => {
      ts(t, Vt.Backward), t.render();
    };
    t.keybindingManager.register({
      key: { metaKey: !0, keyCode: "BracketLeft" },
      winKey: { ctrlKey: !0, keyCode: "BracketLeft" },
      when: (D) => !D.isToolDragging,
      actionName: "Backward",
      action: b
    }), t.keybindingManager.register({
      key: { altKey: !0, keyCode: "KeyA" },
      when: (D) => !D.isToolDragging,
      actionName: "AlignLeft",
      action: () => {
        Be(t, nt.Left);
      }
    }), t.keybindingManager.register({
      key: { altKey: !0, keyCode: "KeyH" },
      when: (D) => !D.isToolDragging,
      actionName: "AlignHorizontalCenters",
      action: () => {
        Be(t, nt.HCenter);
      }
    }), t.keybindingManager.register({
      key: { altKey: !0, keyCode: "KeyD" },
      when: (D) => !D.isToolDragging,
      actionName: "AlignRight",
      action: () => {
        Be(t, nt.Right);
      }
    }), t.keybindingManager.register({
      key: { altKey: !0, keyCode: "KeyW" },
      when: (D) => !D.isToolDragging,
      actionName: "AlignTop",
      action: () => {
        Be(t, nt.Top);
      }
    }), t.keybindingManager.register({
      key: { altKey: !0, keyCode: "KeyV" },
      when: (D) => !D.isToolDragging,
      actionName: "AlignVerticalCenters",
      action: () => {
        Be(t, nt.VCenter);
      }
    }), t.keybindingManager.register({
      key: { altKey: !0, keyCode: "KeyS" },
      when: (D) => !D.isToolDragging,
      actionName: "AlignBottom",
      action: () => {
        Be(t, nt.Bottom);
      }
    });
    const C = () => {
      Xl(this.editor.selectedElements.getItems(), t), t.render();
    };
    t.keybindingManager.register({
      key: { metaKey: !0, keyCode: "KeyG" },
      winKey: { ctrlKey: !0, keyCode: "KeyG" },
      when: (D) => !D.isToolDragging,
      actionName: "Group",
      action: C
    });
    const I = () => {
      Zl(this.editor.selectedElements.getItems(), t), t.render();
    };
    t.keybindingManager.register({
      key: { metaKey: !0, keyCode: "Backspace" },
      winKey: { ctrlKey: !0, keyCode: "Backspace" },
      when: (D) => !D.isToolDragging,
      actionName: "Ungroup",
      action: I
    });
    const M = () => {
      Hr.toggleVisible(
        t,
        t.selectedElements.getItems()
      ), t.render();
    };
    t.keybindingManager.register({
      key: { metaKey: !0, shiftKey: !0, keyCode: "KeyH" },
      winKey: { ctrlKey: !0, shiftKey: !0, keyCode: "KeyH" },
      when: (D) => !D.isToolDragging,
      actionName: "Show/Hide",
      action: M
    });
    const E = () => {
      Hr.toggleLock(
        t,
        t.selectedElements.getItems()
      ), t.render();
    };
    t.keybindingManager.register({
      key: { metaKey: !0, shiftKey: !0, keyCode: "KeyL" },
      winKey: { ctrlKey: !0, shiftKey: !0, keyCode: "KeyL" },
      when: (D) => !D.isToolDragging,
      actionName: "Lock/Unlock",
      action: E
    });
    const T = () => {
      Vl(t, t.selectedElements.getItems()), t.render();
    };
    t.keybindingManager.register({
      key: { shiftKey: !0, keyCode: "KeyV" },
      winKey: { shiftKey: !0, keyCode: "KeyV" },
      when: (D) => !D.isToolDragging,
      actionName: "FlipVertical",
      action: T
    });
    const k = () => {
      Yl(t, t.selectedElements.getItems()), t.render();
    };
    t.keybindingManager.register({
      key: { shiftKey: !0, keyCode: "KeyH" },
      winKey: { shiftKey: !0, keyCode: "KeyH" },
      when: (D) => !D.isToolDragging,
      actionName: "FlipHorizontal",
      action: k
    });
    const L = () => {
      const D = t.selectedElements.getItems(), _ = [];
      let Y = !1;
      for (const j of D)
        pt(j) && j.isGroup() ? (_.push(...j.getChildren()), Y = !0) : _.push(j);
      Y && (t.selectedElements.setItems(_), t.render());
    }, W = () => {
      const D = t.selectedElements.size();
      if (!(t.pathEditor.isActive() || D === 0))
        if (D === 1) {
          const _ = t.selectedElements.getItems()[0];
          _ instanceof gt ? t.pathEditor.active(_) : _ instanceof ze ? t.textEditor.active({
            textGraphics: _,
            pos: _.getWorldPosition(),
            range: {
              start: 0,
              end: _.getContentLength()
            }
          }) : _ instanceof ze ? t.textEditor.active({
            textGraphics: _,
            pos: _.getWorldPosition()
          }) : pt(_) && _.isGroup() && L();
        } else
          L();
    };
    t.keybindingManager.register({
      key: { keyCode: "Enter" },
      when: (D) => !D.isToolDragging,
      actionName: "EnterGraphEdit",
      action: W
    });
  }
  destroy() {
    this.isBound = !1;
  }
}
class Ql {
  constructor(t) {
    g(this, "unbindHandler", xe);
    g(this, "hadBound", !1);
    g(this, "transaction");
    this.editor = t, this.transaction = new Z(t);
  }
  bindKey() {
    if (this.hadBound) {
      console.warn(
        "MoveGraphsKeyBinding had already bound, please unbind first"
      );
      return;
    }
    this.hadBound = !0;
    const t = this.editor;
    let e = !0;
    const n = Ia((d) => {
      this.editor.controlHandleManager.showCustomHandles(), e = !0;
      for (const u of d)
        this.transaction.update(u.attrs.id, {
          transform: A(u.attrs.transform)
        });
      this.editor.commandManager.enableRedoUndo(), this.transaction.commit("Move elements by direction key"), this.transaction = new Z(t);
    }, t.setting.get("moveElementsDelay")), i = () => {
      n.flush();
    }, r = {
      ArrowLeft: !1,
      ArrowRight: !1,
      ArrowUp: !1,
      ArrowDown: !1
    }, o = () => r.ArrowLeft || r.ArrowRight || r.ArrowUp || r.ArrowDown, a = (d) => {
      const u = t.selectedElements.getItems();
      if (u.length === 0 || (d.key in r && (r[d.key] = !0), !o())) return;
      if (e) {
        for (const m of u)
          this.transaction.recordOld(m.attrs.id, {
            transform: A(m.attrs.transform)
          });
        e = !1;
      }
      let p = t.setting.get("smallNudge");
      d.shiftKey && (p = t.setting.get("bigNudge")), r.ArrowLeft && X.dMove(u, -p, 0), r.ArrowRight && X.dMove(u, p, 0), r.ArrowUp && X.dMove(u, 0, -p), r.ArrowDown && X.dMove(u, 0, p), this.transaction.updateParentSize(u), this.editor.commandManager.disableRedoUndo(), this.editor.controlHandleManager.hideCustomHandles(), n(u), t.render();
    }, h = (d) => {
      const u = d.key;
      u in r && (r[u] = !1);
    }, l = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
    this.editor.keybindingManager.register({
      key: [
        ...l.map((d) => ({ keyCode: d })),
        ...l.map((d) => ({ shiftKey: !0, keyCode: d }))
      ],
      actionName: "Move Elements",
      action: a
    }), window.addEventListener("keyup", h), t.commandManager.on("beforeExecCmd", i), this.unbindHandler = () => {
      window.removeEventListener("keyup", h), t.commandManager.off("beforeExecCmd", i);
    };
  }
  destroy() {
    this.unbindHandler(), this.hadBound = !1;
  }
}
class td {
  constructor(t) {
    g(this, "isShiftPressing", !1);
    g(this, "isCtrlPressing", !1);
    g(this, "isAltPressing", !1);
    g(this, "isCommandPressing", !1);
    g(this, "isSpacePressing", !1);
    g(this, "isWheelBtnPressing", !1);
    g(this, "isDraggingCanvasBySpace", !1);
    g(this, "isEnableDelete", !0);
    g(this, "isEnableContextMenu", !0);
    // isEnableMoveSelectedElementByKey = true; // no use now
    g(this, "moveGraphsKeyBinding");
    g(this, "commandKeyBinding");
    g(this, "eventEmitter", new mt());
    g(this, "unbindHandlers", []);
    this.editor = t, this.moveGraphsKeyBinding = new Ql(t), this.commandKeyBinding = new Jl(t);
  }
  bindHotkeys() {
    this.observeModifiersToggle(), this.bindWheelEvent(), this.bindContextMenu(), this.moveGraphsKeyBinding.bindKey(), this.commandKeyBinding.bindKey();
  }
  observeModifiersToggle() {
    const t = (e) => {
      const n = this.isShiftPressing, i = this.isAltPressing, r = this.isSpacePressing;
      this.isShiftPressing = e.shiftKey, this.isCtrlPressing = e.ctrlKey, this.isAltPressing = e.altKey, this.isCommandPressing = e.metaKey, e.code === "Space" && (this.isSpacePressing = e.type === "keydown"), n !== this.isShiftPressing && this.eventEmitter.emit("shiftToggle", this.isShiftPressing), i !== this.isAltPressing && this.eventEmitter.emit("altToggle", this.isAltPressing), r !== this.isSpacePressing && this.eventEmitter.emit("spaceToggle", this.isSpacePressing);
    };
    document.addEventListener("keydown", t), document.addEventListener("keyup", t), this.unbindHandlers.push(() => {
      document.removeEventListener("keydown", t), document.removeEventListener("keyup", t);
    });
  }
  /**
   * shiftToggle 会在切换时触发。按住 shift 不放，只会触发一次
   */
  on(t, e) {
    this.eventEmitter.on(t, e);
  }
  off(t, e) {
    this.eventEmitter.off(t, e);
  }
  /**
   * bind wheel event, to zoom or move canvas
   */
  bindWheelEvent() {
    const t = this.editor, e = (i) => {
      if (i.ctrlKey || i.metaKey) {
        i.preventDefault();
        const r = this.editor.getCursorXY(i);
        let o = i.deltaY > 0;
        this.editor.setting.get("invertZoomDirection") && (o = !o), o ? t.zoomManager.zoomOut({
          center: r,
          deltaY: i.deltaY
        }) : t.zoomManager.zoomIn({
          center: r,
          deltaY: i.deltaY
        }), t.render();
      } else {
        if (this.editor.canvasDragger.isActive() && this.editor.canvasDragger.isPressing())
          return;
        const r = t.zoomManager.getZoom();
        t.viewportManager.translate(
          i.deltaX / r,
          i.deltaY / r
        ), t.render();
      }
    }, n = (i) => {
      (i.ctrlKey || i.metaKey) && i.preventDefault();
    };
    t.canvasElement.addEventListener("wheel", e), window.addEventListener("wheel", n, {
      passive: !1
    }), this.unbindHandlers.push(() => {
      t.canvasElement.removeEventListener("wheel", e), window.removeEventListener("wheel", n);
    });
  }
  bindContextMenu() {
    const t = (e) => {
      e.preventDefault(), this.isEnableContextMenu && this.eventEmitter.emit("contextmenu", { x: e.clientX, y: e.clientY });
    };
    this.editor.canvasElement.addEventListener("contextmenu", t), this.unbindHandlers.push(() => {
      this.editor.canvasElement.removeEventListener("contextmenu", t);
    });
  }
  enableDelete() {
    this.isEnableDelete = !0;
  }
  disableDelete() {
    this.isEnableDelete = !1;
  }
  enableContextmenu() {
    this.isEnableContextMenu = !0;
  }
  disableContextmenu() {
    this.isEnableContextMenu = !1;
  }
  destroy() {
    this.unbindHandlers.forEach((t) => t()), this.unbindHandlers = [], this.moveGraphsKeyBinding.destroy(), this.commandKeyBinding.destroy();
  }
}
var Ri = /* @__PURE__ */ ((s) => (s[s.Left = 0] = "Left", s[s.Mid = 1] = "Mid", s))(Ri || {});
class ed {
  constructor(t) {
    g(this, "isWheelBtnPressing", !1);
    g(this, "eventEmitter", new mt());
    g(this, "cursorPos", null);
    g(this, "startPos", { x: 0, y: 0 });
    g(this, "isPressing", !1);
    g(this, "maxDragDistance", 0);
    g(this, "onPointerdown", (t) => {
      if (t.target !== this.editor.canvasElement)
        return;
      this.updateIsWheelBtnPressing(t), this.isPressing = !0;
      const { pos: e, vwPos: n } = this.getPosAndVwPos(t);
      this.startPos = { ...e };
      const i = this.checkIfComboClick(t), r = {
        pos: e,
        vwPos: n,
        nativeEvent: t,
        isComboClick: i
      };
      this.eventEmitter.emit("start", r), i && this.eventEmitter.emit("comboClick", r);
    });
    g(this, "onPointerMove", (t) => {
      const e = t.target === this.editor.canvasElement;
      if (e || this.isPressing) {
        const r = this.editor.getSceneCursorXY(t);
        this.setCursorPos(r);
      }
      const { pos: n, vwPos: i } = this.getPosAndVwPos(t);
      if (this.isPressing) {
        const r = n.x - this.startPos.x, o = n.y - this.startPos.y, a = Math.max(Math.abs(r), Math.abs(o));
        this.maxDragDistance = Math.max(a, this.maxDragDistance), this.eventEmitter.emit("drag", {
          pos: n,
          vwPos: i,
          nativeEvent: t,
          isOutside: e,
          maxDragDistance: this.maxDragDistance
        });
      } else
        this.eventEmitter.emit("move", {
          pos: n,
          vwPos: i,
          nativeEvent: t,
          isOutside: e,
          maxDragDistance: this.maxDragDistance
        });
    });
    g(this, "onPointerUp", (t) => {
      this.updateIsWheelBtnPressing(t), this.isPressing = !1, this.maxDragDistance = 0, (t.target === this.editor.canvasElement || this.isPressing) && this.eventEmitter.emit("end", {
        ...this.getPosAndVwPos(t),
        nativeEvent: t
      });
    });
    g(this, "pointerDownTimeStamp", -1 / 0);
    g(this, "lastPointerDownPos", { x: -99, y: -99 });
    g(this, "checkIfComboClick", (t) => {
      if (t.button !== 0)
        return !1;
      const e = (/* @__PURE__ */ new Date()).getTime(), n = {
        x: t.pageX,
        y: t.pageY
      }, i = e - this.pointerDownTimeStamp, r = q(n, this.lastPointerDownPos);
      return i < this.editor.setting.get("comboClickMaxGap") && r < this.editor.setting.get("comboClickDistanceTol") ? (this.pointerDownTimeStamp = e, !0) : (this.pointerDownTimeStamp = e, this.lastPointerDownPos = n, !1);
    });
    this.editor = t, this.bindEvent();
  }
  getCursorPos() {
    return A(this.cursorPos);
  }
  setCursorPos(t) {
    const e = this.cursorPos;
    this.cursorPos = t && { x: t.x, y: t.y }, vn(e, this.cursorPos) || this.eventEmitter.emit("cursorPosUpdate", A(t));
  }
  getPosAndVwPos(t) {
    const e = this.editor.getCursorXY(t);
    return {
      pos: this.editor.toScenePt(e.x, e.y),
      vwPos: e
    };
  }
  updateIsWheelBtnPressing(t) {
    if (t.button === 1) {
      const e = this.isWheelBtnPressing;
      t.type === "pointerdown" ? this.isWheelBtnPressing = !0 : t.type === "pointerup" && (this.isWheelBtnPressing = !1), e !== this.isWheelBtnPressing && this.eventEmitter.emit(
        "wheelBtnToggle",
        this.isWheelBtnPressing,
        t
      );
    }
  }
  bindEvent() {
    window.addEventListener("pointerdown", this.onPointerdown), window.addEventListener("pointermove", this.onPointerMove), window.addEventListener("pointerup", this.onPointerUp);
  }
  unbindEvent() {
    window.removeEventListener("pointerdown", this.onPointerdown), window.removeEventListener("pointermove", this.onPointerMove), window.removeEventListener("pointerup", this.onPointerUp);
  }
  destroy() {
    this.unbindEvent();
  }
  on(t, e) {
    this.eventEmitter.on(t, e);
  }
  off(t, e) {
    this.eventEmitter.off(t, e);
  }
}
class nd {
  constructor(t) {
    g(this, "_active", !1);
    g(this, "inactiveAfterPointerUp", !1);
    g(this, "isEnableDragCanvasBySpace", !0);
    g(this, "_isPressing", !1);
    g(this, "startVwPos", { x: 0, y: 0 });
    g(this, "startViewportPos", { x: 0, y: 0 });
    g(this, "eventEmitter", new mt());
    g(this, "handleSpaceToggle", (t) => {
      this.isEnableDragCanvasBySpace && (t ? this.active() : this.inactive());
    });
    g(this, "handleWheelBtnToggle", (t, e) => {
      this.isEnableDragCanvasBySpace && (t ? this.active(e) : this.inactive());
    });
    g(this, "onStart", (t) => {
      t.nativeEvent.button !== Ri.Left && t.nativeEvent.button !== Ri.Mid || (this.editor.textEditor.isActive() && t.nativeEvent.preventDefault(), this.editor.cursorManager.setCursor("grabbing"), this._isPressing = !0, this.startVwPos = { ...t.vwPos }, this.startViewportPos = this.editor.viewportManager.getViewport());
    });
    g(this, "onDrag", (t) => {
      if (!this._isPressing) return;
      const e = t.vwPos.x - this.startVwPos.x, n = t.vwPos.y - this.startVwPos.y, i = this.editor.setting.get("dragBlockStep"), r = this.editor.zoomManager.getZoom();
      if (t.maxDragDistance > i / r) {
        const o = this.startViewportPos.x - e / r, a = this.startViewportPos.y - n / r;
        this.editor.viewportManager.setViewport({ x: o, y: a }), this.editor.render();
      }
    });
    g(this, "onEnd", () => {
      this.editor.cursorManager.setCursor("grab"), this._isPressing = !1, this.inactiveAfterPointerUp && (this.inactiveAfterPointerUp = !1, this.inactive());
    });
    this.editor = t, this.editor.hostEventManager.on("spaceToggle", this.handleSpaceToggle), this.editor.mouseEventManager.on(
      "wheelBtnToggle",
      this.handleWheelBtnToggle
    );
  }
  isPressing() {
    return this._isPressing;
  }
  isActive() {
    return this._active;
  }
  /**
   * active canvas dragger
   * if event is not undefined, will active and start dragging immediately
   */
  active(t) {
    if (this._active) {
      console.warn("CanvasDragger already active");
      return;
    }
    if (this.eventEmitter.emit("activeChange", !0), this._active = !0, this.editor.setCursor("grab"), this.bindEventWhenActive(), t) {
      this.editor.setCursor("grabbing");
      const e = this.editor.getCursorXY(t);
      this.onStart({
        pos: this.editor.toScenePt(e.x, e.y),
        vwPos: e,
        nativeEvent: t
      });
    }
  }
  inactive() {
    if (this._isPressing)
      this.inactiveAfterPointerUp = !0;
    else {
      if (!this._active)
        return;
      this.eventEmitter.emit("activeChange", !1), this._active = !1, this.unbindEventWhenInactive(), this.editor.toolManager.setCursorWhenActive();
    }
  }
  enableDragBySpace() {
    this.isEnableDragCanvasBySpace = !0;
  }
  disableDragBySpace() {
    this.isEnableDragCanvasBySpace = !1;
  }
  bindEventWhenActive() {
    this.editor.mouseEventManager.on("start", this.onStart), this.editor.mouseEventManager.on("drag", this.onDrag), this.editor.mouseEventManager.on("end", this.onEnd);
  }
  unbindEventWhenInactive() {
    this.editor.mouseEventManager.off("start", this.onStart), this.editor.mouseEventManager.off("drag", this.onDrag), this.editor.mouseEventManager.off("end", this.onEnd);
  }
  destroy() {
    this.editor.hostEventManager.off("spaceToggle", this.handleSpaceToggle), this.editor.mouseEventManager.off(
      "wheelBtnToggle",
      this.handleWheelBtnToggle
    ), this.unbindEventWhenInactive();
  }
  on(t, e) {
    this.eventEmitter.on(t, e);
  }
  off(t, e) {
    this.eventEmitter.off(t, e);
  }
}
class Ge extends X {
  constructor(e, n) {
    super({ ...e, type: G.Canvas }, n);
    g(this, "type", G.Canvas);
    g(this, "isContainer", !0);
  }
  getWorldTransform() {
    return Ei();
  }
  getHitGraphics(e, n) {
    const i = this.getChildren();
    for (let r = i.length - 1; r >= 0; r--) {
      const a = i[r].getHitGraphics(e, n);
      if (a)
        return a;
    }
    return null;
  }
  shouldSkipDraw() {
    return !1;
  }
}
const Uo = (s) => s instanceof Ge, sd = (s) => {
  const t = Ut(
    s.map((a) => a.getBboxWithStroke())
  ), e = jt(t), n = {
    x: -t.minX,
    y: -t.minY
  }, i = `<svg width="${e.width}" height="${e.height}" viewBox="0 0 ${e.width} ${e.height}" fill="none" xmlns="http://www.w3.org/2000/svg">
`, r = "</svg>";
  let o = "";
  for (const a of s)
    o += a.toSVGSegment(n);
  return i + o + r;
};
class id {
  constructor(t) {
    g(this, "unbindEvents", xe);
    g(this, "hasBindEvents", !1);
    this.editor = t;
  }
  bindEvents() {
    if (this.hasBindEvents) {
      console.log("ClipboardManager has bind events, please destroy first");
      return;
    }
    this.hasBindEvents = !0;
    const t = () => {
      this.copy();
    }, e = (n) => {
      const r = n.clipboardData;
      if (!r || this.editor.textEditor.isActive() || (n.target instanceof HTMLInputElement || n.target instanceof HTMLTextAreaElement) && !this.editor.textEditor.isEditorInputDom(n.target))
        return;
      if (r.files.length > 0) {
        for (const a of r.files)
          if (a.type.includes("image")) {
            const h = new FileReader();
            h.onload = (l) => {
              var u;
              const d = (u = l.target) == null ? void 0 : u.result;
              this.createGraphicsWithImg(d);
            }, h.readAsDataURL(a);
          }
        return;
      }
      const o = r.getData("Text");
      this.addGraphsFromClipboard(o);
    };
    this.editor.keybindingManager.register({
      key: { metaKey: !0, keyCode: "KeyC" },
      winKey: { ctrlKey: !0, keyCode: "KeyC" },
      actionName: "Copy",
      action: t
    }), window.addEventListener("paste", e), this.unbindEvents = () => {
      window.removeEventListener("paste", e);
    };
  }
  async createGraphicsWithImg(t) {
    const e = this.editor;
    await e.imgManager.addImg(t);
    const n = e.imgManager.getImg(t), i = e.viewportManager.getCenter();
    if (n) {
      const r = new dt(
        {
          objectName: "",
          width: n.width,
          height: n.height,
          fill: [{ type: B.Image, attrs: { src: t } }]
        },
        {
          advancedAttrs: {
            x: i.x - n.width / 2,
            y: i.y - n.height / 2
          },
          doc: e.doc
        }
      );
      e.sceneGraph.addItems([r]), e.doc.getCanvas().insertChild(r), e.render();
    }
  }
  copy() {
    const t = this.getSelectedItemsSnapshot();
    t && navigator.clipboard.writeText(t).then(() => {
      console.log("copied");
    });
  }
  copyAsSVG() {
    const t = this.editor.selectedElements.getItems();
    if (t.length === 0)
      return;
    const e = sd(t);
    navigator.clipboard.writeText(e).then(() => {
      console.log("SVG copied");
    });
  }
  /**
   * paste at special coords
   */
  pasteAt(t) {
    navigator.clipboard.readText().then((e) => {
      this.addGraphsFromClipboard(e, t);
    });
  }
  getSelectedItemsSnapshot() {
    const t = X.sortGraphics(
      this.editor.selectedElements.getItems()
    );
    if (t.length === 0)
      return null;
    const e = Fc(), n = /* @__PURE__ */ new Map(), i = [];
    for (const o of t) {
      const a = o.getAttrs();
      a.transform = o.getWorldTransform(), a.parentIndex = void 0;
      const h = e();
      n.set(a.id, h), a.id = h, i.push(a);
    }
    const r = Es(t);
    for (const o of r) {
      const a = o.getAttrs(), h = e();
      n.set(a.id, h), a.id = h, a.parentIndex && (a.parentIndex.guid = n.get(a.parentIndex.guid)), i.push(a);
    }
    return JSON.stringify({
      appVersion: this.editor.appVersion,
      paperId: this.editor.paperId,
      data: i
    });
  }
  /**
   * update parentIndex.guid and transform for attributes array
   * @param attrsArr attribute array
   * @returns top parent count
   */
  updateAttrsParentIndex(t) {
    let e = null, n = null;
    const i = X.sortGraphics(this.editor.selectedElements.getItems()).at(
      -1
    ) ?? this.editor.doc.getCurrCanvas();
    let r = i;
    if (Uo(i) || pt(i))
      e = i.getMaxChildIndex();
    else {
      r = i.getParent(), e = i.getSortIndex();
      const p = i.getNextSibling();
      n = p ? p.getSortIndex() : null;
    }
    const o = r.attrs.id, a = Rt(r.getWorldTransform());
    let h = 0;
    for (; h < t.length && !t[h].parentIndex; )
      h++;
    const l = h, d = we(e, n, l), u = /* @__PURE__ */ new Map();
    for (let p = 0; p < l; p++) {
      const m = t[p];
      m.parentIndex = {
        guid: o,
        position: d[p]
      };
      const x = pn();
      u.set(m.id, x), m.id = x, m.transform = vt(a, m.transform);
    }
    for (; h < t.length; ) {
      const p = t[h], m = pn();
      u.set(p.id, m), p.id = m, p.parentIndex.guid = u.get(p.parentIndex.guid), h++;
    }
    return l;
  }
  addGraphsFromClipboard(t, e) {
    let n = null;
    try {
      n = JSON.parse(t);
    } catch {
      return;
    }
    if (!(n && typeof n == "object" && n.appVersion.startsWith("suika-editor") && n.data))
      return;
    const i = this.editor;
    if (n.data.length === 0)
      return;
    const r = this.updateAttrsParentIndex(n.data), o = i.sceneGraph.createGraphicsArr(
      n.data
    );
    i.sceneGraph.addItems(o), i.sceneGraph.initGraphicsTree(o);
    const a = o.slice(0, r);
    i.selectedElements.setItems(a);
    const h = jt(
      Ut(a.map((d) => d.getBbox()))
    );
    if (!e && n.paperId !== i.paperId) {
      const d = this.editor.viewportManager.getCenter();
      e = {
        x: d.x - h.width / 2,
        y: d.y - h.height / 2
      };
    }
    if (e) {
      const d = e.x - h.x, u = e.y - h.y;
      (d || u) && X.dMove(a, d, u);
    }
    new Z(i).addNewIds(o.map((d) => d.attrs.id)).updateParentSize(a).commit("pasted graphs"), i.render();
  }
  destroy() {
    this.hasBindEvents = !1, this.unbindEvents();
  }
}
const rd = (s) => `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_1139_2)" transform="rotate(${s} 16 16)"><path d="M4.38452 17.3499L9.68782 16.9963L7.78571 15.0942C8.84801 14.0319 10.1091 13.1892 11.4971 12.6143C12.8851 12.0394 14.3727 11.7435 15.875 11.7435C17.3773 11.7435 18.8649 12.0394 20.2529 12.6143C21.6409 13.1892 22.902 14.0319 23.9643 15.0942L22.0622 16.9963L27.3655 17.3499L27.0119 12.0466L25.0674 13.9911C23.8602 12.784 22.4271 11.8264 20.8499 11.1731C19.2727 10.5198 17.5822 10.1835 15.875 10.1835C14.1678 10.1835 12.4774 10.5198 10.9001 11.1731C9.32289 11.8264 7.88978 12.784 6.68262 13.9911L4.73807 12.0466L4.38452 17.3499Z" fill="#000000"/><path d="M9.72108 17.4952L10.8205 17.4219L10.0414 16.6428L8.5009 15.1023C9.43698 14.2481 10.5153 13.5622 11.6884 13.0763C13.0158 12.5265 14.4383 12.2435 15.875 12.2435C17.3117 12.2435 18.7343 12.5265 20.0616 13.0763C21.2347 13.5622 22.313 14.2481 23.2491 15.1023L21.7086 16.6428L20.9295 17.4219L22.0289 17.4952L27.3322 17.8488L27.9024 17.8868L27.8644 17.3166L27.5108 12.0133L27.4375 10.9139L26.6584 11.693L25.0608 13.2906C23.8859 12.1996 22.525 11.3257 21.0412 10.7111C19.4033 10.0327 17.6479 9.68351 15.875 9.68351C14.1022 9.68351 12.3467 10.0327 10.7088 10.7111C9.22503 11.3257 7.86411 12.1996 6.68917 13.2906L5.09163 11.693L4.31248 10.9139L4.23918 12.0133L3.88563 17.3166L3.84762 17.8868L4.41778 17.8488L9.72108 17.4952Z" stroke="white"/></g><defs><filter id="filter0_d_1139_2" x="1.3107" y="7.18351" width="29.1286" height="13.2402" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="1"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1139_2"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1139_2" result="shape"/></filter></defs></svg>`, od = (s) => `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_1173_45)" transform="rotate(${s} 16 16)"><path d="M16 6L12.5 10H19.5L16 6Z" fill="#000000"/><path d="M16 26L12.5 22H19.5L16 26Z" fill="#000000"/><path d="M15.25 10H16.75V22H15.25V10Z" fill="#000000"/><path d="M12.1237 9.67075L11.3981 10.5H12.5H14.75V21.5H12.5H11.3981L12.1237 22.3293L15.6237 26.3293L16 26.7593L16.3763 26.3293L19.8763 22.3293L20.6019 21.5H19.5H17.25V10.5H19.5H20.6019L19.8763 9.67075L16.3763 5.67075L16 5.2407L15.6237 5.67075L12.1237 9.67075Z" stroke="white"/></g><defs><filter id="filter0_d_1173_45" x="8.29623" y="2.48141" width="15.4075" height="27.0372" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="1"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1173_45"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1173_45" result="shape"/></filter></defs></svg>`, wi = /* @__PURE__ */ new Map(), ad = (s, t) => {
  const e = s + t;
  if (wi.has(e))
    return wi.get(e);
  let n = "";
  switch (s) {
    case "resize":
      n = od(t);
      break;
    case "rotation":
      n = rd(t);
      break;
    default:
      console.warn("getIconSvgDataUrl: unknown type", s);
  }
  const i = `url("data:image/svg+xml,${n.replace(/"/g, "'").replace(/#/g, "%23")}") 16 16, auto`;
  return wi.set(e, i), i;
};
class hd {
  constructor(t) {
    g(this, "cursor");
    // the cursors with custom style, need to add class to canvas element
    g(this, "customClassCursor", /* @__PURE__ */ new Set([
      "default",
      "move",
      "move-ns",
      "move-ew",
      "pen",
      "pen-close",
      "pen-anchor-remove",
      "pen-anchor-add",
      "crosshair",
      "pencil"
    ]));
    this.editor = t, this.setCursor("default");
  }
  getCursor() {
    return this.cursor;
  }
  normalizeCursor(t) {
    return typeof t == "string" ? t : t.type === "resize" ? {
      type: t.type,
      // degree: 0 ~ 179. e.g 0 is from top to bottom , 90 is from left to right
      degree: Ti(t.degree) % 180
    } : t.type === "rotation" ? {
      type: t.type,
      degree: Ti(Math.round(t.degree))
    } : t;
  }
  setCursor(t) {
    if (t = this.normalizeCursor(t), vn(t, this.cursor))
      return;
    this.cursor = t;
    const e = "suika-cursor-", n = this.editor.canvasElement;
    if (n.classList.forEach((i) => {
      i.startsWith(e) && n.classList.remove(i);
    }), this.editor.canvasElement.style.cursor = "", this.customClassCursor.has(t)) {
      const i = `${e}${t}`;
      this.editor.canvasElement.classList.add(i);
    } else typeof t == "string" ? this.editor.canvasElement.style.cursor = t : (t.type === "resize" || t.type === "rotation") && (this.editor.canvasElement.style.cursor = ad(
      t.type,
      t.degree
    ));
  }
}
const cd = (s) => typeof s == "object" && (s == null ? void 0 : s.type) === "rotation";
class ld {
  constructor() {
    g(this, "graphicsStore", /* @__PURE__ */ new Map());
    g(this, "canvasStore", /* @__PURE__ */ new Map());
    g(this, "frameStore", /* @__PURE__ */ new Map());
  }
  add(t) {
    const e = t.attrs.id, n = this.graphicsStore;
    n.has(e) && console.warn(`graphics ${e} has added`), t instanceof Ge ? this.canvasStore.set(e, t) : t instanceof Mn && this.frameStore.set(e, t), n.set(e, t);
  }
  get(t) {
    return this.graphicsStore.get(t);
  }
  getAll() {
    const t = [];
    for (const [, e] of this.graphicsStore)
      e.isDeleted() || t.push(e);
    return t;
  }
  getCanvas() {
    return Array.from(this.canvasStore.values())[0];
  }
  getFrames() {
    return Array.from(this.frameStore.values());
  }
  clear() {
    this.graphicsStore.clear(), this.canvasStore.clear(), this.frameStore.clear();
  }
}
class Zo extends X {
  constructor(e) {
    super({ ...e, type: G.Document }, {});
    g(this, "type", G.Document);
    g(this, "isContainer", !0);
    g(this, "graphicsStoreManager", new ld());
    g(this, "emitter", new mt());
    g(this, "changes", {
      added: /* @__PURE__ */ new Map(),
      deleted: /* @__PURE__ */ new Set(),
      updatedIds: /* @__PURE__ */ new Set()
    });
    g(this, "editor");
    g(this, "emitSceneChangeThrottle", $i(
      () => {
        const e = this.flushChanges();
        this.emitter.emit("sceneChange", e, "unknown");
      },
      100
      // { leading: false },
    ));
  }
  setEditor(e) {
    this.editor = e;
  }
  clear() {
    this.graphicsStoreManager.clear();
  }
  getCanvas() {
    return this.graphicsStoreManager.getCanvas();
  }
  getGraphicsById(e) {
    return this.graphicsStoreManager.get(e);
  }
  getGraphicsArrByIds(e) {
    const n = [];
    for (const i of e) {
      const r = this.getGraphicsById(i);
      if (!r) {
        console.warn(`id ${i} is no exist in graphics array`);
        continue;
      }
      n.push(r);
    }
    return n;
  }
  getAllGraphicsArr() {
    return this.graphicsStoreManager.getAll();
  }
  getCurrCanvas() {
    return this.graphicsStoreManager.getCanvas();
  }
  addGraphics(e) {
    this.graphicsStoreManager.add(e), this.changes.added.set(e.attrs.id, e.getAttrs()), this.emitSceneChangeThrottle();
  }
  collectDeletedGraphics(e) {
    const n = e.attrs.id;
    e.isDeleted() ? (this.changes.deleted.add(n), this.changes.added.delete(n)) : (this.changes.deleted.delete(n), this.changes.added.set(n, e.getAttrs())), this.emitSceneChangeThrottle();
  }
  collectUpdatedGraphics(e) {
    this.changes.updatedIds.add(e), this.emitSceneChangeThrottle();
  }
  flushChanges() {
    const e = /* @__PURE__ */ new Map();
    for (const i of this.changes.updatedIds) {
      const r = this.getGraphicsById(i);
      if (!r) {
        console.warn(`graphics ${i} is lost!`);
        continue;
      }
      e.set(i, r.getUpdatedAttrs());
    }
    const n = {
      added: this.changes.added,
      deleted: this.changes.deleted,
      update: e
    };
    return this.clearChanges(), n;
  }
  clearChanges() {
    this.changes = {
      added: /* @__PURE__ */ new Map(),
      deleted: /* @__PURE__ */ new Set(),
      updatedIds: /* @__PURE__ */ new Set()
    };
  }
  getDeviceViewSize() {
    const e = this.editor.canvasElement;
    return {
      width: e.width,
      height: e.height
    };
  }
  on(e, n) {
    this.emitter.on(e, n);
  }
  off(e, n) {
    this.emitter.off(e, n);
  }
}
class dd {
  constructor() {
    g(this, "eventEmitter", new mt());
    g(this, "imgMap", /* @__PURE__ */ new Map());
    g(this, "loadingImgSet", /* @__PURE__ */ new Set());
  }
  async addImg(t) {
    if (this.loadingImgSet.has(t) || this.getImg(t))
      return;
    const e = new Image();
    e.src = t, await new Promise((n) => {
      e.onload = () => {
        this.loadingImgSet.delete(t), this.imgMap.set(t, e), this.eventEmitter.emit("added", e), n(e);
      };
    });
  }
  getImg(t) {
    return this.imgMap.get(t);
  }
  on(t, e) {
    this.eventEmitter.on(t, e);
  }
  off(t, e) {
    this.eventEmitter.off(t, e);
  }
}
const Lr = (s) => {
  const {
    ctrlKey: t = !1,
    shiftKey: e = !1,
    altKey: n = !1,
    metaKey: i = !1
  } = s;
  return `${t ? "ctrl+" : ""}${i ? "meta+" : ""}${e ? "shift+" : ""}${n ? "alt+" : ""}${s.code}`;
};
class gd {
  constructor(t) {
    g(this, "keyBindingMap", /* @__PURE__ */ new Map());
    g(this, "isBound", !1);
    g(this, "id", 0);
    g(this, "handleAction", (t) => {
      if (t.altKey && t.preventDefault(), t.target instanceof HTMLInputElement || t.target instanceof HTMLTextAreaElement)
        return;
      let e = !1;
      const n = {
        isToolDragging: this.editor.toolManager.isDragging()
      };
      for (const i of this.keyBindingMap.values())
        if ((!i.when || i.when(n)) && (Vc() && i.winKey ? this.isKeyMatch(i.winKey, t) && (e = !0) : this.isKeyMatch(i.key, t) && (e = !0)), e) {
          t.preventDefault(), console.log(`[${Lr(t)}] => ${i.actionName}`), i.action(t);
          break;
        }
      e || console.log(`[${Lr(t)}] => no match`);
    });
    this.editor = t;
  }
  isKeyMatch(t, e) {
    if (Array.isArray(t))
      return t.some((a) => this.isKeyMatch(a, e));
    if (t.keyCode == "*") return !0;
    const {
      ctrlKey: n = !1,
      shiftKey: i = !1,
      altKey: r = !1,
      metaKey: o = !1
    } = t;
    return n == e.ctrlKey && i == e.shiftKey && r == e.altKey && o == e.metaKey && t.keyCode == e.code;
  }
  register(t) {
    const e = this.id;
    return this.keyBindingMap.set(e, t), this.id++, e;
  }
  registerWithHighPrior(t) {
    const e = this.id, n = /* @__PURE__ */ new Map();
    n.set(e, t);
    for (const [i, r] of this.keyBindingMap)
      n.set(i, r);
    return this.keyBindingMap = n, this.id++, e;
  }
  unregister(t) {
    this.keyBindingMap.delete(t);
  }
  bindEvent() {
    this.isBound || (this.isBound = !0, document.addEventListener("keydown", this.handleAction));
  }
  destroy() {
    this.isBound && (this.keyBindingMap.clear(), document.removeEventListener("keydown", this.handleAction));
  }
}
const qi = (s, t) => {
  const e = /* @__PURE__ */ new Set();
  for (const a of t)
    a.removeFromParent(), a.setDeleted(!0), e.add(a.attrs.id);
  const n = ie(t);
  for (const a of n) {
    const h = s.doc.getGraphicsById(a);
    h.isEmpty() && (h.removeFromParent(), h.setDeleted(!0), e.add(a));
  }
  const i = Es(t);
  for (const a of i)
    a.setDeleted(!0), e.add(a.attrs.id);
  const r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  xn(s, n, r, o), s.commandManager.pushCommand(
    new Ps(
      "remove graphics",
      s,
      r,
      o,
      e
    )
  );
}, Wr = "dragCanvas", zr = "h";
class us {
  constructor(t) {
    g(this, "type", Wr);
    g(this, "hotkey", zr);
    g(this, "cursor", "grab");
    this.editor = t;
  }
  onActive() {
    this.editor.canvasDragger.disableDragBySpace(), this.editor.canvasDragger.active();
  }
  onInactive() {
    this.editor.canvasDragger.inactive(), this.editor.canvasDragger.enableDragBySpace();
  }
  onMoveExcludeDrag() {
  }
  onStart() {
  }
  onDrag() {
  }
  onEnd() {
  }
  afterEnd() {
    this.editor.canvasDragger.disableDragBySpace();
  }
}
g(us, "type", Wr), g(us, "hotkey", zr);
const ns = {
  /**
   * support grid snap
   *
   * TODO:
   * objects snap
   * polar tracking snap
   * ortho
   * ruler ref line snap
   */
  getSnapPtBySetting(s, t) {
    if (s = { x: s.x, y: s.y }, t.get("snapToGrid")) {
      const n = {
        x: t.get("gridSnapX"),
        y: t.get("gridSnapY")
      };
      return this.getGridSnapPt(s, n);
    }
    return s;
  },
  getGridSnapPt(s, t) {
    return {
      x: Q(s.x, t.x),
      y: Q(s.y, t.y)
    };
  }
};
class Xt {
  constructor(t) {
    g(this, "type", "");
    g(this, "hotkey", "");
    g(this, "cursor", "crosshair");
    g(this, "commandDesc", "Add Graphics");
    g(this, "drawingGraphics", null);
    g(this, "startPoint", { x: -1, y: -1 });
    g(this, "lastDragPoint");
    g(this, "lastDragPointInViewport");
    /** lastPoint with snap when dragging */
    g(this, "lastMousePoint");
    /**
     * use to calculate the offset, to change the graphics's start point
     */
    g(this, "startPointWhenSpaceDown", null);
    g(this, "lastDragPointWhenSpaceDown", null);
    g(this, "isDragging", !1);
    g(this, "unbindEvent", xe);
    this.editor = t;
  }
  onActive() {
    const t = this.editor, e = t.hostEventManager, n = () => {
      this.isDragging && this.updateRect();
    };
    e.on("shiftToggle", n);
    const i = () => {
      t.hostEventManager.isDraggingCanvasBySpace || this.isDragging && this.editor.setting.get("snapToObjects") && this.editor.refLine.cacheGraphicsRefLines({
        excludeItems: this.editor.selectedElements.getItems()
      });
    }, r = () => {
      t.hostEventManager.isDraggingCanvasBySpace || this.isDragging && (this.lastDragPoint = t.toScenePt(
        this.lastDragPointInViewport.x,
        this.lastDragPointInViewport.y,
        this.editor.setting.get("snapToGrid")
      ), this.updateRect());
    };
    t.viewportManager.on(
      "xOrYChange",
      i
    ), t.viewportManager.on("xOrYChange", r), this.unbindEvent = () => {
      e.off("shiftToggle", n), t.viewportManager.off(
        "xOrYChange",
        i
      ), t.viewportManager.off("xOrYChange", r);
    };
  }
  onSpaceToggle(t) {
    this.isDragging && t ? (this.startPointWhenSpaceDown = this.startPoint, this.lastDragPointWhenSpaceDown = this.lastMousePoint, this.updateRect()) : (this.startPointWhenSpaceDown = null, this.lastDragPointWhenSpaceDown = null);
  }
  onAltToggle() {
    this.isDragging && this.updateRect();
  }
  onInactive() {
    this.unbindEvent();
  }
  onMoveExcludeDrag() {
  }
  onStart(t) {
    this.startPoint = ns.getSnapPtBySetting(
      this.editor.getSceneCursorXY(t),
      this.editor.setting
    ), this.drawingGraphics = null, this.isDragging = !1, this.startPointWhenSpaceDown = null, this.lastDragPointWhenSpaceDown = null;
  }
  onDrag(t) {
    if (this.editor.hostEventManager.disableDelete(), this.editor.hostEventManager.disableContextmenu(), this.editor.hostEventManager.isDraggingCanvasBySpace)
      return;
    this.lastDragPointInViewport = this.editor.getCursorXY(t), this.lastDragPoint = this.lastMousePoint = ns.getSnapPtBySetting(
      this.editor.getSceneCursorXY(t),
      this.editor.setting
    ), !this.isDragging && this.editor.setting.get("snapToObjects") && this.editor.refLine.cacheGraphicsRefLines();
    const e = this.editor.refLine.getGraphicsSnapOffset([
      this.lastDragPoint
    ]);
    this.lastDragPoint = {
      x: this.lastDragPoint.x + e.x,
      y: this.lastDragPoint.y + e.y
    }, this.isDragging = !0, this.updateRect();
  }
  adjustSizeWhenShiftPressing(t) {
    const { width: e, height: n } = t, i = Math.max(Math.abs(e), Math.abs(n));
    return t.height = (Math.sign(n) || 1) * i, t.width = (Math.sign(e) || 1) * i, t;
  }
  /**
   * update graphics, and give the original rect (width may be negative)
   */
  updateGraphics(t) {
    t = Se(t);
    const e = this.drawingGraphics, n = e.getParent();
    let i = t.x, r = t.y;
    if (n && pt(n)) {
      const o = n.getWorldTransform(), a = Yi(o, t);
      i = a.x, r = a.y;
    }
    e.updateAttrs({
      x: i,
      y: r,
      width: t.width,
      height: t.height
    });
  }
  /** update drawing rect object */
  updateRect() {
    if (!this.isDragging) return;
    const { x: t, y: e } = this.lastDragPoint, n = this.editor.sceneGraph;
    if (this.startPointWhenSpaceDown && this.lastDragPointWhenSpaceDown) {
      const { x: m, y: x } = this.startPointWhenSpaceDown, { x: y, y: S } = this.lastDragPointWhenSpaceDown, w = t - y, b = e - S;
      this.startPoint = {
        x: m + w,
        y: x + b
      };
    }
    const { x: i, y: r } = this.startPoint;
    let o = t - i, a = e - r;
    if (o === 0 || a === 0) {
      const m = this.solveWidthOrHeightIsZero(
        { width: o, height: a },
        {
          x: this.lastMousePoint.x - this.startPoint.x,
          y: this.lastMousePoint.y - this.startPoint.y
        }
      );
      o = m.width, a = m.height;
    }
    let h = {
      x: i,
      y: r,
      width: o,
      // width may be negative
      height: a
      // height may be negative
    };
    const l = this.editor.hostEventManager.isAltPressing, d = this.editor.hostEventManager.isShiftPressing;
    let u = 0, p = 0;
    if (l && (h = {
      x: h.x - o,
      y: h.y - a,
      width: h.width * 2,
      height: h.height * 2
    }, u = h.x + h.width / 2, p = h.y + h.height / 2), d && (h = this.adjustSizeWhenShiftPressing(h)), l && (h.x = u - h.width / 2, h.y = p - h.height / 2), this.drawingGraphics)
      this.updateGraphics(h);
    else {
      const m = this.editor.doc.getCurrCanvas(), x = yn(
        this.startPoint,
        m.getChildren()
      ), y = x || m, S = this.createGraphics(h, y);
      if (this.drawingGraphics = S, !S)
        return;
      if (n.addItems([S]), y.insertChild(S), x) {
        const w = [...S.attrs.transform];
        S.setWorldTransform(w);
      }
      this.editor.selectedElements.setItems([S]);
    }
    this.editor.render();
  }
  solveWidthOrHeightIsZero(t, e) {
    const n = { width: t.width, height: t.height };
    if (t.width === 0) {
      const i = Math.sign(e.x) || 1;
      n.width = i * this.editor.setting.get("gridSnapX");
    }
    if (t.height === 0) {
      const i = Math.sign(e.y) || 1;
      n.height = i * this.editor.setting.get("gridSnapY");
    }
    return n;
  }
  onEnd(t) {
    if (this.editor.hostEventManager.isDraggingCanvasBySpace)
      return;
    const e = ns.getSnapPtBySetting(
      this.editor.getSceneCursorXY(t),
      this.editor.setting
    );
    if (this.drawingGraphics === null) {
      const { x: n, y: i } = e, r = this.editor.setting.get("drawGraphDefaultWidth"), o = this.editor.setting.get("drawGraphDefaultHeight"), a = this.editor.doc.getCurrCanvas(), h = yn(
        this.startPoint,
        a.getChildren()
      ), l = h || a;
      if (this.drawingGraphics = this.createGraphics(
        {
          x: n - r / 2,
          y: i - o / 2,
          width: r,
          height: o
        },
        l,
        !0
      ), this.drawingGraphics) {
        const d = this.drawingGraphics;
        if (this.editor.sceneGraph.addItems([d]), l.insertChild(d), h) {
          const u = [...d.attrs.transform];
          d.setWorldTransform(u);
        }
        this.editor.selectedElements.setItems([d]), this.editor.render();
      }
    }
    this.drawingGraphics && this.editor.commandManager.pushCommand(
      new Bi(this.commandDesc, this.editor, [this.drawingGraphics])
    );
  }
  afterEnd() {
    this.isDragging = !1, this.editor.hostEventManager.enableDelete(), this.editor.hostEventManager.enableContextmenu(), this.drawingGraphics && !this.editor.setting.get("keepToolSelectedAfterUse") && this.editor.toolManager.setActiveTool("select"), this.startPointWhenSpaceDown = null, this.lastDragPointWhenSpaceDown = null, this.editor.refLine.clear();
  }
}
g(Xt, "type", ""), g(Xt, "hotkey", "");
const Gr = "drawEllipse", Or = "o";
class fs extends Xt {
  constructor(e) {
    super(e);
    g(this, "type", Gr);
    g(this, "hotkey", Or);
    this.commandDesc = "Add Ellipse";
  }
  createGraphics(e, n) {
    return e = Se(e), new bn(
      {
        objectName: Zt(
          n,
          qt.Ellipse
        ),
        width: e.width,
        height: e.height,
        fill: [A(this.editor.setting.get("firstFill"))]
      },
      {
        advancedAttrs: {
          x: e.x,
          y: e.y
        },
        doc: this.editor.doc
      }
    );
  }
}
g(fs, "type", Gr), g(fs, "hotkey", Or);
const Kr = "drawFrame", Fr = "f";
class ps extends Xt {
  constructor(e) {
    super(e);
    g(this, "type", Kr);
    g(this, "hotkey", Fr);
    this.commandDesc = "Add Frame";
  }
  createGraphics(e, n) {
    return e = Se(e), new Mn(
      {
        objectName: Zt(n, qt.Frame),
        width: e.width,
        height: e.height,
        fill: [A(this.editor.setting.get("firstFrameFill"))],
        resizeToFit: !1
      },
      {
        advancedAttrs: {
          x: e.x,
          y: e.y
        },
        doc: this.editor.doc
      }
    );
  }
}
g(ps, "type", Kr), g(ps, "hotkey", Fr);
const ud = () => new Promise((s) => {
  const t = document.createElement("input");
  t.type = "file", t.accept = "image/*", t.onchange = (e) => {
    var r;
    const n = (r = e.target.files) == null ? void 0 : r[0];
    if (!n) return;
    const i = new FileReader();
    i.onload = (o) => {
      var h;
      const a = (h = o.target) == null ? void 0 : h.result;
      setTimeout(() => {
        s({ url: a, name: n.name });
      });
    }, i.readAsDataURL(n);
  }, t.click();
}), $r = "drawImg", Nr = "";
class ms extends Xt {
  constructor(e) {
    super(e);
    g(this, "type", $r);
    g(this, "hotkey", Nr);
    g(this, "imgData", null);
    this.commandDesc = "Add Image";
  }
  async enableActive() {
    try {
      const e = await ud();
      return await this.editor.imgManager.addImg(e.url), this.imgData = e, !0;
    } catch {
      return !1;
    }
  }
  createGraphics(e) {
    return e = Se(e), new dt(
      {
        objectName: this.imgData.name,
        width: e.width,
        height: e.height,
        fill: [
          {
            type: B.Image,
            attrs: {
              src: this.imgData.url
            }
          }
        ]
      },
      {
        advancedAttrs: {
          x: e.x,
          y: e.y
        },
        doc: this.editor.doc
      }
    );
  }
}
g(ms, "type", $r), g(ms, "hotkey", Nr);
const Yr = "drawLine", Vr = "l";
class ys extends Xt {
  constructor(e) {
    super(e);
    g(this, "type", Yr);
    g(this, "hotkey", Vr);
    this.commandDesc = "Add Line";
  }
  createGraphics(e, n, i) {
    if (i)
      return null;
    const r = this.calcAttrs(e);
    return new Ui(
      {
        objectName: Zt(n, qt.Line),
        ...r,
        height: 0,
        stroke: [A(this.editor.setting.get("firstStroke"))],
        strokeWidth: this.editor.setting.get("strokeWidth")
      },
      {
        doc: this.editor.doc
      }
    );
  }
  adjustSizeWhenShiftPressing(e) {
    return Al(e);
  }
  updateGraphics(e) {
    const n = this.drawingGraphics.getParent();
    let i = e.x, r = e.y;
    if (n && pt(n)) {
      const a = n.getWorldTransform(), h = Yi(a, e);
      i = h.x, r = h.y;
    }
    const o = this.calcAttrs({
      x: i,
      y: r,
      width: e.width,
      height: e.height
    });
    this.drawingGraphics.updateAttrs({
      width: o.width,
      transform: o.transform
    });
  }
  solveWidthOrHeightIsZero(e, n) {
    const i = { width: e.width, height: e.height };
    if (e.width === 0) {
      const r = Math.sign(n.x) || 1;
      i.width = r * this.editor.setting.get("gridSnapX");
    }
    return i;
  }
  calcAttrs({ x: e, y: n, width: i, height: r }) {
    const o = _t({ x: 0, y: -1 }, { x: i, y: r }) - Gt, a = e + i / 2, h = n + r / 2, l = new R().translate(a, h).rotate(o).translate(-a, -h);
    return l.tx = e, l.ty = n, {
      width: Math.sqrt(i * i + r * r),
      transform: l.getArray()
    };
  }
}
g(ys, "type", Yr), g(ys, "hotkey", Vr);
const jr = "drawRect", Xr = "r";
class xs extends Xt {
  constructor(e) {
    super(e);
    g(this, "type", jr);
    g(this, "hotkey", Xr);
    this.commandDesc = "Add Rect";
  }
  createGraphics(e, n) {
    return e = Se(e), new dt(
      {
        objectName: Zt(n, qt.Rect),
        width: e.width,
        height: e.height,
        fill: [A(this.editor.setting.get("firstFill"))]
      },
      {
        advancedAttrs: {
          x: e.x,
          y: e.y
        },
        doc: this.editor.doc
      }
    );
  }
}
g(xs, "type", jr), g(xs, "hotkey", Xr);
const Ur = "drawRegularPolygon", Zr = "";
class vs extends Xt {
  constructor(e) {
    super(e);
    g(this, "type", Ur);
    g(this, "hotkey", Zr);
    this.commandDesc = "AddRegularPolygon";
  }
  createGraphics(e, n) {
    return e = Se(e), new Zi(
      {
        objectName: Zt(
          n,
          qt.RegularPolygon
        ),
        width: e.width,
        height: e.height,
        fill: [A(this.editor.setting.get("firstFill"))],
        count: 3
      },
      {
        advancedAttrs: {
          x: e.x,
          y: e.y
        },
        doc: this.editor.doc
      }
    );
  }
}
g(vs, "type", Ur), g(vs, "hotkey", Zr);
const qr = "drawStar", Jr = "";
class ws extends Xt {
  constructor(e) {
    super(e);
    g(this, "type", qr);
    g(this, "hotkey", Jr);
    this.commandDesc = "AddStar";
  }
  createGraphics(e, n) {
    return e = Se(e), new Yo(
      {
        objectName: Zt(n, qt.Star),
        width: e.width,
        height: e.height,
        fill: [A(this.editor.setting.get("firstFill"))],
        count: 5,
        starInnerScale: this.editor.setting.get("defaultStarInnerScale")
      },
      {
        advancedAttrs: { x: e.x, y: e.y },
        doc: this.editor.doc
      }
    );
  }
}
g(ws, "type", qr), g(ws, "hotkey", Jr);
const Qr = "drawText", to = "t";
class Ss {
  constructor(t) {
    g(this, "type", Qr);
    g(this, "hotkey", to);
    g(this, "cursor", "crosshair");
    this.editor = t;
  }
  onActive() {
  }
  onInactive() {
  }
  onMoveExcludeDrag() {
  }
  onStart() {
  }
  onDrag() {
  }
  onEnd(t) {
    const e = this.editor.getSceneCursorXY(t);
    this.editor.textEditor.active({ pos: e }), this.editor.setting.get("keepToolSelectedAfterUse") || this.editor.toolManager.setActiveTool("select");
  }
  afterEnd() {
  }
}
g(Ss, "type", Qr), g(Ss, "hotkey", to);
const eo = "pathSelect", no = "v";
class _i {
  constructor(t) {
    g(this, "type", eo);
    g(this, "hotkey", no);
    g(this, "cursor", "default");
    g(this, "startPoint", null);
    g(this, "prevAttrs", null);
    g(this, "selectedControls", []);
    g(this, "startSegs", []);
    this.editor = t;
  }
  onActive() {
  }
  onInactive() {
  }
  onStart(t) {
    const e = this.editor.pathEditor, n = this.startPoint = this.editor.getSceneCursorXY(t), i = this.editor.controlHandleManager.getHandleInfoByPoint(n);
    if (!i) return;
    const r = e.getPath();
    this.prevAttrs = A({
      transform: r.attrs.transform,
      pathData: r.attrs.pathData
    });
    const o = Ji.parseSelectedInfoStr(i.handleName);
    e.selectedControl.contains(
      o.type,
      o.pathIdx,
      o.segIdx
    ) ? this.selectedControls = e.selectedControl.getSelectedControls() : this.selectedControls = [o], this.startSegs = this.selectedControls.map(
      ({ pathIdx: a, segIdx: h }) => e.getPath().getSeg(a, h, { applyTransform: !0 })
    ), e.selectedControl.setItems(this.selectedControls), e.drawControlHandles(), this.editor.render();
  }
  onDrag(t) {
    if (!this.startPoint)
      return;
    const e = this.editor.getSceneCursorXY(t), n = e.x - this.startPoint.x, i = e.y - this.startPoint.y, r = this.editor.pathEditor.getPath();
    for (let o = 0; o < this.selectedControls.length; o++) {
      const { type: a, pathIdx: h, segIdx: l } = this.selectedControls[o];
      if (r.getSeg(h, l)) {
        const u = this.startSegs[o];
        if (a === "anchor")
          r.setSeg(h, l, {
            point: {
              x: u.point.x + n,
              y: u.point.y + i
            }
          });
        else {
          if (
            // 如果某个 in/out 和它们对应的 anchor 也存在，忽略这个 in/out
            this.editor.pathEditor.selectedControl.contains(
              "anchor",
              h,
              l
            )
          )
            continue;
          a === "in" ? r.setSeg(h, l, {
            in: {
              x: u.in.x + n,
              y: u.in.y + i
            }
          }) : a === "out" && r.setSeg(h, l, {
            out: {
              x: u.out.x + n,
              y: u.out.y + i
            }
          });
        }
        this.editor.pathEditor.drawControlHandles(), this.editor.render();
      }
    }
  }
  onEnd() {
    const t = this.editor.pathEditor.getPath();
    this.editor.commandManager.pushCommand(
      new se(
        "UpdatePathData",
        [t],
        [{ transform: t.attrs.transform, pathData: t.attrs.pathData }],
        [this.prevAttrs]
      )
    ), this.editor.commandManager.batchCommandEnd();
  }
  onMoveExcludeDrag() {
  }
  afterEnd() {
    this.startPoint = null, this.prevAttrs = null, this.selectedControls = [], this.startSegs = [];
  }
  onCommandChange() {
    this.editor.pathEditor.drawControlHandles();
  }
}
g(_i, "type", eo), g(_i, "hotkey", no);
class fd {
  constructor(t) {
    g(this, "lastPoint", { x: -1, y: -1 });
    g(this, "isShiftPressingWhenStart", !1);
    g(this, "startSelectedControls", []);
    g(this, "segControlsNeedDrawInStart", []);
    this.editor = t;
  }
  onActive() {
  }
  onInactive() {
  }
  onStart() {
    this.isShiftPressingWhenStart = !1;
    const t = this.editor, e = t.pathEditor;
    this.segControlsNeedDrawInStart = this.editor.pathEditor.selectedControl.getSegControlsNeedDraw(), t.hostEventManager.isShiftPressing ? (this.isShiftPressingWhenStart = !0, this.startSelectedControls = t.pathEditor.selectedControl.getSelectedControls()) : (this.startSelectedControls = e.selectedControl.getSelectedControls(), e.selectedControl.setNormalControls(
      e.selectedControl.getSelectedControls()
    ), e.drawControlHandles()), this.lastPoint = t.toolManager.getCurrPoint(), t.render(), t.sceneGraph.setSelection(this.lastPoint);
  }
  onDrag(t) {
    const e = this.editor.getSceneCursorXY(t), n = Vi(this.lastPoint, e);
    this.editor.sceneGraph.setSelection(n);
    const r = this.editor.controlHandleManager.getCustomHandlesIntersectedWithRect(n).map((o) => Ji.parseSelectedInfoStr(o.type)).filter((o) => {
      if (!o) return !1;
      const a = o.type;
      return a === "anchor" ? !0 : a === "in" || a === "out" ? this.segControlsNeedDrawInStart.some(
        (h) => vn(h, {
          pathIdx: o.pathIdx,
          segIdx: o.segIdx
        })
      ) : !1;
    });
    this.isShiftPressingWhenStart ? (this.editor.pathEditor.selectedControl.setItems([
      ...this.startSelectedControls,
      ...r
    ]), this.editor.pathEditor.drawControlHandles()) : (this.editor.pathEditor.selectedControl.setItems(r), this.editor.pathEditor.drawControlHandles()), this.editor.render();
  }
  onEnd() {
  }
  afterEnd(t, e) {
    this.isShiftPressingWhenStart = !1, this.startSelectedControls = [], this.editor.pathEditor.selectedControl.setNormalControls([]), e || this.editor.pathEditor.selectedControl.clear(), this.editor.pathEditor.drawControlHandles(), this.editor.sceneGraph.selection = null, this.editor.render();
  }
}
const so = "pathSelect", io = "v";
class me {
  constructor(t) {
    g(this, "type", so);
    g(this, "hotkey", io);
    g(this, "cursor", "default");
    g(this, "currStrategy", null);
    g(this, "strategyMove");
    g(this, "strategyDrawSelection");
    this.editor = t, this.strategyMove = new _i(t), this.strategyDrawSelection = new fd(t);
  }
  onActive() {
  }
  onInactive() {
  }
  onStart(t) {
    const e = this.editor.getSceneCursorXY(t);
    if (this.editor.controlHandleManager.getHandleInfoByPoint(e) ? this.currStrategy = this.strategyMove : this.currStrategy = this.strategyDrawSelection, this.currStrategy)
      this.currStrategy.onActive(), this.currStrategy.onStart(t);
    else
      throw new Error("no strategy found");
  }
  onDrag(t) {
    if (this.currStrategy)
      this.currStrategy.onDrag(t);
    else
      throw new Error("no strategy found");
  }
  onEnd(t, e) {
    if (this.editor.controlHandleManager.showCustomHandles(), this.editor.hostEventManager.isDraggingCanvasBySpace)
      return;
    const n = this.currStrategy;
    if (n)
      n.onEnd(t, e), n.onInactive();
    else
      throw new Error("no strategy found");
  }
  onMoveExcludeDrag() {
  }
  afterEnd(t, e) {
    var n;
    this.editor.hostEventManager.isDraggingCanvasBySpace || this.editor.setCursor("default"), (n = this.currStrategy) == null || n.afterEnd(t, e), this.currStrategy = null;
  }
  onCommandChange() {
    this.editor.pathEditor.drawControlHandles();
  }
  onViewportXOrYChange() {
    this.editor.hostEventManager.isSpacePressing ? this.editor.pathEditor.drawControlHandles() : this.editor.pathEditor.drawControlHandles(), this.editor.render();
  }
}
g(me, "type", so), g(me, "hotkey", io);
class pd {
  constructor(t, e) {
    this.editor = t, this.parentTool = e;
  }
  onActive() {
  }
  onInactive() {
  }
  onStart() {
    const t = this.editor, e = this.parentTool.path, n = e.project(
      this.editor.toolManager.getCurrPoint(),
      this.editor.toSceneSize(5)
    );
    if (!n)
      return;
    const i = A({
      transform: e.attrs.transform,
      pathData: e.attrs.pathData
    });
    e.insertSeg(
      n.pathItemIndex,
      n.segIndex,
      n.t
    ), t.commandManager.pushCommand(
      new se(
        "Update Path Data",
        [e],
        [
          A({
            transform: e.attrs.transform,
            pathData: e.attrs.pathData
          })
        ],
        [i]
      )
    ), t.pathEditor.selectedControl.clear(), t.pathEditor.drawControlHandles(), t.render();
  }
  onDrag() {
    this.editor.setCursor("default");
  }
  onEnd() {
    this.editor.setCursor("pen");
  }
  afterEnd() {
    this.editor.setCursor("pen");
  }
}
class md {
  constructor(t, e) {
    g(this, "startPoint", null);
    g(this, "prevAttrs", null);
    this.editor = t, this.parentTool = e;
  }
  onActive() {
  }
  onInactive() {
  }
  onAltToggle() {
    this.startPoint && this.onDrag();
  }
  onStart() {
    const t = this.editor.pathEditor;
    if (this.startPoint = this.parentTool.getCorrectedPoint(), t.isActive()) {
      const i = this.parentTool.path;
      this.prevAttrs = A({
        transform: i.attrs.transform,
        pathData: i.attrs.pathData
      }), t.selectedControl.getSelectedControlsSize() === 0 && (this.parentTool.pathIdx = i.getPathItemCount()), i.hasPath(this.parentTool.pathIdx) || i.addEmptyPath(), i.addSeg(this.parentTool.pathIdx, {
        point: this.startPoint,
        in: { x: 0, y: 0 },
        out: { x: 0, y: 0 }
      });
    } else {
      const i = [
        {
          segs: [
            {
              point: { x: 0, y: 0 },
              in: { x: 0, y: 0 },
              out: { x: 0, y: 0 }
            }
          ],
          closed: !1
        }
      ], r = this.editor.doc.getCurrCanvas(), o = new gt(
        {
          objectName: Zt(
            r,
            qt.Path
          ),
          width: 100,
          height: 100,
          strokeWidth: 1,
          stroke: [
            {
              type: B.Solid,
              attrs: it("#000")
            }
          ],
          pathData: i
        },
        {
          advancedAttrs: this.startPoint,
          doc: this.editor.doc
        }
      );
      this.parentTool.path = o, this.editor.sceneGraph.addItems([o]), this.editor.doc.getCurrCanvas().insertChild(o), this.editor.commandManager.batchCommandStart(), this.editor.commandManager.pushCommand(
        new Bi("Add Path", this.editor, [o]),
        {
          beforeRedo: () => {
            this.editor.pathEditor.active(o), this.editor.toolManager.setActiveTool(me.type);
          },
          beforeUndo: () => {
            this.editor.pathEditor.inactive("undo");
          }
        }
      ), this.editor.selectedElements.setItems([o]), this.prevAttrs = A({
        transform: o.attrs.transform,
        pathData: o.attrs.pathData
      }), t.active(o);
    }
    const n = this.parentTool.path.getSegCount(this.parentTool.pathIdx) - 1;
    t.selectedControl.setItems([
      {
        type: "anchor",
        pathIdx: this.parentTool.pathIdx,
        segIdx: n
      }
    ]), t.drawControlHandles(), this.editor.render();
  }
  onDrag() {
    if (!this.startPoint) {
      console.warn("startPoint is null, check start()");
      return;
    }
    const t = this.parentTool.getCorrectedPoint(), e = t.x - this.startPoint.x, n = t.y - this.startPoint.y, i = this.parentTool.path, r = i.getSegCount(this.parentTool.pathIdx) - 1, o = {
      out: { x: e, y: n }
    };
    !this.editor.hostEventManager.isAltPressing && r !== 0 && (o.in = { x: -e, y: -n }), i.setSeg(this.parentTool.pathIdx, r, o), this.editor.pathEditor.drawControlHandles(), this.editor.render();
  }
  onEnd() {
    const t = this.parentTool.path;
    t.updateAttrs({ pathData: t.attrs.pathData }), this.editor.commandManager.pushCommand(
      new se(
        "Update Path Data",
        [t],
        [
          A({
            transform: t.attrs.transform,
            pathData: t.attrs.pathData
          })
        ],
        [this.prevAttrs]
      )
    ), this.editor.commandManager.batchCommandEnd();
  }
  afterEnd() {
  }
}
class yd {
  constructor(t, e) {
    g(this, "startPoint", null);
    g(this, "prevAttrs", null);
    this.editor = t, this.parentTool = e;
  }
  onActive() {
  }
  onInactive() {
  }
  onStart() {
    this.startPoint = this.parentTool.getCorrectedPoint(), this.prevAttrs = A({
      transform: this.parentTool.path.attrs.transform,
      pathData: this.parentTool.path.attrs.pathData
    });
    const t = this.parentTool.path;
    t.setPathItemClosed(this.parentTool.pathIdx, !0), t.setSeg(this.parentTool.pathIdx, 0, {
      in: { x: 0, y: 0 }
    });
  }
  onDrag() {
    const t = this.parentTool.getCorrectedPoint(), e = this.parentTool.path, n = this.startPoint, i = t.x - n.x, r = t.y - n.y, o = e.getSegCount(this.parentTool.pathIdx) - 1, a = {
      out: { x: i, y: r }
    };
    !this.editor.hostEventManager.isAltPressing && o !== 0 && (a.in = { x: -i, y: -r }), e.setSeg(this.parentTool.pathIdx, 0, a), this.editor.pathEditor.drawControlHandles(), this.editor.render();
  }
  onEnd() {
    this.editor.pathEditor.selectedControl.clear();
    const t = this.parentTool.path;
    t.updateAttrs({ pathData: t.attrs.pathData }), this.editor.commandManager.pushCommand(
      new se(
        "Update Path Data",
        [t],
        [
          A({
            transform: t.attrs.transform,
            pathData: t.attrs.pathData
          })
        ],
        [this.prevAttrs]
      )
    ), this.editor.commandManager.batchCommandEnd();
  }
  afterEnd() {
  }
}
class xd {
  constructor(t, e) {
    this.editor = t, this.parentTool = e;
  }
  onActive() {
  }
  onInactive() {
  }
  onStart() {
    const t = this.editor, e = t.pathEditor, n = this.parentTool.path, i = t.toSceneSize(
      this.editor.setting.get("selectionHitPadding")
    ), r = n ? n.getClosestAnchor({
      point: t.toolManager.getCurrPoint(),
      tol: i
    }) : null;
    if (!r)
      return;
    const o = A({
      transform: n.attrs.transform,
      pathData: n.attrs.pathData
    });
    n.deleteSegAndHeal(
      r.pathItemIndex,
      r.segIndex
    ), t.commandManager.pushCommand(
      new se(
        "Update Path Data",
        [n],
        [
          A({
            transform: n.attrs.transform,
            pathData: n.attrs.pathData
          })
        ],
        [o]
      )
    ), t.pathEditor.selectedControl.clear(), e.drawControlHandles(), t.render();
  }
  onDrag() {
    this.editor.setCursor("default");
  }
  onEnd() {
    this.editor.setCursor("pen");
  }
  afterEnd() {
    this.editor.setCursor("pen");
  }
}
const ro = "pen", oo = "p";
class Oe {
  constructor(t) {
    g(this, "type", ro);
    g(this, "hotkey", oo);
    g(this, "cursor", "pen");
    g(this, "path", null);
    g(this, "pathIdx", 0);
    g(this, "childTool", null);
    this.editor = t;
  }
  onActive() {
    this.editor.pathEditor.isActive() && (this.path = this.editor.pathEditor.getPath(), this.pathIdx = this.path.attrs.pathData.length), this.updatePreviewHandles(this.getCorrectedPoint());
  }
  onInactive() {
    this.editor.commandManager.batchCommandEnd(), this.editor.pathEditor.drawControlHandles(), this.editor.render();
  }
  onMoveExcludeDrag(t, e) {
    var i;
    const n = this.editor;
    if (e) {
      n.pathEditor.drawControlHandles(), n.render();
      return;
    }
    if (this.editor.canvasDragger.isActive())
      n.pathEditor.drawControlHandles();
    else {
      const r = this.path ? this.path.getClosestAnchor({
        point: this.editor.toolManager.getCurrPoint(),
        tol: this.editor.toSceneSize(5)
      }) : null;
      let o = null, a = !1;
      if (r)
        n.hostEventManager.isAltPressing ? (o = r.point, n.setCursor("pen-anchor-remove"), a = !0) : r.segIndex === 0 && r.pathItemIndex === this.pathIdx ? (n.setCursor("pen-close"), o = r.point) : n.setCursor("pen");
      else {
        const h = (i = this.path) == null ? void 0 : i.project(
          this.editor.toolManager.getCurrPoint(),
          this.editor.toSceneSize(5)
        );
        h && n.hostEventManager.isAltPressing ? (o = h.point, n.setCursor("pen-anchor-add"), a = !0) : n.setCursor("pen");
      }
      this.updatePreviewHandles(
        o ?? this.getCorrectedPoint(),
        a
      );
    }
  }
  onStart(t) {
    const e = this.editor.toSceneSize(
      this.editor.setting.get("selectionHitPadding")
    ), n = this.path ? this.path.getClosestAnchor({
      point: this.getCorrectedPoint(),
      tol: e
    }) : null;
    n && this.editor.hostEventManager.isAltPressing ? this.childTool = new xd(this.editor, this) : n && n.segIndex === 0 ? this.childTool = new yd(this.editor, this) : (this.path ? this.path.project(this.editor.toolManager.getCurrPoint(), e) : null) && this.editor.hostEventManager.isAltPressing ? this.childTool = new pd(this.editor, this) : this.childTool = new md(this.editor, this), this.childTool.onStart(t);
  }
  onDrag(t) {
    var e;
    (e = this.childTool) == null || e.onDrag(t);
  }
  onEnd(t, e) {
    var n;
    (n = this.childTool) == null || n.onEnd(t, e);
  }
  afterEnd() {
  }
  onCommandChange() {
    this.updatePreviewHandles(this.getCorrectedPoint());
  }
  onCanvasDragActiveChange(t) {
    t ? this.editor.pathEditor.drawControlHandles() : this.updatePreviewHandles(this.getCorrectedPoint()), this.editor.render();
  }
  /** get corrected cursor point */
  getCorrectedPoint() {
    const t = this.editor.toolManager.getCurrPoint();
    return this.editor.setting.get("snapToGrid") && (t.x = Q(t.x, 0.5), t.y = Q(t.y, 0.5)), t;
  }
  onViewportXOrYChange() {
    this.editor.canvasDragger.isActive() ? this.editor.pathEditor.drawControlHandles() : this.updatePreviewHandles(this.getCorrectedPoint()), this.editor.render();
  }
  /** update preview anchor and preview curve */
  updatePreviewHandles(t, e = !1) {
    const n = [];
    if (this.editor.pathEditor.selectedControl.getSelectedControlsSize() > 0) {
      const o = this.path;
      if (!o) return;
      const a = o.getLastSeg(this.pathIdx, {
        applyTransform: !0
      });
      if (a && !e) {
        const h = new st({
          cx: t.x,
          cy: t.y,
          type: "path-preview-curve",
          getCursor: () => "default",
          graphics: new gt(
            {
              objectName: "path-preview-curve",
              width: 0,
              height: 0,
              pathData: [
                {
                  segs: [
                    {
                      point: this.editor.toViewportPt(
                        a.point.x,
                        a.point.y
                      ),
                      in: {
                        x: this.editor.toViewportSize(a.in.x),
                        y: this.editor.toViewportSize(a.in.y)
                      },
                      out: {
                        x: this.editor.toViewportSize(a.out.x),
                        y: this.editor.toViewportSize(a.out.y)
                      }
                    },
                    {
                      point: this.editor.toViewportPt(t.x, t.y),
                      in: { x: 0, y: 0 },
                      out: { x: 0, y: 0 }
                    }
                  ],
                  closed: !1
                }
              ],
              stroke: [
                {
                  type: B.Solid,
                  attrs: it("#1592fe")
                }
              ],
              strokeWidth: 1
            },
            {
              doc: this.editor.doc
            }
          )
        });
        n.push(h);
      }
    }
    const i = this.editor.setting.get("handleStroke"), r = new st({
      cx: t.x,
      cy: t.y,
      type: "path-preview-anchor",
      getCursor: () => "default",
      graphics: new bn(
        {
          objectName: "path-preview-anchor",
          width: 6,
          height: 6,
          fill: [
            {
              type: B.Solid,
              attrs: it("#fff")
            }
          ],
          stroke: [
            {
              type: B.Solid,
              attrs: it(i)
            }
          ],
          strokeWidth: 1
        },
        {
          advancedAttrs: t,
          doc: this.editor.doc
        }
      )
    });
    n.push(r), this.editor.pathEditor.drawControlHandles(n), this.editor.render();
  }
}
g(Oe, "type", ro), g(Oe, "hotkey", oo);
const ao = "pencil", ho = { shiftKey: !0, keyCode: "KeyP" };
class Cs {
  constructor(t) {
    g(this, "type", ao);
    g(this, "hotkey", ho);
    g(this, "cursor", "pencil");
    g(this, "commandDesc", "draw by Pencil");
    g(this, "unbindEvent", xe);
    g(this, "path", null);
    g(this, "isFirstDrag", !0);
    this.editor = t;
  }
  onActive() {
    this.editor.selectedElements.clear();
  }
  onInactive() {
    this.unbindEvent();
  }
  onMoveExcludeDrag() {
  }
  onStart(t) {
    this.path = new gt(
      {
        objectName: Zt(
          this.editor.doc.getCurrCanvas(),
          qt.Path
        ),
        width: 0,
        height: 0,
        pathData: [
          {
            segs: [],
            closed: !1
          }
        ],
        stroke: [A(this.editor.setting.get("firstStroke"))],
        strokeWidth: 3
      },
      {
        doc: this.editor.doc
      }
    );
    const e = this.editor.getSceneCursorXY(t);
    this.path.addSeg(0, {
      point: e,
      in: { x: 0, y: 0 },
      out: { x: 0, y: 0 }
    });
  }
  onDrag(t) {
    const e = this.editor.getSceneCursorXY(t), n = this.path;
    n.addSeg(0, {
      point: e,
      in: { x: 0, y: 0 },
      out: { x: 0, y: 0 }
    }), this.isFirstDrag && (this.editor.sceneGraph.addItems([n]), this.editor.doc.getCurrCanvas().insertChild(n), this.isFirstDrag = !1), this.editor.render();
  }
  onEnd(t, e) {
    const n = this.path;
    if (e) {
      const i = n.attrs.pathData[0].segs, r = dl(
        i,
        this.editor.setting.get("pencilCurveFitTolerance")
      );
      n.attrs.pathData[0].segs = r, this.editor.commandManager.pushCommand(
        new Bi("Add Path by pencil", this.editor, [n])
      );
    } else
      n.setDeleted(!0);
  }
  afterEnd() {
    this.path = null, this.isFirstDrag = !0;
  }
  getDragBlockStep() {
    return 0;
  }
}
g(Cs, "type", ao), g(Cs, "hotkey", ho);
class fe {
  // 等待绘制的水平参照线
  constructor(t) {
    /**
     * 参考图形产生的垂直参照线。对于其中的同一条线，x 相同（作为 key），y 不同（作为 value）
     */
    g(this, "vRefLineMap", /* @__PURE__ */ new Map());
    /**
     * 参考图形产生的水平照线，对于其中的同一条线，y 相同（作为 key），x 不同（作为 value）
     */
    g(this, "hRefLineMap", /* @__PURE__ */ new Map());
    g(this, "sortedXs", []);
    // 对 vRefLineMap 的 key 排序
    g(this, "sortedYs", []);
    // 对 hRefLineMap 的 key 排序
    g(this, "toDrawVLines", []);
    // 等待绘制的垂直参照线
    g(this, "toDrawHLines", []);
    this.editor = t;
  }
  /**
   * cache reference line of graphics in viewport
   */
  cacheGraphicsRefLines(t = {
    excludeItems: []
  }) {
    this.clear();
    const e = t.excludeItems, n = this.vRefLineMap, i = this.hRefLineMap, r = this.editor.viewportManager.getBbox(), o = /* @__PURE__ */ new Set();
    this.editor.doc.getCurrCanvas().forEachVisibleChildNode((h) => {
      Uo(h) || pt(h) && h.isGroup() || o.add(h);
    });
    for (const h of e)
      h.forEachVisibleChildNode((l) => {
        o.has(l) && o.delete(l);
      });
    const a = new Set(e.map((h) => h.attrs.id));
    for (const h of o) {
      if (a.has(h.attrs.id))
        continue;
      const l = Ar(h.getBbox());
      if (!Ai(r, l))
        continue;
      const d = this.editor.setting;
      if (d.get("snapToGrid")) {
        const S = d.get("gridSnapX"), w = d.get("gridSnapY");
        l.minX = Q(l.minX, S), l.minY = Q(l.minY, w), l.midX = Q(l.midX, S), l.midY = Q(l.midY, w), l.maxX = Q(l.maxX, S), l.maxY = Q(l.maxY, w);
      }
      fe.addRefLinesToMap(n, l.midX, [l.minY, l.maxY]), fe.addRefLinesToMap(i, l.midY, [l.minX, l.maxX]);
      const u = h.getWorldBboxVerts();
      if (d.get("snapToGrid")) {
        const S = d.get("gridSnapX"), w = d.get("gridSnapY");
        for (const b of u)
          b.x = Q(b.x, S), b.y = Q(b.y, w);
      }
      const p = u.filter((S) => S.x === l.minX), m = u.filter((S) => S.x === l.maxX), x = u.filter((S) => S.y === l.minY), y = u.filter((S) => S.y === l.maxY);
      for (const S of [...p, ...m])
        fe.addRefLinesToMap(n, S.x, [S.y]);
      for (const S of [...x, ...y])
        fe.addRefLinesToMap(i, S.y, [S.x]);
    }
    this.sortedXs = Array.from(n.keys()).sort((h, l) => h - l), this.sortedYs = Array.from(i.keys()).sort((h, l) => h - l);
  }
  clear() {
    this.vRefLineMap.clear(), this.hRefLineMap.clear(), this.sortedXs = [], this.sortedYs = [], this.toDrawVLines = [], this.toDrawHLines = [];
  }
  static addRefLinesToMap(t, e, n) {
    const i = t.get(e);
    if (i)
      for (const r of n)
        i.add(r);
    else
      t.set(e, new Set(n));
  }
  static getGraphicsTargetPoints(t) {
    let e = [];
    if (t.size === 1) {
      const { width: n, height: i, transform: r } = Array.from(t.values())[0], o = ne(
        { x: 0, y: 0, width: n, height: i },
        r
      );
      return o.push({
        x: (o[0].x + o[2].x) / 2,
        y: (o[0].y + o[2].y) / 2
      }), o;
    } else {
      const n = Ar(
        Ut(
          Array.from(t.values()).map((i) => un(i))
        )
      );
      e = [
        { x: n.minX, y: n.minY },
        { x: n.minX, y: n.maxY },
        { x: n.maxX, y: n.minY },
        { x: n.maxX, y: n.maxY },
        { x: n.midX, y: n.midY }
      ];
    }
    return e;
  }
  /**
   * update ref line
   * and return offset
   */
  getGraphicsSnapOffset(t) {
    this.toDrawVLines = [], this.toDrawHLines = [];
    let e = Dr(t), n = Array.from(e.keys()), i = Rr(t), r = Array.from(i.keys());
    const o = this.vRefLineMap, a = this.hRefLineMap, h = this.sortedXs, l = this.sortedYs;
    if (h.length === 0 && l.length === 0)
      return { x: 0, y: 0 };
    let d, u;
    const p = ue(
      n,
      (M) => pr(h, M)
    ), m = ue(n, (M, E) => p[E] - M), x = Math.min(
      ...ue(m, (M) => Math.abs(M))
    ), y = ue(
      r,
      (M) => pr(l, M)
    ), S = ue(r, (M, E) => y[E] - M), w = Math.min(
      ...ue(S, (M) => Math.abs(M))
    ), b = (M, E) => Math.abs(M - E) < 1e-5, C = this.editor.setting.get("refLineTolerance") / this.editor.zoomManager.getZoom();
    if (x <= C) {
      for (const M of m)
        if (b(x, Math.abs(M))) {
          d = M;
          break;
        }
      if (d === void 0)
        throw new Error("it should not reach here, please put a issue to us");
    }
    if (w <= C) {
      for (const M of S)
        if (b(w, Math.abs(M))) {
          u = M;
          break;
        }
      if (u === void 0)
        throw new Error("it should not reach here, please put a issue to us");
    }
    const I = ue(t, (M) => ({
      x: M.x + (d ?? 0),
      y: M.y + (u ?? 0)
    }));
    return e = Dr(I), n = Array.from(e.keys()), d !== void 0 && gr(n, (M, E) => {
      if (b(d, m[E])) {
        const T = {
          x: p[E],
          ys: []
        };
        T.ys.push(...e.get(M)), T.ys.push(...Array.from(o.get(M) ?? [])), this.toDrawVLines.push(T);
      }
    }), u !== void 0 && (i = Rr(I), r = Array.from(i.keys()), gr(r, (M, E) => {
      if (b(u, S[E])) {
        const T = {
          y: y[E],
          xs: []
        };
        T.xs.push(...i.get(M)), T.xs.push(...Array.from(a.get(M) ?? [])), this.toDrawHLines.push(T);
      }
    })), { x: d ?? 0, y: u ?? 0 };
  }
  drawRefLine(t) {
    t.save();
    const e = this.editor.setting.get("refLineStroke");
    t.fillStyle = e, t.strokeStyle = e, t.lineWidth = this.editor.setting.get("refLineStrokeWidth");
    const n = /* @__PURE__ */ new Set(), i = this.editor.setting.get("refLinePointSize");
    this.drawVerticalLines(t, i, n), this.drawHorizontalLines(t, i, n), t.restore();
  }
  drawVerticalLines(t, e, n) {
    for (const i of this.toDrawVLines) {
      let r = 1 / 0, o = -1 / 0;
      const { x: a } = this.editor.toViewportPt(i.x, 0);
      for (const h of i.ys) {
        const { y: l } = this.editor.toViewportPt(0, h);
        r = Math.min(r, l), o = Math.max(o, l);
        const d = `${a},${l}`;
        n.has(d) || (n.add(d), Pr(t, a, l, e));
      }
      gs(t, a, r, a, o);
    }
  }
  drawHorizontalLines(t, e, n) {
    for (const i of this.toDrawHLines) {
      let r = 1 / 0, o = -1 / 0;
      const { y: a } = this.editor.toViewportPt(0, i.y);
      for (const h of i.xs) {
        const { x: l } = this.editor.toViewportPt(h, 0);
        r = Math.min(r, l), o = Math.max(o, l);
        const d = `${l},${a}`;
        n.has(d) || (n.add(d), Pr(t, l, a, e));
      }
      gs(t, r, a, o, a);
    }
  }
}
const ss = (s, t) => {
  const e = s.zoomManager.getZoom(), n = s.setting.get("selectionHitPadding") / e, i = s.doc.getCurrCanvas(), r = s.selectedElements.getParentIdSet(), o = {
    tol: n,
    parentIdSet: r,
    zoom: e
  };
  return i.getHitGraphics(t, o);
}, co = (s, t = /* @__PURE__ */ new Set()) => {
  const e = s.sceneGraph.selection;
  if (e === null)
    return console.warn("selection 为 null，请确认在正确的时机调用当前方法"), [];
  const n = Xi(e);
  return qo(
    s,
    n,
    s.doc.getCurrCanvas(),
    t
  );
}, qo = (s, t, e, n) => {
  const i = [], r = e.getChildren();
  for (const o of r)
    !o.isVisible() || o.isLock() || (n.has(o.attrs.id) ? i.push(
      ...qo(s, t, o, n)
    ) : o.intersectWithChildrenBox(t) && i.push(o));
  return i;
};
class vd {
  constructor(t) {
    g(this, "originWorldTfMap", /* @__PURE__ */ new Map());
    g(this, "originParentIndexMap", /* @__PURE__ */ new Map());
    g(this, "transaction");
    g(this, "selectedItems", []);
    g(this, "selectedFrameIdSet", /* @__PURE__ */ new Set());
    g(this, "prevParent");
    g(this, "startPoint", { x: -1, y: -1 });
    g(this, "dragPoint", null);
    g(this, "dx", 0);
    g(this, "dy", 0);
    g(this, "prevBBoxPos", { x: -1, y: -1 });
    this.editor = t, this.transaction = new Z(t);
  }
  onActive() {
  }
  onInactive() {
  }
  onShiftToggle() {
    this.dragPoint && this.move();
  }
  onStart(t) {
    this.editor.controlHandleManager.hideCustomHandles(), this.startPoint = this.editor.getSceneCursorXY(t), this.selectedItems = this.editor.selectedElements.getItems({
      excludeLocked: !0
    });
    for (const i of this.selectedItems) {
      const r = i.attrs.id;
      pt(i) && !i.isGroup() && this.selectedFrameIdSet.add(r), this.transaction.recordOld(r, {
        transform: A(i.attrs.transform),
        parentIndex: A(i.attrs.parentIndex)
      }), this.originWorldTfMap.set(r, i.getWorldTransform()), this.originParentIndexMap.set(r, A(i.attrs.parentIndex));
    }
    const e = this.editor.doc.getCanvas();
    this.prevParent = yn(
      this.startPoint,
      e.getChildren(),
      (i) => this.selectedFrameIdSet.has(i.attrs.id)
    ) ?? e;
    const n = this.editor.selectedElements.getBoundingRect();
    n ? this.prevBBoxPos = { x: n.x, y: n.y } : console.error(
      "selected elements should't be empty when moving, please report us issue"
    ), this.editor.setting.get("snapToObjects") && this.editor.refLine.cacheGraphicsRefLines({
      excludeItems: this.selectedItems
    });
  }
  onDrag(t) {
    this.dragPoint = this.editor.getCursorXY(t), this.move();
  }
  move() {
    this.editor.sceneGraph.showBoxAndHandleWhenSelected = !1, this.editor.sceneGraph.showSelectedGraphsOutline = !1;
    const t = this.editor.toScenePt(
      this.dragPoint.x,
      this.dragPoint.y
    );
    let e = t.x - this.startPoint.x, n = t.y - this.startPoint.y;
    this.editor.hostEventManager.isShiftPressing && (Math.abs(e) > Math.abs(n) ? n = 0 : e = 0), this.editor.setting.get("snapToGrid") && (e !== 0 && (e = Math.round(this.prevBBoxPos.x + e) - this.prevBBoxPos.x), n !== 0 && (n = Math.round(this.prevBBoxPos.y + n) - this.prevBBoxPos.y)), this.dx = e, this.dy = n;
    const i = this.selectedItems, r = /* @__PURE__ */ new Map();
    for (const u of i) {
      const p = A(
        this.originWorldTfMap.get(u.attrs.id)
      );
      p[4] += e, p[5] += n, r.set(u.attrs.id, {
        width: u.attrs.width,
        height: u.attrs.height,
        transform: p
      });
    }
    const o = fe.getGraphicsTargetPoints(r), a = this.editor.refLine.getGraphicsSnapOffset(o), h = this.editor.doc.getCanvas(), l = yn(
      t,
      h.getChildren(),
      (u) => this.selectedFrameIdSet.has(u.attrs.id)
    ) ?? h, d = l.attrs.id;
    for (const u of i) {
      const p = A(
        this.originWorldTfMap.get(u.attrs.id)
      );
      p[4] += e + a.x, p[5] += n + a.y, this.prevParent !== l && u.attrs.id !== d && (u.getParentId() === d ? u.updateAttrs({
        parentIndex: {
          guid: d,
          position: u.attrs.parentIndex.position
        }
      }) : l.insertChild(u)), u.setWorldTransform(p);
    }
    this.prevParent = l;
    for (const u of i)
      this.transaction.update(u.attrs.id, {
        transform: A(u.attrs.transform),
        parentIndex: A(u.attrs.parentIndex)
      });
    this.updateCursor(), this.transaction.updateParentSize(i), this.editor.render();
  }
  updateCursor() {
    if (this.editor.hostEventManager.isShiftPressing) {
      if (this.dx === 0 && this.dy !== 0) {
        this.editor.setCursor("move-ns");
        return;
      }
      if (this.dx !== 0 && this.dy === 0) {
        this.editor.setCursor("move-ew");
        return;
      }
    }
    this.editor.setCursor("default");
  }
  onEnd(t, e) {
    const n = this.editor.selectedElements.getItems({
      excludeLocked: !0
    });
    if (n.length !== 0) {
      if (!e) {
        const i = this.editor.getSceneCursorXY(t);
        !ss(this.editor, i) && !this.editor.hostEventManager.isShiftPressing && this.editor.selectedElements.clear();
        return;
      }
      (this.dx !== 0 || this.dy !== 0) && (this.transaction.commit("Update Graphics Attributes"), n.length === 1 && this.editor.controlHandleManager.setCustomHandles(
        n[0].getControlHandles(
          this.editor.zoomManager.getZoom(),
          !0
        )
      ));
    }
  }
  afterEnd() {
    this.transaction = new Z(this.editor), this.dragPoint = null, this.selectedFrameIdSet.clear(), this.editor.sceneGraph.showBoxAndHandleWhenSelected = !0, this.editor.sceneGraph.showSelectedGraphsOutline = !0, this.editor.refLine.clear(), this.editor.render();
  }
}
class wd {
  constructor(t) {
    g(this, "startPoint", { x: -1, y: -1 });
    g(this, "handleName");
    g(this, "startSelectBRect", null);
    g(this, "originAttrsMap", /* @__PURE__ */ new Map());
    g(this, "originWorldTransforms", /* @__PURE__ */ new Map());
    g(this, "childNodeSet", /* @__PURE__ */ new Set());
    g(this, "updatedAttrsMap", /* @__PURE__ */ new Map());
    g(this, "lastDragPoint", null);
    g(this, "prevLastPoint", null);
    g(this, "unbind", xe);
    g(this, "isResizeOp", () => ["nw", "ne", "se", "sw", "n", "e", "s", "w"].includes(
      this.handleName
    ));
    g(this, "updateControls", (t) => {
      const e = this.editor.controlHandleManager;
      if (!_r(this.handleName) && e.hasCustomHandles()) {
        const n = t.getControlHandles(
          this.editor.zoomManager.getZoom()
        );
        n && e.setCustomHandles(n);
      }
    });
    this.editor = t;
  }
  onActive() {
    const t = () => {
      this.updateGraphics(), this.editor.render();
    };
    this.editor.hostEventManager.on("shiftToggle", t), this.editor.hostEventManager.on("altToggle", t), this.unbind = () => {
      this.editor.hostEventManager.off("shiftToggle", t), this.editor.hostEventManager.off("altToggle", t);
    };
  }
  onInactive() {
    this.unbind(), this.unbind = xe;
  }
  onStart(t) {
    this.startPoint = this.editor.getSceneCursorXY(t);
    const e = this.editor.controlHandleManager.getHandleInfoByPoint(
      this.startPoint
    );
    if (!e)
      throw new Error("handleName is invalid");
    const n = this.editor.selectedElements.getItems();
    n.forEach((r) => {
      this.originAttrsMap.set(r.attrs.id, r.getAttrs()), this.originWorldTransforms.set(r.attrs.id, [
        ...r.getWorldTransform()
      ]);
    }), this.childNodeSet = Es(n);
    for (const r of this.childNodeSet)
      this.originAttrsMap.set(r.attrs.id, r.getAttrs()), this.originWorldTransforms.set(r.attrs.id, [
        ...r.getWorldTransform()
      ]);
    const i = this.editor.selectedElements.getBoundingRect();
    if (!i)
      throw new Error("startSelectBbox should not be null, please issue to us");
    this.startSelectBRect = i, _r(e.handleName) && this.editor.controlHandleManager.hideCustomHandles(), this.handleName = e.handleName;
  }
  onDrag(t) {
    this.editor.commandManager.disableRedoUndo(), this.editor.hostEventManager.disableDelete();
    const e = ["nw", "ne", "se", "sw"].includes(
      this.handleName
    ), n = ["n", "e", "s", "w"].includes(this.handleName) && (this.editor.selectedElements.size() > 1 || this.editor.selectedElements.getItems()[0].getRotate() % Gt === 0);
    if (!this.lastDragPoint && this.editor.setting.get("snapToObjects") && this.editor.refLine.cacheGraphicsRefLines({
      excludeItems: this.editor.selectedElements.getItems()
    }), this.lastDragPoint = this.editor.getSceneCursorXY(t), e || n) {
      this.editor.setting.get("snapToGrid") && (this.lastDragPoint = ns.getSnapPtBySetting(
        this.lastDragPoint,
        this.editor.setting
      ));
      const r = this.editor.refLine.getGraphicsSnapOffset([
        this.lastDragPoint
      ]);
      this.lastDragPoint = {
        x: this.lastDragPoint.x + r.x,
        y: this.lastDragPoint.y + r.y
      };
    }
    const i = this.prevLastPoint;
    this.prevLastPoint = this.lastDragPoint, !vn(i, this.lastDragPoint) && (this.updateGraphics(), this.editor.render());
  }
  checkEnableUpdate(t, e) {
    var r, o;
    return !((e.width === 0 || ((r = e == null ? void 0 : e.transform) == null ? void 0 : r[0]) === 0) && (e.height === 0 || ((o = e == null ? void 0 : e.transform) == null ? void 0 : o[3]) === 0) || !(t.width === 0 || t.height === 0) && (e.width === 0 || e.height === 0 || e.transform && (e.transform[0] === 0 || e.transform[3]) === 0));
  }
  updateSingleGraphics(t) {
    const e = t.calcNewAttrsByControlHandle(
      this.handleName,
      this.lastDragPoint,
      this.originAttrsMap.get(t.attrs.id),
      this.originWorldTransforms.get(t.attrs.id),
      this.editor.hostEventManager.isShiftPressing,
      this.editor.hostEventManager.isAltPressing,
      this.editor.setting.get("flipObjectsWhileResizing")
    );
    t.updateAttrs(e, {
      finishRecomputed: !0
    }), this.updatedAttrsMap.set(t.attrs.id, A(e)), xn(
      this.editor,
      ie([t]),
      this.originAttrsMap,
      this.updatedAttrsMap
    ), this.updateControls(t);
  }
  updateGraphics() {
    if (!this.lastDragPoint) return;
    let t = new R();
    const e = this.editor.selectedElements.getItems();
    if (e.length === 1) {
      const n = e[0];
      if (!this.isResizeOp() || n.attrs.height === 0) {
        this.updateSingleGraphics(n);
        return;
      }
      const i = this.originWorldTransforms.get(
        n.attrs.id
      ), r = this.originAttrsMap.get(n.attrs.id), o = ds(
        this.handleName,
        this.lastDragPoint,
        {
          width: r.width,
          height: r.height,
          transform: i
        },
        {
          keepRatio: this.editor.hostEventManager.isShiftPressing,
          scaleFromCenter: this.editor.hostEventManager.isAltPressing,
          noChangeWidthAndHeight: !0,
          flip: this.editor.setting.get("flipObjectsWhileResizing")
        }
      );
      if (!this.checkEnableUpdate(
        r,
        es(o)
      ))
        return;
      t = new R(...o.transform).append(
        new R(...i).invert()
      ), this.updateControls(e[0]);
    } else {
      const n = this.startSelectBRect, i = new R().translate(
        n.x,
        n.y
      ), r = ds(
        this.handleName,
        this.lastDragPoint,
        {
          width: n.width,
          height: n.height,
          transform: i.getArray()
        },
        {
          keepRatio: this.editor.hostEventManager.isShiftPressing,
          scaleFromCenter: this.editor.hostEventManager.isAltPressing,
          noChangeWidthAndHeight: !0,
          flip: this.editor.setting.get("flipObjectsWhileResizing")
        }
      );
      t = new R(...r.transform).append(
        i.clone().invert()
      );
    }
    this.isResizeOp() ? this.resizeGraphicsArray(t.getArray()) : console.error("should not reach here, please put a issue");
  }
  resizeGraphicsArray(t) {
    const e = this.editor.selectedElements.getItems();
    for (const n of e) {
      const i = n.attrs.id, r = this.originWorldTransforms.get(i), o = vt(t, r), a = vt(
        Rt(n.getParentWorldTransform()),
        o
      ), { width: h, height: l } = this.originAttrsMap.get(i), d = es({
        width: h,
        height: l,
        transform: a
      });
      n.updateAttrs(d), this.updatedAttrsMap.set(i, A(d));
    }
    this.updateChildren(t), xn(
      this.editor,
      ie(e),
      this.originAttrsMap,
      this.updatedAttrsMap
    );
  }
  updateChildren(t) {
    for (const e of this.childNodeSet) {
      const n = e.attrs.id, i = this.originWorldTransforms.get(n), r = vt(t, i), o = vt(
        Rt(e.getParentWorldTransform()),
        r
      ), { width: a, height: h } = this.originAttrsMap.get(n), l = es({
        width: a,
        height: h,
        transform: o
      });
      e.updateAttrs(l), this.updatedAttrsMap.set(n, A(l));
    }
  }
  onEnd(t, e) {
    if (this.editor.selectedElements.size() === 0 || !e)
      return;
    const n = this.editor.selectedElements.getItems();
    this.editor.commandManager.pushCommand(
      new Ps(
        "Update Selected Graphics attributes by Control Handle",
        this.editor,
        this.originAttrsMap,
        this.updatedAttrsMap
      )
    ), n.length === 1 && (this.editor.controlHandleManager.setCustomHandles(
      n[0].getControlHandles(this.editor.zoomManager.getZoom(), !0)
    ), this.editor.render()), this.editor.commandManager.enableRedoUndo(), this.editor.hostEventManager.enableDelete();
  }
  afterEnd() {
    this.originAttrsMap = /* @__PURE__ */ new Map(), this.updatedAttrsMap = /* @__PURE__ */ new Map(), this.lastDragPoint = null, this.editor.refLine.clear();
  }
}
class Sd {
  constructor(t) {
    g(this, "originWorldTfMap", /* @__PURE__ */ new Map());
    g(this, "transaction");
    g(this, "selectedItems", []);
    g(this, "lastPoint", null);
    g(this, "startRotation", 0);
    g(this, "startBboxRotation", 0);
    g(this, "dRotation", 0);
    // 按下，然后释放的整个过程中，产生的相对角度
    /** center of selected graphs */
    g(this, "selectedBoxCenter", null);
    g(this, "handleType", "");
    g(this, "shiftPressHandler", () => {
      this.rotateSelectedGraphics();
    });
    this.editor = t, this.transaction = new Z(t);
  }
  onActive() {
    this.editor.hostEventManager.on("shiftToggle", this.shiftPressHandler);
  }
  onInactive() {
    this.editor.hostEventManager.off("shiftToggle", this.shiftPressHandler);
  }
  onStart(t) {
    this.selectedItems = this.editor.selectedElements.getItems({
      excludeLocked: !0
    });
    for (const i of this.selectedItems)
      this.transaction.recordOld(i.attrs.id, {
        transform: A(i.attrs.transform)
      }), this.originWorldTfMap.set(
        i.attrs.id,
        i.getWorldTransform()
      );
    const e = this.editor.selectedElements.getBoundingRect();
    this.selectedBoxCenter = {
      x: e.x + e.width / 2,
      y: e.y + e.height / 2
    };
    const n = this.editor.getSceneCursorXY(t);
    this.startRotation = _t(
      { x: 0, y: -1 },
      {
        x: n.x - this.selectedBoxCenter.x,
        y: n.y - this.selectedBoxCenter.y
      }
    ), this.startBboxRotation = this.editor.selectedElements.getRotation();
  }
  onDrag(t) {
    this.lastPoint = this.editor.getSceneCursorXY(t), this.rotateSelectedGraphics();
  }
  rotateSelectedGraphics() {
    const t = this.lastPoint;
    if (!t) return;
    const e = this.editor, n = this.selectedItems, { x: i, y: r } = this.selectedBoxCenter, o = _t(
      { x: 0, y: -1 },
      {
        x: t.x - i,
        y: t.y - r
      }
    );
    if (this.dRotation = o - this.startRotation, e.hostEventManager.isShiftPressing) {
      const a = e.setting.get("lockRotation"), h = this.startBboxRotation + this.dRotation;
      this.dRotation = Q(h, a) - this.startBboxRotation;
    }
    e.selectedElements.size() === 1 ? e.setCursor(
      gn(this.handleType, e.selectedBox.getBox())
    ) : e.setCursor({
      type: "rotation",
      degree: mn(o)
    });
    for (const a of n)
      a.dRotate(
        this.dRotation,
        this.originWorldTfMap.get(a.attrs.id),
        {
          x: i,
          y: r
        }
      ), this.transaction.update(a.attrs.id, {
        transform: [...a.attrs.transform]
      });
    this.transaction.updateParentSize(this.selectedItems), e.render();
  }
  onEnd() {
    this.dRotation !== 0 && this.transaction.commit("Rotate Elements");
  }
  afterEnd() {
    this.transaction = new Z(this.editor), this.lastPoint = null, this.dRotation = 0, this.selectedBoxCenter = null;
  }
}
class Cd {
  constructor(t) {
    g(this, "startPoint", { x: -1, y: -1 });
    g(this, "isShiftPressingWhenStart", !1);
    g(this, "startSelectedGraphs", []);
    g(this, "startPointWhenSpaceDown", null);
    g(this, "lastDragPointWhenSpaceDown", null);
    g(this, "lastMouseScenePoint");
    g(this, "lastMousePoint");
    this.editor = t;
  }
  onActive() {
  }
  onInactive() {
  }
  onStart(t) {
    this.isShiftPressingWhenStart = !1, this.editor.hostEventManager.isShiftPressing ? (this.isShiftPressingWhenStart = !0, this.startSelectedGraphs = this.editor.selectedElements.getItems()) : this.editor.selectedElements.clear(), this.startPoint = this.editor.getSceneCursorXY(t), this.editor.render(), this.editor.sceneGraph.setSelection(this.startPoint);
  }
  onDrag(t) {
    this.lastMouseScenePoint = this.editor.getSceneCursorXY(t), this.lastMousePoint = this.lastMouseScenePoint, this.updateSelectionAndSelectSet();
  }
  updateSelectionAndSelectSet() {
    const { x: t, y: e } = this.lastMouseScenePoint;
    if (this.startPointWhenSpaceDown && this.lastDragPointWhenSpaceDown) {
      const { x: i, y: r } = this.startPointWhenSpaceDown, { x: o, y: a } = this.lastDragPointWhenSpaceDown, h = t - o, l = e - a;
      this.startPoint = {
        x: i + h,
        y: r + l
      };
    }
    const n = Vi(this.startPoint, this.lastMouseScenePoint);
    if (this.editor.sceneGraph.setSelection(n), this.isShiftPressingWhenStart) {
      const i = ie(this.startSelectedGraphs), r = co(
        this.editor,
        i
      );
      this.editor.selectedElements.setItems(this.startSelectedGraphs), this.editor.selectedElements.toggleItems(
        r.filter((o) => !i.has(o.attrs.id))
      );
    } else {
      const i = co(this.editor);
      this.editor.selectedElements.setItems(i);
    }
    this.editor.render();
  }
  onEnd() {
  }
  afterEnd() {
    this.isShiftPressingWhenStart = !1, this.startSelectedGraphs = [], this.editor.sceneGraph.selection = null, this.editor.render(), this.startPointWhenSpaceDown = null, this.lastDragPointWhenSpaceDown = null;
  }
  onSpaceToggle(t) {
    this.editor.toolManager.isDragging() && t ? (this.startPointWhenSpaceDown = this.startPoint, this.lastDragPointWhenSpaceDown = this.lastMousePoint, this.updateSelectionAndSelectSet()) : (this.startPointWhenSpaceDown = null, this.lastDragPointWhenSpaceDown = null);
  }
}
const lo = "select", go = "v";
class Le {
  constructor(t) {
    g(this, "type", lo);
    g(this, "hotkey", go);
    g(this, "cursor", "default");
    g(this, "startPoint", { x: -1, y: -1 });
    g(this, "currStrategy", null);
    // 策略
    g(this, "strategyMove");
    g(this, "strategyDrawSelection");
    g(this, "strategySelectRotation");
    g(this, "strategySelectResize");
    /** the graphics should be removed from selected if not moved */
    g(this, "graphShouldRemovedFromSelectedIfNotMoved", null);
    g(this, "handleHoverItemChange", () => {
      this.editor.toolManager.isDragging() || this.editor.render();
    });
    // double click to active path editor
    g(this, "onComboClick", (t) => {
      const e = t.pos, n = this.editor;
      if (n.controlHandleManager.getHandleInfoByPoint(e)) return;
      const r = ss(n, e);
      if (r) {
        if (r instanceof gt)
          n.pathEditor.active(r);
        else if (r instanceof ze)
          n.textEditor.active({
            textGraphics: r,
            pos: r.getWorldPosition(),
            range: {
              start: 0,
              end: r.getContentLength()
            }
          }), t.nativeEvent.preventDefault();
        else if (r instanceof ze)
          n.textEditor.active({
            textGraphics: r,
            pos: r.getWorldPosition()
          }), t.nativeEvent.preventDefault();
        else if (pt(r) && r.isGroup()) {
          const o = r.getChildren();
          for (let a = o.length - 1; a >= 0; a--)
            if (o[a].hitTestChildren(e)) {
              this.editor.hostEventManager.isShiftPressing ? this.editor.selectedElements.toggleItems([o[a]]) : this.editor.selectedElements.setItems([o[a]]), n.selectedElements.setHoverItem(o[a]);
              break;
            }
        }
      }
    });
    g(this, "updateCursorAndHlHoverGraph", $i((t) => {
      if (this.editor.canvasDragger.isActive())
        return;
      const n = this.editor.controlHandleManager.getHandleInfoByPoint(t);
      if (this.editor.setCursor((n == null ? void 0 : n.cursor) || "default"), n || !this.editor.hostEventManager.isShiftPressing && this.editor.selectedBox.hitTest(t))
        this.editor.selectedElements.setHoverItem(null);
      else {
        const i = ss(this.editor, t);
        this.editor.selectedElements.setHoverItem(i);
      }
    }, 20));
    this.editor = t, this.strategyMove = new vd(t), this.strategyDrawSelection = new Cd(t), this.strategySelectRotation = new Sd(t), this.strategySelectResize = new wd(t);
  }
  onActive() {
    this.editor.selectedElements.on(
      "hoverItemChange",
      this.handleHoverItemChange
    ), this.editor.mouseEventManager.on("comboClick", this.onComboClick);
  }
  onInactive() {
    this.editor.selectedElements.setHighlightedItem(null), this.editor.selectedElements.off(
      "hoverItemChange",
      this.handleHoverItemChange
    ), this.editor.mouseEventManager.off("comboClick", this.onComboClick), this.updateCursorAndHlHoverGraph.cancel(), this.editor.render();
  }
  onMoveExcludeDrag(t, e) {
    if (e || this.editor.textEditor.isActive())
      return;
    const n = this.editor.getSceneCursorXY(t);
    this.updateCursorAndHlHoverGraph(n), this.editor.selectedBox.setHoverByPoint(n);
  }
  onStart(t) {
    if (this.currStrategy = null, this.graphShouldRemovedFromSelectedIfNotMoved = null, this.editor.hostEventManager.isDraggingCanvasBySpace)
      return;
    const e = this.editor.sceneGraph, n = this.editor.selectedElements, i = this.editor.hostEventManager.isShiftPressing;
    this.startPoint = this.editor.getSceneCursorXY(t);
    const r = this.editor.controlHandleManager.getHandleInfoByPoint(
      this.startPoint
    );
    if (r)
      cd(r.cursor) ? (this.strategySelectRotation.handleType = r.handleName, this.currStrategy = this.strategySelectRotation) : this.currStrategy = this.strategySelectResize;
    else {
      const o = this.editor.selectedBox.hitTest(
        this.startPoint
      ), a = ss(this.editor, this.startPoint);
      a && i && n.getItems().includes(a) && (this.graphShouldRemovedFromSelectedIfNotMoved = a), o ? this.currStrategy = this.strategyMove : a ? (i ? n.getItems().includes(a) || n.toggleItems([a]) : n.setItems([a]), this.editor.selectedBox.setHover(!0), e.render(), this.currStrategy = this.strategyMove) : this.currStrategy = this.strategyDrawSelection;
    }
    if (this.currStrategy)
      this.currStrategy.onActive(), this.currStrategy.onStart(t);
    else
      throw new Error("没有根据判断选择策略，代码有问题");
  }
  onDrag(t) {
    if (!this.editor.hostEventManager.isDraggingCanvasBySpace)
      if (this.currStrategy)
        this.currStrategy.onDrag(t);
      else
        throw new Error("没有根据判断选择策略，代码有问题");
  }
  onEnd(t, e) {
    if (this.editor.controlHandleManager.showCustomHandles(), this.editor.hostEventManager.isDraggingCanvasBySpace)
      return;
    !e && this.graphShouldRemovedFromSelectedIfNotMoved && (this.editor.selectedElements.toggleItems([
      this.graphShouldRemovedFromSelectedIfNotMoved
    ]), this.editor.render());
    const n = this.currStrategy;
    if (n)
      n.onEnd(t, e), n.onInactive();
    else
      throw new Error("没有根据判断选择策略，代码有问题");
  }
  afterEnd(t, e) {
    var i;
    this.editor.hostEventManager.isDraggingCanvasBySpace || this.editor.setCursor("default"), this.graphShouldRemovedFromSelectedIfNotMoved = null, (i = this.currStrategy) == null || i.afterEnd(t, e), this.currStrategy = null;
    const n = this.editor.getSceneCursorXY(t);
    this.editor.selectedBox.setHoverByPoint(n), this.updateCursorAndHlHoverGraph(n);
  }
  onCanvasDragActiveChange(t) {
    t && this.editor.selectedElements.setHoverItem(null);
  }
  onSpaceToggle(t) {
    var e;
    (e = this.currStrategy) != null && e.onSpaceToggle && this.currStrategy.onSpaceToggle(t);
  }
  onShiftToggle(t) {
    var e;
    (e = this.currStrategy) != null && e.onShiftToggle && this.currStrategy.onShiftToggle(t);
  }
}
g(Le, "type", lo), g(Le, "hotkey", go);
class bd {
  constructor(t) {
    /** tool type(string) => tool class constructor */
    g(this, "toolCtorMap", /* @__PURE__ */ new Map());
    /** hotkey => tool type */
    g(this, "hotkeySet", /* @__PURE__ */ new Set());
    g(this, "currentTool", null);
    g(this, "eventEmitter", new mt());
    g(this, "enableSwitchTool", !0);
    g(this, "keyBindingToken", []);
    g(this, "_isDragging", !1);
    g(this, "enableToolTypes", []);
    g(this, "currViewportPoint", { x: 1 / 0, y: 1 / 0 });
    g(this, "_unbindEvent");
    this.editor = t, this.registerToolCtor(Le), this.registerToolCtor(ps), this.registerToolCtor(xs), this.registerToolCtor(fs), this.registerToolCtor(ms), this.registerToolCtor(ys), this.registerToolCtor(Ss), this.registerToolCtor(us), this.registerToolCtor(me), this.registerToolCtor(Oe), this.registerToolCtor(vs), this.registerToolCtor(ws), this.registerToolCtor(Cs), this.setEnableHotKeyTools([
      Le.type,
      ps.type,
      xs.type,
      fs.type,
      ms.type,
      Oe.type,
      Cs.type,
      ys.type,
      vs.type,
      ws.type,
      Ss.type,
      us.type
    ]), this.setActiveTool(Le.type), this._unbindEvent = this.bindEvent();
  }
  unbindHotkey() {
    this.keyBindingToken.forEach((t) => {
      this.editor.keybindingManager.unregister(t);
    }), this.keyBindingToken = [];
  }
  setEnableHotKeyTools(t) {
    this.enableToolTypes = t, this.eventEmitter.emit("changeEnableTools", [...t]);
  }
  getEnableTools() {
    return [...this.enableToolTypes];
  }
  registerToolCtor(t) {
    const e = t.type;
    this.toolCtorMap.has(e) && console.warn(`tool "${e}" had exit, replace it!`), this.toolCtorMap.set(e, t);
    const n = t.hotkey;
    let i = "", r;
    if (!n) {
      console.log(`${e} has no hotkey`);
      return;
    }
    typeof n == "string" ? (i = `Key${n.toUpperCase()}`, r = { keyCode: i }) : (i = `${n.altKey ? "alt+" : ""}${n.ctrlKey ? "ctrl+" : ""}${n.shiftKey ? "shift+" : ""}${n.metaKey ? "meta+" : ""}${n.keyCode}`, r = n), this.hotkeySet.has(i) && console.log(`register same hotkey: "${i}"`), this.hotkeySet.add(i);
    const o = this.editor.keybindingManager.register({
      key: r,
      actionName: e,
      when: () => this.enableToolTypes.includes(e),
      action: () => {
        this.setActiveTool(e);
      }
    });
    this.keyBindingToken.push(o);
  }
  getActiveToolName() {
    var t;
    return (t = this.currentTool) == null ? void 0 : t.type;
  }
  /**
   * bind event
   * about dragBlockStep: https://mp.weixin.qq.com/s/05lbcYIJ8qwP8EHCXzgnqA
   */
  bindEvent() {
    let t = !1, e = { x: 0, y: 0 }, n = !1;
    const i = (x) => {
      setTimeout(() => {
        if (t = !1, this._isDragging = !1, n = !1, !(x.button !== 0 || // is not left mouse
        this.editor.textEditor.isActive() || // is editing text mode
        this.editor.hostEventManager.isSpacePressing)) {
          if (t = !0, n = !0, !this.currentTool)
            throw new Error("there is no active tool");
          e = { x: x.clientX, y: x.clientY }, this.currentTool.onStart(x);
        }
      });
    }, r = (x) => {
      var y, S;
      if (this.currViewportPoint = this.editor.getCursorXY(x), !this.currentTool)
        throw new Error("未设置当前使用工具");
      if (t) {
        if (!n)
          return;
        const w = x.clientX - e.x, b = x.clientY - e.y, C = ((S = (y = this.currentTool).getDragBlockStep) == null ? void 0 : S.call(y)) ?? this.editor.setting.get("dragBlockStep");
        !this._isDragging && (Math.abs(w) > C || Math.abs(b) > C) && (this._isDragging = !0), this._isDragging && (this.enableSwitchTool = !1, this.editor.canvasDragger.disableDragBySpace(), this.currentTool.onDrag(x));
      } else {
        const w = this.editor.canvasElement !== x.target;
        this.currentTool.onMoveExcludeDrag(x, w);
      }
    }, o = (x) => {
      if (this.enableSwitchTool = !0, !!n) {
        if (!this.currentTool)
          throw new Error("未设置当前使用工具");
        t && (this.editor.canvasDragger.enableDragBySpace(), t = !1, this.currentTool.onEnd(x, this._isDragging), this.currentTool.afterEnd(x, this._isDragging)), this._isDragging = !1;
      }
    }, a = () => {
      var x, y;
      (y = (x = this.currentTool) == null ? void 0 : x.onCommandChange) == null || y.call(x);
    }, h = (x) => {
      var y, S;
      (S = (y = this.currentTool) == null ? void 0 : y.onSpaceToggle) == null || S.call(y, x);
    }, l = (x) => {
      var y, S;
      (S = (y = this.currentTool) == null ? void 0 : y.onShiftToggle) == null || S.call(y, x);
    }, d = (x) => {
      var y, S;
      (S = (y = this.currentTool) == null ? void 0 : y.onAltToggle) == null || S.call(y, x);
    }, u = (x, y) => {
      var S, w;
      (w = (S = this.currentTool) == null ? void 0 : S.onViewportXOrYChange) == null || w.call(S, x, y);
    }, p = (x) => {
      var y, S;
      (S = (y = this.currentTool) == null ? void 0 : y.onCanvasDragActiveChange) == null || S.call(y, x);
    }, m = this.editor.canvasElement;
    return m.addEventListener("pointerdown", i), window.addEventListener("pointermove", r), window.addEventListener("pointerup", o), this.editor.commandManager.on("change", a), this.editor.hostEventManager.on("spaceToggle", h), this.editor.hostEventManager.on("shiftToggle", l), this.editor.hostEventManager.on("altToggle", d), this.editor.viewportManager.on("xOrYChange", u), this.editor.canvasDragger.on("activeChange", p), () => {
      m.removeEventListener("pointerdown", i), window.removeEventListener("pointermove", r), window.removeEventListener("pointerup", o), this.editor.commandManager.off("change", a), this.editor.hostEventManager.off("spaceToggle", h), this.editor.hostEventManager.off("shiftToggle", l), this.editor.hostEventManager.off("altToggle", d), this.editor.viewportManager.off("xOrYChange", u), this.editor.canvasDragger.off(
        "activeChange",
        p
      );
    };
  }
  unbindEvent() {
    this._unbindEvent(), this._unbindEvent = xe, this.unbindHotkey();
  }
  async setActiveTool(t) {
    if (!this.enableSwitchTool || this.getActiveToolName() === t)
      return;
    if (!this.enableToolTypes.includes(t)) {
      console.warn(`target tool "${t}" is not enable`);
      return;
    }
    const e = this.toolCtorMap.get(t) || null;
    if (!e)
      throw new Error(`tool "${t}" is not registered`);
    const n = new e(this.editor);
    if (n.enableActive && !await n.enableActive())
      return;
    const i = this.currentTool;
    this.currentTool = n, i && i.onInactive(), this.setCursorWhenActive(), n.onActive(), this.eventEmitter.emit("switchTool", n.type);
  }
  on(t, e) {
    this.eventEmitter.on(t, e);
  }
  off(t, e) {
    this.eventEmitter.off(t, e);
  }
  destroy() {
    var t;
    (t = this.currentTool) == null || t.onInactive();
  }
  setCursorWhenActive() {
    this.currentTool && this.editor.cursorManager.setCursor(this.currentTool.cursor);
  }
  isDragging() {
    return this._isDragging;
  }
  getCurrPoint() {
    return this.editor.toScenePt(
      this.currViewportPoint.x,
      this.currViewportPoint.y
    );
  }
}
class Md {
  constructor(t) {
    /** 没有被选中，但要绘制的 anchor/in/out 控制点 */
    g(this, "normalControls", []);
    /** 需要高亮的控制点 */
    g(this, "selectedControls", []);
    /** 需要绘制控制点的 segment */
    g(this, "segControlsNeedDraw", []);
    g(this, "drawControlHandles", $i((t = []) => {
      t = this.generateControls().concat(t), this.editor.controlHandleManager.setCustomHandles(t), this.editor.controlHandleManager.showCustomHandles();
    }));
    this.editor = t;
  }
  getSegControlsNeedDraw() {
    return this.segControlsNeedDraw;
  }
  getItemsNeedDraw() {
    const t = this.editor.pathEditor.getPath(), e = /* @__PURE__ */ new Map(), n = [];
    if (!t)
      return console.warn("path is no exist"), {
        segControlsNeedDrawMap: e,
        segControlsNeedDraw: n
      };
    const i = [...this.selectedControls, ...this.normalControls];
    for (const r of i) {
      const { type: o, pathIdx: a, segIdx: h } = r;
      if (a < 0 || a >= t.attrs.pathData.length)
        continue;
      const l = t.attrs.pathData[a], d = l.segs.length, u = l.closed;
      if (h < 0 || h >= d)
        continue;
      let p = e.get(a);
      p || (p = /* @__PURE__ */ new Set(), e.set(a, p)), p.add(h), n.push({ pathIdx: a, segIdx: h });
      const m = h - 1, x = h + 1;
      o === "anchor" ? (m >= 0 ? (p.add(m), n.push({ pathIdx: a, segIdx: m })) : u && (p.add(d - 1), n.push({ pathIdx: a, segIdx: d - 1 })), x < d ? (p.add(x), n.push({ pathIdx: a, segIdx: x })) : u && (p.add(0), n.push({ pathIdx: a, segIdx: 0 }))) : o === "in" ? m >= 0 && (p.add(m), n.push({ pathIdx: a, segIdx: m })) : (o === "out" || o === "curve") && x < d && (p.add(x), n.push({ pathIdx: a, segIdx: x }));
    }
    return {
      segControlsNeedDrawMap: e,
      segControlsNeedDraw: n
    };
  }
  /**
   * get anchor and control handles
   */
  generateControls() {
    const t = this.editor.pathEditor.getPath();
    if (!t)
      return [];
    const e = 4, n = 6, i = this.editor.setting.get("handleStroke"), r = this.editor.zoomManager.getZoom(), o = t.attrs.pathData, { segControlsNeedDrawMap: a, segControlsNeedDraw: h } = this.getItemsNeedDraw();
    this.segControlsNeedDraw = h;
    const l = [], d = [];
    for (let u = 0; u < o.length; u++) {
      const p = o[u];
      for (let m = 0; m < p.segs.length; m++) {
        const x = t.getSeg(u, m, {
          applyTransform: !0
        }), y = x.point;
        let S = 6, w = "#fff", b = i;
        this.contains("anchor", u, m) && (S = 8, w = i, b = "#fff");
        const C = new st({
          cx: y.x,
          cy: y.y,
          type: ["anchor", u, m].join("-"),
          graphics: new bn(
            {
              objectName: "anchor",
              width: S,
              height: S,
              fill: [
                {
                  type: B.Solid,
                  attrs: it(w)
                }
              ],
              stroke: [
                {
                  type: B.Solid,
                  attrs: it(b)
                }
              ],
              strokeWidth: 1
            },
            {
              advancedAttrs: this.editor.toViewportPt(
                y.x + S / 2,
                y.y + S / 2
              ),
              doc: this.editor.doc
            }
          ),
          padding: e,
          getCursor: () => "default"
        });
        l.push(C);
        const I = a.get(u);
        if (!I || !I.has(m))
          continue;
        const M = it(
          this.editor.setting.get("pathLineStroke")
        ), E = [
          gt.getHandleIn(x),
          gt.getHandleOut(x)
        ];
        for (let T = 0; T < E.length; T++) {
          const k = E[T];
          if (Ni(k, y))
            continue;
          const L = T === 0 && this.contains("in", u, m) || T === 1 && this.contains("out", u, m), W = ol(y, k), D = new st({
            cx: W.x + W.width / 2,
            cy: W.y + W.height / 2,
            type: "handleLine",
            rotation: W.rotation,
            graphics: new Ui(
              {
                objectName: "handleLine",
                height: W.height,
                width: W.width * r,
                stroke: [
                  {
                    type: B.Solid,
                    attrs: L ? it(i) : M
                  }
                ],
                strokeWidth: 1
              },
              {
                advancedAttrs: { x: W.x, y: W.y },
                doc: this.editor.doc
              }
            ),
            hitTest: () => !1,
            getCursor: () => "default"
          }), _ = L ? 8.5 : n, Y = new st({
            cx: k.x,
            cy: k.y,
            type: [T === 0 ? "in" : "out", u, m].join("-"),
            graphics: new Zi(
              {
                objectName: "pathHandle",
                width: _,
                height: _,
                fill: [
                  {
                    type: B.Solid,
                    attrs: it(L ? i : "#fff")
                  }
                ],
                stroke: [
                  {
                    type: B.Solid,
                    attrs: it(L ? "#fff" : i)
                  }
                ],
                strokeWidth: L ? 1.5 : 1,
                count: 4
              },
              {
                advancedAttrs: this.editor.toViewportPt(
                  k.x + _ / 2,
                  k.y + _ / 2
                ),
                doc: this.editor.doc
              }
            ),
            padding: e,
            getCursor: () => "default"
          });
          d.push(D, Y);
        }
      }
    }
    return l.concat(d);
  }
  contains(t, e, n) {
    return this.selectedControls.some(
      (i) => i.type === t && i.pathIdx === e && i.segIdx === n
    );
  }
  getSelectedControlsSize() {
    return this.selectedControls.length;
  }
  getSelectedControls() {
    return A(this.selectedControls);
  }
  setItems(t) {
    this.selectedControls = t;
  }
  clear() {
    this.selectedControls = [];
  }
  setNormalControls(t) {
    this.normalControls = t;
  }
  getNormalControls() {
    return A(this.normalControls);
  }
}
class Ji {
  constructor(t) {
    g(this, "_active", !1);
    g(this, "path", null);
    g(this, "eventTokens", []);
    g(this, "prevToolKeys", []);
    g(this, "eventEmitter", new mt());
    g(this, "selectedControl");
    g(this, "onSelectedChange", (t) => {
      t.length === 0 || t[0] === this.path || (this.inactive(), this.editor.toolManager.setActiveTool("select"));
    });
    this.editor = t, this.selectedControl = new Md(t);
  }
  getPath() {
    return this.path;
  }
  isActive() {
    return this._active;
  }
  active(t) {
    this._active = !0, this.path = t;
    const e = this.editor;
    e.sceneGraph.showSelectedGraphsOutline = !1, e.sceneGraph.highlightLayersOnHover = !1, e.controlHandleManager.enableTransformControl = !1, this.unbindHotkeys(), this.bindHotkeys(), this.prevToolKeys = e.toolManager.getEnableTools(), e.toolManager.setEnableHotKeyTools([
      me.type,
      Oe.type
    ]);
    const n = e.toolManager.getActiveToolName();
    n !== me.type && n !== Oe.type && e.toolManager.setActiveTool(me.type), e.selectedElements.on("itemsChange", this.onSelectedChange), e.pathEditor.drawControlHandles(), this.eventEmitter.emit("toggle", !0);
  }
  inactive(t) {
    if (!this._active)
      return;
    this._active = !1, t !== "undo" && this.removePathIfEmpty(), this.selectedControl.clear(), this.path = null;
    const e = this.editor;
    e.sceneGraph.showSelectedGraphsOutline = !0, e.sceneGraph.highlightLayersOnHover = !0, e.controlHandleManager.enableTransformControl = !0, this.unbindHotkeys(), e.toolManager.setEnableHotKeyTools(this.prevToolKeys), e.toolManager.setActiveTool(Le.type), e.selectedElements.off("itemsChange", this.onSelectedChange), e.controlHandleManager.clearCustomHandles(), e.render(), this.eventEmitter.emit("toggle", !1);
  }
  removePathIfEmpty() {
    const t = this.path;
    if (!t) return;
    const e = t.attrs.pathData;
    (e.length === 0 || e.every((n) => n.segs.length <= 1)) && (qi(this.editor, [t]), this.editor.selectedElements.clear());
  }
  bindHotkeys() {
    const t = this.editor;
    this.eventTokens = [];
    let e = t.keybindingManager.registerWithHighPrior({
      key: [{ keyCode: "Backspace" }, { keyCode: "Delete" }],
      when: (n) => !n.isToolDragging,
      actionName: "Path Delete",
      action: () => {
      }
    });
    this.eventTokens.push(e), e = t.keybindingManager.registerWithHighPrior({
      key: { keyCode: "Escape" },
      when: (n) => !n.isToolDragging,
      actionName: "Path Finish",
      action: () => {
        this.selectedControl.getSelectedControlsSize() > 0 ? (this.selectedControl.clear(), this.drawControlHandles(), this.editor.render()) : this.inactive();
      }
    }), this.eventTokens.push(e), e = t.keybindingManager.registerWithHighPrior({
      key: { keyCode: "Enter" },
      when: (n) => !n.isToolDragging,
      actionName: "Path End",
      action: () => {
        this.inactive();
      }
    }), this.eventTokens.push(e);
  }
  unbindHotkeys() {
    for (const t of this.eventTokens)
      this.editor.keybindingManager.unregister(t);
    this.eventTokens = [];
  }
  /**
   * parse selected index from string
   * e.g. 'anchor-0-1' -> { type: 'anchor', pathIdx: 0, segIdx: 1 }
   */
  static parseSelectedInfoStr(t) {
    const e = t.split("-");
    return e.length !== 3 ? null : {
      type: e[0],
      pathIdx: parseInt(e[1]),
      segIdx: parseInt(e[2])
    };
  }
  on(t, e) {
    this.eventEmitter.on(t, e);
  }
  off(t, e) {
    this.eventEmitter.off(t, e);
  }
  drawControlHandles(t = []) {
    this.selectedControl.drawControlHandles(t);
  }
}
var Jo = { exports: {} };
(function(s, t) {
  (function(e, n) {
    s.exports = n();
  })(V, function() {
    var e = function() {
      function n(m) {
        return o.appendChild(m.dom), m;
      }
      function i(m) {
        for (var x = 0; x < o.children.length; x++) o.children[x].style.display = x === m ? "block" : "none";
        r = m;
      }
      var r = 0, o = document.createElement("div");
      o.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000", o.addEventListener("click", function(m) {
        m.preventDefault(), i(++r % o.children.length);
      }, !1);
      var a = (performance || Date).now(), h = a, l = 0, d = n(new e.Panel("FPS", "#0ff", "#002")), u = n(new e.Panel("MS", "#0f0", "#020"));
      if (self.performance && self.performance.memory) var p = n(new e.Panel("MB", "#f08", "#201"));
      return i(0), { REVISION: 16, dom: o, addPanel: n, showPanel: i, begin: function() {
        a = (performance || Date).now();
      }, end: function() {
        l++;
        var m = (performance || Date).now();
        if (u.update(m - a, 200), m > h + 1e3 && (d.update(1e3 * l / (m - h), 100), h = m, l = 0, p)) {
          var x = performance.memory;
          p.update(x.usedJSHeapSize / 1048576, x.jsHeapSizeLimit / 1048576);
        }
        return m;
      }, update: function() {
        a = this.end();
      }, domElement: o, setMode: i };
    };
    return e.Panel = function(n, i, r) {
      var o = 1 / 0, a = 0, h = Math.round, l = h(window.devicePixelRatio || 1), d = 80 * l, u = 48 * l, p = 3 * l, m = 2 * l, x = 3 * l, y = 15 * l, S = 74 * l, w = 30 * l, b = document.createElement("canvas");
      b.width = d, b.height = u, b.style.cssText = "width:80px;height:48px";
      var C = b.getContext("2d");
      return C.font = "bold " + 9 * l + "px Helvetica,Arial,sans-serif", C.textBaseline = "top", C.fillStyle = r, C.fillRect(0, 0, d, u), C.fillStyle = i, C.fillText(n, p, m), C.fillRect(x, y, S, w), C.fillStyle = r, C.globalAlpha = 0.9, C.fillRect(x, y, S, w), { dom: b, update: function(I, M) {
        o = Math.min(o, I), a = Math.max(a, I), C.fillStyle = r, C.globalAlpha = 1, C.fillRect(0, 0, d, y), C.fillStyle = i, C.fillText(h(I) + " " + n + " (" + h(o) + "-" + h(a) + ")", p, m), C.drawImage(b, x + l, y, S - l, w, x, y, S - l, w), C.fillRect(x + S - l, y, l, w), C.fillStyle = r, C.globalAlpha = 0.9, C.fillRect(x + S - l, y, l, h((1 - I / M) * w));
      } };
    }, e;
  });
})(Jo);
var Id = Jo.exports;
const Td = /* @__PURE__ */ re(Id);
class Pd {
  constructor() {
    g(this, "stats", new Td());
    g(this, "rafId", 0);
  }
  start(t) {
    const e = this.stats;
    e.showPanel(0), e.dom.style.left = "300px", t.appendChild(e.dom);
    const n = () => {
      e.begin(), e.end(), this.rafId = requestAnimationFrame(n);
    };
    this.rafId = requestAnimationFrame(n);
  }
  destroy() {
    cancelAnimationFrame(this.rafId), this.stats.dom.remove();
  }
}
const uo = (s) => {
  const t = [1, 2, 5, 10, 25, 50, 100, 250, 500, 1e3, 2500, 5e3], e = 50 / s;
  for (let n = 0, i = t.length; n < i; n++)
    if (t[n] >= e) return t[n];
  return t[0];
};
class Ed {
  constructor(t) {
    g(this, "visible", !1);
    this.editor = t;
  }
  open() {
    this.visible = !0;
  }
  close() {
    this.visible = !1;
  }
  draw() {
    const t = this.editor.setting, e = t.get("rulerWidth"), n = this.editor.ctx, i = this.editor.viewportManager.getViewport(), { width: r, height: o } = i;
    n.save(), n.fillStyle = t.get("rulerBgColor"), n.fillRect(0, 0, r, e), n.fillRect(0, 0, e, o), this.drawSelectArea(), this.drawXRuler(), this.drawYRuler(), n.fillStyle = t.get("rulerBgColor"), n.fillRect(0, 0, e, e), n.strokeStyle = t.get("rulerStroke"), n.beginPath(), n.moveTo(0, e + 0.5), n.lineTo(r, e + 0.5), n.stroke(), n.closePath(), n.beginPath(), n.moveTo(e + 0.5, 0), n.lineTo(e + 0.5, o), n.stroke(), n.closePath(), n.restore();
  }
  drawSelectArea() {
    const t = this.editor.setting, e = t.get("rulerWidth"), n = this.editor.ctx, i = this.editor.zoomManager.getZoom(), r = this.editor.viewportManager.getViewport(), o = this.editor.selectedElements.getItems().map((a) => a.getBbox());
    n.fillStyle = t.get("rulerSelectedBgColor");
    for (const [a, h] of kr(
      o.map(({ minX: l, maxX: d }) => [l, d])
    ))
      n.fillRect(
        (a - r.x) * i,
        0,
        (h - a) * i,
        e
      );
    for (const [a, h] of kr(
      o.map(({ minY: l, maxY: d }) => [l, d])
    ))
      n.fillRect(
        0,
        (a - r.y) * i,
        e,
        (h - a) * i
      );
  }
  drawXRuler() {
    const t = this.editor.setting, e = t.get("rulerWidth"), n = this.editor.ctx, i = this.editor.zoomManager.getZoom(), r = this.editor.viewportManager.getViewport(), o = uo(i), a = e;
    let h = r.x + a / i;
    h = Q(h, o);
    const l = r.width;
    let { x: d } = this.editor.toScenePt(l, 0);
    d = Q(d, o), n.textAlign = "center";
    const u = e - t.get("rulerMarkSize");
    for (; h <= d; ) {
      n.strokeStyle = t.get("rulerMarkStroke"), n.fillStyle = t.get("rulerMarkStroke");
      const p = hs((h - r.x) * i);
      n.beginPath(), n.moveTo(p, u), n.lineTo(p, u + t.get("rulerMarkSize")), n.stroke(), n.closePath(), n.fillText(String(h), p, u - 4), h += o;
    }
  }
  drawYRuler() {
    const t = this.editor.setting, e = t.get("rulerWidth"), n = this.editor.ctx, i = this.editor.zoomManager.getZoom(), r = this.editor.viewportManager.getViewport(), o = uo(i), a = e;
    let h = r.y + a / i;
    h = Q(h, o);
    const l = r.height;
    let d = r.y + l / i;
    d = Q(d, o);
    const u = e - t.get("rulerMarkSize");
    for (n.textAlign = "center", n.fillStyle = t.get("rulerMarkStroke"); h <= d; ) {
      const p = hs((h - r.y) * i);
      n.beginPath(), n.moveTo(u, p), n.lineTo(u + t.get("rulerMarkSize"), p), n.stroke(), n.closePath(), Er(n, -Gt, u, p), n.fillText(String(h), u, p - 3), Er(n, Gt, u, p), h += o;
    }
  }
}
class kd {
  constructor(t) {
    this.editor = t;
  }
  draw() {
    const t = this.editor.ctx;
    t.save();
    const {
      x: e,
      y: n,
      width: i,
      height: r
    } = this.editor.viewportManager.getViewport(), o = this.editor.zoomManager.getZoom(), a = this.editor.setting, h = this.editor.setting.get("gridViewX"), l = this.editor.setting.get("gridViewY");
    let d = Q(e, h);
    const u = Q(e + i / o, h);
    for (; d <= u; ) {
      t.strokeStyle = a.get("pixelGridLineColor");
      const x = hs((d - e) * o);
      t.beginPath(), t.moveTo(x, 0), t.lineTo(x, r), t.stroke(), t.closePath(), d += h;
    }
    let p = Q(n, l);
    const m = Q(n + r / o, l);
    for (; p <= m; ) {
      t.strokeStyle = a.get("pixelGridLineColor");
      const x = hs((p - n) * o);
      t.beginPath(), t.moveTo(0, x), t.lineTo(i, x), t.stroke(), t.closePath(), p += l;
    }
    t.restore();
  }
}
const Ad = {
  [G.Graph]: X,
  [G.Rect]: dt,
  [G.Ellipse]: bn,
  [G.Line]: Ui,
  [G.Text]: ze,
  [G.Path]: gt,
  [G.RegularPolygon]: Zi,
  [G.Star]: Yo,
  [G.Frame]: Mn,
  [G.Canvas]: Ge,
  [G.Document]: Zo
};
class Dd {
  constructor(t) {
    g(this, "selection", null);
    g(this, "eventEmitter", new mt());
    g(this, "grid");
    g(this, "showBoxAndHandleWhenSelected", !0);
    g(this, "showSelectedGraphsOutline", !0);
    g(this, "highlightLayersOnHover", !0);
    // 全局重渲染
    g(this, "render", Dl(() => {
      var I, M, E;
      const {
        viewportManager: t,
        canvasElement: e,
        ctx: n,
        setting: i,
        renderer: r
      } = this.editor, o = t.getViewport(), a = this.editor.zoomManager.getZoom(), h = this.editor.selectedElements, l = r || n, d = this.editor.imgManager, u = bi(), p = -o.x, m = -o.y, x = i.get("canvasBgColor");
      r ? (console.log("🚀 Usando CanvasKit pipeline otimizada"), (I = r.clearBackground) == null || I.call(r, x, e.width, e.height), (M = r.setViewportTransform) == null || M.call(r, u, a, p, m)) : (console.log("⚠️ Fallback Canvas2D"), n.setTransform(1, 0, 0, 1, 0, 0), n.clearRect(0, 0, e.width, e.height), n.save(), n.fillStyle = x, n.fillRect(0, 0, e.width, e.height), n.restore(), n.scale(u * a, u * a), n.translate(p, m));
      const y = this.editor.doc.getCanvas(), S = a <= 1;
      if (y) {
        const T = this.editor.viewportManager.getBbox();
        l.save(), y.draw({
          ctx: l,
          imgManager: d,
          smooth: S,
          viewportArea: T
        }), l.restore();
      }
      if (n.save(), n.setTransform(1, 0, 0, 1, 0, 0), n.scale(u, u), i.get("enablePixelGrid") && a >= this.editor.setting.get("minPixelGridZoom") && this.grid.draw(), this.highlightLayersOnHover && i.get("highlightLayersOnHover")) {
        const T = h.getHighlightedItem();
        T && !h.hasItem(T) && this.drawGraphsOutline(
          [T],
          i.get("hoverOutlineStrokeWidth"),
          this.editor.setting.get("hoverOutlineStroke")
        );
      }
      const w = this.editor.selectedBox.updateBbox();
      if (this.showSelectedGraphsOutline && (this.drawGraphsOutline(
        this.editor.selectedElements.getItems().filter((T) => T.isVisible()),
        i.get("selectedOutlineStrokeWidth"),
        this.editor.setting.get("hoverOutlineStroke")
      ), this.editor.selectedBox.draw()), this.editor.pathEditor.isActive()) {
        const T = this.editor.pathEditor.getPath();
        T && this.drawGraphsOutline(
          [T],
          i.get("selectedOutlineStrokeWidth"),
          this.editor.setting.get("pathLineStroke")
        );
      }
      const b = 4, C = this.editor.doc.graphicsStoreManager.getFrames();
      for (const T of C) {
        if (pt(T) && T.isGroup() || T.isDeleted())
          continue;
        const k = T.getWorldPosition(), L = this.editor.toViewportPt(k.x, k.y);
        T.drawText(n, L.x, L.y - b);
      }
      if (this.showBoxAndHandleWhenSelected && this.editor.controlHandleManager.draw(w), this.editor.textEditor.drawRange(), this.selection) {
        n.save(), n.strokeStyle = i.get("selectionStroke"), n.fillStyle = i.get("selectionFill");
        const { x: T, y: k, width: L, height: W } = this.selection, { x: D, y: _ } = this.editor.toViewportPt(T, k), Y = L * a, j = W * a;
        n.fillRect(D, _, Y, j), n.strokeRect(
          D,
          _,
          Y,
          j
        ), n.restore();
      }
      this.editor.refLine.drawRefLine(n), i.get("enableRuler") && this.editor.ruler.draw(), n.restore(), r && ((E = r.flush) == null || E.call(r), console.log("✅ CanvasKit frame flushed")), this.eventEmitter.emit("render");
    }));
    this.editor = t, this.grid = new kd(t);
  }
  addItems(t) {
    for (const e of t)
      this.editor.doc.addGraphics(e);
  }
  drawGraphsOutline(t, e, n) {
    const i = this.editor.ctx, r = bi(), o = this.editor.viewportManager.getViewport(), a = this.editor.zoomManager.getZoom(), h = -o.x, l = -o.y;
    i.save(), i.setTransform(1, 0, 0, 1, 0, 0), i.scale(r * a, r * a), i.translate(h, l), e /= a;
    for (const d of t)
      i.save(), d.drawOutline(i, n, e), i.restore();
    i.restore();
  }
  setSelection(t) {
    this.selection = Object.assign({}, this.selection, t);
  }
  /**
   * get tree data with simple info (for layer panel)
   */
  toObjects() {
    const t = this.editor.doc.getCanvas();
    return t ? t.toObject().children ?? [] : [];
  }
  toJSON() {
    const t = this.editor.doc.getAllGraphicsArr().filter((n) => !n.isDeleted()).map((n) => n.toJSON()), e = {
      appVersion: this.editor.appVersion,
      paperId: this.editor.paperId,
      data: t
    };
    return JSON.stringify(e);
  }
  createGraphicsArr(t) {
    const e = [];
    for (const n of t) {
      const i = n.type, r = Ad[i];
      if (!r) {
        console.error(`Unsupported graphics type "${n.type}", ignore it`);
        continue;
      }
      e.push(new r(n, { doc: this.editor.doc }));
    }
    return e;
  }
  initGraphicsTree(t) {
    var n;
    const e = this.editor.doc.getCanvas();
    for (const i of t) {
      if (i instanceof Ge)
        continue;
      const r = i.getParent() ?? e;
      r && r !== i && r.insertChild(i, (n = i.attrs.parentIndex) == null ? void 0 : n.position);
    }
  }
  load(t, e) {
    const n = this.createGraphicsArr(t);
    e || this.editor.doc.clear(), this.addItems(n), this.initGraphicsTree(n);
  }
  on(t, e) {
    this.eventEmitter.on(t, e);
  }
  off(t, e) {
    this.eventEmitter.off(t, e);
  }
}
class Rd {
  constructor(t) {
    g(this, "box", null);
    g(this, "eventEmitter", new mt());
    g(this, "_hover", !1);
    g(this, "enableDrawSizeIndicator", !0);
    this.editor = t;
  }
  isHover() {
    return this._hover;
  }
  getBox() {
    return this.box ? { ...this.box } : null;
  }
  updateBbox() {
    const t = this.editor.selectedElements, e = t.size();
    if (e > 0)
      if (e === 1) {
        const n = t.getItems()[0], i = n.getSize();
        this.box = {
          width: i.width,
          height: i.height,
          transform: n.getWorldTransform()
        };
      } else {
        const n = t.getBoundingRect();
        this.box = {
          width: n.width,
          height: n.height,
          transform: [1, 0, 0, 1, n.x, n.y]
        };
      }
    else
      this.box = null;
    return this.box;
  }
  draw() {
    const t = this.box;
    if (!t)
      return;
    const e = this.editor.ctx, n = ne(
      {
        x: 0,
        y: 0,
        width: t.width,
        height: t.height
      },
      t.transform
    ).map((i) => this.editor.toViewportPt(i.x, i.y));
    this.drawBox(e, n), this.drawSizeIndicator(e, n, t);
  }
  drawBox(t, e) {
    const n = this.editor.setting.get("selectBoxStroke"), i = this.editor.setting.get("selectBoxStrokeWidth");
    t.save(), t.strokeStyle = n, t.lineWidth = i, t.beginPath(), t.moveTo(e[0].x, e[0].y);
    for (let r = 1; r < e.length; r++)
      t.lineTo(e[r].x, e[r].y);
    t.closePath(), t.stroke(), t.restore();
  }
  drawSizeIndicator(t, e, n) {
    if (!this.enableDrawSizeIndicator)
      return;
    const i = this.editor.setting.get("sizeIndicatorMinSize");
    if (q(e[0], e[1]) < i && q(e[1], e[2]) < i)
      return;
    let r = e[0], o = 0;
    for (let _ = 1; _ < e.length; _++)
      e[_].y > r.y && (r = e[_], o = _);
    let a = 1 / 0, h = e[0];
    for (let _ = 0; _ < e.length; _++) {
      if (_ === o || Ni(e[_], r))
        continue;
      let Y = _t(
        { x: 1, y: 0 },
        Yt(e[_], r),
        !0
      );
      Y > Math.PI / 2 && (Y = Math.PI - Y), Y < a && (a = Y, h = e[_]);
    }
    const l = Pi(r, h), [d, u] = el(
      [r, h],
      l,
      this.editor.setting.get("sizeIndicatorOffset")
    ), p = d.y > u.y ? d : u, m = this.editor.setting.get("sizeIndicatorRectRadius"), x = this.editor.setting.get("sizeIndicatorRectPadding"), y = this.editor.setting.get("sizeIndicatorNumPrecision"), S = this.editor.setting.get("sizeIndicatorTextColor"), w = this.editor.setting.get("sizeIndicatorTextFontStyle"), b = fr(n.width, y), C = fr(n.height, y), I = `${b} × ${C}`;
    t.save(), t.font = w;
    const M = t.measureText(I), E = M.width, T = M.fontBoundingBoxAscent, k = T + M.fontBoundingBoxDescent, L = new R().translate(-E / 2, 0).rotate(_t({ x: 0, y: 1 }, Yt(p, l))).translate(p.x, p.y), W = this.editor.setting.get("selectBoxStroke");
    t.fillStyle = W, t.transform(...L.getArray()), t.beginPath();
    const D = ki(
      { x: 0, y: 0, width: E, height: k },
      x
    );
    t.roundRect(D.x, D.y, D.width, D.height, m), t.fill(), t.translate(0, T), t.fillStyle = S, t.fillText(I, 0, 0), t.restore();
  }
  /** check if the point is in the selected box */
  hitTest(t) {
    return this.box ? ji(
      t,
      this.box,
      2 / this.editor.zoomManager.getZoom()
    ) : !1;
  }
  setHover(t) {
    this._hover !== t && (this._hover = t, this.eventEmitter.emit("hoverChange", t));
  }
  setHoverByPoint(t) {
    const e = this.hitTest(t);
    this.setHover(e);
  }
  on(t, e) {
    this.eventEmitter.on(t, e);
  }
  off(t, e) {
    this.eventEmitter.off(t, e);
  }
}
class _d {
  constructor(t) {
    g(this, "items", []);
    g(this, "hoverItem", null);
    g(this, "highlightedItem", null);
    g(this, "eventEmitter", new mt());
    this.editor = t;
  }
  setItems(t) {
    const e = this.items;
    this.items = t, this.emitItemsChangeIfChanged(e, t);
  }
  getItems({ excludeLocked: t = !1 } = {}) {
    return t ? this.items.filter((e) => !e.isLock()) : [...this.items];
  }
  getIdSet() {
    return new Set(this.items.map((t) => t.attrs.id));
  }
  setItemsById(t) {
    const e = this.editor.doc.getGraphicsArrByIds(t);
    e.length === 0 ? console.warn("can not find element by id") : this.setItems(e);
  }
  isAllLocked() {
    return this.items.every((t) => t.isLock());
  }
  hasItem(t) {
    return this.items.includes(t);
  }
  clear() {
    this.hoverItem && this.items.includes(this.hoverItem) && this.setHoverItem(null), this.setItems([]);
  }
  /**
   * “追加” 多个元素
   * 如果已选中元素中存在追加元素，将其从已选中元素中取出，否则添加进去
   */
  toggleItems(t) {
    const e = this.items, n = [];
    for (let i = 0, r = e.length; i < r; i++) {
      const o = e[i], a = t.indexOf(o);
      a === -1 ? n.push(o) : t.splice(a, 1);
    }
    n.push(...t), this.items = n, this.emitItemsChangeIfChanged(e, n);
  }
  emitItemsChangeIfChanged(t, e) {
    Nc(t, e) || this.eventEmitter.emit("itemsChange", e);
  }
  toggleItemById(t, e) {
    const n = this.editor.doc.getGraphicsById(t);
    if (!n) {
      console.warn("can not find element by id");
      return;
    }
    if (e != null && e.disableParentAndChildCoexist)
      if (pt(n) && n.isGroup())
        this.items = this.items.filter((i) => !i.containAncestor(t));
      else {
        const i = new Set(n.getParentIds());
        this.items = this.items.filter((r) => !i.has(r.attrs.id));
      }
    this.toggleItems([n]);
  }
  size() {
    return this.items.length;
  }
  isEmpty() {
    return this.items.length === 0;
  }
  getBoundingRect() {
    if (this.isEmpty())
      return null;
    const t = this.items.map((e) => e.getBbox());
    return jt(Ut(t));
  }
  getRotation() {
    return this.items.length === 0 || this.items.length > 1 ? 0 : this.items[0].getRotate() ?? 0;
  }
  getTransform() {
    return this.items.length === 0 || this.items.length > 1 ? null : this.items[0].attrs.transform;
  }
  on(t, e) {
    this.eventEmitter.on(t, e);
  }
  off(t, e) {
    this.eventEmitter.off(t, e);
  }
  removeFromScene() {
    this.isEmpty() || (qi(this.editor, this.items), this.clear(), this.editor.render());
  }
  selectAll() {
    var e, n;
    const t = ((n = (e = this.items[0]) == null ? void 0 : e.getParent) == null ? void 0 : n.call(e)) ?? this.editor.doc.getCurrCanvas();
    for (let i = 1; i < this.items.length; i++)
      if (t !== this.items[i].getParent())
        return;
    this.setItems(t.getChildren().filter((i) => !i.isLock()));
  }
  setHoverItem(t) {
    const e = this.hoverItem;
    this.hoverItem = t, this.setHighlightedItem(t), e !== t && this.eventEmitter.emit("hoverItemChange", t, this.hoverItem);
  }
  getHoverItem() {
    return this.hoverItem;
  }
  setHighlightedItem(t) {
    const e = this.highlightedItem;
    this.highlightedItem = t, e !== t && this.eventEmitter.emit(
      "highlightedItemChange",
      t,
      this.highlightedItem
    );
  }
  getHighlightedItem() {
    return this.highlightedItem;
  }
  /**
   * get ParentId of selected graphics
   * ids will keep order from bottom to top
   */
  getParentIdSet() {
    return ie(this.items);
  }
}
class Bd {
  constructor(t) {
    g(this, "eventEmitter", new mt());
    g(this, "value", {
      /***** paint ****/
      canvasBgColor: "#f4f4f4",
      firstStroke: {
        type: B.Solid,
        attrs: { r: 0, g: 0, b: 0, a: 1 }
      },
      strokeWidth: 1,
      firstFill: {
        type: B.Solid,
        attrs: { r: 217, g: 217, b: 217, a: 1 }
      },
      firstFrameFill: {
        type: B.Solid,
        attrs: { r: 255, g: 255, b: 255, a: 1 }
      },
      addedPaint: {
        type: B.Solid,
        attrs: { r: 0, g: 0, b: 0, a: 0.2 }
      },
      defaultStarInnerScale: 0.3819660246372223,
      // selected box
      selectBoxStroke: "#1592fe",
      selectBoxStrokeWidth: 1.2,
      // size indicator
      sizeIndicatorMinSize: 10,
      // if length less this value, not render
      sizeIndicatorOffset: 10,
      sizeIndicatorRectRadius: 2,
      sizeIndicatorRectPadding: [0, 4, 0, 4],
      sizeIndicatorTextColor: "#fff",
      sizeIndicatorTextFontStyle: "12px sans-serif",
      sizeIndicatorNumPrecision: 2,
      selectionStroke: "#0f8eff",
      selectionFill: "#0f8eff33",
      selectionMode: "intersect",
      // 点选时，加一个 padding，使得点选更容易
      selectionHitPadding: 4,
      highlightLayersOnHover: !0,
      hoverOutlineStrokeWidth: 2,
      hoverOutlineStroke: "#1592fe",
      selectedOutlineStrokeWidth: 1,
      /******** transform control handle ********/
      handleStroke: "#1592fe",
      handleFill: "#fcfcfc",
      handleStrokeWidth: 2,
      handleSize: 7,
      neswHandleWidth: 10,
      // north/east/south/west handle width
      /********* text ********/
      defaultFontSize: 12,
      defaultFontFamily: "sans-serif",
      // 'Smiley Sans'
      textFill: [
        {
          type: B.Solid,
          attrs: { r: 0, g: 0, b: 0, a: 1 }
        }
      ],
      lockRotation: Math.PI / 12,
      // 旋转时，通过 shift 约束旋转角度为该值的整数倍。
      /*********** zoom *************/
      zoomStep: 0.2325,
      zoomMin: 0.015625,
      zoomMax: 256,
      zoomLevels: [
        0.015625,
        0.03125,
        0.0625,
        0.125,
        0.25,
        0.5,
        1,
        2,
        4,
        8,
        16,
        32,
        64,
        128,
        256
      ],
      drawGraphDefaultWidth: 100,
      // drawing graphics default width if no drag
      drawGraphDefaultHeight: 100,
      // default height
      /**** ruler ****/
      enableRuler: !1,
      minStepInViewport: 50,
      // 视口区域下的最小步长
      rulerBgColor: "#fff",
      rulerStroke: "#e6e6e6",
      rulerMarkStroke: "#c1c1c1",
      rulerSelectedBgColor: "#e6f5ff",
      rulerWidth: 20,
      // 宽度
      rulerMarkSize: 4,
      // 刻度高度
      /**** pixel grid ****/
      enablePixelGrid: !0,
      snapToGrid: !0,
      // 是否吸附到网格
      minPixelGridZoom: 8,
      // draw pixel grid When zoom reach this value
      pixelGridLineColor: "#cccccc55",
      // pixel grid line color
      gridViewX: 1,
      gridViewY: 1,
      gridSnapX: 1,
      gridSnapY: 1,
      snapToObjects: !0,
      dragBlockStep: 4,
      // drag handler will not happen if move distance less this value
      offsetX: 0,
      // mouse offset
      offsetY: 0,
      /**** zoom ****/
      zoomToFixPadding: 40,
      // base viewport coord
      invertZoomDirection: !1,
      // zoom in/out direction
      smallNudge: 1,
      bigNudge: 10,
      moveElementsDelay: 500,
      // ms
      // reference line
      refLineTolerance: 4,
      refLineStroke: "#f14f30ee",
      refLineStrokeWidth: 1,
      refLinePointSize: 5,
      /**** tool ****/
      keepToolSelectedAfterUse: !1,
      pencilCurveFitTolerance: 1,
      /******** path control handle ******/
      pathLineStroke: "#a4a4a4",
      /**** angle ****/
      angleBase: { x: 0, y: -1 },
      // no use now
      flipObjectsWhileResizing: !0,
      comboClickMaxGap: 350,
      // millisecond
      comboClickDistanceTol: 5,
      textEditorCursorSize: 1.5,
      textEditorCursorLineStroke: "#000",
      textEditorSelectionFill: "#0069c433"
    });
    t = To(t, Object.keys(this.value)), this.value = {
      ...this.value,
      ...t
    };
  }
  toggle(t) {
    const e = this.value[t];
    typeof e == "boolean" ? this.set(t, !e) : console.warn(`toggle ${t} failed, value is not boolean`);
  }
  set(t, e) {
    this.value[t] = e, this.eventEmitter.emit("update", this.getAttrs(), t);
  }
  get(t) {
    return this.value[t];
  }
  getAttrs() {
    return { ...this.value };
  }
  on(t, e) {
    this.eventEmitter.on(t, e);
  }
  off(t, e) {
    this.eventEmitter.off(t, e);
  }
}
class Hd {
  constructor(t) {
    g(this, "range", { start: 0, end: 0 });
    this.editor = t;
  }
  setRange(t) {
    this.range = {
      start: t.start,
      end: t.end
    };
  }
  getRange() {
    return { ...this.range };
  }
  getSortedRange() {
    const t = Math.min(this.range.start, this.range.end), e = Math.max(this.range.start, this.range.end);
    return { rangeLeft: t, rangeRight: e };
  }
  moveLeft() {
    if (this.range.start === this.range.end)
      this.dMove(-1);
    else {
      const { rangeLeft: t } = this.getSortedRange();
      this.setRange({
        start: t,
        end: t
      });
    }
  }
  getMaxRange() {
    const t = this.editor.textEditor.getTextGraphics();
    return t ? t.getContentLength() : 1 / 0;
  }
  moveRight() {
    if (this.range.start === this.range.end)
      this.getMaxRange() > this.range.end && this.dMove(1);
    else {
      const { rangeRight: t } = this.getSortedRange();
      this.setRange({
        start: t,
        end: t
      });
    }
  }
  dMove(t) {
    const e = Math.max(0, this.range.start + t), n = Math.max(0, this.range.end + t);
    this.setRange({
      start: e,
      end: n
    });
  }
  moveRangeEnd(t) {
    const e = this.getMaxRange(), n = this.range.end + t;
    e + 1 > n && n >= 0 && this.setRange({
      start: this.range.start,
      end: n
    });
  }
  setRangeEnd(t) {
    const e = t - this.range.end;
    this.moveRangeEnd(e);
  }
  getCursorLinePos(t) {
    const e = t.getGlyphs(), n = this.getRange(), { height: i } = t.getContentMetrics(), o = (e[n.start] ?? {
      position: { x: 0, y: 0 }
    }).position, a = t.getWorldTransform(), h = pe(a, o), l = this.editor.toViewportPt(h.x, h.y), d = pe(a, {
      x: o.x,
      y: o.y + i
    }), u = this.editor.toViewportPt(d.x, d.y);
    let p = null;
    if (n.end !== n.start) {
      const x = (e[n.end] ?? {
        position: { x: 0, y: 0 }
      }).position, y = pe(a, x);
      p = this.editor.toViewportPt(y.x, y.y);
    }
    return {
      topInViewport: l,
      bottomInViewport: u,
      rightInViewport: p
    };
  }
  draw(t, e, n, i) {
    const { ctx: r } = t, o = this.editor.setting.get("textEditorCursorLineStroke"), a = this.editor.setting.get("textEditorCursorSize");
    if (r.save(), !i)
      r.beginPath(), r.moveTo(e.x, e.y), r.lineTo(n.x, n.y), r.closePath(), r.lineWidth = a, r.strokeStyle = o, r.stroke();
    else {
      const h = this.editor.setting.get("textEditorSelectionFill");
      r.beginPath(), r.moveTo(e.x, e.y), r.lineTo(n.x, n.y);
      const l = n.x - e.x, d = n.y - e.y, u = {
        x: i.x + l,
        y: i.y + d
      };
      r.lineTo(u.x, u.y), r.lineTo(i.x, i.y), r.closePath(), r.fillStyle = h, r.fill();
    }
    r.restore();
  }
}
const Ld = {
  position: "fixed",
  width: "1px",
  zIndex: "-1",
  margin: 0,
  padding: 0,
  border: 0,
  outline: 0,
  opacity: 0
};
class Wd {
  constructor(t) {
    g(this, "inputDom");
    g(this, "textGraphics", null);
    g(this, "rangeManager");
    g(this, "_active", !1);
    g(this, "transaction");
    this.editor = t, this.rangeManager = new Hd(t), this.inputDom = this.createInputDom(), this.inactive(), this.bindEvent(), t.containerElement.appendChild(this.inputDom);
  }
  createInputDom() {
    const t = document.createElement("input");
    return t.tabIndex = -1, Object.assign(t.style, Ld), t;
  }
  isActive() {
    return this._active;
  }
  active(t) {
    this._active = !0, this.editor.controlHandleManager.enableTransformControl = !1, this.editor.selectedBox.enableDrawSizeIndicator = !1, this.transaction = new Z(this.editor);
    let e = t.textGraphics;
    if (!t.textGraphics) {
      const n = this.editor.setting.get("defaultFontSize"), i = this.editor.setting.get("defaultFontFamily");
      e = new ze(
        {
          objectName: "",
          content: "",
          fontSize: n,
          fontFamily: i,
          width: 0,
          height: n,
          // 🚀 Rich Text temporariamente desabilitado para debug
          enableRichText: !1,
          // 🎨 Markdown temporariamente desabilitado para debug  
          enableMarkdown: !1
        },
        {
          advancedAttrs: t.pos,
          doc: this.editor.doc
        }
      ), this.textGraphics = e, this.editor.sceneGraph.addItems([e]), this.editor.doc.getCurrCanvas().insertChild(e);
    }
    this.textGraphics = e, this.editor.selectedElements.setItems([e]), this.transaction.recordOld(e.attrs.id, {
      content: e.attrs.content,
      width: e.attrs.width
    }), t.range ? this.rangeManager.setRange(t.range) : this.rangeManager.setRange({
      start: 0,
      end: this.textGraphics.getContentLength()
    }), this.inputDom.value = this.textGraphics.attrs.content || "", this.inputDom.focus(), this.inputDom.select(), this.editor.render();
  }
  inactive() {
    this._active && (this._active = !1, this.editor.controlHandleManager.enableTransformControl = !0, this.editor.selectedBox.enableDrawSizeIndicator = !0, this.textGraphics && (this.transaction.update(this.textGraphics.attrs.id, {
      content: this.textGraphics.attrs.content
    }), this.transaction.commit("Update Text"), this.textGraphics.attrs.content === "" && qi(this.editor, [this.textGraphics])), this.textGraphics = null, this.inputDom.blur(), this.editor.render());
  }
  drawRange() {
  }
  bindEvent() {
    const t = this.inputDom;
    let e = "", n = "", i = "";
    t.addEventListener("input", (h) => {
      if (!this.isActive() || !this.textGraphics)
        return;
      const d = h.target.value;
      if (h.isComposing) {
        e = d;
        return;
      }
      if (e) {
        const { start: p, end: m } = this.rangeManager.getRange();
        n = this.textGraphics.attrs.content.slice(0, p), i = this.textGraphics.attrs.content.slice(m), this.textGraphics.updateAttrs({
          content: n + e + i
        }), this.rangeManager.setRange({
          start: n.length + e.length,
          end: n.length + e.length
        }), e = "", n = "", i = "", this.editor.render();
        return;
      }
      this.textGraphics.updateAttrs({ content: d }), this.rangeManager.setRange({ start: d.length, end: d.length }), this.editor.render();
    }), t.addEventListener("keydown", (h) => {
      this.isActive() && (h.key === "ArrowLeft" ? (h.shiftKey ? this.rangeManager.moveRangeEnd(-1) : this.rangeManager.moveLeft(), this.editor.render()) : h.key === "ArrowRight" ? (h.shiftKey ? this.rangeManager.moveRangeEnd(1) : this.rangeManager.moveRight(), this.editor.render()) : h.key === "a" && (h.metaKey || h.ctrlKey) ? this.textGraphics && (this.rangeManager.setRange({
        start: 0,
        end: this.textGraphics.getContentLength()
      }), this.editor.render()) : h.key === "Escape" && this.inactive());
    }), t.addEventListener("blur", () => {
      this.inactive();
    }), t.addEventListener("compositionend", () => {
      e = "", n = "", i = "";
    });
    const r = (h) => {
      if (!this.isActive() || this.editor.canvasDragger.isActive() || !this.textGraphics)
        return;
      const l = h.pos;
      if (!this.textGraphics.hitTest(l)) return;
      h.nativeEvent.preventDefault();
      const d = this.textGraphics.getCursorIndex(l);
      this.rangeManager.setRange({
        start: d,
        end: d
      }), this.editor.render();
    }, o = (h) => {
      if (!this.isActive() || this.editor.canvasDragger.isActive() || !this.textGraphics)
        return;
      const l = h.pos, d = this.textGraphics.getCursorIndex(l);
      this.rangeManager.setRangeEnd(d), this.editor.render();
    }, a = (h) => {
      this.updateCursor(h.pos);
    };
    this.editor.mouseEventManager.on("start", r), this.editor.mouseEventManager.on("drag", o), this.editor.mouseEventManager.on("move", a), this.editor.mouseEventManager.on("end", a);
  }
  updateCursor(t) {
    !this.textGraphics || !this.textGraphics.hitTest(t) ? this.editor.cursorManager.setCursor("default") : this.editor.cursorManager.setCursor("text");
  }
  getTextGraphics() {
    return this.textGraphics;
  }
  isEditorInputDom(t) {
    return t === this.inputDom;
  }
  destroy() {
    this.inputDom.remove();
  }
}
class zd {
  constructor(t) {
    g(this, "scrollX", 0);
    g(this, "scrollY", 0);
    g(this, "eventEmitter", new mt());
    this.editor = t;
  }
  getViewport() {
    return {
      x: this.scrollX,
      y: this.scrollY,
      width: parseFloat(this.editor.canvasElement.style.width),
      height: parseFloat(this.editor.canvasElement.style.height)
    };
  }
  setViewport({ x: t, y: e, width: n, height: i }) {
    const r = this.scrollX, o = this.scrollY, a = bi();
    t !== void 0 && (this.scrollX = t), e !== void 0 && (this.scrollY = e), n !== void 0 && (this.editor.canvasElement.width = n * a, this.editor.canvasElement.style.width = n + "px"), i !== void 0 && (this.editor.canvasElement.height = i * a, this.editor.canvasElement.style.height = i + "px"), (r !== t || o !== e) && this.eventEmitter.emit("xOrYChange", t, e);
  }
  getCenter() {
    const { x: t, y: e, width: n, height: i } = this.getViewport(), r = this.editor.zoomManager.getZoom();
    return {
      x: t + n / 2 / r,
      y: e + i / 2 / r
    };
  }
  translate(t, e) {
    this.scrollX += t, this.scrollY += e, this.eventEmitter.emit("xOrYChange", this.scrollX, this.scrollY);
  }
  getBbox() {
    const { x: t, y: e, width: n, height: i } = this.getViewport(), r = this.editor.zoomManager.getZoom();
    return {
      minX: t,
      minY: e,
      maxX: t + n / r,
      maxY: e + i / r
    };
  }
  on(t, e) {
    this.eventEmitter.on(t, e);
  }
  off(t, e) {
    this.eventEmitter.off(t, e);
  }
}
class Gd {
  constructor(t) {
    g(this, "zoom", 1);
    g(this, "eventEmitter", new mt());
    this.editor = t;
  }
  getZoom() {
    return this.zoom;
  }
  setZoom(t) {
    const e = this.zoom, n = this.editor.setting.get("zoomMax");
    t > n && (t = n);
    const i = this.editor.setting.get("zoomMin");
    t < i && (t = i), this.zoom = t, Promise.resolve().then(() => {
      this.eventEmitter.emit("zoomChange", t, e);
    });
  }
  setZoomAndUpdateViewport(t) {
    const e = this.zoom;
    this.setZoom(t), this.adjustScroll(e);
  }
  /**
   * zoom in
   * reference: https://mp.weixin.qq.com/s/UDnIxjYEsTop51gW7fwxMw
   * @param center zoom center
   * @param enableLevel zoom by level
   */
  zoomIn(t) {
    const e = this.zoom;
    let n;
    if (t != null && t.isLevelZoom) {
      const i = this.editor.setting.get("zoomLevels"), [, r] = fo(i, e);
      n = r;
    } else {
      const i = t != null && t.deltaY ? this.deltaYToZoomStep(t.deltaY) : this.editor.setting.get("zoomStep");
      n = Math.min(
        e * (1 + i),
        this.editor.setting.get("zoomMax")
      );
    }
    this.setZoom(n), this.adjustScroll(e, t == null ? void 0 : t.center);
  }
  /**
   * zoom out
   * reference: https://mp.weixin.qq.com/s/UDnIxjYEsTop51gW7fwxMw
   * @param center zoom center
   * @param enableLevel zoom by level
   */
  zoomOut(t) {
    const e = this.zoom;
    let n;
    if (t != null && t.isLevelZoom) {
      const i = this.editor.setting.get("zoomLevels"), [r] = fo(i, e);
      n = r;
    } else {
      const i = t != null && t.deltaY ? this.deltaYToZoomStep(t.deltaY) : this.editor.setting.get("zoomStep");
      n = Math.max(
        e / (1 + i),
        this.editor.setting.get("zoomMin")
      );
    }
    this.setZoom(n), this.adjustScroll(e, t == null ? void 0 : t.center);
  }
  deltaYToZoomStep(t) {
    return Math.max(0.05, 0.12937973 * Math.log(Math.abs(t)) - 0.33227472);
  }
  /**
   * make origin in viewport center
   * and set zoom 100%
   */
  reset() {
    this.setZoom(1);
    const t = this.editor.viewportManager, e = t.getViewport();
    t.setViewport({
      x: -e.width / 2,
      y: -e.height / 2
    });
  }
  zoomRectToFit(t, e) {
    const { setting: n, viewportManager: i } = this.editor, r = n.get("zoomToFixPadding"), o = i.getViewport(), a = this.editor.setting.get("enableRuler") ? this.editor.setting.get("rulerWidth") : 0, h = (S) => {
      const w = S - r * 2 - a;
      return w > 0 ? w : S;
    }, l = h(o.height), d = h(o.width), u = d / l, p = t.width / t.height;
    let m = u > p ? l / t.height : d / t.width;
    m = e ? Math.min(m, e) : m;
    const x = t.x - ((o.width + a) / m - t.width) / 2, y = t.y - ((o.height + a) / m - t.height) / 2;
    this.setZoom(m), i.setViewport({ x, y });
  }
  /**
   * zoom to selection
   */
  zoomToSelection() {
    const t = this.editor.selectedElements.getBoundingRect();
    t ? this.zoomRectToFit(t) : this.zoomToFit();
  }
  /**
   * zoom to graphics
   */
  zoomToGraphics(t) {
    const e = jt(t.getBbox());
    this.zoomRectToFit(e);
  }
  /**
   * zoom to fit all elements
   * reference: https://mp.weixin.qq.com/s/XtNEl1dWCYkTIKStne4A4w
   */
  zoomToFit(t) {
    const e = this.editor.getCanvasBbox();
    if (!e) {
      this.reset();
      return;
    }
    this.zoomRectToFit(jt(e), t);
  }
  getCanvasCenter() {
    const { width: t, height: e } = this.editor.viewportManager.getViewport();
    return {
      x: t / 2,
      y: e / 2
    };
  }
  /**
   * adjust scroll value
   * if no set (cx, cy), scale by canvas center
   */
  adjustScroll(t, e) {
    const n = this.editor.viewportManager, i = this.zoom, { x: r, y: o } = n.getViewport();
    e || (e = this.getCanvasCenter());
    const { x: a, y: h } = ko(
      e.x,
      e.y,
      t,
      r,
      o
    ), l = a - e.x / i, d = h - e.y / i;
    n.setViewport({
      x: l,
      y: d
    });
  }
  on(t, e) {
    this.eventEmitter.on(t, e);
  }
  off(t, e) {
    this.eventEmitter.off(t, e);
  }
}
const fo = (s, t) => {
  let e = 0, n = s.length - 1;
  for (; e <= n; ) {
    const i = Math.floor((e + n) / 2);
    if (s[i] === t) {
      n = i - 1, e = i + 1;
      break;
    } else s[i] < t ? e = i + 1 : n = i - 1;
  }
  return n < 0 && (n = 0), e >= s.length && (e = s.length - 1), [s[n], s[e]];
};
class po {
  constructor(t) {
    this.ctx = t;
  }
  // Properties - delegação direta
  get fillStyle() {
    return this.ctx.fillStyle;
  }
  set fillStyle(t) {
    this.ctx.fillStyle = t;
  }
  get strokeStyle() {
    return this.ctx.strokeStyle;
  }
  set strokeStyle(t) {
    this.ctx.strokeStyle = t;
  }
  get globalAlpha() {
    return this.ctx.globalAlpha;
  }
  set globalAlpha(t) {
    this.ctx.globalAlpha = t;
  }
  get lineWidth() {
    return this.ctx.lineWidth;
  }
  set lineWidth(t) {
    this.ctx.lineWidth = t;
  }
  get font() {
    return this.ctx.font;
  }
  set font(t) {
    this.ctx.font = t;
  }
  get fontKerning() {
    return this.ctx.fontKerning;
  }
  set fontKerning(t) {
    t !== void 0 && (this.ctx.fontKerning = t);
  }
  get imageSmoothingEnabled() {
    return this.ctx.imageSmoothingEnabled;
  }
  set imageSmoothingEnabled(t) {
    t !== void 0 && (this.ctx.imageSmoothingEnabled = t);
  }
  // Transform methods - delegação direta
  save() {
    this.ctx.save();
  }
  restore() {
    this.ctx.restore();
  }
  setTransform(t, e, n, i, r, o) {
    this.ctx.setTransform(t, e, n, i, r, o);
  }
  transform(t, e, n, i, r, o) {
    this.ctx.transform(t, e, n, i, r, o);
  }
  translate(t, e) {
    this.ctx.translate(t, e);
  }
  scale(t, e) {
    this.ctx.scale(t, e);
  }
  getTransform() {
    return this.ctx.getTransform();
  }
  // Drawing methods - delegação direta
  clearRect(t, e, n, i) {
    this.ctx.clearRect(t, e, n, i);
  }
  fillRect(t, e, n, i) {
    this.ctx.fillRect(t, e, n, i);
  }
  strokeRect(t, e, n, i) {
    this.ctx.strokeRect(t, e, n, i);
  }
  // Path methods - delegação direta
  beginPath() {
    this.ctx.beginPath();
  }
  closePath() {
    this.ctx.closePath();
  }
  moveTo(t, e) {
    this.ctx.moveTo(t, e);
  }
  lineTo(t, e) {
    this.ctx.lineTo(t, e);
  }
  rect(t, e, n, i) {
    this.ctx.rect(t, e, n, i);
  }
  roundRect(t, e, n, i, r) {
    this.ctx.roundRect ? this.ctx.roundRect(t, e, n, i, r) : this.rect(t, e, n, i);
  }
  ellipse(t, e, n, i, r, o, a) {
    this.ctx.ellipse(t, e, n, i, r, o, a);
  }
  bezierCurveTo(t, e, n, i, r, o) {
    this.ctx.bezierCurveTo(t, e, n, i, r, o);
  }
  // Fill and stroke - delegação direta
  fill() {
    this.ctx.fill();
  }
  stroke() {
    this.ctx.stroke();
  }
  clip() {
    this.ctx.clip();
  }
  // Text methods - delegação direta
  fillText(t, e, n) {
    this.ctx.fillText(t, e, n);
  }
  measureText(t) {
    return this.ctx.measureText(t);
  }
  drawImage(t, ...e) {
    this.ctx.drawImage(t, ...e);
  }
  /**
   * Retorna o contexto Canvas2D original para casos especiais
   */
  getOriginalContext() {
    return this.ctx;
  }
  // 🚀 Performance optimization methods (Canvas2D implementations)
  clearBackground(t, e, n) {
    this.ctx.save(), this.ctx.fillStyle = t, this.ctx.fillRect(0, 0, e, n), this.ctx.restore();
  }
  setViewportTransform(t, e, n, i) {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0), this.ctx.scale(t * e, t * e), this.ctx.translate(n, i);
  }
  flush() {
  }
}
class Od {
  constructor(t, e) {
    g(this, "surface");
    g(this, "canvas");
    g(this, "paint");
    g(this, "strokePaint");
    g(this, "canvasKit");
    // Estado interno para simular propriedades do Canvas2D
    g(this, "_fillStyle", "#000000");
    g(this, "_strokeStyle", "#000000");
    g(this, "_globalAlpha", 1);
    g(this, "_lineWidth", 1);
    g(this, "_font", "10px sans-serif");
    // Sistema de Path para simular Canvas2D "current path"
    g(this, "currentPath", null);
    // Stack para save/restore
    g(this, "stateStack", []);
    this.canvasKit = t, this.surface = e, this.canvas = e.getCanvas(), this.paint = new t.Paint(), this.paint.setStyle(t.PaintStyle.Fill), this.paint.setAntiAlias(!0), this.strokePaint = new t.Paint(), this.strokePaint.setStyle(t.PaintStyle.Stroke), this.strokePaint.setAntiAlias(!0), this.updateFillColor(), this.updateStrokeColor();
  }
  // Helper methods
  parseColor(t) {
    if (t.startsWith("#")) {
      const e = t.slice(1), n = parseInt(e.slice(0, 2), 16) / 255, i = parseInt(e.slice(2, 4), 16) / 255, r = parseInt(e.slice(4, 6), 16) / 255;
      return this.canvasKit.Color4f(n, i, r, this._globalAlpha);
    }
    return t === "black" ? this.canvasKit.BLACK : t === "white" ? this.canvasKit.WHITE : this.canvasKit.Color4f(0, 0, 0, this._globalAlpha);
  }
  updateFillColor() {
    const t = this.parseColor(this._fillStyle);
    this.paint.setColor(t);
  }
  updateStrokeColor() {
    const t = this.parseColor(this._strokeStyle);
    this.strokePaint.setColor(t), this.strokePaint.setStrokeWidth(this._lineWidth);
  }
  // Properties implementation
  get fillStyle() {
    return this._fillStyle;
  }
  set fillStyle(t) {
    typeof t == "string" && (this._fillStyle = t, this.updateFillColor());
  }
  get strokeStyle() {
    return this._strokeStyle;
  }
  set strokeStyle(t) {
    typeof t == "string" && (this._strokeStyle = t, this.updateStrokeColor());
  }
  get globalAlpha() {
    return this._globalAlpha;
  }
  set globalAlpha(t) {
    this._globalAlpha = t, this.updateFillColor(), this.updateStrokeColor();
  }
  get lineWidth() {
    return this._lineWidth;
  }
  set lineWidth(t) {
    this._lineWidth = t, this.updateStrokeColor();
  }
  get font() {
    return this._font;
  }
  set font(t) {
    this._font = t;
  }
  get fontKerning() {
    return "auto";
  }
  set fontKerning(t) {
  }
  get imageSmoothingEnabled() {
    return !0;
  }
  set imageSmoothingEnabled(t) {
  }
  // Transform methods
  save() {
    this.canvas.save(), this.stateStack.push({
      fillStyle: this._fillStyle,
      strokeStyle: this._strokeStyle,
      globalAlpha: this._globalAlpha,
      lineWidth: this._lineWidth,
      font: this._font
    });
  }
  restore() {
    this.canvas.restore();
    const t = this.stateStack.pop();
    t && (this._fillStyle = t.fillStyle, this._strokeStyle = t.strokeStyle, this._globalAlpha = t.globalAlpha, this._lineWidth = t.lineWidth, this._font = t.font, this.updateFillColor(), this.updateStrokeColor());
  }
  setTransform(t, e, n, i, r, o) {
    const a = new Float32Array([t, n, r, e, i, o, 0, 0, 1]);
    this.canvas.concat(a);
  }
  transform(t, e, n, i, r, o) {
    const a = new Float32Array([t, n, r, e, i, o, 0, 0, 1]);
    this.canvas.concat(a);
  }
  translate(t, e) {
    this.canvas.translate(t, e);
  }
  scale(t, e) {
    this.canvas.scale(t, e);
  }
  getTransform() {
    return new DOMMatrix();
  }
  // Drawing methods
  clearRect(t, e, n, i) {
    if (t === 0 && e === 0)
      this.canvas.clear(this.canvasKit.WHITE);
    else {
      const r = this.canvasKit.LTRBRect(t, e, t + n, e + i), o = new this.canvasKit.Paint();
      o.setColor(this.canvasKit.WHITE), o.setStyle(this.canvasKit.PaintStyle.Fill), this.canvas.drawRect(r, o), o.delete();
    }
  }
  /**
   * 🚀 Otimização: Clear com cor customizada para background
   */
  clearBackground(t, e, n) {
    const i = this.parseColor(t);
    this.canvas.clear(i);
  }
  /**
   * 🚀 Otimização: Configurar todas as transformações de viewport de uma vez
   */
  setViewportTransform(t, e, n, i) {
    this.canvas.resetMatrix(), this.canvas.scale(t * e, t * e), this.canvas.translate(n, i);
  }
  /**
   * 🚀 Performance: Flush apenas no final do frame
   */
  flush() {
    this.surface.flush();
  }
  fillRect(t, e, n, i) {
    const r = this.canvasKit.LTRBRect(t, e, t + n, e + i);
    this.canvas.drawRect(r, this.paint), this.surface.flush();
  }
  strokeRect(t, e, n, i) {
    const r = this.canvasKit.LTRBRect(t, e, t + n, e + i);
    this.canvas.drawRect(r, this.strokePaint), this.surface.flush();
  }
  // Path methods - implementação completa baseada na documentação Skia
  beginPath() {
    this.currentPath && this.currentPath.delete(), this.currentPath = new this.canvasKit.Path();
  }
  closePath() {
    this.currentPath && this.currentPath.close();
  }
  moveTo(t, e) {
    this.currentPath || this.beginPath(), this.currentPath.moveTo(t, e);
  }
  lineTo(t, e) {
    this.currentPath || this.beginPath(), this.currentPath.lineTo(t, e);
  }
  rect(t, e, n, i) {
    const r = this.canvasKit.LTRBRect(t, e, t + n, e + i);
    this.canvas.drawRect(r, this.paint);
  }
  roundRect(t, e, n, i, r) {
    const o = this.canvasKit.LTRBRect(t, e, t + n, e + i), a = Array.isArray(r) ? r[0] : r, h = this.canvasKit.RRectXY(o, a, a);
    this.canvas.drawRRect(h, this.paint);
  }
  ellipse(t, e, n, i, r, o, a) {
    const h = this.canvasKit.LTRBRect(t - n, e - i, t + n, e + i);
    this.canvas.drawOval(h, this.paint);
  }
  bezierCurveTo(t, e, n, i, r, o) {
    this.currentPath || this.beginPath(), this.currentPath.bezierCurveTo(t, e, n, i, r, o);
  }
  fill() {
    this.currentPath && this.canvas.drawPath(this.currentPath, this.paint), this.surface.flush();
  }
  stroke() {
    this.currentPath && this.canvas.drawPath(this.currentPath, this.strokePaint), this.surface.flush();
  }
  clip() {
    if (this.currentPath) {
      const t = this.canvasKit.LTRBRect(-1e4, -1e4, 1e4, 1e4);
      this.canvas.clipRect(t);
    }
  }
  // Text methods - implementação com CanvasKit ParagraphBuilder
  fillText(t, e, n) {
    try {
      const i = new this.canvasKit.ParagraphStyle({
        textStyle: {
          color: this.parseColor(this._fillStyle),
          fontSize: this.parseFontSize(this._font),
          fontFamilies: [this.parseFontFamily(this._font)]
        },
        textAlign: this.canvasKit.TextAlign.Left
      }), r = this.canvasKit.ParagraphBuilder.Make(i, null);
      r.addText(t);
      const o = r.build(), a = Math.max(200, t.length * 10);
      o.layout(a), this.canvas.drawParagraph(o, e, n), o.delete(), r.delete();
    } catch (i) {
      console.warn("CanvasKit fillText error:", i, "- usando fallback");
    }
    this.surface.flush();
  }
  measureText(t) {
    try {
      const e = new this.canvasKit.ParagraphStyle({
        textStyle: {
          color: this.canvasKit.BLACK,
          fontSize: this.parseFontSize(this._font),
          fontFamilies: [this.parseFontFamily(this._font)]
        },
        textAlign: this.canvasKit.TextAlign.Left
      }), n = this.canvasKit.ParagraphBuilder.Make(e, null);
      n.addText(t);
      const i = n.build();
      i.layout(1e4);
      const r = i.getMaxIntrinsicWidth(), o = i.getHeight();
      return i.delete(), n.delete(), {
        width: r,
        actualBoundingBoxLeft: 0,
        actualBoundingBoxRight: r,
        actualBoundingBoxAscent: o * 0.8,
        actualBoundingBoxDescent: o * 0.2,
        fontBoundingBoxAscent: o * 0.8,
        fontBoundingBoxDescent: o * 0.2,
        alphabeticBaseline: 0,
        emHeightAscent: o * 0.8,
        emHeightDescent: o * 0.2,
        hangingBaseline: o * 0.8,
        ideographicBaseline: -o * 0.2
      };
    } catch (e) {
      return console.warn("CanvasKit measureText error:", e), {
        width: t.length * 8,
        actualBoundingBoxLeft: 0,
        actualBoundingBoxRight: t.length * 8,
        actualBoundingBoxAscent: 12,
        actualBoundingBoxDescent: 3,
        fontBoundingBoxAscent: 12,
        fontBoundingBoxDescent: 3,
        alphabeticBaseline: 0,
        emHeightAscent: 12,
        emHeightDescent: 3,
        hangingBaseline: 12,
        ideographicBaseline: -3
      };
    }
  }
  // Helper methods para parsing de font
  parseFontSize(t) {
    const e = t.match(/(\d+)px/);
    return e ? parseInt(e[1]) : 12;
  }
  parseFontFamily(t) {
    const e = t.split(" ");
    return e[e.length - 1] || "sans-serif";
  }
  drawImage(t, ...e) {
    console.warn("CanvasKit drawImage: implementação futura"), this.surface.flush();
  }
  /**
   * Retorna null pois CanvasKit não tem contexto Canvas2D original
   */
  getOriginalContext() {
    return null;
  }
  /**
   * Cleanup resources
   */
  dispose() {
    this.currentPath && this.currentPath.delete(), this.paint.delete(), this.strokePaint.delete(), this.surface.delete();
  }
}
class bs {
  /**
   * Cria um renderer, preferindo CanvasKit quando disponível
   */
  static async createRenderer(t, e = {}) {
    console.log("🔍 RendererFactory.createRenderer CHAMADO"), console.log("🔍 Canvas:", t), console.log("🔍 Config recebida:", e);
    const {
      enableGPU: n = !0,
      wasmUrl: i
    } = e;
    if (console.log("🔍 enableGPU:", n), n) {
      console.log("🔍 Tentando CanvasKit...");
      try {
        const o = await this.tryCreateCanvasKit(t, i);
        if (o)
          return console.log("🚀 CanvasKit renderer ativo (GPU acelerado)"), o;
      } catch (o) {
        console.warn("⚠️ CanvasKit falhou, usando Canvas2D fallback:", o);
      }
    } else
      console.log("🔍 enableGPU é false, pulando CanvasKit");
    console.log("📦 Canvas2D renderer ativo (CPU)");
    const r = t.getContext("2d");
    if (!r)
      throw new Error("Não foi possível obter contexto 2D do canvas");
    return new po(r);
  }
  /**
   * Tenta criar renderer CanvasKit
   */
  static async tryCreateCanvasKit(t, e) {
    console.log("🔍 tryCreateCanvasKit: Iniciando...");
    const n = await this.loadCanvasKit(e);
    if (!n)
      return console.log("❌ tryCreateCanvasKit: canvasKit é null"), null;
    console.log("✅ tryCreateCanvasKit: CanvasKit carregado"), t.id || (t.id = "suika-canvas-" + Date.now(), console.log("🔧 Canvas ID criado:", t.id)), document.getElementById(t.id) || (console.log("⚠️ Canvas não está no DOM ainda, aguardando..."), await new Promise((a) => requestAnimationFrame(a))), console.log("🔍 Canvas no DOM:", !!document.getElementById(t.id)), console.log("🔍 Canvas dimensões:", t.width, "x", t.height), console.log("🔍 tryCreateCanvasKit: Verificando WebGL...");
    const r = t.getContext("webgl") || t.getContext("experimental-webgl");
    if (r) {
      console.log("✅ WebGL context disponível");
      const a = r.getExtension("WEBGL_lose_context");
      a && a.loseContext();
    } else
      console.log("⚠️ WebGL context não disponível, forçando software rendering");
    let o = null;
    if (r) {
      console.log("🔍 tryCreateCanvasKit: Tentando MakeCanvasSurface com ID...");
      try {
        o = n.MakeCanvasSurface(t.id), o && console.log("✅ tryCreateCanvasKit: WebGL surface criada com ID");
      } catch (a) {
        console.log("⚠️ tryCreateCanvasKit: MakeCanvasSurface com ID falhou:", a);
      }
    } else if (console.log("🔧 WebGL indisponível, usando apenas software rendering"), n.MakeSWCanvasSurface)
      try {
        o = n.MakeSWCanvasSurface(t), o && console.log("✅ tryCreateCanvasKit: Software surface criada com elemento");
      } catch (a) {
        console.log("❌ tryCreateCanvasKit: Software com elemento falhou:", a);
      }
    if (!o) {
      console.log("🔍 tryCreateCanvasKit: Tentando MakeCanvasSurface com elemento...");
      try {
        o = n.MakeCanvasSurface(t), o && console.log("✅ tryCreateCanvasKit: WebGL surface criada com elemento");
      } catch (a) {
        console.log("⚠️ tryCreateCanvasKit: MakeCanvasSurface com elemento falhou:", a);
      }
    }
    if (!o) {
      if (console.log("🔍 tryCreateCanvasKit: Tentando todas as alternativas..."), r)
        try {
          o = n.MakeCanvasSurface(t), o && console.log("✅ tryCreateCanvasKit: WebGL surface criada com elemento");
        } catch (a) {
          console.log("⚠️ tryCreateCanvasKit: WebGL com elemento falhou:", a);
        }
      if (!o && n.MakeSWCanvasSurface) {
        console.log("🔍 tryCreateCanvasKit: Tentando software rendering como último recurso...");
        try {
          o = n.MakeSWCanvasSurface(t), o && console.log("✅ tryCreateCanvasKit: Software surface criada com elemento");
        } catch (a) {
          console.log("❌ tryCreateCanvasKit: Software rendering falhou:", a);
        }
      }
    }
    if (!o)
      throw new Error("Não foi possível criar surface CanvasKit (WebGL e Software falharam)");
    return console.log("🚀 tryCreateCanvasKit: Criando CanvasKitRenderer..."), new Od(n, o);
  }
  /**
   * Carrega CanvasKit com cache
   */
  static async loadCanvasKit(t) {
    if (this.canvasKitCache)
      return this.canvasKitCache;
    if (this.canvasKitLoadPromise)
      return this.canvasKitLoadPromise;
    this.canvasKitLoadPromise = this.doLoadCanvasKit(t);
    try {
      return this.canvasKitCache = await this.canvasKitLoadPromise, this.canvasKitCache;
    } catch (e) {
      throw this.canvasKitLoadPromise = null, e;
    }
  }
  /**
   * Faz o carregamento real do CanvasKit
   */
  static async doLoadCanvasKit(t) {
    console.log("🔍 doLoadCanvasKit: Iniciando carregamento...");
    try {
      console.log("🔍 doLoadCanvasKit: Importando canvaskit-wasm...");
      const e = await import("./canvaskit-CmHUYeaU.js").then((i) => i.c);
      console.log("✅ doLoadCanvasKit: Import bem-sucedido"), console.log("🔍 doLoadCanvasKit: Inicializando CanvasKit...");
      const n = t ? await e.default({
        locateFile: (i) => t.replace("canvaskit.js", i)
      }) : await e.default({
        locateFile: (i) => {
          if (console.log("🔍 CanvasKit locateFile chamado para:", i), i.endsWith(".wasm")) {
            const r = `/canvaskit/${i}`;
            return console.log("🎯 WASM URL configurada:", r), r;
          }
          return i;
        }
      });
      return console.log("✅ CanvasKit carregado e inicializado com sucesso"), console.log("🔍 CanvasKit features:", {
        MakeCanvasSurface: !!n.MakeCanvasSurface,
        MakeSWCanvasSurface: !!n.MakeSWCanvasSurface,
        ParagraphBuilder: !!n.ParagraphBuilder
      }), n;
    } catch (e) {
      throw console.error("❌ Erro ao carregar CanvasKit:", e), e;
    }
  }
  /**
   * Verifica se CanvasKit está disponível
   */
  static async isCanvasKitAvailable() {
    try {
      return await this.loadCanvasKit(), !0;
    } catch {
      return !1;
    }
  }
  /**
   * Força o uso de Canvas2D (útil para debugging)
   */
  static createCanvas2DRenderer(t) {
    const e = t.getContext("2d");
    if (!e)
      throw new Error("Não foi possível obter contexto 2D do canvas");
    return console.log("🔧 Canvas2D renderer forçado"), new po(e);
  }
  /**
   * Limpa cache (útil para testes)
   */
  static clearCache() {
    this.canvasKitCache = null, this.canvasKitLoadPromise = null;
  }
}
g(bs, "canvasKitCache", null), g(bs, "canvasKitLoadPromise", null);
class Xd {
  constructor(t) {
    g(this, "containerElement");
    g(this, "canvasElement");
    g(this, "ctx");
    // Manter compatibilidade 
    g(this, "renderer");
    // Novo sistema de renderização (inicializado de forma assíncrona)
    g(this, "appVersion", "suika-editor_0.0.2");
    g(this, "paperId");
    g(this, "emitter", new mt());
    g(this, "doc");
    g(this, "sceneGraph");
    g(this, "controlHandleManager");
    g(this, "setting");
    g(this, "viewportManager");
    g(this, "canvasDragger");
    g(this, "toolManager");
    g(this, "commandManager");
    g(this, "zoomManager");
    g(this, "imgManager");
    g(this, "cursorManager");
    g(this, "mouseEventManager");
    g(this, "keybindingManager");
    g(this, "hostEventManager");
    g(this, "clipboard");
    g(this, "selectedElements");
    g(this, "selectedBox");
    g(this, "ruler");
    g(this, "refLine");
    g(this, "textEditor");
    g(this, "pathEditor");
    g(this, "perfMonitor");
    this.containerElement = t.containerElement, this.canvasElement = document.createElement("canvas"), this.containerElement.appendChild(this.canvasElement), this.ctx = this.canvasElement.getContext("2d"), console.log("🔍 SuikaEditor constructor - options.canvasKit:", t.canvasKit), this.initializeRenderer(t.canvasKit), this.setting = new Bd(t.userPreference), t.offsetX && this.setting.set("offsetX", t.offsetX), t.offsetY && this.setting.set("offsetY", t.offsetY), this.mouseEventManager = new ed(this), this.keybindingManager = new gd(this), this.keybindingManager.bindEvent(), this.doc = new Zo({
      id: "0-0",
      objectName: "Document",
      width: 0,
      height: 0
    }), this.doc.setEditor(this), this.sceneGraph = new Dd(this), this.cursorManager = new hd(this), this.viewportManager = new zd(this), this.commandManager = new Xc(this), this.zoomManager = new Gd(this), this.imgManager = new dd(), this.selectedElements = new _d(this), this.selectedBox = new Rd(this), this.ruler = new Ed(this), this.refLine = new fe(this), this.controlHandleManager = new _l(this), this.controlHandleManager.bindEvents(), this.textEditor = new Wd(this), this.pathEditor = new Ji(this), this.hostEventManager = new td(this), this.hostEventManager.bindHotkeys(), this.canvasDragger = new nd(this), this.toolManager = new bd(this), this.clipboard = new id(this), this.clipboard.bindEvents(), this.imgManager.on("added", () => {
      this.render();
    }), this.paperId = pn();
    const e = new Ge(
      {
        objectName: "Canvas",
        width: 0,
        height: 0
      },
      {
        doc: this.doc
      }
    );
    this.sceneGraph.addItems([e]), this.viewportManager.setViewport({
      x: -t.width / 2,
      y: -t.height / 2,
      width: t.width,
      height: t.height
    }), this.perfMonitor = new Pd(), t.showPerfMonitor && this.perfMonitor.start(this.containerElement), Promise.resolve().then(() => {
      this.render();
    });
  }
  setContents(t) {
    if (this.sceneGraph.load(t.data), this.commandManager.clearRecords(), this.paperId = t.paperId ?? pn(), !this.doc.getCurrCanvas()) {
      const e = new Ge(
        {
          objectName: "Canvas",
          width: 0,
          height: 0
        },
        {
          doc: this.doc
        }
      );
      this.sceneGraph.addItems([e]);
    }
    this.zoomManager.zoomToFit(1);
  }
  destroy() {
    this.containerElement.removeChild(this.canvasElement), this.textEditor.destroy(), this.keybindingManager.destroy(), this.hostEventManager.destroy(), this.clipboard.destroy(), this.canvasDragger.destroy(), this.toolManager.unbindEvent(), this.toolManager.destroy(), this.perfMonitor.destroy(), this.controlHandleManager.unbindEvents(), this.emitter.emit("destroy");
  }
  setCursor(t) {
    this.cursorManager.setCursor(t);
  }
  getCursor() {
    return this.cursorManager.getCursor();
  }
  /**
   * viewport coords to scene coords
   *
   * reference: https://mp.weixin.qq.com/s/uvVXZKIMn1bjVZvUSyYZXA
   */
  toScenePt(t, e, n = !1) {
    const i = this.zoomManager.getZoom(), { x: r, y: o } = this.viewportManager.getViewport();
    return ko(t, e, i, r, o, n);
  }
  toViewportPt(t, e) {
    const n = this.zoomManager.getZoom(), { x: i, y: r } = this.viewportManager.getViewport();
    return $c(t, e, n, i, r);
  }
  toSceneSize(t) {
    const e = this.zoomManager.getZoom();
    return t / e;
  }
  toViewportSize(t) {
    const e = this.zoomManager.getZoom();
    return t * e;
  }
  /** get cursor viewport xy */
  getCursorXY(t) {
    return {
      x: t.clientX - this.setting.get("offsetX"),
      y: t.clientY - this.setting.get("offsetY")
    };
  }
  /** get cursor scene xy */
  getSceneCursorXY(t, e = !1) {
    const { x: n, y: i } = this.getCursorXY(t);
    return this.toScenePt(n, i, e);
  }
  render() {
    this.sceneGraph.render();
  }
  getCanvasBbox() {
    const e = this.doc.getCurrCanvas().getChildren().filter((n) => n.isVisible());
    return e.length === 0 ? null : Ut(e.map((n) => n.getBbox()));
  }
  applyChanges(t) {
    const e = [];
    for (const [, n] of t.added)
      e.push(n);
    this.sceneGraph.load(e, !0);
    for (const [n, i] of t.update) {
      const r = this.doc.getGraphicsById(n);
      if (!r) {
        console.warn(`graphics ${n} is not exist`);
        continue;
      }
      r.updateAttrs(i);
    }
    for (const n of t.deleted) {
      const i = this.doc.getGraphicsById(n);
      if (!i) {
        console.warn(`graphics ${n} is not exist`);
        continue;
      }
      i.setDeleted(!0), i.removeFromParent();
    }
  }
  /**
   * Inicializa o sistema de renderização de forma assíncrona
   * Mantém total compatibilidade com código existente
   */
  async initializeRenderer(t) {
    console.log("🔍 initializeRenderer CHAMADO com config:", t);
    try {
      console.log("🔍 initializeRenderer: Chamando RendererFactory.createRenderer..."), this.renderer = await bs.createRenderer(this.canvasElement, t), console.log("🎨 Sistema de renderização inicializado:", this.renderer.constructor.name), this.testRendererBasics();
    } catch (e) {
      console.error("❌ Erro ao inicializar renderer:", e), console.log("🔄 Criando fallback Canvas2D..."), this.renderer = bs.createCanvas2DRenderer(this.canvasElement), console.log("🔄 Fallback Canvas2D criado");
    }
  }
  /**
   * Teste básico do renderer para debug
   */
  testRendererBasics() {
    if (this.renderer)
      try {
        this.renderer.beginPath(), this.renderer.moveTo(10, 10), this.renderer.lineTo(50, 50), this.renderer.font = "16px Arial", this.renderer.fillStyle = "#333333", console.log("✅ Renderer operations básicas funcionando");
      } catch (t) {
        console.warn("⚠️ Erro nos testes básicos do renderer:", t);
      }
  }
  on(t, e) {
    this.emitter.on(t, e);
  }
  off(t, e) {
    this.emitter.off(t, e);
  }
}
export {
  Bi as A,
  Hr as B,
  Xc as C,
  Il as D,
  Zl as E,
  Z as F,
  qt as G,
  G as H,
  nt as I,
  Vt as J,
  $d as M,
  B as P,
  Hd as R,
  se as S,
  Wd as T,
  Ps as U,
  re as a,
  Xd as b,
  V as c,
  bn as d,
  Mn as e,
  X as f,
  Fd as g,
  Ui as h,
  pt as i,
  gt as j,
  dt as k,
  Zi as l,
  Yo as m,
  ze as n,
  Tl as o,
  Nd as p,
  Go as q,
  Yd as r,
  Mr as s,
  Be as t,
  ts as u,
  Vd as v,
  Yl as w,
  Vl as x,
  Xl as y,
  jd as z
};
