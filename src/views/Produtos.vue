<template>
  <v-app>
      <div class="pa-10">
        <div style="border-left-style:solid;border-left-color:#1976D2;border-left-width:8px;padding-left:10px;" class="text-h4 my-8">Cadastre seus produtos aqui!</div>
        <div style="color:gray;" class="h5 mt-2 mb-4">
        <v-alert
        border="left"
        colored-border
        type="info"
        elevation="2"
        >
        Primeiramente crie suas classificações em <v-icon color="primary">mdi-bookmark-plus</v-icon> para deixar seus produtos organizados por classificação.
        </v-alert>
        </div>
        <v-card class="mt-8" dark>
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
            >
            <template v-slot:item.idproduto="{ item }">
              <v-chip v-model="item.idproduto"
                color="primary"
              >
              {{ item.idproduto }}
              </v-chip>
            </template>
            <template v-slot:item.iconTable="{ item }">
              <v-icon v-model="item.iconTable"
              @click="deletarProduto(item.idproduto,desserts)"
              >
              mdi-delete
              </v-icon>
            </template>
            </v-data-table>
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
    <v-dialog v-model="dialogProduto" persistent max-width="700px">
     <v-card>
        <v-card-title>
          <span class="text-h5 primary--text">Cadastrar produto</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
              <v-text-field
                  :rules="[() => !!nomeProduto || 'Campo obrigatório']"
                  :error-messages="errorMessages"
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
                  :rules="[() => !!valorProduto || 'Campo obrigatório']"
                  append-icon="mdi-cash"
                  label="Valor do produto(R$)"
                  type="number"
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
                :rules="[v => !!v || 'Campo obrigatório']"
                append-icon="mdi-bookmark"
                v-model="tipoProduto"
                :items="items"
                clearable
                label="Classificações"
                required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  append-icon="mdi-animation"
                  label="Quantidade"
                  type="number"
                  hint="(opicional)"
                  v-model="quantProduto"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            </v-form>
          </v-container>
          <v-alert
          v-model="alertInputProdutos"
          transition="slide-x-transition"
          dismissible
          text
          type="warning"
          >Todos os campos devem ser preenchidos, sendo a quantidade opicinal.</v-alert>
          <small>*faça suas classificações antes de registrar os produtos</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color=""
            elevation="2"
            tile
            @click="reset(nomeProduto,tipoProduto,valorProduto,quantProduto)"

          >
            fechar
          </v-btn>
          <v-btn
            :disabled="!valid"
            color="primary"
            elevation="2"
            tile
            @click="salvarFirebase(nomeProduto,valorProduto,tipoProduto,dialogProduto,quantProduto)"
          >
            salvar
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
  </v-app>
</template>
<script>
import * as fb from '@/plugins/firebase'
import { doc, deleteDoc } from "firebase/firestore";
  export default {
    data () {
      return {
        valorProduto:null,
        quantProduto:null,
        alertInputProdutos:false,
        valid: true,
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
          { text: 'Valor (R$)', value: 'valor',},
          { text: 'Classificação', value: 'classf',sortable:false },
          { text: 'Quantidade', value: 'quant',sortable:true,},
          { text: 'ID', value: 'idproduto',sortable:false},
          { value: 'iconTable',sortable:false },
        ],
        desserts: [],
      }
    },
    mounted() {
    this.buscarProdutos();
    },
    methods: {
       async salvarFirebase () {
        var soma= this.valorProduto + this.quantProduto
        alert(soma)
        //validate
        this.$refs.form.validate()
        if(this.quantProduto == null){
          this.quantProduto = '- -'
        }
        if(this.nomeProduto == null || this.tipoProduto == null || this.valorProduto == null){
          this.alertInputProdutos=true
          this.dialogProduto=true
        }
        //firebase
        else{
            await fb.produtosCollection.add({
            produto: this.nomeProduto,
            valor: this.valorProduto,
            classe: this.tipoProduto,
            quantidade: this.quantProduto,
            })
            this.buscarProdutos();
        }
        //resetform
        this.nomeProduto=null
        this.tipoProduto=null
        this.valorProduto=null
        this.quantProduto=null
        this.$refs.form.resetValidation()
        
        

      },
      reset () {
        this.nomeProduto=null
        this.tipoProduto=null
        this.valorProduto=null
        this.quantProduto=null
        this.dialogProduto=false
        this.$refs.form.resetValidation()
      },
      async buscarProdutos() {
        this.desserts = [];
        const logTasks = await fb.produtosCollection.get();
        for (const doc of logTasks.docs) {
          this.desserts.push({
            idproduto: doc.id,
            name: doc.data().produto,
            valor: doc.data().valor,
            classf: doc.data().classe,
            quant: doc.data().quantidade
                
            })
          }
        },
      async deletarProduto(idproduto, desserts) {
        
        const v = this.desserts.indexOf(desserts)
        this.desserts.splice(v, 1)
        await deleteDoc(doc(fb.produtosCollection, idproduto));
      }
        
        
      
    },
  }
</script>

<style>

</style>