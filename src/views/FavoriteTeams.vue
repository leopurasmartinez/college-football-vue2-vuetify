<template>
  <div>
    <h1>{{ $t($route.name) }}</h1>
      <v-card-text>Tiene {{ favoriteTeams.length }} favoritos</v-card-text>

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        :label="$t('common.search')"
        single-line
        hide-details
      ></v-text-field>
      
    <v-card>
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
      @dialog:accept="deleteFavorite"
      @dialog:cancel="hideDialog()"
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
        { text: 'Logos', align: 'center', value: 'logos' },
        { text: 'School', align: 'start', value: 'school' },
        { text: 'Mascot', value: 'mascot' },
        { text: 'Color', value: 'color', sortable: false },
        { text: 'Location', value: 'location.city' },
        { text: 'Note', value: 'note' },
        { text: 'Actions', value: 'actions', sortable: false },
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
      this.$router.push({name: 'team', params: { name: team.school, team: team }})
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