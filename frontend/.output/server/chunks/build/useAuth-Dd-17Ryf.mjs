import { computed, toRef, isRef, ref, customRef } from 'vue';
import { y as klona, z as parse, A as getRequestHeader, B as isEqual, C as setCookie, D as getCookie, E as deleteCookie } from '../_/nitro.mjs';
import { u as useNuxtApp, n as navigateTo, a as useRuntimeConfig } from './server.mjs';
import { u as useFetch, a as useRequestEvent } from './fetch-C9Sh8oiV.mjs';

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

export { useState as a, useAuth as u };
//# sourceMappingURL=useAuth-Dd-17Ryf.mjs.map
