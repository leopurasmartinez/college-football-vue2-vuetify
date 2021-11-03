<template>
  <div>
    <v-card-text>{{ $tc('team.myFavorites', favoriteTeams.length, {'number': favoriteTeams.length})}}</v-card-text>

    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      :label="$t('common.search')"
      single-line
      hide-details
    ></v-text-field>
    
    <v-card class="mt-10">
      <v-data-table
        :headers="headers"
        :items="favoriteTeams"
        :search="search"
      >
        <template v-slot:[`item.color`]="{ item }">
          <v-chip
            v-if="item.color"
            :color="item.color"
          >
          </v-chip>
        </template>

        <template v-slot:[`item.logos`]="{ item }" max-width="90px">
          <div class="p-2" v-if="item.logos">
            <v-img :src="item.logos[0]" alt="" max-width="90px"></v-img>
          </div>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="viewTeamInfo(item)"
            color="info"
          >
            mdi-information-outline
          </v-icon>

          <v-icon
            small
            class="mr-2"
            @click="showDialog(item)"
            color="error"
          >
            mdi-delete-forever
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <SimpleDialog
      :isShowDialog="isShowDialog"
      :text="$t('team.deleteFavorite', { name: selectedTeam.school })"
      @accept="deleteFavorite"
      @cancel="hideDialog()"
    >
    </SimpleDialog>
    
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  components: {
    SimpleDialog:() => import('@/components/SimpleDialog'),
  },
  data () {
    return {
      headers: [
        { text: this.$t('teamHeaders.logos'), align: 'center', value: 'logos', sortable: false },
        { text: this.$t('teamHeaders.school'), align: 'start', value: 'school' },
        { text: this.$t('teamHeaders.mascot'), value: 'mascot' },
        { text: this.$t('teamHeaders.color'), value: 'color', sortable: false },
        { text: this.$t('teamHeaders.location'), value: 'location.city' },
        { text: this.$t('teamHeaders.note'), value: 'note' },
        { text: this.$t('common.actions'), value: 'actions', sortable: false },
      ],
      isShowDialog: false,
      search: '',
      selectedTeam: '',  
    }
  },
  computed: {
    ...mapState(['favoriteTeams']),
  },
  methods: {
    viewTeamInfo(team) {
      this.globals.viewTeamInfo(team)
    },
    deleteFavorite() {
      this.$store.commit('removeTeamFromFavorites', this.selectedTeam)
      this.isShowDialog = false
    },
    hideDialog() {
      this.isShowDialog = false
    },
    showDialog(team) {
      this.selectedTeam = team
      this.isShowDialog = true
    },
  }
}
</script>