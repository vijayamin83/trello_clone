<!-- eslint-disable -->
<template>
  <v-flex flex xs12 sm6 md4 lg2 xl1 pa-2 md-12>
    <v-expansion-panels>
      <v-expansion-panel>
      <v-expansion-panel-header>
        <template v-slot:default="{}">
          <v-row no-gutters >
            <v-col class="text-decoration-underline" cols="8">
              {{$t('views.lists.addLists')}}
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
            v-if="!creatingList"
            v-model="validList"
            @submit.prevent="onCreateList"
            @keydown.prevent.enter>
            <v-text-field
              v-model="list.name"
              :rules="notEmptyRules"
              label="Name"
              required
            ></v-text-field>
            <v-btn class="success" type="submit" :disabled="!validList">Create</v-btn>
          </v-form>
          <v-progress-linear
            v-if="creatingList"
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
  props: ['creatingList', 'createList'],
  data: () => ({
    validList: false,
    list: {
      name: '',
    },
    notEmptyRules,
  }),
  methods: {
    ...mapMutations('app', ['pushSnack']),
    async onCreateList() {
      if (this.validList) {
        await this.createList({
          name: this.list.name,
        }).then(() => {
          this.pushSnack({
            snack: { message: this.$t('views.lists.listCreated') },
            level: LEVEL.SUCCESS,
          });
        }).catch((e) => {
          this.pushSnack({
            snack: { message: this.$t('views.lists.listNotCreated') },
            level: LEVEL.ERROR,
          });
        });
        this.list = {
          name: '',
        };
      }
    },
  },
};
</script>
