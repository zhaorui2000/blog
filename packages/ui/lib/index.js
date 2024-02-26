import {
  onUnmounted as Te,
  onDeactivated as M,
  isRef as Ae,
  watch as O,
  ref as h,
  onMounted as ve,
  nextTick as me,
  onActivated as W,
  unref as ne,
  reactive as ze,
  getCurrentInstance as G,
  defineComponent as x,
  computed as A,
  createVNode as i,
  onBeforeUnmount as ge,
  provide as he,
  watchEffect as Fe,
  inject as Le,
  mergeProps as Y,
  Transition as ye,
  withDirectives as Ee,
  vShow as be,
  Teleport as Ne,
  Fragment as we,
  openBlock as Re,
  createElementBlock as Ve,
  withCtx as oe,
  renderSlot as je,
  createTextVNode as Ye,
  createElementVNode as Me,
} from 'vue';
function Ue() {}
const _ = Object.assign,
  Be = typeof window < 'u',
  q = (e) => e !== null && typeof e == 'object',
  P = (e) => e != null,
  X = (e) => typeof e == 'function',
  Ke = (e) => q(e) && X(e.then) && X(e.catch),
  Se = (e) => typeof e == 'number' || /^\d+(\.\d+)?$/.test(e),
  Ze = () => (Be ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : !1);
function ae(e, t) {
  const n = t.split('.');
  let o = e;
  return (
    n.forEach((c) => {
      var a;
      o = q(o) && (a = o[c]) != null ? a : '';
    }),
    o
  );
}
function Xe(e, t, n) {
  return t.reduce((o, c) => ((!n || e[c] !== void 0) && (o[c] = e[c]), o), {});
}
const J = null,
  E = [Number, String],
  I = {
    type: Boolean,
    default: !0,
  },
  g = (e) => ({
    type: String,
    default: e,
  });
var Q = typeof window < 'u';
function Ce(e) {
  let t;
  ve(() => {
    e(),
      me(() => {
        t = !0;
      });
  }),
    W(() => {
      t && e();
    });
}
function xe(e, t, n = {}) {
  if (!Q) return;
  const { target: o = window, passive: c = !1, capture: a = !1 } = n;
  let l = !1,
    u;
  const d = (s) => {
      if (l) return;
      const v = ne(s);
      v &&
        !u &&
        (v.addEventListener(e, t, {
          capture: a,
          passive: c,
        }),
        (u = !0));
    },
    r = (s) => {
      if (l) return;
      const v = ne(s);
      v && u && (v.removeEventListener(e, t, a), (u = !1));
    };
  Te(() => r(o)), M(() => r(o)), Ce(() => d(o));
  let f;
  return (
    Ae(o) &&
      (f = O(o, (s, v) => {
        r(v), d(s);
      })),
    () => {
      f == null || f(), r(o), (l = !0);
    }
  );
}
var V, Z;
function He() {
  if (!V && ((V = h(0)), (Z = h(0)), Q)) {
    const e = () => {
      (V.value = window.innerWidth), (Z.value = window.innerHeight);
    };
    e(),
      window.addEventListener('resize', e, { passive: !0 }),
      window.addEventListener('orientationchange', e, { passive: !0 });
  }
  return { width: V, height: Z };
}
var We = /scroll|auto|overlay/i,
  Ge = Q ? window : void 0;
function qe(e) {
  return e.tagName !== 'HTML' && e.tagName !== 'BODY' && e.nodeType === 1;
}
function Je(e, t = Ge) {
  let n = e;
  for (; n && n !== t && qe(n); ) {
    const { overflowY: o } = window.getComputedStyle(n);
    if (We.test(o)) return n;
    n = n.parentNode;
  }
  return t;
}
Ze();
const Qe = (e) => e.stopPropagation();
function ee(e, t) {
  (typeof e.cancelable != 'boolean' || e.cancelable) && e.preventDefault(), t && Qe(e);
}
He();
function b(e) {
  if (P(e)) return Se(e) ? `${e}px` : String(e);
}
function et(e) {
  if (P(e)) {
    if (Array.isArray(e))
      return {
        width: b(e[0]),
        height: b(e[1]),
      };
    const t = b(e);
    return {
      width: t,
      height: t,
    };
  }
}
function tt(e) {
  const t = {};
  return e !== void 0 && (t.zIndex = +e), t;
}
const nt = /-(\w)/g,
  pe = (e) => e.replace(nt, (t, n) => n.toUpperCase()),
  ot = (e) =>
    e
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .replace(/^-/, ''),
  { hasOwnProperty: at } = Object.prototype;
