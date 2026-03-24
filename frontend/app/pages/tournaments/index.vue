<script setup lang="ts">
const config = useRuntimeConfig()
const { formatDate } = useUtils()

const { data: tournaments, pending, error } = await useFetch(`${config.public.apiBase}/tournaments/`)
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
    <!-- Arena Hero -->
    <div class="relative rounded-[3rem] overflow-hidden mb-16 border border-red-600/30 group">
      <div class="absolute inset-0 bg-slate-900/80 z-10"></div>
      <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
      
      <div class="relative z-20 p-12 md:p-20 text-center space-y-6">
        <span class="text-red-500 font-black uppercase tracking-[0.5em] text-sm italic">Grand Arena Protocol</span>
        <h1 class="text-6xl md:text-8xl font-black uppercase italic tracking-tighter text-white drop-shadow-[0_0_30px_rgba(220,38,38,0.5)]">
          Arena <span class="text-transparent border-t border-b border-red-600 py-1" style="-webkit-text-stroke: 1px white;">Active</span>
        </h1>
        <p class="text-slate-300 max-w-2xl mx-auto font-medium">Register for tactical operations and prove your unit's supremacy.</p>
      </div>
    </div>

    <!-- Live Tournaments -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="t in tournaments" :key="t.id" class="group bg-black/40 backdrop-blur-md border border-red-900/20 rounded-3xl overflow-hidden hover:border-red-600/50 transition-all flex flex-col">
        <div class="h-48 relative">
          <img :src="t.image || 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800'" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div class="absolute bottom-4 left-4">
            <span class="px-2 py-1 bg-red-600 text-white text-[9px] font-black uppercase tracking-widest rounded italic">{{ t.game?.name || 'Multi-Game' }}</span>
          </div>
        </div>
        
        <div class="p-8 space-y-4 flex-1 flex flex-col">
          <h3 class="text-2xl font-black uppercase italic tracking-tight text-white group-hover:text-red-500 transition-colors">{{ t.name }}</h3>
          
          <div class="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <span class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span> {{ t.status }}</span>
            <span>🏆 {{ t.prize_pool || 'Glory' }}</span>
          </div>

          <div class="mt-auto pt-6 flex gap-4">
            <NuxtLink :to="`/tournaments/${t.id}`" class="flex-1 bg-slate-950 border border-red-900/30 hover:border-red-600 text-slate-400 hover:text-white py-3 rounded-xl font-black uppercase text-[10px] text-center transition-all skew-x-[-12deg]">
              <span class="inline-block skew-x-[12deg]">Intel</span>
            </NuxtLink>
            <button class="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-black uppercase text-[10px] transition-all skew-x-[-12deg] shadow-[0_0_20px_rgba(220,38,38,0.3)]">
              <span class="inline-block skew-x-[12deg]">Enlist</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty Arena -->
      <div v-if="!tournaments || tournaments.length === 0" class="col-span-full py-40 text-center border-2 border-dashed border-red-900/10 rounded-[3rem]">
        <h2 class="text-4xl font-black uppercase text-slate-900 mb-2">Arena Empty</h2>
        <p class="text-slate-600 font-bold uppercase tracking-widest text-xs">No active operations scheduled.</p>
      </div>
    </div>
  </div>
</template>
