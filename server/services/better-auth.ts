import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "~~/server/utils/prisma";
import type { H3Event } from 'h3';

const {googleClientId, googleClientSecret, githubClientId, githubClientSecret} = useRuntimeConfig()

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: 'sqlite'
    }),
    emailAndPassword: {
        enabled: true
    },
    socialProviders: {
        github: {
            clientId: githubClientId as string,
            clientSecret: githubClientSecret as string
        },
        google: { 
            clientId: googleClientId as string, 
            clientSecret: googleClientSecret as string, 
        }, 
    },
    account: {
        accountLinking: {
            enabled: true
        }
    },
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60
        }
    }
})

export const getAuthSession = async (event: H3Event) => {
    const headers = event.headers
    const session = await auth.api.getSession({
        headers
    })

    return session
}

export const requireAuth = async (event: H3Event) => {
    const session = await getAuthSession(event)
    if (!session) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        })
    }
    event.context.user = session
}