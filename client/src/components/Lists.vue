<template>
  <v-card
    class="mx-auto my-12"
    max-width="374"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      :src="board.background"
      @click="redirectOnBoard"
    >
      <v-card-title class="headline white--text">
        <v-container>
        {{board.name}}
        </v-container>
      </v-card-title>
    </v-img>

    <v-card-title class="justify-space-between">
      <div>
        <v-avatar size="20">
            <img
              alt="user"
              :src="this.taskOwner.imageUrl"
            >
          </v-avatar>
          <span class="body-1">
            {{this.taskOwner.username}} - {{this.toDate(board.createdAt)}}
          </span>
      </div>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn 
          class="red--text" 
          icon 
          @click="removeBoard"
          v-bind="attrs"
          v-on="on"
          >
            <v-icon>
              delete_forever
            </v-icon>
          </v-btn>
        </template>
        <span>{{$t('views.boards.deleteMessage')}}</span>
      </v-tooltip>
    </v-card-title>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { LEVEL } from '../utils/log';

export default {
  props: ['board'],
  data: () => ({
    taskOwner: {},
  }),
  methods: {
    ...mapMutations('app', ['pushSnack']),
    redirectOnBoard() {
      this.$router.push(`/dashboard/${this.board._id}`);
    },
    toDate(unixTimestamp) {
      const date = new Date(unixTimestamp);
      const currentDate = new Date();
      const timeDiff = currentDate.getTime() - date.getTime();

      if (timeDiff <= (1 * 60 * 60 * 1000)) {
        const m = parseInt((timeDiff / (60 * 1000)), 10);
        return `${m} minutes ago`;
      } else if (timeDiff <= (24 * 60 * 60 * 1000)) {
        const hr = parseInt((timeDiff / (60 * 60 * 1000)), 10);
        return `${hr} hours ago`;
      }
      const day = parseInt((timeDiff / (24 * 60 * 60 * 1000)), 10);
      return `${day} days ago`;
    },
    async removeBoard() {
      const { Board } = this.$FeathersVuex;
      const newBoard = new Board(this.board);
      await newBoard.remove({
        _id: this.board._id,
      }).then(() => {
        this.pushSnack({
          snack: { message: this.$t('views.boards.boardDeleted') },
          level: LEVEL.SUCCESS,
        });
      }).catch((e) => {
        console.log(e);
        this.pushSnack({
          snack: { message: this.$t('views.boards.boardNotDeleted') },
          level: LEVEL.ERROR,
        });
      });
    },
  },
  computed: {
    ...mapGetters('users', { findBoardsInStore: 'find' }),
  },
  mounted() {
    const owner = this.findBoardsInStore({
      query: {
        _id: this.board.createrId,
      },
    }).data;
    // eslint-disable-next-line
    this.taskOwner = owner[0];
  },
};
</script>

