<!-- eslint-disable -->
<template>
  <v-card
    :style="{
      'background-color': `${this.showColor}`
    }"
    @dragover="setDroppingList($event, list)"
    :class="{
      'green lighten-4': droppingList == list
    }">
    <v-card-title primary-title>
        <v-flex xs12 d-flex>
          <v-col sm="6">
            <div v-if="!isEdit" class="headline">{{list.name}}</div>
            <v-text-field
              v-if="isEdit"
              v-model="list.name"
              solo-inverted
              flat
            ></v-text-field>
          </v-col>
            <v-col
              cols="6"
              md="4"
              style="display:flex;"
            >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  plain
                  class="primary--text"            
                  v-bind="attrs"
                  v-on="on"
                  >
                    <div v-if="!isEdit"  @click="isEdit = !isEdit">
                      <v-icon>mode_edit</v-icon>
                    </div> 
                    <div v-if="isEdit"  @click="editList">
                      <v-icon>save</v-icon>
                    </div>            
                </v-btn>
              </template>
              <span>{{$t('views.cards.editMessage')}}</span>
            </v-tooltip>
           <v-menu
            offset-x
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>more_horiz</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
              >
                <v-list-item-title class="d-flex">
                  <v-avatar size="56">
                    <img
                      alt="user"
                      :src="this.user.imageUrl"
                    >
                  </v-avatar>
                  <v-list class="d-flex flex-column pa-2">
                  <v-list-item-title>
                    {{this.user.username}}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{this.toDate(list.createdAt)}}
                  </v-list-item-subtitle>
                  </v-list>
                </v-list-item-title>
              </v-list-item>
              <v-menu
                offset-x
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    :style="{
                      'background-color': `${hex}`
                    }"
                  >
                    {{$t('views.lists.bgColor')}}
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                      <v-icon v-bind="attrs" v-on="on">format_color_fill</v-icon>
                      </template>
                      <span>{{$t('views.lists.bgColorMessage')}}</span>
                    </v-tooltip>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <v-color-picker
                      v-model="color"
                      dot-size="25"
                      swatches-max-height="200"
                    ></v-color-picker>
                  </v-list-item>
                </v-list>
            </v-menu>
            <v-list-item>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                  plain
                  class="error--text"
                  @click="removeList"
                  v-bind="attrs"
                  v-on="on"
                  >
                    <div>
                    <v-icon>remove_circle</v-icon>
                    {{$t('views.lists.deleteCard')}}
                    </div>
                  </v-btn>
                </template>
                <span>{{$t('views.lists.deleteMessage')}}</span>
              </v-tooltip>
            </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-flex>
      <v-layout column v-if="cardsByListId[list._id]">
        <v-flex xs12
          v-for="card in cardsByListId[list._id]"
          :key="card._id"
          class="pa-1"
          >
          <v-card draggable="true" @dragstart="startDraggingCard(card)" @dragend="dropCard()">
            <v-container fluid>
              <v-layout row>
                <v-flex class="d-flex justify-space-between align-center pa-2">
                  <div>
                    <div class="headline caption">{{card.title}}</div>
                  </div>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn 
                      class="red--text" 
                      icon 
                      @click="removeCard(card)"
                      v-bind="attrs"
                      v-on="on"
                      >
                        <v-icon size="20">
                          delete_forever
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>{{$t('views.cards.deleteMessage')}}</span>
                  </v-tooltip>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-card-actions>
      <card-form
        :user="user"
        :listId="list._id"
        :boardId="$route.params.id"
        >
      </card-form>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex';
import { LEVEL } from '../utils/log';
import CardForm from './form/CardForm.vue';

export default {
  props: [
    'list',
    'setDroppingList',
    'droppingList',
    'cardsByListId',
    'startDraggingCard',
    'dropCard',
    'user',
  ],
  data: () => ({
    type: 'hex',
    hex: '#FFFFFF',
    isEdit: false
  }),
  components: {
    CardForm,
  },
  mounted() {
    this.hex = this.list.background;
  },
  computed: {
    color: {
      get() {
        return this[this.type];
      },
      set(v) {
        this[this.type] = v;
      },
    },
    showColor() {
      if (typeof this.color === 'string') {
        // eslint-disable-next-line
        this.hex = this.color;
        return this.color;
      }
      return JSON.stringify(Object.keys(this.color).reduce((color, key) => {
        color[key] = Number(this.color[key].toFixed(2));
        // eslint-disable-next-line
        this.hex = this.color;
        return color;
      }, {}), null, 2);
    },
  },
  watch: {
    async hex(val) {
      const { List } = this.$FeathersVuex;
      const newList = new List({
        _id: this.list._id,
        background: val,
      });
      await newList.save();
    },
  },
  methods: {
    ...mapMutations('app', ['pushSnack']),
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
    async removeList() {
      const cardList = this.cardsByListId[this.list._id];
      if (cardList && cardList.length > 0) {
        await cardList.map(async (card) => {
          await card.remove({
            _id: card._id,
          });
        });
      }
      const { List } = this.$FeathersVuex;
      const newList = new List(this.list);
      await newList.remove({
        _id: this.list._id,
      }).then(() => {
        this.pushSnack({
          snack: { message: this.$t('views.lists.listDeleted') },
          level: LEVEL.SUCCESS,
        });
      }).catch((e) => {
        console.log(e);
        this.pushSnack({
          snack: { message: this.$t('views.lists.listNotDeleted') },
          level: LEVEL.ERROR,
        });
      });
    },
    async editList() {
      const { List } = this.$FeathersVuex;
      const newList = new List(this.list);
      await newList.save({
        _id: this.list._id,
        name: this.list.name
      }).then(() => {
        this.pushSnack({
          snack: { message: this.$t('views.lists.listUpdated') },
          level: LEVEL.SUCCESS,
        });
        this.isEdit = false;
      }).catch((e) => {
        console.log(e);
        this.isEdit = false;
        this.pushSnack({
          snack: { message: this.$t('views.lists.listNotUpdated') },
          level: LEVEL.ERROR,
        });
      });
    },
    async removeCard(card) {
      await card.remove({
        _id: card._id,
      }).then(() => {
        this.pushSnack({
          snack: { message: this.$t('views.cards.cardDeleted') },
          level: LEVEL.SUCCESS,
        });
      }).catch((e) => {
        console.log(e);
        this.pushSnack({
          snack: { message: this.$t('views.cards.cardNotDeleted') },
          level: LEVEL.ERROR,
        });
      });
    },
  },
};
</script>
