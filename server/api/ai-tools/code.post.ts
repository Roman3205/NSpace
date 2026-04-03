import { incrementApiLimit } from "~~/server/services/user-api-limit"
import { openai } from "~~/server/utils/openai"
import { validateUserStatus } from "~~/server/utils/user-status"

export default defineEventHandler(async (event) => {
    const {messages} = await readBody(event)

    if (!messages || messages.length < 1) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Data not provided'
        })
    }

    const userStatus = await validateUserStatus(event.context.user.id)

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{role: "system", content: "You are a code generator. You must answer only in markdown code snippets."}, ...messages],
        temperature: 0.5
    })

    if (!userStatus.isPro) {
        await incrementApiLimit(event.context.user.id)
    }
    return response.choices[0].message.content
})