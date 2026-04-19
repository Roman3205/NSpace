<template>
  <div class="min-h-screen flex flex-col items-center relative">
    <UHeader class="w-full">
        <template #left>
            <Logo />
        </template>
        <template #right>
          <UColorModeButton />
        </template>
    </UHeader>
    <div class="flex flex-1 w-full sm:w-auto">
        <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>