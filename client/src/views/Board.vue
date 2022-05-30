<!-- eslint-disable -->

<template>
<div
    :style="{
    'background-image': `url(${board.background})`,
    'background-size': 'cover',
    'height': '100%'
  }"
>
    <v-text-field
      v-model="board.name"
      single-line
      solo-inverted
      color="white"
      dark
      @change="changeBoardName"
    ></v-text-field>
  <v-container
    fluid
    >

      <v-layout>
        <v-flex xs10>
          <v-layout row wrap>
            <v-container v-if="loadingBoard || loadingLists">
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
            <v-flex container xs12>
              <v-layout row wrap v-if="!loadingLists">
                <v-flex sm3 v-for="list in lists" :key="list._id" pa-2>
                  <cards
                    :list="list"
                    :setDroppingList="onSetDroppingList"
                    :droppingList="droppingList"
                    :cardsByListId="cardsByListId"
                    :startDraggingCard="startDraggingCard"
                    :dropCard="dropCard"
                    :user="user ? user.user : {}"
                  ></cards>
                </v-flex>
                <list-form
                  :creatingList="creatingList"
                  :createList="createList"
                ></list-form>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
  </v-container>
</div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import ListForm from '../components/form/ListForm.vue';
import Cards from '../components/Cards.vue';

export default {
  name: 'board',
  components: {
    ListForm,
    Cards,
  },
  data: () => ({
    board: {},
  }),
  async mounted() {
    this.getBoard(this.$route.params.id);
    this.board = await this.getBoard(this.$route.params.id);
    this.findLists({
      query: {
        boardId: this.$route.params.id,
      },
    });

    this.findCards({
      query: {
        boardId: this.$route.params.id,
      },
    });
  },
  methods: {
    ...mapMutations('board', ['setDroppingList', 'setDraggingCard']),
    ...mapActions('boards', { getBoard: 'get' }),
    ...mapActions('lists', { findLists: 'find' }),
    ...mapActions('cards', { findCards: 'find' }),
    async createList(list) {
      const { List } = this.$FeathersVuex;
      list.boardId = this.$route.params.id;
      const newList = new List(list);
      await newList.save();
    },
    startDraggingCard(card) {
      this.setDraggingCard(card);
    },
    onSetDroppingList(event, list) {
      event.preventDefault();
      this.setDroppingList(list);
    },
    async dropCard() {
      if (this.droppingList) {
        if (this.draggingCard.listId !== this.droppingList._id) {
          const fromList = this.lists.find(list => list._id === this.draggingCard.listId);
          const toList = this.lists.find(list => list._id === this.droppingList._id);
          this.draggingCard.listId = this.droppingList._id;
          await this.draggingCard.save();
        }
      }
      this.setDroppingList(null);
      this.setDraggingCard(null);
    },
    async changeBoardName() {
      const { Board } = this.$FeathersVuex;
      const newBoard = new Board({
        _id: this.$route.params.id,
        name: this.board.name,
      });
      await newBoard.save();
    },
  },
  computed: {
    ...mapState('board', ['droppingList', 'draggingCard']),
    ...mapState('auth', { user: 'payload' }),
    ...mapState('boards', { loadingBoard: 'isGetPending'}),
    ...mapState('lists', {
      loadingLists: 'isFindPending',
      creatingList: 'isCreatePending',
      listsError: 'errorOnfind',
    }),
    ...mapState('cards', {
      cardsError: 'errorOnfind',
    }),
    ...mapGetters('lists', { findListsInStore: 'find' }),
    ...mapGetters('cards', { findCardsInStore: 'find' }),
    lists() {
      return this.findListsInStore({
        query: {
          boardId: this.$route.params.id,
        },
      }).data;
    },
    cards() {
      return this.findCardsInStore({
        query: {
          boardId: this.$route.params.id,
        },
      }).data;
    },
    cardsByListId() {
      return this.cards.reduce((byId, card) => {
        byId[card.listId] = byId[card.listId] || [];
        byId[card.listId].push(card);
        return byId;
      }, {});
    },
  },
};
</script>
