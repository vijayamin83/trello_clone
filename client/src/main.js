import Vue from 'vue';
import 'vuetify/dist/vuetify.min.css';
import vuetify from './plugins/vuetify';

import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './plugins/i18n';

Vue.config.productionTip = false;
Vue.config.errorHandler = (err, _vm, info) => {
  console.log('Uncaught FE Error', err);
  console.log('_vm', _vm);
  console.log('info', info);
};
new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App),
}).$mount('#app');
