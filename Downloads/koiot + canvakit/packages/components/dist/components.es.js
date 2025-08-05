import { jsx as v, jsxs as X, Fragment as rn } from "react/jsx-runtime";
import * as b from "react";
import F, { useLayoutEffect as co, useEffect as Er, useRef as uo, useState as vn } from "react";
import * as qo from "react-dom";
import { createPortal as Qo } from "react-dom";
const pu = ({ style: e, children: n, onClick: r }) => v("button", { className: "sk-btn", style: e, onClick: () => r(), children: n });
var Jo = Object.defineProperty, Go = (e, n, r) => n in e ? Jo(e, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[n] = r, ei = (e, n, r) => (Go(e, typeof n != "symbol" ? n + "" : n, r), r);
const ti = [];
for (let e = 0; e < 256; ++e)
  ti.push((e + 256).toString(16).slice(1));
typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
class ni {
  constructor() {
    ei(this, "eventMap", {});
  }
  on(n, r) {
    return this.eventMap[n] || (this.eventMap[n] = []), this.eventMap[n].push(r), this;
  }
  emit(n, ...r) {
    const o = this.eventMap[n];
    return !o || o.length === 0 ? !1 : (o.forEach((a) => {
      a(...r);
    }), !0);
  }
  off(n, r) {
    return this.eventMap[n] && (this.eventMap[n] = this.eventMap[n].filter(
      (o) => o !== r
    )), this;
  }
}
var U = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, on = { exports: {} };
on.exports;
(function(e, n) {
  var r = 200, o = "__lodash_hash_undefined__", a = 9007199254740991, c = "[object Arguments]", s = "[object Array]", l = "[object Boolean]", h = "[object Date]", f = "[object Error]", g = "[object Function]", p = "[object GeneratorFunction]", m = "[object Map]", y = "[object Number]", w = "[object Object]", _ = "[object Promise]", j = "[object RegExp]", R = "[object Set]", x = "[object String]", E = "[object Symbol]", T = "[object WeakMap]", P = "[object ArrayBuffer]", H = "[object DataView]", K = "[object Float32Array]", J = "[object Float64Array]", Y = "[object Int8Array]", N = "[object Int16Array]", L = "[object Int32Array]", A = "[object Uint8Array]", k = "[object Uint8ClampedArray]", O = "[object Uint16Array]", M = "[object Uint32Array]", W = /[\\^$.*+?()[\]{}|]/g, Z = /\w*$/, I = /^\[object .+?Constructor\]$/, oe = /^(?:0|[1-9]\d*)$/, B = {};
  B[c] = B[s] = B[P] = B[H] = B[l] = B[h] = B[K] = B[J] = B[Y] = B[N] = B[L] = B[m] = B[y] = B[w] = B[j] = B[R] = B[x] = B[E] = B[A] = B[k] = B[O] = B[M] = !0, B[f] = B[g] = B[T] = !1;
  var xe = typeof U == "object" && U && U.Object === Object && U, it = typeof self == "object" && self && self.Object === Object && self, ue = xe || it || Function("return this")(), Lt = n && !n.nodeType && n, z = Lt && !0 && e && !e.nodeType && e, St = z && z.exports === Lt;
  function Cn(t, i) {
    return t.set(i[0], i[1]), t;
  }
  function fe(t, i) {
    return t.add(i), t;
  }
  function Mt(t, i) {
    for (var u = -1, d = t ? t.length : 0; ++u < d && i(t[u], u, t) !== !1; )
      ;
    return t;
  }
  function At(t, i) {
    for (var u = -1, d = i.length, S = t.length; ++u < d; )
      t[S + u] = i[u];
    return t;
  }
  function at(t, i, u, d) {
    var S = -1, C = t ? t.length : 0;
    for (d && C && (u = t[++S]); ++S < C; )
      u = i(u, t[S], S, t);
    return u;
  }
  function ct(t, i) {
    for (var u = -1, d = Array(t); ++u < t; )
      d[u] = i(u);
    return d;
  }
  function Tt(t, i) {
    return t == null ? void 0 : t[i];
  }
  function ut(t) {
    var i = !1;
    if (t != null && typeof t.toString != "function")
      try {
        i = !!(t + "");
      } catch {
      }
    return i;
  }
  function Pt(t) {
    var i = -1, u = Array(t.size);
    return t.forEach(function(d, S) {
      u[++i] = [S, d];
    }), u;
  }
  function st(t, i) {
    return function(u) {
      return t(i(u));
    };
  }
  function Ft(t) {
    var i = -1, u = Array(t.size);
    return t.forEach(function(d) {
      u[++i] = d;
    }), u;
  }
  var En = Array.prototype, Rn = Function.prototype, We = Object.prototype, lt = ue["__core-js_shared__"], It = function() {
    var t = /[^.]+$/.exec(lt && lt.keys && lt.keys.IE_PROTO || "");
    return t ? "Symbol(src)_1." + t : "";
  }(), Dt = Rn.toString, ge = We.hasOwnProperty, ze = We.toString, On = RegExp(
    "^" + Dt.call(ge).replace(W, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Ae = St ? ue.Buffer : void 0, Ze = ue.Symbol, ft = ue.Uint8Array, le = st(Object.getPrototypeOf, Object), Bt = Object.create, Vt = We.propertyIsEnumerable, jn = En.splice, dt = Object.getOwnPropertySymbols, Ue = Ae ? Ae.isBuffer : void 0, Ht = st(Object.keys, Object), Ke = he(ue, "DataView"), Te = he(ue, "Map"), de = he(ue, "Promise"), Ye = he(ue, "Set"), ht = he(ue, "WeakMap"), Pe = he(Object, "create"), pt = ie(Ke), Fe = ie(Te), vt = ie(de), gt = ie(Ye), mt = ie(ht), je = Ze ? Ze.prototype : void 0, Nt = je ? je.valueOf : void 0;
  function _e(t) {
    var i = -1, u = t ? t.length : 0;
    for (this.clear(); ++i < u; ) {
      var d = t[i];
      this.set(d[0], d[1]);
    }
  }
  function kn() {
    this.__data__ = Pe ? Pe(null) : {};
  }
  function Ln(t) {
    return this.has(t) && delete this.__data__[t];
  }
  function Sn(t) {
    var i = this.__data__;
    if (Pe) {
      var u = i[t];
      return u === o ? void 0 : u;
    }
    return ge.call(i, t) ? i[t] : void 0;
  }
  function $t(t) {
    var i = this.__data__;
    return Pe ? i[t] !== void 0 : ge.call(i, t);
  }
  function yt(t, i) {
    var u = this.__data__;
    return u[t] = Pe && i === void 0 ? o : i, this;
  }
  _e.prototype.clear = kn, _e.prototype.delete = Ln, _e.prototype.get = Sn, _e.prototype.has = $t, _e.prototype.set = yt;
  function G(t) {
    var i = -1, u = t ? t.length : 0;
    for (this.clear(); ++i < u; ) {
      var d = t[i];
      this.set(d[0], d[1]);
    }
  }
  function Mn() {
    this.__data__ = [];
  }
  function An(t) {
    var i = this.__data__, u = qe(i, t);
    if (u < 0)
      return !1;
    var d = i.length - 1;
    return u == d ? i.pop() : jn.call(i, u, 1), !0;
  }
  function Tn(t) {
    var i = this.__data__, u = qe(i, t);
    return u < 0 ? void 0 : i[u][1];
  }
  function Pn(t) {
    return qe(this.__data__, t) > -1;
  }
  function Fn(t, i) {
    var u = this.__data__, d = qe(u, t);
    return d < 0 ? u.push([t, i]) : u[d][1] = i, this;
  }
  G.prototype.clear = Mn, G.prototype.delete = An, G.prototype.get = Tn, G.prototype.has = Pn, G.prototype.set = Fn;
  function te(t) {
    var i = -1, u = t ? t.length : 0;
    for (this.clear(); ++i < u; ) {
      var d = t[i];
      this.set(d[0], d[1]);
    }
  }
  function In() {
    this.__data__ = {
      hash: new _e(),
      map: new (Te || G)(),
      string: new _e()
    };
  }
  function Dn(t) {
    return De(this, t).delete(t);
  }
  function Bn(t) {
    return De(this, t).get(t);
  }
  function Vn(t) {
    return De(this, t).has(t);
  }
  function Hn(t, i) {
    return De(this, t).set(t, i), this;
  }
  te.prototype.clear = In, te.prototype.delete = Dn, te.prototype.get = Bn, te.prototype.has = Vn, te.prototype.set = Hn;
  function ae(t) {
    this.__data__ = new G(t);
  }
  function Nn() {
    this.__data__ = new G();
  }
  function $n(t) {
    return this.__data__.delete(t);
  }
  function Wn(t) {
    return this.__data__.get(t);
  }
  function zn(t) {
    return this.__data__.has(t);
  }
  function Zn(t, i) {
    var u = this.__data__;
    if (u instanceof G) {
      var d = u.__data__;
      if (!Te || d.length < r - 1)
        return d.push([t, i]), this;
      u = this.__data__ = new te(d);
    }
    return u.set(t, i), this;
  }
  ae.prototype.clear = Nn, ae.prototype.delete = $n, ae.prototype.get = Wn, ae.prototype.has = zn, ae.prototype.set = Zn;
  function Xe(t, i) {
    var u = _t(t) || Je(t) ? ct(t.length, String) : [], d = u.length, S = !!d;
    for (var C in t)
      (i || ge.call(t, C)) && !(S && (C == "length" || ir(C, d))) && u.push(C);
    return u;
  }
  function Wt(t, i, u) {
    var d = t[i];
    (!(ge.call(t, i) && Yt(d, u)) || u === void 0 && !(i in t)) && (t[i] = u);
  }
  function qe(t, i) {
    for (var u = t.length; u--; )
      if (Yt(t[u][0], i))
        return u;
    return -1;
  }
  function me(t, i) {
    return t && xt(i, Et(i), t);
  }
  function bt(t, i, u, d, S, C, D) {
    var V;
    if (d && (V = C ? d(t, S, C, D) : d(t)), V !== void 0)
      return V;
    if (!be(t))
      return t;
    var q = _t(t);
    if (q) {
      if (V = rr(t), !i)
        return er(t, V);
    } else {
      var $ = Ee(t), ne = $ == g || $ == p;
      if (Xt(t))
        return Qe(t, i);
      if ($ == w || $ == c || ne && !C) {
        if (ut(t))
          return C ? t : {};
        if (V = ye(ne ? {} : t), !i)
          return tr(t, me(V, t));
      } else {
        if (!B[$])
          return C ? t : {};
        V = or(t, $, bt, i);
      }
    }
    D || (D = new ae());
    var ce = D.get(t);
    if (ce)
      return ce;
    if (D.set(t, V), !q)
      var Q = u ? nr(t) : Et(t);
    return Mt(Q || t, function(re, ee) {
      Q && (ee = re, re = t[ee]), Wt(V, ee, bt(re, i, u, d, ee, t, D));
    }), V;
  }
  function Un(t) {
    return be(t) ? Bt(t) : {};
  }
  function Kn(t, i, u) {
    var d = i(t);
    return _t(t) ? d : At(d, u(t));
  }
  function Yn(t) {
    return ze.call(t);
  }
  function Xn(t) {
    if (!be(t) || cr(t))
      return !1;
    var i = Ct(t) || ut(t) ? On : I;
    return i.test(ie(t));
  }
  function qn(t) {
    if (!Ut(t))
      return Ht(t);
    var i = [];
    for (var u in Object(t))
      ge.call(t, u) && u != "constructor" && i.push(u);
    return i;
  }
  function Qe(t, i) {
    if (i)
      return t.slice();
    var u = new t.constructor(t.length);
    return t.copy(u), u;
  }
  function wt(t) {
    var i = new t.constructor(t.byteLength);
    return new ft(i).set(new ft(t)), i;
  }
  function Ie(t, i) {
    var u = i ? wt(t.buffer) : t.buffer;
    return new t.constructor(u, t.byteOffset, t.byteLength);
  }
  function zt(t, i, u) {
    var d = i ? u(Pt(t), !0) : Pt(t);
    return at(d, Cn, new t.constructor());
  }
  function Zt(t) {
    var i = new t.constructor(t.source, Z.exec(t));
    return i.lastIndex = t.lastIndex, i;
  }
  function Qn(t, i, u) {
    var d = i ? u(Ft(t), !0) : Ft(t);
    return at(d, fe, new t.constructor());
  }
  function Jn(t) {
    return Nt ? Object(Nt.call(t)) : {};
  }
  function Gn(t, i) {
    var u = i ? wt(t.buffer) : t.buffer;
    return new t.constructor(u, t.byteOffset, t.length);
  }
  function er(t, i) {
    var u = -1, d = t.length;
    for (i || (i = Array(d)); ++u < d; )
      i[u] = t[u];
    return i;
  }
  function xt(t, i, u, d) {
    u || (u = {});
    for (var S = -1, C = i.length; ++S < C; ) {
      var D = i[S], V = d ? d(u[D], t[D], D, u, t) : void 0;
      Wt(u, D, V === void 0 ? t[D] : V);
    }
    return u;
  }
  function tr(t, i) {
    return xt(t, Ce(t), i);
  }
  function nr(t) {
    return Kn(t, Et, Ce);
  }
  function De(t, i) {
    var u = t.__data__;
    return ar(i) ? u[typeof i == "string" ? "string" : "hash"] : u.map;
  }
  function he(t, i) {
    var u = Tt(t, i);
    return Xn(u) ? u : void 0;
  }
  var Ce = dt ? st(dt, Object) : sr, Ee = Yn;
  (Ke && Ee(new Ke(new ArrayBuffer(1))) != H || Te && Ee(new Te()) != m || de && Ee(de.resolve()) != _ || Ye && Ee(new Ye()) != R || ht && Ee(new ht()) != T) && (Ee = function(t) {
    var i = ze.call(t), u = i == w ? t.constructor : void 0, d = u ? ie(u) : void 0;
    if (d)
      switch (d) {
        case pt:
          return H;
        case Fe:
          return m;
        case vt:
          return _;
        case gt:
          return R;
        case mt:
          return T;
      }
    return i;
  });
  function rr(t) {
    var i = t.length, u = t.constructor(i);
    return i && typeof t[0] == "string" && ge.call(t, "index") && (u.index = t.index, u.input = t.input), u;
  }
  function ye(t) {
    return typeof t.constructor == "function" && !Ut(t) ? Un(le(t)) : {};
  }
  function or(t, i, u, d) {
    var S = t.constructor;
    switch (i) {
      case P:
        return wt(t);
      case l:
      case h:
        return new S(+t);
      case H:
        return Ie(t, d);
      case K:
      case J:
      case Y:
      case N:
      case L:
      case A:
      case k:
      case O:
      case M:
        return Gn(t, d);
      case m:
        return zt(t, d, u);
      case y:
      case x:
        return new S(t);
      case j:
        return Zt(t);
      case R:
        return Qn(t, d, u);
      case E:
        return Jn(t);
    }
  }
  function ir(t, i) {
    return i = i ?? a, !!i && (typeof t == "number" || oe.test(t)) && t > -1 && t % 1 == 0 && t < i;
  }
  function ar(t) {
    var i = typeof t;
    return i == "string" || i == "number" || i == "symbol" || i == "boolean" ? t !== "__proto__" : t === null;
  }
  function cr(t) {
    return !!It && It in t;
  }
  function Ut(t) {
    var i = t && t.constructor, u = typeof i == "function" && i.prototype || We;
    return t === u;
  }
  function ie(t) {
    if (t != null) {
      try {
        return Dt.call(t);
      } catch {
      }
      try {
        return t + "";
      } catch {
      }
    }
    return "";
  }
  function Kt(t) {
    return bt(t, !0, !0);
  }
  function Yt(t, i) {
    return t === i || t !== t && i !== i;
  }
  function Je(t) {
    return ur(t) && ge.call(t, "callee") && (!Vt.call(t, "callee") || ze.call(t) == c);
  }
  var _t = Array.isArray;
  function Ge(t) {
    return t != null && qt(t.length) && !Ct(t);
  }
  function ur(t) {
    return Qt(t) && Ge(t);
  }
  var Xt = Ue || lr;
  function Ct(t) {
    var i = be(t) ? ze.call(t) : "";
    return i == g || i == p;
  }
  function qt(t) {
    return typeof t == "number" && t > -1 && t % 1 == 0 && t <= a;
  }
  function be(t) {
    var i = typeof t;
    return !!t && (i == "object" || i == "function");
  }
  function Qt(t) {
    return !!t && typeof t == "object";
  }
  function Et(t) {
    return Ge(t) ? Xe(t) : qn(t);
  }
  function sr() {
    return [];
  }
  function lr() {
    return !1;
  }
  e.exports = Kt;
})(on, on.exports);
on.exports;
var ri = typeof U == "object" && U && U.Object === Object && U, oi = typeof self == "object" && self && self.Object === Object && self;
ri || oi || Function("return this")();
var an = { exports: {} };
an.exports;
(function(e, n) {
  var r = 200, o = "__lodash_hash_undefined__", a = 1, c = 2, s = 9007199254740991, l = "[object Arguments]", h = "[object Array]", f = "[object AsyncFunction]", g = "[object Boolean]", p = "[object Date]", m = "[object Error]", y = "[object Function]", w = "[object GeneratorFunction]", _ = "[object Map]", j = "[object Number]", R = "[object Null]", x = "[object Object]", E = "[object Promise]", T = "[object Proxy]", P = "[object RegExp]", H = "[object Set]", K = "[object String]", J = "[object Symbol]", Y = "[object Undefined]", N = "[object WeakMap]", L = "[object ArrayBuffer]", A = "[object DataView]", k = "[object Float32Array]", O = "[object Float64Array]", M = "[object Int8Array]", W = "[object Int16Array]", Z = "[object Int32Array]", I = "[object Uint8Array]", oe = "[object Uint8ClampedArray]", B = "[object Uint16Array]", xe = "[object Uint32Array]", it = /[\\^$.*+?()[\]{}|]/g, ue = /^\[object .+?Constructor\]$/, Lt = /^(?:0|[1-9]\d*)$/, z = {};
  z[k] = z[O] = z[M] = z[W] = z[Z] = z[I] = z[oe] = z[B] = z[xe] = !0, z[l] = z[h] = z[L] = z[g] = z[A] = z[p] = z[m] = z[y] = z[_] = z[j] = z[x] = z[P] = z[H] = z[K] = z[N] = !1;
  var St = typeof U == "object" && U && U.Object === Object && U, Cn = typeof self == "object" && self && self.Object === Object && self, fe = St || Cn || Function("return this")(), Mt = n && !n.nodeType && n, At = Mt && !0 && e && !e.nodeType && e, at = At && At.exports === Mt, ct = at && St.process, Tt = function() {
    try {
      return ct && ct.binding && ct.binding("util");
    } catch {
    }
  }(), ut = Tt && Tt.isTypedArray;
  function Pt(t, i) {
    for (var u = -1, d = t == null ? 0 : t.length, S = 0, C = []; ++u < d; ) {
      var D = t[u];
      i(D, u, t) && (C[S++] = D);
    }
    return C;
  }
  function st(t, i) {
    for (var u = -1, d = i.length, S = t.length; ++u < d; )
      t[S + u] = i[u];
    return t;
  }
  function Ft(t, i) {
    for (var u = -1, d = t == null ? 0 : t.length; ++u < d; )
      if (i(t[u], u, t))
        return !0;
    return !1;
  }
  function En(t, i) {
    for (var u = -1, d = Array(t); ++u < t; )
      d[u] = i(u);
    return d;
  }
  function Rn(t) {
    return function(i) {
      return t(i);
    };
  }
  function We(t, i) {
    return t.has(i);
  }
  function lt(t, i) {
    return t == null ? void 0 : t[i];
  }
  function It(t) {
    var i = -1, u = Array(t.size);
    return t.forEach(function(d, S) {
      u[++i] = [S, d];
    }), u;
  }
  function Dt(t, i) {
    return function(u) {
      return t(i(u));
    };
  }
  function ge(t) {
    var i = -1, u = Array(t.size);
    return t.forEach(function(d) {
      u[++i] = d;
    }), u;
  }
  var ze = Array.prototype, On = Function.prototype, Ae = Object.prototype, Ze = fe["__core-js_shared__"], ft = On.toString, le = Ae.hasOwnProperty, Bt = function() {
    var t = /[^.]+$/.exec(Ze && Ze.keys && Ze.keys.IE_PROTO || "");
    return t ? "Symbol(src)_1." + t : "";
  }(), Vt = Ae.toString, jn = RegExp(
    "^" + ft.call(le).replace(it, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), dt = at ? fe.Buffer : void 0, Ue = fe.Symbol, Ht = fe.Uint8Array, Ke = Ae.propertyIsEnumerable, Te = ze.splice, de = Ue ? Ue.toStringTag : void 0, Ye = Object.getOwnPropertySymbols, ht = dt ? dt.isBuffer : void 0, Pe = Dt(Object.keys, Object), pt = Ce(fe, "DataView"), Fe = Ce(fe, "Map"), vt = Ce(fe, "Promise"), gt = Ce(fe, "Set"), mt = Ce(fe, "WeakMap"), je = Ce(Object, "create"), Nt = ie(pt), _e = ie(Fe), kn = ie(vt), Ln = ie(gt), Sn = ie(mt), $t = Ue ? Ue.prototype : void 0, yt = $t ? $t.valueOf : void 0;
  function G(t) {
    var i = -1, u = t == null ? 0 : t.length;
    for (this.clear(); ++i < u; ) {
      var d = t[i];
      this.set(d[0], d[1]);
    }
  }
  function Mn() {
    this.__data__ = je ? je(null) : {}, this.size = 0;
  }
  function An(t) {
    var i = this.has(t) && delete this.__data__[t];
    return this.size -= i ? 1 : 0, i;
  }
  function Tn(t) {
    var i = this.__data__;
    if (je) {
      var u = i[t];
      return u === o ? void 0 : u;
    }
    return le.call(i, t) ? i[t] : void 0;
  }
  function Pn(t) {
    var i = this.__data__;
    return je ? i[t] !== void 0 : le.call(i, t);
  }
  function Fn(t, i) {
    var u = this.__data__;
    return this.size += this.has(t) ? 0 : 1, u[t] = je && i === void 0 ? o : i, this;
  }
  G.prototype.clear = Mn, G.prototype.delete = An, G.prototype.get = Tn, G.prototype.has = Pn, G.prototype.set = Fn;
  function te(t) {
    var i = -1, u = t == null ? 0 : t.length;
    for (this.clear(); ++i < u; ) {
      var d = t[i];
      this.set(d[0], d[1]);
    }
  }
  function In() {
    this.__data__ = [], this.size = 0;
  }
  function Dn(t) {
    var i = this.__data__, u = Qe(i, t);
    if (u < 0)
      return !1;
    var d = i.length - 1;
    return u == d ? i.pop() : Te.call(i, u, 1), --this.size, !0;
  }
  function Bn(t) {
    var i = this.__data__, u = Qe(i, t);
    return u < 0 ? void 0 : i[u][1];
  }
  function Vn(t) {
    return Qe(this.__data__, t) > -1;
  }
  function Hn(t, i) {
    var u = this.__data__, d = Qe(u, t);
    return d < 0 ? (++this.size, u.push([t, i])) : u[d][1] = i, this;
  }
  te.prototype.clear = In, te.prototype.delete = Dn, te.prototype.get = Bn, te.prototype.has = Vn, te.prototype.set = Hn;
  function ae(t) {
    var i = -1, u = t == null ? 0 : t.length;
    for (this.clear(); ++i < u; ) {
      var d = t[i];
      this.set(d[0], d[1]);
    }
  }
  function Nn() {
    this.size = 0, this.__data__ = {
      hash: new G(),
      map: new (Fe || te)(),
      string: new G()
    };
  }
  function $n(t) {
    var i = he(this, t).delete(t);
    return this.size -= i ? 1 : 0, i;
  }
  function Wn(t) {
    return he(this, t).get(t);
  }
  function zn(t) {
    return he(this, t).has(t);
  }
  function Zn(t, i) {
    var u = he(this, t), d = u.size;
    return u.set(t, i), this.size += u.size == d ? 0 : 1, this;
  }
  ae.prototype.clear = Nn, ae.prototype.delete = $n, ae.prototype.get = Wn, ae.prototype.has = zn, ae.prototype.set = Zn;
  function Xe(t) {
    var i = -1, u = t == null ? 0 : t.length;
    for (this.__data__ = new ae(); ++i < u; )
      this.add(t[i]);
  }
  function Wt(t) {
    return this.__data__.set(t, o), this;
  }
  function qe(t) {
    return this.__data__.has(t);
  }
  Xe.prototype.add = Xe.prototype.push = Wt, Xe.prototype.has = qe;
  function me(t) {
    var i = this.__data__ = new te(t);
    this.size = i.size;
  }
  function bt() {
    this.__data__ = new te(), this.size = 0;
  }
  function Un(t) {
    var i = this.__data__, u = i.delete(t);
    return this.size = i.size, u;
  }
  function Kn(t) {
    return this.__data__.get(t);
  }
  function Yn(t) {
    return this.__data__.has(t);
  }
  function Xn(t, i) {
    var u = this.__data__;
    if (u instanceof te) {
      var d = u.__data__;
      if (!Fe || d.length < r - 1)
        return d.push([t, i]), this.size = ++u.size, this;
      u = this.__data__ = new ae(d);
    }
    return u.set(t, i), this.size = u.size, this;
  }
  me.prototype.clear = bt, me.prototype.delete = Un, me.prototype.get = Kn, me.prototype.has = Yn, me.prototype.set = Xn;
  function qn(t, i) {
    var u = Je(t), d = !u && Yt(t), S = !u && !d && Ge(t), C = !u && !d && !S && Qt(t), D = u || d || S || C, V = D ? En(t.length, String) : [], q = V.length;
    for (var $ in t)
      (i || le.call(t, $)) && !(D && // Safari 9 has enumerable `arguments.length` in strict mode.
      ($ == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      S && ($ == "offset" || $ == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      C && ($ == "buffer" || $ == "byteLength" || $ == "byteOffset") || // Skip index properties.
      or($, q))) && V.push($);
    return V;
  }
  function Qe(t, i) {
    for (var u = t.length; u--; )
      if (Kt(t[u][0], i))
        return u;
    return -1;
  }
  function wt(t, i, u) {
    var d = i(t);
    return Je(t) ? d : st(d, u(t));
  }
  function Ie(t) {
    return t == null ? t === void 0 ? Y : R : de && de in Object(t) ? Ee(t) : Ut(t);
  }
  function zt(t) {
    return be(t) && Ie(t) == l;
  }
  function Zt(t, i, u, d, S) {
    return t === i ? !0 : t == null || i == null || !be(t) && !be(i) ? t !== t && i !== i : Qn(t, i, u, d, Zt, S);
  }
  function Qn(t, i, u, d, S, C) {
    var D = Je(t), V = Je(i), q = D ? h : ye(t), $ = V ? h : ye(i);
    q = q == l ? x : q, $ = $ == l ? x : $;
    var ne = q == x, ce = $ == x, Q = q == $;
    if (Q && Ge(t)) {
      if (!Ge(i))
        return !1;
      D = !0, ne = !1;
    }
    if (Q && !ne)
      return C || (C = new me()), D || Qt(t) ? xt(t, i, u, d, S, C) : tr(t, i, q, u, d, S, C);
    if (!(u & a)) {
      var re = ne && le.call(t, "__wrapped__"), ee = ce && le.call(i, "__wrapped__");
      if (re || ee) {
        var ke = re ? t.value() : t, Re = ee ? i.value() : i;
        return C || (C = new me()), S(ke, Re, u, d, C);
      }
    }
    return Q ? (C || (C = new me()), nr(t, i, u, d, S, C)) : !1;
  }
  function Jn(t) {
    if (!qt(t) || ar(t))
      return !1;
    var i = Xt(t) ? jn : ue;
    return i.test(ie(t));
  }
  function Gn(t) {
    return be(t) && Ct(t.length) && !!z[Ie(t)];
  }
  function er(t) {
    if (!cr(t))
      return Pe(t);
    var i = [];
    for (var u in Object(t))
      le.call(t, u) && u != "constructor" && i.push(u);
    return i;
  }
  function xt(t, i, u, d, S, C) {
    var D = u & a, V = t.length, q = i.length;
    if (V != q && !(D && q > V))
      return !1;
    var $ = C.get(t);
    if ($ && C.get(i))
      return $ == i;
    var ne = -1, ce = !0, Q = u & c ? new Xe() : void 0;
    for (C.set(t, i), C.set(i, t); ++ne < V; ) {
      var re = t[ne], ee = i[ne];
      if (d)
        var ke = D ? d(ee, re, ne, i, t, C) : d(re, ee, ne, t, i, C);
      if (ke !== void 0) {
        if (ke)
          continue;
        ce = !1;
        break;
      }
      if (Q) {
        if (!Ft(i, function(Re, Be) {
          if (!We(Q, Be) && (re === Re || S(re, Re, u, d, C)))
            return Q.push(Be);
        })) {
          ce = !1;
          break;
        }
      } else if (!(re === ee || S(re, ee, u, d, C))) {
        ce = !1;
        break;
      }
    }
    return C.delete(t), C.delete(i), ce;
  }
  function tr(t, i, u, d, S, C, D) {
    switch (u) {
      case A:
        if (t.byteLength != i.byteLength || t.byteOffset != i.byteOffset)
          return !1;
        t = t.buffer, i = i.buffer;
      case L:
        return !(t.byteLength != i.byteLength || !C(new Ht(t), new Ht(i)));
      case g:
      case p:
      case j:
        return Kt(+t, +i);
      case m:
        return t.name == i.name && t.message == i.message;
      case P:
      case K:
        return t == i + "";
      case _:
        var V = It;
      case H:
        var q = d & a;
        if (V || (V = ge), t.size != i.size && !q)
          return !1;
        var $ = D.get(t);
        if ($)
          return $ == i;
        d |= c, D.set(t, i);
        var ne = xt(V(t), V(i), d, S, C, D);
        return D.delete(t), ne;
      case J:
        if (yt)
          return yt.call(t) == yt.call(i);
    }
    return !1;
  }
  function nr(t, i, u, d, S, C) {
    var D = u & a, V = De(t), q = V.length, $ = De(i), ne = $.length;
    if (q != ne && !D)
      return !1;
    for (var ce = q; ce--; ) {
      var Q = V[ce];
      if (!(D ? Q in i : le.call(i, Q)))
        return !1;
    }
    var re = C.get(t);
    if (re && C.get(i))
      return re == i;
    var ee = !0;
    C.set(t, i), C.set(i, t);
    for (var ke = D; ++ce < q; ) {
      Q = V[ce];
      var Re = t[Q], Be = i[Q];
      if (d)
        var Dr = D ? d(Be, Re, Q, i, t, C) : d(Re, Be, Q, t, i, C);
      if (!(Dr === void 0 ? Re === Be || S(Re, Be, u, d, C) : Dr)) {
        ee = !1;
        break;
      }
      ke || (ke = Q == "constructor");
    }
    if (ee && !ke) {
      var Jt = t.constructor, Gt = i.constructor;
      Jt != Gt && "constructor" in t && "constructor" in i && !(typeof Jt == "function" && Jt instanceof Jt && typeof Gt == "function" && Gt instanceof Gt) && (ee = !1);
    }
    return C.delete(t), C.delete(i), ee;
  }
  function De(t) {
    return wt(t, Et, rr);
  }
  function he(t, i) {
    var u = t.__data__;
    return ir(i) ? u[typeof i == "string" ? "string" : "hash"] : u.map;
  }
  function Ce(t, i) {
    var u = lt(t, i);
    return Jn(u) ? u : void 0;
  }
  function Ee(t) {
    var i = le.call(t, de), u = t[de];
    try {
      t[de] = void 0;
      var d = !0;
    } catch {
    }
    var S = Vt.call(t);
    return d && (i ? t[de] = u : delete t[de]), S;
  }
  var rr = Ye ? function(t) {
    return t == null ? [] : (t = Object(t), Pt(Ye(t), function(i) {
      return Ke.call(t, i);
    }));
  } : sr, ye = Ie;
  (pt && ye(new pt(new ArrayBuffer(1))) != A || Fe && ye(new Fe()) != _ || vt && ye(vt.resolve()) != E || gt && ye(new gt()) != H || mt && ye(new mt()) != N) && (ye = function(t) {
    var i = Ie(t), u = i == x ? t.constructor : void 0, d = u ? ie(u) : "";
    if (d)
      switch (d) {
        case Nt:
          return A;
        case _e:
          return _;
        case kn:
          return E;
        case Ln:
          return H;
        case Sn:
          return N;
      }
    return i;
  });
  function or(t, i) {
    return i = i ?? s, !!i && (typeof t == "number" || Lt.test(t)) && t > -1 && t % 1 == 0 && t < i;
  }
  function ir(t) {
    var i = typeof t;
    return i == "string" || i == "number" || i == "symbol" || i == "boolean" ? t !== "__proto__" : t === null;
  }
  function ar(t) {
    return !!Bt && Bt in t;
  }
  function cr(t) {
    var i = t && t.constructor, u = typeof i == "function" && i.prototype || Ae;
    return t === u;
  }
  function Ut(t) {
    return Vt.call(t);
  }
  function ie(t) {
    if (t != null) {
      try {
        return ft.call(t);
      } catch {
      }
      try {
        return t + "";
      } catch {
      }
    }
    return "";
  }
  function Kt(t, i) {
    return t === i || t !== t && i !== i;
  }
  var Yt = zt(/* @__PURE__ */ function() {
    return arguments;
  }()) ? zt : function(t) {
    return be(t) && le.call(t, "callee") && !Ke.call(t, "callee");
  }, Je = Array.isArray;
  function _t(t) {
    return t != null && Ct(t.length) && !Xt(t);
  }
  var Ge = ht || lr;
  function ur(t, i) {
    return Zt(t, i);
  }
  function Xt(t) {
    if (!qt(t))
      return !1;
    var i = Ie(t);
    return i == y || i == w || i == f || i == T;
  }
  function Ct(t) {
    return typeof t == "number" && t > -1 && t % 1 == 0 && t <= s;
  }
  function qt(t) {
    var i = typeof t;
    return t != null && (i == "object" || i == "function");
  }
  function be(t) {
    return t != null && typeof t == "object";
  }
  var Qt = ut ? Rn(ut) : Gn;
  function Et(t) {
    return _t(t) ? qn(t) : er(t);
  }
  function sr() {
    return [];
  }
  function lr() {
    return !1;
  }
  e.exports = ur;
})(an, an.exports);
an.exports;
var ii = 200, Rr = "__lodash_hash_undefined__", ai = 1 / 0, so = 9007199254740991, ci = "[object Arguments]", ui = "[object Function]", si = "[object GeneratorFunction]", li = "[object Symbol]", fi = /[\\^$.*+?()[\]{}|]/g, di = /^\[object .+?Constructor\]$/, hi = /^(?:0|[1-9]\d*)$/, pi = typeof U == "object" && U && U.Object === Object && U, vi = typeof self == "object" && self && self.Object === Object && self, Or = pi || vi || Function("return this")();
function gi(e, n, r) {
  switch (r.length) {
    case 0:
      return e.call(n);
    case 1:
      return e.call(n, r[0]);
    case 2:
      return e.call(n, r[0], r[1]);
    case 3:
      return e.call(n, r[0], r[1], r[2]);
  }
  return e.apply(n, r);
}
function mi(e, n) {
  var r = e ? e.length : 0;
  return !!r && wi(e, n, 0) > -1;
}
function yi(e, n, r) {
  for (var o = -1, a = e ? e.length : 0; ++o < a; )
    if (r(n, e[o]))
      return !0;
  return !1;
}
function lo(e, n) {
  for (var r = -1, o = e ? e.length : 0, a = Array(o); ++r < o; )
    a[r] = n(e[r], r, e);
  return a;
}
function jr(e, n) {
  for (var r = -1, o = n.length, a = e.length; ++r < o; )
    e[a + r] = n[r];
  return e;
}
function bi(e, n, r, o) {
  for (var a = e.length, c = r + (o ? 1 : -1); o ? c-- : ++c < a; )
    if (n(e[c], c, e))
      return c;
  return -1;
}
function wi(e, n, r) {
  if (n !== n)
    return bi(e, xi, r);
  for (var o = r - 1, a = e.length; ++o < a; )
    if (e[o] === n)
      return o;
  return -1;
}
function xi(e) {
  return e !== e;
}
function _i(e, n) {
  for (var r = -1, o = Array(e); ++r < e; )
    o[r] = n(r);
  return o;
}
function Ci(e) {
  return function(n) {
    return e(n);
  };
}
function Ei(e, n) {
  return e.has(n);
}
function Ri(e, n) {
  return e == null ? void 0 : e[n];
}
function Oi(e) {
  var n = !1;
  if (e != null && typeof e.toString != "function")
    try {
      n = !!(e + "");
    } catch {
    }
  return n;
}
function fo(e, n) {
  return function(r) {
    return e(n(r));
  };
}
var ji = Array.prototype, ki = Function.prototype, gn = Object.prototype, fr = Or["__core-js_shared__"], Br = function() {
  var e = /[^.]+$/.exec(fr && fr.keys && fr.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}(), ho = ki.toString, nt = gn.hasOwnProperty, kr = gn.toString, Li = RegExp(
  "^" + ho.call(nt).replace(fi, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
), Vr = Or.Symbol, Si = fo(Object.getPrototypeOf, Object), Mi = gn.propertyIsEnumerable, Ai = ji.splice, Hr = Vr ? Vr.isConcatSpreadable : void 0, br = Object.getOwnPropertySymbols, Nr = Math.max, Ti = vo(Or, "Map"), Ot = vo(Object, "create");
function He(e) {
  var n = -1, r = e ? e.length : 0;
  for (this.clear(); ++n < r; ) {
    var o = e[n];
    this.set(o[0], o[1]);
  }
}
function Pi() {
  this.__data__ = Ot ? Ot(null) : {};
}
function Fi(e) {
  return this.has(e) && delete this.__data__[e];
}
function Ii(e) {
  var n = this.__data__;
  if (Ot) {
    var r = n[e];
    return r === Rr ? void 0 : r;
  }
  return nt.call(n, e) ? n[e] : void 0;
}
function Di(e) {
  var n = this.__data__;
  return Ot ? n[e] !== void 0 : nt.call(n, e);
}
function Bi(e, n) {
  var r = this.__data__;
  return r[e] = Ot && n === void 0 ? Rr : n, this;
}
He.prototype.clear = Pi;
He.prototype.delete = Fi;
He.prototype.get = Ii;
He.prototype.has = Di;
He.prototype.set = Bi;
function rt(e) {
  var n = -1, r = e ? e.length : 0;
  for (this.clear(); ++n < r; ) {
    var o = e[n];
    this.set(o[0], o[1]);
  }
}
function Vi() {
  this.__data__ = [];
}
function Hi(e) {
  var n = this.__data__, r = mn(n, e);
  if (r < 0)
    return !1;
  var o = n.length - 1;
  return r == o ? n.pop() : Ai.call(n, r, 1), !0;
}
function Ni(e) {
  var n = this.__data__, r = mn(n, e);
  return r < 0 ? void 0 : n[r][1];
}
function $i(e) {
  return mn(this.__data__, e) > -1;
}
function Wi(e, n) {
  var r = this.__data__, o = mn(r, e);
  return o < 0 ? r.push([e, n]) : r[o][1] = n, this;
}
rt.prototype.clear = Vi;
rt.prototype.delete = Hi;
rt.prototype.get = Ni;
rt.prototype.has = $i;
rt.prototype.set = Wi;
function ot(e) {
  var n = -1, r = e ? e.length : 0;
  for (this.clear(); ++n < r; ) {
    var o = e[n];
    this.set(o[0], o[1]);
  }
}
function zi() {
  this.__data__ = {
    hash: new He(),
    map: new (Ti || rt)(),
    string: new He()
  };
}
function Zi(e) {
  return yn(this, e).delete(e);
}
function Ui(e) {
  return yn(this, e).get(e);
}
function Ki(e) {
  return yn(this, e).has(e);
}
function Yi(e, n) {
  return yn(this, e).set(e, n), this;
}
ot.prototype.clear = zi;
ot.prototype.delete = Zi;
ot.prototype.get = Ui;
ot.prototype.has = Ki;
ot.prototype.set = Yi;
function cn(e) {
  var n = -1, r = e ? e.length : 0;
  for (this.__data__ = new ot(); ++n < r; )
    this.add(e[n]);
}
function Xi(e) {
  return this.__data__.set(e, Rr), this;
}
function qi(e) {
  return this.__data__.has(e);
}
cn.prototype.add = cn.prototype.push = Xi;
cn.prototype.has = qi;
function Qi(e, n) {
  var r = Lr(e) || go(e) ? _i(e.length, String) : [], o = r.length, a = !!o;
  for (var c in e)
    (n || nt.call(e, c)) && !(a && (c == "length" || sa(c, o))) && r.push(c);
  return r;
}
function mn(e, n) {
  for (var r = e.length; r--; )
    if (ga(e[r][0], n))
      return r;
  return -1;
}
function Ji(e, n, r, o) {
  var a = -1, c = mi, s = !0, l = e.length, h = [], f = n.length;
  if (!l)
    return h;
  r && (n = lo(n, Ci(r))), o ? (c = yi, s = !1) : n.length >= ii && (c = Ei, s = !1, n = new cn(n));
  e:
    for (; ++a < l; ) {
      var g = e[a], p = r ? r(g) : g;
      if (g = o || g !== 0 ? g : 0, s && p === p) {
        for (var m = f; m--; )
          if (n[m] === p)
            continue e;
        h.push(g);
      } else
        c(n, p, o) || h.push(g);
    }
  return h;
}
function po(e, n, r, o, a) {
  var c = -1, s = e.length;
  for (r || (r = ua), a || (a = []); ++c < s; ) {
    var l = e[c];
    n > 0 && r(l) ? n > 1 ? po(l, n - 1, r, o, a) : jr(a, l) : o || (a[a.length] = l);
  }
  return a;
}
function Gi(e, n, r) {
  var o = n(e);
  return Lr(e) ? o : jr(o, r(e));
}
function ea(e) {
  if (!Sr(e) || fa(e))
    return !1;
  var n = yo(e) || Oi(e) ? Li : di;
  return n.test(va(e));
}
function ta(e) {
  if (!Sr(e))
    return ha(e);
  var n = da(e), r = [];
  for (var o in e)
    o == "constructor" && (n || !nt.call(e, o)) || r.push(o);
  return r;
}
function na(e, n) {
  return e = Object(e), ra(e, n, function(r, o) {
    return o in e;
  });
}
function ra(e, n, r) {
  for (var o = -1, a = n.length, c = {}; ++o < a; ) {
    var s = n[o], l = e[s];
    r(l, s) && (c[s] = l);
  }
  return c;
}
function oa(e, n) {
  return n = Nr(n === void 0 ? e.length - 1 : n, 0), function() {
    for (var r = arguments, o = -1, a = Nr(r.length - n, 0), c = Array(a); ++o < a; )
      c[o] = r[n + o];
    o = -1;
    for (var s = Array(n + 1); ++o < n; )
      s[o] = r[o];
    return s[n] = c, gi(e, this, s);
  };
}
function ia(e) {
  return Gi(e, wa, ca);
}
function yn(e, n) {
  var r = e.__data__;
  return la(n) ? r[typeof n == "string" ? "string" : "hash"] : r.map;
}
function vo(e, n) {
  var r = Ri(e, n);
  return ea(r) ? r : void 0;
}
var aa = br ? fo(br, Object) : wo, ca = br ? function(e) {
  for (var n = []; e; )
    jr(n, aa(e)), e = Si(e);
  return n;
} : wo;
function ua(e) {
  return Lr(e) || go(e) || !!(Hr && e && e[Hr]);
}
function sa(e, n) {
  return n = n ?? so, !!n && (typeof e == "number" || hi.test(e)) && e > -1 && e % 1 == 0 && e < n;
}
function la(e) {
  var n = typeof e;
  return n == "string" || n == "number" || n == "symbol" || n == "boolean" ? e !== "__proto__" : e === null;
}
function fa(e) {
  return !!Br && Br in e;
}
function da(e) {
  var n = e && e.constructor, r = typeof n == "function" && n.prototype || gn;
  return e === r;
}
function ha(e) {
  var n = [];
  if (e != null)
    for (var r in Object(e))
      n.push(r);
  return n;
}
function pa(e) {
  if (typeof e == "string" || ba(e))
    return e;
  var n = e + "";
  return n == "0" && 1 / e == -ai ? "-0" : n;
}
function va(e) {
  if (e != null) {
    try {
      return ho.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
function ga(e, n) {
  return e === n || e !== e && n !== n;
}
function go(e) {
  return ma(e) && nt.call(e, "callee") && (!Mi.call(e, "callee") || kr.call(e) == ci);
}
var Lr = Array.isArray;
function mo(e) {
  return e != null && ya(e.length) && !yo(e);
}
function ma(e) {
  return bo(e) && mo(e);
}
function yo(e) {
  var n = Sr(e) ? kr.call(e) : "";
  return n == ui || n == si;
}
function ya(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= so;
}
function Sr(e) {
  var n = typeof e;
  return !!e && (n == "object" || n == "function");
}
function bo(e) {
  return !!e && typeof e == "object";
}
function ba(e) {
  return typeof e == "symbol" || bo(e) && kr.call(e) == li;
}
function wa(e) {
  return mo(e) ? Qi(e, !0) : ta(e);
}
oa(function(e, n) {
  return e == null ? {} : (n = lo(po(n, 1), pa), na(e, Ji(ia(e), n)));
});
function wo() {
  return [];
}
var xa = 1 / 0, _a = 9007199254740991, Ca = "[object Arguments]", Ea = "[object Function]", Ra = "[object GeneratorFunction]", Oa = "[object Symbol]", ja = typeof U == "object" && U && U.Object === Object && U, ka = typeof self == "object" && self && self.Object === Object && self, La = ja || ka || Function("return this")();
function Sa(e, n, r) {
  switch (r.length) {
    case 0:
      return e.call(n);
    case 1:
      return e.call(n, r[0]);
    case 2:
      return e.call(n, r[0], r[1]);
    case 3:
      return e.call(n, r[0], r[1], r[2]);
  }
  return e.apply(n, r);
}
function Ma(e, n) {
  for (var r = -1, o = e ? e.length : 0, a = Array(o); ++r < o; )
    a[r] = n(e[r], r, e);
  return a;
}
function Aa(e, n) {
  for (var r = -1, o = n.length, a = e.length; ++r < o; )
    e[a + r] = n[r];
  return e;
}
var Mr = Object.prototype, Ta = Mr.hasOwnProperty, Ar = Mr.toString, $r = La.Symbol, Pa = Mr.propertyIsEnumerable, Wr = $r ? $r.isConcatSpreadable : void 0, zr = Math.max;
function xo(e, n, r, o, a) {
  var c = -1, s = e.length;
  for (r || (r = Ba), a || (a = []); ++c < s; ) {
    var l = e[c];
    n > 0 && r(l) ? n > 1 ? xo(l, n - 1, r, o, a) : Aa(a, l) : o || (a[a.length] = l);
  }
  return a;
}
function Fa(e, n) {
  return e = Object(e), Ia(e, n, function(r, o) {
    return o in e;
  });
}
function Ia(e, n, r) {
  for (var o = -1, a = n.length, c = {}; ++o < a; ) {
    var s = n[o], l = e[s];
    r(l, s) && (c[s] = l);
  }
  return c;
}
function Da(e, n) {
  return n = zr(n === void 0 ? e.length - 1 : n, 0), function() {
    for (var r = arguments, o = -1, a = zr(r.length - n, 0), c = Array(a); ++o < a; )
      c[o] = r[n + o];
    o = -1;
    for (var s = Array(n + 1); ++o < n; )
      s[o] = r[o];
    return s[n] = c, Sa(e, this, s);
  };
}
function Ba(e) {
  return Na(e) || Ha(e) || !!(Wr && e && e[Wr]);
}
function Va(e) {
  if (typeof e == "string" || Ka(e))
    return e;
  var n = e + "";
  return n == "0" && 1 / e == -xa ? "-0" : n;
}
function Ha(e) {
  return Wa(e) && Ta.call(e, "callee") && (!Pa.call(e, "callee") || Ar.call(e) == Ca);
}
var Na = Array.isArray;
function $a(e) {
  return e != null && Za(e.length) && !za(e);
}
function Wa(e) {
  return _o(e) && $a(e);
}
function za(e) {
  var n = Ua(e) ? Ar.call(e) : "";
  return n == Ea || n == Ra;
}
function Za(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= _a;
}
function Ua(e) {
  var n = typeof e;
  return !!e && (n == "object" || n == "function");
}
function _o(e) {
  return !!e && typeof e == "object";
}
function Ka(e) {
  return typeof e == "symbol" || _o(e) && Ar.call(e) == Oa;
}
Da(function(e, n) {
  return e == null ? {} : Fa(e, Ma(xo(n, 1), Va));
});
var Ya = typeof U == "object" && U && U.Object === Object && U, Xa = typeof self == "object" && self && self.Object === Object && self;
Ya || Xa || Function("return this")();
function bn(e) {
  return e.split("-")[1];
}
function Co(e) {
  return e === "y" ? "height" : "width";
}
function et(e) {
  return e.split("-")[0];
}
function Tr(e) {
  return ["top", "bottom"].includes(et(e)) ? "x" : "y";
}
function Zr(e, n, r) {
  let { reference: o, floating: a } = e;
  const c = o.x + o.width / 2 - a.width / 2, s = o.y + o.height / 2 - a.height / 2, l = Tr(n), h = Co(l), f = o[h] / 2 - a[h] / 2, g = l === "x";
  let p;
  switch (et(n)) {
    case "top":
      p = { x: c, y: o.y - a.height };
      break;
    case "bottom":
      p = { x: c, y: o.y + o.height };
      break;
    case "right":
      p = { x: o.x + o.width, y: s };
      break;
    case "left":
      p = { x: o.x - a.width, y: s };
      break;
    default:
      p = { x: o.x, y: o.y };
  }
  switch (bn(n)) {
    case "start":
      p[l] -= f * (r && g ? -1 : 1);
      break;
    case "end":
      p[l] += f * (r && g ? -1 : 1);
  }
  return p;
}
const qa = async (e, n, r) => {
  const { placement: o = "bottom", strategy: a = "absolute", middleware: c = [], platform: s } = r, l = c.filter(Boolean), h = await (s.isRTL == null ? void 0 : s.isRTL(n));
  let f = await s.getElementRects({ reference: e, floating: n, strategy: a }), { x: g, y: p } = Zr(f, o, h), m = o, y = {}, w = 0;
  for (let _ = 0; _ < l.length; _++) {
    const { name: j, fn: R } = l[_], { x, y: E, data: T, reset: P } = await R({ x: g, y: p, initialPlacement: o, placement: m, strategy: a, middlewareData: y, rects: f, platform: s, elements: { reference: e, floating: n } });
    g = x ?? g, p = E ?? p, y = { ...y, [j]: { ...y[j], ...T } }, P && w <= 50 && (w++, typeof P == "object" && (P.placement && (m = P.placement), P.rects && (f = P.rects === !0 ? await s.getElementRects({ reference: e, floating: n, strategy: a }) : P.rects), { x: g, y: p } = Zr(f, m, h)), _ = -1);
  }
  return { x: g, y: p, placement: m, strategy: a, middlewareData: y };
};
function Qa(e) {
  return typeof e != "number" ? function(n) {
    return { top: 0, right: 0, bottom: 0, left: 0, ...n };
  }(e) : { top: e, right: e, bottom: e, left: e };
}
function un(e) {
  return { ...e, top: e.y, left: e.x, right: e.x + e.width, bottom: e.y + e.height };
}
async function Ja(e, n) {
  var r;
  n === void 0 && (n = {});
  const { x: o, y: a, platform: c, rects: s, elements: l, strategy: h } = e, { boundary: f = "clippingAncestors", rootBoundary: g = "viewport", elementContext: p = "floating", altBoundary: m = !1, padding: y = 0 } = n, w = Qa(y), _ = l[m ? p === "floating" ? "reference" : "floating" : p], j = un(await c.getClippingRect({ element: (r = await (c.isElement == null ? void 0 : c.isElement(_))) == null || r ? _ : _.contextElement || await (c.getDocumentElement == null ? void 0 : c.getDocumentElement(l.floating)), boundary: f, rootBoundary: g, strategy: h })), R = p === "floating" ? { ...s.floating, x: o, y: a } : s.reference, x = await (c.getOffsetParent == null ? void 0 : c.getOffsetParent(l.floating)), E = await (c.isElement == null ? void 0 : c.isElement(x)) && await (c.getScale == null ? void 0 : c.getScale(x)) || { x: 1, y: 1 }, T = un(c.convertOffsetParentRelativeRectToViewportRelativeRect ? await c.convertOffsetParentRelativeRectToViewportRelativeRect({ rect: R, offsetParent: x, strategy: h }) : R);
  return { top: (j.top - T.top + w.top) / E.y, bottom: (T.bottom - j.bottom + w.bottom) / E.y, left: (j.left - T.left + w.left) / E.x, right: (T.right - j.right + w.right) / E.x };
}
const Ga = ["top", "right", "bottom", "left"];
Ga.reduce((e, n) => e.concat(n, n + "-start", n + "-end"), []);
const ec = { left: "right", right: "left", bottom: "top", top: "bottom" };
function sn(e) {
  return e.replace(/left|right|bottom|top/g, (n) => ec[n]);
}
function tc(e, n, r) {
  r === void 0 && (r = !1);
  const o = bn(e), a = Tr(e), c = Co(a);
  let s = a === "x" ? o === (r ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return n.reference[c] > n.floating[c] && (s = sn(s)), { main: s, cross: sn(s) };
}
const nc = { start: "end", end: "start" };
function dr(e) {
  return e.replace(/start|end/g, (n) => nc[n]);
}
const rc = function(e) {
  return e === void 0 && (e = {}), { name: "flip", options: e, async fn(n) {
    var r;
    const { placement: o, middlewareData: a, rects: c, initialPlacement: s, platform: l, elements: h } = n, { mainAxis: f = !0, crossAxis: g = !0, fallbackPlacements: p, fallbackStrategy: m = "bestFit", fallbackAxisSideDirection: y = "none", flipAlignment: w = !0, ..._ } = e, j = et(o), R = et(s) === s, x = await (l.isRTL == null ? void 0 : l.isRTL(h.floating)), E = p || (R || !w ? [sn(s)] : function(L) {
      const A = sn(L);
      return [dr(L), A, dr(A)];
    }(s));
    p || y === "none" || E.push(...function(L, A, k, O) {
      const M = bn(L);
      let W = function(Z, I, oe) {
        const B = ["left", "right"], xe = ["right", "left"], it = ["top", "bottom"], ue = ["bottom", "top"];
        switch (Z) {
          case "top":
          case "bottom":
            return oe ? I ? xe : B : I ? B : xe;
          case "left":
          case "right":
            return I ? it : ue;
          default:
            return [];
        }
      }(et(L), k === "start", O);
      return M && (W = W.map((Z) => Z + "-" + M), A && (W = W.concat(W.map(dr)))), W;
    }(s, w, y, x));
    const T = [s, ...E], P = await Ja(n, _), H = [];
    let K = ((r = a.flip) == null ? void 0 : r.overflows) || [];
    if (f && H.push(P[j]), g) {
      const { main: L, cross: A } = tc(o, c, x);
      H.push(P[L], P[A]);
    }
    if (K = [...K, { placement: o, overflows: H }], !H.every((L) => L <= 0)) {
      var J, Y;
      const L = (((J = a.flip) == null ? void 0 : J.index) || 0) + 1, A = T[L];
      if (A)
        return { data: { index: L, overflows: K }, reset: { placement: A } };
      let k = (Y = K.filter((O) => O.overflows[0] <= 0).sort((O, M) => O.overflows[1] - M.overflows[1])[0]) == null ? void 0 : Y.placement;
      if (!k)
        switch (m) {
          case "bestFit": {
            var N;
            const O = (N = K.map((M) => [M.placement, M.overflows.filter((W) => W > 0).reduce((W, Z) => W + Z, 0)]).sort((M, W) => M[1] - W[1])[0]) == null ? void 0 : N[0];
            O && (k = O);
            break;
          }
          case "initialPlacement":
            k = s;
        }
      if (o !== k)
        return { reset: { placement: k } };
    }
    return {};
  } };
}, oc = function(e) {
  return e === void 0 && (e = 0), { name: "offset", options: e, async fn(n) {
    const { x: r, y: o } = n, a = await async function(c, s) {
      const { placement: l, platform: h, elements: f } = c, g = await (h.isRTL == null ? void 0 : h.isRTL(f.floating)), p = et(l), m = bn(l), y = Tr(l) === "x", w = ["left", "top"].includes(p) ? -1 : 1, _ = g && y ? -1 : 1, j = typeof s == "function" ? s(c) : s;
      let { mainAxis: R, crossAxis: x, alignmentAxis: E } = typeof j == "number" ? { mainAxis: j, crossAxis: 0, alignmentAxis: null } : { mainAxis: 0, crossAxis: 0, alignmentAxis: null, ...j };
      return m && typeof E == "number" && (x = m === "end" ? -1 * E : E), y ? { x: x * _, y: R * w } : { x: R * w, y: x * _ };
    }(n, e);
    return { x: r + a.x, y: o + a.y, data: a };
  } };
};
function se(e) {
  var n;
  return ((n = e.ownerDocument) == null ? void 0 : n.defaultView) || window;
}
function we(e) {
  return se(e).getComputedStyle(e);
}
function Eo(e) {
  return e instanceof se(e).Node;
}
function Me(e) {
  return Eo(e) ? (e.nodeName || "").toLowerCase() : "";
}
let en;
function Ro() {
  if (en)
    return en;
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? (en = e.brands.map((n) => n.brand + "/" + n.version).join(" "), en) : navigator.userAgent;
}
function ve(e) {
  return e instanceof se(e).HTMLElement;
}
function pe(e) {
  return e instanceof se(e).Element;
}
function Ur(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof se(e).ShadowRoot || e instanceof ShadowRoot;
}
function wn(e) {
  const { overflow: n, overflowX: r, overflowY: o, display: a } = we(e);
  return /auto|scroll|overlay|hidden|clip/.test(n + o + r) && !["inline", "contents"].includes(a);
}
function ic(e) {
  return ["table", "td", "th"].includes(Me(e));
}
function wr(e) {
  const n = /firefox/i.test(Ro()), r = we(e), o = r.backdropFilter || r.WebkitBackdropFilter;
  return r.transform !== "none" || r.perspective !== "none" || !!o && o !== "none" || n && r.willChange === "filter" || n && !!r.filter && r.filter !== "none" || ["transform", "perspective"].some((a) => r.willChange.includes(a)) || ["paint", "layout", "strict", "content"].some((a) => {
    const c = r.contain;
    return c != null && c.includes(a);
  });
}
function xr() {
  return /^((?!chrome|android).)*safari/i.test(Ro());
}
function Pr(e) {
  return ["html", "body", "#document"].includes(Me(e));
}
const Kr = Math.min, Rt = Math.max, ln = Math.round;
function Oo(e) {
  const n = we(e);
  let r = parseFloat(n.width), o = parseFloat(n.height);
  const a = ve(e), c = a ? e.offsetWidth : r, s = a ? e.offsetHeight : o, l = ln(r) !== c || ln(o) !== s;
  return l && (r = c, o = s), { width: r, height: o, fallback: l };
}
function jo(e) {
  return pe(e) ? e : e.contextElement;
}
const ko = { x: 1, y: 1 };
function tt(e) {
  const n = jo(e);
  if (!ve(n))
    return ko;
  const r = n.getBoundingClientRect(), { width: o, height: a, fallback: c } = Oo(n);
  let s = (c ? ln(r.width) : r.width) / o, l = (c ? ln(r.height) : r.height) / a;
  return s && Number.isFinite(s) || (s = 1), l && Number.isFinite(l) || (l = 1), { x: s, y: l };
}
function Ne(e, n, r, o) {
  var a, c;
  n === void 0 && (n = !1), r === void 0 && (r = !1);
  const s = e.getBoundingClientRect(), l = jo(e);
  let h = ko;
  n && (o ? pe(o) && (h = tt(o)) : h = tt(e));
  const f = l ? se(l) : window, g = xr() && r;
  let p = (s.left + (g && ((a = f.visualViewport) == null ? void 0 : a.offsetLeft) || 0)) / h.x, m = (s.top + (g && ((c = f.visualViewport) == null ? void 0 : c.offsetTop) || 0)) / h.y, y = s.width / h.x, w = s.height / h.y;
  if (l) {
    const _ = se(l), j = o && pe(o) ? se(o) : o;
    let R = _.frameElement;
    for (; R && o && j !== _; ) {
      const x = tt(R), E = R.getBoundingClientRect(), T = getComputedStyle(R);
      E.x += (R.clientLeft + parseFloat(T.paddingLeft)) * x.x, E.y += (R.clientTop + parseFloat(T.paddingTop)) * x.y, p *= x.x, m *= x.y, y *= x.x, w *= x.y, p += E.x, m += E.y, R = se(R).frameElement;
    }
  }
  return un({ width: y, height: w, x: p, y: m });
}
function Le(e) {
  return ((Eo(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function xn(e) {
  return pe(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
}
function Lo(e) {
  return Ne(Le(e)).left + xn(e).scrollLeft;
}
function jt(e) {
  if (Me(e) === "html")
    return e;
  const n = e.assignedSlot || e.parentNode || Ur(e) && e.host || Le(e);
  return Ur(n) ? n.host : n;
}
function So(e) {
  const n = jt(e);
  return Pr(n) ? n.ownerDocument.body : ve(n) && wn(n) ? n : So(n);
}
function Se(e, n) {
  var r;
  n === void 0 && (n = []);
  const o = So(e), a = o === ((r = e.ownerDocument) == null ? void 0 : r.body), c = se(o);
  return a ? n.concat(c, c.visualViewport || [], wn(o) ? o : []) : n.concat(o, Se(o));
}
function Yr(e, n, r) {
  let o;
  if (n === "viewport")
    o = function(s, l) {
      const h = se(s), f = Le(s), g = h.visualViewport;
      let p = f.clientWidth, m = f.clientHeight, y = 0, w = 0;
      if (g) {
        p = g.width, m = g.height;
        const _ = xr();
        (!_ || _ && l === "fixed") && (y = g.offsetLeft, w = g.offsetTop);
      }
      return { width: p, height: m, x: y, y: w };
    }(e, r);
  else if (n === "document")
    o = function(s) {
      const l = Le(s), h = xn(s), f = s.ownerDocument.body, g = Rt(l.scrollWidth, l.clientWidth, f.scrollWidth, f.clientWidth), p = Rt(l.scrollHeight, l.clientHeight, f.scrollHeight, f.clientHeight);
      let m = -h.scrollLeft + Lo(s);
      const y = -h.scrollTop;
      return we(f).direction === "rtl" && (m += Rt(l.clientWidth, f.clientWidth) - g), { width: g, height: p, x: m, y };
    }(Le(e));
  else if (pe(n))
    o = function(s, l) {
      const h = Ne(s, !0, l === "fixed"), f = h.top + s.clientTop, g = h.left + s.clientLeft, p = ve(s) ? tt(s) : { x: 1, y: 1 };
      return { width: s.clientWidth * p.x, height: s.clientHeight * p.y, x: g * p.x, y: f * p.y };
    }(n, r);
  else {
    const s = { ...n };
    if (xr()) {
      var a, c;
      const l = se(e);
      s.x -= ((a = l.visualViewport) == null ? void 0 : a.offsetLeft) || 0, s.y -= ((c = l.visualViewport) == null ? void 0 : c.offsetTop) || 0;
    }
    o = s;
  }
  return un(o);
}
function Xr(e, n) {
  return ve(e) && we(e).position !== "fixed" ? n ? n(e) : e.offsetParent : null;
}
function qr(e, n) {
  const r = se(e);
  if (!ve(e))
    return r;
  let o = Xr(e, n);
  for (; o && ic(o) && we(o).position === "static"; )
    o = Xr(o, n);
  return o && (Me(o) === "html" || Me(o) === "body" && we(o).position === "static" && !wr(o)) ? r : o || function(a) {
    let c = jt(a);
    for (; ve(c) && !Pr(c); ) {
      if (wr(c))
        return c;
      c = jt(c);
    }
    return null;
  }(e) || r;
}
function ac(e, n, r) {
  const o = ve(n), a = Le(n), c = Ne(e, !0, r === "fixed", n);
  let s = { scrollLeft: 0, scrollTop: 0 };
  const l = { x: 0, y: 0 };
  if (o || !o && r !== "fixed")
    if ((Me(n) !== "body" || wn(a)) && (s = xn(n)), ve(n)) {
      const h = Ne(n, !0);
      l.x = h.x + n.clientLeft, l.y = h.y + n.clientTop;
    } else
      a && (l.x = Lo(a));
  return { x: c.left + s.scrollLeft - l.x, y: c.top + s.scrollTop - l.y, width: c.width, height: c.height };
}
const cc = { getClippingRect: function(e) {
  let { element: n, boundary: r, rootBoundary: o, strategy: a } = e;
  const c = r === "clippingAncestors" ? function(f, g) {
    const p = g.get(f);
    if (p)
      return p;
    let m = Se(f).filter((j) => pe(j) && Me(j) !== "body"), y = null;
    const w = we(f).position === "fixed";
    let _ = w ? jt(f) : f;
    for (; pe(_) && !Pr(_); ) {
      const j = we(_), R = wr(_);
      j.position === "fixed" && (y = null), (w ? R || y : R || j.position !== "static" || !y || !["absolute", "fixed"].includes(y.position)) ? y = j : m = m.filter((x) => x !== _), _ = jt(_);
    }
    return g.set(f, m), m;
  }(n, this._c) : [].concat(r), s = [...c, o], l = s[0], h = s.reduce((f, g) => {
    const p = Yr(n, g, a);
    return f.top = Rt(p.top, f.top), f.right = Kr(p.right, f.right), f.bottom = Kr(p.bottom, f.bottom), f.left = Rt(p.left, f.left), f;
  }, Yr(n, l, a));
  return { width: h.right - h.left, height: h.bottom - h.top, x: h.left, y: h.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(e) {
  let { rect: n, offsetParent: r, strategy: o } = e;
  const a = ve(r), c = Le(r);
  if (r === c)
    return n;
  let s = { scrollLeft: 0, scrollTop: 0 }, l = { x: 1, y: 1 };
  const h = { x: 0, y: 0 };
  if ((a || !a && o !== "fixed") && ((Me(r) !== "body" || wn(c)) && (s = xn(r)), ve(r))) {
    const f = Ne(r);
    l = tt(r), h.x = f.x + r.clientLeft, h.y = f.y + r.clientTop;
  }
  return { width: n.width * l.x, height: n.height * l.y, x: n.x * l.x - s.scrollLeft * l.x + h.x, y: n.y * l.y - s.scrollTop * l.y + h.y };
}, isElement: pe, getDimensions: function(e) {
  return Oo(e);
}, getOffsetParent: qr, getDocumentElement: Le, getScale: tt, async getElementRects(e) {
  let { reference: n, floating: r, strategy: o } = e;
  const a = this.getOffsetParent || qr, c = this.getDimensions;
  return { reference: ac(n, await a(r), o), floating: { x: 0, y: 0, ...await c(r) } };
}, getClientRects: (e) => Array.from(e.getClientRects()), isRTL: (e) => we(e).direction === "rtl" };
function Mo(e, n, r, o) {
  o === void 0 && (o = {});
  const { ancestorScroll: a = !0, ancestorResize: c = !0, elementResize: s = !0, animationFrame: l = !1 } = o, h = a && !l, f = h || c ? [...pe(e) ? Se(e) : e.contextElement ? Se(e.contextElement) : [], ...Se(n)] : [];
  f.forEach((y) => {
    h && y.addEventListener("scroll", r, { passive: !0 }), c && y.addEventListener("resize", r);
  });
  let g, p = null;
  s && (p = new ResizeObserver(() => {
    r();
  }), pe(e) && !l && p.observe(e), pe(e) || !e.contextElement || l || p.observe(e.contextElement), p.observe(n));
  let m = l ? Ne(e) : null;
  return l && function y() {
    const w = Ne(e);
    !m || w.x === m.x && w.y === m.y && w.width === m.width && w.height === m.height || r(), m = w, g = requestAnimationFrame(y);
  }(), r(), () => {
    var y;
    f.forEach((w) => {
      h && w.removeEventListener("scroll", r), c && w.removeEventListener("resize", r);
    }), (y = p) == null || y.disconnect(), p = null, l && cancelAnimationFrame(g);
  };
}
const uc = (e, n, r) => {
  const o = /* @__PURE__ */ new Map(), a = { platform: cc, ...r }, c = { ...a.platform, _c: o };
  return qa(e, n, { ...a, platform: c });
};
var tn = typeof document < "u" ? co : Er;
function fn(e, n) {
  if (e === n)
    return !0;
  if (typeof e != typeof n)
    return !1;
  if (typeof e == "function" && e.toString() === n.toString())
    return !0;
  let r, o, a;
  if (e && n && typeof e == "object") {
    if (Array.isArray(e)) {
      if (r = e.length, r != n.length)
        return !1;
      for (o = r; o-- !== 0; )
        if (!fn(e[o], n[o]))
          return !1;
      return !0;
    }
    if (a = Object.keys(e), r = a.length, r !== Object.keys(n).length)
      return !1;
    for (o = r; o-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(n, a[o]))
        return !1;
    for (o = r; o-- !== 0; ) {
      const c = a[o];
      if (!(c === "_owner" && e.$$typeof) && !fn(e[c], n[c]))
        return !1;
    }
    return !0;
  }
  return e !== e && n !== n;
}
function Qr(e) {
  const n = b.useRef(e);
  return tn(() => {
    n.current = e;
  }), n;
}
function sc(e) {
  e === void 0 && (e = {});
  const {
    placement: n = "bottom",
    strategy: r = "absolute",
    middleware: o = [],
    platform: a,
    whileElementsMounted: c,
    open: s
  } = e, [l, h] = b.useState({
    x: null,
    y: null,
    strategy: r,
    placement: n,
    middlewareData: {},
    isPositioned: !1
  }), [f, g] = b.useState(o);
  fn(f, o) || g(o);
  const p = b.useRef(null), m = b.useRef(null), y = b.useRef(l), w = Qr(c), _ = Qr(a), [j, R] = b.useState(null), [x, E] = b.useState(null), T = b.useCallback((N) => {
    p.current !== N && (p.current = N, R(N));
  }, []), P = b.useCallback((N) => {
    m.current !== N && (m.current = N, E(N));
  }, []), H = b.useCallback(() => {
    if (!p.current || !m.current)
      return;
    const N = {
      placement: n,
      strategy: r,
      middleware: f
    };
    _.current && (N.platform = _.current), uc(p.current, m.current, N).then((L) => {
      const A = {
        ...L,
        isPositioned: !0
      };
      K.current && !fn(y.current, A) && (y.current = A, qo.flushSync(() => {
        h(A);
      }));
    });
  }, [f, n, r, _]);
  tn(() => {
    s === !1 && y.current.isPositioned && (y.current.isPositioned = !1, h((N) => ({
      ...N,
      isPositioned: !1
    })));
  }, [s]);
  const K = b.useRef(!1);
  tn(() => (K.current = !0, () => {
    K.current = !1;
  }), []), tn(() => {
    if (j && x) {
      if (w.current)
        return w.current(j, x, H);
      H();
    }
  }, [j, x, H, w]);
  const J = b.useMemo(() => ({
    reference: p,
    floating: m,
    setReference: T,
    setFloating: P
  }), [T, P]), Y = b.useMemo(() => ({
    reference: j,
    floating: x
  }), [j, x]);
  return b.useMemo(() => ({
    ...l,
    update: H,
    refs: J,
    elements: Y,
    reference: T,
    floating: P
  }), [l, H, J, Y, T, P]);
}
/*!
* tabbable 6.1.1
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var lc = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], _r = /* @__PURE__ */ lc.join(","), Ao = typeof Element > "u", kt = Ao ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, dn = !Ao && Element.prototype.getRootNode ? function(e) {
  var n;
  return e == null || (n = e.getRootNode) === null || n === void 0 ? void 0 : n.call(e);
} : function(e) {
  return e == null ? void 0 : e.ownerDocument;
}, hn = function e(n, r) {
  var o;
  r === void 0 && (r = !0);
  var a = n == null || (o = n.getAttribute) === null || o === void 0 ? void 0 : o.call(n, "inert"), c = a === "" || a === "true", s = c || r && n && e(n.parentNode);
  return s;
}, fc = function(n) {
  var r, o = n == null || (r = n.getAttribute) === null || r === void 0 ? void 0 : r.call(n, "contenteditable");
  return o === "" || o === "true";
}, dc = function(n, r, o) {
  if (hn(n))
    return [];
  var a = Array.prototype.slice.apply(n.querySelectorAll(_r));
  return r && kt.call(n, _r) && a.unshift(n), a = a.filter(o), a;
}, hc = function e(n, r, o) {
  for (var a = [], c = Array.from(n); c.length; ) {
    var s = c.shift();
    if (!hn(s, !1))
      if (s.tagName === "SLOT") {
        var l = s.assignedElements(), h = l.length ? l : s.children, f = e(h, !0, o);
        o.flatten ? a.push.apply(a, f) : a.push({
          scopeParent: s,
          candidates: f
        });
      } else {
        var g = kt.call(s, _r);
        g && o.filter(s) && (r || !n.includes(s)) && a.push(s);
        var p = s.shadowRoot || // check for an undisclosed shadow
        typeof o.getShadowRoot == "function" && o.getShadowRoot(s), m = !hn(p, !1) && (!o.shadowRootFilter || o.shadowRootFilter(s));
        if (p && m) {
          var y = e(p === !0 ? s.children : p.children, !0, o);
          o.flatten ? a.push.apply(a, y) : a.push({
            scopeParent: s,
            candidates: y
          });
        } else
          c.unshift.apply(c, s.children);
      }
  }
  return a;
}, To = function(n, r) {
  return n.tabIndex < 0 && (r || /^(AUDIO|VIDEO|DETAILS)$/.test(n.tagName) || fc(n)) && isNaN(parseInt(n.getAttribute("tabindex"), 10)) ? 0 : n.tabIndex;
}, pc = function(n, r) {
  return n.tabIndex === r.tabIndex ? n.documentOrder - r.documentOrder : n.tabIndex - r.tabIndex;
}, Po = function(n) {
  return n.tagName === "INPUT";
}, vc = function(n) {
  return Po(n) && n.type === "hidden";
}, gc = function(n) {
  var r = n.tagName === "DETAILS" && Array.prototype.slice.apply(n.children).some(function(o) {
    return o.tagName === "SUMMARY";
  });
  return r;
}, mc = function(n, r) {
  for (var o = 0; o < n.length; o++)
    if (n[o].checked && n[o].form === r)
      return n[o];
}, yc = function(n) {
  if (!n.name)
    return !0;
  var r = n.form || dn(n), o = function(l) {
    return r.querySelectorAll('input[type="radio"][name="' + l + '"]');
  }, a;
  if (typeof window < "u" && typeof window.CSS < "u" && typeof window.CSS.escape == "function")
    a = o(window.CSS.escape(n.name));
  else
    try {
      a = o(n.name);
    } catch (s) {
      return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", s.message), !1;
    }
  var c = mc(a, n.form);
  return !c || c === n;
}, bc = function(n) {
  return Po(n) && n.type === "radio";
}, wc = function(n) {
  return bc(n) && !yc(n);
}, xc = function(n) {
  var r, o = n && dn(n), a = (r = o) === null || r === void 0 ? void 0 : r.host, c = !1;
  if (o && o !== n) {
    var s, l, h;
    for (c = !!((s = a) !== null && s !== void 0 && (l = s.ownerDocument) !== null && l !== void 0 && l.contains(a) || n != null && (h = n.ownerDocument) !== null && h !== void 0 && h.contains(n)); !c && a; ) {
      var f, g, p;
      o = dn(a), a = (f = o) === null || f === void 0 ? void 0 : f.host, c = !!((g = a) !== null && g !== void 0 && (p = g.ownerDocument) !== null && p !== void 0 && p.contains(a));
    }
  }
  return c;
}, Jr = function(n) {
  var r = n.getBoundingClientRect(), o = r.width, a = r.height;
  return o === 0 && a === 0;
}, _c = function(n, r) {
  var o = r.displayCheck, a = r.getShadowRoot;
  if (getComputedStyle(n).visibility === "hidden")
    return !0;
  var c = kt.call(n, "details>summary:first-of-type"), s = c ? n.parentElement : n;
  if (kt.call(s, "details:not([open]) *"))
    return !0;
  if (!o || o === "full" || o === "legacy-full") {
    if (typeof a == "function") {
      for (var l = n; n; ) {
        var h = n.parentElement, f = dn(n);
        if (h && !h.shadowRoot && a(h) === !0)
          return Jr(n);
        n.assignedSlot ? n = n.assignedSlot : !h && f !== n.ownerDocument ? n = f.host : n = h;
      }
      n = l;
    }
    if (xc(n))
      return !n.getClientRects().length;
    if (o !== "legacy-full")
      return !0;
  } else if (o === "non-zero-area")
    return Jr(n);
  return !1;
}, Cc = function(n) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(n.tagName))
    for (var r = n.parentElement; r; ) {
      if (r.tagName === "FIELDSET" && r.disabled) {
        for (var o = 0; o < r.children.length; o++) {
          var a = r.children.item(o);
          if (a.tagName === "LEGEND")
            return kt.call(r, "fieldset[disabled] *") ? !0 : !a.contains(n);
        }
        return !0;
      }
      r = r.parentElement;
    }
  return !1;
}, Ec = function(n, r) {
  return !(r.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  hn(r) || vc(r) || _c(r, n) || // For a details element with a summary, the summary element gets the focus
  gc(r) || Cc(r));
}, Gr = function(n, r) {
  return !(wc(r) || To(r) < 0 || !Ec(n, r));
}, Rc = function(n) {
  var r = parseInt(n.getAttribute("tabindex"), 10);
  return !!(isNaN(r) || r >= 0);
}, Oc = function e(n) {
  var r = [], o = [];
  return n.forEach(function(a, c) {
    var s = !!a.scopeParent, l = s ? a.scopeParent : a, h = To(l, s), f = s ? e(a.candidates) : l;
    h === 0 ? s ? r.push.apply(r, f) : r.push(l) : o.push({
      documentOrder: c,
      tabIndex: h,
      item: a,
      isScope: s,
      content: f
    });
  }), o.sort(pc).reduce(function(a, c) {
    return c.isScope ? a.push.apply(a, c.content) : a.push(c.content), a;
  }, []).concat(r);
}, Fo = function(n, r) {
  r = r || {};
  var o;
  return r.getShadowRoot ? o = hc([n], r.includeContainer, {
    filter: Gr.bind(null, r),
    flatten: !1,
    getShadowRoot: r.getShadowRoot,
    shadowRootFilter: Rc
  }) : o = dc(n, r.includeContainer, Gr.bind(null, r)), Oc(o);
};
function Cr() {
  return Cr = Object.assign || function(e) {
    for (var n = 1; n < arguments.length; n++) {
      var r = arguments[n];
      for (var o in r)
        Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
    }
    return e;
  }, Cr.apply(this, arguments);
}
var $e = typeof document < "u" ? co : Er;
let hr = !1, jc = 0;
const eo = () => "floating-ui-" + jc++;
function kc() {
  const [e, n] = b.useState(() => hr ? eo() : void 0);
  return $e(() => {
    e == null && n(eo());
  }, []), b.useEffect(() => {
    hr || (hr = !0);
  }, []), e;
}
const Lc = b.useId, Io = Lc || kc;
function Sc() {
  const e = /* @__PURE__ */ new Map();
  return {
    emit(n, r) {
      var o;
      (o = e.get(n)) == null || o.forEach((a) => a(r));
    },
    on(n, r) {
      e.set(n, [...e.get(n) || [], r]);
    },
    off(n, r) {
      var o;
      e.set(n, ((o = e.get(n)) == null ? void 0 : o.filter((a) => a !== r)) || []);
    }
  };
}
const Mc = /* @__PURE__ */ b.createContext(null), Ac = /* @__PURE__ */ b.createContext(null), Do = () => {
  var e;
  return ((e = b.useContext(Mc)) == null ? void 0 : e.id) || null;
}, Fr = () => b.useContext(Ac);
function Ve(e) {
  return (e == null ? void 0 : e.ownerDocument) || document;
}
function Tc() {
  const e = navigator.userAgentData;
  return e != null && e.platform ? e.platform : navigator.platform;
}
function Pc() {
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? e.brands.map((n) => {
    let {
      brand: r,
      version: o
    } = n;
    return r + "/" + o;
  }).join(" ") : navigator.userAgent;
}
function _n(e) {
  return Ve(e).defaultView || window;
}
function Oe(e) {
  return e ? e instanceof _n(e).Element : !1;
}
function Ir(e) {
  return e ? e instanceof _n(e).HTMLElement : !1;
}
function Fc(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  const n = _n(e).ShadowRoot;
  return e instanceof n || e instanceof ShadowRoot;
}
function Ic(e) {
  if (e.mozInputSource === 0 && e.isTrusted)
    return !0;
  const n = /Android/i;
  return (n.test(Tc()) || n.test(Pc())) && e.pointerType ? e.type === "click" && e.buttons === 1 : e.detail === 0 && !e.pointerType;
}
function Dc(e) {
  return e.width === 0 && e.height === 0 || e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType !== "mouse" || // iOS VoiceOver returns 0.333• for width/height.
  e.width < 1 && e.height < 1 && e.pressure === 0 && e.detail === 0;
}
function Bc() {
  return /apple/i.test(navigator.vendor);
}
function pn(e, n) {
  const r = ["mouse", "pen"];
  return n || r.push("", void 0), r.includes(e);
}
function Bo(e, n) {
  if (!e || !n)
    return !1;
  const r = n.getRootNode && n.getRootNode();
  if (e.contains(n))
    return !0;
  if (r && Fc(r)) {
    let o = n;
    for (; o; ) {
      if (e === o)
        return !0;
      o = o.parentNode || o.host;
    }
  }
  return !1;
}
function to(e) {
  const n = uo(e);
  return $e(() => {
    n.current = e;
  }), n;
}
const no = "data-floating-ui-safe-polygon";
function pr(e, n, r) {
  return r && !pn(r) ? 0 : typeof e == "number" ? e : e == null ? void 0 : e[n];
}
const Vc = function(e, n) {
  n === void 0 && (n = {});
  const {
    open: r,
    onOpenChange: o,
    dataRef: a,
    events: c,
    elements: {
      domReference: s,
      floating: l
    },
    refs: h
  } = e, {
    enabled: f = !0,
    delay: g = 0,
    handleClose: p = null,
    mouseOnly: m = !1,
    restMs: y = 0,
    move: w = !0
  } = n, _ = Fr(), j = Do(), R = to(p), x = to(g), E = b.useRef(), T = b.useRef(), P = b.useRef(), H = b.useRef(), K = b.useRef(!0), J = b.useRef(!1), Y = b.useRef(() => {
  }), N = b.useCallback(() => {
    var O;
    const M = (O = a.current.openEvent) == null ? void 0 : O.type;
    return (M == null ? void 0 : M.includes("mouse")) && M !== "mousedown";
  }, [a]);
  b.useEffect(() => {
    if (!f)
      return;
    function O() {
      clearTimeout(T.current), clearTimeout(H.current), K.current = !0;
    }
    return c.on("dismiss", O), () => {
      c.off("dismiss", O);
    };
  }, [f, c]), b.useEffect(() => {
    if (!f || !R.current || !r)
      return;
    function O() {
      N() && o(!1);
    }
    const M = Ve(l).documentElement;
    return M.addEventListener("mouseleave", O), () => {
      M.removeEventListener("mouseleave", O);
    };
  }, [l, r, o, f, R, a, N]);
  const L = b.useCallback(function(O) {
    O === void 0 && (O = !0);
    const M = pr(x.current, "close", E.current);
    M && !P.current ? (clearTimeout(T.current), T.current = setTimeout(() => o(!1), M)) : O && (clearTimeout(T.current), o(!1));
  }, [x, o]), A = b.useCallback(() => {
    Y.current(), P.current = void 0;
  }, []), k = b.useCallback(() => {
    if (J.current) {
      const O = Ve(h.floating.current).body;
      O.style.pointerEvents = "", O.removeAttribute(no), J.current = !1;
    }
  }, [h]);
  return b.useEffect(() => {
    if (!f)
      return;
    function O() {
      return a.current.openEvent ? ["click", "mousedown"].includes(a.current.openEvent.type) : !1;
    }
    function M(I) {
      if (clearTimeout(T.current), K.current = !1, m && !pn(E.current) || y > 0 && pr(x.current, "open") === 0)
        return;
      a.current.openEvent = I;
      const oe = pr(x.current, "open", E.current);
      oe ? T.current = setTimeout(() => {
        o(!0);
      }, oe) : o(!0);
    }
    function W(I) {
      if (O())
        return;
      Y.current();
      const oe = Ve(l);
      if (clearTimeout(H.current), R.current) {
        r || clearTimeout(T.current), P.current = R.current({
          ...e,
          tree: _,
          x: I.clientX,
          y: I.clientY,
          onClose() {
            k(), A(), L();
          }
        });
        const xe = P.current;
        oe.addEventListener("mousemove", xe), Y.current = () => {
          oe.removeEventListener("mousemove", xe);
        };
        return;
      }
      (E.current === "touch" ? !Bo(l, I.relatedTarget) : !0) && L();
    }
    function Z(I) {
      O() || R.current == null || R.current({
        ...e,
        tree: _,
        x: I.clientX,
        y: I.clientY,
        onClose() {
          k(), A(), L();
        }
      })(I);
    }
    if (Oe(s)) {
      const I = s;
      return r && I.addEventListener("mouseleave", Z), l == null || l.addEventListener("mouseleave", Z), w && I.addEventListener("mousemove", M, {
        once: !0
      }), I.addEventListener("mouseenter", M), I.addEventListener("mouseleave", W), () => {
        r && I.removeEventListener("mouseleave", Z), l == null || l.removeEventListener("mouseleave", Z), w && I.removeEventListener("mousemove", M), I.removeEventListener("mouseenter", M), I.removeEventListener("mouseleave", W);
      };
    }
  }, [s, l, f, e, m, y, w, L, A, k, o, r, _, x, R, a]), $e(() => {
    var O;
    if (f && r && (O = R.current) != null && O.__options.blockPointerEvents && N()) {
      const Z = Ve(l).body;
      if (Z.setAttribute(no, ""), Z.style.pointerEvents = "none", J.current = !0, Oe(s) && l) {
        var M, W;
        const I = s, oe = _ == null || (M = _.nodesRef.current.find((B) => B.id === j)) == null || (W = M.context) == null ? void 0 : W.elements.floating;
        return oe && (oe.style.pointerEvents = ""), I.style.pointerEvents = "auto", l.style.pointerEvents = "auto", () => {
          I.style.pointerEvents = "", l.style.pointerEvents = "";
        };
      }
    }
  }, [f, r, j, l, s, _, R, a, N]), $e(() => {
    r || (E.current = void 0, A(), k());
  }, [r, A, k]), b.useEffect(() => () => {
    A(), clearTimeout(T.current), clearTimeout(H.current), k();
  }, [f, A, k]), b.useMemo(() => {
    if (!f)
      return {};
    function O(M) {
      E.current = M.pointerType;
    }
    return {
      reference: {
        onPointerDown: O,
        onPointerEnter: O,
        onMouseMove() {
          r || y === 0 || (clearTimeout(H.current), H.current = setTimeout(() => {
            K.current || o(!0);
          }, y));
        }
      },
      floating: {
        onMouseEnter() {
          clearTimeout(T.current);
        },
        onMouseLeave() {
          c.emit("dismiss", {
            type: "mouseLeave",
            data: {
              returnFocus: !1
            }
          }), L(!1);
        }
      }
    };
  }, [c, f, y, r, o, L]);
};
function Hc(e) {
  let n = e.activeElement;
  for (; ((r = n) == null || (o = r.shadowRoot) == null ? void 0 : o.activeElement) != null; ) {
    var r, o;
    n = n.shadowRoot.activeElement;
  }
  return n;
}
function vr(e, n) {
  let r = e.filter((a) => {
    var c;
    return a.parentId === n && ((c = a.context) == null ? void 0 : c.open);
  }), o = r;
  for (; o.length; )
    o = e.filter((a) => {
      var c;
      return (c = o) == null ? void 0 : c.some((s) => {
        var l;
        return a.parentId === s.id && ((l = a.context) == null ? void 0 : l.open);
      });
    }), r = r.concat(o);
  return r;
}
function Nc(e) {
  return "composedPath" in e ? e.composedPath()[0] : e.target;
}
const $c = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
function Wc(e) {
  return Ir(e) && e.matches($c);
}
const Vo = () => ({
  getShadowRoot: !0,
  displayCheck: (
    // JSDOM does not support the `tabbable` library. To solve this we can
    // check if `ResizeObserver` is a real function (not polyfilled), which
    // determines if the current environment is JSDOM-like.
    typeof ResizeObserver == "function" && ResizeObserver.toString().includes("[native code]") ? "full" : "none"
  )
});
function Ho(e, n) {
  const r = Fo(e, Vo());
  n === "prev" && r.reverse();
  const o = r.indexOf(Hc(Ve(e)));
  return r.slice(o + 1)[0];
}
function zc() {
  return Ho(document.body, "next");
}
function Zc() {
  return Ho(document.body, "prev");
}
function gr(e, n) {
  const r = n || e.currentTarget, o = e.relatedTarget;
  return !o || !Bo(r, o);
}
function Uc(e) {
  Fo(e, Vo()).forEach((r) => {
    r.dataset.tabindex = r.getAttribute("tabindex") || "", r.setAttribute("tabindex", "-1");
  });
}
function Kc(e) {
  e.querySelectorAll("[data-tabindex]").forEach((r) => {
    const o = r.dataset.tabindex;
    delete r.dataset.tabindex, o ? r.setAttribute("tabindex", o) : r.removeAttribute("tabindex");
  });
}
const No = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "fixed",
  whiteSpace: "nowrap",
  width: "1px",
  top: 0,
  left: 0
};
let Yc;
function ro(e) {
  e.key === "Tab" && (e.target, clearTimeout(Yc));
}
const oo = /* @__PURE__ */ b.forwardRef(function(n, r) {
  const [o, a] = b.useState();
  return $e(() => (Bc() && a("button"), document.addEventListener("keydown", ro), () => {
    document.removeEventListener("keydown", ro);
  }), []), /* @__PURE__ */ b.createElement("span", Cr({}, n, {
    ref: r,
    tabIndex: 0,
    role: o,
    "aria-hidden": o ? void 0 : !0,
    "data-floating-ui-focus-guard": "",
    style: No
  }));
}), $o = /* @__PURE__ */ b.createContext(null), Xc = function(e) {
  let {
    id: n,
    root: r
  } = e === void 0 ? {} : e;
  const [o, a] = b.useState(null), c = Io(), s = qc();
  return $e(() => {
    const l = n ? document.getElementById(n) : null, h = "data-floating-ui-portal";
    if (l) {
      const f = document.createElement("div");
      return f.id = c, f.setAttribute(h, ""), l.appendChild(f), a(f), () => {
        f.remove();
      };
    } else {
      let f = (s == null ? void 0 : s.portalNode) || r || document.body, g = null;
      n && (g = document.createElement("div"), g.id = n, f.appendChild(g));
      const p = document.createElement("div");
      return p.id = c, p.setAttribute(h, ""), a(p), f = g || f, f.appendChild(p), () => {
        var m;
        p.remove(), (m = g) == null || m.remove();
      };
    }
  }, [n, r, s, c]), o;
}, Wo = (e) => {
  let {
    children: n,
    id: r,
    root: o = null,
    preserveTabOrder: a = !0
  } = e;
  const c = Xc({
    id: r,
    root: o
  }), [s, l] = b.useState(null), h = b.useRef(null), f = b.useRef(null), g = b.useRef(null), p = b.useRef(null), m = (
    // The FocusManager and therefore floating element are currently open/
    // rendered.
    !!s && // Guards are only for non-modal focus management.
    !s.modal && !!(o || c) && a
  );
  return b.useEffect(() => {
    if (!c || !a || s != null && s.modal)
      return;
    function y(w) {
      c && gr(w) && (w.type === "focusin" ? Kc : Uc)(c);
    }
    return c.addEventListener("focusin", y, !0), c.addEventListener("focusout", y, !0), () => {
      c.removeEventListener("focusin", y, !0), c.removeEventListener("focusout", y, !0);
    };
  }, [c, a, s == null ? void 0 : s.modal]), /* @__PURE__ */ b.createElement($o.Provider, {
    value: b.useMemo(() => ({
      preserveTabOrder: a,
      beforeOutsideRef: h,
      afterOutsideRef: f,
      beforeInsideRef: g,
      afterInsideRef: p,
      portalNode: c,
      setFocusManagerState: l
    }), [a, c])
  }, m && c && /* @__PURE__ */ b.createElement(oo, {
    "data-type": "outside",
    ref: h,
    onFocus: (y) => {
      if (gr(y, c)) {
        var w;
        (w = g.current) == null || w.focus();
      } else {
        const _ = Zc() || (s == null ? void 0 : s.refs.domReference.current);
        _ == null || _.focus();
      }
    }
  }), m && c && /* @__PURE__ */ b.createElement("span", {
    "aria-owns": c.id,
    style: No
  }), c && /* @__PURE__ */ Qo(n, c), m && c && /* @__PURE__ */ b.createElement(oo, {
    "data-type": "outside",
    ref: f,
    onFocus: (y) => {
      if (gr(y, c)) {
        var w;
        (w = p.current) == null || w.focus();
      } else {
        const _ = zc() || (s == null ? void 0 : s.refs.domReference.current);
        _ == null || _.focus(), s != null && s.closeOnFocusOut && (s == null || s.onOpenChange(!1));
      }
    }
  }));
}, qc = () => b.useContext($o);
function io(e) {
  return Ir(e.target) && e.target.tagName === "BUTTON";
}
function ao(e) {
  return Wc(e);
}
const Qc = function(e, n) {
  n === void 0 && (n = {});
  const {
    open: r,
    onOpenChange: o,
    dataRef: a,
    elements: {
      domReference: c
    }
  } = e, {
    enabled: s = !0,
    event: l = "click",
    toggle: h = !0,
    ignoreMouse: f = !1,
    keyboardHandlers: g = !0
  } = n, p = b.useRef();
  return b.useMemo(() => s ? {
    reference: {
      onPointerDown(m) {
        p.current = m.pointerType;
      },
      onMouseDown(m) {
        m.button === 0 && (pn(p.current, !0) && f || l !== "click" && (r ? h && (!a.current.openEvent || a.current.openEvent.type === "mousedown") && o(!1) : (m.preventDefault(), o(!0)), a.current.openEvent = m.nativeEvent));
      },
      onClick(m) {
        if (l === "mousedown" && p.current) {
          p.current = void 0;
          return;
        }
        pn(p.current, !0) && f || (r ? h && (!a.current.openEvent || a.current.openEvent.type === "click") && o(!1) : o(!0), a.current.openEvent = m.nativeEvent);
      },
      onKeyDown(m) {
        p.current = void 0, g && (io(m) || (m.key === " " && !ao(c) && m.preventDefault(), m.key === "Enter" && (r ? h && o(!1) : o(!0))));
      },
      onKeyUp(m) {
        g && (io(m) || ao(c) || m.key === " " && (r ? h && o(!1) : o(!0)));
      }
    }
  } : {}, [s, a, l, f, g, c, h, r, o]);
}, Jc = b.useInsertionEffect, Gc = Jc || ((e) => e());
function nn(e) {
  const n = b.useRef(() => {
    if (process.env.NODE_ENV !== "production")
      throw new Error("Cannot call an event handler while rendering.");
  });
  return Gc(() => {
    n.current = e;
  }), b.useCallback(function() {
    for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
      o[a] = arguments[a];
    return n.current == null ? void 0 : n.current(...o);
  }, []);
}
function mr(e, n) {
  if (n == null)
    return !1;
  if ("composedPath" in e)
    return e.composedPath().includes(n);
  const r = e;
  return r.target != null && n.contains(r.target);
}
const eu = {
  pointerdown: "onPointerDown",
  mousedown: "onMouseDown",
  click: "onClick"
}, tu = {
  pointerdown: "onPointerDownCapture",
  mousedown: "onMouseDownCapture",
  click: "onClickCapture"
}, nu = (e) => {
  var n, r;
  return {
    escapeKeyBubbles: typeof e == "boolean" ? e : (n = e == null ? void 0 : e.escapeKey) != null ? n : !1,
    outsidePressBubbles: typeof e == "boolean" ? e : (r = e == null ? void 0 : e.outsidePress) != null ? r : !0
  };
}, zo = function(e, n) {
  n === void 0 && (n = {});
  const {
    open: r,
    onOpenChange: o,
    events: a,
    nodeId: c,
    elements: {
      reference: s,
      domReference: l,
      floating: h
    },
    dataRef: f
  } = e, {
    enabled: g = !0,
    escapeKey: p = !0,
    outsidePress: m = !0,
    outsidePressEvent: y = "pointerdown",
    referencePress: w = !1,
    referencePressEvent: _ = "pointerdown",
    ancestorScroll: j = !1,
    bubbles: R
  } = n, x = Fr(), E = Do() != null, T = nn(typeof m == "function" ? m : () => !1), P = typeof m == "function" ? T : m, H = b.useRef(!1), {
    escapeKeyBubbles: K,
    outsidePressBubbles: J
  } = nu(R), Y = nn((L) => {
    if (!r || !g || !p || L.key !== "Escape")
      return;
    const A = x ? vr(x.nodesRef.current, c) : [];
    if (!K && (L.stopPropagation(), A.length > 0)) {
      let k = !0;
      if (A.forEach((O) => {
        var M;
        if ((M = O.context) != null && M.open && !O.context.dataRef.current.__escapeKeyBubbles) {
          k = !1;
          return;
        }
      }), !k)
        return;
    }
    a.emit("dismiss", {
      type: "escapeKey",
      data: {
        returnFocus: {
          preventScroll: !1
        }
      }
    }), o(!1);
  }), N = nn((L) => {
    const A = H.current;
    if (H.current = !1, A || typeof P == "function" && !P(L))
      return;
    const k = Nc(L);
    if (Ir(k) && h) {
      const W = k.clientWidth > 0 && k.scrollWidth > k.clientWidth, Z = k.clientHeight > 0 && k.scrollHeight > k.clientHeight;
      let I = Z && L.offsetX > k.clientWidth;
      if (Z && _n(h).getComputedStyle(k).direction === "rtl" && (I = L.offsetX <= k.offsetWidth - k.clientWidth), I || W && L.offsetY > k.clientHeight)
        return;
    }
    const O = x && vr(x.nodesRef.current, c).some((W) => {
      var Z;
      return mr(L, (Z = W.context) == null ? void 0 : Z.elements.floating);
    });
    if (mr(L, h) || mr(L, l) || O)
      return;
    const M = x ? vr(x.nodesRef.current, c) : [];
    if (M.length > 0) {
      let W = !0;
      if (M.forEach((Z) => {
        var I;
        if ((I = Z.context) != null && I.open && !Z.context.dataRef.current.__outsidePressBubbles) {
          W = !1;
          return;
        }
      }), !W)
        return;
    }
    a.emit("dismiss", {
      type: "outsidePress",
      data: {
        returnFocus: E ? {
          preventScroll: !0
        } : Ic(L) || Dc(L)
      }
    }), o(!1);
  });
  return b.useEffect(() => {
    if (!r || !g)
      return;
    f.current.__escapeKeyBubbles = K, f.current.__outsidePressBubbles = J;
    function L() {
      o(!1);
    }
    const A = Ve(h);
    p && A.addEventListener("keydown", Y), P && A.addEventListener(y, N);
    let k = [];
    return j && (Oe(l) && (k = Se(l)), Oe(h) && (k = k.concat(Se(h))), !Oe(s) && s && s.contextElement && (k = k.concat(Se(s.contextElement)))), k = k.filter((O) => {
      var M;
      return O !== ((M = A.defaultView) == null ? void 0 : M.visualViewport);
    }), k.forEach((O) => {
      O.addEventListener("scroll", L, {
        passive: !0
      });
    }), () => {
      p && A.removeEventListener("keydown", Y), P && A.removeEventListener(y, N), k.forEach((O) => {
        O.removeEventListener("scroll", L);
      });
    };
  }, [f, h, l, s, p, P, y, r, o, j, g, K, J, Y, N]), b.useEffect(() => {
    H.current = !1;
  }, [P, y]), b.useMemo(() => g ? {
    reference: {
      onKeyDown: Y,
      [eu[_]]: () => {
        w && (a.emit("dismiss", {
          type: "referencePress",
          data: {
            returnFocus: !1
          }
        }), o(!1));
      }
    },
    floating: {
      onKeyDown: Y,
      [tu[y]]: () => {
        H.current = !0;
      }
    }
  } : {}, [g, a, w, y, _, o, Y]);
};
function Zo(e) {
  e === void 0 && (e = {});
  const {
    open: n = !1,
    onOpenChange: r,
    nodeId: o
  } = e, a = sc(e), c = Fr(), s = b.useRef(null), l = b.useRef({}), h = b.useState(() => Sc())[0], f = Io(), [g, p] = b.useState(null), m = b.useCallback((x) => {
    const E = Oe(x) ? {
      getBoundingClientRect: () => x.getBoundingClientRect(),
      contextElement: x
    } : x;
    a.refs.setReference(E);
  }, [a.refs]), y = b.useCallback((x) => {
    (Oe(x) || x === null) && (s.current = x, p(x)), (Oe(a.refs.reference.current) || a.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    x !== null && !Oe(x)) && a.refs.setReference(x);
  }, [a.refs]), w = b.useMemo(() => ({
    ...a.refs,
    setReference: y,
    setPositionReference: m,
    domReference: s
  }), [a.refs, y, m]), _ = b.useMemo(() => ({
    ...a.elements,
    domReference: g
  }), [a.elements, g]), j = nn(r), R = b.useMemo(() => ({
    ...a,
    refs: w,
    elements: _,
    dataRef: l,
    nodeId: o,
    floatingId: f,
    events: h,
    open: n,
    onOpenChange: j
  }), [a, o, f, h, n, j, w, _]);
  return $e(() => {
    const x = c == null ? void 0 : c.nodesRef.current.find((E) => E.id === o);
    x && (x.context = R);
  }), b.useMemo(() => ({
    ...a,
    context: R,
    refs: w,
    elements: _,
    reference: y,
    positionReference: m
  }), [a, w, _, R, y, m]);
}
function yr(e, n, r) {
  const o = /* @__PURE__ */ new Map();
  return {
    ...r === "floating" && {
      tabIndex: -1
    },
    ...e,
    ...n.map((a) => a ? a[r] : null).concat(e).reduce((a, c) => (c && Object.entries(c).forEach((s) => {
      let [l, h] = s;
      if (l.indexOf("on") === 0) {
        if (o.has(l) || o.set(l, []), typeof h == "function") {
          var f;
          (f = o.get(l)) == null || f.push(h), a[l] = function() {
            for (var g, p = arguments.length, m = new Array(p), y = 0; y < p; y++)
              m[y] = arguments[y];
            return (g = o.get(l)) == null ? void 0 : g.map((w) => w(...m)).find((w) => w !== void 0);
          };
        }
      } else
        a[l] = h;
    }), a), {})
  };
}
const Uo = function(e) {
  e === void 0 && (e = []);
  const n = e, r = b.useCallback(
    (c) => yr(c, e, "reference"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    n
  ), o = b.useCallback(
    (c) => yr(c, e, "floating"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    n
  ), a = b.useCallback(
    (c) => yr(c, e, "item"),
    // Granularly check for `item` changes, because the `getItemProps` getter
    // should be as referentially stable as possible since it may be passed as
    // a prop to many components. All `item` key values must therefore be
    // memoized.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    e.map((c) => c == null ? void 0 : c.item)
  );
  return b.useMemo(() => ({
    getReferenceProps: r,
    getFloatingProps: o,
    getItemProps: a
  }), [r, o, a]);
}, ru = (e) => {
  const { content: n, children: r, placement: o = "bottom-start", trigger: a = "click", offset: c = 5 } = e, [s, l] = vn(!1), h = (T) => {
    var P;
    l(T), (P = e.onOpenChange) == null || P.call(e, T);
  }, f = e.open === void 0 ? s : e.open, { x: g, y: p, strategy: m, refs: y, context: w } = Zo({
    placement: o,
    open: f,
    onOpenChange: h,
    whileElementsMounted: Mo,
    middleware: [
      rc({
        fallbackAxisSideDirection: "end"
      }),
      oc(c)
    ]
  }), _ = Qc(w, {
    event: "mousedown",
    enabled: a === "click"
  }), j = zo(w), R = Vc(w, {
    enabled: a === "hover"
  }), { getReferenceProps: x, getFloatingProps: E } = Uo([
    _,
    R,
    j
  ]);
  return X(rn, { children: [F.cloneElement(r, {
    ...x(),
    ref: y.setReference
  }), v(Wo, { children: f && v("div", { ref: y.setFloating, className: "sk-popover-content", style: {
    position: m,
    left: g ?? 0,
    top: p ?? 0
  }, ...E(), children: n }) })] });
};
F.memo(() => v("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: v("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M11 12V17H12V12H17V11H12V6H11V11H6V12H11Z" }) }));
F.memo(() => X("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: [v("path", { d: "M5 19L21 19" }), v("line", { y1: "-1.5", x2: "12", y2: "-1.5", transform: "matrix(4.37114e-08 1 1 -4.37114e-08 12 5)", strokeWidth: "3" }), v("path", { d: "M15.5 9L15.5 17", strokeWidth: "3" })] }));
F.memo(() => X("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: [v("path", { d: "M12 4L12 20" }), v("line", { x1: "6", y1: "9.5", x2: "18", y2: "9.5", strokeWidth: "3" }), v("line", { x1: "8", y1: "14.5", x2: "16", y2: "14.5", strokeWidth: "3" })] }));
F.memo(() => X("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", stroke: "currentColor", children: [v("path", { d: "M4 4L4 20" }), v("line", { x1: "6", y1: "9.5", x2: "18", y2: "9.5", strokeWidth: "3" }), v("line", { x1: "6", y1: "14.5", x2: "14", y2: "14.5", strokeWidth: "3" })] }));
F.memo(() => X("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: [v("path", { d: "M20 4L20 20" }), v("line", { x1: "6", y1: "9.5", x2: "18", y2: "9.5", strokeWidth: "3" }), v("line", { x1: "10", y1: "14.5", x2: "18", y2: "14.5", strokeWidth: "3" })] }));
F.memo(() => X("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: [v("path", { d: "M3 5L19 5" }), v("line", { y1: "-1.5", x2: "12", y2: "-1.5", transform: "matrix(4.37114e-08 1 1 -4.37114e-08 10 7)", strokeWidth: "3" }), v("line", { x1: "13.5", y1: "7", x2: "13.5", y2: "15", strokeWidth: "3" })] }));
F.memo(() => X("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: [v("path", { d: "M4 12L20 12" }), v("line", { x1: "9.5", y1: "18", x2: "9.5", y2: "6", strokeWidth: "3" }), v("path", { d: "M14.5 16L14.5 8", strokeWidth: "3" })] }));
const ou = F.memo(() => v("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: v("path", { d: "M7 10L12 15L17 10" }) })), Ko = F.memo(() => v("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: v("path", { d: "M8 12L11 16L18 7" }) }));
F.memo(() => v("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: v("path", { d: "M7 7L17 17M7 17L17 7", stroke: "#333333" }) }));
F.memo(() => X("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [v("rect", { x: "3.08865", y: "7.49549", width: "1", height: "2.5", rx: "0.2", transform: "rotate(38.5717 3.08865 7.49549)", fill: "currentColor" }), v("rect", { width: "1", height: "2.5", rx: "0.2", transform: "matrix(-0.781828 0.623494 0.623494 0.781828 12.6592 7.49549)", fill: "currentColor" }), v("rect", { x: "6.08005", y: "9.07446", width: "1", height: "2.5", rx: "0.2", transform: "rotate(21.1013 6.08005 9.07446)", fill: "currentColor" }), v("rect", { width: "1", height: "2.5", rx: "0.2", transform: "matrix(-0.932945 0.360019 0.360019 0.932945 10 9.07446)", fill: "currentColor" }), v("path", { d: "M2 6.42055C2 6.42055 4 9.42055 8 9.42055C12 9.42055 14 6.42055 14 6.42055", stroke: "currentColor", strokeLinejoin: "round" })] }));
F.memo(() => X("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [v("line", { x1: "5", y1: "5.5", x2: "15", y2: "5.5", stroke: "#333333" }), v("line", { x1: "10", y1: "4", x2: "10", y2: "5", stroke: "#333333" }), v("line", { x1: "13.3947", y1: "5.30697", x2: "6.39468", y2: "14.307", stroke: "#333333" }), v("line", { x1: "7.35355", y1: "6.64645", x2: "12.3536", y2: "11.6464", stroke: "#333333" }), v("path", { d: "M11.5 18L15.5629 9.75718L19.5 18", stroke: "#333333", strokeLinejoin: "bevel" }), v("line", { x1: "13", y1: "14.2098", x2: "18", y2: "14.2098", stroke: "#333333" })] }));
F.memo(() => X("svg", { width: "24", height: "24", viewBox: "0 0 24 24", stroke: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: [v("line", { x1: "4", y1: "6.5", x2: "20", y2: "6.5" }), v("line", { x1: "4", y1: "16", x2: "20", y2: "16", strokeWidth: "4" }), v("line", { x1: "4", y1: "10.5", x2: "20", y2: "10.5", strokeWidth: "3" })] }));
F.memo(() => X("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [v("rect", { x: "4", y: "7", width: "7", height: "5.77935", rx: "0.4", fill: "currentColor" }), v("path", { d: "M5.5 7.5V5.5C5.5 4.39543 6.39543 3.5 7.5 3.5C8.60457 3.5 9.5 4.39543 9.5 5.5V7.5", stroke: "currentColor" })] }));
F.memo(() => X("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [v("path", { d: "M8.0393 16.8461C7.11636 15.6636 5.60665 4.7907 5.60665 4.7907C5.60665 4.7907 15.7876 8.89536 16.7105 10.0778C17.6335 11.2602 15.9869 14.839 15.9869 14.839L18.2586 17.7494L15.1054 20.2106L12.8337 17.3002C12.8337 17.3002 8.96225 18.0285 8.0393 16.8461Z", stroke: "currentColor" }), v("path", { d: "M5.60666 4.7907L11.7596 12.6736", stroke: "currentColor" }), v("circle", { cx: "11.8572", cy: "12.7987", r: "1.25", transform: "rotate(-37.9736 11.8572 12.7987)", fill: "currentColor" })] }));
F.memo(() => v("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: v("path", { d: "M17.6992 9.30076L8.7158 18.2842C8.66927 18.3307 8.61198 18.3651 8.54902 18.3842L5.3017 19.3687C4.99583 19.4615 4.71011 19.1757 4.80285 18.8699L5.78742 15.6226C5.80651 15.5596 5.84084 15.5023 5.88737 15.4558L14.8708 6.47233M17.6992 9.30076L19.8593 7.14071C20.0155 6.9845 20.0155 6.73123 19.8593 6.57502L17.5966 4.31228C17.4403 4.15607 17.1871 4.15607 17.0309 4.31228L14.8708 6.47233M17.6992 9.30076L14.8708 6.47233", stroke: "currentColor" }) }));
F.memo(() => v("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: v("circle", { cx: "8", cy: "8", r: "1.5", fill: "currentColor" }) }));
F.memo(() => v("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: v("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M17 12H6V11H17V12Z" }) }));
const iu = F.memo(() => v("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: v("path", { d: "M9.5 7.5L14.5 12.5L9.5 17.5" }) }));
F.memo(() => X("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [v("path", { d: "M8 5C4 5 2 8 2 8C2 8 4 11 8 11C12 11 14 8 14 8C14 8 12 5 8 5Z", stroke: "currentColor", strokeLinejoin: "round" }), v("circle", { cx: "8", cy: "8", r: "1.75", fill: "currentColor" })] }));
F.memo(() => v("svg", { width: "16", height: "16", viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg", children: v("path", { d: "M10.8183 5.3029L8.1715 9.71417C8.09382 9.84364 7.90618 9.84364 7.8285 9.71417L5.18174 5.3029C5.10176 5.16959 5.19778 5 5.35324 5H10.6468C10.8022 5 10.8982 5.16959 10.8183 5.3029Z", fill: "currentColor" }) }));
F.memo(() => v("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", children: v("path", { fillRule: "evenodd", transform: "translate(0.25 0.25)  rotate(0 7.75 7.556366182551985)", d: "M5.00688 12.0551C4.91688 12.0551 4.84688 12.1051 4.84688 12.1651C4.84688 12.2451 4.91688 12.2951 5.01688 12.2851C5.11688 12.2851 5.18688 12.2351 5.18688 12.1651C5.18688 12.0951 5.10688 12.0451 5.00688 12.0551Z M4.34812 12.1793C4.42812 12.2093 4.51812 12.1793 4.53812 12.1193C4.55812 12.0593 4.49812 11.9893 4.40812 11.9593C4.32812 11.9393 4.23812 11.9693 4.20812 12.0293C4.18812 12.0893 4.25812 12.1593 4.34812 12.1793Z M5.44907 12.1237C5.45907 12.1937 5.53907 12.2337 5.63907 12.2137C5.72907 12.1837 5.78907 12.1237 5.77907 12.0637C5.76907 12.0037 5.68907 11.9637 5.58907 11.9737C5.49907 11.9937 5.43907 12.0537 5.44907 12.1237Z M7.65 0C3.32 0 0 3.29 0 7.63C0 11.09 2.18 14.06 5.3 15.1C5.7 15.17 5.84 14.93 5.84 14.72C5.84 14.53 5.83 13.46 5.83 12.8C5.83 12.8 3.64 13.27 3.18 11.87C3.18 11.87 2.83 10.96 2.31 10.73C2.31 10.73 1.6 10.24 2.36 10.25C2.36 10.25 3.14 10.31 3.57 11.05C4.25 12.26 5.4 11.91 5.85 11.71C5.92 11.21 6.12 10.86 6.35 10.65C4.6 10.46 2.84 10.21 2.84 7.2C2.84 6.34 3.08 5.91 3.58 5.36C3.49 5.16 3.23 4.32 3.66 3.24C4.31 3.03 5.81 4.08 5.81 4.08C6.44 3.91 7.11 3.82 7.78 3.82C8.44 3.82 9.11 3.91 9.74 4.08C9.74 4.08 11.24 3.03 11.89 3.24C12.32 4.32 12.06 5.16 11.98 5.36C12.48 5.91 12.78 6.34 12.78 7.2C12.78 10.22 10.94 10.46 9.19 10.65C9.48 10.9 9.73 11.37 9.73 12.1C9.73 13.16 9.72 14.46 9.72 14.72C9.72 14.92 9.86 15.17 10.26 15.09C13.38 14.06 15.5 11.09 15.5 7.63C15.5 3.29 11.98 0 7.65 0Z M3.06231 10.9369C3.11231 10.9869 3.18231 11.0169 3.22231 10.9669C3.26231 10.9369 3.25231 10.8669 3.20231 10.8069C3.15231 10.7569 3.08231 10.7369 3.04231 10.7769C2.99231 10.8069 3.00231 10.8769 3.06231 10.9369Z M2.77304 10.6435C2.82304 10.6735 2.88304 10.6735 2.90304 10.6235C2.93304 10.5835 2.89304 10.5335 2.83304 10.5035C2.77304 10.4835 2.72304 10.4935 2.70304 10.5235C2.68304 10.5635 2.71304 10.6135 2.77304 10.6435Z M3.75443 11.8362C3.82443 11.9062 3.91443 11.9162 3.95443 11.8662C3.99443 11.8262 3.97443 11.7262 3.91443 11.6662C3.84443 11.5962 3.75443 11.5862 3.71443 11.6362C3.66443 11.6762 3.68443 11.7762 3.75443 11.8362Z M3.35875 11.3601C3.40875 11.4301 3.48875 11.4701 3.52875 11.4301C3.57875 11.3901 3.57875 11.3101 3.52875 11.2401C3.48875 11.1701 3.40875 11.1401 3.35875 11.1801C3.30875 11.2101 3.30875 11.2901 3.35875 11.3601Z " }) }));
F.memo(() => v("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: v("circle", { cx: "12", cy: "12", r: "7.5" }) }));
F.memo(() => v("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: v("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M8 4V7H16V4H17V7H20V8H17L17 16H20V17H17V20H16V17H8V20H7V17H4V16H7V8H4V7H7V4H8ZM16 16L16 8H8V16H16Z", fill: "currentColor" }) }));
F.memo(() => v("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: v("path", { d: "M18.7717 7.39806H17.7548C17.5361 7.39806 17.3568 7.56657 17.3568 7.7767V11.3197H16.6395V6.01456C16.6395 5.55479 16.248 5.18239 15.7647 5.18239H14.8943C14.6712 5.18239 14.4876 5.35506 14.4876 5.56935V11.3197H13.7703V4.89528C13.7703 4.67684 13.5844 4.5 13.3547 4.5H12.4078C11.9726 4.5 11.6205 4.83495 11.6205 5.24896V11.3176H10.9032V6.4785C10.9032 6.23301 10.4364 6.01456 10.1784 6.01456L9.53862 6.03329C9.10343 6.03329 8.75352 6.36824 8.75352 6.78017V15.7698L5.939 13.8495C5.53005 13.5915 4.97676 13.7309 4.75589 14.1491C4.75589 14.1491 4.58968 14.4695 4.53064 14.5756C4.47378 14.6817 4.50221 14.7816 4.56563 14.8523C4.6203 14.9126 7.42171 18.0333 8.34895 19.0527C8.61794 19.3481 9.12092 19.5 9.55393 19.5H18.085C18.8679 19.5 19.384 18.8967 19.384 18.154L19.4999 11.3197V8.09709C19.5065 7.71013 19.1784 7.39806 18.7717 7.39806Z" }) }));
F.memo(() => v("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: v("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M18 5H5V13.6849L8.46807 9.78333L17.1983 18H18V5ZM5 18V15.1901L8.53193 11.2167L15.7392 18H5ZM4 4V19H19V4H4ZM16 9.5C16 10.3284 15.3284 11 14.5 11C13.6716 11 13 10.3284 13 9.5C13 8.67157 13.6716 8 14.5 8C15.3284 8 16 8.67157 16 9.5ZM17 9.5C17 10.8807 15.8807 12 14.5 12C13.1193 12 12 10.8807 12 9.5C12 8.11929 13.1193 7 14.5 7C15.8807 7 17 8.11929 17 9.5Z" }) }));
F.memo(() => v("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: v("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M19.3915 5.35404L5.35308 19.354L4.64694 18.646L18.6853 4.64597L19.3915 5.35404Z" }) }));
F.memo(() => X("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: [v("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M17 12H6V11H17V12Z" }), v("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M17 16H6V15H17V16Z" }), v("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M17 8H6V7H17V8Z" })] }));
F.memo(() => v("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: v("path", { d: "M12 5L19.7942 18.5H4.20577L12 5Z", stroke: "currentColor", strokeWidth: "1" }) }));
F.memo(() => v("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: v("rect", { x: "4.5", y: "4.5", width: "15", height: "15" }) }));
F.memo(() => v("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: v("path", { d: "M14.0855 13.0738L13.9614 13.1256L13.8801 13.2327L9.24626 19.3343L5.72813 4.87748L19.1707 10.9487L14.0855 13.0738Z", stroke: "currentColor" }) }));
F.memo(() => v("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: v("path", { d: "M12 4L13.7961 9.52786H19.6085L14.9062 12.9443L16.7023 18.4721L12 15.0557L7.29772 18.4721L9.09383 12.9443L4.39155 9.52786H10.2039L12 4Z", stroke: "currentColor" }) }));
F.memo(() => X("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: [v("rect", { x: "11", y: "5", width: "1", height: "14" }), v("rect", { x: "5", y: "5", width: "13", height: "1" }), v("rect", { x: "5", y: "5", width: "1", height: "3" }), v("rect", { x: "17", y: "5", width: "1", height: "3" }), v("rect", { x: "8", y: "18", width: "7", height: "1" })] }));
F.memo(() => X("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [v("rect", { x: "4", y: "7.5", width: "7", height: "5.77935", rx: "0.4", fill: "currentColor" }), v("path", { d: "M9.5 7.5V5.5C9.5 4.39543 10.3954 3.5 11.5 3.5C12.6046 3.5 13.5 4.39543 13.5 5.5V7", stroke: "currentColor" })] }));
function au(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Yo = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
(function(e) {
  (function() {
    var n = {}.hasOwnProperty;
    function r() {
      for (var o = [], a = 0; a < arguments.length; a++) {
        var c = arguments[a];
        if (c) {
          var s = typeof c;
          if (s === "string" || s === "number")
            o.push(c);
          else if (Array.isArray(c)) {
            if (c.length) {
              var l = r.apply(null, c);
              l && o.push(l);
            }
          } else if (s === "object") {
            if (c.toString !== Object.prototype.toString && !c.toString.toString().includes("[native code]")) {
              o.push(c.toString());
              continue;
            }
            for (var h in c)
              n.call(c, h) && c[h] && o.push(h);
          }
        }
      }
      return o.join(" ");
    }
    e.exports ? (r.default = r, e.exports = r) : window.classNames = r;
  })();
})(Yo);
var cu = Yo.exports;
const Xo = /* @__PURE__ */ au(cu), uu = (e) => {
  const { onClick: n, label: r, suffix: o, check: a, subItems: c, emitter: s } = e;
  Er(() => {
    const g = () => {
      f(!1);
    };
    return s.on("openSubMenu", g), () => {
      s.off("openSubMenu", g);
    };
  }, [s, e.itemKey]);
  const l = X(rn, { children: [X("div", { className: "sk-dropdown-item", children: [v("div", { className: "sk-dropdown-item-icon-box", children: a && v(Ko, {}) }), r] }), o && v("span", { children: o }), c && v(iu, {})] }), [h, f] = vn(!1);
  return v(rn, { children: c ? v(lu, { items: c, onClick: n, open: h, placement: "right-start", offset: {
    mainAxis: 0,
    crossAxis: -8
  }, children: v("div", { className: Xo("sk-dropdown-item-wrap", { active: h }), onMouseEnter: () => {
    s.emit("openSubMenu", e.itemKey), f(!0);
  }, children: l }) }) : v("div", { className: "sk-dropdown-item-wrap", onClick: () => n({ key: e.itemKey }), onMouseEnter: () => {
    s.emit("openSubMenu", e.itemKey);
  }, children: l }) });
}, su = (e) => e.type === "divider", lu = (e) => {
  const { items: n, children: r, placement: o = "bottom-start" } = e, [a, c] = vn(!1), s = e.open === void 0 ? a : e.open, l = (f) => {
    var g;
    c(f), (g = e.onOpenChange) == null || g.call(e, f);
  }, h = uo(new ni());
  return v(ru, { open: s, onOpenChange: l, placement: o, offset: e.offset, trigger: e.trigger, content: v("div", { className: "sk-dropdown-content", children: n.map((f, g) => su(f) ? v("div", { className: "sk-dropdown-item-separator" }, g) : v(uu, { itemKey: f.key, label: f.label, suffix: f.suffix, check: f.check, subItems: f.children, emitter: h.current, onClick: (p) => {
    var y;
    ((y = e.onClick) == null ? void 0 : y.call(e, p)) || l(!1);
  } }, f.key)) }), children: F.cloneElement(r) });
}, vu = ({ children: e, onClick: n }) => v("div", { className: "sk-icon-btn", onClick: () => n(), children: e }), gu = ({ value: e, options: n = [], bordered: r = !0, style: o, dropdownWidth: a, onSelect: c }) => {
  var x;
  const [s, l] = vn(!1), { x: h, y: f, strategy: g, refs: p, context: m } = Zo({
    placement: "bottom-start",
    open: s,
    onOpenChange: l,
    whileElementsMounted: Mo
  }), y = zo(m), { getReferenceProps: w, getFloatingProps: _ } = Uo([y]), j = ((x = n.find((E) => E.value === e)) == null ? void 0 : x.label) ?? "", R = (E) => {
    c && e != E && c(E), l(!1);
  };
  return X(rn, { children: [X("div", { style: o, className: Xo("sk-select", {
    "sk-select-no-border": !r
  }), ref: p.setReference, onClick: () => l(!s), ...w(), children: [j, v("span", { className: "sk-select-suffix-icon", children: v(ou, {}) })] }), v(Wo, { children: s && v("div", { ref: p.setFloating, className: "sk-select-popover", style: {
    position: g,
    top: f ?? 0,
    left: h ?? 0,
    width: a
  }, ..._(), children: n.map((E) => X("div", { className: "sk-select-popover-item", onClick: () => R(E.value), children: [v("span", { className: "sk-select-popover-item-icon", children: E.value === e && v(Ko, {}) }), E.label] }, E.label)) }) })] });
};
export {
  pu as Button,
  lu as Dropdown,
  vu as IconButton,
  ru as Popover,
  gu as Select
};
