import { _ as __nuxt_component_0 } from './nuxt-link-B9ctKQDA.mjs';
import { defineComponent, withAsyncContext, ref, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _export_sfc, a as useRoute, b as useRuntimeConfig } from './server.mjs';
import { u as useAuth } from './useAuth-mw4U1F8d.mjs';
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
    const { user } = useAuth();
    const { formatDate } = useUtils();
    const teamId = route.params.id;
    const { data: team, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${config.public.apiBase}/teams/${teamId}/`,
      "$2dV_a5sbVF"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const joining = ref(false);
    const joinError = ref("");
    const isMember = computed(() => {
      if (!user.value || !team.value) return false;
      return team.value.members.some((m) => m.username === user.value.username) || team.value.leader.username === user.value.username;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen py-12 px-4 sm:px-6 lg:px-8" }, _attrs))} data-v-a62ab70c>`);
      if (unref(pending)) {
        _push(`<div class="flex justify-center py-20" data-v-a62ab70c><div class="w-16 h-16 border-4 border-slate-900 border-t-red-600 rounded-full animate-spin" data-v-a62ab70c></div></div>`);
      } else if (unref(error) || !unref(team)) {
        _push(`<div class="max-w-4xl mx-auto text-center py-20 bg-red-600/5 rounded-3xl border border-red-900/20" data-v-a62ab70c><h1 class="text-4xl font-black uppercase text-red-600 mb-4 italic" data-v-a62ab70c>Signal Lost</h1><p class="text-slate-500 mb-8" data-v-a62ab70c>The requested squad coordinates are invalid or classified.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/teams",
          class: "text-white border border-red-600 px-8 py-3 rounded uppercase font-bold text-sm hover:bg-red-600 transition-all"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Return to HQ `);
            } else {
              return [
                createTextVNode(" Return to HQ ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="max-w-6xl mx-auto space-y-8 animate-fade-in" data-v-a62ab70c>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/teams",
          class: "text-xs font-black uppercase tracking-widest text-slate-500 hover:text-red-500 transition-colors flex items-center gap-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span data-v-a62ab70c${_scopeId}>←</span> Back to Squads `);
            } else {
              return [
                createVNode("span", null, "←"),
                createTextVNode(" Back to Squads ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="bg-black/40 backdrop-blur-xl border border-red-900/20 rounded-[2rem] p-10 md:p-16 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]" data-v-a62ab70c><div class="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" data-v-a62ab70c></div><div class="flex flex-col md:flex-row gap-12 items-center relative z-10" data-v-a62ab70c><div class="w-32 h-32 md:w-48 md:h-48 bg-slate-950 rounded-3xl border-2 border-red-900/30 flex items-center justify-center text-6xl md:text-8xl shadow-2xl skew-x-[-5deg]" data-v-a62ab70c>${ssrInterpolate(unref(team).game.icon || "🛡️")}</div><div class="flex-1 text-center md:text-left space-y-4" data-v-a62ab70c><div class="flex flex-wrap items-center gap-3 justify-center md:justify-start" data-v-a62ab70c><span class="px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded italic" data-v-a62ab70c> Active Squad </span><span class="px-3 py-1 bg-slate-900 border border-red-900/30 text-red-500 text-[10px] font-black uppercase tracking-widest rounded italic" data-v-a62ab70c>${ssrInterpolate(unref(team).game.name)}</span></div><h1 class="text-5xl md:text-7xl font-black uppercase tracking-tighter italic text-white drop-shadow-2xl" data-v-a62ab70c>${ssrInterpolate(unref(team).name)}</h1><p class="text-slate-400 font-medium max-w-xl italic" data-v-a62ab70c> &quot;${ssrInterpolate(unref(team).description || "No operational orders defined for this squad.")}&quot; </p></div><div class="w-full md:w-auto space-y-4" data-v-a62ab70c>`);
        if (!unref(isMember)) {
          _push(`<button${ssrIncludeBooleanAttr(unref(joining)) ? " disabled" : ""} class="w-full md:w-64 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-black uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] animate-pulse disabled:opacity-50" data-v-a62ab70c>${ssrInterpolate(unref(joining) ? "Transmitting..." : "Join Protocol")}</button>`);
        } else {
          _push(`<div class="w-full md:w-64 bg-green-500/10 border border-green-500/30 text-green-500 py-4 rounded-xl font-black uppercase tracking-widest text-center italic" data-v-a62ab70c> Member Verified 🫡 </div>`);
        }
        if (unref(joinError)) {
          _push(`<p class="text-red-500 text-[10px] font-bold uppercase text-center mt-2" data-v-a62ab70c>${ssrInterpolate(unref(joinError))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-8" data-v-a62ab70c><div class="bg-black/30 backdrop-blur-lg border border-red-900/10 rounded-2xl p-8 group hover:border-red-600/30 transition-all" data-v-a62ab70c><span class="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-4" data-v-a62ab70c>Commanding Officer</span><div class="flex items-center gap-4" data-v-a62ab70c><div class="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center font-black italic" data-v-a62ab70c>${ssrInterpolate(unref(team).leader.username.charAt(0))}</div><span class="text-xl font-black uppercase tracking-tight" data-v-a62ab70c>@${ssrInterpolate(unref(team).leader.username)}</span></div></div><div class="bg-black/30 backdrop-blur-lg border border-red-900/10 rounded-2xl p-8" data-v-a62ab70c><span class="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-4" data-v-a62ab70c>Unit Strength</span><div class="flex items-center gap-4" data-v-a62ab70c><span class="text-4xl font-black text-red-500 italic" data-v-a62ab70c>${ssrInterpolate(unref(team).members?.length || 1)}</span><span class="text-xs font-bold uppercase text-slate-400" data-v-a62ab70c>Tactical Operators</span></div></div><div class="bg-black/30 backdrop-blur-lg border border-red-900/10 rounded-2xl p-8" data-v-a62ab70c><span class="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-4" data-v-a62ab70c>Formation Date</span><div class="flex items-center gap-4 text-slate-200" data-v-a62ab70c><span class="text-xl font-black italic" data-v-a62ab70c>${ssrInterpolate(unref(formatDate)(unref(team).created_at))}</span></div></div></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/teams/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a62ab70c"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-B74PgWVs.mjs.map
