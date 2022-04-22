<template>
    <v-app>
      <div class="pa-5">
        <div style="border-left-style:solid;border-left-color:purple;border-left-width:8px;padding-left:10px;" class="text-h4 my-8">Crie seus lembretes aqui!</div>
        <div style="color:gray;" class="h5 mt-2 mb-4">
        <v-alert
        outlined
        type="info"
        color="purple"
        >
        Crie seus lembretes para não se esqueçer de seus compromissos.
        </v-alert>
        </div>
        <div class="text-h2 mt-10 purple--text">Lembretes</div>
        <v-card  outlined class="mt-8">
          <v-card-title>Quadro<v-spacer></v-spacer><v-btn fab dark class="purple"><v-icon dark>mdi-plus</v-icon></v-btn></v-card-title>
          <v-card
            elevation="10"
            color="purple lighten-4"
            max-width="500px"
            class="ma-5 black--text"
            shaped
          >
            <v-card-title class="text-h5 purple white--text">
              Nome lembrete
              <v-spacer></v-spacer>
              <v-icon color="white">mdi-close</v-icon>
            </v-card-title>

            <v-card-subtitle class="mt-1 black--text pa-3">Listen to your favorite artists and albums whenever and wherever, online and offline.</v-card-subtitle>
            <v-card-subtitle class="black--text"><b>De:</b><br><b>Para:</b></v-card-subtitle>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outlined class="black--text">
                feito
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-card>
      </div>
    </v-app>
</template>

<script>
export default {

}
</script>

<style>

</style>