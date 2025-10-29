<template>
    <aside class="transition-all duration-300 hidden sm:block w-72">
        <div class="h-screen flex flex-col border-r border-gray-200 dark:border-gray-800">
            <div class="h-16 px-5 flex items-center border-b border-gray-200 dark:border-gray-800">
                <Logo />
            </div>
            <div class="flex-1 overflow-y-auto">
                <div class="px-3 py-4">
                    <UNavigationMenu :ui="{label: 'py-2', link: 'py-3'}" :items="sidebarMenu" orientation="vertical" class="data-[orientation-vertical]:w-full" />
                </div>
            </div>
        </div>
    </aside>
</template>

<script lang="ts" setup>
import {sidebarMenu} from '~~/constants/tools';
</script>

<style>

</style>