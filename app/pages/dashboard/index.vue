<template>
  <div class="flex flex-col w-full h-full">
    <UPageHeader title="Explore the power of AI"
    :ui="{root: 'border-none py-0 mb-4'}"
        description="Discover a variety of AI tools designed to enhance your productivity and creativity."
    />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink v-for="tool in aiTools" :key="tool.path" :to="tool.path">
        <UCard class="h-full shadow-md hover:shadow-lg transition cursor-pointer">
          <div class="flex items-center mb-3 gap-x-3">
            <UIcon :name="tool.icon" size="md" />
            <span class="font-semibold">
              {{ tool.title }}
            </span>
          </div>
          <p class="text-sm text-muted-foreground">
            {{ tool.description }}
          </p>
        </UCard>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { aiTools } from '~~/constants/tools';

definePageMeta({
    layout: 'dashboard'
})
</script>

<style>

</style>