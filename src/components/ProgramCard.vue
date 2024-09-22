<template>
  <div class="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96 overflow-hidden group">
  <div class="relative w-full h-56 overflow-hidden">
    <img :src="program.firstImage" alt="Image of {{ program.name }}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-125 group-hover:opacity-80" />
    <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
  </div>
  <div class="p-4 transition-colors duration-300">
    <div class="flex items-center mb-2">
      <h6 class="text-slate-800 text-xl font-semibold">{{ program.name }}</h6>
      <div class="flex items-center gap-0.5 ml-auto">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-yellow-600">
          <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd"></path>
        </svg>
        <span class="text-slate-600 ml-1.5">{{ program.rating }}</span>
      </div>
    </div>
    <p class="text-slate-600 leading-normal font-light">{{ program.description }}</p>
  </div>
  <div class="px-4 py-2 flex justify-between items-center">
    <span class="text-slate-800 font-semibold">{{ program.duration }}</span>
    <button
        @click="goToProgramDetails"
        class="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
      >
        Reserve
      </button>
  </div>
</div>

</template>

<script>
export default {
  props: {
    program: {
      type: Object,
      required: true
    }
  },
  mounted() {
    console.log('program data:', this.program);
  },
  methods: {
    goToProgramDetails() {
      this.$router.push({ name: 'ProgramDetails', params: { id: this.program.id } });
    }
  }
}
</script>

<style scoped>
.group:hover .group-hover\:scale-125 {
  transform: scale(1.25);
}

.group {
  overflow: hidden;
}

.group:hover img {
  transform: scale(1.25);
  opacity: 0.8;
}
</style>
