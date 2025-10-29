<template>
  <UContainer class="flex items-center justify-center sm:p-4 sm:min-w-160">
    <UCard class="w-full max-w-md">
      <template v-slot:header>
        <div class="text-center p-4">
          <h1 class="text-xl font-semibold">
            Log in to your account
          </h1>
        </div>
      </template>
      <div class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <UButton @click="signIn.social({provider: 'google', callbackURL: '/'})" color="neutral" variant="outline" icon="material-icon-theme:google" class="justify-center" :loading="false" :disabled="false">Google</UButton>
          <UButton @click="signIn.social({provider: 'github', callbackURL: '/'})" color="neutral" variant="outline" icon="qlementine-icons:github-16" class="justify-center" :loading="false" :disabled="false">Github</UButton>
        </div>
        <USeparator label="Or" />
        <UForm class="space-y-4" @submit="handleFormSignIn" :state="state" :schema="schema">
          <UFormField label="Email" autocomplete="email" name="email" required>
            <UInput v-model="state.email" placeholder="Your email" class="w-full" />
          </UFormField>
          <UFormField label="Password" name="password" required>
            <UInput v-model="state.password" placeholder="Your password" class="w-full" />
          </UFormField>
          <UButton block type="submit" color="primary">Sign In</UButton>
        </UForm>
        <div class="text-center text-sm">
          Dont have an account?
          <UButton variant="link" color="primary" :disabled="false" to="/auth/registration" class="-ml-2">
            Sign up
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
  email: z.email('Invalid email address'),
  password: z.string('Invalid password'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
})

const {signIn} = useAuth()
const toast = useToast()

const handleFormSignIn = async (e: FormSubmitEvent<Schema>) => {
  try {
    const {error} = await signIn.email({
      email: e.data.email,
      password: e.data.password,
      callbackURL: '/'
    })

    if (error) {
      toast.add({title: 'Error', description: error.message, color: 'error'})
    }

  } catch (error) {
    console.log(error)
  }
}

</script>

<style>

</style>