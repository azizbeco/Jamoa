<template>
  <div class="min-h-screen bg-slate-950 text-white font-sans">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header class="mb-12 flex justify-between items-center">
        <div>
          <h1 class="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Jamoa Platform
          </h1>
          <p class="text-slate-400 mt-2">Next-gen gaming community</p>
        </div>
        <div class="flex gap-4">
          <button class="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition-colors">Login</button>
        </div>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Sidebar: Games & Tournaments -->
        <aside class="lg:col-span-3 space-y-8">
          <section>
            <h2 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Games</h2>
            <div class="space-y-2">
              <div v-for="game in games" :key="game.id" 
                   class="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group">
                <span class="w-8 h-8 flex items-center justify-center rounded bg-slate-800 text-lg" :style="{ color: game.color }">
                  {{ game.icon || '🎮' }}
                </span>
                <span class="text-slate-300 group-hover:text-white font-medium">{{ game.name }}</span>
              </div>
            </div>
          </section>

          <section>
            <h2 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Upcoming Tournaments</h2>
            <div class="space-y-4">
              <div v-for="t in tournaments" :key="t.id" 
                   class="p-4 bg-slate-900/50 border border-slate-800 rounded-xl border-l-4 border-l-indigo-500">
                <h3 class="font-bold text-sm">{{ t.name }}</h3>
                <div class="flex items-center gap-2 mt-2 text-xs text-slate-500">
                  <span>📅 {{ formatDate(t.date) }}</span>
                  <span v-if="t.prize_pool" class="text-indigo-400">| 🏆 {{ t.prize_pool }}</span>
                </div>
              </div>
            </div>
          </section>
        </aside>

        <!-- Main Content: Feed -->
        <main class="lg:col-span-6">
          <div class="space-y-6">
            <div v-for="post in posts" :key="post.id" 
                 class="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                  <img :src="post.author.avatar_url" class="w-10 h-10 rounded-full border border-slate-700">
                  <div>
                    <h4 class="font-bold text-slate-200">@{{ post.author.username }}</h4>
                    <p class="text-xs text-slate-500">{{ timeAgo(post.created_at) }}</p>
                  </div>
                </div>
                <span v-if="post.game" class="px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-tighter">
                  {{ post.game.name }}
                </span>
              </div>
              <p class="text-slate-300 leading-relaxed whitespace-pre-wrap mb-4">{{ post.content }}</p>
              <div class="flex items-center gap-6 text-slate-500">
                <button class="flex items-center gap-2 hover:text-red-500 transition-colors">
                  <span>❤️</span> <span class="text-xs font-bold">Like</span>
                </button>
                <button class="flex items-center gap-2 hover:text-indigo-400 transition-colors">
                  <span>💬</span> <span class="text-xs font-bold">Reply</span>
                </button>
              </div>
            </div>
          </div>
        </main>

        <!-- Right: Insights -->
        <aside class="lg:col-span-3">
          <div class="bg-indigo-600/5 border border-indigo-500/20 rounded-2xl p-6">
            <h3 class="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-4">Platform Insights</h3>
            <div class="space-y-4">
              <div class="flex flex-col">
                <span class="text-3xl font-black text-white">{{ posts?.length || 0 }}</span>
                <span class="text-[10px] text-slate-500 uppercase font-bold">Active Posts</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()

const { data: games } = await useFetch(`${config.public.apiBase}/games/`)
const { data: posts } = await useFetch(`${config.public.apiBase}/posts/`)
const { data: tournaments } = await useFetch(`${config.public.apiBase}/tournaments/`)

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const timeAgo = (dateStr) => {
  const seconds = Math.floor((new Date() - new Date(dateStr)) / 1000)
  let interval = seconds / 31536000
  if (interval > 1) return Math.floor(interval) + " years ago"
  interval = seconds / 2592000
  if (interval > 1) return Math.floor(interval) + " months ago"
  interval = seconds / 86400
  if (interval > 1) return Math.floor(interval) + " days ago"
  interval = seconds / 3600
  if (interval > 1) return Math.floor(interval) + " hours ago"
  interval = seconds / 60
  if (interval > 1) return Math.floor(interval) + " minutes ago"
  return Math.floor(seconds) + " seconds ago"
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&display=swap');

body {
  font-family: 'Outfit', sans-serif;
  margin: 0;
}
</style>
