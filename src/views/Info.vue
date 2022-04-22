<template>
  <v-app>
      <div class="pa-10">
      </div>
  </v-app>
</template>

<script>
export default {
    data(){
        return{
      direction: 'bottom',
      fab: false,
      transition: 'slide-y-reverse-transition',
        }
    }
}
</script>

<style>
  #create .v-speed-dial {
    position: absolute;
  }

  #create .v-btn--floating {
    position: relative;
  }
</style>