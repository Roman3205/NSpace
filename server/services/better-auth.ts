import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "~~/server/utils/prisma";

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
    }
})