<template>
  <v-app>
    <navbar
      :user="user"
      :logout="logout"
      :isGoingBack="this.isGoBack"
      ></navbar>
      <snackbar />
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Navbar from '@/components/core/Navbar';
import Snackbar from '@/components/core/Snack';

export default {
  name: 'App',
  components: {
    Navbar,
    Snackbar,
  },
  data() {
    return {
      fixed: false,
      isGoBack: false,
    };
  },
  computed: {
    ...mapState('auth', { user: 'payload' }),
    ...mapActions('app', ['pushSnack']),
  },
  methods: {
    ...mapActions('auth', { authLogout: 'logout' }),
    logout() {
      this.authLogout().then(() => this.$router.push('/login'));
    },
  },
  updated() {
    if (this.$route.params.id !== undefined) {
      this.isGoBack = true;
    } else {
      this.isGoBack = false;
    }
  },
};
</script>
