import { openai } from "~~/server/utils/openai"
import { incrementApiLimit } from "~~/server/services/user-api-limit"
import { validateUserStatus } from "~~/server/utils/user-status"

export default defineEventHandler(async (event) => {
    const {topic, length} = await readBody(event)

    if (!topic) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Data not provided'
        })
    }

    const userStatus = await validateUserStatus(event.context.user.id)

    const prompt = `Write an article about ${topic} in ${length ? length : 500}`

    const response = await openai.chat.completions.create({
        model: "gemini-2.5-flash",
        messages: [{role: 'user', content: prompt}],
        temperature: 0.5,
        // max_completion_tokens: 500
    })

    if (!userStatus.isPro) {
        await incrementApiLimit(event.context.user.id)
    }
    return response.choices[0].message.content
})