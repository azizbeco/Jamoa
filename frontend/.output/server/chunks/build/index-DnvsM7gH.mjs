import { _ as __nuxt_component_0$1 } from './nuxt-link-DHdht2Gh.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-Dd-17Ryf.mjs';
import { u as useNotifications } from './useNotifications-D4QfM3pd.mjs';
import { a as useRuntimeConfig, _ as _export_sfc } from './server.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TeamCard",
  __ssrInlineRender: true,
  props: {
    team: {}
  },
  setup(__props) {
    useAuth();
    useNotifications();
    const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "group relative bg-slate-900/40 border border-blue-900/20 rounded-xl p-6 transition-all hover:bg-blue-900/5 hover:border-blue-600/50 shadow-[0_0_20px_rgba(0,0,0,0.3)] overflow-hidden" }, _attrs))} data-v-af25f202><div class="absolute top-0 right-0 w-16 h-16 bg-blue-600/5 rotate-45 transform translate-x-10 -translate-y-10" data-v-af25f202></div><div class="relative z-10 flex flex-col h-full" data-v-af25f202><div class="flex justify-between items-start mb-4" data-v-af25f202><div data-v-af25f202><span class="text-[10px] font-black uppercase tracking-widest text-blue-500/80 mb-1 block" data-v-af25f202>${ssrInterpolate(__props.team.game.name)}</span><h3 class="text-xl font-black uppercase italic tracking-tighter text-white group-hover:text-blue-500 transition-colors" data-v-af25f202>${ssrInterpolate(__props.team.name)}</h3></div><div class="w-10 h-10 rounded bg-slate-950 border border-blue-900/30 flex items-center justify-center text-blue-500 font-black italic shadow-inner" data-v-af25f202>${ssrInterpolate(__props.team.name.charAt(0))}</div></div><p class="text-slate-500 text-xs mb-6 uppercase font-bold tracking-tight" data-v-af25f202> Led by <span class="text-slate-300" data-v-af25f202>@${ssrInterpolate(__props.team.leader.username)}</span></p><div class="mt-auto pt-4 border-t border-blue-900/10 flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-slate-500" data-v-af25f202><div class="flex items-center space-x-2" data-v-af25f202><span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse" data-v-af25f202></span><span data-v-af25f202>${ssrInterpolate(__props.team.members_count || 1)} Members</span></div><span data-v-af25f202>${ssrInterpolate(formatDate(__props.team.created_at))}</span></div><div class="mt-6 flex gap-3" data-v-af25f202>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/teams/${__props.team.id}`,
        class: "flex-1 bg-slate-950 border border-blue-900/50 hover:bg-slate-900 text-blue-500 hover:text-white py-2 rounded font-black uppercase text-[10px] transition-all text-center skew-x-[-10deg]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="inline-block skew-x-[10deg]" data-v-af25f202${_scopeId}>Intel</span>`);
          } else {
            return [
              createVNode("span", { class: "inline-block skew-x-[10deg]" }, "Intel")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-black uppercase text-[10px] transition-all text-center skew-x-[-10deg] shadow-[0_0_15px_rgba(37,99,235,0.3)] active:scale-95" data-v-af25f202><span class="inline-block skew-x-[10deg]" data-v-af25f202>Join</span></button></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TeamCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-af25f202"]]), { __name: "TeamCard" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const { data: teams, pending, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${config.public.apiBase}/teams/`,
      "$1rkbVenK6B"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const totalTeams = computed(() => teams.value?.length || 0);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TeamCard = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20" }, _attrs))}><div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-red-900/10 pb-10 gap-6"><div class="space-y-2"><h1 class="text-5xl font-black uppercase tracking-tighter italic text-white leading-none"> Gamer <span class="text-blue-600">Squads</span></h1><p class="text-slate-500 font-bold uppercase tracking-[.3em] text-sm flex items-center"><span class="w-8 h-[2px] bg-blue-600 mr-3"></span> Browse Community Teams </p></div><div class="flex items-center space-x-6 text-right"><div class="flex flex-col"><span class="text-3xl font-black text-white leading-none">${ssrInterpolate(unref(totalTeams))}</span><span class="text-[10px] text-blue-500 uppercase font-black tracking-widest">Active Squads</span></div><button class="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded font-black uppercase text-sm transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] skew-x-[-12deg]"><span class="inline-block skew-x-[12deg]">Create Squad</span></button></div></div>`);
      if (unref(pending)) {
        _push(`<div class="flex justify-center py-20"><div class="w-20 h-20 border-4 border-slate-900 border-t-red-600 rounded-full animate-spin"></div></div>`);
      } else if (unref(error)) {
        _push(`<div class="bg-red-600/10 border border-red-600/30 p-10 rounded-2xl text-center"><h2 class="text-2xl font-black uppercase text-red-500 mb-4">Connection Failed</h2><button class="text-white border border-red-600 px-6 py-2 rounded uppercase font-bold text-sm">Retry Protocol</button></div>`);
      } else {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"><!--[-->`);
        ssrRenderList(unref(teams), (team) => {
          _push(ssrRenderComponent(_component_TeamCard, {
            key: team.id,
            team
          }, null, _parent));
        });
        _push(`<!--]-->`);
        if (unref(teams)?.length === 0) {
          _push(`<div class="col-span-full py-32 text-center border-2 border-dashed border-red-900/10 rounded-3xl text-slate-700"> No active squads detected. </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/teams/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DnvsM7gH.mjs.map
