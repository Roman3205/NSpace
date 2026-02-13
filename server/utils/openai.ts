import OpenAI from 'openai';

const {openaiApi} = useRuntimeConfig()

export const openai = new OpenAI({
    // baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    apiKey: openaiApi
})