function ct(e, t, n) {
  const o = t[n];
  P(o) && (!at.call(e, n) || !q(o) ? (e[n] = o) : (e[n] = Ie(Object(e[n]), o)));
}
function Ie(e, t) {
  return (
    Object.keys(t).forEach((n) => {
      ct(e, t, n);
    }),
    e
  );
}
var ut = {
  name: '姓名',
  tel: '电话',
  save: '保存',
  clear: '清空',
  cancel: '取消',
  confirm: '确认',
  delete: '删除',
  loading: '加载中...',
  noCoupon: '暂无优惠券',
  nameEmpty: '请填写姓名',
  addContact: '添加联系人',
  telInvalid: '请填写正确的电话',
  vanCalendar: {
    end: '结束',
    start: '开始',
    title: '日期选择',
    weekdays: ['日', '一', '二', '三', '四', '五', '六'],
    monthTitle: (e, t) => `${e}年${t}月`,
    rangePrompt: (e) => `最多选择 ${e} 天`,
  },
  vanCascader: {
    select: '请选择',
  },
  vanPagination: {
    prev: '上一页',
    next: '下一页',
  },
  vanPullRefresh: {
    pulling: '下拉即可刷新...',
    loosing: '释放即可刷新...',
  },
  vanSubmitBar: {
    label: '合计:',
  },
  vanCoupon: {
    unlimited: '无门槛',
    discount: (e) => `${e}折`,
    condition: (e) => `满${e}元可用`,
  },
  vanCouponCell: {
    title: '优惠券',
    count: (e) => `${e}张可用`,
  },
  vanCouponList: {
    exchange: '兑换',
    close: '不使用',
    enable: '可用',
    disabled: '不可用',
    placeholder: '输入优惠码',
  },
  vanAddressEdit: {
    area: '地区',
    areaEmpty: '请选择地区',
    addressEmpty: '请填写详细地址',
    addressDetail: '详细地址',
    defaultAddress: '设为默认收货地址',
  },
  vanAddressList: {
    add: '新增地址',
  },
};
const ce = h('zh-CN'),
  ue = ze({
    'zh-CN': ut,
  }),
  lt = {
    messages() {
      return ue[ce.value];
    },
    use(e, t) {
      (ce.value = e), this.add({ [e]: t });
    },
    add(e = {}) {
      Ie(ue, e);
    },
  };
var rt = lt;
function it(e) {
  const t = pe(e) + '.';
  return (n, ...o) => {
    const c = rt.messages(),
      a = ae(c, t + n) || ae(c, n);
    return X(a) ? a(...o) : a;
  };
}
function H(e, t) {
  return t
    ? typeof t == 'string'
      ? ` ${e}--${t}`
      : Array.isArray(t)
        ? t.reduce((n, o) => n + H(e, o), '')
        : Object.keys(t).reduce((n, o) => n + (t[o] ? H(e, o) : ''), '')
    : '';
}
function st(e) {
  return (t, n) => (t && typeof t != 'string' && ((n = t), (t = '')), (t = t ? `${e}__${t}` : e), `${t}${H(t, n)}`);
}
function p(e) {
  const t = `van-${e}`;
  return [t, st(t), it(t)];
}
const dt = 'van-hairline',
  ft = `${dt}--surround`,
  vt = 'van-haptics-feedback',
  le = 5;
function mt(e, { args: t = [], done: n, canceled: o, error: c }) {
  if (e) {
    const a = e.apply(null, t);
    Ke(a)
      ? a
          .then((l) => {
            l ? n() : o && o();
          })
          .catch(c || Ue)
      : a
        ? n()
        : o && o();
  } else n();
}
function $(e) {
  return (
    (e.install = (t) => {
      const { name: n } = e;
      n && (t.component(n, e), t.component(pe(`-${n}`), e));
    }),
    e
  );
}
const gt = Symbol();
function ht(e) {
  const t = G();
  t && _(t.proxy, e);
}
const yt = {
  to: [String, Object],
  url: String,
  replace: Boolean,
};
function Et({ to: e, url: t, replace: n, $router: o }) {
  e && o ? o[n ? 'replace' : 'push'](e) : t && (n ? location.replace(t) : (location.href = t));
}
function bt() {
  const e = G().proxy;
  return () => Et(e);
}
const [wt, re] = p('badge'),
  Bt = {
    dot: Boolean,
    max: E,
    tag: g('div'),
    color: String,
    offset: Array,
    content: E,
    showZero: I,
    position: g('top-right'),
  };
