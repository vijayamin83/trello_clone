<template class="flex">
  <div>
    <v-app-bar
      color="primary"
      dark
      >
      <v-btn
        v-if="isGoingBack"
        icon
        @click="$router.back()"
        >
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>
        {{$t('appName')}}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="!user">
        <v-btn class="transparent" text :to="{ name: 'login' }">
          {{$t('views.login.login')}}
        </v-btn>
        <v-btn class="transparent" text :to="{ name: 'signup' }">
          {{$t('views.signUp.signUp')}}
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-if="user">
        <avatar :user="user.user" :logout="logout"></avatar>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
import Avatar from '@/components/core/Avatar';

export default {
  props: ['user', 'logout', 'isGoingBack'],
  components: {
    Avatar,
  },
};
</script>

