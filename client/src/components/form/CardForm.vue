<template>
  <v-flex flex>
    <v-expansion-panels>
      <v-expansion-panel>
      <v-expansion-panel-header>
        <template v-slot:default="{}">
          <v-row no-gutters >
            <v-col class="text-decoration-underline" cols="8">
              {{$t('views.cards.addCard')}}
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <div>
          <v-form
            v-if="!creatingCard"
            v-model="validCard"
            @submit.prevent="createCard"
            @keydown.prevent.enter>
            <v-text-field
              v-model="card.title"
              :rules="notEmptyRules"
              label="Title"
              required
            >
            <template slot="append">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon 
                  left 
                  @click="createCard"
                  v-bind="attrs"
                  v-on="on"
                  >save</v-icon>
                </template>
                <span>{{$t('views.cards.createCardMessage')}}</span>
              </v-tooltip>
            </template>
            </v-text-field>
            <!-- <v-btn type="submit" :disabled="!validCard">Create Card</v-btn> -->
          </v-form>
          <v-progress-linear
            v-if="creatingCard"
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
  name: 'card-form',
  props: ['listId', 'boardId', 'user'],
  data: () => ({
    creatingCard: false,
    validCard: false,
    card: {
      title: '',
      members: [],
    },
    notEmptyRules,
  }),
  methods: {
    ...mapMutations('app', ['pushSnack']),
    async createCard() {
      if (this.validCard) {
        const { Card } = this.$FeathersVuex;
        const card = new Card({
          boardId: this.boardId,
          listId: this.listId,
          title: this.card.title,
          members: [],
        });
        this.creatingCard = true;
        await card.save().then(() => {
          this.pushSnack({
            snack: { message: this.$t('views.cards.cardCreated') },
            level: LEVEL.SUCCESS,
          });
        }).catch((e) => {
          this.pushSnack({
            snack: { message: this.$t('views.cards.cardNotCreated') },
            level: LEVEL.ERROR,
          });
        });
        this.creatingCard = false;
        this.card = {
          title: '',
          members: [],
        };
      }
    },
  },
};
</script>
