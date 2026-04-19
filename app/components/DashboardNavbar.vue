<template>
  <div class="w-full p-2 h-16 px-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex justify-between sm:justify-end items-center gap-3">
    <UDrawer v-model:open="open" :handle="false" direction="left" :ui="{header: 'flex items-center justify-between h-16 px-5 border-b border-gray-200 dark:border-gray-800 pb-4', container: 'w-72 gap-0'}">
        <UButton color="neutral" variant="subtle" icon="i-lucide-menu" class="sm:hidden"></UButton>
        <template #header>
            <Logo />
            <UButton color="neutral" variant="ghost" icon="i-lucide-x" @click="open = false"></UButton>
        </template>
        <template #body>
            <div class="flex-1 overflow-y-auto">
                <div class="px-3 py-4">
                    <UNavigationMenu :ui="{label: 'py-2', link: 'py-3'}" :items="sidebarMenu" orientation="vertical" class="data-[orientation-vertical]:w-full" />
                </div>
            </div>
        </template>
    </UDrawer>
    <div class="flex items-center gap-4">
        <UDropdownMenu v-if="user" :items="items" :content="{align: 'start', side: 'bottom', sideOffset: 8}" :ui="{content: 'w-48'}">
            <UButton :icon="!user.image ? 'i-lucide-circle-user-round' : undefined" variant="subtle" color="info">
                <UAvatar v-if="user.image" :src="user.image" :alt="user.name || 'User Avatar'" size="sm" class="rounded-full" />
                <span class="hidden sm:block">
                    {{ user.name }}
                    <UBadge v-if="userData && userData.subscription" label="Pro" color="primary" />
                </span>
            </UButton>
        </UDropdownMenu>
        <UColorModeSwitch />
    </div>
  </div>
</template>

<script lang="ts" setup>
const open = ref(false)
import type { DropdownMenuItem } from '@nuxt/ui';
import { useAuth } from '~/composables/useAuth';
import {sidebarMenu} from '~~/constants/tools';
import type { customerData } from '~~/types/user';

const {signOut, user} = useAuth()

const items = ref<DropdownMenuItem[]>([
    {label: 'Billing', icon: 'lucide:credit-card', to: '/dashboard/settings'},
    {label: 'Logout', icon: 'lucide:log-out', onSelect: async () => {
        await signOut({redirectTo: '/auth/login'})
    }},
])

const {data: userData} = await useFetch<customerData>('/api/user', {
    key: 'userData',
    dedupe: 'defer'
})
</script>

<style>

</style>