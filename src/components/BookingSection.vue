<template>
    <div class="bg-gradient-to-r from-blue-500 to-green-500 rounded-xl shadow-lg p-8 mb-12 animate__animated animate__fadeInUp">
      <h2 class="text-3xl md:text-4xl font-semibold text-white mb-8 animate__animated animate__fadeInDown">Ready to Embark?</h2>
      <form @submit.prevent="submitBooking" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="name" class="block text-sm font-medium text-white mb-2">Full Name</label>
          <input id="name" v-model="booking.name" type="text" required
                 class="w-full px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-white bg-white bg-opacity-20 text-white placeholder-gray-200"
                 placeholder="Your full name">
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-white mb-2">Email</label>
          <input id="email" v-model="booking.email" type="email" required
                 class="w-full px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-white bg-white bg-opacity-20 text-white placeholder-gray-200"
                 placeholder="Your email address">
        </div>
        <div>
          <label for="date" class="block text-sm font-medium text-white mb-2">Preferred Date</label>
          <input id="date" v-model="booking.date" type="date" required
                 class="w-full px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-white bg-white bg-opacity-20 text-white">
        </div>
        <div>
          <label for="participants" class="block text-sm font-medium text-white mb-2">Number of Adventurers</label>
          <input id="participants" v-model="booking.participants" type="number" required min="1"
                 class="w-full px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-white bg-white bg-opacity-20 text-white">
        </div>
        <div class="md:col-span-2">
          <button type="submit"
                  class="w-full bg-white text-blue-600 font-bold py-4 px-6 rounded-md hover:bg-blue-100 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
            Book Your Adventure
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BookingSection',
    data() {
      return {
        booking: {
          name: '',
          email: '',
          date: '',
          participants: 1
        }
      }
    },
    methods: {
      submitBooking() {
        // Implement booking submission logic here
        console.log('Booking submitted:', this.booking);
        alert('Booking submitted successfully!');
        this.booking = { name: '', email: '', date: '', participants: 1 };
      }
    }
  }
  </script>