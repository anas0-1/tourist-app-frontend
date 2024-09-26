<template>
    <div>
      <NavBar />
      <!-- Hero Section -->
    <HeroSection />  
      <!-- Featured Programs -->
      <section class="py-16">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold mb-10 text-center">Curated Experiences Just for You</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div v-for="(program, index) in featuredPrograms" :key="index" class="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <img :src="program.image" :alt="program.title" class="w-full h-56 object-cover"/>
              <div class="p-6">
                <h3 class="text-xl font-semibold mb-2">{{ program.title }}</h3>
                <p class="text-gray-600 mb-4">{{ program.description }}</p>
                <div class="flex justify-between items-center">
                  <span class="text-yellow-500 font-bold">{{ program.price }}</span>
                  <button class="text-blue-600 font-semibold hover:underline">Explore More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
     <!-- Key Features and Benefits -->
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-12">Why Travel with Us?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(feature, index) in features" :key="index" class="bg-white p-8 rounded-lg shadow-lg">
            <div class="text-yellow-500 text-4xl mb-6">
              <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" v-html="feature.icon"></svg>
            </div>
            <h3 class="text-xl font-semibold mb-4">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>
  
      <!-- Traveler Stories (Customer Testimonials) -->
    <section class="py-16">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-12">Traveler Stories</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(testimonial, index) in testimonials" :key="index" class="bg-white p-8 rounded-lg shadow-lg">
            <div class="mb-6">
              <img :src="testimonial.avatar" :alt="testimonial.name" class="w-20 h-20 rounded-full mx-auto mb-4"/>
              <p class="text-gray-600 italic mb-4">"{{ testimonial.quote }}"</p>
              <p class="font-semibold">{{ testimonial.name }}</p>
              <p class="text-sm text-gray-500">{{ testimonial.trip }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  
      <!-- Promotional Banner -->
      <section class="bg-yellow-500 text-gray-800 py-12">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl font-bold mb-4">Limited Time Offer</h2>
          <p class="text-xl mb-8">Book your dream vacation now and enjoy a 20% early bird discount!</p>
          <button class="bg-gray-800 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-gray-700 transition duration-300">
            Claim Your Discount
          </button>
        </div>
      </section>
  
      <AppFooter />
      <ScrollToTop />
    </div>
  </template>
  
  <script>
import { ref } from 'vue';
import NavBar from '@/components/tools/NavBar.vue';
import AppFooter from '@/components/tools/Footer.vue';
import ScrollToTop from '@/components/tools/ScrollToTop .vue';
import HeroSection from '@/components/tools/heroSection.vue';

export default {
  name: 'HomePage',
  components: {
    NavBar,
    AppFooter,
    ScrollToTop,
    HeroSection
  },
  setup() {
    const featuredPrograms = ref([
      {
        title: "Serene Bali Retreat",
        description: "Experience tranquility and culture in the heart of Bali.",
        image: "/api/placeholder/400/300",
        price: "From $1,299"
      },
      {
        title: "Alpine Adventure",
        description: "Conquer majestic peaks and breathe in crisp mountain air.",
        image: "/api/placeholder/400/300",
        price: "From $1,599"
      },
      {
        title: "Mediterranean Cruise",
        description: "Sail through azure waters and explore ancient coastal cities.",
        image: "/api/placeholder/400/300",
        price: "From $2,099"
      }
    ]);

    const features = ref([
      {
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>',
        title: "Worldwide Destinations",
        description: "Explore curated trips to over 100 countries across all continents."
      },
      {
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>',
        title: "Expert Local Guides",
        description: "Benefit from the knowledge and passion of our experienced local guides."
      },
      {
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>',
        title: "24/7 Support",
        description: "Travel with peace of mind knowing our support team is always available."
      }
    ]);

    const testimonials = ref([
      {
        name: "Sarah Johnson",
        quote: "This trip exceeded all my expectations. The attention to detail was impressive!",
        avatar: "/api/placeholder/100/100",
        trip: "Japan Cultural Tour"
      },
      {
        name: "Michael Chen",
        quote: "I've never felt so immersed in local culture. An unforgettable experience!",
        avatar: "/api/placeholder/100/100",
        trip: "Peru Inca Trail"
      },
      {
        name: "Emma Watson",
        quote: "The perfect blend of adventure and relaxation. I can't wait to book my next trip!",
        avatar: "/api/placeholder/100/100",
        trip: "Greek Islands Hopping"
      }
    ]);

    return {
      featuredPrograms,
      features,
      testimonials
    };
  }
};
</script>
<style scoped>
.bg-ocean-blue {
  background-color: #1b6ca8;
}

.bg-sunset-orange {
  background-color: #ff4500;
}

.bg-sandy-beige {
  background-color: #f5deb3;
}

/* Add any additional custom styles here */
</style>