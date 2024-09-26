<template>
  <footer class="bg-gray-800 text-white py-8">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap justify-between">
        <div class="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 class="text-2xl font-bold mb-4">TravelEase</h3>
          <p class="text-gray-400">Your ultimate travel companion for hassle-free adventures.</p>
        </div>
        <div class="w-full md:w-1/4 mb-6 md:mb-0">
          <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
          <ul>
            <li v-for="link in quickLinks" :key="link.name" class="mb-2">
              <a :href="link.href" class="text-gray-400 hover:text-white transition duration-300">{{ link.name }}</a>
            </li>
          </ul>
        </div>
        <div class="w-full md:w-1/4 mb-6 md:mb-0">
          <h4 class="text-lg font-semibold mb-4">Contact Us</h4>
          <p class="text-gray-400 mb-2">1234 Travel Street</p>
          <p class="text-gray-400 mb-2">Adventure City, AC 56789</p>
          <p class="text-gray-400 mb-2">Phone: (123) 456-7890</p>
          <p class="text-gray-400">Email: info@travelease.com</p>
        </div>
        <div class="w-full md:w-1/4">
          <h4 class="text-lg font-semibold mb-4">Follow Us</h4>
          <div class="flex space-x-4">
            <a v-for="social in socialLinks" :key="social.name" :href="social.href" class="text-gray-400 hover:text-white transition duration-300">
              <component :is="social.icon" class="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
      <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} TravelEase. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
import { defineComponent } from 'vue';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-vue-next';

export default defineComponent({
  name: 'AppFooter',
  components: {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
  },
  data() {
    return {
      quickLinks: [
        { name: 'Home', href: '#' },
        { name: 'Destinations', href: '#' },
        { name: 'Bookings', href: '#' },
        { name: 'About Us', href: '#' },
        { name: 'Contact', href: '#' },
      ],
      socialLinks: [
        { name: 'Facebook', href: '#', icon: Facebook },
        { name: 'Twitter', href: '#', icon: Twitter },
        { name: 'Instagram', href: '#', icon: Instagram },
        { name: 'LinkedIn', href: '#', icon: Linkedin },
      ],
    };
  },
});
</script>
