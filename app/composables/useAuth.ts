import { createAuthClient } from "better-auth/vue"
import type { RouteLocationRaw } from 'vue-router';
import {polarClient} from '@polar-sh/better-auth'

export function useAuth() {
    const authClient = createAuthClient({
        baseURL: "http://localhost:3007",
        plugins: [
            polarClient()
        ]
    })

    const logout = async ({redirectTo}: {redirectTo?: RouteLocationRaw } = {}) => {
        await authClient.signOut()
        if(redirectTo) {
            await navigateTo(redirectTo)
        }
    }

    const upgradeUserToPro = async () => {
        await authClient.checkout({
            slug: 'pro-monthly'
        })
    }

    return {
        signIn: authClient.signIn,
        signUp: authClient.signUp,
        upgradeUserToPro,
        signOut: logout
    }
}