var St = x({
  name: wt,
  props: Bt,
  setup(e, { slots: t }) {
    const n = () => {
        if (t.content) return !0;
        const { content: u, showZero: d } = e;
        return P(u) && u !== '' && (d || (u !== 0 && u !== '0'));
      },
      o = () => {
        const { dot: u, max: d, content: r } = e;
        if (!u && n()) return t.content ? t.content() : P(d) && Se(r) && +r > +d ? `${d}+` : r;
      },
      c = (u) => (u.startsWith('-') ? u.replace('-', '') : `-${u}`),
      a = A(() => {
        const u = {
          background: e.color,
        };
        if (e.offset) {
          const [d, r] = e.offset,
            { position: f } = e,
            [s, v] = f.split('-');
          t.default
            ? (typeof r == 'number' ? (u[s] = b(s === 'top' ? r : -r)) : (u[s] = s === 'top' ? b(r) : c(r)),
              typeof d == 'number' ? (u[v] = b(v === 'left' ? d : -d)) : (u[v] = v === 'left' ? b(d) : c(d)))
            : ((u.marginTop = b(r)), (u.marginLeft = b(d)));
        }
        return u;
      }),
      l = () => {
        if (n() || e.dot)
          return i(
            'div',
            {
              class: re([
                e.position,
                {
                  dot: e.dot,
                  fixed: !!t.default,
                },
              ]),
              style: a.value,
            },
            [o()],
          );
      };
    return () => {
      if (t.default) {
        const { tag: u } = e;
        return i(
          u,
          {
            class: re('wrapper'),
          },
          {
            default: () => [t.default(), l()],
          },
        );
      }
      return l();
    };
  },
});
const Ct = $(St);
let Oe = 2e3;
const xt = () => ++Oe,
  pt = (e) => {
    Oe = e;
  },
  [Pe, It] = p('config-provider'),
  _e = Symbol(Pe),
  Ot = {
    tag: g('div'),
    theme: g('light'),
    zIndex: Number,
    themeVars: Object,
    themeVarsDark: Object,
    themeVarsLight: Object,
    themeVarsScope: g('local'),
    iconPrefix: String,
  };
function Pt(e) {
  return e.replace(/([a-zA-Z])(\d)/g, '$1-$2');
}
function _t(e) {
  const t = {};
  return (
    Object.keys(e).forEach((n) => {
      const o = Pt(ot(n));
      t[`--van-${o}`] = e[n];
    }),
    t
  );
}
function j(e = {}, t = {}) {
  Object.keys(e).forEach((n) => {
    e[n] !== t[n] && document.documentElement.style.setProperty(n, e[n]);
  }),
    Object.keys(t).forEach((n) => {
      e[n] || document.documentElement.style.removeProperty(n);
    });
}
x({
  name: Pe,
  props: Ot,
  setup(e, { slots: t }) {
    const n = A(() => _t(_({}, e.themeVars, e.theme === 'dark' ? e.themeVarsDark : e.themeVarsLight)));
    if (Be) {
      const o = () => {
          document.documentElement.classList.add(`van-theme-${e.theme}`);
        },
        c = (a = e.theme) => {
          document.documentElement.classList.remove(`van-theme-${a}`);
        };
      O(
        () => e.theme,
        (a, l) => {
          l && c(l), o();
        },
        {
          immediate: !0,
        },
      ),
        W(o),
        M(c),
        ge(c),
        O(n, (a, l) => {
          e.themeVarsScope === 'global' && j(a, l);
        }),
        O(
          () => e.themeVarsScope,
          (a, l) => {
            l === 'global' && j({}, n.value), a === 'global' && j(n.value, {});
          },
        ),
        e.themeVarsScope === 'global' && j(n.value, {});
    }
    return (
      he(_e, e),
      Fe(() => {
        e.zIndex !== void 0 && pt(e.zIndex);
      }),
      () =>
        i(
          e.tag,
          {
            class: It(),
            style: e.themeVarsScope === 'local' ? n.value : void 0,
          },
          {
            default: () => {
              var o;
              return [(o = t.default) == null ? void 0 : o.call(t)];
            },
          },
        )
    );
  },
});
const [$t, ie] = p('icon'),
  Dt = (e) => (e == null ? void 0 : e.includes('/')),
  kt = {
    dot: Boolean,
    tag: g('i'),
    name: String,
    size: E,
    badge: E,
    color: String,
    badgeProps: Object,
    classPrefix: String,
  };
