<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()
const { token, user } = useAuth()
const { formatDate } = useUtils()

const tournamentId = route.params.id
const { data: tournament, pending, error } = await useFetch(`${config.public.apiBase}/tournaments/${tournamentId}/`)

const enlisting = ref(false)
const enlistError = ref('')

const handleEnlist = async () => {
  if (!token.value) return navigateTo('/login')
  
  enlisting.value = true
  enlistError.value = ''
  
  try {
    const { error: err } = await useFetch(`${config.public.apiBase}/tournaments/${tournamentId}/register/`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` }
    })
    
    if (err.value) throw new Error(err.value.data?.detail || 'Registration failed')
    
    alert('Enlistment confirmed. Good luck, Soldier! 🏆')
    window.location.reload() // Simple refresh to show new state
  } catch (err: any) {
    enlistError.value = err.message
  } finally {
    enlisting.value = false
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
    <div v-if="pending" class="flex justify-center py-40">
      <div class="w-20 h-20 border-4 border-slate-900 border-t-red-600 rounded-full animate-spin"></div>
    </div>

    <div v-else-if="error || !tournament" class="text-center py-40 bg-red-600/5 rounded-[3rem] border border-red-900/20">
      <h1 class="text-4xl font-black uppercase text-red-600 mb-4 italic">Signal Lost</h1>
      <p class="text-slate-500 mb-8">This operation has been cancelled or moved to a different sector.</p>
      <NuxtLink to="/tournaments" class="text-white border border-red-600 px-10 py-3 rounded-xl uppercase font-black text-xs hover:bg-red-600 transition-all">Back to Arena</NuxtLink>
    </div>

    <div v-else class="space-y-12 animate-fade-in">
      <NuxtLink to="/tournaments" class="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-red-500 transition-colors">← Arena Operations</NuxtLink>
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <!-- Main Intel -->
        <div class="lg:col-span-8 space-y-8">
          <div class="relative rounded-[2.5rem] overflow-hidden border border-red-900/10 shadow-2xl">
            <img :src="tournament.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070'" class="w-full h-[400px] object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            
            <div class="absolute bottom-10 left-10 space-y-2">
              <span class="px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded italic">{{ tournament.game?.name || 'Grand Arena' }}</span>
              <h1 class="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-white">{{ tournament.name }}</h1>
            </div>
          </div>

          <div class="bg-black/40 backdrop-blur-md border border-red-900/10 rounded-3xl p-10 space-y-6">
            <h2 class="text-xs font-black uppercase tracking-widest text-red-500">Operation Briefing</h2>
            <div class="prose prose-invert max-w-none text-slate-400 font-medium">
              {{ tournament.description }}
            </div>
          </div>
        </div>

        <!-- Sidebar Actions -->
        <div class="lg:col-span-4 space-y-8">
          <div class="bg-black/40 backdrop-blur-md border border-red-600/20 rounded-3xl p-8 space-y-8 sticky top-28">
            <div class="space-y-6">
              <div class="flex justify-between items-center pb-4 border-b border-red-900/10">
                <span class="text-[10px] font-black uppercase tracking-widest text-slate-500">Prize Pool</span>
                <span class="text-xl font-black text-red-500 italic">{{ tournament.prize_pool || 'Victory' }}</span>
              </div>
              <div class="flex justify-between items-center pb-4 border-b border-red-900/10">
                <span class="text-[10px] font-black uppercase tracking-widest text-slate-500">Kickoff</span>
                <span class="text-sm font-black text-white italic">{{ formatDate(tournament.date) }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-[10px] font-black uppercase tracking-widest text-slate-500">Status</span>
                <span class="flex items-center gap-2 text-[10px] font-black uppercase text-white">
                  <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> {{ tournament.status }}
                </span>
              </div>
            </div>

            <button 
              @click="handleEnlist"
              :disabled="enlisting"
              class="w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-[0_0_40px_rgba(220,38,38,0.4)] hover:shadow-[0_0_60px_rgba(220,38,38,0.6)] animate-pulse disabled:opacity-50"
            >
              {{ enlisting ? 'Transmitting...' : 'Enlist Now' }}
            </button>
            <p v-if="enlistError" class="text-center text-[10px] font-black text-red-500 uppercase">{{ enlistError }}</p>
          </div>

          <!-- Quick Intel Sidebar -->
          <div class="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 space-y-4">
             <h3 class="text-[10px] font-black uppercase tracking-widest text-slate-600">Rules of engagement</h3>
             <ul class="text-[10px] font-bold text-slate-500 space-y-2">
               <li>• FAIR PLAY PROTOCOL ACTIVE</li>
               <li>• LATE ARRIVALS DISQUALIFIED</li>
               <li>• HQ RESERVES ALL RIGHTS</li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
