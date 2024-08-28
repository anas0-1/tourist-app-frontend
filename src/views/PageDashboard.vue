<template>
  <div>
    <h1>Welcome, {{ username }}!</h1>
    <p>Your role: {{ role }}</p>
    <p>This is your dashboard.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      role: ''
    };
  },
  async created() {
    await this.fetchUserInfo(); // Fetch user info (name and role) when the component is created
  },
  methods: {
    async fetchUserInfo() {
      try {
        // Fetch user role
        const roleResponse = await axios.get('/api/user-role');
        console.log('Role Response:', roleResponse); // Log role response
        const roles = roleResponse.data.roles;

        // Fetch user name
        const userResponse = await axios.get('/api/me');
        console.log('User Response:', userResponse); // Log user response
        const username = userResponse.data.name;

        // Set the fetched data to be displayed
        this.username = username;
        this.role = roles.length > 0 ? roles[0] : 'No role';
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }
  }
};
</script>
