<template>
  <div class="flex flex-col w-full h-full">
    <UPageHeader
    :ui="{root: 'border-none py-0 mb-4'}"
        title="Object Removal"
        description="Erase unwanted elements from your photos easily."
    />
    <div class="py-4 w-full max-w-full flex flex-col lg:flex-row gap-5">
        <UCard class="w-full lg:w-1/2 min-h-[460px]">
            <UForm :schema="schema" :state="state" class="space-y-4 w-full flex flex-col" @submit="removeObject">
                <UFormField name="object" label="Describe object to remove">
                    <UInput v-model="state.object" class="w-full" />
                </UFormField>
                <UFormField name="image" label="Image" description="JPG, GIF or PNG. 2MB Max.">
                    <UFileUpload v-model="state.image" accept="image/*" class="min-h-77" />
                </UFormField>

                <UButton type="submit" label="Submit" class="w-fit" color="primary" />
            </UForm>
        </UCard>
        <UCard :ui="{body: 'p-3 h-full'}" class="flex-1 w-full lg:w-1/2 min-h-[460px]">
            <div class="min-h-96 max-h-96" v-if="backImageUrl">
                <NuxtImg :src="backImageUrl" class="w-full h-full"/>
            </div>
            <div v-else-if="isLoading && !backImageUrl" class="flex flex-col justify-center items-center">Removing image object...</div>
        </UCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as z from 'zod';
import type {FormSubmitEvent} from '@nuxt/ui';
import {FetchError} from 'ofetch';

const MAX_FILE_SIZE = 2*1024*1024;
const MIN_DIMENSIONS = {width: 200, height: 200}
const MAX_DIMENSIONS = {width: 4096, height: 4096}
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

const schema = z.object({
  image: z
    .instanceof(File, {
      message: 'Please select an image file.'
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `The image is too large. Please choose an image smaller than ${formatBytes(MAX_FILE_SIZE)}.`
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: 'Please upload a valid image file (JPEG, PNG, or WebP).'
    })
    .refine(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = (e) => {
            const img = new Image()
            img.onload = () => {
              const meetsDimensions =
                img.width >= MIN_DIMENSIONS.width &&
                img.height >= MIN_DIMENSIONS.height &&
                img.width <= MAX_DIMENSIONS.width &&
                img.height <= MAX_DIMENSIONS.height
              resolve(meetsDimensions)
            }
            img.src = e.target?.result as string
          }
          reader.readAsDataURL(file)
        }),
      {
        message: `The image dimensions are invalid. Please upload an image between ${MIN_DIMENSIONS.width}x${MIN_DIMENSIONS.height} and ${MAX_DIMENSIONS.width}x${MAX_DIMENSIONS.height} pixels.`
      }
    ),
    object: z.string('Invalid object').min(3, 'Invalid object')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
    image: undefined,
    object: ""
})

definePageMeta({
    layout: 'dashboard'
})

const isLoading = ref(false)
const toast = useToast()
const backImageUrl = ref("")

watch(() => state.image, (v) => {
  if (!v) backImageUrl.value = ''
})

const removeObject = async (e: FormSubmitEvent<Schema>) => {
    try {
        if (isLoading.value === true) {
            return
        }
        isLoading.value = true

        const formData = new FormData()
        if (e.data.image instanceof File) {
          formData.append('image', e.data.image)
        }

        formData.append('object', e.data.object)
        const data = await $fetch('/api/cloudinary/remove-object', {
            method: 'POST',
            body: formData
        })

        if (data) {
            backImageUrl.value = data
            await refreshNuxtData('userData')
        }

    } catch (error) {
      const fetchError = error as FetchError
      toast.add({title: 'Error', description: fetchError.message, color: 'error'})

      errorActions(fetchError)
    } finally {
        isLoading.value = false
    }
}

</script>

<style>

</style>