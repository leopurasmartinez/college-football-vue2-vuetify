<template>
  <div>
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
        :items="items"
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
            @click.once="showDialog(item)"
            :color="item.isFavorite ? 'red' : 'grey'"
          >
            mdi-heart
          </v-icon>

          <v-icon
            small
            class="mr-2"
            @click="viewTeamInfo(item)"
            color="info"
          >
            mdi-information-outline
          </v-icon>
        </template>

      </v-data-table>
    </v-card>

    <SimpleDialog
      :isShowDialog="isShowDialog"
      :isShowTextarea='true'
      :text="$t('team.addFavorite', { name: selectedTeam.school })"
      @dialog:accept="addTeamToFavorites"
      @dialog:cancel="hideDialog()"
    >
    </SimpleDialog>

  </div>
</template>

<script>
export default {
  components: {
    SimpleDialog:() => import('@/components/SimpleDialog'),
  },
  props: {
    items: { type: Array, required: false },
  },
  data () {
    return {
      headers: [
        { text: 'Logos', align: 'center', value: 'logos' },
        { text: 'School', align: 'start', value: 'school' },
        { text: 'Mascot', value: 'mascot' },
        { text: 'Color', value: 'color', sortable: false },
        { text: 'Location', value: 'location.city' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      isShowDialog: false,
      search: '',
      selectedTeam: {},
    }
  },
  methods: {
    addTeamToFavorites(note) {
      if (note) this.selectedTeam.note = note 
      this.$store.commit('addTeamToFavorites', this.selectedTeam)
      this.isShowDialog = false
      this.EventBus.$emit('showSnackbar', {
        snackbarMessage: this.$t('snackbar.success.teamadded'),
        snackbarColor: 'success'
      });
    },
    hideDialog() {
      this.isShowDialog = false
    },
    showDialog(team) {
      this.selectedTeam = team
      this.isShowDialog = true
    },
    viewTeamInfo(team) {
      this.$router.push({name: 'team', params: { name: team.school, team: team }})
    }
  }
}
</script>