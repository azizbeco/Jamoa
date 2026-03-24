import { _ as __nuxt_component_0 } from './nuxt-link-DHdht2Gh.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const { data: tournaments } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${config.public.apiBase}/tournaments/`,
      "$T_S-8bU_sL"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: teams } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${config.public.apiBase}/teams/`,
      "$uUjQ9vFuuR"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: games } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${config.public.apiBase}/games/`,
      "$rLDzV_t8_G"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: posts } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${config.public.apiBase}/posts/`,
      "$svcsqU6Ak4"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-12 max-w-6xl mx-auto pb-20" }, _attrs))}><div class="flex items-end justify-between border-b border-red-600/10 pb-10"><div><h2 class="text-4xl font-black uppercase italic tracking-tighter">Command <span class="text-red-600">Overview</span></h2><p class="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] mt-2">Active Strategic Intel</p></div><div class="bg-red-600/10 px-4 py-2 rounded-lg border border-red-600/20 text-[10px] font-black uppercase text-red-500 tracking-widest animate-pulse"> System Sync: Online </div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"><!--[-->`);
      ssrRenderList([
        { name: "Total Operations", value: unref(tournaments)?.length || 0, icon: "🏆", color: "red" },
        { name: "Active Squads", value: unref(teams)?.length || 0, icon: "🛡️", color: "red" },
        { name: "Arsenal Diversity", value: unref(games)?.length || 0, icon: "⚔️", color: "red" },
        { name: "Intel Signals", value: unref(posts)?.length || 0, icon: "📡", color: "red" }
      ], (stat) => {
        _push(`<div class="bg-black/40 border border-red-900/10 rounded-3xl p-8 group hover:border-red-600/30 transition-all shadow-2xl relative overflow-hidden"><div class="absolute -top-10 -right-10 w-24 h-24 bg-red-600/5 blur-3xl group-hover:bg-red-600/10 transition-all"></div><div class="relative z-10 space-y-4"><div class="text-3xl">${ssrInterpolate(stat.icon)}</div><div><p class="text-5xl font-black italic text-white tracking-tighter">${ssrInterpolate(stat.value)}</p><p class="text-[10px] font-black uppercase text-slate-500 tracking-widest mt-1">${ssrInterpolate(stat.name)}</p></div></div></div>`);
      });
      _push(`<!--]--></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-10"><div class="bg-black/40 border border-slate-900 rounded-3xl p-10 space-y-8"><div class="flex justify-between items-center"><h3 class="text-xs font-black uppercase tracking-widest text-red-500">Live Signals</h3>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-[10px] font-black text-slate-500 hover:text-white uppercase"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`View Ops Feed`);
          } else {
            return [
              createTextVNode("View Ops Feed")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="space-y-4"><!--[-->`);
      ssrRenderList(unref(posts)?.slice(0, 5), (post) => {
        _push(`<div class="p-4 bg-slate-900/30 border border-red-900/5 rounded-2xl flex items-center justify-between group hover:border-red-900/20 transition-all"><div class="flex items-center gap-4"><div class="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center font-black italic">${ssrInterpolate(post.author.username.charAt(0).toUpperCase())}</div><p class="text-[11px] font-bold text-slate-300 truncate max-w-[150px]">@${ssrInterpolate(post.author.username)}: ${ssrInterpolate(post.content)}</p></div><span class="text-[9px] text-slate-700 font-black uppercase">${ssrInterpolate(post.created_at_fmt)}</span></div>`);
      });
      _push(`<!--]--></div></div><div class="bg-black/40 border border-slate-900 rounded-3xl p-10 space-y-8"><div class="flex justify-between items-center"><h3 class="text-xs font-black uppercase tracking-widest text-red-500">Active Squads</h3>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/teams",
        class: "text-[10px] font-black text-slate-500 hover:text-white uppercase"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Full Intel`);
          } else {
            return [
              createTextVNode("Full Intel")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="space-y-4"><!--[-->`);
      ssrRenderList(unref(teams)?.slice(0, 5), (team) => {
        _push(`<div class="p-4 bg-slate-900/30 border border-red-900/5 rounded-2xl flex items-center justify-between group"><div class="flex items-center gap-4"><span class="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-xs">🛡️</span><p class="text-[11px] font-black text-white uppercase">${ssrInterpolate(team.name)}</p></div><p class="text-[10px] font-bold text-red-500/50 uppercase tracking-widest">${ssrInterpolate(team.members_count)} Units</p></div>`);
      });
      _push(`<!--]--></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DoF0VbXU.mjs.map
