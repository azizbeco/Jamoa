import { withAsyncContext, mergeProps, unref, defineComponent, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "mt-6 pt-6",
        style: { "border-top": "1px solid rgba(220,38,38,0.12)" }
      }, _attrs))} data-v-4b1d31bc><div class="flex items-center gap-8" data-v-4b1d31bc><button class="${ssrRenderClass([unref(isLiked) ? "text-red-400" : "text-slate-500 hover:text-red-400", "flex items-center gap-2 group/like transition-all"])}" data-v-4b1d31bc><div class="relative" data-v-4b1d31bc><span class="${ssrRenderClass([{ "scale-150 animate-pulse": unref(liking), "scale-110": unref(isLiked) }, "text-xl transition-transform duration-300 inline-block"])}" data-v-4b1d31bc>${ssrInterpolate(unref(isLiked) ? "❤️" : "🤍")}</span>`);
      if (unref(isLiked)) {
        _push(`<div class="absolute inset-0 animate-ping opacity-20 bg-red-600 rounded-full scale-150" data-v-4b1d31bc></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><span class="text-[10px] font-black uppercase tracking-widest" data-v-4b1d31bc>${ssrInterpolate(unref(likesCount))} Likes</span></button><button class="flex items-center gap-2 text-slate-500 hover:text-white transition-all group/comm" data-v-4b1d31bc><span class="text-lg group-hover/comm:rotate-12 transition-transform" data-v-4b1d31bc>💬</span><span class="text-[10px] font-black uppercase tracking-widest" data-v-4b1d31bc>${ssrInterpolate(unref(commentsCount))} Comments</span></button></div>`);
      if (unref(showComments)) {
        _push(`<div class="mt-6 space-y-5" data-v-4b1d31bc>`);
        if (unref(isAuthenticated)) {
          _push(`<div class="flex gap-3" data-v-4b1d31bc><input${ssrRenderAttr("value", unref(newComment))} placeholder="ADD INTEL..." class="flex-1 rounded-xl px-4 py-2.5 text-xs font-bold text-white focus:outline-none transition-all placeholder:text-slate-700" style="${ssrRenderStyle({ "background": "#08081a", "border": "1px solid rgba(255,255,255,0.08)" })}" onfocus="this.style.borderColor=&#39;rgba(220,38,38,0.5)&#39;" onblur="this.style.borderColor=&#39;rgba(255,255,255,0.08)&#39;" data-v-4b1d31bc><button${ssrIncludeBooleanAttr(unref(loading) || !unref(newComment).trim()) ? " disabled" : ""} class="text-white px-6 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all disabled:opacity-40" style="${ssrRenderStyle({ "background": "#dc2626" })}" onmouseenter="if(!this.disabled) this.style.background=&#39;#b91c1c&#39;" onmouseleave="if(!this.disabled) this.style.background=&#39;#dc2626&#39;" data-v-4b1d31bc> Post </button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar" data-v-4b1d31bc><!--[-->`);
        ssrRenderList(unref(comments), (c) => {
          _push(`<div class="p-4 rounded-xl transition-all" style="${ssrRenderStyle({ "background": "#0d0d1a", "border": "1px solid rgba(255,255,255,0.07)" })}" onmouseenter="this.style.borderColor=&#39;rgba(255,255,255,0.12)&#39;" onmouseleave="this.style.borderColor=&#39;rgba(255,255,255,0.07)&#39;" data-v-4b1d31bc><div class="flex justify-between items-start mb-2" data-v-4b1d31bc><span class="text-[10px] font-black text-red-400 uppercase tracking-tighter" data-v-4b1d31bc>@${ssrInterpolate(c.author.username)}</span><span class="text-[8px] text-slate-600 font-bold uppercase tracking-widest" data-v-4b1d31bc>${ssrInterpolate(new Date(c.created_at).toLocaleDateString())}</span></div><p class="text-xs text-slate-300 font-medium leading-relaxed" data-v-4b1d31bc>${ssrInterpolate(c.text)}</p></div>`);
        });
        _push(`<!--]-->`);
        if (unref(comments).length === 0) {
          _push(`<div class="py-10 text-center text-slate-700 font-black uppercase tracking-widest text-[10px]" data-v-4b1d31bc> No communication history found. </div>`);
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
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-4b1d31bc"]]), { __name: "PostInteraction" });
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
    const { data: posts, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16" }, _attrs))}><div class="grid grid-cols-1 lg:grid-cols-12 gap-8"><aside class="lg:col-span-3 space-y-8"><div class="relative rounded-2xl overflow-hidden" style="${ssrRenderStyle({ "background": "#0d0d1a", "border": "1px solid rgba(37,99,235,0.35)" })}"><div class="h-[2px] w-full" style="${ssrRenderStyle({ "background": "linear-gradient(90deg, transparent, rgba(37,99,235,0.8), transparent)" })}"></div><div class="p-6"><h2 class="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-6 flex items-center gap-2"><span class="w-4 h-[2px] bg-blue-500"></span> Top Modules </h2><div class="space-y-2"><!--[-->`);
      ssrRenderList(unref(games), (game) => {
        _push(`<div class="flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all group" style="${ssrRenderStyle({ "border": "1px solid transparent" })}" onmouseenter="this.style.background=&#39;rgba(37,99,235,0.1)&#39;; this.style.borderColor=&#39;rgba(37,99,235,0.4)&#39;" onmouseleave="this.style.background=&#39;transparent&#39;; this.style.borderColor=&#39;transparent&#39;"><div class="flex items-center gap-3"><span class="w-9 h-9 flex items-center justify-center rounded-lg text-lg shadow-inner transition-all group-hover:shadow-[0_0_12px_rgba(37,99,235,0.3)]" style="${ssrRenderStyle({ "background": "#08081a", "border": "1px solid rgba(37,99,235,0.25)" })}">${ssrInterpolate(game.icon || "🎮")}</span><span class="text-slate-300 group-hover:text-white font-black uppercase text-[11px] tracking-tighter transition-colors">${ssrInterpolate(game.name)}</span></div><div class="w-2 h-2 rounded-full bg-blue-900 group-hover:bg-blue-400 transition-colors shadow-[0_0_6px_rgba(37,99,235,0.5)]"></div></div>`);
      });
      _push(`<!--]-->`);
      if (!unref(games) || unref(games).length === 0) {
        _push(`<div class="py-8 text-center text-slate-700 font-bold uppercase text-[10px] tracking-widest"> No modules </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></aside><main class="lg:col-span-6 space-y-6"><!--[-->`);
      ssrRenderList(unref(posts), (post) => {
        _push(`<div class="relative rounded-3xl overflow-hidden transition-all group" style="${ssrRenderStyle({ "background": "#0d0d1a", "border": "1px solid rgba(220,38,38,0.2)", "box-shadow": "0 4px 30px rgba(0,0,0,0.4)" })}" onmouseenter="this.style.borderColor=&#39;rgba(220,38,38,0.45)&#39;; this.style.boxShadow=&#39;0 8px 40px rgba(0,0,0,0.5), 0 0 30px rgba(220,38,38,0.08)&#39;" onmouseleave="this.style.borderColor=&#39;rgba(220,38,38,0.2)&#39;; this.style.boxShadow=&#39;0 4px 30px rgba(0,0,0,0.4)&#39;"><div class="h-[2px] w-full" style="${ssrRenderStyle({ "background": "linear-gradient(90deg, transparent, rgba(220,38,38,0.6), transparent)" })}"></div><div class="p-8"><div class="flex items-start justify-between mb-6"><div class="flex items-center gap-4"><div class="relative"><img${ssrRenderAttr("src", post.author.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + post.author.username)} class="w-12 h-12 rounded-xl object-cover transition-all" style="${ssrRenderStyle({ "border": "2px solid rgba(220,38,38,0.3)" })}"><div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.6)]" style="${ssrRenderStyle({ "border-color": "#020208" })}"></div></div><div><h4 class="font-black text-white hover:text-red-400 transition-colors cursor-pointer">@${ssrInterpolate(post.author.username)}</h4><div class="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5"><span>${ssrInterpolate(unref(timeAgo)(post.created_at))}</span><span class="w-1 h-1 rounded-full bg-slate-700"></span>`);
        if (post.game) {
          _push(`<span class="text-red-400">${ssrInterpolate(post.game.name)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div><p class="text-slate-300 text-sm leading-relaxed mb-8 pl-6 italic" style="${ssrRenderStyle({ "border-left": "2px solid rgba(220,38,38,0.4)" })}">${ssrInterpolate(post.content)}</p>`);
        _push(ssrRenderComponent(_component_PostInteraction, { post }, null, _parent));
        _push(`</div></div>`);
      });
      _push(`<!--]-->`);
      if (!unref(posts) || unref(posts).length === 0) {
        _push(`<div class="py-24 text-center rounded-3xl" style="${ssrRenderStyle({ "background": "rgba(13,13,26,0.8)", "border": "1px dashed rgba(220,38,38,0.2)" })}"><div class="text-4xl mb-4">📡</div><p class="text-slate-600 font-black uppercase tracking-[.3em] text-xs">No signals detected</p><p class="text-slate-800 text-[10px] mt-2 uppercase tracking-widest">Awaiting transmission...</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main><aside class="lg:col-span-3"><div class="sticky top-24 space-y-6"><div class="relative rounded-2xl overflow-hidden group" style="${ssrRenderStyle({ "background": "rgba(37,99,235,0.07)", "border": "1px solid rgba(37,99,235,0.25)" })}"><div class="h-[2px] w-full" style="${ssrRenderStyle({ "background": "linear-gradient(90deg, transparent, rgba(37,99,235,0.8), transparent)" })}"></div><div class="p-8 relative"><div class="absolute -top-6 -right-6 w-32 h-32 bg-blue-600 opacity-10 blur-3xl group-hover:opacity-20 rounded-full transition-all"></div><h3 class="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6">Intelligence</h3><div class="flex flex-col"><span class="text-6xl font-black text-white italic tracking-tighter" style="${ssrRenderStyle({ "text-shadow": "0 0 30px rgba(37,99,235,0.4)" })}">${ssrInterpolate(unref(posts)?.length || 0)}</span><span class="text-[10px] text-blue-500 uppercase font-bold mt-1 tracking-widest">Total Signals</span></div></div></div><div class="relative rounded-2xl overflow-hidden" style="${ssrRenderStyle({ "background": "#0d0d1a", "border": "1px solid rgba(255,255,255,0.06)" })}"><div class="h-[2px] w-full" style="${ssrRenderStyle({ "background": "linear-gradient(90deg, transparent, rgba(220,38,38,0.5), transparent)" })}"></div><div class="p-6"><h3 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Upcoming Ops</h3><div class="space-y-4"><!--[-->`);
      ssrRenderList(unref(tournaments), (t) => {
        _push(`<div class="pl-4 py-1.5 rounded-r-lg transition-all hover:pl-5" style="${ssrRenderStyle({ "border-left": "2px solid #dc2626" })}"><h4 class="text-xs font-black uppercase tracking-tight text-white">${ssrInterpolate(t.name)}</h4><p class="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-widest">${ssrInterpolate(unref(formatDate)(t.date))}</p></div>`);
      });
      _push(`<!--]-->`);
      if (!unref(tournaments) || unref(tournaments).length === 0) {
        _push(`<div class="py-8 text-center text-slate-700 font-bold uppercase text-[10px] tracking-widest"> No ops scheduled </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div></aside></div></div>`);
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
//# sourceMappingURL=index-D_Tuefip.mjs.map
