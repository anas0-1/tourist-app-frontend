<template>
  <div class="relative h-96 rounded-xl overflow-hidden mb-8 shadow-2xl animate__animated animate__fadeIn">
    <img :src="program.images[0]" :alt="program.name" class="w-full h-full object-cover">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex items-end">
      <div class="p-8">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-2 animate__animated animate__fadeInUp">{{ program.name }}</h1>
        <p class="text-xl text-white animate__animated animate__fadeInUp animate__delay-0.5s">{{ program.duration }} Days </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroSection',
  props: {
    program: {
      type: Object,
      required: true
    }
  }
}
</script>