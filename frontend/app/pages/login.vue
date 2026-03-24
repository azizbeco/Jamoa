<script setup lang="ts">
definePageMeta({
  layout: false
})

const mode = ref<'login' | 'signup'>('login')

const handleSwitch = () => {
  mode.value = mode.value === 'login' ? 'signup' : 'login'
}

const handleSuccess = () => {
  navigateTo('/')
}
</script>

<template>
  <div class="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
    <!-- Animated background elements -->
    <div class="absolute top-0 left-0 w-full h-full">
      <div class="absolute top-[10%] left-[5%] w-96 h-96 bg-red-600/5 rounded-full blur-[120px] animate-pulse"></div>
      <div class="absolute bottom-[10%] right-[5%] w-96 h-96 bg-red-900/10 rounded-full blur-[120px] animate-pulse" style="animation-delay: 2s"></div>
    </div>
    
    <AuthForm 
      :mode="mode" 
      @switch="handleSwitch" 
      @success="handleSuccess"
    />
  </div>
</template>
