<template>
  <div class="flex h-screen bg-blue-50">
    <DashboardSidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <NavBar />
      <main class="flex-1 overflow-y-auto bg-blue-50 p-6">
        <router-view v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <Suspense>
              <component :is="Component" />
              <template #fallback>
                <div class="flex items-center justify-center h-full">
                  <LoaderIcon class="animate-spin h-12 w-12 text-blue-500" />
                </div>
              </template>
            </Suspense>
          </Transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { LoaderIcon } from 'lucide-vue-next';
import DashboardSidebar from '@/components/Dashboard/DashboardSidebar.vue'
import NavBar from '@/components/tools/NavBar.vue'
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>