import { openai } from "~~/server/utils/openai"

export default defineEventHandler(async (event) => {
    const {messages} = await readBody(event)

    if (!messages || messages.length < 1) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Data not provided'
        })
    }

    const response = await openai.chat.completions.create({
        model: "gemini-2.5-flash",
        messages: [{role: "system", content: "You are a code generator. You must answer only in markdown code snippets."}, ...messages],
        temperature: 0.5
    })

    return response.choices[0].message.content
})