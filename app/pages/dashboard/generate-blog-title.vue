<template>
  <div class="flex flex-col w-full h-full">
    <UPageHeader
    :ui="{root: 'border-none py-0 mb-4'}"
        title="Blog title generation"
        description="Discover compelling blog titles instantly with AI suggestions."
    />
    <div class="py-4 w-full max-w-full flex flex-col gap-y-2">
        <UCard>
            <UForm @submit="generateBlogTitle" :schema="schema" :state="state" class="space-y-4">
                <UFormField name="topic" label="Blog keyword">
                    <UInput v-model="state.keyword" class="w-full" />
                </UFormField>
                <UFormField name="length" label="Blog category">
                    <USelect v-model="state.category" :items="categoryItems" class="w-full" />
                </UFormField>
                <UButton type="submit" color="neutral">Submit</UButton>
            </UForm>
        </UCard>
        <UCard :ui="{body: 'min-h-[calc(100dvh-350px)]'}" class="flex-1 mt-5 overflow-y-auto">
            <div class="h-full" v-if="content">
                {{ content }}
            </div>
            <div v-else-if="isLoading && !content" class="flex flex-col justify-center items-center">Generating blog titles...</div>
        </UCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as z from 'zod';
import type {FormSubmitEvent} from '@nuxt/ui';

const schema = z.object({
    keyword: z.string('Invalid keyword').min(3, 'Invalid keyword'),
    category: z.string('Invalid category')
})

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
    keyword: "",
    category: "General"
})

definePageMeta({
    layout: 'dashboard'
})

const categoryItems = ref([
    "General", 'Technology', "Business", "Health", "Lifestyle", 'Education', "Travel", "Food"
])

const isLoading = ref(false)
const toast = useToast()
const content = ref("")

const generateBlogTitle = async (e: FormSubmitEvent<Schema>) => {
    try {
        if (isLoading.value === true) {
            return
        }
        isLoading.value = true

        const data = await $fetch('/api/ai-tools/generate-blog-title', {
            method: 'POST',
            body: {
                keyword: e.data.keyword,
                category: e.data.category
            }
        })

        if (data) {
            content.value = data
            state.keyword = ''
            state.category = 'General'
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