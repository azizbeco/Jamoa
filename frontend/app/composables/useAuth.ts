export const useAuth = () => {
    const token = useCookie('auth_token')
    const user = useState('user', () => null)
    const config = useRuntimeConfig()

    const login = async (email, password) => {
        try {
            const { data, error } = await useFetch(`${config.public.apiBase}/token/`, {
                method: 'POST',
                body: { username: email, password } // Django SimpleJWT uses username field by default
            })

            if (error.value) throw new Error(error.value.data?.detail || 'Login failed')

            token.value = data.value.access
            user.value = { username: email } // Simplified
            return { success: true }
        } catch (err) {
            return { success: false, error: err.message }
        }
    }

    const signup = async (username, email, password) => {
        try {
            const { data, error } = await useFetch(`${config.public.apiBase}/register/`, {
                method: 'POST',
                body: { username, email, password }
            })

            if (error.value) throw new Error(error.value.data?.error || 'Signup failed')

            token.value = data.value.access
            user.value = { username: data.value.username }
            return { success: true }
        } catch (err) {
            return { success: false, error: err.message }
        }
    }

    const logout = () => {
        token.value = null
        user.value = null
        navigateTo('/login')
    }

    return {
        token,
        user,
        login,
        signup,
        logout,
        isAuthenticated: computed(() => !!token.value)
    }
}
