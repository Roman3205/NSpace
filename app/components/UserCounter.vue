<template>
  <div class="mt-auto" v-if="status != 'pending' && !isPro">
    <USeparator />
    <div class="px-5 py-6">
        <div class="mb-4 space-y-2 text-sm">
            <p>{{ userData?.userApiLimitCount ? userData.userApiLimitCount : 0 }} / {{ MAX_API_COUNT }} Free Generation</p>
            <UProgress v-model="progress" />
        </div>
        <UButton @click="upgradeUserToPro" icon="lucide:sparkle" color="info" class="w-full justify-center">Upgrade</UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MAX_API_COUNT } from '~~/constants/max-api-limit';
import type { customerData } from '~~/types/user';

const {upgradeUserToPro} = useAuth()
const {data: userData, status} = await useFetch<customerData>('/api/user', {
    key: 'userData',
    dedupe: 'defer'
})

const progress = computed(() => {
    if (userData.value) {
        return (userData.value.userApiLimitCount / MAX_API_COUNT) * 100
    }

    return 0
})

const isPro = computed(() => userData.value?.subscription)
</script>

<style>

</style>