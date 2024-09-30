<template>
  <div class="group relative w-96 overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl">
    <!-- Image container with transition -->
    <div class="relative h-64 overflow-hidden">
      <img
        :src="programData.firstImage"
        :alt="`Image of ${programData.name}`"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
    </div>

    <!-- Content overlay -->
    <div class="absolute inset-0 flex flex-col justify-between p-6 text-white">
      <!-- Top section -->
      <div class="flex items-start justify-between">
        <span class="rounded-full bg-yellow-500 px-3 py-1 text-sm font-semibold">
          {{ programData.category }}
        </span>
        <div class="flex items-center space-x-1 rounded-full bg-black/30 px-2 py-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4 text-yellow-400">
            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm font-medium">{{ formattedRating }}</span>
        </div>
      </div>

      <!-- Bottom section -->
      <div>
        <h3 class="mb-2 text-2xl font-bold leading-tight">{{ programData.name }}</h3>
        <p class="mb-4 line-clamp-2 text-sm text-gray-200">{{ programData.description }}</p>
        <div class="flex flex-wrap items-center gap-4 text-sm">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1 h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {{ programData.location }}
          </div>
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1 h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ programData.duration }}
          </div>
        </div>
      </div>
    </div>

    <!-- Action bar -->
    <div class="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-black/50 p-4 backdrop-blur-sm transition-all duration-300 group-hover:bg-black/70">
      <span class="text-lg font-bold text-yellow-400">{{ programData.price }} MAD</span>
      <button
        @click="goToProgramDetails"
        class="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-colors duration-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
      >
        Explore Now
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  props: {
    program: {
      type: Object,
      default: null
    },
    programId: {
      type: Number,
      default: null
    }
  },
  setup(props) {
    const store = useStore()
    const router = useRouter()

    const programData = computed(() => {
      if (props.program) {
        return props.program
      } else if (props.programId) {
        return store.getters['program/getProgramById'](props.programId)
      }
      return null
    })

    const formattedRating = computed(() => {
      const rating = programData.value ? programData.value.averageRating : undefined
      return rating !== undefined ? rating.toFixed(1) : 'N/A'
    })

    const goToProgramDetails = () => {
      const id = props.programId || (props.program ? props.program.id : null)
      if (id) {
        router.push({ name: 'ProgramDetails', params: { id } })
      }
    }

    return {
      programData,
      formattedRating,
      goToProgramDetails
    }
  }
}
</script>