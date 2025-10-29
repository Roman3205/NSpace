<template>
  <div class="flex flex-col w-full">
    <UPageHeader
    :ui="{root: 'border-none py-0'}"
        title="Conversation"
        description="Engage in natural, intelligent conversations with AI for brainstorming, questions or casual chat."
    />
    <UCard variant="subtle" class="flex-1 overflow-y-auto space-y-4 px-4 py-2">
        <div class="flex flex-col"></div>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: 'dashboard'
})

type Message = {
    role: 'user' | 'system',
    content: string
}

const messages = ref<Message[]>([
    {
        role: 'user',
        content: 'Difference between dogs and cats'
    },
    {
        role: 'system',
        content: ''
    }
])
</script>

<style>

</style>