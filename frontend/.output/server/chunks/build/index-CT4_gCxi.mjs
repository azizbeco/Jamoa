import { _ as __nuxt_component_0 } from './nuxt-link-B9ctKQDA.mjs';
import { withAsyncContext, mergeProps, withCtx, createTextVNode, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { b as useRuntimeConfig } from './server.mjs';
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

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const { formatDate, timeAgo } = useUtils();
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-slate-950 text-white font-sans selection:bg-red-600 selection:text-white" }, _attrs))}><div class="fixed inset-0 pointer-events-none overflow-hidden"><div class="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-900/10 rounded-full blur-[150px]"></div><div class="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/5 rounded-full blur-[120px]"></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10"><header class="flex justify-between items-center mb-12 border-b border-red-900/20 pb-6"><div class="flex items-center space-x-3 group cursor-pointer"><div class="w-12 h-12 bg-red-600 rounded flex items-center justify-center font-black text-2xl italic skew-x-[-12deg] shadow-[0_0_20px_rgba(220,38,38,0.5)] group-hover:shadow-[0_0_30px_rgba(220,38,38,0.7)] transition-all">J</div><div><h1 class="text-3xl font-black uppercase tracking-tighter italic text-white leading-none">Jamoa</h1><p class="text-[10px] text-red-500 font-bold uppercase tracking-[.2em] mt-1">Gamer Republic</p></div></div><div class="flex items-center space-x-8"><nav class="hidden md:flex items-center space-x-8 uppercase font-black text-[10px] tracking-widest text-slate-500">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-red-500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Home`);
          } else {
            return [
              createTextVNode("Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/teams",
        class: "hover:text-red-500 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Squads`);
          } else {
            return [
              createTextVNode("Squads")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "bg-red-600 hover:bg-red-700 text-white px-8 py-2.5 rounded font-black uppercase text-xs transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] skew-x-[-12deg]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="inline-block skew-x-[12deg]"${_scopeId}>Join Protocol</span>`);
          } else {
            return [
              createVNode("span", { class: "inline-block skew-x-[12deg]" }, "Join Protocol")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></header><div class="grid grid-cols-1 lg:grid-cols-12 gap-8"><aside class="lg:col-span-3 space-y-8"><div class="bg-black/40 backdrop-blur-md border border-red-900/20 rounded-2xl p-6"><h2 class="text-[10px] font-black uppercase tracking-widest text-red-500 mb-6 flex items-center"><span class="w-4 h-[2px] bg-red-600 mr-2"></span> Top Modules </h2><div class="space-y-4"><!--[-->`);
      ssrRenderList(unref(games), (game) => {
        _push(`<div class="flex items-center justify-between p-3 rounded-xl hover:bg-red-600/10 border border-transparent hover:border-red-600/30 cursor-pointer transition-all group"><div class="flex items-center gap-3"><span class="w-8 h-8 flex items-center justify-center rounded bg-slate-900 border border-red-900/20 text-lg shadow-inner">${ssrInterpolate(game.icon || "🎮")}</span><span class="text-slate-300 group-hover:text-white font-black uppercase text-[11px] tracking-tighter">${ssrInterpolate(game.name)}</span></div><div class="w-1.5 h-1.5 rounded-full bg-red-900 group-hover:bg-red-600 transition-colors"></div></div>`);
      });
      _push(`<!--]--></div></div></aside><main class="lg:col-span-6 space-y-6"><!--[-->`);
      ssrRenderList(unref(posts), (post) => {
        _push(`<div class="bg-black/40 backdrop-blur-md border border-red-900/10 rounded-3xl p-8 hover:border-red-600/30 transition-all group shadow-[0_10px_40px_rgba(0,0,0,0.3)]"><div class="flex items-start justify-between mb-6"><div class="flex items-center gap-4"><div class="relative"><img${ssrRenderAttr("src", post.author.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + post.author.username)} class="w-12 h-12 rounded-xl object-cover border-2 border-slate-900 group-hover:border-red-600/50 transition-all"><div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-950 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div></div><div><h4 class="font-black text-white hover:text-red-500 transition-colors cursor-pointer">@${ssrInterpolate(post.author.username)}</h4><div class="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest"><span>${ssrInterpolate(unref(timeAgo)(post.created_at))}</span><span class="w-1 h-1 rounded-full bg-slate-800"></span>`);
        if (post.game) {
          _push(`<span class="text-red-500">${ssrInterpolate(post.game.name)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div><button class="text-slate-700 hover:text-red-500 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg></button></div><p class="text-slate-400 text-sm leading-relaxed mb-8 border-l-2 border-red-900/30 pl-6 italic">${ssrInterpolate(post.content)}</p><div class="flex items-center justify-between pt-6 border-t border-red-900/10"><div class="flex items-center gap-6"><button class="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-all group/btn"><span class="text-lg group-hover/btn:scale-125 transition-transform">❤️</span><span class="text-[10px] font-black uppercase tracking-widest">Like Post</span></button><button class="flex items-center gap-2 text-slate-500 hover:text-white transition-all group/btn"><span class="text-lg group-hover/btn:rotate-12 transition-transform">💬</span><span class="text-[10px] font-black uppercase tracking-widest">Transmit</span></button></div><span class="text-[9px] font-bold text-slate-800 uppercase tracking-widest">Sector J-42</span></div></div>`);
      });
      _push(`<!--]-->`);
      if (!unref(posts) || unref(posts).length === 0) {
        _push(`<div class="py-20 text-center bg-black/20 rounded-3xl border border-dashed border-red-900/10"><p class="text-slate-600 font-bold uppercase tracking-widest text-xs tracking-[.4em]">No signals detected</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main><aside class="lg:col-span-3"><div class="sticky top-8 space-y-6"><div class="bg-red-600/5 border border-red-600/10 rounded-2xl p-8 relative overflow-hidden group"><div class="absolute -top-10 -right-10 w-32 h-32 bg-red-600/10 blur-3xl group-hover:bg-red-600/20 transition-all"></div><h3 class="text-[10px] font-black text-red-500 uppercase tracking-widest mb-6">Intelligence</h3><div class="space-y-6"><div class="flex flex-col"><span class="text-5xl font-black text-white italic tracking-tighter">${ssrInterpolate(unref(posts)?.length || 0)}</span><span class="text-[10px] text-slate-600 uppercase font-bold tracking-[.2em] mt-1">Total Signals</span></div></div></div><div class="bg-black/40 backdrop-blur-md border border-slate-900 rounded-2xl p-6"><h3 class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Upcoming Ops</h3><div class="space-y-4"><!--[-->`);
      ssrRenderList(unref(tournaments), (t) => {
        _push(`<div class="border-l-2 border-red-600 pl-4 py-1"><h4 class="text-xs font-black uppercase tracking-tight text-white">${ssrInterpolate(t.name)}</h4><p class="text-[10px] text-slate-600 font-bold uppercase mt-1">${ssrInterpolate(unref(formatDate)(t.date))}</p></div>`);
      });
      _push(`<!--]--></div></div></div></aside></div></div></div>`);
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
//# sourceMappingURL=index-CT4_gCxi.mjs.map
