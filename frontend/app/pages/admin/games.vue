<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const config = useRuntimeConfig()
const { token } = useAuth()
const { data: games, refresh } = await useFetch(`${config.public.apiBase}/games/`)

const deletingId = ref<number | null>(null)

const deleteGame = async (id: number) => {
  if (!confirm('Destroy arsenal blueprint? This action is irreversible.')) return
  
  deletingId.value = id
  try {
    const { error } = await useFetch(`${config.public.apiBase}/games/${id}/`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token.value}` }
    })
    if (error.value) throw new Error('Abort failed')
    await refresh()
  } catch (err) {
    alert('Terminal error during blueprint destruction.')
  } finally {
    deletingId.value = null
  }
}
</script>

<template>
  <div class="space-y-10 max-w-6xl mx-auto pb-20">
    <div class="flex items-end justify-between border-b border-red-600/10 pb-10">
      <div>
        <h2 class="text-4xl font-black uppercase italic tracking-tighter text-white">Arsenal <span class="text-red-600">Blueprints</span></h2>
        <p class="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] mt-2">Manage Recognized Combat Software</p>
      </div>
      <button class="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-black uppercase text-xs transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] skew-x-[-12deg]">
        <span class="inline-block skew-x-[12deg]">New Entry</span>
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="g in games" :key="g.id" class="group bg-black/40 border-2 border-slate-950 rounded-3xl p-8 hover:border-red-600/30 transition-all flex flex-col shadow-2xl relative">
        <div class="absolute top-4 right-4 text-xs font-black text-slate-800">#{{ g.id }}</div>
        
        <div class="flex items-center gap-6 mb-8">
          <div class="w-16 h-16 rounded-2xl bg-slate-900 border border-red-900/10 flex items-center justify-center text-3xl shadow-inner group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
            {{ g.icon || '⚔️' }}
          </div>
          <div>
            <h3 class="text-xl font-black uppercase tracking-tight text-white italic">{{ g.name }}</h3>
            <div class="h-1 w-12 rounded-full mt-1" :style="{ backgroundColor: g.color || '#ff0000' }"></div>
          </div>
        </div>

        <div class="mt-auto pt-6 flex justify-between items-center border-t border-red-900/10 text-[10px] font-black uppercase tracking-widest">
          <button class="text-slate-500 hover:text-white transition-colors">Calibrate</button>
          <button 
            @click="deleteGame(g.id)"
            :disabled="deletingId === g.id"
            class="text-red-900 hover:text-red-600 transition-all"
          >
            {{ deletingId === g.id ? '...' : 'Decommission' }}
          </button>
        </div>
      </div>

       <div v-if="!games || games.length === 0" class="col-span-full py-20 text-center text-slate-700 font-black uppercase tracking-widest text-xs">
          No weaponry data loaded.
       </div>
    </div>
  </div>
</template>
