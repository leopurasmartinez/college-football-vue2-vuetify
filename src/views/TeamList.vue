<template>
  <div>
    <h1>{{ $t($route.name) }}</h1>
      <teams-data-table
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
  data () {
    return {
    }
  },
  created() {
    if (!localStorage.getItem('vuex')) {
      this.getTeams()
    }
  },
  methods: {
    async getTeams() {
      try {
        let { data } = await api.teams()
        data.forEach(element => {
          element.isFavorite = false
        });
        this.$store.commit('setTeams', data)
      } catch (error) {
        this.EventBus.$emit('showSnackbar', {
          snackbarMessage: this.$t('snackbar.error.teamlist'),
          snackbarColor: 'error'
        });
      }
    },
  }
}
</script>