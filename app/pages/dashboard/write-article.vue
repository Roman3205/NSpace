<template>
  <div class="flex flex-col w-full h-full">
    <UPageHeader
    :ui="{root: 'border-none py-0 mb-4'}"
        title="AI Article Writer"
        description="Craft well-structured and engaging articles on any subject."
    />
    <div class="py-4 w-full max-w-full flex flex-col gap-y-2">
        <UCard>
            <UForm @submit="generateArticle" :schema="schema" :state="state" class="space-y-4">
                <UFormField name="topic" label="Article topic">
                    <UInput v-model="state.topic" class="w-full" />
                </UFormField>
                <UFormField name="length" label="Article length">
                    <USelect v-model="state.length" :items="articleItems" class="w-full" />
                </UFormField>
                <UButton type="submit" color="neutral">Submit</UButton>
            </UForm>
        </UCard>
        <UCard :ui="{body: 'min-h-[calc(100dvh-350px)]'}" class="flex-1 mt-5 overflow-y-auto">
            <div class="h-full" v-if="content">
                {{ content }}
            </div>
            <div v-else-if="isLoading && !content" class="flex flex-col justify-center items-center">Generating article...</div>
        </UCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as z from 'zod';
import type {FormSubmitEvent} from '@nuxt/ui';

const schema = z.object({
    topic: z.string('Invalid topic').min(3, 'Invalid topic'),
    length: z.number('Invalid length')
})

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
    topic: "",
    length: 500
})

definePageMeta({
    layout: 'dashboard'
})

const articleItems = ref([
    {
        label: 'Short (500-800 words)',
        value: 500
    },
    {
        label: 'Medium (800-1200 words)',
        value: 1200
    },
    {
        label: 'Long (1200+ words)',
        value: 1600
    }
])

const isLoading = ref(false)
const toast = useToast()
const content = ref("")

const generateArticle = async (e: FormSubmitEvent<Schema>) => {
    try {
        if (isLoading.value === true) {
            return
        }
        isLoading.value = true

        const data = await $fetch('/api/ai-tools/generate-article', {
            method: 'POST',
            body: {
                topic: e.data.topic,
                length: e.data.length
            }
        })

        if (data) {
            content.value = data
            state.length = 500
            state.topic = ''
        }

    } catch (error) {
        toast.add({title: 'Error', description: error.message, color: 'error'})
    } finally {
        isLoading.value = false
    }
}

</script>

<style>

</style>