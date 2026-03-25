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
  <div class="mt-6 pt-6" style="border-top: 1px solid rgba(220,38,38,0.12);">
    <div class="flex items-center gap-8">
      <!-- Like Button -->
      <button
        @click="handleLike"
        class="flex items-center gap-2 group/like transition-all"
        :class="isLiked ? 'text-red-400' : 'text-slate-500 hover:text-red-400'"
      >
        <div class="relative">
           <span class="text-xl transition-transform duration-300 inline-block"
                 :class="{ 'scale-150 animate-pulse': liking, 'scale-110': isLiked }">
             {{ isLiked ? '❤️' : '🤍' }}
           </span>
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

    <!-- Comments Section -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="showComments" class="mt-6 space-y-5">
        <!-- New Comment Input -->
        <div v-if="isAuthenticated" class="flex gap-3">
           <input
            v-model="newComment"
            @keyup.enter="submitComment"
            placeholder="ADD INTEL..."
            class="flex-1 rounded-xl px-4 py-2.5 text-xs font-bold text-white focus:outline-none transition-all placeholder:text-slate-700"
            style="background: #08081a; border: 1px solid rgba(255,255,255,0.08);"
            onfocus="this.style.borderColor='rgba(220,38,38,0.5)'"
            onblur="this.style.borderColor='rgba(255,255,255,0.08)'"
           >
           <button
            @click="submitComment"
            :disabled="loading || !newComment.trim()"
            class="text-white px-6 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all disabled:opacity-40"
            style="background: #dc2626;"
            onmouseenter="if(!this.disabled) this.style.background='#b91c1c'"
            onmouseleave="if(!this.disabled) this.style.background='#dc2626'"
           >
             Post
           </button>
        </div>

        <!-- Comments List -->
        <div class="space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
           <div v-for="c in comments" :key="c.id" class="p-4 rounded-xl transition-all"
                style="background: #0d0d1a; border: 1px solid rgba(255,255,255,0.07);"
                onmouseenter="this.style.borderColor='rgba(255,255,255,0.12)'"
                onmouseleave="this.style.borderColor='rgba(255,255,255,0.07)'">
              <div class="flex justify-between items-start mb-2">
                 <span class="text-[10px] font-black text-red-400 uppercase tracking-tighter">@{{ c.author.username }}</span>
                 <span class="text-[8px] text-slate-600 font-bold uppercase tracking-widest">{{ new Date(c.created_at).toLocaleDateString() }}</span>
              </div>
              <p class="text-xs text-slate-300 font-medium leading-relaxed">{{ c.text }}</p>
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
  background: rgba(0,0,0,0.3);
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(220,38,38,0.3);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(220,38,38,0.6);
}
</style>
