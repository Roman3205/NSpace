import OpenAI from 'openai';

const {geminiApi} = useRuntimeConfig()

export const openai = new OpenAI({
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    apiKey: geminiApi
})