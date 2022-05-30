<template>
  <v-container fill-height>
    <v-slide-y-transition mode="out-in">
      <v-layout align-center justify-center>
        <v-form
          class="flex text-center xs12 sm6 md4"
          v-if="!loading"
          v-model="valid"
          @submit.prevent="loginSubmit"
          @keydown.prevent.enter>
          <v-icon
            x-large
          >
            assignment_ind
          </v-icon>
          <v-text-field
            v-model="user.username"
            :rules="notEmptyRules"
            label="User"
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            :rules="notEmptyRules"
            label="Password"
            type="password"
          ></v-text-field>
          <v-btn type="submit" :disabled="!valid">{{$t('views.login.login')}}</v-btn>
        </v-form>
        <v-container v-if="loading" >
          <v-col
            class="text-subtitle-1 text-center"
            cols="12"
          >
          {{$t('views.boards.loadingBoards')}}
        </v-col>
        <v-progress-linear
          value="15"
          :width="7"
          indeterminate
          color="primary">
          </v-progress-linear>
      </v-container>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { notEmptyRules } from '@/validators';
import { LEVEL } from '../utils/log';

export default {
  name: 'login',
  data: () => ({
    valid: false,
    user: {
      username: '',
      password: '',
    },
    notEmptyRules,
  }),
  computed: {
    ...mapState('auth', { loading: 'isAuthenticatePending' }),
  },
  methods: {
    ...mapActions('localAuth', ['login']),
    ...mapMutations('app', ['pushSnack']),

    async loginSubmit() {
      try {
        await this.login({ valid: this.valid, user: this.user });
        this.$router.push('/dashboard');
        this.pushSnack({
          snack: { message: this.$t('views.login.loginSuccess') },
          level: LEVEL.SUCCESS,
        });
      } catch (e) {
        console.error(e);
        this.pushSnack({
          snack: { message: e.code === 401 ? this.$t('views.login.loginFailure') : e.message },
          level: LEVEL.ERROR,
        });
      }
    },
  },

};
</script>
