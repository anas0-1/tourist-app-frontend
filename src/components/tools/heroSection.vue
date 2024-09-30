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
      <h1 class="text-4xl md:text-6xl font-bold text-white mb-4 border-text animate-float">
        Discover Your Perfect Adventure
      </h1>
      <p class="text-lg md:text-2xl text-white mb-8 border-text animate-float animation-delay-300">
        Explore our curated programs and start your journey today!
      </p>
      <a
        href="/login"
        class="bg-sunset-orange text-white py-3 px-6 rounded-lg text-xl font-semibold border-4 border-yellow-500 hover:bg-yellow-500 hover:border-yellow-500 transition duration-300 transform hover:scale-105 animate-float animation-delay-600"
      >
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

    <!-- Bouncing Arrow -->
    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
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
        require('@/assets/jap.jpg'),
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
/* Text stroke effect */
.border-text {
  color: white; /* Text color */
  -webkit-text-stroke: 1px #FFD700; /* Yellow stroke */
}

/* Floating animation for text and button */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Animation delay for different elements */
.animation-delay-300 {
  animation-delay: 0.3s;
}

.animation-delay-600 {
  animation-delay: 0.6s;
}

/* Bouncing animation for the arrow */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}
</style>
