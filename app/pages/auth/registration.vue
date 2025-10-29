<template>
  <UContainer class="flex items-center justify-center sm:p-4 sm:min-w-160">
    <UCard class="w-full max-w-md">
      <template v-slot:header>
        <div class="text-center p-4">
          <h1 class="text-xl font-semibold">
            Create your account
          </h1>
        </div>
      </template>
      <div class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <UButton @click="signIn.social({provider: 'google', callbackURL: '/'})" color="neutral" variant="outline" icon="material-icon-theme:google" class="justify-center" :loading="false" :disabled="false">Google</UButton>
          <UButton @click="signIn.social({provider: 'github', callbackURL: '/'})" color="neutral" variant="outline" icon="qlementine-icons:github-16" class="justify-center" :loading="false" :disabled="false">Github</UButton>
        </div>
        <USeparator label="Or" />
        <UForm class="space-y-4" @submit="handleFormSignUp" :state="state" :schema="schema">
          <UFormField label="Name" name="name" required>
            <UInput v-model="state.name" placeholder="Your name" class="w-full" />
          </UFormField>
          <UFormField label="Email" autocomplete="email" name="email" required>
            <UInput v-model="state.email" placeholder="Your email" class="w-full" />
          </UFormField>
          <UFormField label="Password" name="password" required>
            <UInput v-model="state.password" placeholder="Your password" class="w-full" />
          </UFormField>
          <UFormField label="Confirm Password" name="confirmPassword" required>
            <UInput v-model="state.confirmPassword" placeholder="Confirm your password" class="w-full" />
          </UFormField>
          <UButton block type="submit" color="primary">Create account</UButton>
        </UForm>
        <div class="text-center text-sm">
          Already have an account?
          <UButton variant="link" color="primary" :disabled="false" to="/auth/login" class="-ml-2">
            Sign in
          </UButton>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>

<script lang="ts" setup>
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui';
import { useAuth } from '~/composables/useAuth';

const schema = z.object({
  name: z.string('Invalid name').trim().min(5, 'You must have at least 5 characters'),
  email: z.email('Invalid email address'),
  password: z.string('Invalid password').min(8, 'You must have at least 8 characters'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords dont match',
  path: ['confirmPassword']
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: undefined,
  email: undefined,
  password: undefined,
  confirmPassword: undefined
})

const {signUp, signIn} = useAuth()
const toast = useToast()

const handleFormSignUp = async (e: FormSubmitEvent<Schema>) => {
  try {
    const {error} = await signUp.email({
      email: e.data.email,
      password: e.data.password,
      name: e.data.name,
    })

    if (error) {
      return toast.add({title: 'Error', description: error.message, color: 'error'})
    }

    return navigateTo('/')
  } catch (error) {
    console.log(error)
  }
}

</script>

<style>

</style>