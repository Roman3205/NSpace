import { openai } from "~~/server/utils/openai"

export default defineEventHandler(async (event) => {
    const {topic, category} = await readBody(event)

    if (!topic || !category) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Data not provided'
        })
    }

    const prompt = `Generate a blog title for the keyword ${topic} in the category ${category}`

    const response = await openai.chat.completions.create({
        model: "gemini-2.5-flash",
        messages: [{role: 'user', content: prompt}],
        temperature: 0.5,
    })

    return response.choices[0].message.content
})