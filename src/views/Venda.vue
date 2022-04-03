<template>
  <v-app>
      <div class="pa-10">
        <div style="border-left-style:solid;border-left-color:#4CAF50;border-left-width:8px;padding-left:10px;" class="text-h4 my-8">Crie pedidos e vendas aqui!</div>
        <v-alert
        outlined
        type="info"
        color="success"
        >
        Clique em <v-icon color="success">mdi-plus-circle</v-icon> para criar seus pedidos ou realizar uma venda.
        </v-alert>
        <div class="text-h2 success--text mt-10">Comandas</div>
        <v-card dark outlined class="mt-8">
          <v-card-title class="">Pedidos/Vendas <v-spacer></v-spacer><v-btn class="" fab dark color="success" @click="dialogVenda = !dialogVenda"><v-icon dark>mdi-plus</v-icon></v-btn></v-card-title>
        </v-card>
      </div>
      <v-dialog v-model="dialogVenda" persistent max-width="700px">
        <v-card>
            <v-card-text class="text-h2 success white--text pa-4">+ Pedido</v-card-text>
            <v-card-title class="text-h4 ma-2 ml-0">Informações</v-card-title>
            <v-card-text>
            <v-text-field v-model="nomePedido" label="Nome pedido" append-icon="mdi-card-text" outlined></v-text-field>
            <v-textarea v-model="descPedido" label="Detalhes" outlined></v-textarea>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-title class="text-h4 ma-2 ml-0">
              Produtos
            </v-card-title>
            <v-card class="ma-5 mt-0" dark>
            <v-tabs dark center-active color="success" show-arrows>
              <v-tab v-for="itemClass in classis" :key="itemClass.id">{{  itemClass.nome  }}</v-tab>
            </v-tabs>
            <v-simple-table dark>
            <thead>
              <tr>
                <th class="text-left">
                  Produto
                </th>
                <th class="text-right">

                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="itemProduto in items"
                :key="itemProduto.id"
              >
                <td>{{ itemProduto.nome }} <span class="success--text">(R$ {{  itemProduto.valor  }})</span></td>
                <td class="text-right">
                <v-icon class="ma-2" color="success" @click="addValor(itemProduto.nome, itemProduto.id, itemProduto.valor)">mdi-plus</v-icon>
                </td>
              </tr>
            </tbody>
            </v-simple-table>
            </v-card>
            <v-card-title class="text-h4 ma-2 ml-0">
              Listagem
            </v-card-title>
            <v-card class="grey lighten-2 ma-5">
              <v-chip-group column>
                <v-chip v-for="item in lists" :key="item.id" class="ma-1 success"><v-icon color="error" class="ma-1" @click="minValor(item.id,item.valor)">mdi-close</v-icon>{{  item.nome  }} (R$ {{ item.valor }})</v-chip>
              </v-chip-group>
            </v-card>
            <v-divider></v-divider>
            <v-card-title class="text-h4 ma-2 ml-0">
              Opções
            </v-card-title>
            <v-card-text>
              <v-text-field v-model.number="acrescimoValor" prefix="R$" type="number" label="Acréscimo" append-icon="mdi-arrow-up" class="success--text" color="success" outlined></v-text-field>
              <v-text-field v-model.number="descontoValor" prefix="R$" type="number" label="Desconto" append-icon="mdi-arrow-down" class="warning--text" color="warning" outlined></v-text-field>
              <v-btn color="primary" outlined @click="defined()">definir</v-btn>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text class="mt-5">
              <div class="text-h3">Valor total:</div> 
              <div class="success--text text-h4"> - R$ {{ infos.valorTotal }}</div>
            </v-card-text>
            <v-card-actions class="mt-5">
              <v-spacer></v-spacer>
              <v-btn @click="dialogVenda=false">cancelar</v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>
  </v-app>
</template>

<script>
import { doc, deleteDoc } from "firebase/firestore";
import * as fb from '@/plugins/firebase'
export default {
    data(){
        return{
          lists: [],
          infos:{valorTotal: 0},
          acrescimoValor:0,
          descontoValor:0,
          dialogVenda: false,
          items:[],
          classis:[],
        }
    },
    mounted(){
      this.buscarClasses();
      this.buscarProdutosVenda();
    },
    methods:{
      async buscarClasses(){
        this.uid = fb.auth.currentUser.uid;
        this.classis = [];
        const logTasks = await fb.classeCollection.where("uid","==",this.uid).get();
        for (const doc of logTasks.docs) {
          this.classis.push({
            nome: doc.data().classeSelect,
          })
      }
    },
    async buscarProdutosVenda(){
        this.uid = fb.auth.currentUser.uid;
        this.items = []
        const logTasks = await fb.produtosCollection.where("uid","==",this.uid).get();
        for (const doc of logTasks.docs) {
          this.items.push({
            nome: doc.data().produto,
            valor: doc.data().valor,
            id: doc.data().produtoID,
          })
      }
    },
    async addValor(nome,id,valor){
      this.uid = fb.auth.currentUser.uid;
      const res = await fb.pedidoItemsCollection.add({
        produtoNome: nome,
        idProduto: id,
        valor: valor,
        uid: this.uid
      })
      const idItemAdd = res.id
      await fb.pedidoItemsCollection.doc(idItemAdd).update({
        idItem: idItemAdd,
        });
      this.buscarItems();
      this.infos.valorTotal += valor
    },
    async minValor(id,valormin){
      await deleteDoc(doc(fb.pedidoItemsCollection, id));
      this.buscarItems();
      this.infos.valorTotal -= valormin
      if(this.infos.valorTotal < 0){
        this.infos.valorTotal = 0
      }
     
    },
    async buscarItems(){
      this.uid = fb.auth.currentUser.uid;
      this.lists = [];
      const logTasks = await fb.pedidoItemsCollection.where("uid","==",this.uid).get();
        for (const doc of logTasks.docs) {
          this.lists.push({
            nome: doc.data().produtoNome,
            id: doc.data().idItem,
            valor: doc.data().valor
          })
        }
    },
    defined(){
      if(this.infos.valorTotal - this.descontoValor < 0){
        this.descontoValor = 0
      }
      else(
        this.infos.valorTotal -= this.descontoValor
      )
      this.infos.valorTotal += this.acrescimoValor
      this.acrescimoValor = 0
      this.descontoValor = 0
    }
    
  }
}
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}
</style>