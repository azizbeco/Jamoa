<script setup lang="ts">
const { user, logout } = useAuth()
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-20">
    <div class="bg-black/40 backdrop-blur-xl border border-blue-900/20 rounded-[3rem] p-12 text-center space-y-8 shadow-[0_30px_100px_rgba(0,0,0,0.5)] relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
      
      <div class="w-32 h-32 mx-auto bg-blue-600 rounded-[2rem] flex items-center justify-center text-5xl font-black italic shadow-[0_0_40px_rgba(37,99,235,0.4)] skew-x-[-10deg]">
        {{ user?.username?.charAt(0).toUpperCase() }}
      </div>

      <div class="space-y-2">
        <h1 class="text-4xl font-black uppercase italic tracking-tighter">@{{ user?.username }}</h1>
        <p class="text-blue-500 text-xs font-black uppercase tracking-[0.3em]">Status: Intelligence Active</p>
      </div>

      <div class="grid grid-cols-2 gap-4 max-w-sm mx-auto">
        <div class="bg-slate-900/50 p-4 rounded-2xl border border-blue-900/10">
          <span class="text-[10px] font-black uppercase text-slate-500 block">Experience</span>
          <span class="text-xl font-black italic">Rank 1</span>
        </div>
        <div class="bg-slate-900/50 p-4 rounded-2xl border border-blue-900/10">
          <span class="text-[10px] font-black uppercase text-slate-500 block">Ops Joined</span>
          <span class="text-xl font-black italic">0</span>
        </div>
      </div>

      <button @click="logout" class="bg-red-600/10 border border-red-600 text-red-500 px-10 py-3 rounded-xl font-black uppercase text-xs hover:bg-red-600 hover:text-white transition-all">
        Terminate Session
      </button>
    </div>
  </div>
</template>
