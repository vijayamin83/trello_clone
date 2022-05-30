/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';

import feathersVuex from './feathersVuex';

import localAuth from './localAuth';
import board from './board';
import app from './app';

const {
  service,
  auth,
  FeathersVuex,
} = feathersVuex;

Vue.use(Vuex);
Vue.use(FeathersVuex);

export default new Vuex.Store({
  modules: {
    localAuth,
    board,
    app,
  },
  plugins: [
    service('users', {
      instanceDefaults: {
        username: '',
        password: '',
        displayName: '',
        imageUrl: '',
        email: '',
      },
    }),
    service('boards', {
      instanceDefaults: {
        name: '',
        background: '',
      },
    }),
    service('lists', {
      instanceDefaults: {
        name: '',
        boardId: '',
        background: '#FFFFFF',
      },
    }),
    service('cards', {
      instanceDefaults: {
        title: '',
        description: '',
        listId: '',
        boardId: '',
        members: [],
      },
    }),
    auth({
      userService: 'users',
    }),
  ],
});