var Tt = x({
  name: $t,
  props: kt,
  setup(e, { slots: t }) {
    const n = Le(_e, null),
      o = A(() => e.classPrefix || (n == null ? void 0 : n.iconPrefix) || ie());
    return () => {
      const { tag: c, dot: a, name: l, size: u, badge: d, color: r } = e,
        f = Dt(l);
      return i(
        Ct,
        Y(
          {
            dot: a,
            tag: c,
            class: [o.value, f ? '' : `${o.value}-${l}`],
            style: {
              color: r,
              fontSize: b(u),
            },
            content: d,
          },
          e.badgeProps,
        ),
        {
          default: () => {
            var s;
            return [
              (s = t.default) == null ? void 0 : s.call(t),
              f &&
                i(
                  'img',
                  {
                    class: ie('image'),
                    src: l,
                  },
                  null,
                ),
            ];
          },
        },
      );
    };
  },
});
const te = $(Tt),
  [At, T] = p('loading'),
  zt = Array(12)
    .fill(null)
    .map((e, t) =>
      i(
        'i',
        {
          class: T('line', String(t + 1)),
        },
        null,
      ),
    ),
  Ft = i(
    'svg',
    {
      class: T('circular'),
      viewBox: '25 25 50 50',
    },
    [
      i(
        'circle',
        {
          cx: '50',
          cy: '50',
          r: '20',
          fill: 'none',
        },
        null,
      ),
    ],
  ),
  Lt = {
    size: E,
    type: g('circular'),
    color: String,
    vertical: Boolean,
    textSize: E,
    textColor: String,
  };
var Nt = x({
  name: At,
  props: Lt,
  setup(e, { slots: t }) {
    const n = A(() =>
        _(
          {
            color: e.color,
          },
          et(e.size),
        ),
      ),
      o = () => {
        const a = e.type === 'spinner' ? zt : Ft;
        return i(
          'span',
          {
            class: T('spinner', e.type),
            style: n.value,
          },
          [t.icon ? t.icon() : a],
        );
      },
      c = () => {
        var a;
        if (t.default)
          return i(
            'span',
            {
              class: T('text'),
              style: {
                fontSize: b(e.textSize),
                color: (a = e.textColor) != null ? a : e.color,
              },
            },
            [t.default()],
          );
      };
    return () => {
      const { type: a, vertical: l } = e;
      return i(
        'div',
        {
          class: T([
            a,
            {
              vertical: l,
            },
          ]),
          'aria-live': 'polite',
          'aria-busy': !0,
        },
        [o(), c()],
      );
    };
  },
});
const Rt = $(Nt),
  [Vt, D] = p('button'),
  jt = _({}, yt, {
    tag: g('button'),
    text: String,
    icon: String,
    type: g('default'),
    size: g('normal'),
    color: String,
    block: Boolean,
    plain: Boolean,
    round: Boolean,
    square: Boolean,
    loading: Boolean,
    hairline: Boolean,
    disabled: Boolean,
    iconPrefix: String,
    nativeType: g('button'),
    loadingSize: E,
    loadingText: String,
    loadingType: String,
    iconPosition: g('left'),
  });
