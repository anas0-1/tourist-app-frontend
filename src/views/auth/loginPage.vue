<template>
  <div class="min-h-screen flex items-center justify-center bg-cover bg-center background-image">
    <div class="max-w-md w-full space-y-8 p-10 bg-white bg-opacity-80 backdrop-filter backdrop-blur-md rounded-xl shadow-xl">
      <div class="text-center">
        <h1 class="text-4xl font-extrabold text-blue-800">
          TravelEASE
        </h1>
        <h2 class="mt-6 text-2xl font-bold text-gray-700">
          Your adventure begins here
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="loginUser">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              v-model="email"
              required
              class="appearance-none rounded-t-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              aria-required="true"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              v-model="password"
              required
              class="appearance-none rounded-b-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              aria-required="true"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <router-link to="/password/reset" class="font-medium text-blue-600 hover:text-blue-500">
              Forgot password?
            </router-link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <!-- <PlaneIcon class="h-5 w-5 text-blue-500 group-hover:text-blue-400" aria-hidden="true" /> -->
            </span>
            Start Your Journey
          </button>
        </div>
      </form>
      <p class="mt-2 text-center text-sm text-gray-600">
        New explorer?
        <router-link to="/register" class="font-medium text-blue-600 hover:text-blue-500">
          Join the adventure
        </router-link>
      </p>
      <!-- Error message display -->
      <div v-if="errorMessage" class="mt-4 text-center text-red-500">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  created() {
    if (this.$store.getters['auth/isAuthenticated']) {
      this.$router.push('/');
    }
  },
  methods: {
    ...mapActions('auth', ['login']), 
    async loginUser() {
      try {
        await this.login({ email: this.email, password: this.password });
        this.$router.push('/');
      } catch (error) {
        this.errorMessage = 'Invalid email or password';
      }
    }
  }
};
</script>


<style scoped>
.background-image {
  background-image: url('@/assets/walp.jpg');
}

</style>
