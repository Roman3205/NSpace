<template>
  <div class="w-full h-16 p-2 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex justify-end items-center gap-3">
    <UDrawer v-model:open="open" :handle="false" direction="left" :ui="{header: 'flex items-center justify-between h-16 px-5 border-b border-gray-200 dark:border-gray-800 pb-4', container: 'w-72 gap-0'}">
        <UButton color="neutral" variant="subtle" icon="i-lucide-menu" class="sm:hidden">Open</UButton>
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
    <UDropdownMenu :items="items" :content="{align: 'start', side: 'bottom', sideOffset: 8}" :ui="{content: 'w-48'}">
        <UButton icon="lucide:menu">Roman</UButton>
    </UDropdownMenu>
    <UColorModeSwitch />
  </div>
</template>

<script lang="ts" setup>
const open = ref(false)
import type { DropdownMenuItem } from '@nuxt/ui';
import { useAuth } from '~/composables/useAuth';
import {sidebarMenu} from '~~/constants/tools';

const {signOut} = useAuth()

const items = ref<DropdownMenuItem[]>([
    {label: 'Profile', icon: 'lucide:user'},
    {label: 'Billing', icon: 'lucide:credit-card'},
    {label: 'Logout', icon: 'lucide:log-out', onSelect: async () => {
        await signOut({redirectTo: '/auth/login'})
    }},
])
</script>

<style>

</style>