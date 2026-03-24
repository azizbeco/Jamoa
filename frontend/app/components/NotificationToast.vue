<script setup lang="ts">
const { notifications, removeNotification } = useNotifications()
</script>

<template>
  <div class="fixed bottom-10 right-10 z-[200] flex flex-col items-end gap-4 pointer-events-none">
    <TransitionGroup
      enter-active-class="transition duration-300 ease-out translate-y-10 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-4 opacity-0"
    >
      <div 
        v-for="n in notifications" 
        :key="n.id"
        class="pointer-events-auto bg-slate-950/80 backdrop-blur-xl border-l-4 p-6 rounded-2xl shadow-2xl flex items-center gap-6 min-w-[300px] border border-white/5 animate-shimmer"
        :class="n.type === 'error' ? 'border-l-red-600' : 'border-l-green-600'"
      >
        <div 
          class="w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-inner bg-black/40"
          :class="n.type === 'error' ? 'text-red-500' : 'text-green-500'"
        >
          {{ n.type === 'error' ? '⚡' : '✅' }}
        </div>
        
        <div class="flex-1">
          <h4 class="text-[10px] font-black uppercase text-slate-500 tracking-widest leading-none mb-1">{{ n.title || 'Intel Update' }}</h4>
          <p class="text-xs font-bold text-white uppercase italic tracking-tighter">{{ n.message }}</p>
        </div>

        <button @click="removeNotification(n.id)" class="text-slate-700 hover:text-white transition-colors text-lg">✕</button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
@keyframes shimmer {
  0% { box-shadow: 0 0 20px rgba(220, 38, 38, 0); }
  50% { box-shadow: 0 0 30px rgba(220, 38, 38, 0.1); }
  100% { box-shadow: 0 0 20px rgba(220, 38, 38, 0); }
}
.animate-shimmer {
  animation: shimmer 2s infinite ease-in-out;
}
</style>
