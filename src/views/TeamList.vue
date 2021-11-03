<template>
  <div>
    <teams-data-table
      v-if="teams.length > 0"
      :items="teams"
    >
    </teams-data-table>
  </div>
</template>

<script>
import api from '@/api/services'
import { mapMutations, mapState } from 'vuex';
export default {
  components: {
    TeamsDataTable:() => import('@/components/TeamsDataTable')
  },
  computed: {
    ...mapState(['teams']),
    ...mapMutations(['setTeams'])
  },
  created() {
    if (this.teams.length == 0) {
      this.getTeams()
    }
  },
  methods: {
    async getTeams() {
      try {
        let { data } = await api.teams()
        this.$store.commit('setTeams', this.addFavoriteTeamProperty(data))
      } catch (error) {
        this.EventBus.$emit('showSnackbar', {
          snackbarMessage: this.$t('snackbar.error.teamlist'),
          snackbarColor: 'error'
        });
      }
    },
    addFavoriteTeamProperty(teams) {
      teams.forEach(team => {
        team.isFavorite = false
      });
      return teams
    }
  }
}
</script>