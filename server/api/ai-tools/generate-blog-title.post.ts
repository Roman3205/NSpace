import { openai } from "~~/server/utils/openai"
import { incrementApiLimit } from "~~/server/services/user-api-limit"
import { validateUserStatus } from "~~/server/utils/user-status"

export default defineEventHandler(async (event) => {
    const {keyword, category} = await readBody(event)

    if (!keyword || !category) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Data not provided'
        })
    }

    const userStatus = await validateUserStatus(event.context.user.id)

    const prompt = `Generate a blog title for the keyword ${keyword} in the category ${category}`

    const response = await openai.chat.completions.create({
        model: "gemini-2.5-flash",
        messages: [{role: 'user', content: prompt}],
        temperature: 0.5,
    })

    if (!userStatus.isPro) {
        await incrementApiLimit(event.context.user.id)
    }
    return response.choices[0].message.content
})