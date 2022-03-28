<template>
  <v-app :style="{'background-image':'url(https://images5.alphacoders.com/456/thumb-1920-456536.jpg)'}">
      <v-container fill-height fluid text-center >
        <v-container>  
          <!-- Login 
          --
          --
          --
          --
          --
          -->     
          <v-card dark class="mx-auto my-12" max-width="500" elevation="2"  v-if="loginValid">
          <v-card-text class="text-h2 white" style="color:black;"><span class="success--text">Shop</span><span class="dark--text">Work</span><span class="dark--text">Space</span></v-card-text>
          <div>
          <v-col
              class="text-center text-h2 primary-text mt-15"
            >Login
          </v-col>
          </div>
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
            <v-alert
              v-model="validUser"
              color="warning"
              dismissible
              outlined
              type="warning"
            >Esta conta não existe, crie uma em <span class="text-decoration-underline success--text">registrar.</span></v-alert>
            <v-alert
              v-model="validUserAuth"
              color="warning"
              dismissible
              outlined
              type="warning"
            >Usuário ou senha inválidos.</v-alert>
            <v-btn class="ma-2" outlined color="white" @click="reset">Cancelar</v-btn>
            <v-btn outlined color="primary" @click="login()">Login</v-btn>
            <v-btn text color="success" class="ml-2 text-decoration-underline" @click="registerValid = true, loginValid = false">Registrar</v-btn>
            </v-form>
          </v-col>
          </v-row>
          </v-card>
          <!-- Register 
          --
          --
          --
          --
          --
          -->
          <v-card dark class="mx-auto my-12" max-width="500" v-if="registerValid" elevation="2">
          <v-card-text class="text-h2 white text-decoration-underline" style="color:black;">ShopWorkSpace</v-card-text>
          <v-col
              class="text-center text-h2 primary-text mt-15"
            >Registrar
          </v-col>
          <v-row class="pa-5">
          <v-col>
            <v-form>
              <v-text-field label="Nome da empresa" v-model="user.nome"></v-text-field>
              <v-text-field label="Email" v-model="user.email"></v-text-field>
              <v-text-field label="CNPJ" v-model="user.cnpj"></v-text-field>
              <v-text-field 
              label="Senha"
              v-model="user.password"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
              ></v-text-field>
            <v-alert
              v-model="userExiste"
              color="warning"
              dismissible
              outlined
              type="warning"
            >Este email já está em uso.</v-alert>
            <v-btn outlined class="ma-2" color="white" @click="reset">Cancelar</v-btn>
            <v-btn outlined color="green" @click="criarNovaConta()" style="color:white">Registrar</v-btn>
            <v-btn text color="info" class="ml-2 text-decoration-underline" @click="registerValid = false, loginValid = true">Login</v-btn>
            </v-form>
          </v-col>
          </v-row>
          </v-card>
        </v-container>
      </v-container>
  </v-app>
</template>

<script>
import * as fb from '@/plugins/firebase'
export default {
  data(){
    return{
      userExiste:false,
      validUserAuth:false,
      validUser:false,
      loginValid:true,
      registerValid:false,
      show: false,
      user:{},
    }
  },
  methods:{
    reset() {
      this.user = {};
    },
    async login() {
      try {
        await fb.auth.signInWithEmailAndPassword(
          this.user.email,
          this.user.password
        );
        this.$router.push({ name: "Home" });
      } catch (error) {
        const errorCode = error.code;
        switch (errorCode) {
          case "auth/wrong-password":
            this.validUserAuth = true;
            this.user = {};
            break;
          case "auth/invalid-email":
            this.validUserAuth = true;
            this.user = {};
            break;
          case "auth/user-not-found":
            this.validUser = true;
            this.user = {};
            break;
          default:
            this.errorLogin = true;
            break;
        }
      }
    },
    async criarNovaConta() {
    try{
      await fb.auth.createUserWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      this.login();
      this.registrarPerfil()
      }catch (error){
        const errorCode = error.code;
        switch (errorCode) {
          case "auth/email-already-in-use":
            this.userExiste = true;
            this.user = {};
            break;
          default:
            this.userExiste = true;
            break;
        }
      }
    },
    async registrarPerfil(){
      this.uid = fb.auth.currentUser.uid;
      await fb.perfilCollection.add({            
        owner: this.uid,
        nomeEmpresa: this.user.nome,
        email: this.user.email,
        CNPJ: this.user.cnpj,
        });
        this.user = {}
    }
  }
}
</script>

<style>
</style>