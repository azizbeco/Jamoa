<script setup lang="ts">
const props = defineProps<{
  post: any
}>()

const config = useRuntimeConfig()
const { token, isAuthenticated } = useAuth()

const isLiked = ref(props.post.is_liked)
const likesCount = ref(props.post.likes_count || 0)
const commentsCount = ref(props.post.comments_count || 0)
const showComments = ref(false)
const comments = ref<any[]>([])
const newComment = ref('')
const loading = ref(false)
const liking = ref(false)

const handleLike = async () => {
  if (!isAuthenticated.value) return navigateTo('/auth')
  if (liking.value) return
  
  liking.value = true
  try {
    const { data } = await useFetch(`${config.public.apiBase}/posts/${props.post.id}/like/`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` }
    })
    
    if (data.value) {
      isLiked.value = data.value.status === 'liked'
      likesCount.value = data.value.likes_count
    }
  } catch (err) {
    console.error('Like failed')
  } finally {
    liking.value = false
  }
}

const toggleComments = async () => {
  showComments.value = !showComments.value
  if (showComments.value && comments.value.length === 0) {
    await fetchComments()
  }
}

const fetchComments = async () => {
  const { data } = await useFetch(`${config.public.apiBase}/posts/${props.post.id}/comments/`)
  if (data.value) {
    comments.value = data.value
  }
}

const submitComment = async () => {
  if (!newComment.value.trim() || loading.value) return
  if (!isAuthenticated.value) return navigateTo('/auth')

  loading.value = true
  try {
    const { data } = await useFetch(`${config.public.apiBase}/posts/${props.post.id}/comment/`, {
      method: 'POST',
      headers: { 
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      body: { text: newComment.value }
    })
    
    if (data.value) {
      newComment.value = ''
      commentsCount.value = data.value.comments_count
      await fetchComments()
    }
  } catch (err) {
    console.error('Comment failed')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="mt-6 border-t border-red-900/10 pt-6">
    <div class="flex items-center gap-8">
      <!-- Like Button -->
      <button 
        @click="handleLike" 
        class="flex items-center gap-2 group/like transition-all"
        :class="isLiked ? 'text-red-500' : 'text-slate-500 hover:text-red-400'"
      >
        <div class="relative">
           <span class="text-xl transition-transform duration-300 inline-block" 
                 :class="{ 'scale-150 animate-pulse': liking, 'scale-110': isLiked }">
             {{ isLiked ? '❤️' : '🤍' }}
           </span>
           <!-- Particle Effects Placeholder -->
           <div v-if="isLiked" class="absolute inset-0 animate-ping opacity-20 bg-red-600 rounded-full scale-150"></div>
        </div>
        <span class="text-[10px] font-black uppercase tracking-widest">{{ likesCount }} Likes</span>
      </button>

      <!-- Comment Toggle -->
      <button 
        @click="toggleComments"
        class="flex items-center gap-2 text-slate-500 hover:text-white transition-all group/comm"
      >
        <span class="text-lg group-hover/comm:rotate-12 transition-transform">💬</span>
        <span class="text-[10px] font-black uppercase tracking-widest">{{ commentsCount }} Comments</span>
      </button>
    </div>

    <!-- Collapsible Comments Section -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="max-h-0 opacity-0 overflow-hidden"
      enter-to-class="max-h-[500px] opacity-100 overflow-hidden"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="max-h-[500px] opacity-100 overflow-hidden"
      leave-to-class="max-h-0 opacity-0 overflow-hidden"
    >
      <div v-if="showComments" class="mt-8 space-y-6">
        <!-- New Comment Input -->
        <div v-if="isAuthenticated" class="flex gap-4">
           <input 
            v-model="newComment" 
            @keyup.enter="submitComment"
            placeholder="ADD INTEL..." 
            class="flex-1 bg-black/40 border border-slate-900 rounded-xl px-4 py-2 text-xs font-bold text-white focus:outline-none focus:border-red-600/50 transition-all"
           >
           <button 
            @click="submitComment"
            :disabled="loading || !newComment.trim()"
            class="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-6 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all"
           >
             Post
           </button>
        </div>

        <!-- Comments List -->
        <div class="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
           <div v-for="c in comments" :key="c.id" class="p-4 bg-slate-900/30 rounded-2xl border border-white/5 group/c">
              <div class="flex justify-between items-start mb-2">
                 <span class="text-[10px] font-black text-red-500 uppercase tracking-tighter">@{{ c.author.username }}</span>
                 <span class="text-[8px] text-slate-600 font-bold uppercase tracking-widest">{{ new Date(c.created_at).toLocaleDateString() }}</span>
              </div>
              <p class="text-xs text-slate-400 font-medium leading-relaxed">{{ c.text }}</p>
           </div>
           
           <div v-if="comments.length === 0" class="py-10 text-center text-slate-700 font-black uppercase tracking-widest text-[10px]">
             No communication history found.
           </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(220, 38, 38, 0.2);
  border-radius: 10px;
}
</style>
