<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
import { useUtils } from '~/composables/useUtils'
const { addNotification } = useNotifications()

definePageMeta({
  layout: 'admin'
})

const config = useRuntimeConfig()
const { token } = useAuth()
const { formatDate } = useUtils()

const { data: tournaments, refresh } = await useFetch(`${config.public.apiBase}/tournaments/`)
const { data: games } = await useFetch(`${config.public.apiBase}/games/`)

// UI State
const showModal = ref(false)
const modalMode = ref<'create' | 'edit'>('create')
const deletingId = ref<number | null>(null)
const loading = ref(false)

// Form State
const form = reactive({
  id: null,
  name: '',
  game: '',
  description: '',
  prize_pool: '',
  status: 'upcoming',
  date: '',
  max_participants: 0
})

const resetForm = () => {
  form.id = null
  form.name = ''
  form.game = ''
  form.description = ''
  form.prize_pool = ''
  form.status = 'upcoming'
  form.date = ''
  form.max_participants = 0
}

const openCreate = () => {
  modalMode.value = 'create'
  resetForm()
  showModal.value = true
}

const openEdit = (t: any) => {
  modalMode.value = 'edit'
  form.id = t.id
  form.name = t.name
  form.game = t.game?.id || ''
  form.description = t.description
  form.prize_pool = t.prize_pool
  form.status = t.status
  form.date = t.date?.split('T')[0] // Basic date string format
  form.max_participants = t.max_participants
  showModal.value = true
}

const handleSubmit = async () => {
  loading.value = true
  const method = modalMode.value === 'create' ? 'POST' : 'PUT'
  const url = modalMode.value === 'create' 
    ? `${config.public.apiBase}/tournaments/` 
    : `${config.public.apiBase}/tournaments/${form.id}/`

  try {
    const { error } = await useFetch(url, {
      method,
      headers: { 
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      body: { ...form, game: form.game || null }
    })

    if (error.value) throw new Error('Operation deployment failed')
    
    addNotification({ title: 'STRATEGIC UPDATE', message: `Operation ${form.name} Deployed.`, type: 'success' })
    showModal.value = false
    await refresh()
  } catch (err) {
    addNotification({ title: 'ABORT FAILURE', message: 'Critical deployment error.', type: 'error' })
  } finally {
    loading.value = false
  }
}

const deleteTournament = async (id: number) => {
  if (!confirm('Confirm operation termination? This action is permanent.')) return
  
  deletingId.value = id
  try {
    const { error } = await useFetch(`${config.public.apiBase}/tournaments/${id}/`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token.value}` }
    })
    if (error.value) throw new Error('Abort failed')
    addNotification({ title: 'OPERATION TERMINATED', message: 'Target destroyed successfully.', type: 'success' })
    await refresh()
  } catch (err) {
    addNotification({ title: 'EXTRACTION FAILED', message: 'Terminal error during deletion.', type: 'error' })
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
      <button @click="openCreate" class="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-black uppercase text-xs transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] skew-x-[-12deg]">
        <span class="inline-block skew-x-[12deg]">New Operation</span>
      </button>
    </div>

    <!-- Tournaments Table -->
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
              <button @click="openEdit(t)" class="text-slate-500 hover:text-white transition-colors">Edit</button>
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

    <!-- Deployment Modal -->
    <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
       <div class="absolute inset-0 bg-black/80 backdrop-blur-md" @click="showModal = false"></div>
       <div class="relative w-full max-w-2xl bg-slate-950 border border-red-600/30 rounded-[3rem] p-10 shadow-[0_0_100px_rgba(220,38,38,0.2)] overflow-hidden animate-in fade-in zoom-in duration-300">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
          
          <div class="flex justify-between items-start mb-10">
            <div>
              <h3 class="text-3xl font-black uppercase italic tracking-tighter">{{ modalMode === 'create' ? 'Deploy' : 'Modify' }} <span class="text-red-600">Operation</span></h3>
              <p class="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-2">Strategic Parameter Entry</p>
            </div>
            <button @click="showModal = false" class="text-slate-500 hover:text-white">✕</button>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-[10px] font-black uppercase text-red-500 tracking-widest">Op Name</label>
                <input v-model="form.name" required class="w-full bg-black/40 border border-slate-900 rounded-xl p-4 text-white focus:outline-none focus:border-red-600 transition-all font-bold" placeholder="E.G. CHAMPIONS CUP">
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black uppercase text-red-500 tracking-widest">Combat Sector (Game)</label>
                <select v-model="form.game" class="w-full bg-black/40 border border-slate-900 rounded-xl p-4 text-white focus:outline-none focus:border-red-600 transition-all font-bold">
                  <option value="">Select Tactical Objective</option>
                  <option v-for="g in games" :key="g.id" :value="g.id">{{ g.name }}</option>
                </select>
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase text-red-500 tracking-widest">Strategic Intel (Description)</label>
              <textarea v-model="form.description" required rows="3" class="w-full bg-black/40 border border-slate-900 rounded-xl p-4 text-white focus:outline-none focus:border-red-600 transition-all font-bold" placeholder="MISSION OBJECTIVES..."></textarea>
            </div>

            <div class="grid grid-cols-3 gap-6">
              <div class="space-y-2">
                <label class="text-[10px] font-black uppercase text-red-500 tracking-widest">Commission (Prize)</label>
                <input v-model="form.prize_pool" class="w-full bg-black/40 border border-slate-900 rounded-xl p-4 text-white focus:outline-none focus:border-red-600 transition-all font-bold" placeholder="$5,000">
              </div>
               <div class="space-y-2">
                <label class="text-[10px] font-black uppercase text-red-500 tracking-widest">Deployment Date</label>
                <input v-model="form.date" type="date" required class="w-full bg-black/40 border border-slate-900 rounded-xl p-4 text-white focus:outline-none focus:border-red-600 transition-all font-bold">
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black uppercase text-red-500 tracking-widest">Status</label>
                <select v-model="form.status" class="w-full bg-black/40 border border-slate-900 rounded-xl p-4 text-white focus:outline-none focus:border-red-600 transition-all font-bold">
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="finished">Finished</option>
                </select>
              </div>
            </div>

            <div class="pt-6">
              <button 
                type="submit" 
                :disabled="loading"
                class="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-[0_10px_40px_rgba(220,38,38,0.3)] transition-all flex items-center justify-center gap-4"
              >
                <span v-if="loading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                {{ modalMode === 'create' ? 'Confirm Deployment' : 'Save Strategic Update' }}
              </button>
            </div>
          </form>
       </div>
    </div>
  </div>
</template>
