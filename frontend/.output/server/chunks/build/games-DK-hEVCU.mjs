import { defineComponent, withAsyncContext, ref, reactive, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr, ssrRenderAttr } from 'vue/server-renderer';
import { a as useRuntimeConfig } from './server.mjs';
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
  __name: "games",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    useAuth();
    const { data: games, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${config.public.apiBase}/games/`,
      "$TMwwTTdMoR"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const showModal = ref(false);
    const modalMode = ref("create");
    const deletingId = ref(null);
    const loading = ref(false);
    const form = reactive({
      id: null,
      name: "",
      icon: "⚔️",
      color: "#ff0000",
      team_size: 5
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-10 max-w-6xl mx-auto pb-20" }, _attrs))}><div class="flex items-end justify-between border-b border-red-600/10 pb-10"><div><h2 class="text-4xl font-black uppercase italic tracking-tighter text-white">Arsenal <span class="text-red-600">Blueprints</span></h2><p class="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] mt-2">Manage Recognized Combat Software</p></div><button class="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-black uppercase text-xs transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] skew-x-[-12deg]"><span class="inline-block skew-x-[12deg]">New Entry</span></button></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"><!--[-->`);
      ssrRenderList(unref(games), (g) => {
        _push(`<div class="group bg-black/40 border-2 border-slate-950 rounded-3xl p-8 hover:border-red-600/30 transition-all flex flex-col shadow-2xl relative"><div class="absolute top-4 right-4 text-xs font-black text-slate-800">#${ssrInterpolate(g.id)}</div><div class="flex items-center gap-6 mb-8"><div class="w-16 h-16 rounded-2xl bg-slate-900 border border-red-900/10 flex items-center justify-center text-3xl shadow-inner group-hover:bg-red-600 group-hover:text-white transition-all duration-500">${ssrInterpolate(g.icon || "⚔️")}</div><div><h3 class="text-xl font-black uppercase tracking-tight text-white italic">${ssrInterpolate(g.name)}</h3><div class="h-1 w-12 rounded-full mt-1" style="${ssrRenderStyle({ backgroundColor: g.color || "#ff0000" })}"></div></div></div><div class="mt-auto pt-6 flex justify-between items-center border-t border-red-900/10 text-[10px] font-black uppercase tracking-widest"><button class="text-slate-500 hover:text-white transition-colors">calibrate</button><button${ssrIncludeBooleanAttr(unref(deletingId) === g.id) ? " disabled" : ""} class="text-red-900 hover:text-red-600 transition-all">${ssrInterpolate(unref(deletingId) === g.id ? "..." : "Decommission")}</button></div></div>`);
      });
      _push(`<!--]-->`);
      if (!unref(games) || unref(games).length === 0) {
        _push(`<div class="col-span-full py-20 text-center text-slate-700 font-black uppercase tracking-widest text-xs"> No weaponry data loaded. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(showModal)) {
        _push(`<div class="fixed inset-0 z-[100] flex items-center justify-center p-4"><div class="absolute inset-0 bg-black/80 backdrop-blur-md"></div><div class="relative w-full max-w-lg bg-slate-950 border border-red-600/30 rounded-[3rem] p-10 shadow-[0_0_100px_rgba(220,38,38,0.2)] animate-in fade-in zoom-in duration-300"><div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div><div class="flex justify-between items-start mb-10"><div><h3 class="text-3xl font-black uppercase italic tracking-tighter">${ssrInterpolate(unref(modalMode) === "create" ? "Draft" : "Verify")} <span class="text-red-600">Arsenal</span></h3><p class="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-2">Technical Specification Input</p></div><button class="text-slate-500 hover:text-white">✕</button></div><form class="space-y-6"><div class="space-y-2"><label class="text-[10px] font-black uppercase text-red-500 tracking-widest">Model Name (Game Title)</label><input${ssrRenderAttr("value", unref(form).name)} required class="w-full bg-black/40 border border-slate-900 rounded-xl p-4 text-white focus:outline-none focus:border-red-600 transition-all font-bold" placeholder="E.G. COUNTER-STRIKE 2"></div><div class="grid grid-cols-2 gap-6"><div class="space-y-2"><label class="text-[10px] font-black uppercase text-red-500 tracking-widest">Icon Signal</label><input${ssrRenderAttr("value", unref(form).icon)} required class="w-full bg-black/40 border border-slate-900 rounded-xl p-4 text-white focus:outline-none focus:border-red-600 transition-all font-bold" placeholder="🎮"></div><div class="space-y-2"><label class="text-[10px] font-black uppercase text-red-500 tracking-widest">Chroma Key (Color)</label><input${ssrRenderAttr("value", unref(form).color)} type="color" class="w-full h-[58px] bg-black/40 border border-slate-900 rounded-xl p-2 cursor-pointer"></div></div><div class="space-y-2"><label class="text-[10px] font-black uppercase text-red-500 tracking-widest">Standard Unit Size (Team Size)</label><input${ssrRenderAttr("value", unref(form).team_size)} type="number" required min="1" class="w-full bg-black/40 border border-slate-900 rounded-xl p-4 text-white focus:outline-none focus:border-red-600 transition-all font-bold"></div><div class="pt-6"><button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-[0_10px_40px_rgba(220,38,38,0.3)] transition-all flex items-center justify-center gap-4">`);
        if (unref(loading)) {
          _push(`<span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(unref(modalMode) === "create" ? "Authorize Blueprint" : "Commit Technical Changes")}</button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/games.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=games-DK-hEVCU.mjs.map
