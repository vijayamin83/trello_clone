<template>
  <v-container fill-height>
    <v-slide-y-transition mode="out-in">
      <v-layout align-center justify-center>
        <v-form
          class="flex text-center xs12 sm6 md4"
          v-if="!loading"
          v-model="valid"
          @submit.prevent="signUp"
          @keydown.prevent.enter>
           <v-icon
            x-large
          >
          face
          </v-icon>
          <v-text-field
            v-model="user.username"
            :rules="notEmptyRules"
            label="User"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.displayName"
            :rules="notEmptyRules"
            label="Display Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.email"
            :rules="notEmptyRules"
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            :rules="notEmptyRules"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.confirmPassword"
            :rules="confirmPasswordRules"
            label="Confirm Password"
            type="password"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.imageUrl"
            :rules="notEmptyRules"
            label="Image URL"
            required
          ></v-text-field>
          <v-btn type="submit" :disabled="!valid">{{$t('views.signUp.signUp')}}</v-btn>
        </v-form>
        <v-progress-linear
          v-if="loading"
          value="15"
          :width="7"
          indeterminate
          color="primary">
        </v-progress-linear>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { notEmptyRules } from '@/validators';
import { LEVEL } from '../utils/log';

export default {
  name: 'signUp',
  data: vm => ({
    valid: false,
    user: {
      username: '',
      password: '',
      confirmPassword: '',
      displayName: '',
      imageUrl: '',
      email: '',
    },
    notEmptyRules,
    confirmPasswordRules: [confirmPassword => confirmPassword === vm.user.password || 'Password must match.'],
  }),
  computed: {
    ...mapState('users', { loading: 'isCreatePending' }),
  },
  methods: {
    ...mapMutations('app', ['pushSnack']),
    async signUp() {
      if (this.valid) {
        const { User } = this.$FeathersVuex;
        const user = new User({
          username: this.user.username,
          password: this.user.password,
          confirmPassword: this.user.confirmPassword,
          displayName: this.user.displayName,
          imageUrl: this.user.imageUrl,
          email: this.user.email,
        });
        user.save()
          .then(() => {
            this.pushSnack({
              snack: { message: this.$t('views.signUp.signUpSuccessMessage') },
              level: LEVEL.SUCCESS,
            });
            this.$router.push('/login');
          }).catch((e) => {
            this.pushSnack({
              snack: { message: e.code === 401 ? this.$t('views.login.loginFailure') : e.message },
              level: LEVEL.ERROR,
            });
          });
      }
    },
  },
};
</script>
