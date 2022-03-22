<template>
    <v-app>
          <div class="container">
            <div class="pa-10">
            <div><span class="text-h3"><strong>Bem vindo</strong></span></div>
            <div class="my-2 text-h6" v-show="date" style="color:gray;padding-left:3px;"><v-icon>mdi-calendar-blank</v-icon>{{ date }}</div>
            <v-divider></v-divider>
            <v-btn to="/" class="ma-2" fab dark color="primary"><v-icon dark>mdi-basket-unfill</v-icon></v-btn>
            <v-btn to="/Produtos" class="ma-2" fab dark color="primary"><v-icon dark>mdi-basket-plus</v-icon></v-btn>
            <v-btn to="/" class="ma-2" fab dark color="primary"><v-icon dark>mdi-store-cog</v-icon></v-btn>
            <v-btn to="/" class="ma-2" fab dark color="primary"><v-icon dark>mdi-clipboard-edit-outline</v-icon></v-btn>
            <br>
            <br>
            <div style="border-left-style:solid;border-left-color:black;border-left-width:10px;padding-left:10px;font-size:20px;"><span>Este site foi desenvolvido para melhorar o gerenciamento de produtos para todas as lojas em geral,<br>um sistema simples ,prático e organizado para acelerar os processos de suas vendas,<br> deixando você no total controle, contando com históricos, informações de venda e listagem de produtos.</span></div>
            <br>
            <div style="border-left-style:solid;border-left-color:green;border-left-width:10px;padding-left:10px">
            <span class="text-h5"><strong>❝Faça o que você pode, com o que você tem, onde você estiver.❞</strong></span>
            <br>
            <span style="color:gray;margin-left:10px;">Theodore Roosevelt</span>
            </div>
            </div>
        </div>
    </v-app>
</template>
<script>

export default {
    data(){
        return{
            date: '',
            timerCount: '',
        }
    },
        methods: {
          printDate: function () {
            return new Date().toLocaleDateString();
          },
        },
        mounted: function () {
          this.date = this.printDate();
        },
}
</script>
<style>
</style>
