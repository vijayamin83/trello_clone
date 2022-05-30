<template>
  <v-flex flex xs12 sm6 md4 lg2 xl1 pa-2 my-12>
    <v-expansion-panels>
      <v-expansion-panel>
      <v-expansion-panel-header>
        <template v-slot:default="{}">
          <v-row no-gutters >
            <v-col class="text-decoration-underline" cols="8">
              {{$t('views.boards.addBoard')}}
            </v-col>
            <v-col
              cols="8"
              class="text--secondary"
            >
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <div>
          <v-form
            v-if="!creating"
            v-model="valid"
            @submit.prevent="onCreateBoard"
            @keydown.prevent.enter>
            <v-text-field
              v-model="board.name"
              :rules="notEmptyRules"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="board.background"
              :rules="notEmptyRules"
              label="Background"
              required
            ></v-text-field>
            <v-btn class="success" type="submit" :disabled="!valid">Create</v-btn>
          </v-form>
          <v-progress-linear
            v-if="creating"
            value="15"
            :width="7"
            indeterminate
            color="primary">
          </v-progress-linear>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
  </v-flex>
</template>

<script>
import { notEmptyRules } from '@/validators';
import { mapMutations } from 'vuex';
import { LEVEL } from '../../utils/log';

export default {
  props: ['creating', 'createBoard'],
  data: () => ({
    valid: false,
    board: {
      name: '',
      background: '',
    },
    notEmptyRules,
  }),
  methods: {
    ...mapMutations('app', ['pushSnack']),
    async onCreateBoard() {
      if (this.valid) {
        await this.createBoard(this.board).then(() => {
          this.pushSnack({
            snack: { message: this.$t('views.boards.boardCreated') },
            level: LEVEL.SUCCESS,
          });
        }).catch((e) => {
          this.pushSnack({
            snack: { message: this.$t('views.boards.boardNotCreated') },
            level: LEVEL.ERROR,
          });
        });
        this.board = {
          name: '',
          background: '',
        };
      }
    },
  },
};
</script>

