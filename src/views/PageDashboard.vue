<template>
  <div>
    <h1>Welcome, {{ username }}!</h1>
    <p>Your roles: {{ roles.join(', ') }}</p> 
    <p>This is your dashboard.</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      username: '', // Local state for the user's name
    };
  },
  computed: {
    ...mapGetters('role', ['userRoles']), // Get the roles from the 'role' Vuex module
    roles() {
      return this.userRoles; //local computed property 
    },
  },
  async created() {
    // Fetch user data when the component is created
    await this.fetchUser(); 
    await this.fetchUserRole(); 

    // After fetching, set the local state for the username
    this.username = this.$store.state.user.user?.name || 'Guest';
  },
  methods: {
    ...mapActions('user', ['fetchUser']), // Fetch user from 'user.js'
    ...mapActions('role', ['fetchUserRole']), // Fetch roles from 'role.js'
  }
};
</script>
