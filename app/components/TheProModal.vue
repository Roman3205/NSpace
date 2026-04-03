<template>
  <UModal v-model:open="isOpen" title="Upgrade to Pro">
    <template #body>
        <div class="p-4">
            <div class="text-center flex flex-col space-y-2">
                <NuxtLink v-for="tool in aiTools" :key="tool.path" :to="tool.path">
                    <UCard :ui="{body: 'p-3 sm:p-3'}">
                        <div class="w-full flex items-center justify-between">
                            <div class="flex items-center gap-x-4">
                                <UButton :icon="tool.icon" size="md" color="primary" variant="subtle" />
                                <div class="font-semibold">
                                    {{ tool.title }}
                                </div>
                            </div>
                            <UIcon name="lucide:check" class="w-5 h-5" />
                        </div>
                    </UCard>
                </NuxtLink>
            </div>
        </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { aiTools } from '~~/constants/tools';

const {isOpen, toggleModalState} = useProModal()
const {upgradeUserToPro} = useAuth()

</script>