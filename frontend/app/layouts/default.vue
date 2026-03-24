<script setup lang="ts">
const { user, logout, token } = useAuth()
const config = useRuntimeConfig()
const showUserMenu = ref(false)
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-white font-sans selection:bg-red-600 selection:text-white relative">
    <!-- Global Background Accents -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div class="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-900/10 rounded-full blur-[150px] animate-pulse"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/5 rounded-full blur-[120px] animate-pulse" style="animation-delay: 2s"></div>
      <div class="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20"></div>
    </div>

    <div class="relative z-10">
      <!-- Global Header -->
      <header class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center border-b border-red-900/10 mb-8 bg-slate-950/20 backdrop-blur-sm sticky top-0 z-50">
        <NuxtLink to="/" class="flex items-center space-x-3 group cursor-pointer">
          <div class="w-10 h-10 bg-red-600 rounded flex items-center justify-center font-black text-xl italic skew-x-[-12deg] shadow-[0_0_20px_rgba(220,38,38,0.5)] group-hover:shadow-[0_0_30px_rgba(220,38,38,0.7)] transition-all">J</div>
          <div class="hidden sm:block">
            <h1 class="text-2xl font-black uppercase tracking-tighter italic text-white leading-none">Jamoa</h1>
            <p class="text-[8px] text-red-500 font-bold uppercase tracking-[.3em] mt-1">Gamer Republic</p>
          </div>
        </NuxtLink>

        <nav class="hidden md:flex items-center space-x-8 uppercase font-black text-[10px] tracking-widest text-slate-500">
          <NuxtLink to="/" class="hover:text-red-500 transition-colors" active-class="text-red-500">Home</NuxtLink>
          <NuxtLink to="/teams" class="hover:text-red-500 transition-colors" active-class="text-red-500">Squads</NuxtLink>
          <NuxtLink to="/tournaments" class="hover:text-red-500 transition-colors" active-class="text-red-500">Arena</NuxtLink>
        </nav>

        <div class="flex items-center space-x-4">
          <template v-if="token">
            <div class="relative">
              <button 
                @click="showUserMenu = !showUserMenu"
                class="flex items-center space-x-3 bg-red-600/10 border border-red-600/30 px-4 py-2 rounded-xl group hover:bg-red-600/20 transition-all"
              >
                <div class="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-black italic shadow-lg">
                  {{ user?.username?.charAt(0).toUpperCase() }}
                </div>
                <span class="text-xs font-black uppercase tracking-widest hidden sm:inline">@{{ user?.username }}</span>
              </button>
              
              <!-- Dropdown Menu -->
              <div v-if="showUserMenu" class="absolute right-0 mt-3 w-48 bg-slate-900 border border-red-900/30 rounded-xl p-2 shadow-2xl animate-fade-in z-[60]">
                <NuxtLink to="/profile" class="block w-full p-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-red-600/10 rounded transition-all">Profile Ops</NuxtLink>
                <button @click="logout" class="block w-full text-left p-3 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-600/10 rounded transition-all">Terminate Sync</button>
              </div>
            </div>
          </template>
          <NuxtLink v-else to="/login" class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-black uppercase text-xs transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] skew-x-[-12deg]">
            <span class="inline-block skew-x-[12deg]">Join Protocol</span>
          </NuxtLink>
        </div>
      </header>

      <main>
        <slot />
      </main>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&display=swap');

body {
  font-family: 'Outfit', sans-serif;
  margin: 0;
  background-color: #020617;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #020617;
}
::-webkit-scrollbar-thumb {
  background: #450a0a;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #dc2626;
}
</style>
