<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const config = useRuntimeConfig()
const { data: tournaments } = await useFetch(`${config.public.apiBase}/tournaments/`)
const { data: teams } = await useFetch(`${config.public.apiBase}/teams/`)
const { data: games } = await useFetch(`${config.public.apiBase}/games/`)
const { data: posts } = await useFetch(`${config.public.apiBase}/posts/`)
</script>

<template>
  <div class="space-y-12 max-w-6xl mx-auto pb-20">
    <div class="flex items-end justify-between border-b border-red-600/10 pb-10">
      <div>
        <h2 class="text-4xl font-black uppercase italic tracking-tighter">Command <span class="text-red-600">Overview</span></h2>
        <p class="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] mt-2">Active Strategic Intel</p>
      </div>
      <div class="bg-red-600/10 px-4 py-2 rounded-lg border border-red-600/20 text-[10px] font-black uppercase text-red-500 tracking-widest animate-pulse">
        System Sync: Online
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="stat in [
        { name: 'Total Operations', value: tournaments?.length || 0, icon: '🏆', color: 'red' },
        { name: 'Active Squads', value: teams?.length || 0, icon: '🛡️', color: 'red' },
        { name: 'Arsenal Diversity', value: games?.length || 0, icon: '⚔️', color: 'red' },
        { name: 'Intel Signals', value: posts?.length || 0, icon: '📡', color: 'red' }
      ]" :key="stat.name" class="bg-black/40 border border-red-900/10 rounded-3xl p-8 group hover:border-red-600/30 transition-all shadow-2xl relative overflow-hidden">
        <div class="absolute -top-10 -right-10 w-24 h-24 bg-red-600/5 blur-3xl group-hover:bg-red-600/10 transition-all"></div>
        <div class="relative z-10 space-y-4">
          <div class="text-3xl">{{ stat.icon }}</div>
          <div>
            <p class="text-5xl font-black italic text-white tracking-tighter">{{ stat.value }}</p>
            <p class="text-[10px] font-black uppercase text-slate-500 tracking-widest mt-1">{{ stat.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Intelligence -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div class="bg-black/40 border border-slate-900 rounded-3xl p-10 space-y-8">
        <div class="flex justify-between items-center">
          <h3 class="text-xs font-black uppercase tracking-widest text-red-500">Live Signals</h3>
          <NuxtLink to="/" class="text-[10px] font-black text-slate-500 hover:text-white uppercase">View Ops Feed</NuxtLink>
        </div>
        <div class="space-y-4">
          <div v-for="post in posts?.slice(0, 5)" :key="post.id" class="p-4 bg-slate-900/30 border border-red-900/5 rounded-2xl flex items-center justify-between group hover:border-red-900/20 transition-all">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center font-black italic">
                {{ post.author.username.charAt(0).toUpperCase() }}
              </div>
              <p class="text-[11px] font-bold text-slate-300 truncate max-w-[150px]">@{{ post.author.username }}: {{ post.content }}</p>
            </div>
            <span class="text-[9px] text-slate-700 font-black uppercase">{{ post.created_at_fmt }}</span>
          </div>
        </div>
      </div>

      <div class="bg-black/40 border border-slate-900 rounded-3xl p-10 space-y-8">
        <div class="flex justify-between items-center">
          <h3 class="text-xs font-black uppercase tracking-widest text-red-500">Active Squads</h3>
          <NuxtLink to="/admin/teams" class="text-[10px] font-black text-slate-500 hover:text-white uppercase">Full Intel</NuxtLink>
        </div>
        <div class="space-y-4">
          <div v-for="team in teams?.slice(0, 5)" :key="team.id" class="p-4 bg-slate-900/30 border border-red-900/5 rounded-2xl flex items-center justify-between group">
            <div class="flex items-center gap-4">
              <span class="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-xs">🛡️</span>
              <p class="text-[11px] font-black text-white uppercase">{{ team.name }}</p>
            </div>
            <p class="text-[10px] font-bold text-red-500/50 uppercase tracking-widest">{{ team.members_count }} Units</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
