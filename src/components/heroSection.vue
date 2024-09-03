<template>
  <div class="relative w-full h-screen bg-sandy-beige overflow-hidden">
    <!-- Hero Image -->
    <div
      class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
      v-for="(image, index) in images"
      :key="index"
      :style="{ backgroundImage: `url(${image})`, opacity: currentIndex === index ? 1 : 0 }"
    ></div>

    <!-- Motivating Text and Get Started Button -->
    <div class="absolute inset-0 flex flex-col justify-center items-center text-center p-6 md:p-12">
      <h1 class="text-4xl md:text-6xl font-bold text-white mb-4">Discover Your Perfect Adventure</h1>
      <p class="text-lg md:text-2xl text-white mb-8">Explore our curated programs and start your journey today!</p>
      <a href="/login" class="bg-sunset-orange text-white py-3 px-6 rounded-lg text-xl font-semibold border-4 border-yellow-500 hover:bg-yellow-500 hover:border-yellow-500 transition duration-300">    
      Get Started
    </a>
    </div>

    <!-- Image Navigation (Optional) -->
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
      <span
        v-for="(image, index) in images"
        :key="index"
        class="block w-4 h-4 rounded-full cursor-pointer"
        :class="{ 'bg-sunset-orange': currentIndex === index, 'bg-gray-500': currentIndex !== index }"
        @click="changeImage(index)"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      images: [
        require('@/assets/Room.jpg'),
        require('@/assets/Snow.png'),
        require('@/assets/hiking.jpg'),
        require('@/assets/Fecran.jpg'),
      ],
    };
  },
  mounted() {
    this.startImageRotation();
  },
  methods: {
    startImageRotation() {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      }, 3000);
    },
    changeImage(index) {
      this.currentIndex = index;
    },
  },
};
</script>

<style scoped>
/*  */
</style>
