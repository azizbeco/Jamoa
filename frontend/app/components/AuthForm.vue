<script setup lang="ts">
const props = defineProps<{
  mode: 'login' | 'signup'
}>()

const { login, signup } = useAuth()
const email = ref('')
const password = ref('')
const username = ref('')
const loading = ref(false)
const error = ref('')

const emit = defineEmits(['success', 'switch'])

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  
  let result
  if (props.mode === 'login') {
    result = await login(email.value, password.value)
  } else {
    result = await signup(username.value, email.value, password.value)
  }

  loading.value = false
  if (result.success) {
    emit('success')
  } else {
    // If it's a field error (like username/email), it might be an object
    if (typeof result.error === 'object') {
      error.value = Object.values(result.error).flat().join(' ')
    } else {
      error.value = result.error || "Operation Failed"
    }
  }
}
</script>

<template>
  <div class="min-h-[500px] w-full max-w-4xl bg-black/90 border-2 border-red-900/30 rounded-2xl overflow-hidden flex shadow-[0_0_50px_rgba(225,29,72,0.15)] flex-col md:flex-row">
    <!-- Left: Gaming Image -->
    <div class="md:w-1/2 relative group hidden md:block">
      <img 
        src="/images/auth-bg.png" 
        alt="Gamer Background" 
        class="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-transparent to-black/90 md:to-black"></div>
      <div class="absolute bottom-10 left-10 text-white z-10">
        <h2 class="text-3xl font-black uppercase tracking-tighter italic text-red-600 drop-shadow-lg">
          Join the Elite
        </h2>
        <p class="text-slate-400 font-medium">Jamoa Platform Gaming Community</p>
      </div>
    </div>

    <!-- Right: Form -->
    <div class="md:w-1/2 p-10 flex flex-col justify-center bg-black/40 backdrop-blur-sm relative overflow-hidden">
      <!-- Cyber Decoration -->
      <div class="absolute top-0 right-0 w-24 h-24 bg-red-600/5 rotate-45 transform translate-x-12 -translate-y-12"></div>
      
      <div class="space-y-6 relative z-10">
        <div class="space-y-2">
          <h3 class="text-2xl font-bold uppercase tracking-widest text-white border-l-4 border-red-600 pl-4">
            {{ mode === 'login' ? 'Login Account' : 'Create Account' }}
          </h3>
          <p class="text-slate-500 text-sm uppercase tracking-tighter">Welcome back, Soldier</p>
        </div>

        <div v-if="error" class="bg-red-600/10 border border-red-600/50 p-3 rounded text-red-500 text-xs font-bold uppercase animate-shake">
          {{ error }}
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div v-if="mode === 'signup'" class="space-y-1">
            <label class="text-[10px] uppercase font-bold text-red-500/80 tracking-widest">Username</label>
            <input 
              v-model="username"
              type="text" 
              placeholder="Gamer_ID"
              class="w-full bg-slate-900/50 border border-red-900/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/20 transition-all font-mono placeholder:text-slate-700"
              required
            />
          </div>

          <div class="space-y-1">
            <label class="text-[10px] uppercase font-bold text-red-500/80 tracking-widest">
              {{ mode === 'login' ? 'Username or Email' : 'Email Address' }}
            </label>
            <input 
              v-model="email"
              :type="mode === 'login' ? 'text' : 'email'" 
              :placeholder="mode === 'login' ? 'Gamer_ID / warrior@jamoa.com' : 'warrior@jamoa.com'"
              class="w-full bg-slate-900/50 border border-red-900/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/20 transition-all font-mono placeholder:text-slate-700"
              required
            />
          </div>

          <div class="space-y-1">
            <label class="text-[10px] uppercase font-bold text-red-500/80 tracking-widest">Password</label>
            <input 
              v-model="password"
              type="password" 
              placeholder="••••••••"
              class="w-full bg-slate-900/50 border border-red-900/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/20 transition-all font-mono placeholder:text-slate-700"
              required
            />
          </div>

          <div class="flex items-center justify-between text-[11px] text-slate-500 py-1">
            <label class="flex items-center cursor-pointer hover:text-red-400 transition-colors">
              <input type="checkbox" class="mr-2 accent-red-600" /> Remember Me
            </label>
            <a href="#" class="hover:text-red-500 transition-colors">Forgot Password?</a>
          </div>

          <div class="pt-4 space-y-3">
            <button 
              type="submit"
              :disabled="loading"
              class="w-full bg-red-600 hover:bg-red-700 text-white font-black uppercase py-3 rounded-lg shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] transition-all transform active:scale-[0.98] disabled:opacity-50"
            >
              {{ loading ? 'Processing...' : (mode === 'login' ? 'Login' : 'Sign Up') }}
            </button>
            <button 
              type="button"
              @click="$emit('switch')"
              class="w-full bg-transparent border border-red-600/50 hover:border-red-600 text-red-600 hover:text-white hover:bg-red-600/10 font-bold uppercase py-3 rounded-lg transition-all"
            >
              {{ mode === 'login' ? 'Create New Account' : 'Back to Login' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
input {
  clip-path: polygon(5px 0%, 100% 0%, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0% 100%, 0% 5px);
}
button {
  clip-path: polygon(10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 10px);
}

.animate-shake {
  animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}
</style>
