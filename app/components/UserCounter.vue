<template>
  <div class="mt-auto">
    <USeparator />
    <div class="px-5 py-6">
        <div class="mb-4 space-y-2 text-sm">
            <p>{{ userCount?.count ? userCount.count : 0 }} / {{ MAX_API_COUNT }} Free Generation</p>
            <UProgress v-model="progress" />
        </div>
        <UButton @click="upgradeUserToPro" icon="lucide:sparkle" color="info" class="w-full justify-center">Upgrade</UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MAX_API_COUNT } from '~~/constants/max-api-limit';

const {upgradeUserToPro} = useAuth()
const {data: userCount, status} = await useFetch<{count: number}>('/api/user', {
    key: 'userCount'
})
const progress = computed(() => {
    if (userCount.value) {
        return (userCount.value.count / MAX_API_COUNT) * 100
    }
})
</script>

<style>

</style>