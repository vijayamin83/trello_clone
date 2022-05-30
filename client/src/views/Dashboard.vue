<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap>
        <v-container v-if="loading">
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
        <v-flex sm3 v-for="board in boards" :key="board._id" pa-2>
          <lists :board="board"></lists>
        </v-flex>
        <board-form
          :creating="creating"
          :createBoard="createBoard">
        </board-form>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import BoardForm from '../components/form/BoardForm.vue';
import Lists from '../components/Lists.vue';

export default {
  name: 'dashboard',
  components: {
    BoardForm,
    Lists,
  },
  mounted() {
    this.findBoards({ query: {} });
  },
  methods: {
    ...mapActions('boards', { findBoards: 'find' }),
    async createBoard(board) {
      const { Board } = this.$FeathersVuex;
      const newBoard = new Board({
        name: board.name,
        background: board.background,
      });
      await newBoard.save();
    },
  },
  computed: {
    ...mapState('auth', { user: 'payload' }),
    ...mapState('boards', {
      loading: 'isFindPending',
      creating: 'isCreatePending',
    }),
    ...mapGetters('boards', { findBoardsInStore: 'find' }),
    boards() {
      return this.user ? this.findBoardsInStore({
        query: {
          createrId: this.user.userId,
        },
      }).data : [];
    },
  },
};
</script>
