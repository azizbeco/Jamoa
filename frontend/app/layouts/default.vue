<template>
  <div class="min-h-screen bg-slate-950 text-white font-sans selection:bg-red-600 selection:text-white relative">
    <!-- Global Background Accents (WOW factor) -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div class="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-900/10 rounded-full blur-[150px] animate-pulse"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/5 rounded-full blur-[120px] animate-pulse" style="animation-delay: 2s"></div>
      
      <!-- Scanline effect -->
      <div class="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20"></div>
    </div>

    <div class="relative z-10">
      <slot />
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
