<script setup lang="ts">
const { user, logout, isAuthenticated } = useAuth()
const isMenuOpen = ref(false)

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Arena', path: '/tournaments' },
  { name: 'Squads', path: '/teams' }
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
}

const closeMenu = () => {
  isMenuOpen.value = false
  document.body.style.overflow = 'auto'
}
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-white font-sans selection:bg-red-600/30">
    <!-- Background Accents -->
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-600 opacity-[0.04] blur-[150px] rounded-full"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600 opacity-[0.04] blur-[150px] rounded-full"></div>
      <div class="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-blue-900 opacity-[0.02] blur-[100px] rounded-full"></div>
    </div>

    <!-- Global Header -->
    <header class="sticky top-0 z-50 bg-black/80 backdrop-blur-2xl border-b border-red-900/20">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-3 group">
          <div class="w-10 h-10 bg-red-600 rounded flex items-center justify-center font-black text-xl italic skew-x-[-12deg] shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all group-hover:scale-110">J</div>
          <span class="text-2xl font-black uppercase tracking-tighter italic group-hover:text-red-500 transition-colors">Jamoa</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-10">
          <NuxtLink v-for="link in navLinks" :key="link.path" :to="link.path" class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-all relative group py-2">
            {{ link.name }}
            <span class="absolute bottom-0 left-0 w-0 h-[2px] bg-red-600 transition-all group-hover:w-full"></span>
          </NuxtLink>
        </div>

        <!-- Desktop Auth -->
        <div class="hidden md:flex items-center space-x-6">
          <template v-if="isAuthenticated">
             <NuxtLink to="/admin" v-if="user?.is_staff" class="text-[9px] font-black text-red-500 uppercase tracking-widest border border-red-900/30 px-3 py-1 rounded hover:bg-red-600 hover:text-white transition-all">Command</NuxtLink>
             <NuxtLink to="/profile" class="flex items-center space-x-3 group">
                <div class="text-right">
                   <p class="text-[10px] font-black uppercase text-white leading-none">@{{ user?.username }}</p>
                   <p class="text-[8px] font-bold text-red-500 uppercase tracking-widest mt-1">Combat Ready</p>
                </div>
                <div class="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center font-black italic shadow-lg group-hover:rotate-6 transition-all">
                  {{ user?.username?.charAt(0).toUpperCase() }}
                </div>
             </NuxtLink>
             <button @click="logout" class="p-2 text-slate-500 hover:text-red-500 transition-colors" title="Logout">
               <span class="text-lg">⇥</span>
             </button>
          </template>
          <NuxtLink v-else to="/auth" class="bg-red-600 hover:bg-red-700 text-white px-8 py-2.5 rounded font-black uppercase text-[10px] tracking-widest transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] skew-x-[-12deg]">
            <span class="inline-block skew-x-[12deg]">Join Protocol</span>
          </NuxtLink>
        </div>

        <!-- Mobile Toggle -->
        <button @click="toggleMenu" class="md:hidden w-10 h-10 flex flex-col items-center justify-center space-y-1.5 focus:outline-none z-50">
           <span class="w-6 h-0.5 bg-white transition-all duration-300" :class="{ 'rotate-45 translate-y-2 bg-red-600': isMenuOpen }"></span>
           <span class="w-6 h-0.5 bg-white transition-opacity duration-300" :class="{ 'opacity-0': isMenuOpen }"></span>
           <span class="w-6 h-0.5 bg-white transition-all duration-300" :class="{ '-rotate-45 -translate-y-2 bg-red-600': isMenuOpen }"></span>
        </button>
      </nav>
    </header>

    <!-- Premium Mobile Navigator Drawer -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0 translate-x-full"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition-all duration-500 ease-in"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 translate-x-full"
    >
      <div v-if="isMenuOpen" class="fixed inset-0 z-40 md:hidden">
         <div class="absolute inset-0 bg-black/60 backdrop-blur-xl" @click="closeMenu"></div>
         <div class="absolute right-0 top-0 bottom-0 w-80 bg-slate-950/90 border-l border-red-900/20 p-10 flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.5)]">
            <div class="mt-20 space-y-8">
               <NuxtLink 
                v-for="link in navLinks" 
                :key="link.path" 
                :to="link.path" 
                @click="closeMenu"
                class="block text-4xl font-black uppercase italic tracking-tighter hover:text-red-600 transition-all text-white border-b border-white/5 pb-4"
               >
                 {{ link.name }}
               </NuxtLink>
            </div>

            <div class="mt-auto space-y-6">
               <template v-if="isAuthenticated">
                  <NuxtLink to="/profile" @click="closeMenu" class="flex items-center space-x-4 p-4 bg-red-900/5 border border-red-900/20 rounded-2xl">
                     <div class="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center font-black text-2xl italic">
                        {{ user?.username?.charAt(0).toUpperCase() }}
                     </div>
                     <div>
                        <p class="font-black uppercase text-lg leading-none">@{{ user?.username }}</p>
                        <p class="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-1">Status: Active</p>
                     </div>
                  </NuxtLink>
                  <button @click="logout(); closeMenu();" class="w-full py-4 rounded-2xl border border-white/10 text-white font-black uppercase text-[10px] tracking-widest">
                    Terminate Session
                  </button>
               </template>
               <NuxtLink v-else to="/auth" @click="closeMenu" class="block w-full text-center bg-red-600 py-5 rounded-2xl text-white font-black uppercase tracking-widest shadow-xl">
                 Join Protocol
               </NuxtLink>
               
               <div class="text-center pt-8 border-t border-white/5">
                  <p class="text-[10px] font-black uppercase text-slate-600 tracking-[0.5em]">Jamoa // Ops v1.0</p>
               </div>
            </div>
         </div>
      </div>
    </Transition>

    <!-- Page Content -->
    <main class="relative z-10 pt-10">
      <slot />
    </main>

    <NotificationToast />

    <!-- Global Footer -->
    <footer class="bg-black/50 border-t border-red-900/10 py-20 mt-20">
      <div class="max-w-7xl mx-auto px-4 text-center space-y-8">
        <div class="flex justify-center items-center space-x-3 grayscale opacity-30">
          <div class="w-8 h-8 bg-white rounded skew-x-[-12deg]"></div>
          <span class="text-xl font-black uppercase tracking-tighter italic text-white">Jamoa</span>
        </div>
        <p class="text-slate-600 text-[10px] font-black uppercase tracking-[.5em]">Elevating the Strategic Gaming Meta</p>
      </div>
    </footer>
  </div>
</template>
