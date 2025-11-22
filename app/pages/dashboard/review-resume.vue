<template>
  <div class="flex flex-col w-full h-full">
    <UPageHeader
    :ui="{root: 'border-none py-0 mb-4'}"
        title="Resume Reviewer"
        description="Enhance your resume with AI insights to boost your chances of getting hired."
    />
    <div class="py-4 w-full max-w-full flex flex-col gap-4">
        <UCard class="w-full min-h-[460px]">
            <UForm :schema="schema" :state="state" class="space-y-4 w-full flex flex-col" @submit="reviewResume">
                <UFormField name="resume" label="Resume file" description="PDF. 5MB Max.">
                    <UFileUpload v-model="state.resume" accept=".pdf" class="min-h-77" />
                </UFormField>

                <UButton type="submit" label="Submit" class="w-fit" color="primary" />
            </UForm>
        </UCard>
        <UCard :ui="{body: 'p-3 h-full'}" class="flex-1 w-full min-h-[460px]">
            <div class="min-h-96 overflow-y-auto" v-if="content">
                <MDC :value="content" />
            </div>
            <div v-else-if="isLoading && !content" class="flex flex-col justify-center items-center">Reviewing the resume...</div>
        </UCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as z from 'zod';
import type {FormSubmitEvent} from '@nuxt/ui';

const MAX_FILE_SIZE = 5*1024*1024;
const ACCEPTED_IMAGE_TYPES = ['application/pdf']

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

const schema = z.object({
  resume: z
    .instanceof(File, {
      message: 'Please select an image file.'
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `The image is too large. Please choose an image smaller than ${formatBytes(MAX_FILE_SIZE)}.`
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: 'Please upload a valid image file (PDF).'
    })
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
    resume: undefined
})

definePageMeta({
    layout: 'dashboard'
})

const isLoading = ref(false)
const toast = useToast()
const content = ref("")

watch(() => state.resume, (v) => {
  if (!v) content.value = ''
})

const reviewResume = async (e: FormSubmitEvent<Schema>) => {
    try {
        if (isLoading.value === true) {
            return
        }
        isLoading.value = true

        const formData = new FormData()
        if (e.data.resume instanceof File) {
          formData.append('resume', e.data.resume)
        }

        const data = await $fetch('/api/ai-tools/review-resume', {
            method: 'POST',
            body: formData
        })

        if (data) {
            content.value = data
            await refreshNuxtData('userCount')
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