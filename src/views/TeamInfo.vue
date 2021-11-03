<template>
  <div>

    <section class="relative py-10 bg-gray-100 shadow-2xl rounded" v-if="team">

      <div class="pl-10" v-if="team.isFavorite">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" viewBox="0 0 20 20" fill="red">
          <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
        </svg>
      </div>

      <div class="container mx-auto px-4">
        <div class="items-center flex flex-wrap">
          
          <div class="w-full md:w-4/12 ml-auto mr-auto px-4">
            <img
              alt="Team Logo"
              class="bg-white max-w-full rounded-lg shadow-lg rounded px-3"
              :src="team.logos[0]"
            />
          </div>

          <div class="w-full md:w-5/12 ml-auto mr-auto px-4 py-5 bg-white rounded">
            <div>
              <h3 class="text-4xl uppercase font-bold mt-2">{{ team.school }}</h3>

              <ul class="list-none mt-6">
                <li class="py-2" v-if="team.location.name">
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="blue">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <div>
                      <h4 class="text-xl">{{ team.location.name }}</h4>
                    </div>
                  </div>
                </li>

                <li class="py-2" v-if="team.location.city ||  team.location.state">
                  <div class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="blue">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    <div>
                      <h4 class="text-xl">{{ team.location.city }}, {{ team.location.state }}</h4>
                    </div>
                  </div>
                </li>

                <li class="py-2" v-if="team.location.year_constructed">
                  <div class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="blue">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    <div>
                      <h4 class="text-xl">{{ team.location.year_constructed }}</h4>
                    </div>
                  </div>
                </li>


                <li class="py-2" v-for="(item, index) in definedTeamData" :key="index">
                  <div class="flex items-center">
                    <h4 class="text-xl">
                      <span class="text-gray-500">{{ item.name }}:</span> 
                      <span v-if="utilities.isBooleanValue(item.value)">
                        <v-icon v-if="item.value" color="success">mdi-check</v-icon>
                        <v-icon v-else color="error">mdi-close</v-icon>
                      </span>
                      <span v-else>
                        {{ item.value }} 
                      </span>
                    </h4>
                  </div>
                </li>

              </ul>

              <p class="mt-4 text-lg leading-relaxed" v-if="team.color || team.alt_color">
                {{ $t('team.teamColors') }}
              </p>
              <v-btn
                class="disable-events"
                v-if="team.color"
                fab
                :color="team.color"
              >
              </v-btn>
              <v-btn class="ml-5 disable-events"
                v-if="team.alt_color"
                fab
                read-only
                :color="team.alt_color"
              >
              </v-btn>

              <p class="mt-4 text-lg leading-relaxed">
                {{ $t('team.alternateNames') }}

              </p>
              <div class="px-6">
                <span 
                  v-if="team.alt_name1"
                  class="inline-block bg-gray-300 px-3 py-2 text-sm font-semibold mr-2 text-gray-700 rounded-full">
                  {{ team.alt_name1 }}
                </span>
                <span 
                  v-if="team.alt_name2"
                  class="inline-block bg-gray-300 px-3 py-2 text-sm font-semibold mr-2 text-gray-700 rounded-full">
                  {{ team.alt_name2 }}
                </span>
                <span 
                  v-if="team.alt_name3"
                  class="inline-block bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 rounded-full">
                  {{ team.alt_name3 }}
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  props: {
    team: { type: Object, required: true }
  },
  computed: {
    definedTeamData () {
      return this.teamData.filter((item) => {
        return item.value != null
      })
    }
  },
  created() {
    if (this.team == undefined) {
      this.EventBus.$emit('showSnackbar', {
          snackbarMessage: this.$t('snackbar.error.noteam'),
          snackbarColor: 'error'
        });
    }
  },
  data () {
    return {
      teamData: [
        { name: this.$t('teamHeaders.mascot'), value: this.team.mascot },
        { name: this.$t('teamHeaders.conference'), value: this.team.conference },
        { name: this.$t('teamHeaders.division'), value: this.team.division },
        { name: this.$t('teamHeaders.elevation'), value: this.team.location.elevation },
        { name: this.$t('teamHeaders.capacity'), value: this.team.location.capacity },
        { name: this.$t('teamHeaders.grass'), value: this.team.location.grass },
        { name: this.$t('teamHeaders.dome'), value: this.team.location.dome },
      ]
    }
  }
}
</script>

<style scoped>
  .disable-events {
    pointer-events: none
  }
</style>