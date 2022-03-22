<template>
  <v-app>
      <div class="pa-10">
        <div style="border-left-style:solid;border-left-color:#1976D2;border-left-width:8px;padding-left:10px;" class="text-h4 my-8">Cadastre seus produtos aqui!</div>
        <v-divider></v-divider>
        <v-card class="mt-8">
          <div class="text-h2 primary--text pa-5">Produtos</div>
          <v-divider></v-divider>
            <v-card-title>
                <v-btn class="ma-2" fab dark color="primary" @click.stop="dialogProduto = !dialogProduto"><v-icon dark>mdi-basket-plus</v-icon></v-btn>
                <v-btn class="ma-2" fab dark color="primary"><v-icon dark>mdi-bookmark-plus</v-icon></v-btn>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Procurar"
                    single-line
                    hide-details
                    class="mr-5"
                ></v-text-field>
                <div class="">
                <v-select
                class="mt-6"
                append-icon="mdi-bookmark"
                v-model="search"
                :items="items"
                clearable
                label="Classificações"
                ></v-select>
                </div>
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="desserts"
                :search="search"
            ></v-data-table>
        </v-card>
      </div>
      <!-- Dialog Aqui
      --
      --
      --
      --
      --
      --
      -->
    <v-dialog v-model="dialogProduto" persistent max-width="600px">
     <v-card>
        <v-card-title>
          <span class="text-h5 primary--text">Cadastrar produto</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
              <v-text-field
                  append-icon="mdi-basket"
                  label="Nome do produto"
                  required
                  v-model="nomeProduto"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  append-icon="mdi-cash"
                  label="Valor do produto"
                  hint="R$(valor)"
                  v-model="valorProduto"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-select
                append-icon="mdi-bookmark"
                v-model="tipoProduto"
                :items="items"
                clearable
                label="Classificações"
                required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*faça suas classificações antes de registrar os produtos</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color=""
            elevation="2"
            tile
            @click="dialogProduto = false"
          >
            fechar
          </v-btn>
          <v-btn
            color="primary"
            elevation="2"
            tile
            @click="dialogProduto = false"
          >
            salvar
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
  </v-app>
</template>
<script>
  export default {
    data () {
      return {
        dialogProduto:false,
        items:['Copo','Bebidas'],
        claselect:'',
        search:'',
        headers: [
          {
            text: 'Produto',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Valor (R$)', value: 'valor' },
          { text: 'ID', value: 'idproduto' },
          { text: 'Classificação', value: 'classf' },
          { value: 'excluir', align: 'right',sortable: false },
        ],
        desserts: [
          {
            name: 'Coca Cola (500ml)',
            valor: 50.25,
            idproduto: 115,
            classf:'Copo',
            dairy: 'Yes',
          },
          {
            name: 'Maça',
            valor: 3.55,
            idproduto: 134,
            classf:'Bebidas',
          },
        ],
      }
    },
  }
</script>

<style>

</style>