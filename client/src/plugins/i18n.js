import Vue from 'vue';
import VueI18n from 'vue-i18n';
import appMessages from '../locales';
import _ from './simulatelodah';

// Get the local storage or default browser language
const defaultLanguage = (
  localStorage.locale
  || window.navigator.userLanguage
  || window.navigator.language
  || 'en-US'
);

Vue.use(VueI18n);

export default new VueI18n({
  locale: 'en-US',
  fallbackLocale: defaultLanguage,
  messages: _.defaultsDeep(
    {},
    appMessages,
  ),
});
