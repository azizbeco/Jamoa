import { _ as __nuxt_component_0 } from './nuxt-link-DHdht2Gh.mjs';
import { defineComponent, withAsyncContext, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { b as useRoute, a as useRuntimeConfig } from './server.mjs';
import { u as useAuth } from './useAuth-Dd-17Ryf.mjs';
import { u as useUtils } from './useUtils-DsSrYuFJ.mjs';
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
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const config = useRuntimeConfig();
    useAuth();
    const { formatDate } = useUtils();
    const tournamentId = route.params.id;
    const { data: tournament, pending, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${config.public.apiBase}/tournaments/${tournamentId}/`,
      "$p0daC-e2CS"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const enlisting = ref(false);
    const enlistError = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32" }, _attrs))}>`);
      if (unref(pending)) {
        _push(`<div class="flex justify-center py-40"><div class="w-20 h-20 border-4 border-slate-900 border-t-red-600 rounded-full animate-spin"></div></div>`);
      } else if (unref(error) || !unref(tournament)) {
        _push(`<div class="text-center py-40 bg-red-600/5 rounded-[3rem] border border-red-900/20"><h1 class="text-4xl font-black uppercase text-red-600 mb-4 italic">Signal Lost</h1><p class="text-slate-500 mb-8">This operation has been cancelled or moved to a different sector.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/tournaments",
          class: "text-white border border-red-600 px-10 py-3 rounded-xl uppercase font-black text-xs hover:bg-red-600 transition-all"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Back to Arena`);
            } else {
              return [
                createTextVNode("Back to Arena")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="space-y-12 animate-fade-in">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/tournaments",
          class: "text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-red-500 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`← Arena Operations`);
            } else {
              return [
                createTextVNode("← Arena Operations")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="grid grid-cols-1 lg:grid-cols-12 gap-12"><div class="lg:col-span-8 space-y-8"><div class="relative rounded-[2.5rem] overflow-hidden border border-red-900/10 shadow-2xl"><img${ssrRenderAttr("src", unref(tournament).image || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070")} class="w-full h-[400px] object-cover"><div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div><div class="absolute bottom-10 left-10 space-y-2"><span class="px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded italic">${ssrInterpolate(unref(tournament).game?.name || "Grand Arena")}</span><h1 class="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-white">${ssrInterpolate(unref(tournament).name)}</h1></div></div><div class="bg-black/40 backdrop-blur-md border border-red-900/10 rounded-3xl p-10 space-y-6"><h2 class="text-xs font-black uppercase tracking-widest text-red-500">Operation Briefing</h2><div class="prose prose-invert max-w-none text-slate-400 font-medium">${ssrInterpolate(unref(tournament).description)}</div></div></div><div class="lg:col-span-4 space-y-8"><div class="bg-black/40 backdrop-blur-md border border-red-600/20 rounded-3xl p-8 space-y-8 sticky top-28"><div class="space-y-6"><div class="flex justify-between items-center pb-4 border-b border-red-900/10"><span class="text-[10px] font-black uppercase tracking-widest text-slate-500">Prize Pool</span><span class="text-xl font-black text-red-500 italic">${ssrInterpolate(unref(tournament).prize_pool || "Victory")}</span></div><div class="flex justify-between items-center pb-4 border-b border-red-900/10"><span class="text-[10px] font-black uppercase tracking-widest text-slate-500">Kickoff</span><span class="text-sm font-black text-white italic">${ssrInterpolate(unref(formatDate)(unref(tournament).date))}</span></div><div class="flex justify-between items-center"><span class="text-[10px] font-black uppercase tracking-widest text-slate-500">Status</span><span class="flex items-center gap-2 text-[10px] font-black uppercase text-white"><span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> ${ssrInterpolate(unref(tournament).status)}</span></div></div><button${ssrIncludeBooleanAttr(unref(enlisting)) ? " disabled" : ""} class="w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-[0_0_40px_rgba(220,38,38,0.4)] hover:shadow-[0_0_60px_rgba(220,38,38,0.6)] animate-pulse disabled:opacity-50">${ssrInterpolate(unref(enlisting) ? "Transmitting..." : "Enlist Now")}</button>`);
        if (unref(enlistError)) {
          _push(`<p class="text-center text-[10px] font-black text-red-500 uppercase">${ssrInterpolate(unref(enlistError))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 space-y-4"><h3 class="text-[10px] font-black uppercase tracking-widest text-slate-600">Rules of engagement</h3><ul class="text-[10px] font-bold text-slate-500 space-y-2"><li>• FAIR PLAY PROTOCOL ACTIVE</li><li>• LATE ARRIVALS DISQUALIFIED</li><li>• HQ RESERVES ALL RIGHTS</li></ul></div></div></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tournaments/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-DgBv8idU.mjs.map
