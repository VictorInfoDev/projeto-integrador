<template>
  <v-app>
    <!-- bar-top -->
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="sidebar = !sidebar"></v-app-bar-nav-icon>
      <span style="font-size:25px;">Nome Loja</span>
      <v-spacer></v-spacer>
      <v-icon>mdi-store-cog</v-icon>
    </v-app-bar>
    <!-- drawer -->
     <v-navigation-drawer app v-model="sidebar">
      <v-list dense color="primary" dark>
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
        <v-list-item-content>Nome loja</v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="item of items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>

  </v-app>
</template>
<script>
export default {
  data(){
    return{
      sidebar:true,
       items: [
        { title: "Home", icon: "mdi-home", to: "/" },
        { title: "Caixa", icon: "mdi-basket-unfill", to: "/" },
        { title: "Produtos", icon: "mdi-basket", to: "/" },
        { title: "Informações", icon: "mdi-store-cog", to: "/" },
        { title: "Lembretes", icon: "mdi-clipboard-edit-outline", to: "/" },
        { title: "Sair", icon: "mdi-exit-to-app", to: "/login" },
      ],

    }
  }
}
</script>
