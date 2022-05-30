import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({

  icons: {
    iconfont: 'mdi',
  },

  theme: {
    themes: {
      light: {
        primary: '#1565c0',
        tertiary: '#495057',
        accent: '#82B1FF',
        error: '#ff5252',
        info: '#00d3ee',
        success: '#60ce79',
        warning: '#ffa21a',
      },
      dark: {
        primary: '#f5f5f5',
        secondary: '#f5f5f5',
        tertiary: '#f5f5f5',
        accent: '#f5f5f5',
        error: '#B00020',
        info: '#00d3ee',
        success: '#60ce79',
        warning: '#ffa21a',
      },
    },
  },
});
