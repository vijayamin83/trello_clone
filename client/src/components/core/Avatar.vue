<template>
  <v-layout justify-content align-center>
    <v-menu
      bottom
      origin="center center"
      transition="scale-transition"
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-avatar
          :size="40"
          color="grey lighten-4"
          v-bind="attrs"
          v-on="on"
        >
          <img :src="user.imageUrl" alt="avatar">
      </v-avatar>
      </template>

      <v-list>
          <v-list-item
          >
            <v-list-item-title><span @click="logoutUser">
              {{$t('views.logout.title')}}
            </span></v-list-item-title>
          </v-list-item>
      </v-list>
    </v-menu>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex';
import { LEVEL } from '../../utils/log';

export default {
  props: ['user', 'logout'],
  methods: {
    ...mapMutations('app', ['pushSnack']),
    logoutUser() {
      this.logout();
      this.pushSnack({
        snack: { message: this.$t('views.logout.loggedOut') },
        level: LEVEL.SUCCESS,
      });
    },
  },
};
</script>

