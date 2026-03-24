<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const config = useRuntimeConfig()
const { token } = useAuth()
const { formatDate } = useUtils()

const { data: tournaments, refresh } = await useFetch(`${config.public.apiBase}/tournaments/`)

const deletingId = ref<number | null>(null)

const deleteTournament = async (id: number) => {
  if (!confirm('Confirm operation termination? This action is permanent.')) return
  
  deletingId.value = id
  try {
    const { error } = await useFetch(`${config.public.apiBase}/tournaments/${id}/`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token.value}` }
    })
    if (error.value) throw new Error('Abort failed')
    await refresh()
  } catch (err) {
    alert('Terminal error during deletion.')
  } finally {
    deletingId.value = null
  }
}
</script>

<template>
  <div class="space-y-10 max-w-6xl mx-auto pb-20">
    <div class="flex items-end justify-between border-b border-red-600/10 pb-10">
      <div>
        <h2 class="text-4xl font-black uppercase italic tracking-tighter text-white">Operation <span class="text-red-600">Control</span></h2>
        <p class="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] mt-2">Manage All Tactical Competitions</p>
      </div>
      <button class="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-black uppercase text-xs transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] skew-x-[-12deg]">
        <span class="inline-block skew-x-[12deg]">New Operation</span>
      </button>
    </div>

    <div class="bg-black/40 border border-slate-900 rounded-3xl overflow-hidden backdrop-blur-md">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-slate-900/50 text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-800">
            <th class="p-6">Operation ID</th>
            <th class="p-6">Strategic Name</th>
            <th class="p-6">Game Sector</th>
            <th class="p-6">Status</th>
            <th class="p-6">Kickoff</th>
            <th class="p-6 text-right">Protocol</th>
          </tr>
        </thead>
        <tbody class="text-sm font-bold">
          <tr v-for="t in tournaments" :key="t.id" class="border-b border-slate-900/50 hover:bg-red-600/5 transition-all text-slate-300 group">
            <td class="p-6 font-mono text-[10px] text-slate-600">#{{ t.id }}</td>
            <td class="p-6 text-white">{{ t.name }}</td>
            <td class="p-6 text-red-500/80">{{ t.game?.name || 'VIRTUAL' }}</td>
            <td class="p-6">
              <span class="px-2 py-1 bg-slate-900 border border-red-900/30 rounded text-[9px] uppercase tracking-tighter">{{ t.status }}</span>
            </td>
            <td class="p-6 text-[10px] uppercase text-slate-500">{{ formatDate(t.date) }}</td>
            <td class="p-6 text-right space-x-4">
              <button class="text-slate-500 hover:text-white transition-colors">Edit</button>
              <button 
                @click="deleteTournament(t.id)"
                :disabled="deletingId === t.id"
                class="text-red-900 hover:text-red-500 transition-colors disabled:opacity-50"
              >
                {{ deletingId === t.id ? '...' : 'Terminate' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div v-if="!tournaments || tournaments.length === 0" class="py-20 text-center text-slate-700 font-black uppercase tracking-widest text-xs">
         No active deployment data found.
      </div>
    </div>
  </div>
</template>
