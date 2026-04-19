<template>
  <div class="flex flex-col w-full h-full">
    <UPageHeader
        :ui="{root: 'border-none py-0 mb-4'}"
        title="Settings"
        description="Manage account settings."
    />
    <div class="flex flex-col space-y-4">
        <div class="text-muted-foreground text-sm">
            {{ subscriptionMessage }}
        </div>
        <div class="flex gap-4">
             <UButton v-if="userData && isPro" :disabled="status === 'pending'" :to="userData.customerPortalUrl">Manage Subscription</UButton>
              <UButton v-else @click="upgradeUserToPro" icon="lucide:sparkle" color="info">Upgrade</UButton>
        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { customerData } from '~~/types/user';

definePageMeta({
    layout: 'dashboard'
})

const {upgradeUserToPro} = useAuth()
const {data: userData, status} = await useFetch<customerData>('/api/user', {
    key: 'userData',
    dedupe: 'defer'
})

const isPro = computed(() => userData.value?.subscription)

const subscriptionMessage = computed(() => {
    if (!isPro.value) {
        return "You are currently on a free plan."
    }

    const endOfSubscription = userData.value?.subscription && userData.value?.subscription.endsAt ? new Date(userData.value?.subscription.endsAt).toDateString() : new Date(userData.value?.subscription.currentPeriodEnd).toDateString()

    if (userData.value?.subscription?.cancelAtPeriodEnd) {
        return `You are currently on a pro plan, the subscription will be cancelled on ${endOfSubscription}`
    }

    return `You are currently on a pro plan, next billing date: ${endOfSubscription}`
})
</script>

<style>

</style>