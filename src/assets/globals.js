import router from '@/router'

export default {
  viewTeamInfo(team) {
    router.push({name: 'team.info', params: { team: team }})
  },
}