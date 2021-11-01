<template>
  <v-container fluid>
    <v-card
      class="ma-12 pa-4"
      elevation="10"
    >
  
      <v-img
        :src="team.logos[0]"
        aspect-ratio="5"
        contain
      ></v-img>

      <v-card-title>{{ team.school }}</v-card-title>

      <v-card-text>{{ team.mascot }}</v-card-text>
  
      <v-card-text>
        <v-row
          align="center"
          class="mx-0"
        >
          <div>
            {{ team.mascot }}
          </div>
          <div class="grey--text ms-4">
          </div>
        </v-row>
  
        <div class="my-4 text-subtitle-1">
          {{ team.alt_name1 }} • {{ team.alt_name2 }} • {{ team.alt_name3}}
        </div>
  
      </v-card-text>
  
      <v-divider class="mx-4"></v-divider>
  
      <v-card-title>Location</v-card-title>
  
      <v-card-text>

      </v-card-text>
      
    </v-card>
  </v-container>
</template>


<script>
export default {
  props: {
    name: { type: String },
    team: { type: Object }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>