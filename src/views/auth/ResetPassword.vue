<template>
  <div class="min-h-screen flex items-center justify-center bg-cover bg-center background-image">
    <div class="max-w-md w-full space-y-8 p-10 bg-white bg-opacity-80 backdrop-filter backdrop-blur-md rounded-xl shadow-xl">
      <div class="text-center">
        <h1 class="text-4xl font-extrabold text-blue-800">Password Reset</h1>
        <h2 class="mt-6 text-2xl font-bold text-gray-700">Reset Your Password</h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="resetPassword">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              v-model="email"
              required
              class="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              aria-required="true"
            />
          </div>
          <div>
            <label for="password" class="sr-only">New Password</label>
            <input
              id="password"
              name="password"
              type="password"
              v-model="password"
              required
              class="appearance-none rounded-b-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="New Password"
              aria-required="true"
            />
          </div>
          <div>
            <label for="password-confirm" class="sr-only">Confirm Password</label>
            <input
              id="password-confirm"
              name="passwordConfirm"
              type="password"
              v-model="passwordConfirm"
              required
              class="appearance-none rounded-b-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Confirm Password"
              aria-required="true"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Reset Password
          </button>
        </div>
      </form>
      <p class="mt-2 text-center text-sm text-gray-600">
        Remembered your password?
        <router-link to="/login" class="font-medium text-blue-600 hover:text-blue-500">
          Login here
        </router-link>
      </p>
      <!-- Error or success message display -->
      <div v-if="message" class="mt-4 text-center text-green-500">
        {{ message }}
      </div>
      <div v-if="errorMessage" class="mt-4 text-center text-red-500">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/axios';

export default {
  data() {
  return {
    email: '',
    password: '',
    passwordConfirm: '',
    token: this.$route.query.token || '', 
    message: '',
    errorMessage: '',
    props: ['token'],
  };
},
  methods: {
    async resetPassword() {
  if (this.password !== this.passwordConfirm) {
    this.errorMessage = 'Passwords do not match';
    return;
  }

  try {
    const response = await axios.post('/password/reset', {
      email: this.email,
      password: this.password,
      password_confirmation: this.passwordConfirm,
      token: this.token
    });
    this.message = response.data.message;
    this.errorMessage = '';

      // Redirect to login page after successful password reset
      setTimeout(() => {
        this.$router.push('/login');
      }, 2000); // Adds a small delay for user to see the success message
  } catch (error) {
    this.errorMessage = error.response.data.error || 'An error occurred. Please try again.';
    this.message = '';
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
