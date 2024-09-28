<template>
  <div class="flex h-screen bg-blue-50">
    <DashboardSidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <NavBar />
      <main class="flex-1 overflow-y-auto bg-blue-50 p-6">
        <!-- Dynamically load child components  -->
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import DashboardSidebar from '@/components/Dashboard/DashboardSidebar.vue'
import NavBar from '@/components/tools/NavBar.vue'

</script>
