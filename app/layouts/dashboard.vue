<template>
  <div class="flex">
    <DashboardSidebar />
    <div class="h-screen transition-all duration-300 overflow-hidden w-full flex flex-col items-center">
        <DashboardNavbar />
        <div class="py-8 px-12 w-full overflow-auto h-full ">
            <slot />
        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>