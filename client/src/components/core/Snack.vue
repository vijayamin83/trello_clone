<template>
  <v-snackbar
    :value="isOpen"
    v-bind="$attrs"
    :color="type"
    :multi-line="multi"
    :timeout="-1"
    app
    style="z-index: 99999;"
    top
  >
    <div class="d-flex align-center" data-cy="snack-message">
      <!-- <v-icon left>
        {{ icon }}
      </v-icon> -->
      {{message}}
    </div>
  </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { LEVEL } from '@/utils/log';

export default {
  data() {
    return {
      param1: '',
      param2: '',
      isOpen: false,
      type: LEVEL.INFO,
      message: '',
      multi: false,
      icon: 'information',
    };
  },

  computed: {
    ...mapState('app', [
      'messages',
    ]),
  },
  methods: {
    ...mapMutations('app', ['acknowledgeSnackById']),
  },
  watch: {
    messages(messages) {
      if (this.isOpen || messages.length === 0) {
        return;
      }
      const { snack, level } = messages;

      this.type = level;
      switch (level) {
        case LEVEL.SUCCESS:
          this.icon = 'account_check';
          break;
        case LEVEL.WARNING:
          this.icon = 'alert';
          break;
        case LEVEL.INFO:
        case LEVEL.ERROR:
          this.icon = 'information';
          break;
        default:
          // ESLint forces me to write a default case so... easter egg?
          this.icon = 'mdi-heart';
          break;
      }
      this.message = snack.message.replace('\n', '<br>');
      this.isOpen = true;
      const duration = level === LEVEL.ERROR ? 5000 : 4000;
      setTimeout(() => {
        this.isOpen = false;
        // Allow for delay between messages
        setTimeout(() => {
          this.acknowledgeSnackById();
        }, 225);
      }, duration);
    },
  },
};
</script>
