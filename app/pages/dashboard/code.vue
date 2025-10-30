<template>
  <div class="flex flex-col w-full h-full">
    <UPageHeader
    :ui="{root: 'border-none py-0 mb-4'}"
        title="Code Generation"
        description="Generate code using description text."
    />
    <UCard variant="subtle" class="flex-1 overflow-y-auto space-y-4 px-4 py-2">
        <div class="flex flex-col gap-y-4">
            <div v-for="(message,index) in messages" :key="index" :class="[message.role == 'user' ? 'justify-end' : 'justify-start']" class="flex items-start space-x-2">
                <UButton size="sm" variant="soft" class="rounded-full" :icon="message.role == 'user' ? 'lucide:user' : 'lucide:bot'" :color="message.role == 'user' ? 'primary' : 'success'" />
                <UCard :ui="{body: 'p-3'}">
                    <div class="text-sm max-w-prose">
                        <!-- <MDC :value="message.content"></MDC> -->
                         {{ message.content }}
                    </div>
                </UCard>
            </div>
        </div>
    </UCard>
    <div class="py-4">
        <UForm @submit="sendPrompt" :state="state" :schema="schema" class="flex space-x-2 w-full">
            <UFormField class="flex-1 -mb-1.5" name="prompt">
                <UTextarea v-model="state.prompt" :rows="1" class="w-full"></UTextarea>
            </UFormField>
            <UButton type="submit" icon="lucide:arrow-up" color="neutral" :loading="isLoading"></UButton>
        </UForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as z from 'zod';
import type {FormSubmitEvent} from '@nuxt/ui';

const schema = z.object({
    prompt: z.string('Invalid prompt').min(1, 'Invalid prompt')
})

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
    prompt: ""
})

definePageMeta({
    layout: 'dashboard'
})

type Message = {
    role: 'user' | 'system',
    content: string
}

const messages = ref<Message[]>([

])

const isLoading = ref(false)
const toast = useToast()

const sendPrompt = async (e: FormSubmitEvent<Schema>) => {
    try {
        if (isLoading.value === true) {
            return
        }
        isLoading.value = true
        messages.value.push({
            role: 'user',
            content: e.data.prompt.trim()
        })

        const data = await $fetch('/api/ai-tools/code', {
            method: 'POST',
            body: {
                messages: messages.value
            }
        })

        if (data) {
            messages.value.push({
                role: 'system',
                content: data
            })
        }

        state.prompt = ''
    } catch (error) {
        toast.add({title: 'Error', description: error.message, color: 'error'})
    } finally {
        isLoading.value = false
    }
}

</script>

<style>

</style>