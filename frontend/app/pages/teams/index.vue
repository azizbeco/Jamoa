<script setup lang="ts">
const config = useRuntimeConfig()
const { data: teams, pending, error } = await useFetch(`${config.public.apiBase}/teams/`)
const totalTeams = computed(() => teams.value?.length || 0)
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
    <!-- Header Area -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-red-900/10 pb-10 gap-6">
      <div class="space-y-2">
        <h1 class="text-5xl font-black uppercase tracking-tighter italic text-white leading-none">
          Gamer <span class="text-blue-600">Squads</span>
        </h1>
        <p class="text-slate-500 font-bold uppercase tracking-[.3em] text-sm flex items-center">
          <span class="w-8 h-[2px] bg-blue-600 mr-3"></span>
          Browse Community Teams
        </p>
      </div>
      <div class="flex items-center space-x-6 text-right">
        <div class="flex flex-col">
          <span class="text-3xl font-black text-white leading-none">{{ totalTeams }}</span>
          <span class="text-[10px] text-blue-500 uppercase font-black tracking-widest">Active Squads</span>
        </div>
        <button class="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded font-black uppercase text-sm transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] skew-x-[-12deg]">
          <span class="inline-block skew-x-[12deg]">Create Squad</span>
        </button>
      </div>
    </div>

    <!-- Teams Grid -->
    <div v-if="pending" class="flex justify-center py-20">
      <div class="w-20 h-20 border-4 border-slate-900 border-t-red-600 rounded-full animate-spin"></div>
    </div>
    
    <div v-else-if="error" class="bg-red-600/10 border border-red-600/30 p-10 rounded-2xl text-center">
      <h2 class="text-2xl font-black uppercase text-red-500 mb-4">Connection Failed</h2>
      <button @click="refresh" class="text-white border border-red-600 px-6 py-2 rounded uppercase font-bold text-sm">Retry Protocol</button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <TeamCard v-for="team in teams" :key="team.id" :team="team" />
      <div v-if="teams?.length === 0" class="col-span-full py-32 text-center border-2 border-dashed border-red-900/10 rounded-3xl text-slate-700">
        No active squads detected.
      </div>
    </div>
  </div>
</template>
