<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      app
      fixed
    >

      <v-list nav>
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            @click="$router.push(item.path)"
          >
            <v-list-item-icon>
              <v-icon color='info'>{{ item.icon }}</v-icon>
            </v-list-item-icon>
  
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

    </v-navigation-drawer>
    <v-app-bar>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ $t($route.name) }}</v-toolbar-title>
    </v-app-bar>

    <v-container fluid class="mt-5">
      <router-view></router-view>
    </v-container>

  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedItem: 1,
      drawer: false,
      items: [
        {
          icon: 'mdi-football',
          title: this.$t('teamList'),
          path: '/',
        },       
        {
          icon: 'mdi-heart',
          title: this.$t('team.favorites'),
          path: '/favoriteteams',
        },
      ]
    }
  }
}
</script>