var Yt = x({
  name: Vt,
  props: jt,
  emits: ['click'],
  setup(e, { emit: t, slots: n }) {
    const o = bt(),
      c = () =>
        n.loading
          ? n.loading()
          : i(
              Rt,
              {
                size: e.loadingSize,
                type: e.loadingType,
                class: D('loading'),
              },
              null,
            ),
      a = () => {
        if (e.loading) return c();
        if (n.icon)
          return i(
            'div',
            {
              class: D('icon'),
            },
            [n.icon()],
          );
        if (e.icon)
          return i(
            te,
            {
              name: e.icon,
              class: D('icon'),
              classPrefix: e.iconPrefix,
            },
            null,
          );
      },
      l = () => {
        let r;
        if ((e.loading ? (r = e.loadingText) : (r = n.default ? n.default() : e.text), r))
          return i(
            'span',
            {
              class: D('text'),
            },
            [r],
          );
      },
      u = () => {
        const { color: r, plain: f } = e;
        if (r) {
          const s = {
            color: f ? r : 'white',
          };
          return f || (s.background = r), r.includes('gradient') ? (s.border = 0) : (s.borderColor = r), s;
        }
      },
      d = (r) => {
        e.loading ? ee(r) : e.disabled || (t('click', r), o());
      };
    return () => {
      const {
          tag: r,
          type: f,
          size: s,
          block: v,
          round: y,
          plain: w,
          square: S,
          loading: B,
          disabled: z,
          hairline: F,
          nativeType: U,
          iconPosition: L,
        } = e,
        N = [
          D([
            f,
            s,
            {
              plain: w,
              block: v,
              round: y,
              square: S,
              loading: B,
              disabled: z,
              hairline: F,
            },
          ]),
          {
            [ft]: F,
          },
        ];
      return i(
        r,
        {
          type: U,
          class: N,
          style: u(),
          disabled: z,
          onClick: d,
        },
        {
          default: () => [
            i(
              'div',
              {
                class: D('content'),
              },
              [L === 'left' && a(), l(), L === 'right' && a()],
            ),
          ],
        },
      );
    };
  },
});
const Mt = $(Yt),
  $e = {
    // whether to show popup
    show: Boolean,
    // z-index
    zIndex: E,
    // whether to show overlay
    overlay: I,
    // transition duration
    duration: E,
    // teleport
    teleport: [String, Object],
    // prevent body scroll
    lockScroll: I,
    // whether to lazy render
    lazyRender: I,
    // callback function before close
    beforeClose: Function,
    // overlay custom style
    overlayStyle: Object,
    // overlay custom class name
    overlayClass: J,
    // Initial rendering animation
    transitionAppear: Boolean,
    // whether to close popup when overlay is clicked
    closeOnClickOverlay: I,
  };
function Ut(e, t) {
  return e > t ? 'horizontal' : t > e ? 'vertical' : '';
}
function Kt() {
  const e = h(0),
    t = h(0),
    n = h(0),
    o = h(0),
    c = h(0),
    a = h(0),
    l = h(''),
    u = h(!0),
    d = () => l.value === 'vertical',
    r = () => l.value === 'horizontal',
    f = () => {
      (n.value = 0), (o.value = 0), (c.value = 0), (a.value = 0), (l.value = ''), (u.value = !0);
    };
  return {
    move: (y) => {
      const w = y.touches[0];
      (n.value = (w.clientX < 0 ? 0 : w.clientX) - e.value),
        (o.value = w.clientY - t.value),
        (c.value = Math.abs(n.value)),
        (a.value = Math.abs(o.value));
      const S = 10;
      (!l.value || (c.value < S && a.value < S)) && (l.value = Ut(c.value, a.value)),
        u.value && (c.value > le || a.value > le) && (u.value = !1);
    },
    start: (y) => {
      f(), (e.value = y.touches[0].clientX), (t.value = y.touches[0].clientY);
    },
    reset: f,
    startX: e,
    startY: t,
    deltaX: n,
    deltaY: o,
    offsetX: c,
    offsetY: a,
    direction: l,
    isVertical: d,
    isHorizontal: r,
    isTap: u,
  };
}
let k = 0;
const se = 'van-overflow-hidden';
function Zt(e, t) {
  const n = Kt(),
    o = '01',
    c = '10',
    a = (f) => {
      n.move(f);
      const s = n.deltaY.value > 0 ? c : o,
        v = Je(f.target, e.value),
        { scrollHeight: y, offsetHeight: w, scrollTop: S } = v;
      let B = '11';
      S === 0 ? (B = w >= y ? '00' : '01') : S + w >= y && (B = '10'),
        B !== '11' && n.isVertical() && !(parseInt(B, 2) & parseInt(s, 2)) && ee(f, !0);
    },
    l = () => {
      document.addEventListener('touchstart', n.start),
        document.addEventListener('touchmove', a, { passive: !1 }),
        k || document.body.classList.add(se),
        k++;
    },
    u = () => {
      k &&
        (document.removeEventListener('touchstart', n.start),
        document.removeEventListener('touchmove', a),
        k--,
        k || document.body.classList.remove(se));
    },
    d = () => t() && l(),
    r = () => t() && u();
  Ce(d),
    M(r),
    ge(r),
    O(t, (f) => {
      f ? l() : u();
    });
}
function De(e) {
  const t = h(!1);
  return (
    O(
      e,
      (n) => {
        n && (t.value = n);
      },
      { immediate: !0 },
    ),
    (n) => () => (t.value ? n() : null)
  );
}
const de = () => {
    var e;
    const { scopeId: t } = ((e = G()) == null ? void 0 : e.vnode) || {};
    return t ? { [t]: '' } : null;
  },
  [Xt, Ht] = p('overlay'),
  Wt = {
    show: Boolean,
    zIndex: E,
    duration: E,
    className: J,
    lockScroll: I,
    lazyRender: I,
    customStyle: Object,
  };
