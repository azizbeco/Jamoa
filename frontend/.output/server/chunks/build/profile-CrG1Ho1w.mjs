import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-Dd-17Ryf.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import './fetch-C9Sh8oiV.mjs';
import '@vue/shared';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useAuth();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-4xl mx-auto px-4 py-20" }, _attrs))}><div class="bg-black/40 backdrop-blur-xl border border-red-900/20 rounded-[3rem] p-12 text-center space-y-8 shadow-[0_30px_100px_rgba(0,0,0,0.5)] relative overflow-hidden"><div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div><div class="w-32 h-32 mx-auto bg-red-600 rounded-[2rem] flex items-center justify-center text-5xl font-black italic shadow-[0_0_40px_rgba(220,38,38,0.4)] skew-x-[-10deg]">${ssrInterpolate(unref(user)?.username?.charAt(0).toUpperCase())}</div><div class="space-y-2"><h1 class="text-4xl font-black uppercase italic tracking-tighter">@${ssrInterpolate(unref(user)?.username)}</h1><p class="text-red-500 text-xs font-black uppercase tracking-[0.3em]">Status: Combat Ready</p></div><div class="grid grid-cols-2 gap-4 max-w-sm mx-auto"><div class="bg-slate-900/50 p-4 rounded-2xl border border-red-900/10"><span class="text-[10px] font-black uppercase text-slate-500 block">Experience</span><span class="text-xl font-black italic">Rank 1</span></div><div class="bg-slate-900/50 p-4 rounded-2xl border border-red-900/10"><span class="text-[10px] font-black uppercase text-slate-500 block">Ops Joined</span><span class="text-xl font-black italic">0</span></div></div><button class="bg-red-600/10 border border-red-600 text-red-500 px-10 py-3 rounded-xl font-black uppercase text-xs hover:bg-red-600 hover:text-white transition-all"> Terminate Session </button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=profile-CrG1Ho1w.mjs.map
