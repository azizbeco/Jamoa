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
    if (typeof result.error === 'object') {
      error.value = Object.values(result.error).flat().join(' ')
    } else {
      error.value = result.error || "Operation Failed"
    }
  }
}
</script>

<template>
  <div class="min-h-[520px] w-full max-w-4xl rounded-2xl overflow-hidden flex flex-col md:flex-row"
       style="background: #08080f; border: 1px solid rgba(220,38,38,0.35); box-shadow: 0 0 80px rgba(220,38,38,0.12), 0 0 200px rgba(220,38,38,0.04);">

    <!-- Left: Gaming Image -->
    <div class="md:w-1/2 relative group hidden md:block">
      <img
        src="/images/auth-bg.png"
        alt="Gamer Background"
        class="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
      />
      <div class="absolute inset-0" style="background: linear-gradient(to right, transparent 30%, #08080f);"></div>
      <div class="absolute bottom-10 left-10 text-white z-10">
        <h2 class="text-3xl font-black uppercase tracking-tighter italic text-red-500 drop-shadow-lg">
          Join the Elite
        </h2>
        <p class="text-slate-400 font-medium mt-1">Jamoa Platform Gaming Community</p>
      </div>
    </div>

    <!-- Right: Form -->
    <div class="md:w-1/2 p-10 flex flex-col justify-center relative overflow-hidden" style="background: rgba(10,10,20,0.98);">
      <!-- Decorative corner shape -->
      <div class="absolute top-0 right-0 w-28 h-28 opacity-10" style="background: radial-gradient(circle at top right, rgba(220,38,38,0.6), transparent 70%);"></div>

      <div class="space-y-6 relative z-10">
        <div class="space-y-2">
          <h3 class="text-2xl font-black uppercase tracking-widest text-white pl-4" style="border-left: 4px solid #dc2626;">
            {{ mode === 'login' ? 'Login Account' : 'Create Account' }}
          </h3>
          <p class="text-slate-500 text-sm uppercase tracking-tighter">Welcome back, Soldier</p>
        </div>

        <div v-if="error" class="p-3 rounded text-red-400 text-xs font-bold uppercase animate-shake" style="background: rgba(220,38,38,0.1); border: 1px solid rgba(220,38,38,0.4);">
          {{ error }}
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div v-if="mode === 'signup'" class="space-y-1">
            <label class="text-[10px] uppercase font-bold text-red-400/90 tracking-widest">Username</label>
            <input
              v-model="username"
              type="text"
              placeholder="Gamer_ID"
              class="w-full rounded-lg py-3 px-4 text-white focus:outline-none transition-all font-mono placeholder:text-slate-700"
              style="background: #0a0a16; border: 1px solid rgba(220,38,38,0.25);"
              onfocus="this.style.borderColor='rgba(220,38,38,0.6)'; this.style.boxShadow='0 0 15px rgba(220,38,38,0.1)'"
              onblur="this.style.borderColor='rgba(220,38,38,0.25)'; this.style.boxShadow='none'"
              required
            />
          </div>

          <div class="space-y-1">
            <label class="text-[10px] uppercase font-bold text-red-400/90 tracking-widest">
              {{ mode === 'login' ? 'Username or Email' : 'Email Address' }}
            </label>
            <input
              v-model="email"
              :type="mode === 'login' ? 'text' : 'email'"
              :placeholder="mode === 'login' ? 'Gamer_ID / warrior@jamoa.com' : 'warrior@jamoa.com'"
              class="w-full rounded-lg py-3 px-4 text-white focus:outline-none transition-all font-mono placeholder:text-slate-700"
              style="background: #0a0a16; border: 1px solid rgba(220,38,38,0.25);"
              onfocus="this.style.borderColor='rgba(220,38,38,0.6)'; this.style.boxShadow='0 0 15px rgba(220,38,38,0.1)'"
              onblur="this.style.borderColor='rgba(220,38,38,0.25)'; this.style.boxShadow='none'"
              required
            />
          </div>

          <div class="space-y-1">
            <label class="text-[10px] uppercase font-bold text-red-400/90 tracking-widest">Password</label>
            <input
              v-model="password"
              type="password"
              placeholder="••••••••"
              class="w-full rounded-lg py-3 px-4 text-white focus:outline-none transition-all font-mono placeholder:text-slate-700"
              style="background: #0a0a16; border: 1px solid rgba(220,38,38,0.25);"
              onfocus="this.style.borderColor='rgba(220,38,38,0.6)'; this.style.boxShadow='0 0 15px rgba(220,38,38,0.1)'"
              onblur="this.style.borderColor='rgba(220,38,38,0.25)'; this.style.boxShadow='none'"
              required
            />
          </div>

          <div class="flex items-center justify-between text-[11px] text-slate-500 py-1">
            <label class="flex items-center cursor-pointer hover:text-red-400 transition-colors">
              <input type="checkbox" class="mr-2 accent-red-600" /> Remember Me
            </label>
            <a href="#" class="hover:text-red-400 transition-colors">Forgot Password?</a>
          </div>

          <div class="pt-4 space-y-3">
            <button
              type="submit"
              :disabled="loading"
              class="w-full text-white font-black uppercase py-3.5 rounded-lg transition-all transform active:scale-[0.98] disabled:opacity-50"
              style="background: #dc2626; box-shadow: 0 0 25px rgba(220,38,38,0.35);"
              onmouseenter="if(!this.disabled) { this.style.background='#b91c1c'; this.style.boxShadow='0 0 40px rgba(220,38,38,0.55)'; }"
              onmouseleave="if(!this.disabled) { this.style.background='#dc2626'; this.style.boxShadow='0 0 25px rgba(220,38,38,0.35)'; }"
            >
              {{ loading ? 'Processing...' : (mode === 'login' ? 'Login' : 'Sign Up') }}
            </button>
            <button
              type="button"
              @click="$emit('switch')"
              class="w-full bg-transparent font-bold uppercase py-3.5 rounded-lg transition-all text-red-500 hover:text-white"
              style="border: 1px solid rgba(220,38,38,0.4);"
              onmouseenter="this.style.background='rgba(220,38,38,0.1)'; this.style.borderColor='rgba(220,38,38,0.7)'"
              onmouseleave="this.style.background='transparent'; this.style.borderColor='rgba(220,38,38,0.4)'"
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