var Gt = x({
  name: Xt,
  props: Wt,
  setup(e, { slots: t }) {
    const n = h(),
      o = De(() => e.show || !e.lazyRender),
      c = (l) => {
        e.lockScroll && ee(l, !0);
      },
      a = o(() => {
        var l;
        const u = _(tt(e.zIndex), e.customStyle);
        return (
          P(e.duration) && (u.animationDuration = `${e.duration}s`),
          Ee(
            i(
              'div',
              {
                ref: n,
                style: u,
                class: [Ht(), e.className],
              },
              [(l = t.default) == null ? void 0 : l.call(t)],
            ),
            [[be, e.show]],
          )
        );
      });
    return (
      xe('touchmove', c, {
        target: n,
      }),
      () =>
        i(
          ye,
          {
            name: 'van-fade',
            appear: !0,
          },
          {
            default: a,
          },
        )
    );
  },
});
const qt = $(Gt),
  Jt = _({}, $e, {
    round: Boolean,
    position: g('center'),
    closeIcon: g('cross'),
    closeable: Boolean,
    transition: String,
    iconPrefix: String,
    closeOnPopstate: Boolean,
    closeIconPosition: g('top-right'),
    safeAreaInsetTop: Boolean,
    safeAreaInsetBottom: Boolean,
  }),
  [Qt, fe] = p('popup');
