<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()
const { token, user } = useAuth()
const { formatDate } = useUtils()

const teamId = route.params.id
const { data: team, pending, error, refresh } = await useFetch(`${config.public.apiBase}/teams/${teamId}/`)

const joining = ref(false)
const joinError = ref('')

const handleJoin = async () => {
  if (!token.value) {
    return navigateTo('/login')
  }
  
  joining.value = true
  joinError.value = ''
  
  try {
    const { error: err } = await useFetch(`${config.public.apiBase}/teams/${teamId}/join/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    
    if (err.value) throw new Error(err.value.data?.detail || 'Failed to join team')
    
    await refresh()
    alert('Welcome to the squad, Soldier! 🫡')
  } catch (err: any) {
    joinError.value = err.message
  } finally {
    joining.value = false
  }
}

const isMember = computed(() => {
  if (!user.value || !team.value) return false
  return team.value.members.some((m: any) => m.username === user.value.username) || 
         team.value.leader.username === user.value.username
})
</script>

<template>
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div v-if="pending" class="flex justify-center py-20">
      <div class="w-16 h-16 border-4 border-slate-900 border-t-red-600 rounded-full animate-spin"></div>
    </div>

    <div v-else-if="error || !team" class="max-w-4xl mx-auto text-center py-20 bg-red-600/5 rounded-3xl border border-red-900/20">
      <h1 class="text-4xl font-black uppercase text-red-600 mb-4 italic">Signal Lost</h1>
      <p class="text-slate-500 mb-8">The requested squad coordinates are invalid or classified.</p>
      <NuxtLink to="/teams" class="text-white border border-red-600 px-8 py-3 rounded uppercase font-bold text-sm hover:bg-red-600 transition-all">
        Return to HQ
      </NuxtLink>
    </div>

    <div v-else class="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <!-- Breadcrumb -->
      <NuxtLink to="/teams" class="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-red-500 transition-colors flex items-center gap-2">
        <span>←</span> Back to Squads
      </NuxtLink>

      <!-- Team Header -->
      <div class="bg-black/40 backdrop-blur-xl border border-red-900/20 rounded-[2rem] p-10 md:p-16 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        <div class="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div class="flex flex-col md:flex-row gap-12 items-center relative z-10">
          <!-- Logo Area -->
          <div class="w-32 h-32 md:w-48 md:h-48 bg-slate-950 rounded-3xl border-2 border-red-900/30 flex items-center justify-center text-6xl md:text-8xl shadow-2xl skew-x-[-5deg]">
            {{ team.game.icon || '🛡️' }}
          </div>

          <div class="flex-1 text-center md:text-left space-y-4">
            <div class="flex flex-wrap items-center gap-3 justify-center md:justify-start">
              <span class="px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded italic">
                Active Squad
              </span>
              <span class="px-3 py-1 bg-slate-900 border border-red-900/30 text-red-500 text-[10px] font-black uppercase tracking-widest rounded italic">
                {{ team.game.name }}
              </span>
            </div>
            
            <h1 class="text-5xl md:text-7xl font-black uppercase tracking-tighter italic text-white drop-shadow-2xl">
              {{ team.name }}
            </h1>
            
            <p class="text-slate-400 font-medium max-w-xl italic">
              "{{ team.description || 'No operational orders defined for this squad.' }}"
            </p>
          </div>

          <!-- Actions -->
          <div class="w-full md:w-auto space-y-4">
            <button 
              v-if="!isMember"
              @click="handleJoin"
              :disabled="joining"
              class="w-full md:w-64 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-black uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] animate-pulse disabled:opacity-50"
            >
              {{ joining ? 'Transmitting...' : 'Join Protocol' }}
            </button>
            <div v-else class="w-full md:w-64 bg-green-500/10 border border-green-500/30 text-green-500 py-4 rounded-xl font-black uppercase tracking-widest text-center italic">
              Member Verified 🫡
            </div>
            <p v-if="joinError" class="text-red-500 text-[10px] font-bold uppercase text-center mt-2">{{ joinError }}</p>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-black/30 backdrop-blur-lg border border-red-900/10 rounded-2xl p-8 group hover:border-red-600/30 transition-all">
          <span class="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-4">Commanding Officer</span>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center font-black italic">
              {{ team.leader.username.charAt(0) }}
            </div>
            <span class="text-xl font-black uppercase tracking-tight">@{{ team.leader.username }}</span>
          </div>
        </div>

        <div class="bg-black/30 backdrop-blur-lg border border-red-900/10 rounded-2xl p-8">
          <span class="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-4">Unit Strength</span>
          <div class="flex items-center gap-4">
            <span class="text-4xl font-black text-red-500 italic">{{ team.members?.length || 1 }}</span>
            <span class="text-xs font-bold uppercase text-slate-400">Tactical Operators</span>
          </div>
        </div>

        <div class="bg-black/30 backdrop-blur-lg border border-red-900/10 rounded-2xl p-8">
          <span class="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-4">Formation Date</span>
          <div class="flex items-center gap-4 text-slate-200">
            <span class="text-xl font-black italic">{{ formatDate(team.created_at) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
