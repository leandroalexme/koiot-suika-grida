import { g as wi, a as Pi, c as yr } from "./index-13_0Igvt.js";
function _i(Zt, Ve) {
  for (var te = 0; te < Ve.length; te++) {
    const Tt = Ve[te];
    if (typeof Tt != "string" && !Array.isArray(Tt)) {
      for (const kt in Tt)
        if (kt !== "default" && !(kt in Zt)) {
          const _ = Object.getOwnPropertyDescriptor(Tt, kt);
          _ && Object.defineProperty(Zt, kt, _.get ? _ : {
            enumerable: !0,
            get: () => Tt[kt]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(Zt, Symbol.toStringTag, { value: "Module" }));
}
var vn = { exports: {} };
const Fi = {}, Mi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fi
}, Symbol.toStringTag, { value: "Module" })), mn = /* @__PURE__ */ wi(Mi);
(function(Zt, Ve) {
  var te = (() => {
    var Tt = typeof document < "u" && document.currentScript ? document.currentScript.src : void 0;
    return typeof __filename < "u" && (Tt = Tt || __filename), function(kt = {}) {
      var _ = kt, gr, Ae;
      _.ready = new Promise((t, e) => {
        gr = t, Ae = e;
      }), function(t) {
        t.Td = t.Td || [], t.Td.push(function() {
          t.MakeSWCanvasSurface = function(e) {
            var r = e, o = typeof OffscreenCanvas < "u" && r instanceof OffscreenCanvas;
            if (!(typeof HTMLCanvasElement < "u" && r instanceof HTMLCanvasElement || o || (r = document.getElementById(e), r))) throw "Canvas with id " + e + " was not found";
            return (e = t.MakeSurface(r.width, r.height)) && (e.Ld = r), e;
          }, t.MakeCanvasSurface || (t.MakeCanvasSurface = t.MakeSWCanvasSurface), t.MakeSurface = function(e, r) {
            var o = {
              width: e,
              height: r,
              colorType: t.ColorType.RGBA_8888,
              alphaType: t.AlphaType.Unpremul,
              colorSpace: t.ColorSpace.SRGB
            }, s = e * r * 4, f = t._malloc(s);
            return (o = t.Surface._makeRasterDirect(o, f, 4 * e)) && (o.Ld = null, o.Hf = e, o.Df = r, o.Ff = s, o.bf = f, o.getCanvas().clear(t.TRANSPARENT)), o;
          }, t.MakeRasterDirectSurface = function(e, r, o) {
            return t.Surface._makeRasterDirect(e, r.byteOffset, o);
          }, t.Surface.prototype.flush = function(e) {
            if (t.Md(this.Kd), this._flush(), this.Ld) {
              var r = new Uint8ClampedArray(t.HEAPU8.buffer, this.bf, this.Ff);
              r = new ImageData(r, this.Hf, this.Df), e ? this.Ld.getContext("2d").putImageData(
                r,
                0,
                0,
                e[0],
                e[1],
                e[2] - e[0],
                e[3] - e[1]
              ) : this.Ld.getContext("2d").putImageData(r, 0, 0);
            }
          }, t.Surface.prototype.dispose = function() {
            this.bf && t._free(this.bf), this.delete();
          }, t.Md = t.Md || function() {
          }, t.Te = t.Te || function() {
            return null;
          };
        });
      }(_), function(t) {
        t.Td = t.Td || [], t.Td.push(function() {
          function e(c, d, m) {
            return c && c.hasOwnProperty(d) ? c[d] : m;
          }
          function r(c) {
            var d = Qt(mt);
            return mt[d] = c, d;
          }
          function o(c) {
            return c.naturalHeight || c.videoHeight || c.displayHeight || c.height;
          }
          function s(c) {
            return c.naturalWidth || c.videoWidth || c.displayWidth || c.width;
          }
          function f(c, d, m, T) {
            return c.bindTexture(c.TEXTURE_2D, d), T || m.alphaType !== t.AlphaType.Premul || c.pixelStorei(c.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0), d;
          }
          function g(c, d, m) {
            m || d.alphaType !== t.AlphaType.Premul || c.pixelStorei(c.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), c.bindTexture(c.TEXTURE_2D, null);
          }
          t.GetWebGLContext = function(c, d) {
            if (!c) throw "null canvas passed into makeWebGLContext";
            var m = { alpha: e(d, "alpha", 1), depth: e(d, "depth", 1), stencil: e(d, "stencil", 8), antialias: e(d, "antialias", 0), premultipliedAlpha: e(d, "premultipliedAlpha", 1), preserveDrawingBuffer: e(d, "preserveDrawingBuffer", 0), preferLowPowerToHighPerformance: e(d, "preferLowPowerToHighPerformance", 0), failIfMajorPerformanceCaveat: e(
              d,
              "failIfMajorPerformanceCaveat",
              0
            ), enableExtensionsByDefault: e(d, "enableExtensionsByDefault", 1), explicitSwapControl: e(d, "explicitSwapControl", 0), renderViaOffscreenBackBuffer: e(d, "renderViaOffscreenBackBuffer", 0) };
            if (m.majorVersion = d && d.majorVersion ? d.majorVersion : typeof WebGL2RenderingContext < "u" ? 2 : 1, m.explicitSwapControl) throw "explicitSwapControl is not supported";
            return c = Yn(c, m), c ? (zr(c), U.fe.getExtension("WEBGL_debug_renderer_info"), c) : 0;
          }, t.deleteContext = function(c) {
            U === xt[c] && (U = null), typeof JSEvents == "object" && JSEvents.ug(xt[c].fe.canvas), xt[c] && xt[c].fe.canvas && (xt[c].fe.canvas.zf = void 0), xt[c] = null;
          }, t._setTextureCleanup({ deleteTexture: function(c, d) {
            var m = mt[d];
            m && xt[c].fe.deleteTexture(m), mt[d] = null;
          } }), t.MakeWebGLContext = function(c) {
            if (!this.Md(c)) return null;
            var d = this._MakeGrContext();
            if (!d) return null;
            d.Kd = c;
            var m = d.delete.bind(d);
            return d.delete = (function() {
              t.Md(this.Kd), m();
            }).bind(d), U.ff = d;
          }, t.MakeGrContext = t.MakeWebGLContext, t.GrDirectContext.prototype.getResourceCacheLimitBytes = function() {
            t.Md(this.Kd), this._getResourceCacheLimitBytes();
          }, t.GrDirectContext.prototype.getResourceCacheUsageBytes = function() {
            t.Md(this.Kd), this._getResourceCacheUsageBytes();
          }, t.GrDirectContext.prototype.releaseResourcesAndAbandonContext = function() {
            t.Md(this.Kd), this._releaseResourcesAndAbandonContext();
          }, t.GrDirectContext.prototype.setResourceCacheLimitBytes = function(c) {
            t.Md(this.Kd), this._setResourceCacheLimitBytes(c);
          }, t.MakeOnScreenGLSurface = function(c, d, m, T, E, k) {
            return !this.Md(c.Kd) || (d = E === void 0 || k === void 0 ? this._MakeOnScreenGLSurface(c, d, m, T) : this._MakeOnScreenGLSurface(c, d, m, T, E, k), !d) ? null : (d.Kd = c.Kd, d);
          }, t.MakeRenderTarget = function() {
            var c = arguments[0];
            if (!this.Md(c.Kd)) return null;
            if (arguments.length === 3) {
              var d = this._MakeRenderTargetWH(c, arguments[1], arguments[2]);
              if (!d) return null;
            } else if (arguments.length === 2) {
              if (d = this._MakeRenderTargetII(c, arguments[1]), !d) return null;
            } else return null;
            return d.Kd = c.Kd, d;
          }, t.MakeWebGLCanvasSurface = function(c, d, m) {
            d = d || null;
            var T = c, E = typeof OffscreenCanvas < "u" && T instanceof OffscreenCanvas;
            if (!(typeof HTMLCanvasElement < "u" && T instanceof HTMLCanvasElement || E || (T = document.getElementById(c), T))) throw "Canvas with id " + c + " was not found";
            if (c = this.GetWebGLContext(T, m), !c || 0 > c) throw "failed to create webgl context: err " + c;
            return c = this.MakeWebGLContext(c), d = this.MakeOnScreenGLSurface(c, T.width, T.height, d), d || (d = T.cloneNode(!0), T.parentNode.replaceChild(d, T), d.classList.add("ck-replaced"), t.MakeSWCanvasSurface(d));
          }, t.MakeCanvasSurface = t.MakeWebGLCanvasSurface, t.Surface.prototype.makeImageFromTexture = function(c, d) {
            return t.Md(this.Kd), c = r(c), (d = this._makeImageFromTexture(this.Kd, c, d)) && (d.Le = c), d;
          }, t.Surface.prototype.makeImageFromTextureSource = function(c, d, m) {
            d || (d = { height: o(c), width: s(c), colorType: t.ColorType.RGBA_8888, alphaType: m ? t.AlphaType.Premul : t.AlphaType.Unpremul }), d.colorSpace || (d.colorSpace = t.ColorSpace.SRGB), t.Md(this.Kd);
            var T = U.fe;
            return m = f(T, T.createTexture(), d, m), U.version === 2 ? T.texImage2D(
              T.TEXTURE_2D,
              0,
              T.RGBA,
              d.width,
              d.height,
              0,
              T.RGBA,
              T.UNSIGNED_BYTE,
              c
            ) : T.texImage2D(T.TEXTURE_2D, 0, T.RGBA, T.RGBA, T.UNSIGNED_BYTE, c), g(T, d), this._resetContext(), this.makeImageFromTexture(m, d);
          }, t.Surface.prototype.updateTextureFromSource = function(c, d, m) {
            if (c.Le) {
              t.Md(this.Kd);
              var T = c.getImageInfo(), E = U.fe, k = f(E, mt[c.Le], T, m);
              U.version === 2 ? E.texImage2D(E.TEXTURE_2D, 0, E.RGBA, s(d), o(d), 0, E.RGBA, E.UNSIGNED_BYTE, d) : E.texImage2D(E.TEXTURE_2D, 0, E.RGBA, E.RGBA, E.UNSIGNED_BYTE, d), g(E, T, m), this._resetContext(), mt[c.Le] = null, c.Le = r(k), T.colorSpace = c.getColorSpace(), d = this._makeImageFromTexture(this.Kd, c.Le, T), m = c.Jd.Rd, E = c.Jd.Yd, c.Jd.Rd = d.Jd.Rd, c.Jd.Yd = d.Jd.Yd, d.Jd.Rd = m, d.Jd.Yd = E, d.delete(), T.colorSpace.delete();
            }
          }, t.MakeLazyImageFromTextureSource = function(c, d, m) {
            d || (d = { height: o(c), width: s(c), colorType: t.ColorType.RGBA_8888, alphaType: m ? t.AlphaType.Premul : t.AlphaType.Unpremul }), d.colorSpace || (d.colorSpace = t.ColorSpace.SRGB);
            var T = { makeTexture: function() {
              var E = U, k = E.fe, w = f(k, k.createTexture(), d, m);
              return E.version === 2 ? k.texImage2D(
                k.TEXTURE_2D,
                0,
                k.RGBA,
                d.width,
                d.height,
                0,
                k.RGBA,
                k.UNSIGNED_BYTE,
                c
              ) : k.texImage2D(k.TEXTURE_2D, 0, k.RGBA, k.RGBA, k.UNSIGNED_BYTE, c), g(k, d, m), r(w);
            }, freeSrc: function() {
            } };
            return c.constructor.name === "VideoFrame" && (T.freeSrc = function() {
              c.close();
            }), t.Image._makeFromGenerator(d, T);
          }, t.Md = function(c) {
            return c ? zr(c) : !1;
          }, t.Te = function() {
            return U && U.ff && !U.ff.isDeleted() ? U.ff : null;
          };
        });
      }(_), function(t) {
        function e(i, n, a, l, y) {
          for (var A = 0; A < i.length; A++) n[A * a + (A * y + l + a) % a] = i[A];
          return n;
        }
        function r(i) {
          for (var n = i * i, a = Array(n); n--; ) a[n] = n % (i + 1) === 0 ? 1 : 0;
          return a;
        }
        function o(i) {
          return i ? i.constructor === Float32Array && i.length === 4 : !1;
        }
        function s(i) {
          return (c(255 * i[3]) << 24 | c(255 * i[0]) << 16 | c(255 * i[1]) << 8 | c(255 * i[2]) << 0) >>> 0;
        }
        function f(i) {
          if (i && i._ck) return i;
          if (i instanceof Float32Array) {
            for (var n = Math.floor(i.length / 4), a = new Uint32Array(n), l = 0; l < n; l++) a[l] = s(i.slice(4 * l, 4 * (l + 1)));
            return a;
          }
          if (i instanceof Uint32Array) return i;
          if (i instanceof Array && i[0] instanceof Float32Array) return i.map(s);
        }
        function g(i) {
          if (i === void 0) return 1;
          var n = parseFloat(i);
          return i && i.indexOf("%") !== -1 ? n / 100 : n;
        }
        function c(i) {
          return Math.round(Math.max(0, Math.min(i || 0, 255)));
        }
        function d(i, n) {
          n && n._ck || t._free(i);
        }
        function m(i, n, a) {
          if (!i || !i.length) return N;
          if (i && i._ck) return i.byteOffset;
          var l = t[n].BYTES_PER_ELEMENT;
          return a || (a = t._malloc(i.length * l)), t[n].set(i, a / l), a;
        }
        function T(i) {
          var n = { be: N, count: i.length, colorType: t.ColorType.RGBA_F32 };
          if (i instanceof Float32Array) n.be = m(i, "HEAPF32"), n.count = i.length / 4;
          else if (i instanceof Uint32Array) n.be = m(i, "HEAPU32"), n.colorType = t.ColorType.RGBA_8888;
          else if (i instanceof Array) {
            if (i && i.length) {
              for (var a = t._malloc(16 * i.length), l = 0, y = a / 4, A = 0; A < i.length; A++) for (var M = 0; 4 > M; M++) t.HEAPF32[y + l] = i[A][M], l++;
              i = a;
            } else i = N;
            n.be = i;
          } else throw "Invalid argument to copyFlexibleColorArray, Not a color array " + typeof i;
          return n;
        }
        function E(i) {
          if (!i) return N;
          var n = lr.toTypedArray();
          if (i.length) {
            if (i.length === 6 || i.length === 9) return m(i, "HEAPF32", Wt), i.length === 6 && t.HEAPF32.set(vi, 6 + Wt / 4), Wt;
            if (i.length === 16) return n[0] = i[0], n[1] = i[1], n[2] = i[3], n[3] = i[4], n[4] = i[5], n[5] = i[7], n[6] = i[12], n[7] = i[13], n[8] = i[15], Wt;
            throw "invalid matrix size";
          }
          if (i.m11 === void 0) throw "invalid matrix argument";
          return n[0] = i.m11, n[1] = i.m21, n[2] = i.m41, n[3] = i.m12, n[4] = i.m22, n[5] = i.m42, n[6] = i.m14, n[7] = i.m24, n[8] = i.m44, Wt;
        }
        function k(i) {
          if (!i) return N;
          var n = fr.toTypedArray();
          if (i.length) {
            if (i.length !== 16 && i.length !== 6 && i.length !== 9) throw "invalid matrix size";
            return i.length === 16 ? m(i, "HEAPF32", qt) : (n.fill(0), n[0] = i[0], n[1] = i[1], n[3] = i[2], n[4] = i[3], n[5] = i[4], n[7] = i[5], n[10] = 1, n[12] = i[6], n[13] = i[7], n[15] = i[8], i.length === 6 && (n[12] = 0, n[13] = 0, n[15] = 1), qt);
          }
          if (i.m11 === void 0) throw "invalid matrix argument";
          return n[0] = i.m11, n[1] = i.m21, n[2] = i.m31, n[3] = i.m41, n[4] = i.m12, n[5] = i.m22, n[6] = i.m32, n[7] = i.m42, n[8] = i.m13, n[9] = i.m23, n[10] = i.m33, n[11] = i.m43, n[12] = i.m14, n[13] = i.m24, n[14] = i.m34, n[15] = i.m44, qt;
        }
        function w(i, n) {
          return m(i, "HEAPF32", n || Nt);
        }
        function O(i, n, a, l) {
          var y = cr.toTypedArray();
          return y[0] = i, y[1] = n, y[2] = a, y[3] = l, Nt;
        }
        function H(i) {
          for (var n = new Float32Array(4), a = 0; 4 > a; a++) n[a] = t.HEAPF32[i / 4 + a];
          return n;
        }
        function $(i, n) {
          return m(i, "HEAPF32", n || rt);
        }
        function ct(i, n) {
          return m(i, "HEAPF32", n || pr);
        }
        function ot() {
          for (var i = 0, n = 0; n < arguments.length - 1; n += 2) i += arguments[n] * arguments[n + 1];
          return i;
        }
        function pe(i, n, a) {
          for (var l = Array(i.length), y = 0; y < a; y++) for (var A = 0; A < a; A++) {
            for (var M = 0, R = 0; R < a; R++) M += i[a * y + R] * n[a * R + A];
            l[y * a + A] = M;
          }
          return l;
        }
        function ye(i, n) {
          for (var a = pe(n[0], n[1], i), l = 2; l < n.length; ) a = pe(a, n[l], i), l++;
          return a;
        }
        t.Color = function(i, n, a, l) {
          return l === void 0 && (l = 1), t.Color4f(c(i) / 255, c(n) / 255, c(a) / 255, l);
        }, t.ColorAsInt = function(i, n, a, l) {
          return l === void 0 && (l = 255), (c(l) << 24 | c(i) << 16 | c(n) << 8 | c(a) << 0 & 268435455) >>> 0;
        }, t.Color4f = function(i, n, a, l) {
          return l === void 0 && (l = 1), Float32Array.of(i, n, a, l);
        }, Object.defineProperty(t, "TRANSPARENT", { get: function() {
          return t.Color4f(0, 0, 0, 0);
        } }), Object.defineProperty(t, "BLACK", { get: function() {
          return t.Color4f(0, 0, 0, 1);
        } }), Object.defineProperty(
          t,
          "WHITE",
          { get: function() {
            return t.Color4f(1, 1, 1, 1);
          } }
        ), Object.defineProperty(t, "RED", { get: function() {
          return t.Color4f(1, 0, 0, 1);
        } }), Object.defineProperty(t, "GREEN", { get: function() {
          return t.Color4f(0, 1, 0, 1);
        } }), Object.defineProperty(t, "BLUE", { get: function() {
          return t.Color4f(0, 0, 1, 1);
        } }), Object.defineProperty(t, "YELLOW", { get: function() {
          return t.Color4f(1, 1, 0, 1);
        } }), Object.defineProperty(t, "CYAN", { get: function() {
          return t.Color4f(0, 1, 1, 1);
        } }), Object.defineProperty(t, "MAGENTA", { get: function() {
          return t.Color4f(
            1,
            0,
            1,
            1
          );
        } }), t.getColorComponents = function(i) {
          return [Math.floor(255 * i[0]), Math.floor(255 * i[1]), Math.floor(255 * i[2]), i[3]];
        }, t.parseColorString = function(i, n) {
          if (i = i.toLowerCase(), i.startsWith("#")) {
            switch (n = 255, i.length) {
              case 9:
                n = parseInt(i.slice(7, 9), 16);
              case 7:
                var a = parseInt(i.slice(1, 3), 16), l = parseInt(i.slice(3, 5), 16), y = parseInt(i.slice(5, 7), 16);
                break;
              case 5:
                n = 17 * parseInt(i.slice(4, 5), 16);
              case 4:
                a = 17 * parseInt(i.slice(1, 2), 16), l = 17 * parseInt(i.slice(2, 3), 16), y = 17 * parseInt(i.slice(3, 4), 16);
            }
            return t.Color(
              a,
              l,
              y,
              n / 255
            );
          }
          return i.startsWith("rgba") ? (i = i.slice(5, -1), i = i.split(","), t.Color(+i[0], +i[1], +i[2], g(i[3]))) : i.startsWith("rgb") ? (i = i.slice(4, -1), i = i.split(","), t.Color(+i[0], +i[1], +i[2], g(i[3]))) : i.startsWith("gray(") || i.startsWith("hsl") || !n || (i = n[i], i === void 0) ? t.BLACK : i;
        }, t.multiplyByAlpha = function(i, n) {
          return i = i.slice(), i[3] = Math.max(0, Math.min(i[3] * n, 1)), i;
        }, t.Malloc = function(i, n) {
          var a = t._malloc(n * i.BYTES_PER_ELEMENT);
          return { _ck: !0, length: n, byteOffset: a, qe: null, subarray: function(l, y) {
            return l = this.toTypedArray().subarray(
              l,
              y
            ), l._ck = !0, l;
          }, toTypedArray: function() {
            return this.qe && this.qe.length ? this.qe : (this.qe = new i(t.HEAPU8.buffer, a, n), this.qe._ck = !0, this.qe);
          } };
        }, t.Free = function(i) {
          t._free(i.byteOffset), i.byteOffset = N, i.toTypedArray = null, i.qe = null;
        };
        var Wt = N, lr, qt = N, fr, Nt = N, cr, St, rt = N, cn, Ut = N, dn, dr = N, hn, hr = N, De, ge = N, pn, pr = N, yn, gn = N, vi = Float32Array.of(0, 0, 1), N = 0;
        t.onRuntimeInitialized = function() {
          function i(n, a, l, y, A, M, R) {
            M || (M = 4 * y.width, y.colorType === t.ColorType.RGBA_F16 ? M *= 2 : y.colorType === t.ColorType.RGBA_F32 && (M *= 4));
            var j = M * y.height, I = A ? A.byteOffset : t._malloc(j);
            if (R ? !n._readPixels(y, I, M, a, l, R) : !n._readPixels(y, I, M, a, l)) return A || t._free(I), null;
            if (A) return A.toTypedArray();
            switch (y.colorType) {
              case t.ColorType.RGBA_8888:
              case t.ColorType.RGBA_F16:
                n = new Uint8Array(t.HEAPU8.buffer, I, j).slice();
                break;
              case t.ColorType.RGBA_F32:
                n = new Float32Array(t.HEAPU8.buffer, I, j).slice();
                break;
              default:
                return null;
            }
            return t._free(I), n;
          }
          cr = t.Malloc(Float32Array, 4), Nt = cr.byteOffset, fr = t.Malloc(Float32Array, 16), qt = fr.byteOffset, lr = t.Malloc(Float32Array, 9), Wt = lr.byteOffset, pn = t.Malloc(Float32Array, 12), pr = pn.byteOffset, yn = t.Malloc(Float32Array, 12), gn = yn.byteOffset, St = t.Malloc(Float32Array, 4), rt = St.byteOffset, cn = t.Malloc(Float32Array, 4), Ut = cn.byteOffset, dn = t.Malloc(Float32Array, 3), dr = dn.byteOffset, hn = t.Malloc(Float32Array, 3), hr = hn.byteOffset, De = t.Malloc(Int32Array, 4), ge = De.byteOffset, t.ColorSpace.SRGB = t.ColorSpace._MakeSRGB(), t.ColorSpace.DISPLAY_P3 = t.ColorSpace._MakeDisplayP3(), t.ColorSpace.ADOBE_RGB = t.ColorSpace._MakeAdobeRGB(), t.GlyphRunFlags = { IsWhiteSpace: t._GlyphRunFlags_isWhiteSpace }, t.Path.MakeFromCmds = function(n) {
            var a = m(n, "HEAPF32"), l = t.Path._MakeFromCmds(a, n.length);
            return d(a, n), l;
          }, t.Path.MakeFromVerbsPointsWeights = function(n, a, l) {
            var y = m(n, "HEAPU8"), A = m(a, "HEAPF32"), M = m(l, "HEAPF32"), R = t.Path._MakeFromVerbsPointsWeights(y, n.length, A, a.length, M, l && l.length || 0);
            return d(y, n), d(A, a), d(M, l), R;
          }, t.Path.prototype.addArc = function(n, a, l) {
            return n = $(n), this._addArc(n, a, l), this;
          }, t.Path.prototype.addCircle = function(n, a, l, y) {
            return this._addCircle(
              n,
              a,
              l,
              !!y
            ), this;
          }, t.Path.prototype.addOval = function(n, a, l) {
            return l === void 0 && (l = 1), n = $(n), this._addOval(n, !!a, l), this;
          }, t.Path.prototype.addPath = function() {
            var n = Array.prototype.slice.call(arguments), a = n[0], l = !1;
            if (typeof n[n.length - 1] == "boolean" && (l = n.pop()), n.length === 1) this._addPath(a, 1, 0, 0, 0, 1, 0, 0, 0, 1, l);
            else if (n.length === 2) n = n[1], this._addPath(a, n[0], n[1], n[2], n[3], n[4], n[5], n[6] || 0, n[7] || 0, n[8] || 1, l);
            else if (n.length === 7 || n.length === 10) this._addPath(a, n[1], n[2], n[3], n[4], n[5], n[6], n[7] || 0, n[8] || 0, n[9] || 1, l);
            else return null;
            return this;
          }, t.Path.prototype.addPoly = function(n, a) {
            var l = m(n, "HEAPF32");
            return this._addPoly(l, n.length / 2, a), d(l, n), this;
          }, t.Path.prototype.addRect = function(n, a) {
            return n = $(n), this._addRect(n, !!a), this;
          }, t.Path.prototype.addRRect = function(n, a) {
            return n = ct(n), this._addRRect(n, !!a), this;
          }, t.Path.prototype.addVerbsPointsWeights = function(n, a, l) {
            var y = m(n, "HEAPU8"), A = m(a, "HEAPF32"), M = m(l, "HEAPF32");
            this._addVerbsPointsWeights(y, n.length, A, a.length, M, l && l.length || 0), d(y, n), d(A, a), d(M, l);
          }, t.Path.prototype.arc = function(n, a, l, y, A, M) {
            return n = t.LTRBRect(n - l, a - l, n + l, a + l), A = (A - y) / Math.PI * 180 - 360 * !!M, M = new t.Path(), M.addArc(n, y / Math.PI * 180, A), this.addPath(M, !0), M.delete(), this;
          }, t.Path.prototype.arcToOval = function(n, a, l, y) {
            return n = $(n), this._arcToOval(n, a, l, y), this;
          }, t.Path.prototype.arcToRotated = function(n, a, l, y, A, M, R) {
            return this._arcToRotated(n, a, l, !!y, !!A, M, R), this;
          }, t.Path.prototype.arcToTangent = function(n, a, l, y, A) {
            return this._arcToTangent(n, a, l, y, A), this;
          }, t.Path.prototype.close = function() {
            return this._close(), this;
          }, t.Path.prototype.conicTo = function(n, a, l, y, A) {
            return this._conicTo(n, a, l, y, A), this;
          }, t.Path.prototype.computeTightBounds = function(n) {
            this._computeTightBounds(rt);
            var a = St.toTypedArray();
            return n ? (n.set(a), n) : a.slice();
          }, t.Path.prototype.cubicTo = function(n, a, l, y, A, M) {
            return this._cubicTo(n, a, l, y, A, M), this;
          }, t.Path.prototype.dash = function(n, a, l) {
            return this._dash(n, a, l) ? this : null;
          }, t.Path.prototype.getBounds = function(n) {
            this._getBounds(rt);
            var a = St.toTypedArray();
            return n ? (n.set(a), n) : a.slice();
          }, t.Path.prototype.lineTo = function(n, a) {
            return this._lineTo(n, a), this;
          }, t.Path.prototype.moveTo = function(n, a) {
            return this._moveTo(n, a), this;
          }, t.Path.prototype.offset = function(n, a) {
            return this._transform(1, 0, n, 0, 1, a, 0, 0, 1), this;
          }, t.Path.prototype.quadTo = function(n, a, l, y) {
            return this._quadTo(n, a, l, y), this;
          }, t.Path.prototype.rArcTo = function(n, a, l, y, A, M, R) {
            return this._rArcTo(n, a, l, y, A, M, R), this;
          }, t.Path.prototype.rConicTo = function(n, a, l, y, A) {
            return this._rConicTo(n, a, l, y, A), this;
          }, t.Path.prototype.rCubicTo = function(n, a, l, y, A, M) {
            return this._rCubicTo(n, a, l, y, A, M), this;
          }, t.Path.prototype.rLineTo = function(n, a) {
            return this._rLineTo(n, a), this;
          }, t.Path.prototype.rMoveTo = function(n, a) {
            return this._rMoveTo(n, a), this;
          }, t.Path.prototype.rQuadTo = function(n, a, l, y) {
            return this._rQuadTo(n, a, l, y), this;
          }, t.Path.prototype.stroke = function(n) {
            return n = n || {}, n.width = n.width || 1, n.miter_limit = n.miter_limit || 4, n.cap = n.cap || t.StrokeCap.Butt, n.join = n.join || t.StrokeJoin.Miter, n.precision = n.precision || 1, this._stroke(n) ? this : null;
          }, t.Path.prototype.transform = function() {
            if (arguments.length === 1) {
              var n = arguments[0];
              this._transform(n[0], n[1], n[2], n[3], n[4], n[5], n[6] || 0, n[7] || 0, n[8] || 1);
            } else if (arguments.length === 6 || arguments.length === 9) n = arguments, this._transform(n[0], n[1], n[2], n[3], n[4], n[5], n[6] || 0, n[7] || 0, n[8] || 1);
            else throw "transform expected to take 1 or 9 arguments. Got " + arguments.length;
            return this;
          }, t.Path.prototype.trim = function(n, a, l) {
            return this._trim(n, a, !!l) ? this : null;
          }, t.Image.prototype.encodeToBytes = function(n, a) {
            var l = t.Te();
            return n = n || t.ImageFormat.PNG, a = a || 100, l ? this._encodeToBytes(n, a, l) : this._encodeToBytes(n, a);
          }, t.Image.prototype.makeShaderCubic = function(n, a, l, y, A) {
            return A = E(A), this._makeShaderCubic(n, a, l, y, A);
          }, t.Image.prototype.makeShaderOptions = function(n, a, l, y, A) {
            return A = E(A), this._makeShaderOptions(n, a, l, y, A);
          }, t.Image.prototype.readPixels = function(n, a, l, y, A) {
            var M = t.Te();
            return i(this, n, a, l, y, A, M);
          }, t.Canvas.prototype.clear = function(n) {
            t.Md(this.Kd), n = w(n), this._clear(n);
          }, t.Canvas.prototype.clipRRect = function(n, a, l) {
            t.Md(this.Kd), n = ct(n), this._clipRRect(n, a, l);
          }, t.Canvas.prototype.clipRect = function(n, a, l) {
            t.Md(this.Kd), n = $(n), this._clipRect(n, a, l);
          }, t.Canvas.prototype.concat = function(n) {
            t.Md(this.Kd), n = k(n), this._concat(n);
          }, t.Canvas.prototype.drawArc = function(n, a, l, y, A) {
            t.Md(this.Kd), n = $(n), this._drawArc(n, a, l, y, A);
          }, t.Canvas.prototype.drawAtlas = function(n, a, l, y, A, M, R) {
            if (n && y && a && l && a.length === l.length) {
              t.Md(this.Kd), A || (A = t.BlendMode.SrcOver);
              var j = m(a, "HEAPF32"), I = m(l, "HEAPF32"), K = l.length / 4, Y = m(f(M), "HEAPU32");
              if (R && "B" in R && "C" in R) this._drawAtlasCubic(n, I, j, Y, K, A, R.B, R.C, y);
              else {
                let p = t.FilterMode.Linear, S = t.MipmapMode.None;
                R && (p = R.filter, "mipmap" in R && (S = R.mipmap)), this._drawAtlasOptions(n, I, j, Y, K, A, p, S, y);
              }
              d(j, a), d(I, l), d(Y, M);
            }
          }, t.Canvas.prototype.drawCircle = function(n, a, l, y) {
            t.Md(this.Kd), this._drawCircle(n, a, l, y);
          }, t.Canvas.prototype.drawColor = function(n, a) {
            t.Md(this.Kd), n = w(n), a !== void 0 ? this._drawColor(n, a) : this._drawColor(n);
          }, t.Canvas.prototype.drawColorInt = function(n, a) {
            t.Md(this.Kd), this._drawColorInt(n, a || t.BlendMode.SrcOver);
          }, t.Canvas.prototype.drawColorComponents = function(n, a, l, y, A) {
            t.Md(this.Kd), n = O(n, a, l, y), A !== void 0 ? this._drawColor(n, A) : this._drawColor(n);
          }, t.Canvas.prototype.drawDRRect = function(n, a, l) {
            t.Md(this.Kd), n = ct(n, pr), a = ct(a, gn), this._drawDRRect(n, a, l);
          }, t.Canvas.prototype.drawImage = function(n, a, l, y) {
            t.Md(this.Kd), this._drawImage(n, a, l, y || null);
          }, t.Canvas.prototype.drawImageCubic = function(n, a, l, y, A, M) {
            t.Md(this.Kd), this._drawImageCubic(n, a, l, y, A, M || null);
          }, t.Canvas.prototype.drawImageOptions = function(n, a, l, y, A, M) {
            t.Md(this.Kd), this._drawImageOptions(n, a, l, y, A, M || null);
          }, t.Canvas.prototype.drawImageNine = function(n, a, l, y, A) {
            t.Md(this.Kd), a = m(a, "HEAP32", ge), l = $(l), this._drawImageNine(n, a, l, y, A || null);
          }, t.Canvas.prototype.drawImageRect = function(n, a, l, y, A) {
            t.Md(this.Kd), $(a, rt), $(l, Ut), this._drawImageRect(n, rt, Ut, y, !!A);
          }, t.Canvas.prototype.drawImageRectCubic = function(n, a, l, y, A, M) {
            t.Md(this.Kd), $(a, rt), $(l, Ut), this._drawImageRectCubic(n, rt, Ut, y, A, M || null);
          }, t.Canvas.prototype.drawImageRectOptions = function(n, a, l, y, A, M) {
            t.Md(this.Kd), $(a, rt), $(l, Ut), this._drawImageRectOptions(n, rt, Ut, y, A, M || null);
          }, t.Canvas.prototype.drawLine = function(n, a, l, y, A) {
            t.Md(this.Kd), this._drawLine(n, a, l, y, A);
          }, t.Canvas.prototype.drawOval = function(n, a) {
            t.Md(this.Kd), n = $(n), this._drawOval(n, a);
          }, t.Canvas.prototype.drawPaint = function(n) {
            t.Md(this.Kd), this._drawPaint(n);
          }, t.Canvas.prototype.drawParagraph = function(n, a, l) {
            t.Md(this.Kd), this._drawParagraph(n, a, l);
          }, t.Canvas.prototype.drawPatch = function(n, a, l, y, A) {
            if (24 > n.length) throw "Need 12 cubic points";
            if (a && 4 > a.length) throw "Need 4 colors";
            if (l && 8 > l.length) throw "Need 4 shader coordinates";
            t.Md(this.Kd);
            const M = m(n, "HEAPF32"), R = a ? m(f(a), "HEAPU32") : N, j = l ? m(l, "HEAPF32") : N;
            y || (y = t.BlendMode.Modulate), this._drawPatch(M, R, j, y, A), d(j, l), d(R, a), d(M, n);
          }, t.Canvas.prototype.drawPath = function(n, a) {
            t.Md(this.Kd), this._drawPath(n, a);
          }, t.Canvas.prototype.drawPicture = function(n) {
            t.Md(this.Kd), this._drawPicture(n);
          }, t.Canvas.prototype.drawPoints = function(n, a, l) {
            t.Md(this.Kd);
            var y = m(a, "HEAPF32");
            this._drawPoints(
              n,
              y,
              a.length / 2,
              l
            ), d(y, a);
          }, t.Canvas.prototype.drawRRect = function(n, a) {
            t.Md(this.Kd), n = ct(n), this._drawRRect(n, a);
          }, t.Canvas.prototype.drawRect = function(n, a) {
            t.Md(this.Kd), n = $(n), this._drawRect(n, a);
          }, t.Canvas.prototype.drawRect4f = function(n, a, l, y, A) {
            t.Md(this.Kd), this._drawRect4f(n, a, l, y, A);
          }, t.Canvas.prototype.drawShadow = function(n, a, l, y, A, M, R) {
            t.Md(this.Kd);
            var j = m(A, "HEAPF32"), I = m(M, "HEAPF32");
            a = m(a, "HEAPF32", dr), l = m(l, "HEAPF32", hr), this._drawShadow(n, a, l, y, j, I, R), d(j, A), d(I, M);
          }, t.getShadowLocalBounds = function(n, a, l, y, A, M, R) {
            return n = E(n), l = m(l, "HEAPF32", dr), y = m(y, "HEAPF32", hr), this._getShadowLocalBounds(n, a, l, y, A, M, rt) ? (a = St.toTypedArray(), R ? (R.set(a), R) : a.slice()) : null;
          }, t.Canvas.prototype.drawTextBlob = function(n, a, l, y) {
            t.Md(this.Kd), this._drawTextBlob(n, a, l, y);
          }, t.Canvas.prototype.drawVertices = function(n, a, l) {
            t.Md(this.Kd), this._drawVertices(n, a, l);
          }, t.Canvas.prototype.getDeviceClipBounds = function(n) {
            this._getDeviceClipBounds(ge);
            var a = De.toTypedArray();
            return n ? n.set(a) : n = a.slice(), n;
          }, t.Canvas.prototype.getLocalToDevice = function() {
            this._getLocalToDevice(qt);
            for (var n = qt, a = Array(16), l = 0; 16 > l; l++) a[l] = t.HEAPF32[n / 4 + l];
            return a;
          }, t.Canvas.prototype.getTotalMatrix = function() {
            this._getTotalMatrix(Wt);
            for (var n = Array(9), a = 0; 9 > a; a++) n[a] = t.HEAPF32[Wt / 4 + a];
            return n;
          }, t.Canvas.prototype.makeSurface = function(n) {
            return n = this._makeSurface(n), n.Kd = this.Kd, n;
          }, t.Canvas.prototype.readPixels = function(n, a, l, y, A) {
            return t.Md(this.Kd), i(this, n, a, l, y, A);
          }, t.Canvas.prototype.saveLayer = function(n, a, l, y) {
            return a = $(a), this._saveLayer(n || null, a, l || null, y || 0);
          }, t.Canvas.prototype.writePixels = function(n, a, l, y, A, M, R, j) {
            if (n.byteLength % (a * l)) throw "pixels length must be a multiple of the srcWidth * srcHeight";
            t.Md(this.Kd);
            var I = n.byteLength / (a * l);
            M = M || t.AlphaType.Unpremul, R = R || t.ColorType.RGBA_8888, j = j || t.ColorSpace.SRGB;
            var K = I * a;
            return I = m(n, "HEAPU8"), a = this._writePixels({ width: a, height: l, colorType: R, alphaType: M, colorSpace: j }, I, K, y, A), d(I, n), a;
          }, t.ColorFilter.MakeBlend = function(n, a, l) {
            return n = w(n), l = l || t.ColorSpace.SRGB, t.ColorFilter._MakeBlend(n, a, l);
          }, t.ColorFilter.MakeMatrix = function(n) {
            if (!n || n.length !== 20) throw "invalid color matrix";
            var a = m(n, "HEAPF32"), l = t.ColorFilter._makeMatrix(a);
            return d(a, n), l;
          }, t.ContourMeasure.prototype.getPosTan = function(n, a) {
            return this._getPosTan(n, rt), n = St.toTypedArray(), a ? (a.set(n), a) : n.slice();
          }, t.ImageFilter.prototype.getOutputBounds = function(n, a, l) {
            return n = $(n, rt), a = E(a), this._getOutputBounds(n, a, ge), a = De.toTypedArray(), l ? (l.set(a), l) : a.slice();
          }, t.ImageFilter.MakeDropShadow = function(n, a, l, y, A, M) {
            return A = w(A, Nt), t.ImageFilter._MakeDropShadow(n, a, l, y, A, M);
          }, t.ImageFilter.MakeDropShadowOnly = function(n, a, l, y, A, M) {
            return A = w(A, Nt), t.ImageFilter._MakeDropShadowOnly(n, a, l, y, A, M);
          }, t.ImageFilter.MakeImage = function(n, a, l, y) {
            if (l = $(l, rt), y = $(y, Ut), "B" in a && "C" in a) return t.ImageFilter._MakeImageCubic(n, a.B, a.C, l, y);
            const A = a.filter;
            let M = t.MipmapMode.None;
            return "mipmap" in a && (M = a.mipmap), t.ImageFilter._MakeImageOptions(n, A, M, l, y);
          }, t.ImageFilter.MakeMatrixTransform = function(n, a, l) {
            if (n = E(n), "B" in a && "C" in a) return t.ImageFilter._MakeMatrixTransformCubic(n, a.B, a.C, l);
            const y = a.filter;
            let A = t.MipmapMode.None;
            return "mipmap" in a && (A = a.mipmap), t.ImageFilter._MakeMatrixTransformOptions(n, y, A, l);
          }, t.Paint.prototype.getColor = function() {
            return this._getColor(Nt), H(Nt);
          }, t.Paint.prototype.setColor = function(n, a) {
            a = a || null, n = w(n), this._setColor(n, a);
          }, t.Paint.prototype.setColorComponents = function(n, a, l, y, A) {
            A = A || null, n = O(n, a, l, y), this._setColor(n, A);
          }, t.Path.prototype.getPoint = function(n, a) {
            return this._getPoint(n, rt), n = St.toTypedArray(), a ? (a[0] = n[0], a[1] = n[1], a) : n.slice(0, 2);
          }, t.Picture.prototype.makeShader = function(n, a, l, y, A) {
            return y = E(y), A = $(A), this._makeShader(n, a, l, y, A);
          }, t.Picture.prototype.cullRect = function(n) {
            this._cullRect(rt);
            var a = St.toTypedArray();
            return n ? (n.set(a), n) : a.slice();
          }, t.PictureRecorder.prototype.beginRecording = function(n, a) {
            return n = $(n), this._beginRecording(n, !!a);
          }, t.Surface.prototype.getCanvas = function() {
            var n = this._getCanvas();
            return n.Kd = this.Kd, n;
          }, t.Surface.prototype.makeImageSnapshot = function(n) {
            return t.Md(this.Kd), n = m(n, "HEAP32", ge), this._makeImageSnapshot(n);
          }, t.Surface.prototype.makeSurface = function(n) {
            return t.Md(this.Kd), n = this._makeSurface(n), n.Kd = this.Kd, n;
          }, t.Surface.prototype.Gf = function(n, a) {
            return this.He || (this.He = this.getCanvas()), requestAnimationFrame((function() {
              t.Md(this.Kd), n(this.He), this.flush(a);
            }).bind(this));
          }, t.Surface.prototype.requestAnimationFrame || (t.Surface.prototype.requestAnimationFrame = t.Surface.prototype.Gf), t.Surface.prototype.Cf = function(n, a) {
            this.He || (this.He = this.getCanvas()), requestAnimationFrame((function() {
              t.Md(this.Kd), n(this.He), this.flush(a), this.dispose();
            }).bind(this));
          }, t.Surface.prototype.drawOnce || (t.Surface.prototype.drawOnce = t.Surface.prototype.Cf), t.PathEffect.MakeDash = function(n, a) {
            if (a || (a = 0), !n.length || n.length % 2 === 1) throw "Intervals array must have even length";
            var l = m(n, "HEAPF32");
            return a = t.PathEffect._MakeDash(l, n.length, a), d(l, n), a;
          }, t.PathEffect.MakeLine2D = function(n, a) {
            return a = E(a), t.PathEffect._MakeLine2D(n, a);
          }, t.PathEffect.MakePath2D = function(n, a) {
            return n = E(n), t.PathEffect._MakePath2D(n, a);
          }, t.Shader.MakeColor = function(n, a) {
            return a = a || null, n = w(n), t.Shader._MakeColor(n, a);
          }, t.Shader.Blend = t.Shader.MakeBlend, t.Shader.Color = t.Shader.MakeColor, t.Shader.MakeLinearGradient = function(n, a, l, y, A, M, R, j) {
            j = j || null;
            var I = T(l), K = m(y, "HEAPF32");
            R = R || 0, M = E(M);
            var Y = St.toTypedArray();
            return Y.set(n), Y.set(a, 2), n = t.Shader._MakeLinearGradient(rt, I.be, I.colorType, K, I.count, A, R, M, j), d(I.be, l), y && d(K, y), n;
          }, t.Shader.MakeRadialGradient = function(n, a, l, y, A, M, R, j) {
            j = j || null;
            var I = T(l), K = m(y, "HEAPF32");
            return R = R || 0, M = E(M), n = t.Shader._MakeRadialGradient(n[0], n[1], a, I.be, I.colorType, K, I.count, A, R, M, j), d(I.be, l), y && d(K, y), n;
          }, t.Shader.MakeSweepGradient = function(n, a, l, y, A, M, R, j, I, K) {
            K = K || null;
            var Y = T(l), p = m(y, "HEAPF32");
            return R = R || 0, j = j || 0, I = I || 360, M = E(M), n = t.Shader._MakeSweepGradient(n, a, Y.be, Y.colorType, p, Y.count, A, j, I, R, M, K), d(Y.be, l), y && d(p, y), n;
          }, t.Shader.MakeTwoPointConicalGradient = function(n, a, l, y, A, M, R, j, I, K) {
            K = K || null;
            var Y = T(A), p = m(M, "HEAPF32");
            I = I || 0, j = E(j);
            var S = St.toTypedArray();
            return S.set(n), S.set(l, 2), n = t.Shader._MakeTwoPointConicalGradient(rt, a, y, Y.be, Y.colorType, p, Y.count, R, I, j, K), d(Y.be, A), M && d(p, M), n;
          }, t.Vertices.prototype.bounds = function(n) {
            this._bounds(rt);
            var a = St.toTypedArray();
            return n ? (n.set(a), n) : a.slice();
          }, t.Td && t.Td.forEach(function(n) {
            n();
          });
        }, t.computeTonalColors = function(i) {
          var n = m(i.ambient, "HEAPF32"), a = m(i.spot, "HEAPF32");
          this._computeTonalColors(n, a);
          var l = { ambient: H(n), spot: H(a) };
          return d(n, i.ambient), d(a, i.spot), l;
        }, t.LTRBRect = function(i, n, a, l) {
          return Float32Array.of(i, n, a, l);
        }, t.XYWHRect = function(i, n, a, l) {
          return Float32Array.of(i, n, i + a, n + l);
        }, t.LTRBiRect = function(i, n, a, l) {
          return Int32Array.of(i, n, a, l);
        }, t.XYWHiRect = function(i, n, a, l) {
          return Int32Array.of(i, n, i + a, n + l);
        }, t.RRectXY = function(i, n, a) {
          return Float32Array.of(i[0], i[1], i[2], i[3], n, a, n, a, n, a, n, a);
        }, t.MakeAnimatedImageFromEncoded = function(i) {
          i = new Uint8Array(i);
          var n = t._malloc(i.byteLength);
          return t.HEAPU8.set(i, n), (i = t._decodeAnimatedImage(
            n,
            i.byteLength
          )) ? i : null;
        }, t.MakeImageFromEncoded = function(i) {
          i = new Uint8Array(i);
          var n = t._malloc(i.byteLength);
          return t.HEAPU8.set(i, n), (i = t._decodeImage(n, i.byteLength)) ? i : null;
        };
        var me = null;
        t.MakeImageFromCanvasImageSource = function(i) {
          var n = i.width, a = i.height;
          me || (me = document.createElement("canvas")), me.width = n, me.height = a;
          var l = me.getContext("2d", { willReadFrequently: !0 });
          return l.drawImage(i, 0, 0), i = l.getImageData(0, 0, n, a), t.MakeImage({
            width: n,
            height: a,
            alphaType: t.AlphaType.Unpremul,
            colorType: t.ColorType.RGBA_8888,
            colorSpace: t.ColorSpace.SRGB
          }, i.data, 4 * n);
        }, t.MakeImage = function(i, n, a) {
          var l = t._malloc(n.length);
          return t.HEAPU8.set(n, l), t._MakeImage(i, l, n.length, a);
        }, t.MakeVertices = function(i, n, a, l, y, A) {
          var M = y && y.length || 0, R = 0;
          return a && a.length && (R |= 1), l && l.length && (R |= 2), A === void 0 || A || (R |= 4), i = new t._VerticesBuilder(i, n.length / 2, M, R), m(n, "HEAPF32", i.positions()), i.texCoords() && m(a, "HEAPF32", i.texCoords()), i.colors() && m(f(l), "HEAPU32", i.colors()), i.indices() && m(y, "HEAPU16", i.indices()), i.detach();
        }, t.Matrix = {}, t.Matrix.identity = function() {
          return r(3);
        }, t.Matrix.invert = function(i) {
          var n = i[0] * i[4] * i[8] + i[1] * i[5] * i[6] + i[2] * i[3] * i[7] - i[2] * i[4] * i[6] - i[1] * i[3] * i[8] - i[0] * i[5] * i[7];
          return n ? [(i[4] * i[8] - i[5] * i[7]) / n, (i[2] * i[7] - i[1] * i[8]) / n, (i[1] * i[5] - i[2] * i[4]) / n, (i[5] * i[6] - i[3] * i[8]) / n, (i[0] * i[8] - i[2] * i[6]) / n, (i[2] * i[3] - i[0] * i[5]) / n, (i[3] * i[7] - i[4] * i[6]) / n, (i[1] * i[6] - i[0] * i[7]) / n, (i[0] * i[4] - i[1] * i[3]) / n] : null;
        }, t.Matrix.mapPoints = function(i, n) {
          for (var a = 0; a < n.length; a += 2) {
            var l = n[a], y = n[a + 1], A = i[6] * l + i[7] * y + i[8], M = i[3] * l + i[4] * y + i[5];
            n[a] = (i[0] * l + i[1] * y + i[2]) / A, n[a + 1] = M / A;
          }
          return n;
        }, t.Matrix.multiply = function() {
          return ye(3, arguments);
        }, t.Matrix.rotated = function(i, n, a) {
          n = n || 0, a = a || 0;
          var l = Math.sin(i);
          return i = Math.cos(i), [i, -l, ot(l, a, 1 - i, n), l, i, ot(-l, n, 1 - i, a), 0, 0, 1];
        }, t.Matrix.scaled = function(i, n, a, l) {
          a = a || 0, l = l || 0;
          var y = e([i, n], r(3), 3, 0, 1);
          return e([a - i * a, l - n * l], y, 3, 2, 0);
        }, t.Matrix.skewed = function(i, n, a, l) {
          a = a || 0, l = l || 0;
          var y = e([i, n], r(3), 3, 1, -1);
          return e([-i * a, -n * l], y, 3, 2, 0);
        }, t.Matrix.translated = function(i, n) {
          return e(
            arguments,
            r(3),
            3,
            2,
            0
          );
        }, t.Vector = {}, t.Vector.dot = function(i, n) {
          return i.map(function(a, l) {
            return a * n[l];
          }).reduce(function(a, l) {
            return a + l;
          });
        }, t.Vector.lengthSquared = function(i) {
          return t.Vector.dot(i, i);
        }, t.Vector.length = function(i) {
          return Math.sqrt(t.Vector.lengthSquared(i));
        }, t.Vector.mulScalar = function(i, n) {
          return i.map(function(a) {
            return a * n;
          });
        }, t.Vector.add = function(i, n) {
          return i.map(function(a, l) {
            return a + n[l];
          });
        }, t.Vector.sub = function(i, n) {
          return i.map(function(a, l) {
            return a - n[l];
          });
        }, t.Vector.dist = function(i, n) {
          return t.Vector.length(t.Vector.sub(i, n));
        }, t.Vector.normalize = function(i) {
          return t.Vector.mulScalar(i, 1 / t.Vector.length(i));
        }, t.Vector.cross = function(i, n) {
          return [i[1] * n[2] - i[2] * n[1], i[2] * n[0] - i[0] * n[2], i[0] * n[1] - i[1] * n[0]];
        }, t.M44 = {}, t.M44.identity = function() {
          return r(4);
        }, t.M44.translated = function(i) {
          return e(i, r(4), 4, 3, 0);
        }, t.M44.scaled = function(i) {
          return e(i, r(4), 4, 0, 1);
        }, t.M44.rotated = function(i, n) {
          return t.M44.rotatedUnitSinCos(t.Vector.normalize(i), Math.sin(n), Math.cos(n));
        }, t.M44.rotatedUnitSinCos = function(i, n, a) {
          var l = i[0], y = i[1];
          i = i[2];
          var A = 1 - a;
          return [A * l * l + a, A * l * y - n * i, A * l * i + n * y, 0, A * l * y + n * i, A * y * y + a, A * y * i - n * l, 0, A * l * i - n * y, A * y * i + n * l, A * i * i + a, 0, 0, 0, 0, 1];
        }, t.M44.lookat = function(i, n, a) {
          n = t.Vector.normalize(t.Vector.sub(n, i)), a = t.Vector.normalize(a), a = t.Vector.normalize(t.Vector.cross(n, a));
          var l = t.M44.identity();
          return e(a, l, 4, 0, 0), e(t.Vector.cross(a, n), l, 4, 1, 0), e(t.Vector.mulScalar(n, -1), l, 4, 2, 0), e(i, l, 4, 3, 0), i = t.M44.invert(l), i === null ? t.M44.identity() : i;
        }, t.M44.perspective = function(i, n, a) {
          var l = 1 / (n - i);
          return a /= 2, a = Math.cos(a) / Math.sin(a), [a, 0, 0, 0, 0, a, 0, 0, 0, 0, (n + i) * l, 2 * n * i * l, 0, 0, -1, 1];
        }, t.M44.rc = function(i, n, a) {
          return i[4 * n + a];
        }, t.M44.multiply = function() {
          return ye(4, arguments);
        }, t.M44.invert = function(i) {
          var n = i[0], a = i[4], l = i[8], y = i[12], A = i[1], M = i[5], R = i[9], j = i[13], I = i[2], K = i[6], Y = i[10], p = i[14], S = i[3], D = i[7], Q = i[11];
          i = i[15];
          var nt = n * M - a * A, vt = n * R - l * A, At = n * j - y * A, ft = a * R - l * M, b = a * j - y * M, u = l * j - y * R, h = I * D - K * S, P = I * Q - Y * S, F = I * i - p * S, C = K * Q - Y * D, x = K * i - p * D, L = Y * i - p * Q, Z = nt * L - vt * x + At * C + ft * F - b * P + u * h, tt = 1 / Z;
          return Z === 0 || tt === 1 / 0 ? null : (nt *= tt, vt *= tt, At *= tt, ft *= tt, b *= tt, u *= tt, h *= tt, P *= tt, F *= tt, C *= tt, x *= tt, L *= tt, n = [M * L - R * x + j * C, R * F - A * L - j * P, A * x - M * F + j * h, M * P - A * C - R * h, l * x - a * L - y * C, n * L - l * F + y * P, a * F - n * x - y * h, n * C - a * P + l * h, D * u - Q * b + i * ft, Q * At - S * u - i * vt, S * b - D * At + i * nt, D * vt - S * ft - Q * nt, Y * b - K * u - p * ft, I * u - Y * At + p * vt, K * At - I * b - p * nt, I * ft - K * vt + Y * nt], n.every(function(Rt) {
            return !isNaN(Rt) && Rt !== 1 / 0 && Rt !== -1 / 0;
          }) ? n : null);
        }, t.M44.transpose = function(i) {
          return [
            i[0],
            i[4],
            i[8],
            i[12],
            i[1],
            i[5],
            i[9],
            i[13],
            i[2],
            i[6],
            i[10],
            i[14],
            i[3],
            i[7],
            i[11],
            i[15]
          ];
        }, t.M44.mustInvert = function(i) {
          if (i = t.M44.invert(i), i === null) throw "Matrix not invertible";
          return i;
        }, t.M44.setupCamera = function(i, n, a) {
          var l = t.M44.lookat(a.eye, a.coa, a.up);
          return a = t.M44.perspective(a.near, a.far, a.angle), n = [(i[2] - i[0]) / 2, (i[3] - i[1]) / 2, n], i = t.M44.multiply(t.M44.translated([(i[0] + i[2]) / 2, (i[1] + i[3]) / 2, 0]), t.M44.scaled(n)), t.M44.multiply(i, a, l, t.M44.mustInvert(i));
        }, t.ColorMatrix = {}, t.ColorMatrix.identity = function() {
          var i = new Float32Array(20);
          return i[0] = 1, i[6] = 1, i[12] = 1, i[18] = 1, i;
        }, t.ColorMatrix.scaled = function(i, n, a, l) {
          var y = new Float32Array(20);
          return y[0] = i, y[6] = n, y[12] = a, y[18] = l, y;
        };
        var Ai = [[6, 7, 11, 12], [0, 10, 2, 12], [0, 1, 5, 6]];
        t.ColorMatrix.rotated = function(i, n, a) {
          var l = t.ColorMatrix.identity();
          return i = Ai[i], l[i[0]] = a, l[i[1]] = n, l[i[2]] = -n, l[i[3]] = a, l;
        }, t.ColorMatrix.postTranslate = function(i, n, a, l, y) {
          return i[4] += n, i[9] += a, i[14] += l, i[19] += y, i;
        }, t.ColorMatrix.concat = function(i, n) {
          for (var a = new Float32Array(20), l = 0, y = 0; 20 > y; y += 5) {
            for (var A = 0; 4 > A; A++) a[l++] = i[y] * n[A] + i[y + 1] * n[A + 5] + i[y + 2] * n[A + 10] + i[y + 3] * n[A + 15];
            a[l++] = i[y] * n[4] + i[y + 1] * n[9] + i[y + 2] * n[14] + i[y + 3] * n[19] + i[y + 4];
          }
          return a;
        }, function(i) {
          i.Td = i.Td || [], i.Td.push(function() {
            function n(p) {
              return p && (p.dir = p.dir === 0 ? i.TextDirection.RTL : i.TextDirection.LTR), p;
            }
            function a(p) {
              if (!p || !p.length) return [];
              for (var S = [], D = 0; D < p.length; D += 5) {
                var Q = i.LTRBRect(p[D], p[D + 1], p[D + 2], p[D + 3]), nt = i.TextDirection.LTR;
                p[D + 4] === 0 && (nt = i.TextDirection.RTL), S.push({ rect: Q, dir: nt });
              }
              return i._free(p.byteOffset), S;
            }
            function l(p) {
              return p = p || {}, p.weight === void 0 && (p.weight = i.FontWeight.Normal), p.width = p.width || i.FontWidth.Normal, p.slant = p.slant || i.FontSlant.Upright, p;
            }
            function y(p) {
              if (!p || !p.length) return N;
              for (var S = [], D = 0; D < p.length; D++) {
                var Q = A(p[D]);
                S.push(Q);
              }
              return m(S, "HEAPU32");
            }
            function A(p) {
              if (j[p]) return j[p];
              var S = _t(p) + 1, D = i._malloc(S);
              return Pt(p, V, D, S), j[p] = D;
            }
            function M(p) {
              if (p._colorPtr = w(p.color), p._foregroundColorPtr = N, p._backgroundColorPtr = N, p._decorationColorPtr = N, p.foregroundColor && (p._foregroundColorPtr = w(p.foregroundColor, I)), p.backgroundColor && (p._backgroundColorPtr = w(p.backgroundColor, K)), p.decorationColor && (p._decorationColorPtr = w(p.decorationColor, Y)), Array.isArray(p.fontFamilies) && p.fontFamilies.length ? (p._fontFamiliesPtr = y(p.fontFamilies), p._fontFamiliesLen = p.fontFamilies.length) : (p._fontFamiliesPtr = N, p._fontFamiliesLen = 0), p.locale) {
                var S = p.locale;
                p._localePtr = A(S), p._localeLen = _t(S) + 1;
              } else p._localePtr = N, p._localeLen = 0;
              if (Array.isArray(p.shadows) && p.shadows.length) {
                S = p.shadows;
                var D = S.map(function(b) {
                  return b.color || i.BLACK;
                }), Q = S.map(function(b) {
                  return b.blurRadius || 0;
                });
                p._shadowLen = S.length;
                for (var nt = i._malloc(8 * S.length), vt = nt / 4, At = 0; At < S.length; At++) {
                  var ft = S[At].offset || [0, 0];
                  i.HEAPF32[vt] = ft[0], i.HEAPF32[vt + 1] = ft[1], vt += 2;
                }
                p._shadowColorsPtr = T(D).be, p._shadowOffsetsPtr = nt, p._shadowBlurRadiiPtr = m(Q, "HEAPF32");
              } else p._shadowLen = 0, p._shadowColorsPtr = N, p._shadowOffsetsPtr = N, p._shadowBlurRadiiPtr = N;
              Array.isArray(p.fontFeatures) && p.fontFeatures.length ? (S = p.fontFeatures, D = S.map(function(b) {
                return b.name;
              }), Q = S.map(function(b) {
                return b.value;
              }), p._fontFeatureLen = S.length, p._fontFeatureNamesPtr = y(D), p._fontFeatureValuesPtr = m(Q, "HEAPU32")) : (p._fontFeatureLen = 0, p._fontFeatureNamesPtr = N, p._fontFeatureValuesPtr = N), Array.isArray(p.fontVariations) && p.fontVariations.length ? (S = p.fontVariations, D = S.map(function(b) {
                return b.axis;
              }), Q = S.map(function(b) {
                return b.value;
              }), p._fontVariationLen = S.length, p._fontVariationAxesPtr = y(D), p._fontVariationValuesPtr = m(Q, "HEAPF32")) : (p._fontVariationLen = 0, p._fontVariationAxesPtr = N, p._fontVariationValuesPtr = N);
            }
            function R(p) {
              i._free(p._fontFamiliesPtr), i._free(p._shadowColorsPtr), i._free(p._shadowOffsetsPtr), i._free(p._shadowBlurRadiiPtr), i._free(p._fontFeatureNamesPtr), i._free(p._fontFeatureValuesPtr), i._free(p._fontVariationAxesPtr), i._free(p._fontVariationValuesPtr);
            }
            i.Paragraph.prototype.getRectsForRange = function(p, S, D, Q) {
              return p = this._getRectsForRange(p, S, D, Q), a(p);
            }, i.Paragraph.prototype.getRectsForPlaceholders = function() {
              var p = this._getRectsForPlaceholders();
              return a(p);
            }, i.Paragraph.prototype.getGlyphInfoAt = function(p) {
              return n(this._getGlyphInfoAt(p));
            }, i.Paragraph.prototype.getClosestGlyphInfoAtCoordinate = function(p, S) {
              return n(this._getClosestGlyphInfoAtCoordinate(p, S));
            }, i.TypefaceFontProvider.prototype.registerFont = function(p, S) {
              if (p = i.Typeface.MakeFreeTypeFaceFromData(p), !p) return null;
              S = A(S), this._registerFont(p, S);
            }, i.ParagraphStyle = function(p) {
              if (p.disableHinting = p.disableHinting || !1, p.ellipsis) {
                var S = p.ellipsis;
                p._ellipsisPtr = A(S), p._ellipsisLen = _t(S) + 1;
              } else p._ellipsisPtr = N, p._ellipsisLen = 0;
              return p.heightMultiplier == null && (p.heightMultiplier = -1), p.maxLines = p.maxLines || 0, p.replaceTabCharacters = p.replaceTabCharacters || !1, S = (S = p.strutStyle) || {}, S.strutEnabled = S.strutEnabled || !1, S.strutEnabled && Array.isArray(S.fontFamilies) && S.fontFamilies.length ? (S._fontFamiliesPtr = y(S.fontFamilies), S._fontFamiliesLen = S.fontFamilies.length) : (S._fontFamiliesPtr = N, S._fontFamiliesLen = 0), S.fontStyle = l(S.fontStyle), S.fontSize == null && (S.fontSize = -1), S.heightMultiplier == null && (S.heightMultiplier = -1), S.halfLeading = S.halfLeading || !1, S.leading = S.leading || 0, S.forceStrutHeight = S.forceStrutHeight || !1, p.strutStyle = S, p.textAlign = p.textAlign || i.TextAlign.Start, p.textDirection = p.textDirection || i.TextDirection.LTR, p.textHeightBehavior = p.textHeightBehavior || i.TextHeightBehavior.All, p.textStyle = i.TextStyle(p.textStyle), p.applyRoundingHack = p.applyRoundingHack !== !1, p;
            }, i.TextStyle = function(p) {
              return p.color || (p.color = i.BLACK), p.decoration = p.decoration || 0, p.decorationThickness = p.decorationThickness || 0, p.decorationStyle = p.decorationStyle || i.DecorationStyle.Solid, p.textBaseline = p.textBaseline || i.TextBaseline.Alphabetic, p.fontSize == null && (p.fontSize = -1), p.letterSpacing = p.letterSpacing || 0, p.wordSpacing = p.wordSpacing || 0, p.heightMultiplier == null && (p.heightMultiplier = -1), p.halfLeading = p.halfLeading || !1, p.fontStyle = l(p.fontStyle), p;
            };
            var j = {}, I = i._malloc(16), K = i._malloc(16), Y = i._malloc(16);
            i.ParagraphBuilder.Make = function(p, S) {
              return M(p.textStyle), S = i.ParagraphBuilder._Make(p, S), R(p.textStyle), S;
            }, i.ParagraphBuilder.MakeFromFontProvider = function(p, S) {
              return M(p.textStyle), S = i.ParagraphBuilder._MakeFromFontProvider(p, S), R(p.textStyle), S;
            }, i.ParagraphBuilder.MakeFromFontCollection = function(p, S) {
              return M(p.textStyle), S = i.ParagraphBuilder._MakeFromFontCollection(p, S), R(p.textStyle), S;
            }, i.ParagraphBuilder.ShapeText = function(p, S, D) {
              let Q = 0;
              for (const nt of S) Q += nt.length;
              if (Q !== p.length) throw "Accumulated block lengths must equal text.length";
              return i.ParagraphBuilder._ShapeText(p, S, D);
            }, i.ParagraphBuilder.prototype.pushStyle = function(p) {
              M(p), this._pushStyle(p), R(p);
            }, i.ParagraphBuilder.prototype.pushPaintStyle = function(p, S, D) {
              M(p), this._pushPaintStyle(p, S, D), R(p);
            }, i.ParagraphBuilder.prototype.addPlaceholder = function(p, S, D, Q, nt) {
              D = D || i.PlaceholderAlignment.Baseline, Q = Q || i.TextBaseline.Alphabetic, this._addPlaceholder(p || 0, S || 0, D, Q, nt || 0);
            }, i.ParagraphBuilder.prototype.setWordsUtf8 = function(p) {
              var S = m(p, "HEAPU32");
              this._setWordsUtf8(S, p && p.length || 0), d(S, p);
            }, i.ParagraphBuilder.prototype.setWordsUtf16 = function(p) {
              var S = m(p, "HEAPU32");
              this._setWordsUtf16(
                S,
                p && p.length || 0
              ), d(S, p);
            }, i.ParagraphBuilder.prototype.setGraphemeBreaksUtf8 = function(p) {
              var S = m(p, "HEAPU32");
              this._setGraphemeBreaksUtf8(S, p && p.length || 0), d(S, p);
            }, i.ParagraphBuilder.prototype.setGraphemeBreaksUtf16 = function(p) {
              var S = m(p, "HEAPU32");
              this._setGraphemeBreaksUtf16(S, p && p.length || 0), d(S, p);
            }, i.ParagraphBuilder.prototype.setLineBreaksUtf8 = function(p) {
              var S = m(p, "HEAPU32");
              this._setLineBreaksUtf8(S, p && p.length || 0), d(S, p);
            }, i.ParagraphBuilder.prototype.setLineBreaksUtf16 = function(p) {
              var S = m(
                p,
                "HEAPU32"
              );
              this._setLineBreaksUtf16(S, p && p.length || 0), d(S, p);
            };
          });
        }(_), t.Td = t.Td || [], t.Td.push(function() {
          t.Path.prototype.op = function(i, n) {
            return this._op(i, n) ? this : null;
          }, t.Path.prototype.simplify = function() {
            return this._simplify() ? this : null;
          };
        }), t.Td = t.Td || [], t.Td.push(function() {
          t.Canvas.prototype.drawText = function(i, n, a, l, y) {
            var A = _t(i), M = t._malloc(A + 1);
            Pt(i, V, M, A + 1), this._drawSimpleText(M, A, n, a, y, l), t._free(M);
          }, t.Canvas.prototype.drawGlyphs = function(i, n, a, l, y, A) {
            if (!(2 * i.length <= n.length)) throw "Not enough positions for the array of gyphs";
            t.Md(this.Kd);
            const M = m(i, "HEAPU16"), R = m(n, "HEAPF32");
            this._drawGlyphs(i.length, M, R, a, l, y, A), d(R, n), d(M, i);
          }, t.Font.prototype.getGlyphBounds = function(i, n, a) {
            var l = m(i, "HEAPU16"), y = t._malloc(16 * i.length);
            return this._getGlyphWidthBounds(l, i.length, N, y, n || null), n = new Float32Array(t.HEAPU8.buffer, y, 4 * i.length), d(l, i), a ? (a.set(n), t._free(y), a) : (i = Float32Array.from(n), t._free(y), i);
          }, t.Font.prototype.getGlyphIDs = function(i, n, a) {
            n || (n = i.length);
            var l = _t(i) + 1, y = t._malloc(l);
            return Pt(i, V, y, l), i = t._malloc(2 * n), n = this._getGlyphIDs(y, l - 1, n, i), t._free(y), 0 > n ? (t._free(i), null) : (y = new Uint16Array(t.HEAPU8.buffer, i, n), a ? (a.set(y), t._free(i), a) : (a = Uint16Array.from(y), t._free(i), a));
          }, t.Font.prototype.getGlyphIntercepts = function(i, n, a, l) {
            var y = m(i, "HEAPU16"), A = m(n, "HEAPF32");
            return this._getGlyphIntercepts(y, i.length, !(i && i._ck), A, n.length, !(n && n._ck), a, l);
          }, t.Font.prototype.getGlyphWidths = function(i, n, a) {
            var l = m(i, "HEAPU16"), y = t._malloc(4 * i.length);
            return this._getGlyphWidthBounds(
              l,
              i.length,
              y,
              N,
              n || null
            ), n = new Float32Array(t.HEAPU8.buffer, y, i.length), d(l, i), a ? (a.set(n), t._free(y), a) : (i = Float32Array.from(n), t._free(y), i);
          }, t.FontMgr.FromData = function() {
            if (!arguments.length) return null;
            var i = arguments;
            if (i.length === 1 && Array.isArray(i[0]) && (i = arguments[0]), !i.length) return null;
            for (var n = [], a = [], l = 0; l < i.length; l++) {
              var y = new Uint8Array(i[l]), A = m(y, "HEAPU8");
              n.push(A), a.push(y.byteLength);
            }
            return n = m(n, "HEAPU32"), a = m(a, "HEAPU32"), i = t.FontMgr._fromData(n, a, i.length), t._free(n), t._free(a), i;
          }, t.Typeface.MakeFreeTypeFaceFromData = function(i) {
            i = new Uint8Array(i);
            var n = m(i, "HEAPU8");
            return (i = t.Typeface._MakeFreeTypeFaceFromData(n, i.byteLength)) ? i : null;
          }, t.Typeface.prototype.getGlyphIDs = function(i, n, a) {
            n || (n = i.length);
            var l = _t(i) + 1, y = t._malloc(l);
            return Pt(i, V, y, l), i = t._malloc(2 * n), n = this._getGlyphIDs(y, l - 1, n, i), t._free(y), 0 > n ? (t._free(i), null) : (y = new Uint16Array(t.HEAPU8.buffer, i, n), a ? (a.set(y), t._free(i), a) : (a = Uint16Array.from(y), t._free(i), a));
          }, t.TextBlob.MakeOnPath = function(i, n, a, l) {
            if (i && i.length && n && n.countPoints()) {
              if (n.countPoints() === 1) return this.MakeFromText(i, a);
              l || (l = 0);
              var y = a.getGlyphIDs(i);
              y = a.getGlyphWidths(y);
              var A = [];
              n = new t.ContourMeasureIter(n, !1, 1);
              for (var M = n.next(), R = new Float32Array(4), j = 0; j < i.length && M; j++) {
                var I = y[j];
                if (l += I / 2, l > M.length()) {
                  if (M.delete(), M = n.next(), !M) {
                    i = i.substring(0, j);
                    break;
                  }
                  l = I / 2;
                }
                M.getPosTan(l, R);
                var K = R[2], Y = R[3];
                A.push(K, Y, R[0] - I / 2 * K, R[1] - I / 2 * Y), l += I / 2;
              }
              return i = this.MakeFromRSXform(i, A, a), M && M.delete(), n.delete(), i;
            }
          }, t.TextBlob.MakeFromRSXform = function(i, n, a) {
            var l = _t(i) + 1, y = t._malloc(l);
            return Pt(i, V, y, l), i = m(n, "HEAPF32"), a = t.TextBlob._MakeFromRSXform(y, l - 1, i, a), t._free(y), a || null;
          }, t.TextBlob.MakeFromRSXformGlyphs = function(i, n, a) {
            var l = m(i, "HEAPU16");
            return n = m(n, "HEAPF32"), a = t.TextBlob._MakeFromRSXformGlyphs(l, 2 * i.length, n, a), d(l, i), a || null;
          }, t.TextBlob.MakeFromGlyphs = function(i, n) {
            var a = m(i, "HEAPU16");
            return n = t.TextBlob._MakeFromGlyphs(a, 2 * i.length, n), d(a, i), n || null;
          }, t.TextBlob.MakeFromText = function(i, n) {
            var a = _t(i) + 1, l = t._malloc(a);
            return Pt(i, V, l, a), i = t.TextBlob._MakeFromText(l, a - 1, n), t._free(l), i || null;
          }, t.MallocGlyphIDs = function(i) {
            return t.Malloc(Uint16Array, i);
          };
        }), t.Td = t.Td || [], t.Td.push(function() {
          t.MakePicture = function(i) {
            i = new Uint8Array(i);
            var n = t._malloc(i.byteLength);
            return t.HEAPU8.set(i, n), (i = t._MakePicture(n, i.byteLength)) ? i : null;
          };
        }), t.Td = t.Td || [], t.Td.push(function() {
          t.RuntimeEffect.Make = function(i, n) {
            return t.RuntimeEffect._Make(i, { onError: n || function(a) {
              console.log(
                "RuntimeEffect error",
                a
              );
            } });
          }, t.RuntimeEffect.MakeForBlender = function(i, n) {
            return t.RuntimeEffect._MakeForBlender(i, { onError: n || function(a) {
              console.log("RuntimeEffect error", a);
            } });
          }, t.RuntimeEffect.prototype.makeShader = function(i, n) {
            var a = !i._ck, l = m(i, "HEAPF32");
            return n = E(n), this._makeShader(l, 4 * i.length, a, n);
          }, t.RuntimeEffect.prototype.makeShaderWithChildren = function(i, n, a) {
            var l = !i._ck, y = m(i, "HEAPF32");
            a = E(a);
            for (var A = [], M = 0; M < n.length; M++) A.push(n[M].Jd.Rd);
            return n = m(A, "HEAPU32"), this._makeShaderWithChildren(
              y,
              4 * i.length,
              l,
              n,
              A.length,
              a
            );
          }, t.RuntimeEffect.prototype.makeBlender = function(i) {
            var n = !i._ck, a = m(i, "HEAPF32");
            return this._makeBlender(a, 4 * i.length, n);
          };
        }), function() {
          function i(b) {
            for (var u = 0; u < b.length; u++) if (b[u] !== void 0 && !Number.isFinite(b[u])) return !1;
            return !0;
          }
          function n(b) {
            var u = t.getColorComponents(b);
            b = u[0];
            var h = u[1], P = u[2];
            return u = u[3], u === 1 ? (b = b.toString(16).toLowerCase(), h = h.toString(16).toLowerCase(), P = P.toString(16).toLowerCase(), b = b.length === 1 ? "0" + b : b, h = h.length === 1 ? "0" + h : h, P = P.length === 1 ? "0" + P : P, "#" + b + h + P) : (u = u === 0 || u === 1 ? u : u.toFixed(8), "rgba(" + b + ", " + h + ", " + P + ", " + u + ")");
          }
          function a(b) {
            return t.parseColorString(b, vt);
          }
          function l(b) {
            if (b = At.exec(b), !b) return null;
            var u = parseFloat(b[4]), h = 16;
            switch (b[5]) {
              case "em":
              case "rem":
                h = 16 * u;
                break;
              case "pt":
                h = 4 * u / 3;
                break;
              case "px":
                h = u;
                break;
              case "pc":
                h = 16 * u;
                break;
              case "in":
                h = 96 * u;
                break;
              case "cm":
                h = 96 * u / 2.54;
                break;
              case "mm":
                h = 3.7795275590551185 * u;
                break;
              case "q":
                h = 0.9448818897637796 * u;
                break;
              case "%":
                h = 0.21333333333333335 * u;
            }
            return { style: b[1], variant: b[2], weight: b[3], sizePx: h, family: b[6].trim() };
          }
          function y(b) {
            this.Ld = b, this.Od = new t.Paint(), this.Od.setAntiAlias(!0), this.Od.setStrokeMiter(10), this.Od.setStrokeCap(t.StrokeCap.Butt), this.Od.setStrokeJoin(t.StrokeJoin.Miter), this.Re = "10px monospace", this.me = new t.Font(null, 10), this.me.setSubpixel(!0), this.ae = this.ge = t.BLACK, this.ve = 0, this.Je = t.TRANSPARENT, this.xe = this.we = 0, this.Ke = this.ie = 1, this.Ie = 0, this.ue = [], this.Nd = t.BlendMode.SrcOver, this.Od.setStrokeWidth(this.Ke), this.Od.setBlendMode(this.Nd), this.Qd = new t.Path(), this.Sd = t.Matrix.identity(), this.lf = [], this.Be = [], this.le = function() {
              this.Qd.delete(), this.Od.delete(), this.me.delete(), this.Be.forEach(function(u) {
                u.le();
              });
            }, Object.defineProperty(this, "currentTransform", { enumerable: !0, get: function() {
              return { a: this.Sd[0], c: this.Sd[1], e: this.Sd[2], b: this.Sd[3], d: this.Sd[4], f: this.Sd[5] };
            }, set: function(u) {
              u.a && this.setTransform(u.a, u.b, u.c, u.d, u.e, u.f);
            } }), Object.defineProperty(this, "fillStyle", { enumerable: !0, get: function() {
              return o(this.ae) ? n(this.ae) : this.ae;
            }, set: function(u) {
              typeof u == "string" ? this.ae = a(u) : u.te && (this.ae = u);
            } }), Object.defineProperty(this, "font", { enumerable: !0, get: function() {
              return this.Re;
            }, set: function(u) {
              var h = l(u), P = h.family;
              h.typeface = ft[P] ? ft[P][(h.style || "normal") + "|" + (h.variant || "normal") + "|" + (h.weight || "normal")] || ft[P]["*"] : null, h && (this.me.setSize(h.sizePx), this.me.setTypeface(h.typeface), this.Re = u);
            } }), Object.defineProperty(this, "globalAlpha", { enumerable: !0, get: function() {
              return this.ie;
            }, set: function(u) {
              !isFinite(u) || 0 > u || 1 < u || (this.ie = u);
            } }), Object.defineProperty(
              this,
              "globalCompositeOperation",
              { enumerable: !0, get: function() {
                switch (this.Nd) {
                  case t.BlendMode.SrcOver:
                    return "source-over";
                  case t.BlendMode.DstOver:
                    return "destination-over";
                  case t.BlendMode.Src:
                    return "copy";
                  case t.BlendMode.Dst:
                    return "destination";
                  case t.BlendMode.Clear:
                    return "clear";
                  case t.BlendMode.SrcIn:
                    return "source-in";
                  case t.BlendMode.DstIn:
                    return "destination-in";
                  case t.BlendMode.SrcOut:
                    return "source-out";
                  case t.BlendMode.DstOut:
                    return "destination-out";
                  case t.BlendMode.SrcATop:
                    return "source-atop";
                  case t.BlendMode.DstATop:
                    return "destination-atop";
                  case t.BlendMode.Xor:
                    return "xor";
                  case t.BlendMode.Plus:
                    return "lighter";
                  case t.BlendMode.Multiply:
                    return "multiply";
                  case t.BlendMode.Screen:
                    return "screen";
                  case t.BlendMode.Overlay:
                    return "overlay";
                  case t.BlendMode.Darken:
                    return "darken";
                  case t.BlendMode.Lighten:
                    return "lighten";
                  case t.BlendMode.ColorDodge:
                    return "color-dodge";
                  case t.BlendMode.ColorBurn:
                    return "color-burn";
                  case t.BlendMode.HardLight:
                    return "hard-light";
                  case t.BlendMode.SoftLight:
                    return "soft-light";
                  case t.BlendMode.Difference:
                    return "difference";
                  case t.BlendMode.Exclusion:
                    return "exclusion";
                  case t.BlendMode.Hue:
                    return "hue";
                  case t.BlendMode.Saturation:
                    return "saturation";
                  case t.BlendMode.Color:
                    return "color";
                  case t.BlendMode.Luminosity:
                    return "luminosity";
                }
              }, set: function(u) {
                switch (u) {
                  case "source-over":
                    this.Nd = t.BlendMode.SrcOver;
                    break;
                  case "destination-over":
                    this.Nd = t.BlendMode.DstOver;
                    break;
                  case "copy":
                    this.Nd = t.BlendMode.Src;
                    break;
                  case "destination":
                    this.Nd = t.BlendMode.Dst;
                    break;
                  case "clear":
                    this.Nd = t.BlendMode.Clear;
                    break;
                  case "source-in":
                    this.Nd = t.BlendMode.SrcIn;
                    break;
                  case "destination-in":
                    this.Nd = t.BlendMode.DstIn;
                    break;
                  case "source-out":
                    this.Nd = t.BlendMode.SrcOut;
                    break;
                  case "destination-out":
                    this.Nd = t.BlendMode.DstOut;
                    break;
                  case "source-atop":
                    this.Nd = t.BlendMode.SrcATop;
                    break;
                  case "destination-atop":
                    this.Nd = t.BlendMode.DstATop;
                    break;
                  case "xor":
                    this.Nd = t.BlendMode.Xor;
                    break;
                  case "lighter":
                    this.Nd = t.BlendMode.Plus;
                    break;
                  case "plus-lighter":
                    this.Nd = t.BlendMode.Plus;
                    break;
                  case "plus-darker":
                    throw "plus-darker is not supported";
                  case "multiply":
                    this.Nd = t.BlendMode.Multiply;
                    break;
                  case "screen":
                    this.Nd = t.BlendMode.Screen;
                    break;
                  case "overlay":
                    this.Nd = t.BlendMode.Overlay;
                    break;
                  case "darken":
                    this.Nd = t.BlendMode.Darken;
                    break;
                  case "lighten":
                    this.Nd = t.BlendMode.Lighten;
                    break;
                  case "color-dodge":
                    this.Nd = t.BlendMode.ColorDodge;
                    break;
                  case "color-burn":
                    this.Nd = t.BlendMode.ColorBurn;
                    break;
                  case "hard-light":
                    this.Nd = t.BlendMode.HardLight;
                    break;
                  case "soft-light":
                    this.Nd = t.BlendMode.SoftLight;
                    break;
                  case "difference":
                    this.Nd = t.BlendMode.Difference;
                    break;
                  case "exclusion":
                    this.Nd = t.BlendMode.Exclusion;
                    break;
                  case "hue":
                    this.Nd = t.BlendMode.Hue;
                    break;
                  case "saturation":
                    this.Nd = t.BlendMode.Saturation;
                    break;
                  case "color":
                    this.Nd = t.BlendMode.Color;
                    break;
                  case "luminosity":
                    this.Nd = t.BlendMode.Luminosity;
                    break;
                  default:
                    return;
                }
                this.Od.setBlendMode(this.Nd);
              } }
            ), Object.defineProperty(this, "imageSmoothingEnabled", { enumerable: !0, get: function() {
              return !0;
            }, set: function() {
            } }), Object.defineProperty(this, "imageSmoothingQuality", {
              enumerable: !0,
              get: function() {
                return "high";
              },
              set: function() {
              }
            }), Object.defineProperty(this, "lineCap", { enumerable: !0, get: function() {
              switch (this.Od.getStrokeCap()) {
                case t.StrokeCap.Butt:
                  return "butt";
                case t.StrokeCap.Round:
                  return "round";
                case t.StrokeCap.Square:
                  return "square";
              }
            }, set: function(u) {
              switch (u) {
                case "butt":
                  this.Od.setStrokeCap(t.StrokeCap.Butt);
                  break;
                case "round":
                  this.Od.setStrokeCap(t.StrokeCap.Round);
                  break;
                case "square":
                  this.Od.setStrokeCap(t.StrokeCap.Square);
              }
            } }), Object.defineProperty(this, "lineDashOffset", {
              enumerable: !0,
              get: function() {
                return this.Ie;
              },
              set: function(u) {
                isFinite(u) && (this.Ie = u);
              }
            }), Object.defineProperty(this, "lineJoin", { enumerable: !0, get: function() {
              switch (this.Od.getStrokeJoin()) {
                case t.StrokeJoin.Miter:
                  return "miter";
                case t.StrokeJoin.Round:
                  return "round";
                case t.StrokeJoin.Bevel:
                  return "bevel";
              }
            }, set: function(u) {
              switch (u) {
                case "miter":
                  this.Od.setStrokeJoin(t.StrokeJoin.Miter);
                  break;
                case "round":
                  this.Od.setStrokeJoin(t.StrokeJoin.Round);
                  break;
                case "bevel":
                  this.Od.setStrokeJoin(t.StrokeJoin.Bevel);
              }
            } }), Object.defineProperty(
              this,
              "lineWidth",
              { enumerable: !0, get: function() {
                return this.Od.getStrokeWidth();
              }, set: function(u) {
                0 >= u || !u || (this.Ke = u, this.Od.setStrokeWidth(u));
              } }
            ), Object.defineProperty(this, "miterLimit", { enumerable: !0, get: function() {
              return this.Od.getStrokeMiter();
            }, set: function(u) {
              0 >= u || !u || this.Od.setStrokeMiter(u);
            } }), Object.defineProperty(this, "shadowBlur", { enumerable: !0, get: function() {
              return this.ve;
            }, set: function(u) {
              0 > u || !isFinite(u) || (this.ve = u);
            } }), Object.defineProperty(this, "shadowColor", {
              enumerable: !0,
              get: function() {
                return n(this.Je);
              },
              set: function(u) {
                this.Je = a(u);
              }
            }), Object.defineProperty(this, "shadowOffsetX", { enumerable: !0, get: function() {
              return this.we;
            }, set: function(u) {
              isFinite(u) && (this.we = u);
            } }), Object.defineProperty(this, "shadowOffsetY", { enumerable: !0, get: function() {
              return this.xe;
            }, set: function(u) {
              isFinite(u) && (this.xe = u);
            } }), Object.defineProperty(this, "strokeStyle", { enumerable: !0, get: function() {
              return n(this.ge);
            }, set: function(u) {
              typeof u == "string" ? this.ge = a(u) : u.te && (this.ge = u);
            } }), this.arc = function(u, h, P, F, C, x) {
              p(
                this.Qd,
                u,
                h,
                P,
                P,
                0,
                F,
                C,
                x
              );
            }, this.arcTo = function(u, h, P, F, C) {
              I(this.Qd, u, h, P, F, C);
            }, this.beginPath = function() {
              this.Qd.delete(), this.Qd = new t.Path();
            }, this.bezierCurveTo = function(u, h, P, F, C, x) {
              var L = this.Qd;
              i([u, h, P, F, C, x]) && (L.isEmpty() && L.moveTo(u, h), L.cubicTo(u, h, P, F, C, x));
            }, this.clearRect = function(u, h, P, F) {
              this.Od.setStyle(t.PaintStyle.Fill), this.Od.setBlendMode(t.BlendMode.Clear), this.Ld.drawRect(t.XYWHRect(u, h, P, F), this.Od), this.Od.setBlendMode(this.Nd);
            }, this.clip = function(u, h) {
              typeof u == "string" ? (h = u, u = this.Qd) : u && u.af && (u = u.Ud), u || (u = this.Qd), u = u.copy(), h && h.toLowerCase() === "evenodd" ? u.setFillType(t.FillType.EvenOdd) : u.setFillType(t.FillType.Winding), this.Ld.clipPath(u, t.ClipOp.Intersect, !0), u.delete();
            }, this.closePath = function() {
              K(this.Qd);
            }, this.createImageData = function() {
              if (arguments.length === 1) {
                var u = arguments[0];
                return new R(new Uint8ClampedArray(4 * u.width * u.height), u.width, u.height);
              }
              if (arguments.length === 2) {
                u = arguments[0];
                var h = arguments[1];
                return new R(new Uint8ClampedArray(4 * u * h), u, h);
              }
              throw "createImageData expects 1 or 2 arguments, got " + arguments.length;
            }, this.createLinearGradient = function(u, h, P, F) {
              if (i(arguments)) {
                var C = new j(u, h, P, F);
                return this.Be.push(C), C;
              }
            }, this.createPattern = function(u, h) {
              return u = new Q(u, h), this.Be.push(u), u;
            }, this.createRadialGradient = function(u, h, P, F, C, x) {
              if (i(arguments)) {
                var L = new nt(u, h, P, F, C, x);
                return this.Be.push(L), L;
              }
            }, this.drawImage = function(u) {
              u instanceof M && (u = u.tf());
              var h = this.Qe();
              if (arguments.length === 3 || arguments.length === 5) var P = t.XYWHRect(
                arguments[1],
                arguments[2],
                arguments[3] || u.width(),
                arguments[4] || u.height()
              ), F = t.XYWHRect(0, 0, u.width(), u.height());
              else if (arguments.length === 9) P = t.XYWHRect(arguments[5], arguments[6], arguments[7], arguments[8]), F = t.XYWHRect(arguments[1], arguments[2], arguments[3], arguments[4]);
              else throw "invalid number of args for drawImage, need 3, 5, or 9; got " + arguments.length;
              this.Ld.drawImageRect(u, F, P, h, !1), h.dispose();
            }, this.ellipse = function(u, h, P, F, C, x, L, Z) {
              p(this.Qd, u, h, P, F, C, x, L, Z);
            }, this.Qe = function() {
              var u = this.Od.copy();
              if (u.setStyle(t.PaintStyle.Fill), o(this.ae)) {
                var h = t.multiplyByAlpha(this.ae, this.ie);
                u.setColor(h);
              } else h = this.ae.te(this.Sd), u.setColor(t.Color(0, 0, 0, this.ie)), u.setShader(h);
              return u.dispose = function() {
                this.delete();
              }, u;
            }, this.fill = function(u, h) {
              if (typeof u == "string" ? (h = u, u = this.Qd) : u && u.af && (u = u.Ud), h === "evenodd") this.Qd.setFillType(t.FillType.EvenOdd);
              else {
                if (h !== "nonzero" && h) throw "invalid fill rule";
                this.Qd.setFillType(t.FillType.Winding);
              }
              u || (u = this.Qd), h = this.Qe();
              var P = this.ye(h);
              P && (this.Ld.save(), this.re(), this.Ld.drawPath(
                u,
                P
              ), this.Ld.restore(), P.dispose()), this.Ld.drawPath(u, h), h.dispose();
            }, this.fillRect = function(u, h, P, F) {
              var C = this.Qe(), x = this.ye(C);
              x && (this.Ld.save(), this.re(), this.Ld.drawRect(t.XYWHRect(u, h, P, F), x), this.Ld.restore(), x.dispose()), this.Ld.drawRect(t.XYWHRect(u, h, P, F), C), C.dispose();
            }, this.fillText = function(u, h, P) {
              var F = this.Qe();
              u = t.TextBlob.MakeFromText(u, this.me);
              var C = this.ye(F);
              C && (this.Ld.save(), this.re(), this.Ld.drawTextBlob(u, h, P, C), this.Ld.restore(), C.dispose()), this.Ld.drawTextBlob(u, h, P, F), u.delete(), F.dispose();
            }, this.getImageData = function(u, h, P, F) {
              return (u = this.Ld.readPixels(u, h, { width: P, height: F, colorType: t.ColorType.RGBA_8888, alphaType: t.AlphaType.Unpremul, colorSpace: t.ColorSpace.SRGB })) ? new R(new Uint8ClampedArray(u.buffer), P, F) : null;
            }, this.getLineDash = function() {
              return this.ue.slice();
            }, this.mf = function(u) {
              var h = t.Matrix.invert(this.Sd);
              return t.Matrix.mapPoints(h, u), u;
            }, this.isPointInPath = function(u, h, P) {
              var F = arguments;
              if (F.length === 3) var C = this.Qd;
              else if (F.length === 4) C = F[0], u = F[1], h = F[2], P = F[3];
              else throw "invalid arg count, need 3 or 4, got " + F.length;
              return !isFinite(u) || !isFinite(h) || (P = P || "nonzero", P !== "nonzero" && P !== "evenodd") ? !1 : (F = this.mf([u, h]), u = F[0], h = F[1], C.setFillType(P === "nonzero" ? t.FillType.Winding : t.FillType.EvenOdd), C.contains(u, h));
            }, this.isPointInStroke = function(u, h) {
              var P = arguments;
              if (P.length === 2) var F = this.Qd;
              else if (P.length === 3) F = P[0], u = P[1], h = P[2];
              else throw "invalid arg count, need 2 or 3, got " + P.length;
              return !isFinite(u) || !isFinite(h) ? !1 : (P = this.mf([u, h]), u = P[0], h = P[1], F = F.copy(), F.setFillType(t.FillType.Winding), F.stroke({ width: this.lineWidth, miter_limit: this.miterLimit, cap: this.Od.getStrokeCap(), join: this.Od.getStrokeJoin(), precision: 0.3 }), P = F.contains(u, h), F.delete(), P);
            }, this.lineTo = function(u, h) {
              S(this.Qd, u, h);
            }, this.measureText = function(u) {
              u = this.me.getGlyphIDs(u), u = this.me.getGlyphWidths(u);
              let h = 0;
              for (const P of u) h += P;
              return { width: h };
            }, this.moveTo = function(u, h) {
              var P = this.Qd;
              i([u, h]) && P.moveTo(u, h);
            }, this.putImageData = function(u, h, P, F, C, x, L) {
              if (i([h, P, F, C, x, L])) {
                if (F === void 0) this.Ld.writePixels(u.data, u.width, u.height, h, P);
                else if (F = F || 0, C = C || 0, x = x || u.width, L = L || u.height, 0 > x && (F += x, x = Math.abs(x)), 0 > L && (C += L, L = Math.abs(L)), 0 > F && (x += F, F = 0), 0 > C && (L += C, C = 0), !(0 >= x || 0 >= L)) {
                  u = t.MakeImage({ width: u.width, height: u.height, alphaType: t.AlphaType.Unpremul, colorType: t.ColorType.RGBA_8888, colorSpace: t.ColorSpace.SRGB }, u.data, 4 * u.width);
                  var Z = t.XYWHRect(F, C, x, L);
                  h = t.XYWHRect(h + F, P + C, x, L), P = t.Matrix.invert(this.Sd), this.Ld.save(), this.Ld.concat(P), this.Ld.drawImageRect(u, Z, h, null, !1), this.Ld.restore(), u.delete();
                }
              }
            }, this.quadraticCurveTo = function(u, h, P, F) {
              var C = this.Qd;
              i([u, h, P, F]) && (C.isEmpty() && C.moveTo(u, h), C.quadTo(u, h, P, F));
            }, this.rect = function(u, h, P, F) {
              var C = this.Qd;
              u = t.XYWHRect(u, h, P, F), i(u) && C.addRect(u);
            }, this.resetTransform = function() {
              this.Qd.transform(this.Sd);
              var u = t.Matrix.invert(this.Sd);
              this.Ld.concat(u), this.Sd = this.Ld.getTotalMatrix();
            }, this.restore = function() {
              var u = this.lf.pop();
              if (u) {
                var h = t.Matrix.multiply(this.Sd, t.Matrix.invert(u.Jf));
                this.Qd.transform(h), this.Od.delete(), this.Od = u.ag, this.ue = u.Zf, this.Ke = u.mg, this.ge = u.lg, this.ae = u.fs, this.we = u.jg, this.xe = u.kg, this.ve = u.sb, this.Je = u.ig, this.ie = u.ga, this.Nd = u.Qf, this.Ie = u.$f, this.Re = u.Pf, this.Ld.restore(), this.Sd = this.Ld.getTotalMatrix();
              }
            }, this.rotate = function(u) {
              if (isFinite(u)) {
                var h = t.Matrix.rotated(-u);
                this.Qd.transform(h), this.Ld.rotate(u / Math.PI * 180, 0, 0), this.Sd = this.Ld.getTotalMatrix();
              }
            }, this.save = function() {
              if (this.ae.se) {
                var u = this.ae.se();
                this.Be.push(u);
              } else u = this.ae;
              if (this.ge.se) {
                var h = this.ge.se();
                this.Be.push(h);
              } else h = this.ge;
              this.lf.push({ Jf: this.Sd.slice(), Zf: this.ue.slice(), mg: this.Ke, lg: h, fs: u, jg: this.we, kg: this.xe, sb: this.ve, ig: this.Je, ga: this.ie, $f: this.Ie, Qf: this.Nd, ag: this.Od.copy(), Pf: this.Re }), this.Ld.save();
            }, this.scale = function(u, h) {
              if (i(arguments)) {
                var P = t.Matrix.scaled(1 / u, 1 / h);
                this.Qd.transform(P), this.Ld.scale(u, h), this.Sd = this.Ld.getTotalMatrix();
              }
            }, this.setLineDash = function(u) {
              for (var h = 0; h < u.length; h++) if (!isFinite(u[h]) || 0 > u[h]) return;
              u.length % 2 === 1 && Array.prototype.push.apply(u, u), this.ue = u;
            }, this.setTransform = function(u, h, P, F, C, x) {
              i(arguments) && (this.resetTransform(), this.transform(u, h, P, F, C, x));
            }, this.re = function() {
              var u = t.Matrix.invert(this.Sd);
              this.Ld.concat(u), this.Ld.concat(t.Matrix.translated(this.we, this.xe)), this.Ld.concat(this.Sd);
            }, this.ye = function(u) {
              var h = t.multiplyByAlpha(this.Je, this.ie);
              if (!t.getColorComponents(h)[3] || !(this.ve || this.xe || this.we)) return null;
              u = u.copy(), u.setColor(h);
              var P = t.MaskFilter.MakeBlur(
                t.BlurStyle.Normal,
                this.ve / 2,
                !1
              );
              return u.setMaskFilter(P), u.dispose = function() {
                P.delete(), this.delete();
              }, u;
            }, this.cf = function() {
              var u = this.Od.copy();
              if (u.setStyle(t.PaintStyle.Stroke), o(this.ge)) {
                var h = t.multiplyByAlpha(this.ge, this.ie);
                u.setColor(h);
              } else h = this.ge.te(this.Sd), u.setColor(t.Color(0, 0, 0, this.ie)), u.setShader(h);
              if (u.setStrokeWidth(this.Ke), this.ue.length) {
                var P = t.PathEffect.MakeDash(this.ue, this.Ie);
                u.setPathEffect(P);
              }
              return u.dispose = function() {
                P && P.delete(), this.delete();
              }, u;
            }, this.stroke = function(u) {
              u = u ? u.Ud : this.Qd;
              var h = this.cf(), P = this.ye(h);
              P && (this.Ld.save(), this.re(), this.Ld.drawPath(u, P), this.Ld.restore(), P.dispose()), this.Ld.drawPath(u, h), h.dispose();
            }, this.strokeRect = function(u, h, P, F) {
              var C = this.cf(), x = this.ye(C);
              x && (this.Ld.save(), this.re(), this.Ld.drawRect(t.XYWHRect(u, h, P, F), x), this.Ld.restore(), x.dispose()), this.Ld.drawRect(t.XYWHRect(u, h, P, F), C), C.dispose();
            }, this.strokeText = function(u, h, P) {
              var F = this.cf();
              u = t.TextBlob.MakeFromText(u, this.me);
              var C = this.ye(F);
              C && (this.Ld.save(), this.re(), this.Ld.drawTextBlob(u, h, P, C), this.Ld.restore(), C.dispose()), this.Ld.drawTextBlob(u, h, P, F), u.delete(), F.dispose();
            }, this.translate = function(u, h) {
              if (i(arguments)) {
                var P = t.Matrix.translated(-u, -h);
                this.Qd.transform(P), this.Ld.translate(u, h), this.Sd = this.Ld.getTotalMatrix();
              }
            }, this.transform = function(u, h, P, F, C, x) {
              u = [u, P, C, h, F, x, 0, 0, 1], h = t.Matrix.invert(u), this.Qd.transform(h), this.Ld.concat(u), this.Sd = this.Ld.getTotalMatrix();
            }, this.addHitRegion = function() {
            }, this.clearHitRegions = function() {
            }, this.drawFocusIfNeeded = function() {
            }, this.removeHitRegion = function() {
            }, this.scrollPathIntoView = function() {
            }, Object.defineProperty(this, "canvas", { value: null, writable: !1 });
          }
          function A(b) {
            this.df = b, this.Kd = new y(b.getCanvas()), this.Se = [], this.decodeImage = function(u) {
              if (u = t.MakeImageFromEncoded(u), !u) throw "Invalid input";
              return this.Se.push(u), new M(u);
            }, this.loadFont = function(u, h) {
              if (u = t.Typeface.MakeFreeTypeFaceFromData(u), !u) return null;
              this.Se.push(u);
              var P = (h.style || "normal") + "|" + (h.variant || "normal") + "|" + (h.weight || "normal");
              h = h.family, ft[h] || (ft[h] = { "*": u }), ft[h][P] = u;
            }, this.makePath2D = function(u) {
              return u = new D(u), this.Se.push(u.Ud), u;
            }, this.getContext = function(u) {
              return u === "2d" ? this.Kd : null;
            }, this.toDataURL = function(u, h) {
              this.df.flush();
              var P = this.df.makeImageSnapshot();
              if (P) {
                u = u || "image/png";
                var F = t.ImageFormat.PNG;
                if (u === "image/jpeg" && (F = t.ImageFormat.JPEG), h = P.encodeToBytes(F, h || 0.92)) {
                  if (P.delete(), u = "data:" + u + ";base64,", typeof Buffer < "u") h = Buffer.from(h).toString("base64");
                  else {
                    P = 0, F = h.length;
                    for (var C = "", x; P < F; ) x = h.slice(P, Math.min(P + 32768, F)), C += String.fromCharCode.apply(null, x), P += 32768;
                    h = btoa(C);
                  }
                  return u + h;
                }
              }
            }, this.dispose = function() {
              this.Kd.le(), this.Se.forEach(function(u) {
                u.delete();
              }), this.df.dispose();
            };
          }
          function M(b) {
            this.width = b.width(), this.height = b.height(), this.naturalWidth = this.width, this.naturalHeight = this.height, this.tf = function() {
              return b;
            };
          }
          function R(b, u, h) {
            if (!u || h === 0) throw "invalid dimensions, width and height must be non-zero";
            if (b.length % 4) throw "arr must be a multiple of 4";
            h = h || b.length / (4 * u), Object.defineProperty(this, "data", { value: b, writable: !1 }), Object.defineProperty(this, "height", { value: h, writable: !1 }), Object.defineProperty(this, "width", { value: u, writable: !1 });
          }
          function j(b, u, h, P) {
            this.Wd = null, this.ce = [], this.Zd = [], this.addColorStop = function(F, C) {
              if (0 > F || 1 < F || !isFinite(F)) throw "offset must be between 0 and 1 inclusively";
              C = a(C);
              var x = this.Zd.indexOf(F);
              if (x !== -1) this.ce[x] = C;
              else {
                for (x = 0; x < this.Zd.length && !(this.Zd[x] > F); x++) ;
                this.Zd.splice(x, 0, F), this.ce.splice(x, 0, C);
              }
            }, this.se = function() {
              var F = new j(b, u, h, P);
              return F.ce = this.ce.slice(), F.Zd = this.Zd.slice(), F;
            }, this.le = function() {
              this.Wd && (this.Wd.delete(), this.Wd = null);
            }, this.te = function(F) {
              var C = [b, u, h, P];
              t.Matrix.mapPoints(F, C), F = C[0];
              var x = C[1], L = C[2];
              return C = C[3], this.le(), this.Wd = t.Shader.MakeLinearGradient([F, x], [L, C], this.ce, this.Zd, t.TileMode.Clamp);
            };
          }
          function I(b, u, h, P, F, C) {
            if (i([u, h, P, F, C])) {
              if (0 > C) throw "radii cannot be negative";
              b.isEmpty() && b.moveTo(u, h), b.arcToTangent(u, h, P, F, C);
            }
          }
          function K(b) {
            if (!b.isEmpty()) {
              var u = b.getBounds();
              (u[3] - u[1] || u[2] - u[0]) && b.close();
            }
          }
          function Y(b, u, h, P, F, C, x) {
            x = (x - C) / Math.PI * 180, C = C / Math.PI * 180, u = t.LTRBRect(u - P, h - F, u + P, h + F), 1e-5 > Math.abs(Math.abs(x) - 360) ? (h = x / 2, b.arcToOval(u, C, h, !1), b.arcToOval(u, C + h, h, !1)) : b.arcToOval(u, C, x, !1);
          }
          function p(b, u, h, P, F, C, x, L, Z) {
            if (i([u, h, P, F, C, x, L])) {
              if (0 > P || 0 > F) throw "radii cannot be negative";
              var tt = 2 * Math.PI, Rt = x % tt;
              0 > Rt && (Rt += tt);
              var ve = Rt - x;
              x = Rt, L += ve, !Z && L - x >= tt ? L = x + tt : Z && x - L >= tt ? L = x - tt : !Z && x > L ? L = x + (tt - (x - L) % tt) : Z && x < L && (L = x - (tt - (L - x) % tt)), C ? (Z = t.Matrix.rotated(C, u, h), C = t.Matrix.rotated(-C, u, h), b.transform(C), Y(b, u, h, P, F, x, L), b.transform(Z)) : Y(b, u, h, P, F, x, L);
            }
          }
          function S(b, u, h) {
            i([u, h]) && (b.isEmpty() && b.moveTo(u, h), b.lineTo(u, h));
          }
          function D(b) {
            this.Ud = null, this.Ud = typeof b == "string" ? t.Path.MakeFromSVGString(b) : b && b.af ? b.Ud.copy() : new t.Path(), this.af = function() {
              return this.Ud;
            }, this.addPath = function(u, h) {
              h || (h = { a: 1, c: 0, e: 0, b: 0, d: 1, f: 0 }), this.Ud.addPath(u.Ud, [h.a, h.c, h.e, h.b, h.d, h.f]);
            }, this.arc = function(u, h, P, F, C, x) {
              p(
                this.Ud,
                u,
                h,
                P,
                P,
                0,
                F,
                C,
                x
              );
            }, this.arcTo = function(u, h, P, F, C) {
              I(this.Ud, u, h, P, F, C);
            }, this.bezierCurveTo = function(u, h, P, F, C, x) {
              var L = this.Ud;
              i([u, h, P, F, C, x]) && (L.isEmpty() && L.moveTo(u, h), L.cubicTo(u, h, P, F, C, x));
            }, this.closePath = function() {
              K(this.Ud);
            }, this.ellipse = function(u, h, P, F, C, x, L, Z) {
              p(this.Ud, u, h, P, F, C, x, L, Z);
            }, this.lineTo = function(u, h) {
              S(this.Ud, u, h);
            }, this.moveTo = function(u, h) {
              var P = this.Ud;
              i([u, h]) && P.moveTo(u, h);
            }, this.quadraticCurveTo = function(u, h, P, F) {
              var C = this.Ud;
              i([u, h, P, F]) && (C.isEmpty() && C.moveTo(u, h), C.quadTo(u, h, P, F));
            }, this.rect = function(u, h, P, F) {
              var C = this.Ud;
              u = t.XYWHRect(u, h, P, F), i(u) && C.addRect(u);
            };
          }
          function Q(b, u) {
            switch (this.Wd = null, b instanceof M && (b = b.tf()), this.Ef = b, this._transform = t.Matrix.identity(), u === "" && (u = "repeat"), u) {
              case "repeat-x":
                this.ze = t.TileMode.Repeat, this.Ae = t.TileMode.Decal;
                break;
              case "repeat-y":
                this.ze = t.TileMode.Decal, this.Ae = t.TileMode.Repeat;
                break;
              case "repeat":
                this.Ae = this.ze = t.TileMode.Repeat;
                break;
              case "no-repeat":
                this.Ae = this.ze = t.TileMode.Decal;
                break;
              default:
                throw "invalid repetition mode " + u;
            }
            this.setTransform = function(h) {
              h = [h.a, h.c, h.e, h.b, h.d, h.f, 0, 0, 1], i(h) && (this._transform = h);
            }, this.se = function() {
              var h = new Q();
              return h.ze = this.ze, h.Ae = this.Ae, h;
            }, this.le = function() {
              this.Wd && (this.Wd.delete(), this.Wd = null);
            }, this.te = function() {
              return this.le(), this.Wd = this.Ef.makeShaderCubic(this.ze, this.Ae, 0.3333333333333333, 0.3333333333333333, this._transform);
            };
          }
          function nt(b, u, h, P, F, C) {
            this.Wd = null, this.ce = [], this.Zd = [], this.addColorStop = function(x, L) {
              if (0 > x || 1 < x || !isFinite(x)) throw "offset must be between 0 and 1 inclusively";
              L = a(L);
              var Z = this.Zd.indexOf(x);
              if (Z !== -1) this.ce[Z] = L;
              else {
                for (Z = 0; Z < this.Zd.length && !(this.Zd[Z] > x); Z++) ;
                this.Zd.splice(Z, 0, x), this.ce.splice(Z, 0, L);
              }
            }, this.se = function() {
              var x = new nt(b, u, h, P, F, C);
              return x.ce = this.ce.slice(), x.Zd = this.Zd.slice(), x;
            }, this.le = function() {
              this.Wd && (this.Wd.delete(), this.Wd = null);
            }, this.te = function(x) {
              var L = [b, u, P, F];
              t.Matrix.mapPoints(x, L);
              var Z = L[0], tt = L[1], Rt = L[2];
              L = L[3];
              var ve = (Math.abs(x[0]) + Math.abs(x[4])) / 2;
              return x = h * ve, ve *= C, this.le(), this.Wd = t.Shader.MakeTwoPointConicalGradient([
                Z,
                tt
              ], x, [Rt, L], ve, this.ce, this.Zd, t.TileMode.Clamp);
            };
          }
          t._testing = {};
          var vt = {
            aliceblue: Float32Array.of(0.941, 0.973, 1, 1),
            antiquewhite: Float32Array.of(0.98, 0.922, 0.843, 1),
            aqua: Float32Array.of(0, 1, 1, 1),
            aquamarine: Float32Array.of(0.498, 1, 0.831, 1),
            azure: Float32Array.of(0.941, 1, 1, 1),
            beige: Float32Array.of(0.961, 0.961, 0.863, 1),
            bisque: Float32Array.of(1, 0.894, 0.769, 1),
            black: Float32Array.of(0, 0, 0, 1),
            blanchedalmond: Float32Array.of(1, 0.922, 0.804, 1),
            blue: Float32Array.of(0, 0, 1, 1),
            blueviolet: Float32Array.of(0.541, 0.169, 0.886, 1),
            brown: Float32Array.of(
              0.647,
              0.165,
              0.165,
              1
            ),
            burlywood: Float32Array.of(0.871, 0.722, 0.529, 1),
            cadetblue: Float32Array.of(0.373, 0.62, 0.627, 1),
            chartreuse: Float32Array.of(0.498, 1, 0, 1),
            chocolate: Float32Array.of(0.824, 0.412, 0.118, 1),
            coral: Float32Array.of(1, 0.498, 0.314, 1),
            cornflowerblue: Float32Array.of(0.392, 0.584, 0.929, 1),
            cornsilk: Float32Array.of(1, 0.973, 0.863, 1),
            crimson: Float32Array.of(0.863, 0.078, 0.235, 1),
            cyan: Float32Array.of(0, 1, 1, 1),
            darkblue: Float32Array.of(0, 0, 0.545, 1),
            darkcyan: Float32Array.of(0, 0.545, 0.545, 1),
            darkgoldenrod: Float32Array.of(
              0.722,
              0.525,
              0.043,
              1
            ),
            darkgray: Float32Array.of(0.663, 0.663, 0.663, 1),
            darkgreen: Float32Array.of(0, 0.392, 0, 1),
            darkgrey: Float32Array.of(0.663, 0.663, 0.663, 1),
            darkkhaki: Float32Array.of(0.741, 0.718, 0.42, 1),
            darkmagenta: Float32Array.of(0.545, 0, 0.545, 1),
            darkolivegreen: Float32Array.of(0.333, 0.42, 0.184, 1),
            darkorange: Float32Array.of(1, 0.549, 0, 1),
            darkorchid: Float32Array.of(0.6, 0.196, 0.8, 1),
            darkred: Float32Array.of(0.545, 0, 0, 1),
            darksalmon: Float32Array.of(0.914, 0.588, 0.478, 1),
            darkseagreen: Float32Array.of(0.561, 0.737, 0.561, 1),
            darkslateblue: Float32Array.of(
              0.282,
              0.239,
              0.545,
              1
            ),
            darkslategray: Float32Array.of(0.184, 0.31, 0.31, 1),
            darkslategrey: Float32Array.of(0.184, 0.31, 0.31, 1),
            darkturquoise: Float32Array.of(0, 0.808, 0.82, 1),
            darkviolet: Float32Array.of(0.58, 0, 0.827, 1),
            deeppink: Float32Array.of(1, 0.078, 0.576, 1),
            deepskyblue: Float32Array.of(0, 0.749, 1, 1),
            dimgray: Float32Array.of(0.412, 0.412, 0.412, 1),
            dimgrey: Float32Array.of(0.412, 0.412, 0.412, 1),
            dodgerblue: Float32Array.of(0.118, 0.565, 1, 1),
            firebrick: Float32Array.of(0.698, 0.133, 0.133, 1),
            floralwhite: Float32Array.of(1, 0.98, 0.941, 1),
            forestgreen: Float32Array.of(
              0.133,
              0.545,
              0.133,
              1
            ),
            fuchsia: Float32Array.of(1, 0, 1, 1),
            gainsboro: Float32Array.of(0.863, 0.863, 0.863, 1),
            ghostwhite: Float32Array.of(0.973, 0.973, 1, 1),
            gold: Float32Array.of(1, 0.843, 0, 1),
            goldenrod: Float32Array.of(0.855, 0.647, 0.125, 1),
            gray: Float32Array.of(0.502, 0.502, 0.502, 1),
            green: Float32Array.of(0, 0.502, 0, 1),
            greenyellow: Float32Array.of(0.678, 1, 0.184, 1),
            grey: Float32Array.of(0.502, 0.502, 0.502, 1),
            honeydew: Float32Array.of(0.941, 1, 0.941, 1),
            hotpink: Float32Array.of(1, 0.412, 0.706, 1),
            indianred: Float32Array.of(0.804, 0.361, 0.361, 1),
            indigo: Float32Array.of(
              0.294,
              0,
              0.51,
              1
            ),
            ivory: Float32Array.of(1, 1, 0.941, 1),
            khaki: Float32Array.of(0.941, 0.902, 0.549, 1),
            lavender: Float32Array.of(0.902, 0.902, 0.98, 1),
            lavenderblush: Float32Array.of(1, 0.941, 0.961, 1),
            lawngreen: Float32Array.of(0.486, 0.988, 0, 1),
            lemonchiffon: Float32Array.of(1, 0.98, 0.804, 1),
            lightblue: Float32Array.of(0.678, 0.847, 0.902, 1),
            lightcoral: Float32Array.of(0.941, 0.502, 0.502, 1),
            lightcyan: Float32Array.of(0.878, 1, 1, 1),
            lightgoldenrodyellow: Float32Array.of(0.98, 0.98, 0.824, 1),
            lightgray: Float32Array.of(0.827, 0.827, 0.827, 1),
            lightgreen: Float32Array.of(
              0.565,
              0.933,
              0.565,
              1
            ),
            lightgrey: Float32Array.of(0.827, 0.827, 0.827, 1),
            lightpink: Float32Array.of(1, 0.714, 0.757, 1),
            lightsalmon: Float32Array.of(1, 0.627, 0.478, 1),
            lightseagreen: Float32Array.of(0.125, 0.698, 0.667, 1),
            lightskyblue: Float32Array.of(0.529, 0.808, 0.98, 1),
            lightslategray: Float32Array.of(0.467, 0.533, 0.6, 1),
            lightslategrey: Float32Array.of(0.467, 0.533, 0.6, 1),
            lightsteelblue: Float32Array.of(0.69, 0.769, 0.871, 1),
            lightyellow: Float32Array.of(1, 1, 0.878, 1),
            lime: Float32Array.of(0, 1, 0, 1),
            limegreen: Float32Array.of(0.196, 0.804, 0.196, 1),
            linen: Float32Array.of(
              0.98,
              0.941,
              0.902,
              1
            ),
            magenta: Float32Array.of(1, 0, 1, 1),
            maroon: Float32Array.of(0.502, 0, 0, 1),
            mediumaquamarine: Float32Array.of(0.4, 0.804, 0.667, 1),
            mediumblue: Float32Array.of(0, 0, 0.804, 1),
            mediumorchid: Float32Array.of(0.729, 0.333, 0.827, 1),
            mediumpurple: Float32Array.of(0.576, 0.439, 0.859, 1),
            mediumseagreen: Float32Array.of(0.235, 0.702, 0.443, 1),
            mediumslateblue: Float32Array.of(0.482, 0.408, 0.933, 1),
            mediumspringgreen: Float32Array.of(0, 0.98, 0.604, 1),
            mediumturquoise: Float32Array.of(0.282, 0.82, 0.8, 1),
            mediumvioletred: Float32Array.of(
              0.78,
              0.082,
              0.522,
              1
            ),
            midnightblue: Float32Array.of(0.098, 0.098, 0.439, 1),
            mintcream: Float32Array.of(0.961, 1, 0.98, 1),
            mistyrose: Float32Array.of(1, 0.894, 0.882, 1),
            moccasin: Float32Array.of(1, 0.894, 0.71, 1),
            navajowhite: Float32Array.of(1, 0.871, 0.678, 1),
            navy: Float32Array.of(0, 0, 0.502, 1),
            oldlace: Float32Array.of(0.992, 0.961, 0.902, 1),
            olive: Float32Array.of(0.502, 0.502, 0, 1),
            olivedrab: Float32Array.of(0.42, 0.557, 0.137, 1),
            orange: Float32Array.of(1, 0.647, 0, 1),
            orangered: Float32Array.of(1, 0.271, 0, 1),
            orchid: Float32Array.of(0.855, 0.439, 0.839, 1),
            palegoldenrod: Float32Array.of(
              0.933,
              0.91,
              0.667,
              1
            ),
            palegreen: Float32Array.of(0.596, 0.984, 0.596, 1),
            paleturquoise: Float32Array.of(0.686, 0.933, 0.933, 1),
            palevioletred: Float32Array.of(0.859, 0.439, 0.576, 1),
            papayawhip: Float32Array.of(1, 0.937, 0.835, 1),
            peachpuff: Float32Array.of(1, 0.855, 0.725, 1),
            peru: Float32Array.of(0.804, 0.522, 0.247, 1),
            pink: Float32Array.of(1, 0.753, 0.796, 1),
            plum: Float32Array.of(0.867, 0.627, 0.867, 1),
            powderblue: Float32Array.of(0.69, 0.878, 0.902, 1),
            purple: Float32Array.of(0.502, 0, 0.502, 1),
            rebeccapurple: Float32Array.of(0.4, 0.2, 0.6, 1),
            red: Float32Array.of(1, 0, 0, 1),
            rosybrown: Float32Array.of(0.737, 0.561, 0.561, 1),
            royalblue: Float32Array.of(0.255, 0.412, 0.882, 1),
            saddlebrown: Float32Array.of(0.545, 0.271, 0.075, 1),
            salmon: Float32Array.of(0.98, 0.502, 0.447, 1),
            sandybrown: Float32Array.of(0.957, 0.643, 0.376, 1),
            seagreen: Float32Array.of(0.18, 0.545, 0.341, 1),
            seashell: Float32Array.of(1, 0.961, 0.933, 1),
            sienna: Float32Array.of(0.627, 0.322, 0.176, 1),
            silver: Float32Array.of(0.753, 0.753, 0.753, 1),
            skyblue: Float32Array.of(0.529, 0.808, 0.922, 1),
            slateblue: Float32Array.of(0.416, 0.353, 0.804, 1),
            slategray: Float32Array.of(
              0.439,
              0.502,
              0.565,
              1
            ),
            slategrey: Float32Array.of(0.439, 0.502, 0.565, 1),
            snow: Float32Array.of(1, 0.98, 0.98, 1),
            springgreen: Float32Array.of(0, 1, 0.498, 1),
            steelblue: Float32Array.of(0.275, 0.51, 0.706, 1),
            tan: Float32Array.of(0.824, 0.706, 0.549, 1),
            teal: Float32Array.of(0, 0.502, 0.502, 1),
            thistle: Float32Array.of(0.847, 0.749, 0.847, 1),
            tomato: Float32Array.of(1, 0.388, 0.278, 1),
            transparent: Float32Array.of(0, 0, 0, 0),
            turquoise: Float32Array.of(0.251, 0.878, 0.816, 1),
            violet: Float32Array.of(0.933, 0.51, 0.933, 1),
            wheat: Float32Array.of(0.961, 0.871, 0.702, 1),
            white: Float32Array.of(
              1,
              1,
              1,
              1
            ),
            whitesmoke: Float32Array.of(0.961, 0.961, 0.961, 1),
            yellow: Float32Array.of(1, 1, 0, 1),
            yellowgreen: Float32Array.of(0.604, 0.804, 0.196, 1)
          };
          t._testing.parseColor = a, t._testing.colorToString = n;
          var At = RegExp("(italic|oblique|normal|)\\s*(small-caps|normal|)\\s*(bold|bolder|lighter|[1-9]00|normal|)\\s*([\\d\\.]+)(px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q)(.+)"), ft = { "Noto Mono": { "*": null }, monospace: { "*": null } };
          t._testing.parseFontString = l, t.MakeCanvas = function(b, u) {
            return (b = t.MakeSurface(b, u)) ? new A(b) : null;
          }, t.ImageData = function() {
            if (arguments.length === 2) {
              var b = arguments[0], u = arguments[1];
              return new R(new Uint8ClampedArray(4 * b * u), b, u);
            }
            if (arguments.length === 3) {
              var h = arguments[0];
              if (h.prototype.constructor !== Uint8ClampedArray) throw "bytes must be given as a Uint8ClampedArray";
              if (b = arguments[1], u = arguments[2], h % 4) throw "bytes must be given in a multiple of 4";
              if (h % b) throw "bytes must divide evenly by width";
              if (u && u !== h / (4 * b)) throw "invalid height given";
              return new R(h, b, h / (4 * b));
            }
            throw "invalid number of arguments - takes 2 or 3, saw " + arguments.length;
          };
        }();
      }(_);
      var mr = Object.assign({}, _), Ge = "./this.program", Ne = (t, e) => {
        throw e;
      }, vr = typeof window == "object", ee = typeof importScripts == "function", Ar = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string", ht = "", Ke, we, Pe;
      if (Ar) {
        var wr = mn, Je = mn;
        ht = ee ? Je.dirname(ht) + "/" : __dirname + "/", Ke = (t, e) => (t = t.startsWith("file://") ? new URL(t) : Je.normalize(t), wr.readFileSync(t, e ? void 0 : "utf8")), Pe = (t) => (t = Ke(t, !0), t.buffer || (t = new Uint8Array(t)), t), we = (t, e, r, o = !0) => {
          t = t.startsWith("file://") ? new URL(t) : Je.normalize(t), wr.readFile(t, o ? void 0 : "utf8", (s, f) => {
            s ? r(s) : e(o ? f.buffer : f);
          });
        }, !_.thisProgram && 1 < process.argv.length && (Ge = process.argv[1].replace(/\\/g, "/")), process.argv.slice(2), Ne = (t, e) => {
          throw process.exitCode = t, e;
        }, _.inspect = () => "[Emscripten Module object]";
      } else (vr || ee) && (ee ? ht = self.location.href : typeof document < "u" && document.currentScript && (ht = document.currentScript.src), Tt && (ht = Tt), ht.indexOf("blob:") !== 0 ? ht = ht.substr(0, ht.replace(/[?#].*/, "").lastIndexOf("/") + 1) : ht = "", Ke = (t) => {
        var e = new XMLHttpRequest();
        return e.open("GET", t, !1), e.send(null), e.responseText;
      }, ee && (Pe = (t) => {
        var e = new XMLHttpRequest();
        return e.open("GET", t, !1), e.responseType = "arraybuffer", e.send(null), new Uint8Array(e.response);
      }), we = (t, e, r) => {
        var o = new XMLHttpRequest();
        o.open("GET", t, !0), o.responseType = "arraybuffer", o.onload = () => {
          o.status == 200 || o.status == 0 && o.response ? e(o.response) : r();
        }, o.onerror = r, o.send(null);
      });
      var wn = _.print || console.log.bind(console), Lt = _.printErr || console.error.bind(console);
      Object.assign(_, mr), mr = null, _.thisProgram && (Ge = _.thisProgram), _.quit && (Ne = _.quit);
      var re;
      _.wasmBinary && (re = _.wasmBinary), _.noExitRuntime, typeof WebAssembly != "object" && Ye("no native wasm support detected");
      var _e, G, Pr = !1, Ct, V, Ot, Kt, B, z, W, _r;
      function Fr() {
        var t = _e.buffer;
        _.HEAP8 = Ct = new Int8Array(t), _.HEAP16 = Ot = new Int16Array(t), _.HEAP32 = B = new Int32Array(t), _.HEAPU8 = V = new Uint8Array(t), _.HEAPU16 = Kt = new Uint16Array(t), _.HEAPU32 = z = new Uint32Array(t), _.HEAPF32 = W = new Float32Array(t), _.HEAPF64 = _r = new Float64Array(t);
      }
      var it, Mr = [], Sr = [], Tr = [];
      function Pn() {
        var t = _.preRun.shift();
        Mr.unshift(t);
      }
      var $t = 0, ne = null;
      function Ye(t) {
        throw _.onAbort && _.onAbort(t), t = "Aborted(" + t + ")", Lt(t), Pr = !0, t = new WebAssembly.RuntimeError(t + ". Build with -sASSERTIONS for more info."), Ae(t), t;
      }
      function Cr(t) {
        return t.startsWith("data:application/octet-stream;base64,");
      }
      var Jt;
      if (Jt = "canvaskit.wasm", !Cr(Jt)) {
        var br = Jt;
        Jt = _.locateFile ? _.locateFile(br, ht) : ht + br;
      }
      function Er(t) {
        if (t == Jt && re) return new Uint8Array(re);
        if (Pe) return Pe(t);
        throw "both async and sync fetching of the wasm failed";
      }
      function _n(t) {
        if (!re && (vr || ee)) {
          if (typeof fetch == "function" && !t.startsWith("file://")) return fetch(t, { credentials: "same-origin" }).then((e) => {
            if (!e.ok) throw "failed to load wasm binary file at '" + t + "'";
            return e.arrayBuffer();
          }).catch(() => Er(t));
          if (we) return new Promise((e, r) => {
            we(t, (o) => e(new Uint8Array(o)), r);
          });
        }
        return Promise.resolve().then(() => Er(t));
      }
      function xr(t, e, r) {
        return _n(t).then((o) => WebAssembly.instantiate(o, e)).then((o) => o).then(r, (o) => {
          Lt("failed to asynchronously prepare wasm: " + o), Ye(o);
        });
      }
      function Fn(t, e) {
        var r = Jt;
        return re || typeof WebAssembly.instantiateStreaming != "function" || Cr(r) || r.startsWith("file://") || Ar || typeof fetch != "function" ? xr(r, t, e) : fetch(r, { credentials: "same-origin" }).then((o) => WebAssembly.instantiateStreaming(o, t).then(e, function(s) {
          return Lt("wasm streaming compile failed: " + s), Lt("falling back to ArrayBuffer instantiation"), xr(r, t, e);
        }));
      }
      function Mn(t) {
        this.name = "ExitStatus", this.message = `Program terminated with exit(${t})`, this.status = t;
      }
      var Xe = (t) => {
        for (; 0 < t.length; ) t.shift()(_);
      }, Rr = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0, Ht = (t, e, r) => {
        var o = e + r;
        for (r = e; t[r] && !(r >= o); ) ++r;
        if (16 < r - e && t.buffer && Rr) return Rr.decode(t.subarray(e, r));
        for (o = ""; e < r; ) {
          var s = t[e++];
          if (s & 128) {
            var f = t[e++] & 63;
            if ((s & 224) == 192) o += String.fromCharCode((s & 31) << 6 | f);
            else {
              var g = t[e++] & 63;
              s = (s & 240) == 224 ? (s & 15) << 12 | f << 6 | g : (s & 7) << 18 | f << 12 | g << 6 | t[e++] & 63, 65536 > s ? o += String.fromCharCode(s) : (s -= 65536, o += String.fromCharCode(55296 | s >> 10, 56320 | s & 1023));
            }
          } else o += String.fromCharCode(s);
        }
        return o;
      }, Fe = {};
      function Qe(t) {
        for (; t.length; ) {
          var e = t.pop();
          t.pop()(e);
        }
      }
      function ie(t) {
        return this.fromWireType(B[t >> 2]);
      }
      var Yt = {}, Dt = {}, Me = {}, Br = void 0;
      function Se(t) {
        throw new Br(t);
      }
      function wt(t, e, r) {
        function o(c) {
          c = r(c), c.length !== t.length && Se("Mismatched type converter count");
          for (var d = 0; d < t.length; ++d) bt(t[d], c[d]);
        }
        t.forEach(function(c) {
          Me[c] = e;
        });
        var s = Array(e.length), f = [], g = 0;
        e.forEach((c, d) => {
          Dt.hasOwnProperty(c) ? s[d] = Dt[c] : (f.push(c), Yt.hasOwnProperty(c) || (Yt[c] = []), Yt[c].push(() => {
            s[d] = Dt[c], ++g, g === f.length && o(s);
          }));
        }), f.length === 0 && o(s);
      }
      function Te(t) {
        switch (t) {
          case 1:
            return 0;
          case 2:
            return 1;
          case 4:
            return 2;
          case 8:
            return 3;
          default:
            throw new TypeError(`Unknown type size: ${t}`);
        }
      }
      var kr = void 0;
      function et(t) {
        for (var e = ""; V[t]; ) e += kr[V[t++]];
        return e;
      }
      var Xt = void 0;
      function J(t) {
        throw new Xt(t);
      }
      function Sn(t, e, r = {}) {
        var o = e.name;
        if (t || J(`type "${o}" must have a positive integer typeid pointer`), Dt.hasOwnProperty(t)) {
          if (r.Wf) return;
          J(`Cannot register type '${o}' twice`);
        }
        Dt[t] = e, delete Me[t], Yt.hasOwnProperty(t) && (e = Yt[t], delete Yt[t], e.forEach((s) => s()));
      }
      function bt(t, e, r = {}) {
        if (!("argPackAdvance" in e)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
        Sn(t, e, r);
      }
      function ze(t) {
        J(t.Jd.Vd.Pd.name + " instance already deleted");
      }
      var qe = !1;
      function Lr() {
      }
      function Or(t) {
        --t.count.value, t.count.value === 0 && (t.Yd ? t.ee.ke(t.Yd) : t.Vd.Pd.ke(t.Rd));
      }
      function Ir(t, e, r) {
        return e === r ? t : r.$d === void 0 ? null : (t = Ir(t, e, r.$d), t === null ? null : r.Mf(t));
      }
      var jr = {}, oe = [];
      function Ze() {
        for (; oe.length; ) {
          var t = oe.pop();
          t.Jd.Ee = !1, t.delete();
        }
      }
      var ae = void 0, se = {};
      function Tn(t, e) {
        for (e === void 0 && J("ptr should not be undefined"); t.$d; ) e = t.Oe(e), t = t.$d;
        return se[e];
      }
      function Ce(t, e) {
        return e.Vd && e.Rd || Se("makeClassHandle requires ptr and ptrType"), !!e.ee != !!e.Yd && Se("Both smartPtrType and smartPtr must be specified"), e.count = { value: 1 }, ue(Object.create(t, { Jd: { value: e } }));
      }
      function ue(t) {
        return typeof FinalizationRegistry > "u" ? (ue = (e) => e, t) : (qe = new FinalizationRegistry((e) => {
          Or(e.Jd);
        }), ue = (e) => {
          var r = e.Jd;
          return r.Yd && qe.register(e, { Jd: r }, e), e;
        }, Lr = (e) => {
          qe.unregister(e);
        }, ue(t));
      }
      function It() {
      }
      function Wr(t) {
        if (t === void 0) return "_unknown";
        t = t.replace(/[^a-zA-Z0-9_]/g, "$");
        var e = t.charCodeAt(0);
        return 48 <= e && 57 >= e ? `_${t}` : t;
      }
      function tr(t, e) {
        return t = Wr(t), { [t]: function() {
          return e.apply(this, arguments);
        } }[t];
      }
      function er(t, e, r) {
        if (t[e].Xd === void 0) {
          var o = t[e];
          t[e] = function() {
            return t[e].Xd.hasOwnProperty(arguments.length) || J(`Function '${r}' called with an invalid number of arguments (${arguments.length}) - expects one of (${t[e].Xd})!`), t[e].Xd[arguments.length].apply(this, arguments);
          }, t[e].Xd = [], t[e].Xd[o.Ce] = o;
        }
      }
      function rr(t, e, r) {
        _.hasOwnProperty(t) ? ((r === void 0 || _[t].Xd !== void 0 && _[t].Xd[r] !== void 0) && J(`Cannot register public name '${t}' twice`), er(_, t, t), _.hasOwnProperty(r) && J(`Cannot register multiple overloads of a function with the same number of arguments (${r})!`), _[t].Xd[r] = e) : (_[t] = e, r !== void 0 && (_[t].tg = r));
      }
      function Cn(t, e, r, o, s, f, g, c) {
        this.name = t, this.constructor = e, this.Fe = r, this.ke = o, this.$d = s, this.Rf = f, this.Oe = g, this.Mf = c, this.cg = [];
      }
      function nr(t, e, r) {
        for (; e !== r; ) e.Oe || J(`Expected null or instance of ${r.name}, got an instance of ${e.name}`), t = e.Oe(t), e = e.$d;
        return t;
      }
      function bn(t, e) {
        return e === null ? (this.gf && J(`null is not a valid ${this.name}`), 0) : (e.Jd || J(`Cannot pass "${or(e)}" as a ${this.name}`), e.Jd.Rd || J(`Cannot pass deleted object as a pointer of type ${this.name}`), nr(e.Jd.Rd, e.Jd.Vd.Pd, this.Pd));
      }
      function En(t, e) {
        if (e === null) {
          if (this.gf && J(`null is not a valid ${this.name}`), this.Ve) {
            var r = this.hf();
            return t !== null && t.push(this.ke, r), r;
          }
          return 0;
        }
        if (e.Jd || J(`Cannot pass "${or(e)}" as a ${this.name}`), e.Jd.Rd || J(`Cannot pass deleted object as a pointer of type ${this.name}`), !this.Ue && e.Jd.Vd.Ue && J(`Cannot convert argument of type ${e.Jd.ee ? e.Jd.ee.name : e.Jd.Vd.name} to parameter type ${this.name}`), r = nr(e.Jd.Rd, e.Jd.Vd.Pd, this.Pd), this.Ve) switch (e.Jd.Yd === void 0 && J("Passing raw pointer to smart pointer is illegal"), this.hg) {
          case 0:
            e.Jd.ee === this ? r = e.Jd.Yd : J(`Cannot convert argument of type ${e.Jd.ee ? e.Jd.ee.name : e.Jd.Vd.name} to parameter type ${this.name}`);
            break;
          case 1:
            r = e.Jd.Yd;
            break;
          case 2:
            if (e.Jd.ee === this) r = e.Jd.Yd;
            else {
              var o = e.clone();
              r = this.dg(r, gt(function() {
                o.delete();
              })), t !== null && t.push(this.ke, r);
            }
            break;
          default:
            J("Unsupporting sharing policy");
        }
        return r;
      }
      function xn(t, e) {
        return e === null ? (this.gf && J(`null is not a valid ${this.name}`), 0) : (e.Jd || J(`Cannot pass "${or(e)}" as a ${this.name}`), e.Jd.Rd || J(`Cannot pass deleted object as a pointer of type ${this.name}`), e.Jd.Vd.Ue && J(`Cannot convert argument of type ${e.Jd.Vd.name} to parameter type ${this.name}`), nr(e.Jd.Rd, e.Jd.Vd.Pd, this.Pd));
      }
      function Et(t, e, r, o, s, f, g, c, d, m, T) {
        this.name = t, this.Pd = e, this.gf = r, this.Ue = o, this.Ve = s, this.bg = f, this.hg = g, this.vf = c, this.hf = d, this.dg = m, this.ke = T, s || e.$d !== void 0 ? this.toWireType = En : (this.toWireType = o ? bn : xn, this.de = null);
      }
      function Ur(t, e, r) {
        _.hasOwnProperty(t) || Se("Replacing nonexistant public symbol"), _[t].Xd !== void 0 && r !== void 0 ? _[t].Xd[r] = e : (_[t] = e, _[t].Ce = r);
      }
      var Rn = (t, e) => {
        var r = [];
        return function() {
          if (r.length = 0, Object.assign(r, arguments), t.includes("j")) {
            var o = _["dynCall_" + t];
            o = r && r.length ? o.apply(null, [e].concat(r)) : o.call(null, e);
          } else o = it.get(e).apply(null, r);
          return o;
        };
      };
      function at(t, e) {
        t = et(t);
        var r = t.includes("j") ? Rn(t, e) : it.get(e);
        return typeof r != "function" && J(`unknown function pointer with signature ${t}: ${e}`), r;
      }
      var $r = void 0;
      function Hr(t) {
        t = ln(t);
        var e = et(t);
        return Bt(t), e;
      }
      function le(t, e) {
        function r(f) {
          s[f] || Dt[f] || (Me[f] ? Me[f].forEach(r) : (o.push(f), s[f] = !0));
        }
        var o = [], s = {};
        throw e.forEach(r), new $r(`${t}: ` + o.map(Hr).join([", "]));
      }
      function be(t, e, r, o, s) {
        var f = e.length;
        2 > f && J("argTypes array size mismatch! Must at least get return value and 'this' types!");
        var g = e[1] !== null && r !== null, c = !1;
        for (r = 1; r < e.length; ++r) if (e[r] !== null && e[r].de === void 0) {
          c = !0;
          break;
        }
        var d = e[0].name !== "void", m = f - 2, T = Array(m), E = [], k = [];
        return function() {
          if (arguments.length !== m && J(`function ${t} called with ${arguments.length} arguments, expected ${m} args!`), k.length = 0, E.length = g ? 2 : 1, E[0] = s, g) {
            var w = e[1].toWireType(k, this);
            E[1] = w;
          }
          for (var O = 0; O < m; ++O) T[O] = e[O + 2].toWireType(k, arguments[O]), E.push(T[O]);
          if (O = o.apply(null, E), c) Qe(k);
          else for (var H = g ? 1 : 2; H < e.length; H++) {
            var $ = H === 1 ? w : T[H - 2];
            e[H].de !== null && e[H].de($);
          }
          return w = d ? e[0].fromWireType(O) : void 0, w;
        };
      }
      function Ee(t, e) {
        for (var r = [], o = 0; o < t; o++) r.push(z[e + 4 * o >> 2]);
        return r;
      }
      function Dr() {
        this.je = [void 0], this.sf = [];
      }
      var pt = new Dr();
      function ir(t) {
        t >= pt.Ge && --pt.get(t).wf === 0 && pt.Bf(t);
      }
      var yt = (t) => (t || J("Cannot use deleted val. handle = " + t), pt.get(t).value), gt = (t) => {
        switch (t) {
          case void 0:
            return 1;
          case null:
            return 2;
          case !0:
            return 3;
          case !1:
            return 4;
          default:
            return pt.Af({ wf: 1, value: t });
        }
      };
      function Bn(t, e, r) {
        switch (e) {
          case 0:
            return function(o) {
              return this.fromWireType((r ? Ct : V)[o]);
            };
          case 1:
            return function(o) {
              return this.fromWireType((r ? Ot : Kt)[o >> 1]);
            };
          case 2:
            return function(o) {
              return this.fromWireType((r ? B : z)[o >> 2]);
            };
          default:
            throw new TypeError("Unknown integer type: " + t);
        }
      }
      function fe(t, e) {
        var r = Dt[t];
        return r === void 0 && J(e + " has unknown type " + Hr(t)), r;
      }
      function or(t) {
        if (t === null) return "null";
        var e = typeof t;
        return e === "object" || e === "array" || e === "function" ? t.toString() : "" + t;
      }
      function kn(t, e) {
        switch (e) {
          case 2:
            return function(r) {
              return this.fromWireType(W[r >> 2]);
            };
          case 3:
            return function(r) {
              return this.fromWireType(_r[r >> 3]);
            };
          default:
            throw new TypeError("Unknown float type: " + t);
        }
      }
      function Ln(t, e, r) {
        switch (e) {
          case 0:
            return r ? function(o) {
              return Ct[o];
            } : function(o) {
              return V[o];
            };
          case 1:
            return r ? function(o) {
              return Ot[o >> 1];
            } : function(o) {
              return Kt[o >> 1];
            };
          case 2:
            return r ? function(o) {
              return B[o >> 2];
            } : function(o) {
              return z[o >> 2];
            };
          default:
            throw new TypeError("Unknown integer type: " + t);
        }
      }
      var Pt = (t, e, r, o) => {
        if (!(0 < o)) return 0;
        var s = r;
        o = r + o - 1;
        for (var f = 0; f < t.length; ++f) {
          var g = t.charCodeAt(f);
          if (55296 <= g && 57343 >= g) {
            var c = t.charCodeAt(++f);
            g = 65536 + ((g & 1023) << 10) | c & 1023;
          }
          if (127 >= g) {
            if (r >= o) break;
            e[r++] = g;
          } else {
            if (2047 >= g) {
              if (r + 1 >= o) break;
              e[r++] = 192 | g >> 6;
            } else {
              if (65535 >= g) {
                if (r + 2 >= o) break;
                e[r++] = 224 | g >> 12;
              } else {
                if (r + 3 >= o) break;
                e[r++] = 240 | g >> 18, e[r++] = 128 | g >> 12 & 63;
              }
              e[r++] = 128 | g >> 6 & 63;
            }
            e[r++] = 128 | g & 63;
          }
        }
        return e[r] = 0, r - s;
      }, _t = (t) => {
        for (var e = 0, r = 0; r < t.length; ++r) {
          var o = t.charCodeAt(r);
          127 >= o ? e++ : 2047 >= o ? e += 2 : 55296 <= o && 57343 >= o ? (e += 4, ++r) : e += 3;
        }
        return e;
      }, Vr = typeof TextDecoder < "u" ? new TextDecoder("utf-16le") : void 0, On = (t, e) => {
        for (var r = t >> 1, o = r + e / 2; !(r >= o) && Kt[r]; ) ++r;
        if (r <<= 1, 32 < r - t && Vr) return Vr.decode(V.subarray(t, r));
        for (r = "", o = 0; !(o >= e / 2); ++o) {
          var s = Ot[t + 2 * o >> 1];
          if (s == 0) break;
          r += String.fromCharCode(s);
        }
        return r;
      }, In = (t, e, r) => {
        if (r === void 0 && (r = 2147483647), 2 > r) return 0;
        r -= 2;
        var o = e;
        r = r < 2 * t.length ? r / 2 : t.length;
        for (var s = 0; s < r; ++s) Ot[e >> 1] = t.charCodeAt(s), e += 2;
        return Ot[e >> 1] = 0, e - o;
      }, jn = (t) => 2 * t.length, Wn = (t, e) => {
        for (var r = 0, o = ""; !(r >= e / 4); ) {
          var s = B[t + 4 * r >> 2];
          if (s == 0) break;
          ++r, 65536 <= s ? (s -= 65536, o += String.fromCharCode(55296 | s >> 10, 56320 | s & 1023)) : o += String.fromCharCode(s);
        }
        return o;
      }, Un = (t, e, r) => {
        if (r === void 0 && (r = 2147483647), 4 > r) return 0;
        var o = e;
        r = o + r - 4;
        for (var s = 0; s < t.length; ++s) {
          var f = t.charCodeAt(s);
          if (55296 <= f && 57343 >= f) {
            var g = t.charCodeAt(++s);
            f = 65536 + ((f & 1023) << 10) | g & 1023;
          }
          if (B[e >> 2] = f, e += 4, e + 4 > r) break;
        }
        return B[e >> 2] = 0, e - o;
      }, $n = (t) => {
        for (var e = 0, r = 0; r < t.length; ++r) {
          var o = t.charCodeAt(r);
          55296 <= o && 57343 >= o && ++r, e += 4;
        }
        return e;
      }, Hn = {};
      function xe(t) {
        var e = Hn[t];
        return e === void 0 ? et(t) : e;
      }
      var Re = [];
      function Gr() {
        function t(e) {
          e.$$$embind_global$$$ = e;
          var r = typeof $$$embind_global$$$ == "object" && e.$$$embind_global$$$ == e;
          return r || delete e.$$$embind_global$$$, r;
        }
        if (typeof globalThis == "object") return globalThis;
        if (typeof $$$embind_global$$$ == "object" || (typeof yr == "object" && t(yr) ? $$$embind_global$$$ = yr : typeof self == "object" && t(self) && ($$$embind_global$$$ = self), typeof $$$embind_global$$$ == "object")) return $$$embind_global$$$;
        throw Error("unable to get global object.");
      }
      function Dn(t) {
        var e = Re.length;
        return Re.push(t), e;
      }
      function Vn(t, e) {
        for (var r = Array(t), o = 0; o < t; ++o) r[o] = fe(z[e + 4 * o >> 2], "parameter " + o);
        return r;
      }
      var Nr = [];
      function Gn(t) {
        var e = Array(t + 1);
        return function(r, o, s) {
          e[0] = r;
          for (var f = 0; f < t; ++f) {
            var g = fe(z[o + 4 * f >> 2], "parameter " + f);
            e[f + 1] = g.readValueFromPointer(s), s += g.argPackAdvance;
          }
          return r = new (r.bind.apply(r, e))(), gt(r);
        };
      }
      var Kr = {};
      function Nn(t) {
        var e = t.getExtension("ANGLE_instanced_arrays");
        e && (t.vertexAttribDivisor = function(r, o) {
          e.vertexAttribDivisorANGLE(r, o);
        }, t.drawArraysInstanced = function(r, o, s, f) {
          e.drawArraysInstancedANGLE(r, o, s, f);
        }, t.drawElementsInstanced = function(r, o, s, f, g) {
          e.drawElementsInstancedANGLE(r, o, s, f, g);
        });
      }
      function Kn(t) {
        var e = t.getExtension("OES_vertex_array_object");
        e && (t.createVertexArray = function() {
          return e.createVertexArrayOES();
        }, t.deleteVertexArray = function(r) {
          e.deleteVertexArrayOES(r);
        }, t.bindVertexArray = function(r) {
          e.bindVertexArrayOES(r);
        }, t.isVertexArray = function(r) {
          return e.isVertexArrayOES(r);
        });
      }
      function Jn(t) {
        var e = t.getExtension("WEBGL_draw_buffers");
        e && (t.drawBuffers = function(r, o) {
          e.drawBuffersWEBGL(r, o);
        });
      }
      var Jr = 1, Be = [], Ft = [], ke = [], ce = [], mt = [], Mt = [], Le = [], xt = [], Vt = [], Gt = [], Yr = {}, Xr = {}, Qr = 4;
      function q(t) {
        Oe || (Oe = t);
      }
      function Qt(t) {
        for (var e = Jr++, r = t.length; r < e; r++) t[r] = null;
        return e;
      }
      function Yn(t, e) {
        t.Ge || (t.Ge = t.getContext, t.getContext = function(o, s) {
          return s = t.Ge(o, s), o == "webgl" == s instanceof WebGLRenderingContext ? s : null;
        });
        var r = 1 < e.majorVersion ? t.getContext("webgl2", e) : t.getContext("webgl", e);
        return r ? Xn(r, e) : 0;
      }
      function Xn(t, e) {
        var r = Qt(xt), o = { handle: r, attributes: e, version: e.majorVersion, fe: t };
        return t.canvas && (t.canvas.zf = o), xt[r] = o, (typeof e.Nf > "u" || e.Nf) && Qn(o), r;
      }
      function zr(t) {
        return U = xt[t], _.rg = v = U && U.fe, !(t && !v);
      }
      function Qn(t) {
        if (t || (t = U), !t.Xf) {
          t.Xf = !0;
          var e = t.fe;
          Nn(e), Kn(e), Jn(e), e.pf = e.getExtension("WEBGL_draw_instanced_base_vertex_base_instance"), e.uf = e.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance"), 2 <= t.version && (e.qf = e.getExtension("EXT_disjoint_timer_query_webgl2")), (2 > t.version || !e.qf) && (e.qf = e.getExtension("EXT_disjoint_timer_query")), e.sg = e.getExtension("WEBGL_multi_draw"), (e.getSupportedExtensions() || []).forEach(function(r) {
            r.includes("lose_context") || r.includes("debug") || e.getExtension(r);
          });
        }
      }
      var U, Oe, ar = {}, qr = () => {
        if (!sr) {
          var t = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _: Ge || "./this.program" }, e;
          for (e in ar) ar[e] === void 0 ? delete t[e] : t[e] = ar[e];
          var r = [];
          for (e in t) r.push(`${e}=${t[e]}`);
          sr = r;
        }
        return sr;
      }, sr, zn = [null, [], []];
      function Zr(t) {
        v.bindVertexArray(Le[t]);
      }
      function tn(t, e) {
        for (var r = 0; r < t; r++) {
          var o = B[e + 4 * r >> 2];
          v.deleteVertexArray(Le[o]), Le[o] = null;
        }
      }
      var Ie = [];
      function en(t, e, r, o) {
        v.drawElements(t, e, r, o);
      }
      function zt(t, e, r, o) {
        for (var s = 0; s < t; s++) {
          var f = v[r](), g = f && Qt(o);
          f ? (f.name = g, o[g] = f) : q(1282), B[e + 4 * s >> 2] = g;
        }
      }
      function rn(t, e) {
        zt(t, e, "createVertexArray", Le);
      }
      function nn(t, e, r) {
        if (e) {
          var o = void 0;
          switch (t) {
            case 36346:
              o = 1;
              break;
            case 36344:
              r != 0 && r != 1 && q(1280);
              return;
            case 34814:
            case 36345:
              o = 0;
              break;
            case 34466:
              var s = v.getParameter(34467);
              o = s ? s.length : 0;
              break;
            case 33309:
              if (2 > U.version) {
                q(1282);
                return;
              }
              o = 2 * (v.getSupportedExtensions() || []).length;
              break;
            case 33307:
            case 33308:
              if (2 > U.version) {
                q(1280);
                return;
              }
              o = t == 33307 ? 3 : 0;
          }
          if (o === void 0) switch (s = v.getParameter(t), typeof s) {
            case "number":
              o = s;
              break;
            case "boolean":
              o = s ? 1 : 0;
              break;
            case "string":
              q(1280);
              return;
            case "object":
              if (s === null) switch (t) {
                case 34964:
                case 35725:
                case 34965:
                case 36006:
                case 36007:
                case 32873:
                case 34229:
                case 36662:
                case 36663:
                case 35053:
                case 35055:
                case 36010:
                case 35097:
                case 35869:
                case 32874:
                case 36389:
                case 35983:
                case 35368:
                case 34068:
                  o = 0;
                  break;
                default:
                  q(1280);
                  return;
              }
              else {
                if (s instanceof Float32Array || s instanceof Uint32Array || s instanceof Int32Array || s instanceof Array) {
                  for (t = 0; t < s.length; ++t) switch (r) {
                    case 0:
                      B[e + 4 * t >> 2] = s[t];
                      break;
                    case 2:
                      W[e + 4 * t >> 2] = s[t];
                      break;
                    case 4:
                      Ct[e + t >> 0] = s[t] ? 1 : 0;
                  }
                  return;
                }
                try {
                  o = s.name | 0;
                } catch (f) {
                  q(1280), Lt("GL_INVALID_ENUM in glGet" + r + "v: Unknown object returned from WebGL getParameter(" + t + ")! (error: " + f + ")");
                  return;
                }
              }
              break;
            default:
              q(1280), Lt("GL_INVALID_ENUM in glGet" + r + "v: Native code calling glGet" + r + "v(" + t + ") and it returns " + s + " of type " + typeof s + "!");
              return;
          }
          switch (r) {
            case 1:
              r = o, z[e >> 2] = r, z[e + 4 >> 2] = (r - z[e >> 2]) / 4294967296;
              break;
            case 0:
              B[e >> 2] = o;
              break;
            case 2:
              W[e >> 2] = o;
              break;
            case 4:
              Ct[e >> 0] = o ? 1 : 0;
          }
        } else q(1281);
      }
      var de = (t) => {
        var e = _t(t) + 1, r = $e(e);
        return r && Pt(t, V, r, e), r;
      };
      function on(t) {
        return t.slice(-1) == "]" && t.lastIndexOf("[");
      }
      function je(t) {
        return t -= 5120, t == 0 ? Ct : t == 1 ? V : t == 2 ? Ot : t == 4 ? B : t == 6 ? W : t == 5 || t == 28922 || t == 28520 || t == 30779 || t == 30782 ? z : Kt;
      }
      function ur(t, e, r, o, s) {
        t = je(t);
        var f = 31 - Math.clz32(t.BYTES_PER_ELEMENT), g = Qr;
        return t.subarray(s >> f, s + o * (r * ({ 5: 3, 6: 4, 8: 2, 29502: 3, 29504: 4, 26917: 2, 26918: 2, 29846: 3, 29847: 4 }[e - 6402] || 1) * (1 << f) + g - 1 & -g) >> f);
      }
      function X(t) {
        var e = v.Kf;
        if (e) {
          var r = e.Ne[t];
          return typeof r == "number" && (e.Ne[t] = r = v.getUniformLocation(e, e.xf[t] + (0 < r ? "[" + r + "]" : ""))), r;
        }
        q(1282);
      }
      var jt = [], he = [], We = (t) => t % 4 === 0 && (t % 100 !== 0 || t % 400 === 0), an = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], sn = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      function qn(t) {
        var e = Array(_t(t) + 1);
        return Pt(t, e, 0, e.length), e;
      }
      var Zn = (t, e, r, o) => {
        function s(w, O, H) {
          for (w = typeof w == "number" ? w.toString() : w || ""; w.length < O; ) w = H[0] + w;
          return w;
        }
        function f(w, O) {
          return s(w, O, "0");
        }
        function g(w, O) {
          function H(ct) {
            return 0 > ct ? -1 : 0 < ct ? 1 : 0;
          }
          var $;
          return ($ = H(w.getFullYear() - O.getFullYear())) === 0 && ($ = H(w.getMonth() - O.getMonth())) === 0 && ($ = H(w.getDate() - O.getDate())), $;
        }
        function c(w) {
          switch (w.getDay()) {
            case 0:
              return new Date(w.getFullYear() - 1, 11, 29);
            case 1:
              return w;
            case 2:
              return new Date(w.getFullYear(), 0, 3);
            case 3:
              return new Date(
                w.getFullYear(),
                0,
                2
              );
            case 4:
              return new Date(w.getFullYear(), 0, 1);
            case 5:
              return new Date(w.getFullYear() - 1, 11, 31);
            case 6:
              return new Date(w.getFullYear() - 1, 11, 30);
          }
        }
        function d(w) {
          var O = w.oe;
          for (w = new Date(new Date(w.pe + 1900, 0, 1).getTime()); 0 < O; ) {
            var H = w.getMonth(), $ = (We(w.getFullYear()) ? an : sn)[H];
            if (O > $ - w.getDate()) O -= $ - w.getDate() + 1, w.setDate(1), 11 > H ? w.setMonth(H + 1) : (w.setMonth(0), w.setFullYear(w.getFullYear() + 1));
            else {
              w.setDate(w.getDate() + O);
              break;
            }
          }
          return H = new Date(w.getFullYear() + 1, 0, 4), O = c(new Date(
            w.getFullYear(),
            0,
            4
          )), H = c(H), 0 >= g(O, w) ? 0 >= g(H, w) ? w.getFullYear() + 1 : w.getFullYear() : w.getFullYear() - 1;
        }
        var m = B[o + 40 >> 2];
        o = { pg: B[o >> 2], og: B[o + 4 >> 2], Ze: B[o + 8 >> 2], jf: B[o + 12 >> 2], $e: B[o + 16 >> 2], pe: B[o + 20 >> 2], he: B[o + 24 >> 2], oe: B[o + 28 >> 2], vg: B[o + 32 >> 2], ng: B[o + 36 >> 2], qg: m && m ? Ht(V, m) : "" }, r = r ? Ht(V, r) : "", m = {
          "%c": "%a %b %d %H:%M:%S %Y",
          "%D": "%m/%d/%y",
          "%F": "%Y-%m-%d",
          "%h": "%b",
          "%r": "%I:%M:%S %p",
          "%R": "%H:%M",
          "%T": "%H:%M:%S",
          "%x": "%m/%d/%y",
          "%X": "%H:%M:%S",
          "%Ec": "%c",
          "%EC": "%C",
          "%Ex": "%m/%d/%y",
          "%EX": "%H:%M:%S",
          "%Ey": "%y",
          "%EY": "%Y",
          "%Od": "%d",
          "%Oe": "%e",
          "%OH": "%H",
          "%OI": "%I",
          "%Om": "%m",
          "%OM": "%M",
          "%OS": "%S",
          "%Ou": "%u",
          "%OU": "%U",
          "%OV": "%V",
          "%Ow": "%w",
          "%OW": "%W",
          "%Oy": "%y"
        };
        for (var T in m) r = r.replace(new RegExp(T, "g"), m[T]);
        var E = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), k = "January February March April May June July August September October November December".split(" ");
        m = { "%a": (w) => E[w.he].substring(0, 3), "%A": (w) => E[w.he], "%b": (w) => k[w.$e].substring(0, 3), "%B": (w) => k[w.$e], "%C": (w) => f((w.pe + 1900) / 100 | 0, 2), "%d": (w) => f(w.jf, 2), "%e": (w) => s(w.jf, 2, " "), "%g": (w) => d(w).toString().substring(2), "%G": (w) => d(w), "%H": (w) => f(w.Ze, 2), "%I": (w) => (w = w.Ze, w == 0 ? w = 12 : 12 < w && (w -= 12), f(w, 2)), "%j": (w) => {
          for (var O = 0, H = 0; H <= w.$e - 1; O += (We(w.pe + 1900) ? an : sn)[H++]) ;
          return f(w.jf + O, 3);
        }, "%m": (w) => f(w.$e + 1, 2), "%M": (w) => f(w.og, 2), "%n": () => `
`, "%p": (w) => 0 <= w.Ze && 12 > w.Ze ? "AM" : "PM", "%S": (w) => f(w.pg, 2), "%t": () => "	", "%u": (w) => w.he || 7, "%U": (w) => f(Math.floor((w.oe + 7 - w.he) / 7), 2), "%V": (w) => {
          var O = Math.floor((w.oe + 7 - (w.he + 6) % 7) / 7);
          if (2 >= (w.he + 371 - w.oe - 2) % 7 && O++, O) O == 53 && (H = (w.he + 371 - w.oe) % 7, H == 4 || H == 3 && We(w.pe) || (O = 1));
          else {
            O = 52;
            var H = (w.he + 7 - w.oe - 1) % 7;
            (H == 4 || H == 5 && We(w.pe % 400 - 1)) && O++;
          }
          return f(O, 2);
        }, "%w": (w) => w.he, "%W": (w) => f(Math.floor((w.oe + 7 - (w.he + 6) % 7) / 7), 2), "%y": (w) => (w.pe + 1900).toString().substring(2), "%Y": (w) => w.pe + 1900, "%z": (w) => {
          w = w.ng;
          var O = 0 <= w;
          return w = Math.abs(w) / 60, (O ? "+" : "-") + ("0000" + (w / 60 * 100 + w % 60)).slice(-4);
        }, "%Z": (w) => w.qg, "%%": () => "%" }, r = r.replace(/%%/g, "\0\0");
        for (T in m) r.includes(T) && (r = r.replace(new RegExp(T, "g"), m[T](o)));
        return r = r.replace(/\0\0/g, "%"), T = qn(r), T.length > e ? 0 : (Ct.set(T, t), T.length - 1);
      };
      Br = _.InternalError = class extends Error {
        constructor(t) {
          super(t), this.name = "InternalError";
        }
      };
      for (var un = Array(256), Ue = 0; 256 > Ue; ++Ue) un[Ue] = String.fromCharCode(Ue);
      kr = un, Xt = _.BindingError = class extends Error {
        constructor(t) {
          super(t), this.name = "BindingError";
        }
      }, It.prototype.isAliasOf = function(t) {
        if (!(this instanceof It && t instanceof It)) return !1;
        var e = this.Jd.Vd.Pd, r = this.Jd.Rd, o = t.Jd.Vd.Pd;
        for (t = t.Jd.Rd; e.$d; ) r = e.Oe(r), e = e.$d;
        for (; o.$d; ) t = o.Oe(t), o = o.$d;
        return e === o && r === t;
      }, It.prototype.clone = function() {
        if (this.Jd.Rd || ze(this), this.Jd.Me) return this.Jd.count.value += 1, this;
        var t = ue, e = Object, r = e.create, o = Object.getPrototypeOf(this), s = this.Jd;
        return t = t(r.call(e, o, { Jd: { value: { count: s.count, Ee: s.Ee, Me: s.Me, Rd: s.Rd, Vd: s.Vd, Yd: s.Yd, ee: s.ee } } })), t.Jd.count.value += 1, t.Jd.Ee = !1, t;
      }, It.prototype.delete = function() {
        this.Jd.Rd || ze(this), this.Jd.Ee && !this.Jd.Me && J("Object already scheduled for deletion"), Lr(this), Or(this.Jd), this.Jd.Me || (this.Jd.Yd = void 0, this.Jd.Rd = void 0);
      }, It.prototype.isDeleted = function() {
        return !this.Jd.Rd;
      }, It.prototype.deleteLater = function() {
        return this.Jd.Rd || ze(this), this.Jd.Ee && !this.Jd.Me && J("Object already scheduled for deletion"), oe.push(this), oe.length === 1 && ae && ae(Ze), this.Jd.Ee = !0, this;
      }, _.getInheritedInstanceCount = function() {
        return Object.keys(se).length;
      }, _.getLiveInheritedInstances = function() {
        var t = [], e;
        for (e in se) se.hasOwnProperty(e) && t.push(se[e]);
        return t;
      }, _.flushPendingDeletes = Ze, _.setDelayFunction = function(t) {
        ae = t, oe.length && ae && ae(Ze);
      }, Et.prototype.Sf = function(t) {
        return this.vf && (t = this.vf(t)), t;
      }, Et.prototype.nf = function(t) {
        this.ke && this.ke(t);
      }, Et.prototype.argPackAdvance = 8, Et.prototype.readValueFromPointer = ie, Et.prototype.deleteObject = function(t) {
        t !== null && t.delete();
      }, Et.prototype.fromWireType = function(t) {
        function e() {
          return this.Ve ? Ce(this.Pd.Fe, { Vd: this.bg, Rd: r, ee: this, Yd: t }) : Ce(this.Pd.Fe, { Vd: this, Rd: t });
        }
        var r = this.Sf(t);
        if (!r) return this.nf(t), null;
        var o = Tn(this.Pd, r);
        if (o !== void 0)
          return o.Jd.count.value === 0 ? (o.Jd.Rd = r, o.Jd.Yd = t, o.clone()) : (o = o.clone(), this.nf(t), o);
        if (o = this.Pd.Rf(r), o = jr[o], !o) return e.call(this);
        o = this.Ue ? o.If : o.pointerType;
        var s = Ir(r, this.Pd, o.Pd);
        return s === null ? e.call(this) : this.Ve ? Ce(o.Pd.Fe, { Vd: o, Rd: s, ee: this, Yd: t }) : Ce(
          o.Pd.Fe,
          { Vd: o, Rd: s }
        );
      }, $r = _.UnboundTypeError = function(t, e) {
        var r = tr(e, function(o) {
          this.name = e, this.message = o, o = Error(o).stack, o !== void 0 && (this.stack = this.toString() + `
` + o.replace(/^Error(:[^\n]*)?\n/, ""));
        });
        return r.prototype = Object.create(t.prototype), r.prototype.constructor = r, r.prototype.toString = function() {
          return this.message === void 0 ? this.name : `${this.name}: ${this.message}`;
        }, r;
      }(Error, "UnboundTypeError"), Object.assign(Dr.prototype, { get(t) {
        return this.je[t];
      }, has(t) {
        return this.je[t] !== void 0;
      }, Af(t) {
        var e = this.sf.pop() || this.je.length;
        return this.je[e] = t, e;
      }, Bf(t) {
        this.je[t] = void 0, this.sf.push(t);
      } }), pt.je.push({ value: void 0 }, { value: null }, { value: !0 }, { value: !1 }), pt.Ge = pt.je.length, _.count_emval_handles = function() {
        for (var t = 0, e = pt.Ge; e < pt.je.length; ++e) pt.je[e] !== void 0 && ++t;
        return t;
      };
      for (var v, dt = 0; 32 > dt; ++dt) Ie.push(Array(dt));
      var ti = new Float32Array(288);
      for (dt = 0; 288 > dt; ++dt) jt[dt] = ti.subarray(0, dt + 1);
      var ei = new Int32Array(288);
      for (dt = 0; 288 > dt; ++dt) he[dt] = ei.subarray(0, dt + 1);
      var ri = {
        T: function() {
          return 0;
        },
        Bb: () => {
        },
        Db: function() {
          return 0;
        },
        yb: () => {
        },
        zb: () => {
        },
        U: function() {
        },
        Ab: () => {
        },
        C: function(t) {
          var e = Fe[t];
          delete Fe[t];
          var r = e.hf, o = e.ke, s = e.rf, f = s.map((g) => g.Vf).concat(s.map((g) => g.fg));
          wt([t], f, (g) => {
            var c = {};
            return s.forEach((d, m) => {
              var T = g[m], E = d.Tf, k = d.Uf, w = g[m + s.length], O = d.eg, H = d.gg;
              c[d.Of] = { read: ($) => T.fromWireType(E(k, $)), write: ($, ct) => {
                var ot = [];
                O(H, $, w.toWireType(ot, ct)), Qe(ot);
              } };
            }), [{ name: e.name, fromWireType: function(d) {
              var m = {}, T;
              for (T in c) m[T] = c[T].read(d);
              return o(d), m;
            }, toWireType: function(d, m) {
              for (var T in c) if (!(T in m)) throw new TypeError(`Missing field: "${T}"`);
              var E = r();
              for (T in c) c[T].write(E, m[T]);
              return d !== null && d.push(o, E), E;
            }, argPackAdvance: 8, readValueFromPointer: ie, de: o }];
          });
        },
        qb: function() {
        },
        Hb: function(t, e, r, o, s) {
          var f = Te(r);
          e = et(e), bt(t, { name: e, fromWireType: function(g) {
            return !!g;
          }, toWireType: function(g, c) {
            return c ? o : s;
          }, argPackAdvance: 8, readValueFromPointer: function(g) {
            if (r === 1) var c = Ct;
            else if (r === 2) c = Ot;
            else if (r === 4) c = B;
            else throw new TypeError("Unknown boolean type size: " + e);
            return this.fromWireType(c[g >> f]);
          }, de: null });
        },
        m: function(t, e, r, o, s, f, g, c, d, m, T, E, k) {
          T = et(T), f = at(s, f), c && (c = at(g, c)), m && (m = at(d, m)), k = at(E, k);
          var w = Wr(T);
          rr(w, function() {
            le(`Cannot construct ${T} due to unbound types`, [o]);
          }), wt([t, e, r], o ? [o] : [], function(O) {
            if (O = O[0], o)
              var H = O.Pd, $ = H.Fe;
            else $ = It.prototype;
            O = tr(w, function() {
              if (Object.getPrototypeOf(this) !== ct) throw new Xt("Use 'new' to construct " + T);
              if (ot.ne === void 0) throw new Xt(T + " has no accessible constructor");
              var ye = ot.ne[arguments.length];
              if (ye === void 0) throw new Xt(`Tried to invoke ctor of ${T} with invalid number of parameters (${arguments.length}) - expected (${Object.keys(ot.ne).toString()}) parameters instead!`);
              return ye.apply(this, arguments);
            });
            var ct = Object.create($, { constructor: { value: O } });
            O.prototype = ct;
            var ot = new Cn(T, O, ct, k, H, f, c, m);
            ot.$d && (ot.$d.Pe === void 0 && (ot.$d.Pe = []), ot.$d.Pe.push(ot)), H = new Et(T, ot, !0, !1, !1), $ = new Et(T + "*", ot, !1, !1, !1);
            var pe = new Et(T + " const*", ot, !1, !0, !1);
            return jr[t] = { pointerType: $, If: pe }, Ur(w, O), [
              H,
              $,
              pe
            ];
          });
        },
        f: function(t, e, r, o, s, f, g) {
          var c = Ee(r, o);
          e = et(e), f = at(s, f), wt([], [t], function(d) {
            function m() {
              le(`Cannot call ${T} due to unbound types`, c);
            }
            d = d[0];
            var T = `${d.name}.${e}`;
            e.startsWith("@@") && (e = Symbol[e.substring(2)]);
            var E = d.Pd.constructor;
            return E[e] === void 0 ? (m.Ce = r - 1, E[e] = m) : (er(E, e, T), E[e].Xd[r - 1] = m), wt([], c, function(k) {
              if (k = [k[0], null].concat(k.slice(1)), k = be(T, k, null, f, g), E[e].Xd === void 0 ? (k.Ce = r - 1, E[e] = k) : E[e].Xd[r - 1] = k, d.Pd.Pe) for (const w of d.Pd.Pe) w.constructor.hasOwnProperty(e) || (w.constructor[e] = k);
              return [];
            }), [];
          });
        },
        A: function(t, e, r, o, s, f) {
          var g = Ee(e, r);
          s = at(o, s), wt([], [t], function(c) {
            c = c[0];
            var d = `constructor ${c.name}`;
            if (c.Pd.ne === void 0 && (c.Pd.ne = []), c.Pd.ne[e - 1] !== void 0) throw new Xt(`Cannot register multiple constructors with identical number of parameters (${e - 1}) for class '${c.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
            return c.Pd.ne[e - 1] = () => {
              le(`Cannot construct ${c.name} due to unbound types`, g);
            }, wt([], g, function(m) {
              return m.splice(
                1,
                0,
                null
              ), c.Pd.ne[e - 1] = be(d, m, null, s, f), [];
            }), [];
          });
        },
        b: function(t, e, r, o, s, f, g, c) {
          var d = Ee(r, o);
          e = et(e), f = at(s, f), wt([], [t], function(m) {
            function T() {
              le(`Cannot call ${E} due to unbound types`, d);
            }
            m = m[0];
            var E = `${m.name}.${e}`;
            e.startsWith("@@") && (e = Symbol[e.substring(2)]), c && m.Pd.cg.push(e);
            var k = m.Pd.Fe, w = k[e];
            return w === void 0 || w.Xd === void 0 && w.className !== m.name && w.Ce === r - 2 ? (T.Ce = r - 2, T.className = m.name, k[e] = T) : (er(k, e, E), k[e].Xd[r - 2] = T), wt([], d, function(O) {
              return O = be(E, O, m, f, g), k[e].Xd === void 0 ? (O.Ce = r - 2, k[e] = O) : k[e].Xd[r - 2] = O, [];
            }), [];
          });
        },
        t: function(t, e, r) {
          t = et(t), wt([], [e], function(o) {
            return o = o[0], _[t] = o.fromWireType(r), [];
          });
        },
        Gb: function(t, e) {
          e = et(e), bt(t, { name: e, fromWireType: function(r) {
            var o = yt(r);
            return ir(r), o;
          }, toWireType: function(r, o) {
            return gt(o);
          }, argPackAdvance: 8, readValueFromPointer: ie, de: null });
        },
        l: function(t, e, r, o) {
          function s() {
          }
          r = Te(r), e = et(e), s.values = {}, bt(t, {
            name: e,
            constructor: s,
            fromWireType: function(f) {
              return this.constructor.values[f];
            },
            toWireType: function(f, g) {
              return g.value;
            },
            argPackAdvance: 8,
            readValueFromPointer: Bn(e, r, o),
            de: null
          }), rr(e, s);
        },
        c: function(t, e, r) {
          var o = fe(t, "enum");
          e = et(e), t = o.constructor, o = Object.create(o.constructor.prototype, { value: { value: r }, constructor: { value: tr(`${o.name}_${e}`, function() {
          }) } }), t.values[r] = o, t[e] = o;
        },
        W: function(t, e, r) {
          r = Te(r), e = et(e), bt(t, { name: e, fromWireType: function(o) {
            return o;
          }, toWireType: function(o, s) {
            return s;
          }, argPackAdvance: 8, readValueFromPointer: kn(e, r), de: null });
        },
        y: function(t, e, r, o, s, f) {
          var g = Ee(e, r);
          t = et(t), s = at(o, s), rr(t, function() {
            le(
              `Cannot call ${t} due to unbound types`,
              g
            );
          }, e - 1), wt([], g, function(c) {
            return c = [c[0], null].concat(c.slice(1)), Ur(t, be(t, c, null, s, f), e - 1), [];
          });
        },
        E: function(t, e, r, o, s) {
          e = et(e), s === -1 && (s = 4294967295), s = Te(r);
          var f = (c) => c;
          if (o === 0) {
            var g = 32 - 8 * r;
            f = (c) => c << g >>> g;
          }
          r = e.includes("unsigned") ? function(c, d) {
            return d >>> 0;
          } : function(c, d) {
            return d;
          }, bt(t, { name: e, fromWireType: f, toWireType: r, argPackAdvance: 8, readValueFromPointer: Ln(e, s, o !== 0), de: null });
        },
        s: function(t, e, r) {
          function o(f) {
            f >>= 2;
            var g = z;
            return new s(g.buffer, g[f + 1], g[f]);
          }
          var s = [
            Int8Array,
            Uint8Array,
            Int16Array,
            Uint16Array,
            Int32Array,
            Uint32Array,
            Float32Array,
            Float64Array
          ][e];
          r = et(r), bt(t, { name: r, fromWireType: o, argPackAdvance: 8, readValueFromPointer: o }, { Wf: !0 });
        },
        q: function(t, e, r, o, s, f, g, c, d, m, T, E) {
          r = et(r), f = at(s, f), c = at(g, c), m = at(d, m), E = at(T, E), wt([t], [e], function(k) {
            return k = k[0], [new Et(r, k.Pd, !1, !1, !0, k, o, f, c, m, E)];
          });
        },
        V: function(t, e) {
          e = et(e);
          var r = e === "std::string";
          bt(t, { name: e, fromWireType: function(o) {
            var s = z[o >> 2], f = o + 4;
            if (r) for (var g = f, c = 0; c <= s; ++c) {
              var d = f + c;
              if (c == s || V[d] == 0) {
                if (g = g ? Ht(
                  V,
                  g,
                  d - g
                ) : "", m === void 0) var m = g;
                else m += "\0", m += g;
                g = d + 1;
              }
            }
            else {
              for (m = Array(s), c = 0; c < s; ++c) m[c] = String.fromCharCode(V[f + c]);
              m = m.join("");
            }
            return Bt(o), m;
          }, toWireType: function(o, s) {
            s instanceof ArrayBuffer && (s = new Uint8Array(s));
            var f = typeof s == "string";
            f || s instanceof Uint8Array || s instanceof Uint8ClampedArray || s instanceof Int8Array || J("Cannot pass non-string to std::string");
            var g = r && f ? _t(s) : s.length, c = $e(4 + g + 1), d = c + 4;
            if (z[c >> 2] = g, r && f) Pt(s, V, d, g + 1);
            else if (f) for (f = 0; f < g; ++f) {
              var m = s.charCodeAt(f);
              255 < m && (Bt(d), J("String has UTF-16 code units that do not fit in 8 bits")), V[d + f] = m;
            }
            else for (f = 0; f < g; ++f) V[d + f] = s[f];
            return o !== null && o.push(Bt, c), c;
          }, argPackAdvance: 8, readValueFromPointer: ie, de: function(o) {
            Bt(o);
          } });
        },
        N: function(t, e, r) {
          if (r = et(r), e === 2)
            var o = On, s = In, f = jn, g = () => Kt, c = 1;
          else e === 4 && (o = Wn, s = Un, f = $n, g = () => z, c = 2);
          bt(t, { name: r, fromWireType: function(d) {
            for (var m = z[d >> 2], T = g(), E, k = d + 4, w = 0; w <= m; ++w) {
              var O = d + 4 + w * e;
              (w == m || T[O >> c] == 0) && (k = o(k, O - k), E === void 0 ? E = k : (E += "\0", E += k), k = O + e);
            }
            return Bt(d), E;
          }, toWireType: function(d, m) {
            typeof m != "string" && J(`Cannot pass non-string to C++ string type ${r}`);
            var T = f(m), E = $e(4 + T + e);
            return z[E >> 2] = T >> c, s(m, E + 4, T + e), d !== null && d.push(Bt, E), E;
          }, argPackAdvance: 8, readValueFromPointer: ie, de: function(d) {
            Bt(d);
          } });
        },
        D: function(t, e, r, o, s, f) {
          Fe[t] = { name: et(e), hf: at(r, o), ke: at(s, f), rf: [] };
        },
        e: function(t, e, r, o, s, f, g, c, d, m) {
          Fe[t].rf.push({ Of: et(e), Vf: r, Tf: at(o, s), Uf: f, fg: g, eg: at(c, d), gg: m });
        },
        Ib: function(t, e) {
          e = et(e), bt(t, { Yf: !0, name: e, argPackAdvance: 0, fromWireType: function() {
          }, toWireType: function() {
          } });
        },
        Fb: () => !0,
        ub: () => {
          throw 1 / 0;
        },
        F: function(t, e, r) {
          t = yt(t), e = fe(e, "emval::as");
          var o = [], s = gt(o);
          return z[r >> 2] = s, e.toWireType(o, t);
        },
        Z: function(t, e, r, o, s) {
          t = Re[t], e = yt(e), r = xe(r);
          var f = [];
          return z[o >> 2] = gt(f), t(e, r, f, s);
        },
        w: function(t, e, r, o) {
          t = Re[t], e = yt(e), r = xe(r), t(e, r, null, o);
        },
        d: ir,
        K: function(t) {
          return t === 0 ? gt(Gr()) : (t = xe(t), gt(Gr()[t]));
        },
        u: function(t, e) {
          var r = Vn(t, e), o = r[0];
          e = o.name + "_$" + r.slice(1).map(function(g) {
            return g.name;
          }).join("_") + "$";
          var s = Nr[e];
          if (s !== void 0) return s;
          var f = Array(t - 1);
          return s = Dn((g, c, d, m) => {
            for (var T = 0, E = 0; E < t - 1; ++E) f[E] = r[E + 1].readValueFromPointer(m + T), T += r[E + 1].argPackAdvance;
            for (g = g[c].apply(g, f), E = 0; E < t - 1; ++E) r[E + 1].Lf && r[E + 1].Lf(f[E]);
            if (!o.Yf) return o.toWireType(d, g);
          }), Nr[e] = s;
        },
        z: function(t, e) {
          return t = yt(t), e = yt(e), gt(t[e]);
        },
        p: function(t) {
          4 < t && (pt.get(t).wf += 1);
        },
        J: function(t, e, r, o) {
          t = yt(t);
          var s = Kr[e];
          return s || (s = Gn(e), Kr[e] = s), s(t, r, o);
        },
        H: function() {
          return gt([]);
        },
        g: function(t) {
          return gt(xe(t));
        },
        G: function() {
          return gt({});
        },
        kb: function(t) {
          return t = yt(t), !t;
        },
        B: function(t) {
          var e = yt(t);
          Qe(e), ir(t);
        },
        i: function(t, e, r) {
          t = yt(t), e = yt(e), r = yt(r), t[e] = r;
        },
        h: function(t, e) {
          return t = fe(t, "_emval_take_value"), t = t.readValueFromPointer(e), gt(t);
        },
        nb: function() {
          return -52;
        },
        ob: function() {
        },
        a: () => {
          Ye("");
        },
        Eb: () => performance.now(),
        vb: (t) => {
          var e = V.length;
          if (t >>>= 0, 2147483648 < t) return !1;
          for (var r = 1; 4 >= r; r *= 2) {
            var o = e * (1 + 0.2 / r);
            o = Math.min(o, t + 100663296);
            var s = Math;
            o = Math.max(t, o);
            t: {
              s = s.min.call(s, 2147483648, o + (65536 - o % 65536) % 65536) - _e.buffer.byteLength + 65535 >>> 16;
              try {
                _e.grow(s), Fr();
                var f = 1;
                break t;
              } catch {
              }
              f = void 0;
            }
            if (f) return !0;
          }
          return !1;
        },
        lb: function() {
          return U ? U.handle : 0;
        },
        wb: (t, e) => {
          var r = 0;
          return qr().forEach(function(o, s) {
            var f = e + r;
            for (s = z[t + 4 * s >> 2] = f, f = 0; f < o.length; ++f) Ct[s++ >> 0] = o.charCodeAt(f);
            Ct[s >> 0] = 0, r += o.length + 1;
          }), 0;
        },
        xb: (t, e) => {
          var r = qr();
          z[t >> 2] = r.length;
          var o = 0;
          return r.forEach(function(s) {
            o += s.length + 1;
          }), z[e >> 2] = o, 0;
        },
        Jb: (t) => {
          Ne(t, new Mn(t));
        },
        M: () => 52,
        mb: function() {
          return 52;
        },
        Cb: () => 52,
        pb: function() {
          return 70;
        },
        S: (t, e, r, o) => {
          for (var s = 0, f = 0; f < r; f++) {
            var g = z[e >> 2], c = z[e + 4 >> 2];
            e += 8;
            for (var d = 0; d < c; d++) {
              var m = V[g + d], T = zn[t];
              m === 0 || m === 10 ? ((t === 1 ? wn : Lt)(Ht(T, 0)), T.length = 0) : T.push(m);
            }
            s += c;
          }
          return z[o >> 2] = s, 0;
        },
        aa: function(t) {
          v.activeTexture(t);
        },
        ba: function(t, e) {
          v.attachShader(Ft[t], Mt[e]);
        },
        ca: function(t, e, r) {
          v.bindAttribLocation(Ft[t], e, r ? Ht(V, r) : "");
        },
        da: function(t, e) {
          t == 35051 ? v.ef = e : t == 35052 && (v.De = e), v.bindBuffer(t, Be[e]);
        },
        $: function(t, e) {
          v.bindFramebuffer(t, ke[e]);
        },
        fc: function(t, e) {
          v.bindRenderbuffer(t, ce[e]);
        },
        Rb: function(t, e) {
          v.bindSampler(t, Vt[e]);
        },
        ea: function(t, e) {
          v.bindTexture(t, mt[e]);
        },
        zc: Zr,
        Cc: Zr,
        fa: function(t, e, r, o) {
          v.blendColor(t, e, r, o);
        },
        ga: function(t) {
          v.blendEquation(t);
        },
        ha: function(t, e) {
          v.blendFunc(t, e);
        },
        $b: function(t, e, r, o, s, f, g, c, d, m) {
          v.blitFramebuffer(t, e, r, o, s, f, g, c, d, m);
        },
        ia: function(t, e, r, o) {
          2 <= U.version ? r && e ? v.bufferData(t, V, o, r, e) : v.bufferData(t, e, o) : v.bufferData(t, r ? V.subarray(r, r + e) : e, o);
        },
        ja: function(t, e, r, o) {
          2 <= U.version ? r && v.bufferSubData(t, e, V, o, r) : v.bufferSubData(t, e, V.subarray(o, o + r));
        },
        gc: function(t) {
          return v.checkFramebufferStatus(t);
        },
        Q: function(t) {
          v.clear(t);
        },
        _: function(t, e, r, o) {
          v.clearColor(t, e, r, o);
        },
        R: function(t) {
          v.clearStencil(t);
        },
        sb: function(t, e, r, o) {
          return v.clientWaitSync(Gt[t], e, (r >>> 0) + 4294967296 * o);
        },
        ka: function(t, e, r, o) {
          v.colorMask(!!t, !!e, !!r, !!o);
        },
        la: function(t) {
          v.compileShader(Mt[t]);
        },
        ma: function(t, e, r, o, s, f, g, c) {
          2 <= U.version ? v.De || !g ? v.compressedTexImage2D(t, e, r, o, s, f, g, c) : v.compressedTexImage2D(
            t,
            e,
            r,
            o,
            s,
            f,
            V,
            c,
            g
          ) : v.compressedTexImage2D(t, e, r, o, s, f, c ? V.subarray(c, c + g) : null);
        },
        na: function(t, e, r, o, s, f, g, c, d) {
          2 <= U.version ? v.De || !c ? v.compressedTexSubImage2D(t, e, r, o, s, f, g, c, d) : v.compressedTexSubImage2D(t, e, r, o, s, f, g, V, d, c) : v.compressedTexSubImage2D(t, e, r, o, s, f, g, d ? V.subarray(d, d + c) : null);
        },
        Zb: function(t, e, r, o, s) {
          v.copyBufferSubData(t, e, r, o, s);
        },
        oa: function(t, e, r, o, s, f, g, c) {
          v.copyTexSubImage2D(t, e, r, o, s, f, g, c);
        },
        pa: function() {
          var t = Qt(Ft), e = v.createProgram();
          return e.name = t, e.Ye = e.We = e.Xe = 0, e.kf = 1, Ft[t] = e, t;
        },
        qa: function(t) {
          var e = Qt(Mt);
          return Mt[e] = v.createShader(t), e;
        },
        ra: function(t) {
          v.cullFace(t);
        },
        sa: function(t, e) {
          for (var r = 0; r < t; r++) {
            var o = B[e + 4 * r >> 2], s = Be[o];
            s && (v.deleteBuffer(s), s.name = 0, Be[o] = null, o == v.ef && (v.ef = 0), o == v.De && (v.De = 0));
          }
        },
        hc: function(t, e) {
          for (var r = 0; r < t; ++r) {
            var o = B[e + 4 * r >> 2], s = ke[o];
            s && (v.deleteFramebuffer(s), s.name = 0, ke[o] = null);
          }
        },
        ta: function(t) {
          if (t) {
            var e = Ft[t];
            e ? (v.deleteProgram(e), e.name = 0, Ft[t] = null) : q(1281);
          }
        },
        ic: function(t, e) {
          for (var r = 0; r < t; r++) {
            var o = B[e + 4 * r >> 2], s = ce[o];
            s && (v.deleteRenderbuffer(s), s.name = 0, ce[o] = null);
          }
        },
        Sb: function(t, e) {
          for (var r = 0; r < t; r++) {
            var o = B[e + 4 * r >> 2], s = Vt[o];
            s && (v.deleteSampler(s), s.name = 0, Vt[o] = null);
          }
        },
        ua: function(t) {
          if (t) {
            var e = Mt[t];
            e ? (v.deleteShader(e), Mt[t] = null) : q(1281);
          }
        },
        _b: function(t) {
          if (t) {
            var e = Gt[t];
            e ? (v.deleteSync(e), e.name = 0, Gt[t] = null) : q(1281);
          }
        },
        va: function(t, e) {
          for (var r = 0; r < t; r++) {
            var o = B[e + 4 * r >> 2], s = mt[o];
            s && (v.deleteTexture(s), s.name = 0, mt[o] = null);
          }
        },
        Ac: tn,
        Dc: tn,
        wa: function(t) {
          v.depthMask(!!t);
        },
        xa: function(t) {
          v.disable(t);
        },
        ya: function(t) {
          v.disableVertexAttribArray(t);
        },
        za: function(t, e, r) {
          v.drawArrays(t, e, r);
        },
        xc: function(t, e, r, o) {
          v.drawArraysInstanced(t, e, r, o);
        },
        vc: function(t, e, r, o, s) {
          v.pf.drawArraysInstancedBaseInstanceWEBGL(t, e, r, o, s);
        },
        tc: function(t, e) {
          for (var r = Ie[t], o = 0; o < t; o++) r[o] = B[e + 4 * o >> 2];
          v.drawBuffers(r);
        },
        Aa: en,
        yc: function(t, e, r, o, s) {
          v.drawElementsInstanced(t, e, r, o, s);
        },
        wc: function(t, e, r, o, s, f, g) {
          v.pf.drawElementsInstancedBaseVertexBaseInstanceWEBGL(t, e, r, o, s, f, g);
        },
        nc: function(t, e, r, o, s, f) {
          en(t, o, s, f);
        },
        Ba: function(t) {
          v.enable(t);
        },
        Ca: function(t) {
          v.enableVertexAttribArray(t);
        },
        Xb: function(t, e) {
          return (t = v.fenceSync(t, e)) ? (e = Qt(Gt), t.name = e, Gt[e] = t, e) : 0;
        },
        Da: function() {
          v.finish();
        },
        Ea: function() {
          v.flush();
        },
        jc: function(t, e, r, o) {
          v.framebufferRenderbuffer(t, e, r, ce[o]);
        },
        kc: function(t, e, r, o, s) {
          v.framebufferTexture2D(t, e, r, mt[o], s);
        },
        Fa: function(t) {
          v.frontFace(t);
        },
        Ga: function(t, e) {
          zt(t, e, "createBuffer", Be);
        },
        lc: function(t, e) {
          zt(t, e, "createFramebuffer", ke);
        },
        mc: function(t, e) {
          zt(t, e, "createRenderbuffer", ce);
        },
        Tb: function(t, e) {
          zt(
            t,
            e,
            "createSampler",
            Vt
          );
        },
        Ha: function(t, e) {
          zt(t, e, "createTexture", mt);
        },
        Bc: rn,
        Ec: rn,
        bc: function(t) {
          v.generateMipmap(t);
        },
        Ia: function(t, e, r) {
          r ? B[r >> 2] = v.getBufferParameter(t, e) : q(1281);
        },
        Ja: function() {
          var t = v.getError() || Oe;
          return Oe = 0, t;
        },
        Ka: function(t, e) {
          nn(t, e, 2);
        },
        cc: function(t, e, r, o) {
          t = v.getFramebufferAttachmentParameter(t, e, r), (t instanceof WebGLRenderbuffer || t instanceof WebGLTexture) && (t = t.name | 0), B[o >> 2] = t;
        },
        L: function(t, e) {
          nn(t, e, 0);
        },
        La: function(t, e, r, o) {
          t = v.getProgramInfoLog(Ft[t]), t === null && (t = "(unknown error)"), e = 0 < e && o ? Pt(t, V, o, e) : 0, r && (B[r >> 2] = e);
        },
        Ma: function(t, e, r) {
          if (r) if (t >= Jr) q(1281);
          else if (t = Ft[t], e == 35716) t = v.getProgramInfoLog(t), t === null && (t = "(unknown error)"), B[r >> 2] = t.length + 1;
          else if (e == 35719) {
            if (!t.Ye) for (e = 0; e < v.getProgramParameter(t, 35718); ++e) t.Ye = Math.max(t.Ye, v.getActiveUniform(t, e).name.length + 1);
            B[r >> 2] = t.Ye;
          } else if (e == 35722) {
            if (!t.We) for (e = 0; e < v.getProgramParameter(t, 35721); ++e) t.We = Math.max(t.We, v.getActiveAttrib(t, e).name.length + 1);
            B[r >> 2] = t.We;
          } else if (e == 35381) {
            if (!t.Xe) for (e = 0; e < v.getProgramParameter(t, 35382); ++e) t.Xe = Math.max(t.Xe, v.getActiveUniformBlockName(t, e).length + 1);
            B[r >> 2] = t.Xe;
          } else B[r >> 2] = v.getProgramParameter(t, e);
          else q(1281);
        },
        dc: function(t, e, r) {
          r ? B[r >> 2] = v.getRenderbufferParameter(t, e) : q(1281);
        },
        Na: function(t, e, r, o) {
          t = v.getShaderInfoLog(Mt[t]), t === null && (t = "(unknown error)"), e = 0 < e && o ? Pt(t, V, o, e) : 0, r && (B[r >> 2] = e);
        },
        Ob: function(t, e, r, o) {
          t = v.getShaderPrecisionFormat(t, e), B[r >> 2] = t.rangeMin, B[r + 4 >> 2] = t.rangeMax, B[o >> 2] = t.precision;
        },
        Oa: function(t, e, r) {
          r ? e == 35716 ? (t = v.getShaderInfoLog(Mt[t]), t === null && (t = "(unknown error)"), B[r >> 2] = t ? t.length + 1 : 0) : e == 35720 ? (t = v.getShaderSource(Mt[t]), B[r >> 2] = t ? t.length + 1 : 0) : B[r >> 2] = v.getShaderParameter(Mt[t], e) : q(1281);
        },
        P: function(t) {
          var e = Yr[t];
          if (!e) {
            switch (t) {
              case 7939:
                e = v.getSupportedExtensions() || [], e = e.concat(e.map(function(o) {
                  return "GL_" + o;
                })), e = de(e.join(" "));
                break;
              case 7936:
              case 7937:
              case 37445:
              case 37446:
                (e = v.getParameter(t)) || q(1280), e = e && de(e);
                break;
              case 7938:
                e = v.getParameter(7938), e = 2 <= U.version ? "OpenGL ES 3.0 (" + e + ")" : "OpenGL ES 2.0 (" + e + ")", e = de(e);
                break;
              case 35724:
                e = v.getParameter(35724);
                var r = e.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
                r !== null && (r[1].length == 3 && (r[1] += "0"), e = "OpenGL ES GLSL ES " + r[1] + " (" + e + ")"), e = de(e);
                break;
              default:
                q(1280);
            }
            Yr[t] = e;
          }
          return e;
        },
        jb: function(t, e) {
          if (2 > U.version) return q(1282), 0;
          var r = Xr[t];
          if (r) return 0 > e || e >= r.length ? (q(1281), 0) : r[e];
          switch (t) {
            case 7939:
              return r = v.getSupportedExtensions() || [], r = r.concat(r.map(function(o) {
                return "GL_" + o;
              })), r = r.map(function(o) {
                return de(o);
              }), r = Xr[t] = r, 0 > e || e >= r.length ? (q(1281), 0) : r[e];
            default:
              return q(1280), 0;
          }
        },
        Pa: function(t, e) {
          if (e = e ? Ht(V, e) : "", t = Ft[t]) {
            var r = t, o = r.Ne, s = r.yf, f;
            if (!o) for (r.Ne = o = {}, r.xf = {}, f = 0; f < v.getProgramParameter(r, 35718); ++f) {
              var g = v.getActiveUniform(r, f), c = g.name;
              g = g.size;
              var d = on(c);
              d = 0 < d ? c.slice(0, d) : c;
              var m = r.kf;
              for (r.kf += g, s[d] = [g, m], c = 0; c < g; ++c) o[m] = c, r.xf[m++] = d;
            }
            if (r = t.Ne, o = 0, s = e, f = on(e), 0 < f && (o = parseInt(e.slice(f + 1)) >>> 0, s = e.slice(0, f)), (s = t.yf[s]) && o < s[0] && (o += s[1], r[o] = r[o] || v.getUniformLocation(
              t,
              e
            ))) return o;
          } else q(1281);
          return -1;
        },
        Pb: function(t, e, r) {
          for (var o = Ie[e], s = 0; s < e; s++) o[s] = B[r + 4 * s >> 2];
          v.invalidateFramebuffer(t, o);
        },
        Qb: function(t, e, r, o, s, f, g) {
          for (var c = Ie[e], d = 0; d < e; d++) c[d] = B[r + 4 * d >> 2];
          v.invalidateSubFramebuffer(t, c, o, s, f, g);
        },
        Yb: function(t) {
          return v.isSync(Gt[t]);
        },
        Qa: function(t) {
          return (t = mt[t]) ? v.isTexture(t) : 0;
        },
        Ra: function(t) {
          v.lineWidth(t);
        },
        Sa: function(t) {
          t = Ft[t], v.linkProgram(t), t.Ne = 0, t.yf = {};
        },
        rc: function(t, e, r, o, s, f) {
          v.uf.multiDrawArraysInstancedBaseInstanceWEBGL(
            t,
            B,
            e >> 2,
            B,
            r >> 2,
            B,
            o >> 2,
            z,
            s >> 2,
            f
          );
        },
        sc: function(t, e, r, o, s, f, g, c) {
          v.uf.multiDrawElementsInstancedBaseVertexBaseInstanceWEBGL(t, B, e >> 2, r, B, o >> 2, B, s >> 2, B, f >> 2, z, g >> 2, c);
        },
        Ta: function(t, e) {
          t == 3317 && (Qr = e), v.pixelStorei(t, e);
        },
        uc: function(t) {
          v.readBuffer(t);
        },
        Ua: function(t, e, r, o, s, f, g) {
          if (2 <= U.version) if (v.ef) v.readPixels(t, e, r, o, s, f, g);
          else {
            var c = je(f);
            v.readPixels(t, e, r, o, s, f, c, g >> 31 - Math.clz32(c.BYTES_PER_ELEMENT));
          }
          else (g = ur(f, s, r, o, g)) ? v.readPixels(t, e, r, o, s, f, g) : q(1280);
        },
        ec: function(t, e, r, o) {
          v.renderbufferStorage(
            t,
            e,
            r,
            o
          );
        },
        ac: function(t, e, r, o, s) {
          v.renderbufferStorageMultisample(t, e, r, o, s);
        },
        Ub: function(t, e, r) {
          v.samplerParameterf(Vt[t], e, r);
        },
        Vb: function(t, e, r) {
          v.samplerParameteri(Vt[t], e, r);
        },
        Wb: function(t, e, r) {
          v.samplerParameteri(Vt[t], e, B[r >> 2]);
        },
        Va: function(t, e, r, o) {
          v.scissor(t, e, r, o);
        },
        Wa: function(t, e, r, o) {
          for (var s = "", f = 0; f < e; ++f) {
            var g = o ? B[o + 4 * f >> 2] : -1, c = B[r + 4 * f >> 2];
            g = c ? Ht(V, c, 0 > g ? void 0 : g) : "", s += g;
          }
          v.shaderSource(Mt[t], s);
        },
        Xa: function(t, e, r) {
          v.stencilFunc(t, e, r);
        },
        Ya: function(t, e, r, o) {
          v.stencilFuncSeparate(
            t,
            e,
            r,
            o
          );
        },
        Za: function(t) {
          v.stencilMask(t);
        },
        _a: function(t, e) {
          v.stencilMaskSeparate(t, e);
        },
        $a: function(t, e, r) {
          v.stencilOp(t, e, r);
        },
        ab: function(t, e, r, o) {
          v.stencilOpSeparate(t, e, r, o);
        },
        bb: function(t, e, r, o, s, f, g, c, d) {
          if (2 <= U.version) if (v.De) v.texImage2D(t, e, r, o, s, f, g, c, d);
          else if (d) {
            var m = je(c);
            v.texImage2D(t, e, r, o, s, f, g, c, m, d >> 31 - Math.clz32(m.BYTES_PER_ELEMENT));
          } else v.texImage2D(t, e, r, o, s, f, g, c, null);
          else v.texImage2D(t, e, r, o, s, f, g, c, d ? ur(c, g, o, s, d) : null);
        },
        cb: function(t, e, r) {
          v.texParameterf(t, e, r);
        },
        db: function(t, e, r) {
          v.texParameterf(t, e, W[r >> 2]);
        },
        eb: function(t, e, r) {
          v.texParameteri(t, e, r);
        },
        fb: function(t, e, r) {
          v.texParameteri(t, e, B[r >> 2]);
        },
        oc: function(t, e, r, o, s) {
          v.texStorage2D(t, e, r, o, s);
        },
        gb: function(t, e, r, o, s, f, g, c, d) {
          if (2 <= U.version) if (v.De) v.texSubImage2D(t, e, r, o, s, f, g, c, d);
          else if (d) {
            var m = je(c);
            v.texSubImage2D(t, e, r, o, s, f, g, c, m, d >> 31 - Math.clz32(m.BYTES_PER_ELEMENT));
          } else v.texSubImage2D(t, e, r, o, s, f, g, c, null);
          else m = null, d && (m = ur(c, g, s, f, d)), v.texSubImage2D(t, e, r, o, s, f, g, c, m);
        },
        hb: function(t, e) {
          v.uniform1f(
            X(t),
            e
          );
        },
        ib: function(t, e, r) {
          if (2 <= U.version) e && v.uniform1fv(X(t), W, r >> 2, e);
          else {
            if (288 >= e) for (var o = jt[e - 1], s = 0; s < e; ++s) o[s] = W[r + 4 * s >> 2];
            else o = W.subarray(r >> 2, r + 4 * e >> 2);
            v.uniform1fv(X(t), o);
          }
        },
        Zc: function(t, e) {
          v.uniform1i(X(t), e);
        },
        _c: function(t, e, r) {
          if (2 <= U.version) e && v.uniform1iv(X(t), B, r >> 2, e);
          else {
            if (288 >= e) for (var o = he[e - 1], s = 0; s < e; ++s) o[s] = B[r + 4 * s >> 2];
            else o = B.subarray(r >> 2, r + 4 * e >> 2);
            v.uniform1iv(X(t), o);
          }
        },
        $c: function(t, e, r) {
          v.uniform2f(X(t), e, r);
        },
        ad: function(t, e, r) {
          if (2 <= U.version) e && v.uniform2fv(
            X(t),
            W,
            r >> 2,
            2 * e
          );
          else {
            if (144 >= e) for (var o = jt[2 * e - 1], s = 0; s < 2 * e; s += 2) o[s] = W[r + 4 * s >> 2], o[s + 1] = W[r + (4 * s + 4) >> 2];
            else o = W.subarray(r >> 2, r + 8 * e >> 2);
            v.uniform2fv(X(t), o);
          }
        },
        Yc: function(t, e, r) {
          v.uniform2i(X(t), e, r);
        },
        Xc: function(t, e, r) {
          if (2 <= U.version) e && v.uniform2iv(X(t), B, r >> 2, 2 * e);
          else {
            if (144 >= e) for (var o = he[2 * e - 1], s = 0; s < 2 * e; s += 2) o[s] = B[r + 4 * s >> 2], o[s + 1] = B[r + (4 * s + 4) >> 2];
            else o = B.subarray(r >> 2, r + 8 * e >> 2);
            v.uniform2iv(X(t), o);
          }
        },
        Wc: function(t, e, r, o) {
          v.uniform3f(X(t), e, r, o);
        },
        Vc: function(t, e, r) {
          if (2 <= U.version) e && v.uniform3fv(X(t), W, r >> 2, 3 * e);
          else {
            if (96 >= e) for (var o = jt[3 * e - 1], s = 0; s < 3 * e; s += 3) o[s] = W[r + 4 * s >> 2], o[s + 1] = W[r + (4 * s + 4) >> 2], o[s + 2] = W[r + (4 * s + 8) >> 2];
            else o = W.subarray(r >> 2, r + 12 * e >> 2);
            v.uniform3fv(X(t), o);
          }
        },
        Uc: function(t, e, r, o) {
          v.uniform3i(X(t), e, r, o);
        },
        Tc: function(t, e, r) {
          if (2 <= U.version) e && v.uniform3iv(X(t), B, r >> 2, 3 * e);
          else {
            if (96 >= e) for (var o = he[3 * e - 1], s = 0; s < 3 * e; s += 3) o[s] = B[r + 4 * s >> 2], o[s + 1] = B[r + (4 * s + 4) >> 2], o[s + 2] = B[r + (4 * s + 8) >> 2];
            else o = B.subarray(r >> 2, r + 12 * e >> 2);
            v.uniform3iv(X(t), o);
          }
        },
        Sc: function(t, e, r, o, s) {
          v.uniform4f(X(t), e, r, o, s);
        },
        Rc: function(t, e, r) {
          if (2 <= U.version) e && v.uniform4fv(X(t), W, r >> 2, 4 * e);
          else {
            if (72 >= e) {
              var o = jt[4 * e - 1], s = W;
              r >>= 2;
              for (var f = 0; f < 4 * e; f += 4) {
                var g = r + f;
                o[f] = s[g], o[f + 1] = s[g + 1], o[f + 2] = s[g + 2], o[f + 3] = s[g + 3];
              }
            } else o = W.subarray(r >> 2, r + 16 * e >> 2);
            v.uniform4fv(X(t), o);
          }
        },
        Fc: function(t, e, r, o, s) {
          v.uniform4i(X(t), e, r, o, s);
        },
        Gc: function(t, e, r) {
          if (2 <= U.version) e && v.uniform4iv(X(t), B, r >> 2, 4 * e);
          else {
            if (72 >= e) for (var o = he[4 * e - 1], s = 0; s < 4 * e; s += 4) o[s] = B[r + 4 * s >> 2], o[s + 1] = B[r + (4 * s + 4) >> 2], o[s + 2] = B[r + (4 * s + 8) >> 2], o[s + 3] = B[r + (4 * s + 12) >> 2];
            else o = B.subarray(r >> 2, r + 16 * e >> 2);
            v.uniform4iv(X(t), o);
          }
        },
        Hc: function(t, e, r, o) {
          if (2 <= U.version) e && v.uniformMatrix2fv(X(t), !!r, W, o >> 2, 4 * e);
          else {
            if (72 >= e) for (var s = jt[4 * e - 1], f = 0; f < 4 * e; f += 4) s[f] = W[o + 4 * f >> 2], s[f + 1] = W[o + (4 * f + 4) >> 2], s[f + 2] = W[o + (4 * f + 8) >> 2], s[f + 3] = W[o + (4 * f + 12) >> 2];
            else s = W.subarray(o >> 2, o + 16 * e >> 2);
            v.uniformMatrix2fv(X(t), !!r, s);
          }
        },
        Ic: function(t, e, r, o) {
          if (2 <= U.version) e && v.uniformMatrix3fv(X(t), !!r, W, o >> 2, 9 * e);
          else {
            if (32 >= e) for (var s = jt[9 * e - 1], f = 0; f < 9 * e; f += 9) s[f] = W[o + 4 * f >> 2], s[f + 1] = W[o + (4 * f + 4) >> 2], s[f + 2] = W[o + (4 * f + 8) >> 2], s[f + 3] = W[o + (4 * f + 12) >> 2], s[f + 4] = W[o + (4 * f + 16) >> 2], s[f + 5] = W[o + (4 * f + 20) >> 2], s[f + 6] = W[o + (4 * f + 24) >> 2], s[f + 7] = W[o + (4 * f + 28) >> 2], s[f + 8] = W[o + (4 * f + 32) >> 2];
            else s = W.subarray(o >> 2, o + 36 * e >> 2);
            v.uniformMatrix3fv(X(t), !!r, s);
          }
        },
        Jc: function(t, e, r, o) {
          if (2 <= U.version) e && v.uniformMatrix4fv(X(t), !!r, W, o >> 2, 16 * e);
          else {
            if (18 >= e) {
              var s = jt[16 * e - 1], f = W;
              o >>= 2;
              for (var g = 0; g < 16 * e; g += 16) {
                var c = o + g;
                s[g] = f[c], s[g + 1] = f[c + 1], s[g + 2] = f[c + 2], s[g + 3] = f[c + 3], s[g + 4] = f[c + 4], s[g + 5] = f[c + 5], s[g + 6] = f[c + 6], s[g + 7] = f[c + 7], s[g + 8] = f[c + 8], s[g + 9] = f[c + 9], s[g + 10] = f[c + 10], s[g + 11] = f[c + 11], s[g + 12] = f[c + 12], s[g + 13] = f[c + 13], s[g + 14] = f[c + 14], s[g + 15] = f[c + 15];
              }
            } else s = W.subarray(o >> 2, o + 64 * e >> 2);
            v.uniformMatrix4fv(X(t), !!r, s);
          }
        },
        Kc: function(t) {
          t = Ft[t], v.useProgram(t), v.Kf = t;
        },
        Lc: function(t, e) {
          v.vertexAttrib1f(t, e);
        },
        Mc: function(t, e) {
          v.vertexAttrib2f(t, W[e >> 2], W[e + 4 >> 2]);
        },
        Nc: function(t, e) {
          v.vertexAttrib3f(t, W[e >> 2], W[e + 4 >> 2], W[e + 8 >> 2]);
        },
        Oc: function(t, e) {
          v.vertexAttrib4f(t, W[e >> 2], W[e + 4 >> 2], W[e + 8 >> 2], W[e + 12 >> 2]);
        },
        pc: function(t, e) {
          v.vertexAttribDivisor(t, e);
        },
        qc: function(t, e, r, o, s) {
          v.vertexAttribIPointer(t, e, r, o, s);
        },
        Pc: function(t, e, r, o, s, f) {
          v.vertexAttribPointer(t, e, r, !!o, s, f);
        },
        Qc: function(t, e, r, o) {
          v.viewport(t, e, r, o);
        },
        rb: function(t, e, r, o) {
          v.waitSync(Gt[t], e, (r >>> 0) + 4294967296 * o);
        },
        j: ii,
        n: ci,
        k: ni,
        I: hi,
        Lb: pi,
        Y: yi,
        X: mi,
        O: ui,
        o: fi,
        x: si,
        r: ai,
        v: li,
        Kb: gi,
        Mb: di,
        Nb: oi,
        tb: (t, e, r, o) => Zn(t, e, r, o)
      };
      (function() {
        function t(r) {
          if (G = r = r.exports, _e = G.bd, Fr(), it = G.dd, Sr.unshift(G.cd), $t--, _.monitorRunDependencies && _.monitorRunDependencies($t), $t == 0 && ne) {
            var o = ne;
            ne = null, o();
          }
          return r;
        }
        var e = { a: ri };
        if ($t++, _.monitorRunDependencies && _.monitorRunDependencies($t), _.instantiateWasm) try {
          return _.instantiateWasm(e, t);
        } catch (r) {
          Lt("Module.instantiateWasm callback failed with error: " + r), Ae(r);
        }
        return Fn(e, function(r) {
          t(r.instance);
        }).catch(Ae), {};
      })();
      var Bt = _._free = (t) => (Bt = _._free = G.ed)(t), $e = _._malloc = (t) => ($e = _._malloc = G.fd)(t), ln = (t) => (ln = G.gd)(t);
      _.__embind_initialize_bindings = () => (_.__embind_initialize_bindings = G.hd)();
      var st = (t, e) => (st = G.id)(t, e), ut = () => (ut = G.jd)(), lt = (t) => (lt = G.kd)(t);
      _.dynCall_viji = (t, e, r, o, s) => (_.dynCall_viji = G.ld)(t, e, r, o, s), _.dynCall_vijiii = (t, e, r, o, s, f, g) => (_.dynCall_vijiii = G.md)(t, e, r, o, s, f, g), _.dynCall_viiiiij = (t, e, r, o, s, f, g, c) => (_.dynCall_viiiiij = G.nd)(t, e, r, o, s, f, g, c), _.dynCall_jiiiijiiiii = (t, e, r, o, s, f, g, c, d, m, T, E) => (_.dynCall_jiiiijiiiii = G.od)(t, e, r, o, s, f, g, c, d, m, T, E), _.dynCall_viiij = (t, e, r, o, s, f) => (_.dynCall_viiij = G.pd)(t, e, r, o, s, f), _.dynCall_jii = (t, e, r) => (_.dynCall_jii = G.qd)(t, e, r), _.dynCall_vij = (t, e, r, o) => (_.dynCall_vij = G.rd)(t, e, r, o), _.dynCall_iiij = (t, e, r, o, s) => (_.dynCall_iiij = G.sd)(t, e, r, o, s), _.dynCall_iiiij = (t, e, r, o, s, f) => (_.dynCall_iiiij = G.td)(t, e, r, o, s, f), _.dynCall_viij = (t, e, r, o, s) => (_.dynCall_viij = G.ud)(t, e, r, o, s), _.dynCall_ji = (t, e) => (_.dynCall_ji = G.vd)(t, e), _.dynCall_iij = (t, e, r, o) => (_.dynCall_iij = G.wd)(t, e, r, o), _.dynCall_jiiiiii = (t, e, r, o, s, f, g) => (_.dynCall_jiiiiii = G.xd)(t, e, r, o, s, f, g), _.dynCall_jiiiiji = (t, e, r, o, s, f, g, c) => (_.dynCall_jiiiiji = G.yd)(t, e, r, o, s, f, g, c), _.dynCall_iijj = (t, e, r, o, s, f) => (_.dynCall_iijj = G.zd)(t, e, r, o, s, f), _.dynCall_iiiji = (t, e, r, o, s, f) => (_.dynCall_iiiji = G.Ad)(t, e, r, o, s, f), _.dynCall_iiji = (t, e, r, o, s) => (_.dynCall_iiji = G.Bd)(t, e, r, o, s), _.dynCall_iijjiii = (t, e, r, o, s, f, g, c, d) => (_.dynCall_iijjiii = G.Cd)(t, e, r, o, s, f, g, c, d), _.dynCall_vijjjii = (t, e, r, o, s, f, g, c, d, m) => (_.dynCall_vijjjii = G.Dd)(t, e, r, o, s, f, g, c, d, m), _.dynCall_jiji = (t, e, r, o, s) => (_.dynCall_jiji = G.Ed)(t, e, r, o, s), _.dynCall_viijii = (t, e, r, o, s, f, g) => (_.dynCall_viijii = G.Fd)(t, e, r, o, s, f, g), _.dynCall_iiiiij = (t, e, r, o, s, f, g) => (_.dynCall_iiiiij = G.Gd)(t, e, r, o, s, f, g), _.dynCall_iiiiijj = (t, e, r, o, s, f, g, c, d) => (_.dynCall_iiiiijj = G.Hd)(t, e, r, o, s, f, g, c, d), _.dynCall_iiiiiijj = (t, e, r, o, s, f, g, c, d, m) => (_.dynCall_iiiiiijj = G.Id)(t, e, r, o, s, f, g, c, d, m);
      function ni(t, e, r, o) {
        var s = ut();
        try {
          return it.get(t)(e, r, o);
        } catch (f) {
          if (lt(s), f !== f + 0) throw f;
          st(1, 0);
        }
      }
      function ii(t, e) {
        var r = ut();
        try {
          return it.get(t)(e);
        } catch (o) {
          if (lt(r), o !== o + 0) throw o;
          st(1, 0);
        }
      }
      function oi(t, e, r, o, s, f, g, c, d, m) {
        var T = ut();
        try {
          it.get(t)(e, r, o, s, f, g, c, d, m);
        } catch (E) {
          if (lt(T), E !== E + 0) throw E;
          st(1, 0);
        }
      }
      function ai(t, e, r, o) {
        var s = ut();
        try {
          it.get(t)(e, r, o);
        } catch (f) {
          if (lt(s), f !== f + 0) throw f;
          st(1, 0);
        }
      }
      function si(t, e, r) {
        var o = ut();
        try {
          it.get(t)(e, r);
        } catch (s) {
          if (lt(o), s !== s + 0) throw s;
          st(1, 0);
        }
      }
      function ui(t) {
        var e = ut();
        try {
          it.get(t)();
        } catch (r) {
          if (lt(e), r !== r + 0) throw r;
          st(1, 0);
        }
      }
      function li(t, e, r, o, s) {
        var f = ut();
        try {
          it.get(t)(e, r, o, s);
        } catch (g) {
          if (lt(f), g !== g + 0) throw g;
          st(1, 0);
        }
      }
      function fi(t, e) {
        var r = ut();
        try {
          it.get(t)(e);
        } catch (o) {
          if (lt(r), o !== o + 0) throw o;
          st(1, 0);
        }
      }
      function ci(t, e, r) {
        var o = ut();
        try {
          return it.get(t)(e, r);
        } catch (s) {
          if (lt(o), s !== s + 0) throw s;
          st(1, 0);
        }
      }
      function di(t, e, r, o, s, f, g) {
        var c = ut();
        try {
          it.get(t)(e, r, o, s, f, g);
        } catch (d) {
          if (lt(c), d !== d + 0) throw d;
          st(1, 0);
        }
      }
      function hi(t, e, r, o, s) {
        var f = ut();
        try {
          return it.get(t)(e, r, o, s);
        } catch (g) {
          if (lt(f), g !== g + 0) throw g;
          st(1, 0);
        }
      }
      function pi(t, e, r, o, s, f) {
        var g = ut();
        try {
          return it.get(t)(e, r, o, s, f);
        } catch (c) {
          if (lt(g), c !== c + 0) throw c;
          st(1, 0);
        }
      }
      function yi(t, e, r, o, s, f, g) {
        var c = ut();
        try {
          return it.get(t)(e, r, o, s, f, g);
        } catch (d) {
          if (lt(c), d !== d + 0) throw d;
          st(1, 0);
        }
      }
      function gi(t, e, r, o, s, f) {
        var g = ut();
        try {
          it.get(t)(e, r, o, s, f);
        } catch (c) {
          if (lt(g), c !== c + 0) throw c;
          st(1, 0);
        }
      }
      function mi(t, e, r, o, s, f, g, c, d, m) {
        var T = ut();
        try {
          return it.get(t)(e, r, o, s, f, g, c, d, m);
        } catch (E) {
          if (lt(T), E !== E + 0) throw E;
          st(1, 0);
        }
      }
      var He;
      ne = function t() {
        He || fn(), He || (ne = t);
      };
      function fn() {
        function t() {
          if (!He && (He = !0, _.calledRun = !0, !Pr)) {
            if (Xe(Sr), gr(_), _.onRuntimeInitialized && _.onRuntimeInitialized(), _.postRun) for (typeof _.postRun == "function" && (_.postRun = [_.postRun]); _.postRun.length; ) {
              var e = _.postRun.shift();
              Tr.unshift(e);
            }
            Xe(Tr);
          }
        }
        if (!(0 < $t)) {
          if (_.preRun) for (typeof _.preRun == "function" && (_.preRun = [_.preRun]); _.preRun.length; ) Pn();
          Xe(Mr), 0 < $t || (_.setStatus ? (_.setStatus("Running..."), setTimeout(function() {
            setTimeout(function() {
              _.setStatus("");
            }, 1), t();
          }, 1)) : t());
        }
      }
      if (_.preInit) for (typeof _.preInit == "function" && (_.preInit = [_.preInit]); 0 < _.preInit.length; ) _.preInit.pop()();
      return fn(), kt.ready;
    };
  })();
  Zt.exports = te;
})(vn);
var An = vn.exports;
const Si = /* @__PURE__ */ Pi(An), Ci = /* @__PURE__ */ _i({
  __proto__: null,
  default: Si
}, [An]);
export {
  Ci as c
};
