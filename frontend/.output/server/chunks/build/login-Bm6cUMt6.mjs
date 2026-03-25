import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderDynamicModel, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { u as useAuth } from './useAuth-Dd-17Ryf.mjs';
import { _ as _export_sfc, n as navigateTo } from './server.mjs';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import './fetch-C9Sh8oiV.mjs';
import '@vue/shared';
import 'vue-router';

const _imports_0 = publicAssetsURL("/images/auth-bg.png");
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
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "min-h-[520px] w-full max-w-4xl rounded-2xl overflow-hidden flex flex-col md:flex-row",
        style: { "background": "#08080f", "border": "1px solid rgba(220,38,38,0.35)", "box-shadow": "0 0 80px rgba(220,38,38,0.12), 0 0 200px rgba(220,38,38,0.04)" }
      }, _attrs))} data-v-a72029e5><div class="md:w-1/2 relative group hidden md:block" data-v-a72029e5><img${ssrRenderAttr("src", _imports_0)} alt="Gamer Background" class="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" data-v-a72029e5><div class="absolute inset-0" style="${ssrRenderStyle({ "background": "linear-gradient(to right, transparent 30%, #08080f)" })}" data-v-a72029e5></div><div class="absolute bottom-10 left-10 text-white z-10" data-v-a72029e5><h2 class="text-3xl font-black uppercase tracking-tighter italic text-red-500 drop-shadow-lg" data-v-a72029e5> Join the Elite </h2><p class="text-slate-400 font-medium mt-1" data-v-a72029e5>Jamoa Platform Gaming Community</p></div></div><div class="md:w-1/2 p-10 flex flex-col justify-center relative overflow-hidden" style="${ssrRenderStyle({ "background": "rgba(10,10,20,0.98)" })}" data-v-a72029e5><div class="absolute top-0 right-0 w-28 h-28 opacity-10" style="${ssrRenderStyle({ "background": "radial-gradient(circle at top right, rgba(220,38,38,0.6), transparent 70%)" })}" data-v-a72029e5></div><div class="space-y-6 relative z-10" data-v-a72029e5><div class="space-y-2" data-v-a72029e5><h3 class="text-2xl font-black uppercase tracking-widest text-white pl-4" style="${ssrRenderStyle({ "border-left": "4px solid #dc2626" })}" data-v-a72029e5>${ssrInterpolate(__props.mode === "login" ? "Login Account" : "Create Account")}</h3><p class="text-slate-500 text-sm uppercase tracking-tighter" data-v-a72029e5>Welcome back, Soldier</p></div>`);
      if (unref(error)) {
        _push(`<div class="p-3 rounded text-red-400 text-xs font-bold uppercase animate-shake" style="${ssrRenderStyle({ "background": "rgba(220,38,38,0.1)", "border": "1px solid rgba(220,38,38,0.4)" })}" data-v-a72029e5>${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<form class="space-y-4" data-v-a72029e5>`);
      if (__props.mode === "signup") {
        _push(`<div class="space-y-1" data-v-a72029e5><label class="text-[10px] uppercase font-bold text-red-400/90 tracking-widest" data-v-a72029e5>Username</label><input${ssrRenderAttr("value", unref(username))} type="text" placeholder="Gamer_ID" class="w-full rounded-lg py-3 px-4 text-white focus:outline-none transition-all font-mono placeholder:text-slate-700" style="${ssrRenderStyle({ "background": "#0a0a16", "border": "1px solid rgba(220,38,38,0.25)" })}" onfocus="this.style.borderColor=&#39;rgba(220,38,38,0.6)&#39;; this.style.boxShadow=&#39;0 0 15px rgba(220,38,38,0.1)&#39;" onblur="this.style.borderColor=&#39;rgba(220,38,38,0.25)&#39;; this.style.boxShadow=&#39;none&#39;" required data-v-a72029e5></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="space-y-1" data-v-a72029e5><label class="text-[10px] uppercase font-bold text-red-400/90 tracking-widest" data-v-a72029e5>${ssrInterpolate(__props.mode === "login" ? "Username or Email" : "Email Address")}</label><input${ssrRenderDynamicModel(__props.mode === "login" ? "text" : "email", unref(email), null)}${ssrRenderAttr("type", __props.mode === "login" ? "text" : "email")}${ssrRenderAttr("placeholder", __props.mode === "login" ? "Gamer_ID / warrior@jamoa.com" : "warrior@jamoa.com")} class="w-full rounded-lg py-3 px-4 text-white focus:outline-none transition-all font-mono placeholder:text-slate-700" style="${ssrRenderStyle({ "background": "#0a0a16", "border": "1px solid rgba(220,38,38,0.25)" })}" onfocus="this.style.borderColor=&#39;rgba(220,38,38,0.6)&#39;; this.style.boxShadow=&#39;0 0 15px rgba(220,38,38,0.1)&#39;" onblur="this.style.borderColor=&#39;rgba(220,38,38,0.25)&#39;; this.style.boxShadow=&#39;none&#39;" required data-v-a72029e5></div><div class="space-y-1" data-v-a72029e5><label class="text-[10px] uppercase font-bold text-red-400/90 tracking-widest" data-v-a72029e5>Password</label><input${ssrRenderAttr("value", unref(password))} type="password" placeholder="••••••••" class="w-full rounded-lg py-3 px-4 text-white focus:outline-none transition-all font-mono placeholder:text-slate-700" style="${ssrRenderStyle({ "background": "#0a0a16", "border": "1px solid rgba(220,38,38,0.25)" })}" onfocus="this.style.borderColor=&#39;rgba(220,38,38,0.6)&#39;; this.style.boxShadow=&#39;0 0 15px rgba(220,38,38,0.1)&#39;" onblur="this.style.borderColor=&#39;rgba(220,38,38,0.25)&#39;; this.style.boxShadow=&#39;none&#39;" required data-v-a72029e5></div><div class="flex items-center justify-between text-[11px] text-slate-500 py-1" data-v-a72029e5><label class="flex items-center cursor-pointer hover:text-red-400 transition-colors" data-v-a72029e5><input type="checkbox" class="mr-2 accent-red-600" data-v-a72029e5> Remember Me </label><a href="#" class="hover:text-red-400 transition-colors" data-v-a72029e5>Forgot Password?</a></div><div class="pt-4 space-y-3" data-v-a72029e5><button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="w-full text-white font-black uppercase py-3.5 rounded-lg transition-all transform active:scale-[0.98] disabled:opacity-50" style="${ssrRenderStyle({ "background": "#dc2626", "box-shadow": "0 0 25px rgba(220,38,38,0.35)" })}" onmouseenter="if(!this.disabled) { this.style.background=&#39;#b91c1c&#39;; this.style.boxShadow=&#39;0 0 40px rgba(220,38,38,0.55)&#39;; }" onmouseleave="if(!this.disabled) { this.style.background=&#39;#dc2626&#39;; this.style.boxShadow=&#39;0 0 25px rgba(220,38,38,0.35)&#39;; }" data-v-a72029e5>${ssrInterpolate(unref(loading) ? "Processing..." : __props.mode === "login" ? "Login" : "Sign Up")}</button><button type="button" class="w-full bg-transparent font-bold uppercase py-3.5 rounded-lg transition-all text-red-500 hover:text-white" style="${ssrRenderStyle({ "border": "1px solid rgba(220,38,38,0.4)" })}" onmouseenter="this.style.background=&#39;rgba(220,38,38,0.1)&#39;; this.style.borderColor=&#39;rgba(220,38,38,0.7)&#39;" onmouseleave="this.style.background=&#39;transparent&#39;; this.style.borderColor=&#39;rgba(220,38,38,0.4)&#39;" data-v-a72029e5>${ssrInterpolate(__props.mode === "login" ? "Create New Account" : "Back to Login")}</button></div></form></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AuthForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-a72029e5"]]), { __name: "AuthForm" });
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
//# sourceMappingURL=login-Bm6cUMt6.mjs.map
