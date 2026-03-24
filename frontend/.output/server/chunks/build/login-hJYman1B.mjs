import { defineComponent, ref, mergeProps, unref, computed, toRef, isRef, customRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { y as klona, z as parse, A as getRequestHeader, B as isEqual, C as setCookie, D as getCookie, E as deleteCookie } from '../_/nitro.mjs';
import { _ as _export_sfc, n as navigateTo, u as useNuxtApp, a as useRuntimeConfig } from './server.mjs';
import { u as useFetch, a as useRequestEvent } from './fetch-CFguae28.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'vue-router';
import '@vue/shared';

const _imports_0 = publicAssetsURL("/images/auth-bg.png");
function parseCookieValue(value) {
  if (value === "undefined") {
    return void 0;
  }
  try {
    const parsed = JSON.parse(value);
    if (typeof parsed === "number" && String(parsed) !== value) {
      return value;
    }
    return parsed;
  } catch {
    return value;
  }
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => parseCookieValue(decodeURIComponent(val)),
  encode: (val) => {
    if (typeof val !== "string" || val === "undefined") {
      return encodeURIComponent(JSON.stringify(val));
    }
    try {
      if (typeof JSON.parse(val) !== "string") {
        return encodeURIComponent(JSON.stringify(val));
      }
    } catch {
    }
    return encodeURIComponent(val);
  },
  refresh: false
};
function useCookie(name, _opts) {
  const opts = { ...CookieDefaults, ..._opts };
  opts.filter ??= (key) => key === name;
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies[name] ?? opts.default?.());
  const cookie = cookieServerRef(name, cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      const valueIsSame = isEqual(cookie.value, cookies[name]);
      if (opts.readonly || valueIsSame && !opts.refresh) {
        return;
      }
      nuxtApp._cookiesChanged ||= {};
      if (valueIsSame && opts.refresh && !nuxtApp._cookiesChanged[name]) {
        return;
      }
      nuxtApp._cookies ||= {};
      if (name in nuxtApp._cookies) {
        if (isEqual(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
function cookieServerRef(name, value) {
  const internalRef = ref(value);
  const nuxtApp = useNuxtApp();
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return internalRef.value;
      },
      set(newValue) {
        nuxtApp._cookiesChanged ||= {};
        nuxtApp._cookiesChanged[name] = true;
        internalRef.value = newValue;
        trigger();
      }
    };
  });
}
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (init) {
    nuxtApp._state[key] ??= { _default: init };
  }
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const useAuth = () => {
  const token = useCookie("auth_token");
  const user = useState("user", () => null);
  const config = useRuntimeConfig();
  const login = async (email, password) => {
    try {
      const { data, error } = await useFetch(
        `${config.public.apiBase}/token/`,
        {
          method: "POST",
          body: { username: email, password }
          // Django SimpleJWT uses username field by default
        },
        "$JoGSfTHDW6"
        /* nuxt-injected */
      );
      if (error.value) throw new Error(error.value.data?.detail || "Login failed");
      token.value = data.value.access;
      user.value = { username: email };
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };
  const signup = async (username, email, password) => {
    try {
      const { data, error } = await useFetch(
        `${config.public.apiBase}/register/`,
        {
          method: "POST",
          body: { username, email, password }
        },
        "$5dWE_Zt2z3"
        /* nuxt-injected */
      );
      if (error.value) throw new Error(error.value.data?.error || "Signup failed");
      token.value = data.value.access;
      user.value = { username: data.value.username };
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };
  const logout = () => {
    token.value = null;
    user.value = null;
    navigateTo("/login");
  };
  return {
    token,
    user,
    login,
    signup,
    logout,
    isAuthenticated: computed(() => !!token.value)
  };
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AuthForm",
  __ssrInlineRender: true,
  props: {
    mode: {}
  },
  emits: ["success", "switch"],
  setup(__props, { emit: __emit }) {
    useAuth();
    const email = ref("");
    const password = ref("");
    const username = ref("");
    const loading = ref(false);
    const error = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-[500px] w-full max-w-4xl bg-black/90 border-2 border-red-900/30 rounded-2xl overflow-hidden flex shadow-[0_0_50px_rgba(225,29,72,0.15)] flex-col md:flex-row" }, _attrs))} data-v-2ee93b58><div class="md:w-1/2 relative group hidden md:block" data-v-2ee93b58><img${ssrRenderAttr("src", _imports_0)} alt="Gamer Background" class="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" data-v-2ee93b58><div class="absolute inset-0 bg-gradient-to-r from-transparent to-black/90 md:to-black" data-v-2ee93b58></div><div class="absolute bottom-10 left-10 text-white z-10" data-v-2ee93b58><h2 class="text-3xl font-black uppercase tracking-tighter italic text-red-600 drop-shadow-lg" data-v-2ee93b58> Join the Elite </h2><p class="text-slate-400 font-medium" data-v-2ee93b58>Jamoa Platform Gaming Community</p></div></div><div class="md:w-1/2 p-10 flex flex-col justify-center bg-black/40 backdrop-blur-sm relative overflow-hidden" data-v-2ee93b58><div class="absolute top-0 right-0 w-24 h-24 bg-red-600/5 rotate-45 transform translate-x-12 -translate-y-12" data-v-2ee93b58></div><div class="space-y-6 relative z-10" data-v-2ee93b58><div class="space-y-2" data-v-2ee93b58><h3 class="text-2xl font-bold uppercase tracking-widest text-white border-l-4 border-red-600 pl-4" data-v-2ee93b58>${ssrInterpolate(__props.mode === "login" ? "Login Account" : "Create Account")}</h3><p class="text-slate-500 text-sm uppercase tracking-tighter" data-v-2ee93b58>Welcome back, Soldier</p></div>`);
      if (unref(error)) {
        _push(`<div class="bg-red-600/10 border border-red-600/50 p-3 rounded text-red-500 text-xs font-bold uppercase animate-shake" data-v-2ee93b58>${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<form class="space-y-4" data-v-2ee93b58>`);
      if (__props.mode === "signup") {
        _push(`<div class="space-y-1" data-v-2ee93b58><label class="text-[10px] uppercase font-bold text-red-500/80 tracking-widest" data-v-2ee93b58>Username</label><input${ssrRenderAttr("value", unref(username))} type="text" placeholder="Gamer_ID" class="w-full bg-slate-900/50 border border-red-900/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/20 transition-all font-mono placeholder:text-slate-700" required data-v-2ee93b58></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="space-y-1" data-v-2ee93b58><label class="text-[10px] uppercase font-bold text-red-500/80 tracking-widest" data-v-2ee93b58>Email Address</label><input${ssrRenderAttr("value", unref(email))} type="email" placeholder="warrior@jamoa.com" class="w-full bg-slate-900/50 border border-red-900/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/20 transition-all font-mono placeholder:text-slate-700" required data-v-2ee93b58></div><div class="space-y-1" data-v-2ee93b58><label class="text-[10px] uppercase font-bold text-red-500/80 tracking-widest" data-v-2ee93b58>Password</label><input${ssrRenderAttr("value", unref(password))} type="password" placeholder="••••••••" class="w-full bg-slate-900/50 border border-red-900/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/20 transition-all font-mono placeholder:text-slate-700" required data-v-2ee93b58></div><div class="flex items-center justify-between text-[11px] text-slate-500 py-1" data-v-2ee93b58><label class="flex items-center cursor-pointer hover:text-red-400 transition-colors" data-v-2ee93b58><input type="checkbox" class="mr-2 accent-red-600" data-v-2ee93b58> Remember Me </label><a href="#" class="hover:text-red-500 transition-colors" data-v-2ee93b58>Forgot Password?</a></div><div class="pt-4 space-y-3" data-v-2ee93b58><button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="w-full bg-red-600 hover:bg-red-700 text-white font-black uppercase py-3 rounded-lg shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] transition-all transform active:scale-[0.98] disabled:opacity-50" data-v-2ee93b58>${ssrInterpolate(unref(loading) ? "Processing..." : __props.mode === "login" ? "Login" : "Sign Up")}</button><button type="button" class="w-full bg-transparent border border-red-600/50 hover:border-red-600 text-red-600 hover:text-white hover:bg-red-600/10 font-bold uppercase py-3 rounded-lg transition-all" data-v-2ee93b58>${ssrInterpolate(__props.mode === "login" ? "Create New Account" : "Back to Login")}</button></div></form></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AuthForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-2ee93b58"]]), { __name: "AuthForm" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const mode = ref("login");
    const handleSwitch = () => {
      mode.value = mode.value === "login" ? "signup" : "login";
    };
    const handleSuccess = () => {
      navigateTo("/");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AuthForm = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden font-sans" }, _attrs))}><div class="absolute top-0 left-0 w-full h-full"><div class="absolute top-[10%] left-[5%] w-96 h-96 bg-red-600/5 rounded-full blur-[120px] animate-pulse"></div><div class="absolute bottom-[10%] right-[5%] w-96 h-96 bg-red-900/10 rounded-full blur-[120px] animate-pulse" style="${ssrRenderStyle({ "animation-delay": "2s" })}"></div></div>`);
      _push(ssrRenderComponent(_component_AuthForm, {
        mode: unref(mode),
        onSwitch: handleSwitch,
        onSuccess: handleSuccess
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-hJYman1B.mjs.map
