export default defineNuxtRouteMiddleware(async (to, from) => {
    const {session, fetchSession} = useAuth()

    if (!session.value) {
        await fetchSession()
    }

    if (!session.value && (to.path !== '/auth/login' && to.path !== '/auth/registration' && to.path !== '/')) {
        return navigateTo('/auth/login')
    }

    if (session.value && (to.path === '/auth/login' || to.path === '/auth/register')) {
        return navigateTo('/')
    }
})