var en = x({
  name: Qt,
  inheritAttrs: !1,
  props: Jt,
  emits: ['open', 'close', 'opened', 'closed', 'keydown', 'update:show', 'clickOverlay', 'clickCloseIcon'],
  setup(e, { emit: t, attrs: n, slots: o }) {
    let c, a;
    const l = h(),
      u = h(),
      d = De(() => e.show || !e.lazyRender),
      r = A(() => {
        const m = {
          zIndex: l.value,
        };
        if (P(e.duration)) {
          const C = e.position === 'center' ? 'animationDuration' : 'transitionDuration';
          m[C] = `${e.duration}s`;
        }
        return m;
      }),
      f = () => {
        c || ((c = !0), (l.value = e.zIndex !== void 0 ? +e.zIndex : xt()), t('open'));
      },
      s = () => {
        c &&
          mt(e.beforeClose, {
            done() {
              (c = !1), t('close'), t('update:show', !1);
            },
          });
      },
      v = (m) => {
        t('clickOverlay', m), e.closeOnClickOverlay && s();
      },
      y = () => {
        if (e.overlay)
          return i(
            qt,
            Y(
              {
                show: e.show,
                class: e.overlayClass,
                zIndex: l.value,
                duration: e.duration,
                customStyle: e.overlayStyle,
                role: e.closeOnClickOverlay ? 'button' : void 0,
                tabindex: e.closeOnClickOverlay ? 0 : void 0,
              },
              de(),
              {
                onClick: v,
              },
            ),
            {
              default: o['overlay-content'],
            },
          );
      },
      w = (m) => {
        t('clickCloseIcon', m), s();
      },
      S = () => {
        if (e.closeable)
          return i(
            te,
            {
              role: 'button',
              tabindex: 0,
              name: e.closeIcon,
              class: [fe('close-icon', e.closeIconPosition), vt],
              classPrefix: e.iconPrefix,
              onClick: w,
            },
            null,
          );
      };
    let B;
    const z = () => {
        B && clearTimeout(B),
          (B = setTimeout(() => {
            t('opened');
          }));
      },
      F = () => t('closed'),
      U = (m) => t('keydown', m),
      L = d(() => {
        var m;
        const { round: C, position: R, safeAreaInsetTop: K, safeAreaInsetBottom: ke } = e;
        return Ee(
          i(
            'div',
            Y(
              {
                ref: u,
                style: r.value,
                role: 'dialog',
                tabindex: 0,
                class: [
                  fe({
                    round: C,
                    [R]: R,
                  }),
                  {
                    'van-safe-area-top': K,
                    'van-safe-area-bottom': ke,
                  },
                ],
                onKeydown: U,
              },
              n,
              de(),
            ),
            [(m = o.default) == null ? void 0 : m.call(o), S()],
          ),
          [[be, e.show]],
        );
      }),
      N = () => {
        const { position: m, transition: C, transitionAppear: R } = e,
          K = m === 'center' ? 'van-fade' : `van-popup-slide-${m}`;
        return i(
          ye,
          {
            name: C || K,
            appear: R,
            onAfterEnter: z,
            onAfterLeave: F,
          },
          {
            default: L,
          },
        );
      };
    return (
      O(
        () => e.show,
        (m) => {
          m &&
            !c &&
            (f(),
            n.tabindex === 0 &&
              me(() => {
                var C;
                (C = u.value) == null || C.focus();
              })),
            !m && c && ((c = !1), t('close'));
        },
      ),
      ht({
        popupRef: u,
      }),
      Zt(u, () => e.show && e.lockScroll),
      xe('popstate', () => {
        e.closeOnPopstate && (s(), (a = !1));
      }),
      ve(() => {
        e.show && f();
      }),
      W(() => {
        a && (t('update:show', !0), (a = !1));
      }),
      M(() => {
        e.show && e.teleport && (s(), (a = !0));
      }),
      he(gt, () => e.show),
      () =>
        e.teleport
          ? i(
              Ne,
              {
                to: e.teleport,
              },
              {
                default: () => [y(), N()],
              },
            )
          : i(we, null, [y(), N()])
    );
  },
});
const tn = $(en),
  [nn, on] = p('notify'),
  an = ['lockScroll', 'position', 'show', 'teleport', 'zIndex'],
  cn = _({}, $e, {
    type: g('danger'),
    color: String,
    message: E,
    position: g('top'),
    className: J,
    background: String,
    lockScroll: Boolean,
  });
var un = x({
  name: nn,
  props: cn,
  emits: ['update:show'],
  setup(e, { emit: t, slots: n }) {
    const o = (c) => t('update:show', c);
    return () =>
      i(
        tn,
        Y(
          {
            class: [on([e.type]), e.className],
            style: {
              color: e.color,
              background: e.background,
            },
            overlay: !1,
            duration: 0.2,
            'onUpdate:show': o,
          },
          Xe(e, an),
        ),
        {
          default: () => [n.default ? n.default() : e.message],
        },
      );
  },
});
const ln = $(un),
  rn = /* @__PURE__ */ Me('span', null, '撤销删除', -1),
  dn = {
    __name: 'del-button',
    setup(e) {
      const t = h(!1),
        n = () => {
          t.value = !0;
        },
        o = () => {};
      return (c, a) => {
        const l = Mt,
          u = te,
          d = ln;
        return (
          Re(),
          Ve(
            we,
            null,
            [
              i(
                l,
                {
                  type: 'danger',
                  onClick: n,
                },
                {
                  default: oe(() => [je(c.$slots, 'default', {}, () => [Ye('删除')])]),
                  _: 3,
                },
              ),
              i(
                d,
                {
                  show: t.value,
                  'onUpdate:show': a[0] || (a[0] = (r) => (t.value = r)),
                  type: 'warning',
                },
                {
                  default: oe(() => [
                    rn,
                    i(u, {
                      name: 'revoke',
                      onClick: o,
                    }),
                  ]),
                  _: 1,
                },
                8,
                ['show'],
              ),
            ],
            64,
          )
        );
      };
    },
  };
export { dn as DelButton };
