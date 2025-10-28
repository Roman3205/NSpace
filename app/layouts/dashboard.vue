<template>
  <div class="flex">
    <aside class="transition-all duration-300 hidden sm:block w-72">
        <div class="h-screen flex flex-col border-r border-gray-200 dark:border-gray-800">
            <div class="h-16 px-5 flex items-center">
                <Logo />
            </div>
            <div class="flex-1 overflow-y-auto">
                <USeparator />
                <div class="px-3 py-4">

                </div>
            </div>
        </div>
    </aside>
    <div class="p-2 h-screen transition-all duration-300 overflow-hidden w-full flex flex-col items-center">
        <div class="p-2 pt-16 flex-1 overflow-auto">
            <slot />
        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>