import { openai } from "~~/server/utils/openai"

export default defineEventHandler(async (event) => {
    const {topic, length} = await readBody(event)

    if (!topic) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Data not provided'
        })
    }

    const prompt = `Write an article about ${topic} in ${length ? length : 500}`

    const response = await openai.chat.completions.create({
        model: "gemini-2.5-flash",
        messages: [{role: 'user', content: prompt}],
        temperature: 0.5,
        // max_completion_tokens: 500
    })

    return response.choices[0].message.content
})