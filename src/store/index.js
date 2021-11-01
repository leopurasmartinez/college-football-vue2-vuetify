import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const initialState = () => ({
  accessToken: 'mHtMNihKwj/U1Gk8w5dNhpAaSqMy5l4tHmYWDzo1BIUNHgXIIWCNk2H4Dyhaow20',
  favoriteTeams: [],
  teams: [],
})

export default new Vuex.Store({
  state: initialState,
  plugins: [createPersistedState({
    storage: window.localStorage
  })],
  mutations: {
    setTeams(state, payload) {
      state.teams = payload
    },
    addTeamToFavorites(state, team) {
      state.teams[state.teams.indexOf(team)].isFavorite = true
      team.isFavorite = true
      state.favoriteTeams.push(team)
    },
    removeTeamFromFavorites(state, team) {
      state.favoriteTeams.splice(state.favoriteTeams.indexOf(team), 1)
      const index = state.teams.map(team => team.id).indexOf(team.id);
      state.teams[index].isFavorite = false
    },
  },
  actions: {
  },
  modules: {
  }
})
