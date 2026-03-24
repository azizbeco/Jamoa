<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const config = useRuntimeConfig()
const { token } = useAuth()
const { data: games, refresh } = await useFetch(`${config.public.apiBase}/games/`)

// UI State
const showModal = ref(false)
const modalMode = ref<'create' | 'edit'>('create')
const deletingId = ref<number | null>(null)
const loading = ref(false)

// Form State
const form = reactive({
  id: null,
  name: '',
  icon: '⚔️',
  color: '#ff0000',
  team_size: 5
})

const resetForm = () => {
  form.id = null
  form.name = ''
  form.icon = '⚔️'
  form.color = '#ff0000'
  form.team_size = 5
}

const openCreate = () => {
  modalMode.value = 'create'
  resetForm()
  showModal.value = true
}

const openEdit = (g: any) => {
  modalMode.value = 'edit'
  form.id = g.id
  form.name = g.name
  form.icon = g.icon
  form.color = g.color
  form.team_size = g.team_size
  showModal.value = true
}

const handleSubmit = async () => {
  loading.value = true
  const method = modalMode.value === 'create' ? 'POST' : 'PUT'
  const url = modalMode.value === 'create' 
    ? `${config.public.apiBase}/games/` 
    : `${config.public.apiBase}/games/${form.id}/`

  try {
    const { error } = await useFetch(url, {
      method,
      headers: { 
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      body: form
    })

    if (error.value) throw new Error('Blueprint sync failed')
    
    showModal.value = false
    await refresh()
  } catch (err) {
    alert('Critical blueprint error.')
  } finally {
    loading.value = false
  }
}

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
      <button @click="openCreate" class="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-black uppercase text-xs transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] skew-x-[-12deg]">
        <span class="inline-block skew-x-[12deg]">New Entry</span>
      </button>
    </div>

    <!-- Games Grid -->
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
          <button @click="openEdit(g)" class="text-slate-500 hover:text-white transition-colors">calibrate</button>
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

    <!-- Entry Modal -->
     <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
       <div class="absolute inset-0 bg-black/80 backdrop-blur-md" @click="showModal = false"></div>
       <div class="relative w-full max-w-lg bg-slate-950 border border-red-600/30 rounded-[3rem] p-10 shadow-[0_0_100px_rgba(220,38,38,0.2)] animate-in fade-in zoom-in duration-300">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
          
          <div class="flex justify-between items-start mb-10">
            <div>
              <h3 class="text-3xl font-black uppercase italic tracking-tighter">{{ modalMode === 'create' ? 'Draft' : 'Verify' }} <span class="text-red-600">Arsenal</span></h3>
              <p class="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-2">Technical Specification Input</p>
            </div>
            <button @click="showModal = false" class="text-slate-500 hover:text-white">✕</button>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase text-red-500 tracking-widest">Model Name (Game Title)</label>
              <input v-model="form.name" required class="w-full bg-black/40 border border-slate-900 rounded-xl p-4 text-white focus:outline-none focus:border-red-600 transition-all font-bold" placeholder="E.G. COUNTER-STRIKE 2">
            </div>

            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-[10px] font-black uppercase text-red-500 tracking-widest">Icon Signal</label>
                <input v-model="form.icon" required class="w-full bg-black/40 border border-slate-900 rounded-xl p-4 text-white focus:outline-none focus:border-red-600 transition-all font-bold" placeholder="🎮">
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black uppercase text-red-500 tracking-widest">Chroma Key (Color)</label>
                <input v-model="form.color" type="color" class="w-full h-[58px] bg-black/40 border border-slate-900 rounded-xl p-2 cursor-pointer">
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase text-red-500 tracking-widest">Standard Unit Size (Team Size)</label>
              <input v-model="form.team_size" type="number" required min="1" class="w-full bg-black/40 border border-slate-900 rounded-xl p-4 text-white focus:outline-none focus:border-red-600 transition-all font-bold">
            </div>

            <div class="pt-6">
              <button 
                type="submit" 
                :disabled="loading"
                class="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-[0_10px_40px_rgba(220,38,38,0.3)] transition-all flex items-center justify-center gap-4"
              >
                <span v-if="loading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                {{ modalMode === 'create' ? 'Authorize Blueprint' : 'Commit Technical Changes' }}
              </button>
            </div>
          </form>
       </div>
    </div>
  </div>
</template>
