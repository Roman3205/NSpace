import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

const {tursoDatabaseUrl, tursoAuthToken, public: {appEnv}} = useRuntimeConfig()

const adapter = new PrismaLibSQL({
    url: tursoDatabaseUrl,
    authToken: appEnv == 'development' ? undefined : tursoAuthToken
})

export const prisma = new PrismaClient({adapter: adapter})