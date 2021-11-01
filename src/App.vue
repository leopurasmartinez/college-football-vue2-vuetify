<template>
  <v-app>
    <NavigationDrawer>
    </NavigationDrawer>
    <Snackbar
      :color="snackbarColor"
      :message="snackbarMessage"
      v-if="isShowSnackbar"
    >
    </Snackbar>
  </v-app>
  
</template>

<script>
export default {
  components: {
    NavigationDrawer: () => import('@/components/NavigationDrawer'),
    Snackbar: () => import('@/components/Snackbar')
  },
  mounted() {
    this.EventBus.$on('showSnackbar', (data) => {
      this.fillAndShowSnackbar(data)
    });
  },
  data() {
    return {
      isShowSnackbar: false,
      snackbarColor: '',
      snackbarMessage: ''
    }
  },
  methods: {
    fillAndShowSnackbar(data) {
      this.snackbarColor = typeof data.snackbarColor !== 'undefined' ? data.snackbarColor : 'success'
      this.snackbarMessage = data.snackbarMessage
      this.isShowSnackbar = true
    },
  }
}
</script>
<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
