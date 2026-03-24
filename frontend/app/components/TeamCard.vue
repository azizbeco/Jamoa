<script setup lang="ts">
const props = defineProps<{
  team: {
    id: number
    name: string
    leader: { username: string }
    game: { name: string, color?: string }
    members_count: number
    created_at: string
  }
}>()

const { token } = useAuth()
const { notify } = useNotifications()
const config = useRuntimeConfig()

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const joinSquad = async () => {
  if (!token.value) {
    notify('Authentication Required: Please login to join.', 'error')
    return
  }

  try {
    const res = await $fetch(`${config.public.apiBase}/teams/${props.team.id}/join/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`
      }
    })
    notify(res.detail || 'Squad join protocol successful!', 'success')
  } catch (err: any) {
    notify(err.data?.error || 'Join Failed: Request denied.', 'error')
  }
}
</script>

<template>
  <div class="group relative bg-slate-900/40 border border-blue-900/20 rounded-xl p-6 transition-all hover:bg-blue-900/5 hover:border-blue-600/50 shadow-[0_0_20px_rgba(0,0,0,0.3)] overflow-hidden">
    <!-- Cyber decoration -->
    <div class="absolute top-0 right-0 w-16 h-16 bg-blue-600/5 rotate-45 transform translate-x-10 -translate-y-10"></div>
    
    <div class="relative z-10 flex flex-col h-full">
      <div class="flex justify-between items-start mb-4">
        <div>
          <span class="text-[10px] font-black uppercase tracking-widest text-blue-500/80 mb-1 block">
            {{ team.game.name }}
          </span>
          <h3 class="text-xl font-black uppercase italic tracking-tighter text-white group-hover:text-blue-500 transition-colors">
            {{ team.name }}
          </h3>
        </div>
        <div class="w-10 h-10 rounded bg-slate-950 border border-blue-900/30 flex items-center justify-center text-blue-500 font-black italic shadow-inner">
          {{ team.name.charAt(0) }}
        </div>
      </div>

      <p class="text-slate-500 text-xs mb-6 uppercase font-bold tracking-tight">
        Led by <span class="text-slate-300">@{{ team.leader.username }}</span>
      </p>

      <div class="mt-auto pt-4 border-t border-blue-900/10 flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-slate-500">
        <div class="flex items-center space-x-2">
          <span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          <span>{{ team.members_count || 1 }} Members</span>
        </div>
        <span>{{ formatDate(team.created_at) }}</span>
      </div>

      <div class="mt-6 flex gap-3">
        <NuxtLink 
          :to="`/teams/${team.id}`"
          class="flex-1 bg-slate-950 border border-blue-900/50 hover:bg-slate-900 text-blue-500 hover:text-white py-2 rounded font-black uppercase text-[10px] transition-all text-center skew-x-[-10deg]"
        >
          <span class="inline-block skew-x-[10deg]">Intel</span>
        </NuxtLink>
        <button 
          @click="joinSquad"
          class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-black uppercase text-[10px] transition-all text-center skew-x-[-10deg] shadow-[0_0_15px_rgba(37,99,235,0.3)] active:scale-95"
        >
          <span class="inline-block skew-x-[10deg]">Join</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.group::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #2563eb, transparent);
  transform: scaleX(0);
  transition: transform 0.5s ease;
}
.group:hover::before {
  transform: scaleX(1);
}
</style>
