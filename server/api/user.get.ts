import { getUserApiLimit } from "~~/server/services/user-api-limit"

export default defineEventHandler(async (event) => {
    const userApiLimitCount = await getUserApiLimit(event.context.user.id)

    return userApiLimitCount
})