import Vue from 'vue'
import VueRouter from 'vue-router'
import TeamList from '../views/TeamList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'teamList',
    component: TeamList
  },
  {
    path: '/team/',
    name: 'team.info',
    component: () => import('@/views/TeamInfo'),
    props: true
  },
  {
    path: '/favoriteteams',
    name: 'team.favorites',
    component: () => import('@/views/FavoriteTeams.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
