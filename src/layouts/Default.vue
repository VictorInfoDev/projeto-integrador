<template>
  <v-app>
    <!-- bar-top -->
    <div>
    <v-app-bar app dark v-for="info in infos" :key="info.id">
      <v-app-bar-nav-icon @click.stop="sidebar = !sidebar"></v-app-bar-nav-icon>
      <span style="font-size:25px;">{{  info.nome  }}</span>
      <v-spacer></v-spacer> 
      <!-- menu -->
      <v-menu
      transition="slide-y-transition"
      bottom
      >
      <template v-slot:activator="{ on, attrs }"><v-icon v-bind="attrs" v-on="on" class="mr-5">mdi-store-cog</v-icon></template>
      <v-list class="primary">
        <v-list-item class="text-center white--text">
          <v-list-item-title class="text-h5">{{  info.nome  }}</v-list-item-title>
        </v-list-item>
      </v-list> 
      <v-list>
        <v-list-item class="">
          <v-list-item-title class=""><strong>Email: </strong>{{  info.emailMenu  }}</v-list-item-title>
        </v-list-item>
        <v-list-item class="">
          <v-list-item-title class=""><strong>CNPJ: </strong>{{  info.cnpjMenu  }}</v-list-item-title>
        </v-list-item>
        <v-list-item class="" to="/Info">
          <v-list-item-title class=""><v-icon class="mr-2">mdi-cog</v-icon>Configurações</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="text-center" to="/login">
          <v-list-item-title class="error--text text-h6">Sair</v-list-item-title>
        </v-list-item>
      </v-list> 
      </v-menu>
    </v-app-bar>
    </div>
    <!-- dialogSair -->
    <v-dialog v-model="dialogSair" persistent max-width="300px">
      <v-card color="blue-grey darken-2">
        <v-card-title class="white--text">
          Deseja sair de sua conta?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text class="white--text" @click="dialogSair = false">
            Fechar
          </v-btn>
          <v-btn to="/login" class="error">
            Sair
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- drawer -->
     <v-navigation-drawer app v-model="sidebar" dark v-for="info in infos" :key="info.id">
      <v-list dense>
        <v-list-item>
          <v-list-item-action>
            <v-icon @click.stop="sidebar = !sidebar">mdi-chevron-left</v-icon>
          </v-list-item-action>
          <v-list-item-title>
            <h3>Gerenciador da Loja</h3>
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <v-list-item class="px=2">
        <v-list-item-avatar>
          <v-icon>mdi-store</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>{{  info.nome  }}</v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="item of items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
        <v-list-item @click="sairUser()">
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Sair
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div class="ma-5">
      <v-switch
        class="nightMode"
        v-model="$vuetify.theme.dark"
        hint="Descanse um pouco seus olhos."
        inset
        label="Night Mode"
        persistent-hint
      ></v-switch>
      </div>
    </v-navigation-drawer>
    <v-main> 
      <router-view></router-view>
    </v-main>

  </v-app>
</template>
<script>
import * as fb from '@/plugins/firebase'
export default {
  data(){
    return{
      menuUser:true,
      nightMode:false,
      dialogSair: false,
      sidebar:true,
      infos:[],
      items: [
        { title: "Home", icon: "mdi-home", to: "/" },
        { title: "Venda", icon: "mdi-basket-unfill", to: "/Venda" },
        { title: "Produtos", icon: "mdi-basket", to: "/Produtos" },
        { title: "Lembretes", icon: "mdi-clipboard-outline", to: "/Lembretes" },
        { title: "Informações", icon: "mdi-store-cog", to: "/Info" },
      ],

    }
  },
  mounted(){
    this.buscarInfo();
  },
  methods: {
    sairUser(){
      this.dialogSair = true
    },
    async buscarInfo (){
      this.uid = fb.auth.currentUser.uid;
      this.infos = [];
      const logTasks = await fb.perfilCollection.where("owner","==",this.uid).get();
        for (const doc of logTasks.docs) {
          this.infos.push({
            nome: doc.data().nomeEmpresa,
            cnpjMenu: doc.data().CNPJ,
            emailMenu: doc.data().email
            })
          }
    }
  }
}
</script>
