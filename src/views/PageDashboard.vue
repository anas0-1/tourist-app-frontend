<template>
  <div class="flex h-screen bg-blue-50">
    <DashboardSidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <TopBar :title="currentRouteName" /> <!-- Pass the current route name as title -->
      <main class="flex-1 overflow-y-auto bg-blue-50 p-6">
        <!-- Dynamically load child components  -->
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DashboardSidebar from '@/components/Dashboard/DashboardSidebar.vue'
import TopBar from '@/components/Dashboard/TopBar.vue'

const route = useRoute()
const currentRouteName = computed(() => route.name || 'Dashboard') 
</script>
