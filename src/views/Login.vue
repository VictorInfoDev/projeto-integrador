<template>
  <v-app>
      <v-container fill-height fluid text-center >
        <v-container>
          <v-card max-width="500" class="mx-auto my-12 pa-5">
          <v-row>
             <v-col
              class="primary--text text-center pb-4"
              ><h1 class="h1">Login</h1></v-col
              >
          </v-row>
          <v-row>
          <v-col>
            <v-form>
              <v-text-field label="Email" v-model="user.email"></v-text-field>
              <v-text-field 
              label="Senha"
              v-model="user.password"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
              ></v-text-field>
            <v-btn color="primary" @click="login">Login</v-btn>
            <v-btn color="green" class="ml-2" style="color:white" @click="login">Registrar</v-btn>
            <v-btn class="ma-2" color="warning" @click="reset">Cancelar</v-btn>
            </v-form>
          </v-col>
          </v-row>
          </v-card>
        </v-container>
      </v-container>
  </v-app>
</template>

<script>
export default {
  data(){
    return{
      show: false,
      user:{},
    }
  }
}
</script>

<style>
</style>