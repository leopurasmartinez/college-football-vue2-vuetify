<template>
  <v-snackbar
    :color="color"
    v-model="isShowSnackbar"
    rounded="pill"
  >
    {{ message }}
  </v-snackbar>
</template>

<script>
export default {
  props: {
    color: { type: String, required: true },
    message: { type: String, required: true }
  },
  data() {
    return {
      isShowSnackbar: true
    }
  },
  mounted() {
    this.closeSnackBar();
  },
  methods: {
    closeSnackBar() {
      setTimeout(() => {
        this.isShowSnackbar = false;
        this.$emit('close');
      }, 8000);
    }
  }
}
</script>
