import { _ as __nuxt_component_0 } from './nuxt-link-DHdht2Gh.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { a as useRuntimeConfig } from './server.mjs';
import { u as useNotifications } from './useNotifications-D4QfM3pd.mjs';
import { u as useAuth } from './useAuth-Dd-17Ryf.mjs';
import { u as useFetch } from './fetch-C9Sh8oiV.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import '@vue/shared';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    useNotifications();
    useAuth();
    const { data: tournaments, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${config.public.apiBase}/tournaments/`,
      "$wgLdDMv7Cw"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20" }, _attrs))}><div class="relative rounded-[3rem] overflow-hidden mb-16 border border-red-600/30 group"><div class="absolute inset-0 bg-slate-900/80 z-10"></div><img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&amp;fit=crop&amp;q=80&amp;w=2070" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"><div class="relative z-20 p-12 md:p-20 text-center space-y-6"><span class="text-blue-500 font-black uppercase tracking-[0.5em] text-sm italic">Grand Arena Protocol</span><h1 class="text-6xl md:text-8xl font-black uppercase italic tracking-tighter text-white drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]"> Arena <span class="text-transparent border-t border-b border-blue-600 py-1" style="${ssrRenderStyle({ "-webkit-text-stroke": "1px white" })}">Active</span></h1><p class="text-slate-300 max-w-2xl mx-auto font-medium">Register for tactical operations and prove your unit&#39;s supremacy.</p></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"><!--[-->`);
      ssrRenderList(unref(tournaments), (t) => {
        _push(`<div class="group bg-black/40 backdrop-blur-md border border-red-900/20 rounded-3xl overflow-hidden hover:border-red-600/50 transition-all flex flex-col"><div class="h-48 relative"><img${ssrRenderAttr("src", t.image || "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800")} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"><div class="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div><div class="absolute bottom-4 left-4"><span class="px-2 py-1 bg-red-600 text-white text-[9px] font-black uppercase tracking-widest rounded italic">${ssrInterpolate(t.game?.name || "Multi-Game")}</span></div></div><div class="p-8 space-y-4 flex-1 flex flex-col"><h3 class="text-2xl font-black uppercase italic tracking-tight text-white group-hover:text-red-500 transition-colors">${ssrInterpolate(t.name)}</h3><div class="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-500"><span class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span> ${ssrInterpolate(t.status)}</span><span class="text-blue-500">🏆 ${ssrInterpolate(t.prize_pool || "Glory")}</span></div><div class="mt-auto pt-6 flex gap-4">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/tournaments/${t.id}`,
          class: "flex-1 bg-slate-950 border border-red-900/30 hover:border-red-600 text-slate-400 hover:text-white py-3 rounded-xl font-black uppercase text-[10px] text-center transition-all skew-x-[-12deg]"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="inline-block skew-x-[12deg]"${_scopeId}>Intel</span>`);
            } else {
              return [
                createVNode("span", { class: "inline-block skew-x-[12deg]" }, "Intel")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<button class="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-black uppercase text-[10px] transition-all skew-x-[-12deg] shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] active:scale-95"><span class="inline-block skew-x-[12deg]">Enlist</span></button></div></div></div>`);
      });
      _push(`<!--]-->`);
      if (!unref(tournaments) || unref(tournaments).length === 0) {
        _push(`<div class="col-span-full py-40 text-center border-2 border-dashed border-red-900/10 rounded-[3rem]"><h2 class="text-4xl font-black uppercase text-slate-900 mb-2">Arena Empty</h2><p class="text-slate-600 font-bold uppercase tracking-widest text-xs">No active operations scheduled.</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tournaments/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CZw4LHQ0.mjs.map
