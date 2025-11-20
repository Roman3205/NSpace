import { openai } from "~~/server/utils/openai"
import {getDocumentProxy, extractText} from 'unpdf'

export default defineEventHandler(async (event) => {
    const formData = await readFormData(event)
    const file = formData.get('resume') as File

    if (!file) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Data not provided'
        })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const pdf = await getDocumentProxy(new Uint8Array(buffer))
    const {text} = await extractText(pdf, {mergePages: true})
    console.log(text)

    const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement. Resume content: \n\n${text}`

    const response = await openai.chat.completions.create({
        model: "gemini-2.5-flash",
        messages: [{role: 'user', content: prompt}],
        temperature: 0.5,
        // max_completion_tokens: 500
    })

    return response.choices[0].message.content
})