<script setup>
const config = useRuntimeConfig()
const { formatDate, timeAgo } = useUtils()

const { data: games } = await useFetch(`${config.public.apiBase}/games/`)
const { data: posts, refresh } = await useFetch(`${config.public.apiBase}/posts/`)
const { data: tournaments } = await useFetch(`${config.public.apiBase}/tournaments/`)

// Auto-refresh tactical intel every 30 seconds
onMounted(() => {
  const timer = setInterval(() => {
    refresh()
  }, 30000)
  onUnmounted(() => clearInterval(timer))
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

      <!-- ===== Sidebar ===== -->
      <aside class="lg:col-span-3 space-y-8">
        <div class="relative rounded-2xl overflow-hidden" style="background: #0d0d1a; border: 1px solid rgba(37,99,235,0.35);">
          <!-- Top blue accent line -->
          <div class="h-[2px] w-full" style="background: linear-gradient(90deg, transparent, rgba(37,99,235,0.8), transparent);"></div>
          <div class="p-6">
            <h2 class="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-6 flex items-center gap-2">
              <span class="w-4 h-[2px] bg-blue-500"></span> Top Modules
            </h2>
            <div class="space-y-2">
              <div v-for="game in games" :key="game.id"
                   class="flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all group"
                   style="border: 1px solid transparent;"
                   onmouseenter="this.style.background='rgba(37,99,235,0.1)'; this.style.borderColor='rgba(37,99,235,0.4)'"
                   onmouseleave="this.style.background='transparent'; this.style.borderColor='transparent'">
                <div class="flex items-center gap-3">
                  <span class="w-9 h-9 flex items-center justify-center rounded-lg text-lg shadow-inner transition-all group-hover:shadow-[0_0_12px_rgba(37,99,235,0.3)]" style="background: #08081a; border: 1px solid rgba(37,99,235,0.25);">
                    {{ game.icon || '🎮' }}
                  </span>
                  <span class="text-slate-300 group-hover:text-white font-black uppercase text-[11px] tracking-tighter transition-colors">{{ game.name }}</span>
                </div>
                <div class="w-2 h-2 rounded-full bg-blue-900 group-hover:bg-blue-400 transition-colors shadow-[0_0_6px_rgba(37,99,235,0.5)]"></div>
              </div>
              <div v-if="!games || games.length === 0" class="py-8 text-center text-slate-700 font-bold uppercase text-[10px] tracking-widest">
                No modules
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- ===== Main Feed ===== -->
      <main class="lg:col-span-6 space-y-6">
        <div v-for="post in posts" :key="post.id"
             class="relative rounded-3xl overflow-hidden transition-all group"
             style="background: #0d0d1a; border: 1px solid rgba(220,38,38,0.2); box-shadow: 0 4px 30px rgba(0,0,0,0.4);"
             onmouseenter="this.style.borderColor='rgba(220,38,38,0.45)'; this.style.boxShadow='0 8px 40px rgba(0,0,0,0.5), 0 0 30px rgba(220,38,38,0.08)'"
             onmouseleave="this.style.borderColor='rgba(220,38,38,0.2)'; this.style.boxShadow='0 4px 30px rgba(0,0,0,0.4)'"
        >
          <!-- Top red accent line -->
          <div class="h-[2px] w-full" style="background: linear-gradient(90deg, transparent, rgba(220,38,38,0.6), transparent);"></div>
          <div class="p-8">
            <!-- Author -->
            <div class="flex items-start justify-between mb-6">
              <div class="flex items-center gap-4">
                <div class="relative">
                  <img :src="post.author.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + post.author.username"
                       class="w-12 h-12 rounded-xl object-cover transition-all"
                       style="border: 2px solid rgba(220,38,38,0.3);">
                  <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.6)]" style="border-color: #020208;"></div>
                </div>
                <div>
                  <h4 class="font-black text-white hover:text-red-400 transition-colors cursor-pointer">@{{ post.author.username }}</h4>
                  <div class="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                    <span>{{ timeAgo(post.created_at) }}</span>
                    <span class="w-1 h-1 rounded-full bg-slate-700"></span>
                    <span v-if="post.game" class="text-red-400">{{ post.game.name }}</span>
                  </div>
                </div>
              </div>
            </div>

            <p class="text-slate-300 text-sm leading-relaxed mb-8 pl-6 italic" style="border-left: 2px solid rgba(220,38,38,0.4);">
              {{ post.content }}
            </p>

            <!-- Interaction Layer -->
            <PostInteraction :post="post" />
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="!posts || posts.length === 0" class="py-24 text-center rounded-3xl" style="background: rgba(13,13,26,0.8); border: 1px dashed rgba(220,38,38,0.2);">
          <div class="text-4xl mb-4">📡</div>
          <p class="text-slate-600 font-black uppercase tracking-[.3em] text-xs">No signals detected</p>
          <p class="text-slate-800 text-[10px] mt-2 uppercase tracking-widest">Awaiting transmission...</p>
        </div>
      </main>

      <!-- ===== Right Column ===== -->
      <aside class="lg:col-span-3">
        <div class="sticky top-24 space-y-6">

          <!-- Intelligence Card -->
          <div class="relative rounded-2xl overflow-hidden group" style="background: rgba(37,99,235,0.07); border: 1px solid rgba(37,99,235,0.25);">
            <div class="h-[2px] w-full" style="background: linear-gradient(90deg, transparent, rgba(37,99,235,0.8), transparent);"></div>
            <div class="p-8 relative">
              <div class="absolute -top-6 -right-6 w-32 h-32 bg-blue-600 opacity-10 blur-3xl group-hover:opacity-20 rounded-full transition-all"></div>
              <h3 class="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6">Intelligence</h3>
              <div class="flex flex-col">
                <span class="text-6xl font-black text-white italic tracking-tighter" style="text-shadow: 0 0 30px rgba(37,99,235,0.4);">{{ posts?.length || 0 }}</span>
                <span class="text-[10px] text-blue-500 uppercase font-bold mt-1 tracking-widest">Total Signals</span>
              </div>
            </div>
          </div>

          <!-- Upcoming Ops Card -->
          <div class="relative rounded-2xl overflow-hidden" style="background: #0d0d1a; border: 1px solid rgba(255,255,255,0.06);">
            <div class="h-[2px] w-full" style="background: linear-gradient(90deg, transparent, rgba(220,38,38,0.5), transparent);"></div>
            <div class="p-6">
              <h3 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Upcoming Ops</h3>
              <div class="space-y-4">
                <div v-for="t in tournaments" :key="t.id" class="pl-4 py-1.5 rounded-r-lg transition-all hover:pl-5" style="border-left: 2px solid #dc2626;">
                  <h4 class="text-xs font-black uppercase tracking-tight text-white">{{ t.name }}</h4>
                  <p class="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-widest">{{ formatDate(t.date) }}</p>
                </div>
                <div v-if="!tournaments || tournaments.length === 0" class="py-8 text-center text-slate-700 font-bold uppercase text-[10px] tracking-widest">
                  No ops scheduled
                </div>
              </div>
            </div>
          </div>

        </div>
      </aside>

    </div>
  </div>
</template>
