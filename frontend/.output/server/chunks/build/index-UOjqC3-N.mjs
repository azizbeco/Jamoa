import { _ as __nuxt_component_0 } from './nuxt-link-CQk5CMay.mjs';
import { withAsyncContext, mergeProps, withCtx, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { a as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch-CFguae28.mjs';
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

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const { data: games } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${config.public.apiBase}/games/`,
      "$J4a6I9i2bx"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: posts } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${config.public.apiBase}/posts/`,
      "$Yo8vo0NEgg"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: tournaments } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${config.public.apiBase}/tournaments/`,
      "$zAgkMJ1xOl"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    };
    const timeAgo = (dateStr) => {
      const seconds = Math.floor((/* @__PURE__ */ new Date() - new Date(dateStr)) / 1e3);
      let interval = seconds / 31536e3;
      if (interval > 1) return Math.floor(interval) + " years ago";
      interval = seconds / 2592e3;
      if (interval > 1) return Math.floor(interval) + " months ago";
      interval = seconds / 86400;
      if (interval > 1) return Math.floor(interval) + " days ago";
      interval = seconds / 3600;
      if (interval > 1) return Math.floor(interval) + " hours ago";
      interval = seconds / 60;
      if (interval > 1) return Math.floor(interval) + " minutes ago";
      return Math.floor(seconds) + " seconds ago";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-slate-950 text-white font-sans" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><header class="flex justify-between items-center mb-12 border-b border-red-900/20 pb-6"><div class="flex items-center space-x-3"><div class="w-10 h-10 bg-red-600 rounded flex items-center justify-center font-black text-xl italic skew-x-[-10deg] shadow-[0_0_15px_rgba(220,38,38,0.4)]">J</div><div><h1 class="text-3xl font-black uppercase tracking-tighter italic text-white leading-none">Jamoa</h1><p class="text-[10px] text-red-500 font-bold uppercase tracking-[.2em] mt-1">Gamer Republic</p></div></div><div class="flex items-center space-x-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-black uppercase text-xs transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] skew-x-[-10deg]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="inline-block skew-x-[10deg]"${_scopeId}>Join / Login</span>`);
          } else {
            return [
              createVNode("span", { class: "inline-block skew-x-[10deg]" }, "Join / Login")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></header><div class="grid grid-cols-1 lg:grid-cols-12 gap-8"><aside class="lg:col-span-3 space-y-8"><section><h2 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Games</h2><div class="space-y-2"><!--[-->`);
      ssrRenderList(unref(games), (game) => {
        _push(`<div class="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group"><span class="w-8 h-8 flex items-center justify-center rounded bg-slate-800 text-lg" style="${ssrRenderStyle({ color: game.color })}">${ssrInterpolate(game.icon || "🎮")}</span><span class="text-slate-300 group-hover:text-white font-medium">${ssrInterpolate(game.name)}</span></div>`);
      });
      _push(`<!--]--></div></section><section><h2 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Upcoming Tournaments</h2><div class="space-y-4"><!--[-->`);
      ssrRenderList(unref(tournaments), (t) => {
        _push(`<div class="p-4 bg-slate-900/50 border border-slate-800 rounded-xl border-l-4 border-l-indigo-500"><h3 class="font-bold text-sm">${ssrInterpolate(t.name)}</h3><div class="flex items-center gap-2 mt-2 text-xs text-slate-500"><span>📅 ${ssrInterpolate(formatDate(t.date))}</span>`);
        if (t.prize_pool) {
          _push(`<span class="text-indigo-400">| 🏆 ${ssrInterpolate(t.prize_pool)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></section></aside><main class="lg:col-span-6"><div class="space-y-6"><!--[-->`);
      ssrRenderList(unref(posts), (post) => {
        _push(`<div class="bg-slate-900 border border-slate-800 rounded-2xl p-6"><div class="flex items-start justify-between mb-4"><div class="flex items-center gap-3"><img${ssrRenderAttr("src", post.author.avatar_url)} class="w-10 h-10 rounded-full border border-slate-700"><div><h4 class="font-bold text-slate-200">@${ssrInterpolate(post.author.username)}</h4><p class="text-xs text-slate-500">${ssrInterpolate(timeAgo(post.created_at))}</p></div></div>`);
        if (post.game) {
          _push(`<span class="px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-tighter">${ssrInterpolate(post.game.name)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><p class="text-slate-300 leading-relaxed whitespace-pre-wrap mb-4">${ssrInterpolate(post.content)}</p><div class="flex items-center gap-6 text-slate-500"><button class="flex items-center gap-2 hover:text-red-500 transition-colors"><span>❤️</span> <span class="text-xs font-bold">Like</span></button><button class="flex items-center gap-2 hover:text-indigo-400 transition-colors"><span>💬</span> <span class="text-xs font-bold">Reply</span></button></div></div>`);
      });
      _push(`<!--]--></div></main><aside class="lg:col-span-3"><div class="bg-indigo-600/5 border border-indigo-500/20 rounded-2xl p-6"><h3 class="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-4">Platform Insights</h3><div class="space-y-4"><div class="flex flex-col"><span class="text-3xl font-black text-white">${ssrInterpolate(unref(posts)?.length || 0)}</span><span class="text-[10px] text-slate-500 uppercase font-bold">Active Posts</span></div></div></div></aside></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-UOjqC3-N.mjs.map
