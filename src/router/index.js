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
    path: '/team/:name',
    name: 'team',
    component: () => import('@/views/TeamInfo'),
    props: true
  },
  {
    path: '/favoriteteams',
    name: 'team.favorites',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/FavoriteTeams.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
