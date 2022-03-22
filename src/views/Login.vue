<template>
  <v-app>
      <v-container fill-height fluid text-center >
        <v-container> 
          <v-card class="mx-auto my-12" max-width="500" elevation="0">
          <v-col
            class="text-center text-h3">
            <div class="primary">
              <span 
              class="white--text"
              >
              Shop
              </span>
            </div>
            <div style="border-style:solid;border-width:3px;border-color:#1976D2;">
              <span 
              class="primary--text"
              >
              WorkSpace
              </span>
            </div>
          </v-col>
          </v-card>      
          <v-card class="mx-auto my-12" max-width="500">
          <v-col
            class="text-center pb-10 text-h1 primary--text mt-15"
            ><b>Login</b>
          </v-col>
          <v-row class="pa-5">
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