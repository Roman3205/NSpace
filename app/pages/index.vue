<template>
  <UContainer class="flex flex-col w-full h-full">
    <UPageHero
      title="Comprehensive AI Tools for Every Need"
      description="Unlock the full potential of AI with our suite of powerful tools designed to enhance your creativity and productivity."
      :links="links"
      :ui="{root: 'mb-6 md:mb-10'}"
    >
    <div class="justify-center flex flex-wrap items-center gap-4">
      <UAvatarGroup>
        <UAvatar src="https://github.com/JohnDoe.png" name="John Doe" />
        <UAvatar src="https://i.pravatar.cc/150?img=2" name="Jane Smith" />
        <UAvatar src="https://i.pravatar.cc/150?img=3" name="Alice Johnson" />
        <UAvatar src="https://i.pravatar.cc/150?img=4" name="Bob Brown" />
        <UAvatar src="https://i.pravatar.cc/150?img=5" name="Charlie Davis" />
      </UAvatarGroup>
      <span class="text-sm text-muted-foreground">Join 1,000+ users leveraging AI for their projects</span>
    </div>
    </UPageHero>
    <div class="flex flex-col mb-16 sm:mb-28">
      <div class="flex flex-col gap-4 justify-center mb-10 sm:mb-16">
        <h2 class="text-3xl font-bold text-center">Explore Our AI Tools</h2>
        <p class="text-muted font-light text-sm md:text-lg text-center">Discover a variety of AI tools designed to enhance your productivity and creativity.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <UCard v-for="tool in aiTools" :key="tool.path" :to="tool.path" class="h-full shadow-md hover:shadow-lg transition">
              <UIcon :name="tool.icon" size="md" />  
              <span class="font-semibold">
                {{ tool.title }}
              </span>
              <p class="text-sm text-muted-foreground">
                {{ tool.description }}
              </p>
              <UButton icon="i-lucide-arrow-right" color="primary" variant="subtle" class="mt-4">
                {{ tool.btnText }}
              </UButton>
            </UCard>
        </div>
    </div>
    <div class="flex flex-col mb-16 sm:mb-28">
        <div class="flex flex-col gap-4 justify-center mb-10 sm:mb-16">
        <h2 class="text-3xl font-bold text-center">Testimonials</h2>
        <p class="text-muted font-light text-sm md:text-lg text-center">Hear what our users have to say about their experience with our AI tools.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <UPageCard
          v-for="(testimonial, index) in testimonials"
          :key="index"
          variant="subtle"
          :description="testimonial.quote"
          :ui="{ description: 'before:content-[open-quote] after:content-[close-quote]' }"
        >
          <template #footer>
            <UUser v-bind="testimonial.user" size="xl" />
          </template>
        </UPageCard>
      </div>
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
import type { ButtonProps } from '@nuxt/ui'
import { aiTools } from '~~/constants/tools';
import { testimonials } from '~~/constants/testimonials';

const links = ref<ButtonProps[]>([
  {
    label: 'Get started',
    to: '/dashboard',
    icon: 'i-lucide-rocket',
    size: 'xl',
  },
  {
    label: 'Explore tools',
    to: '/dashboard',
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'i-lucide-arrow-right'
  }
])
</script>

<style>

</style>