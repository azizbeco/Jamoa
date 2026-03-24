import { withAsyncContext, mergeProps, unref, defineComponent, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-Dd-17Ryf.mjs';
import { a as useRuntimeConfig, _ as _export_sfc } from './server.mjs';
import { u as useFetch } from './fetch-C9Sh8oiV.mjs';
import { u as useUtils } from './useUtils-DsSrYuFJ.mjs';
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
  __name: "PostInteraction",
  __ssrInlineRender: true,
  props: {
    post: {}
  },
  setup(__props) {
    const props = __props;
    const { isAuthenticated } = useAuth();
    const isLiked = ref(props.post.is_liked);
    const likesCount = ref(props.post.likes_count || 0);
    const commentsCount = ref(props.post.comments_count || 0);
    const showComments = ref(false);
    const comments = ref([]);
    const newComment = ref("");
    const loading = ref(false);
    const liking = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mt-6 border-t border-red-900/10 pt-6" }, _attrs))} data-v-a316ca99><div class="flex items-center gap-8" data-v-a316ca99><button class="${ssrRenderClass([unref(isLiked) ? "text-red-500" : "text-slate-500 hover:text-red-400", "flex items-center gap-2 group/like transition-all"])}" data-v-a316ca99><div class="relative" data-v-a316ca99><span class="${ssrRenderClass([{ "scale-150 animate-pulse": unref(liking), "scale-110": unref(isLiked) }, "text-xl transition-transform duration-300 inline-block"])}" data-v-a316ca99>${ssrInterpolate(unref(isLiked) ? "❤️" : "🤍")}</span>`);
      if (unref(isLiked)) {
        _push(`<div class="absolute inset-0 animate-ping opacity-20 bg-red-600 rounded-full scale-150" data-v-a316ca99></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><span class="text-[10px] font-black uppercase tracking-widest" data-v-a316ca99>${ssrInterpolate(unref(likesCount))} Likes</span></button><button class="flex items-center gap-2 text-slate-500 hover:text-white transition-all group/comm" data-v-a316ca99><span class="text-lg group-hover/comm:rotate-12 transition-transform" data-v-a316ca99>💬</span><span class="text-[10px] font-black uppercase tracking-widest" data-v-a316ca99>${ssrInterpolate(unref(commentsCount))} Comments</span></button></div>`);
      if (unref(showComments)) {
        _push(`<div class="mt-8 space-y-6" data-v-a316ca99>`);
        if (unref(isAuthenticated)) {
          _push(`<div class="flex gap-4" data-v-a316ca99><input${ssrRenderAttr("value", unref(newComment))} placeholder="ADD INTEL..." class="flex-1 bg-black/40 border border-slate-900 rounded-xl px-4 py-2 text-xs font-bold text-white focus:outline-none focus:border-red-600/50 transition-all" data-v-a316ca99><button${ssrIncludeBooleanAttr(unref(loading) || !unref(newComment).trim()) ? " disabled" : ""} class="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-6 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all" data-v-a316ca99> Post </button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar" data-v-a316ca99><!--[-->`);
        ssrRenderList(unref(comments), (c) => {
          _push(`<div class="p-4 bg-slate-900/30 rounded-2xl border border-white/5 group/c" data-v-a316ca99><div class="flex justify-between items-start mb-2" data-v-a316ca99><span class="text-[10px] font-black text-red-500 uppercase tracking-tighter" data-v-a316ca99>@${ssrInterpolate(c.author.username)}</span><span class="text-[8px] text-slate-600 font-bold uppercase tracking-widest" data-v-a316ca99>${ssrInterpolate(new Date(c.created_at).toLocaleDateString())}</span></div><p class="text-xs text-slate-400 font-medium leading-relaxed" data-v-a316ca99>${ssrInterpolate(c.text)}</p></div>`);
        });
        _push(`<!--]-->`);
        if (unref(comments).length === 0) {
          _push(`<div class="py-10 text-center text-slate-700 font-black uppercase tracking-widest text-[10px]" data-v-a316ca99> No communication history found. </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PostInteraction.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-a316ca99"]]), { __name: "PostInteraction" });
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
      const _component_PostInteraction = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12" }, _attrs))}><div class="grid grid-cols-1 lg:grid-cols-12 gap-8"><aside class="lg:col-span-3 space-y-8"><div class="bg-black/40 backdrop-blur-md border border-red-900/20 rounded-2xl p-6"><h2 class="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-6 flex items-center"><span class="w-4 h-[2px] bg-blue-600 mr-2"></span> Top Modules </h2><div class="space-y-4"><!--[-->`);
      ssrRenderList(unref(games), (game) => {
        _push(`<div class="flex items-center justify-between p-3 rounded-xl hover:bg-blue-600/10 border border-transparent hover:border-blue-600/30 cursor-pointer transition-all group"><div class="flex items-center gap-3"><span class="w-8 h-8 flex items-center justify-center rounded bg-slate-900 border border-blue-900/20 text-lg shadow-inner group-hover:border-blue-500/50 transition-all">${ssrInterpolate(game.icon || "🎮")}</span><span class="text-slate-300 group-hover:text-white font-black uppercase text-[11px] tracking-tighter">${ssrInterpolate(game.name)}</span></div><div class="w-1.5 h-1.5 rounded-full bg-blue-900 group-hover:bg-blue-500 transition-colors"></div></div>`);
      });
      _push(`<!--]--></div></div></aside><main class="lg:col-span-6 space-y-6"><!--[-->`);
      ssrRenderList(unref(posts), (post) => {
        _push(`<div class="bg-black/40 backdrop-blur-md border border-red-900/10 rounded-3xl p-8 hover:border-red-600/30 transition-all group shadow-[0_10px_40px_rgba(0,0,0,0.3)]"><div class="flex items-start justify-between mb-6"><div class="flex items-center gap-4"><div class="relative"><img${ssrRenderAttr("src", post.author.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + post.author.username)} class="w-12 h-12 rounded-xl object-cover border-2 border-slate-900 group-hover:border-red-600/50 transition-all"><div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-950 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div></div><div><h4 class="font-black text-white hover:text-red-500 transition-colors cursor-pointer">@${ssrInterpolate(post.author.username)}</h4><div class="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest"><span>${ssrInterpolate(unref(timeAgo)(post.created_at))}</span><span class="w-1 h-1 rounded-full bg-slate-800"></span>`);
        if (post.game) {
          _push(`<span class="text-red-500">${ssrInterpolate(post.game.name)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div><p class="text-slate-400 text-sm leading-relaxed mb-8 border-l-2 border-red-900/30 pl-6 italic">${ssrInterpolate(post.content)}</p>`);
        _push(ssrRenderComponent(_component_PostInteraction, { post }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]-->`);
      if (!unref(posts) || unref(posts).length === 0) {
        _push(`<div class="py-20 text-center bg-black/20 rounded-3xl border border-dashed border-red-900/10"><p class="text-slate-600 font-bold uppercase tracking-widest text-xs tracking-[.4em]">No signals detected</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main><aside class="lg:col-span-3"><div class="sticky top-24 space-y-6"><div class="bg-blue-600/5 border border-blue-600/10 rounded-2xl p-8 relative overflow-hidden group"><div class="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/10 blur-3xl group-hover:bg-blue-600/20 transition-all"></div><h3 class="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-6">Intelligence</h3><div class="flex flex-col"><span class="text-5xl font-black text-white italic tracking-tighter">${ssrInterpolate(unref(posts)?.length || 0)}</span><span class="text-[10px] text-blue-600 uppercase font-bold mt-1">Total Signals</span></div></div><div class="bg-black/40 backdrop-blur-md border border-slate-900 rounded-2xl p-6"><h3 class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Upcoming Ops</h3><div class="space-y-4"><!--[-->`);
      ssrRenderList(unref(tournaments), (t) => {
        _push(`<div class="border-l-2 border-red-600 pl-4 py-1"><h4 class="text-xs font-black uppercase tracking-tight text-white">${ssrInterpolate(t.name)}</h4><p class="text-[10px] text-slate-600 font-bold uppercase mt-1">${ssrInterpolate(unref(formatDate)(t.date))}</p></div>`);
      });
      _push(`<!--]--></div></div></div></aside></div></div>`);
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
//# sourceMappingURL=index-DqhlBpo9.mjs.map
