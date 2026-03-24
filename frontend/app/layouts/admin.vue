<script setup lang="ts">
const { user, logout, token } = useAuth()
const config = useRuntimeConfig()

// Simple middleware check (should also be in middleware folder for robustness)
onMounted(() => {
  if (!token.value || !user.value?.is_staff) {
    // navigateTo('/')
  }
})
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-white font-sans flex flex-col md:flex-row relative overflow-hidden">
    <!-- Cyber Background -->
    <div class="fixed inset-0 pointer-events-none z-0 opacity-20">
      <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div class="absolute top-0 left-0 w-full h-1 bg-red-600 animate-pulse"></div>
    </div>

    <!-- Admin Sidebar -->
    <aside class="w-full md:w-72 bg-black/80 backdrop-blur-2xl border-r border-red-900/30 p-8 flex flex-col z-50 relative">
      <div class="mb-12">
        <NuxtLink to="/" class="flex items-center space-x-3 group mb-10">
          <div class="w-10 h-10 bg-red-600 rounded flex items-center justify-center font-black text-xl italic skew-x-[-12deg] shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all">J</div>
          <div>
            <h1 class="text-xl font-black uppercase tracking-tighter italic text-white leading-none">Command</h1>
            <p class="text-[8px] text-red-500 font-bold uppercase tracking-[.3em] mt-1">Operator Console</p>
          </div>
        </NuxtLink>

        <nav class="space-y-2 uppercase font-black text-[10px] tracking-widest">
          <NuxtLink to="/admin" class="flex items-center space-x-4 p-4 rounded-xl border border-transparent hover:bg-red-600/10 hover:border-red-600/20 transition-all text-slate-500 hover:text-white" active-class="bg-red-600/20 border-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.2)]">
            <span>📡 Overview</span>
          </NuxtLink>
          <NuxtLink to="/admin/tournaments" class="flex items-center space-x-4 p-4 rounded-xl border border-transparent hover:bg-red-600/10 hover:border-red-600/20 transition-all text-slate-500 hover:text-white" active-class="bg-red-600/20 border-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.2)]">
            <span>🏆 Operations</span>
          </NuxtLink>
          <NuxtLink to="/admin/games" class="flex items-center space-x-4 p-4 rounded-xl border border-transparent hover:bg-red-600/10 hover:border-red-600/20 transition-all text-slate-500 hover:text-white" active-class="bg-red-600/20 border-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.2)]">
            <span>⚔️ Arsenal</span>
          </NuxtLink>
        </nav>
      </div>

      <div class="mt-auto pt-10 border-t border-red-900/20">
        <div class="flex items-center space-x-3 mb-6 bg-red-600/5 p-3 rounded-xl border border-red-900/10">
           <div class="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center font-black italic shadow-lg">
              {{ user?.username?.charAt(0).toUpperCase() }}
            </div>
            <div class="overflow-hidden">
               <p class="text-[10px] font-black text-white truncate">@{{ user?.username }}</p>
               <p class="text-[8px] font-bold text-red-500 uppercase tracking-widest">Operator</p>
            </div>
        </div>
        <button @click="logout" class="w-full p-4 rounded-xl bg-red-600/10 border border-red-600/20 text-red-500 font-black uppercase text-[10px] tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all">
          Terminate Session
        </button>
      </div>
    </aside>

    <!-- Main Admin Content -->
    <main class="flex-1 p-8 md:p-12 overflow-y-auto z-10 custom-scrollbar relative">
      <div class="absolute top-0 left-0 w-64 h-64 bg-red-600/5 blur-[100px] pointer-events-none"></div>
      <slot />
    </main>
  </div>
</template>

<style>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #450a0a;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #dc2626;
}
</style>
