import { defineComponent, withAsyncContext, ref, reactive, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { u as useAuth, a as useState } from './useAuth-Dd-17Ryf.mjs';
import { u as useUtils } from './useUtils-DsSrYuFJ.mjs';
import { a as useRuntimeConfig } from './server.mjs';
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

const useNotifications = () => {
  const notifications = useState("notifications", () => []);
  const addNotification = (notif) => {
    const id = Date.now();
    const newNotif = { id, type: "success", ...notif };
    notifications.value.push(newNotif);
    if (newNotif.timeout !== 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotif.timeout || 5e3);
    }
  };
  const removeNotification = (id) => {
    notifications.value = notifications.value.filter((n) => n.id !== id);
  };
  return {
    notifications,
    addNotification,
    removeNotification
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tournaments",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useNotifications();
    const config = useRuntimeConfig();
    useAuth();
    const { formatDate } = useUtils();
    const { data: tournaments, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${config.public.apiBase}/tournaments/`,
      "$Ze4jHXAp5-"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: games } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${config.public.apiBase}/games/`,
      "$46AUB_jVZF"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const showModal = ref(false);
    const modalMode = ref("create");
    const deletingId = ref(null);
    const loading = ref(false);
    const form = reactive({
      id: null,
      name: "",
      game: "",
      description: "",
      prize_pool: "",
      status: "upcoming",
      date: "",
      max_participants: 0
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-10 max-w-6xl mx-auto pb-20" }, _attrs))}><div class="flex items-end justify-between border-b border-red-600/10 pb-10"><div><h2 class="text-4xl font-black uppercase italic tracking-tighter text-white">Operation <span class="text-red-600">Control</span></h2><p class="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] mt-2">Manage All Tactical Competitions</p></div><button class="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-black uppercase text-xs transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] skew-x-[-12deg]"><span class="inline-block skew-x-[12deg]">New Operation</span></button></div><div class="bg-black/40 border border-slate-900 rounded-3xl overflow-hidden backdrop-blur-md"><table class="w-full text-left border-collapse"><thead><tr class="bg-slate-900/50 text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-800"><th class="p-6">Operation ID</th><th class="p-6">Strategic Name</th><th class="p-6">Game Sector</th><th class="p-6">Status</th><th class="p-6">Kickoff</th><th class="p-6 text-right">Protocol</th></tr></thead><tbody class="text-sm font-bold"><!--[-->`);
      ssrRenderList(unref(tournaments), (t) => {
        _push(`<tr class="border-b border-slate-900/50 hover:bg-red-600/5 transition-all text-slate-300 group"><td class="p-6 font-mono text-[10px] text-slate-600">#${ssrInterpolate(t.id)}</td><td class="p-6 text-white">${ssrInterpolate(t.name)}</td><td class="p-6 text-red-500/80">${ssrInterpolate(t.game?.name || "VIRTUAL")}</td><td class="p-6"><span class="px-2 py-1 bg-slate-900 border border-red-900/30 rounded text-[9px] uppercase tracking-tighter">${ssrInterpolate(t.status)}</span></td><td class="p-6 text-[10px] uppercase text-slate-500">${ssrInterpolate(unref(formatDate)(t.date))}</td><td class="p-6 text-right space-x-4"><button class="text-slate-500 hover:text-white transition-colors">Edit</button><button${ssrIncludeBooleanAttr(unref(deletingId) === t.id) ? " disabled" : ""} class="text-red-900 hover:text-red-500 transition-colors disabled:opacity-50">${ssrInterpolate(unref(deletingId) === t.id ? "..." : "Terminate")}</button></td></tr>`);
      });
      _push(`<!--]--></tbody></table>`);
      if (!unref(tournaments) || unref(tournaments).length === 0) {
        _push(`<div class="py-20 text-center text-slate-700 font-black uppercase tracking-widest text-xs"> No active deployment data found. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(showModal)) {
        _push(`<div class="fixed inset-0 z-[100] flex items-center justify-center p-4"><div class="absolute inset-0 bg-black/80 backdrop-blur-md"></div><div class="relative w-full max-w-2xl bg-slate-950 border border-red-600/30 rounded-[3rem] p-10 shadow-[0_0_100px_rgba(220,38,38,0.2)] overflow-hidden animate-in fade-in zoom-in duration-300"><div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div><div class="flex justify-between items-start mb-10"><div><h3 class="text-3xl font-black uppercase italic tracking-tighter">${ssrInterpolate(unref(modalMode) === "create" ? "Deploy" : "Modify")} <span class="text-red-600">Operation</span></h3><p class="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-2">Strategic Parameter Entry</p></div><button class="text-slate-500 hover:text-white">✕</button></div><form class="space-y-6"><div class="grid grid-cols-2 gap-6"><div class="space-y-2"><label class="text-[10px] font-black uppercase text-red-500 tracking-widest">Op Name</label><input${ssrRenderAttr("value", unref(form).name)} required class="w-full bg-black/40 border border-slate-900 rounded-xl p-4 text-white focus:outline-none focus:border-red-600 transition-all font-bold" placeholder="E.G. CHAMPIONS CUP"></div><div class="space-y-2"><label class="text-[10px] font-black uppercase text-red-500 tracking-widest">Combat Sector (Game)</label><select class="w-full bg-black/40 border border-slate-900 rounded-xl p-4 text-white focus:outline-none focus:border-red-600 transition-all font-bold"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).game) ? ssrLooseContain(unref(form).game, "") : ssrLooseEqual(unref(form).game, "")) ? " selected" : ""}>Select Tactical Objective</option><!--[-->`);
        ssrRenderList(unref(games), (g) => {
          _push(`<option${ssrRenderAttr("value", g.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).game) ? ssrLooseContain(unref(form).game, g.id) : ssrLooseEqual(unref(form).game, g.id)) ? " selected" : ""}>${ssrInterpolate(g.name)}</option>`);
        });
        _push(`<!--]--></select></div></div><div class="space-y-2"><label class="text-[10px] font-black uppercase text-red-500 tracking-widest">Strategic Intel (Description)</label><textarea required rows="3" class="w-full bg-black/40 border border-slate-900 rounded-xl p-4 text-white focus:outline-none focus:border-red-600 transition-all font-bold" placeholder="MISSION OBJECTIVES...">${ssrInterpolate(unref(form).description)}</textarea></div><div class="grid grid-cols-3 gap-6"><div class="space-y-2"><label class="text-[10px] font-black uppercase text-red-500 tracking-widest">Commission (Prize)</label><input${ssrRenderAttr("value", unref(form).prize_pool)} class="w-full bg-black/40 border border-slate-900 rounded-xl p-4 text-white focus:outline-none focus:border-red-600 transition-all font-bold" placeholder="$5,000"></div><div class="space-y-2"><label class="text-[10px] font-black uppercase text-red-500 tracking-widest">Deployment Date</label><input${ssrRenderAttr("value", unref(form).date)} type="date" required class="w-full bg-black/40 border border-slate-900 rounded-xl p-4 text-white focus:outline-none focus:border-red-600 transition-all font-bold"></div><div class="space-y-2"><label class="text-[10px] font-black uppercase text-red-500 tracking-widest">Status</label><select class="w-full bg-black/40 border border-slate-900 rounded-xl p-4 text-white focus:outline-none focus:border-red-600 transition-all font-bold"><option value="upcoming"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "upcoming") : ssrLooseEqual(unref(form).status, "upcoming")) ? " selected" : ""}>Upcoming</option><option value="ongoing"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "ongoing") : ssrLooseEqual(unref(form).status, "ongoing")) ? " selected" : ""}>Ongoing</option><option value="finished"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "finished") : ssrLooseEqual(unref(form).status, "finished")) ? " selected" : ""}>Finished</option></select></div></div><div class="pt-6"><button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-[0_10px_40px_rgba(220,38,38,0.3)] transition-all flex items-center justify-center gap-4">`);
        if (unref(loading)) {
          _push(`<span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(unref(modalMode) === "create" ? "Confirm Deployment" : "Save Strategic Update")}</button></div></form></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/tournaments.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=tournaments-BU1MHL-7.mjs.map
