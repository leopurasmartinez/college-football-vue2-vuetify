<template>
  <v-container>
    <v-dialog 
      v-model="isShowDialog"
      persistent
      scrollable
      min-width="290"
      :max-width="$vuetify.breakpoint.smAndDown ? '50%' : '33%'"
      height="290"
    >
      <v-card>
        <v-card-title>
          {{ header }}
        </v-card-title>
        <v-card-text
          style="max-height:300px;"
          class="text-center"
        >
          <span v-html="text" />
        </v-card-text>

        <v-card-text v-if="isShowTextarea">
          <v-textarea
            filled
            :label="$t('common.addNote')"
            auto-grow
            clearable
            clear-icon="mdi-close-circle"
            v-model="textareaText"
          ></v-textarea>
        </v-card-text>

        <v-card-actions
          class="justify-space-between"
        >
          <v-btn
            v-if="cancelable"
            text
            rounded
            color="error"
            @click="$emit('dialog:cancel')"
          >
            {{ $t('common.cancel')}}
          </v-btn>
          <v-btn
            text
            rounded
            color="primary"
            :block="!cancelable"
            @click="accept()"
          >
            {{ $t('common.accept')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  props: {
    cancelable: { type: Boolean, default: true },
    isShowDialog: { type: Boolean, required: true },
    isShowTextarea: { type: Boolean, required: false, default: false },
    header: { type: String, required: false },
    text: { type: String, required: true },
  },
  data () {
    return {
      textareaText: ''
    }
  },
  methods: {
    accept() {
      this.$emit('dialog:accept', this.textareaText)
    }
  }
}
</script>