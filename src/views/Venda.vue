<template>
  <v-app>
      <div class="pa-5">
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
          <v-card-title class="">Pedidos/Vendas <v-spacer></v-spacer><v-btn class="" fab dark color="success" @click="dialogNomePedido = true"><v-icon dark>mdi-plus</v-icon></v-btn></v-card-title>
          <v-card-text>
            <v-alert type="info" outlined max-width="550px">Seus pedidos serão armazenados aqui em forma de comanda.</v-alert> 
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
            <v-col v-for="itemComand in comanda" :key="itemComand.id" cols="12" sm="3">
            <v-card outlined>
              <v-card-title class="success text-h4">{{  itemComand.nome  }}</v-card-title>
              <v-card-text class="mt-5">
                <strong>Detalhes:</strong>
                {{  itemComand.desc  }}
              </v-card-text>
              <v-divider></v-divider>
              <v-list shaped>
                <v-subheader>Produtos</v-subheader>
                <v-list-item-group  v-for="itemPed in pedidos" :key="itemPed.id" color="success">
                  <v-list-item v-if="itemComand.id == itemPed.id">
                    <v-list-item-icon><v-icon>mdi-chevron-right</v-icon></v-list-item-icon>
                    <v-list-item-content>{{ itemPed.pedidos  }}  - R$ {{  itemPed.valor.toFixed(2)  }}</v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
              <v-divider></v-divider>
              <v-card-text class="success--text text-h5">Valor: R$ {{  itemComand.valor.toFixed(2)  }}</v-card-text>
              <v-card-text>
                   <span class="warning--text"><strong>Valor desconto: </strong>R$ {{  itemComand.valorMin.toFixed(2)  }}</span><br>
                   <span class="primary--text"><strong>Valor acréscimo: </strong>R$ {{  itemComand.valorAdd.toFixed(2)  }}</span>
              </v-card-text>
              <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn class="error">Excluir</v-btn>
                <v-btn class="success">Feito</v-btn>
              </v-card-actions>
            </v-card>
            </v-col>
          </v-row>
          </v-card-text>
        </v-card>
      </div>
      <v-dialog v-model="dialogNomePedido" persistent max-width="700px">
        <v-card>
          <v-card-text class="text-h4 success white--text pa-4">Nome pedido</v-card-text>
          <v-card-text class="mt-5">
            <v-text-field v-model="nomePedido" label="Nome pedido" append-icon="mdi-card-text" outlined></v-text-field>
            <v-alert type="warning" outlined dismissible v-model="alertCreate" transition="scale-transition">Defina um nome para o pedido.</v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialogNomePedido = false, nomePedido = '',alertCreate = false">Cancelar</v-btn>
            <v-btn class="success" @click="createPedido()">Criar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogVenda" persistent max-width="700px">
        <v-card>
            <v-card-text class="text-h2 success white--text pa-4">+ Pedido</v-card-text>
            <v-card-title class="text-h4 ma-2 ml-0">Informações</v-card-title>
            <v-card-text>
            <v-textarea v-model="descPedido" label="Detalhes" outlined></v-textarea>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-title class="text-h4 ma-2 ml-0">
              Produtos
            </v-card-title>
            <v-card class="ma-5 mt-0" dark>
            <v-tabs dark center-active color="success" show-arrows>
              <v-tab @click="search = null,buscarProdutosVenda()" class="primary--text">Todos</v-tab><v-tab  v-for="itemClass in classis" :key="itemClass.id" v-model="search" @click="search = itemClass.nome, buscarProdutosVenda()">{{  itemClass.nome  }}</v-tab>
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
                <td>{{ itemProduto.nome }}<br><span class="success--text">R$ {{  itemProduto.valor.toFixed(2)  }}</span></td>
                <td class="text-right">
                <v-chip class="success" @click="addValor(itemProduto.valor,itemProduto.nome)"><v-icon>mdi-plus</v-icon></v-chip>
                </td>
              </tr>
            </tbody>
            </v-simple-table>
            </v-card>
            <v-card-title class="text-h4 ma-2 ml-0">
              Listagem
            </v-card-title>
            <v-card-text>
              <v-card class="pa-2">
              <v-card-text class="mt-1">Adicione os produtos a lista.</v-card-text>
              <v-chip-group column>
                <v-chip v-for="itemList in lists" :key="itemList.id">
                  {{  itemList.nome  }} 
                  <span class="success--text"><strong>(R$ {{  itemList.valor  }})</strong></span>
                  <v-icon @click="minValor(itemList.valor,itemList, itemList.id)" color="error">mdi-close</v-icon>
                </v-chip>
              </v-chip-group>
              </v-card>
            </v-card-text>
            <v-card-title class="text-h4 ma-2 ml-0">
              Opções
            </v-card-title>
            <v-card-text>
              <v-text-field :disabled="defaction" v-model.number="acrescimoValor" prefix="R$" type="number" label="Acréscimo" append-icon="mdi-arrow-up" class="success--text" color="success" outlined></v-text-field>
              <v-text-field :disabled="defaction" v-model.number="descontoValor" prefix="R$" type="number" label="Desconto" append-icon="mdi-arrow-down" class="warning--text" color="warning" outlined></v-text-field>
              <v-btn color="primary" v-if="defactionBtn" outlined @click="defined()">definir</v-btn>
              <v-btn color="success" v-if="defactionBtnReset" outlined @click="resetOpcoes()"><v-icon>mdi-reload</v-icon></v-btn>
              <v-alert type="info" v-model="valueAdd" dismissible transition="scale-transition" outlined class="mt-5">
                Opções registradas.
              </v-alert>
              <v-alert type="warning" v-model="valueAddValid" dismissible transition="scale-transition" outlined class="mt-5">
                Nenhum valor inserido.
              </v-alert>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text class="mt-5 text-center">
              <div class="text-h3">Valor total:</div> 
              <div class="success--text text-h4">R$ {{ infos.valorTotal.toFixed(2) }}</div>
              <v-alert class="mt-5" type="error" outlined v-model="pedidoValid" dismissible transition="scale-transition">Escolha os produtos ou cancele o pedido.</v-alert>
            </v-card-text>
            <v-card-actions class="mt-5">
              <v-spacer></v-spacer>
              <v-btn class="warning ma-1" @click="cancelarPedido()">cancelar</v-btn>
              <v-btn class="primary ma-1" @click="createComanda()">Comanda</v-btn>
              <v-btn class="success ma-1" @click="registerPedido()">Feito</v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>
  </v-app>
</template>

<script>
//import { db, doc, setDoc } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import * as fb from '@/plugins/firebase'
export default {
    data(){
        return{
          pedidoValid: false,
          alertCreate: false,
          pedidos: [],
          comanda: [],
          show: false,
          idpedido:'',
          dialogNomePedido: false,
          editedIndex: -1,
          valueAdd: false,
          valueAddValid: false,
          defaction: false,
          defactionBtn: true,
          defactionBtnReset: false,
          search:null,
          infos:{valorTotal: 0},
          acrescimoValor:0,
          descontoValor:0,
          dialogVenda: false,
          items:[],
          classis:[],
          lists: []
        }
    },
    mounted(){
      this.buscarClasses();
      this.buscarProdutosVenda();
      this.buscarComandas();
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
        if (this.search != null){
        const logTasks = await fb.produtosCollection.where("uid","==",this.uid).where("classe","==",this.search).get();
        for (const doc of logTasks.docs) {
          this.items.push({
            nome: doc.data().produto,
            valor: doc.data().valor,
            id: doc.data().produtoID,
          })
        }}
        else{
        const logTasks2 = await fb.produtosCollection.where("uid","==",this.uid).get();
        for (const doc of logTasks2.docs) {
          this.items.push({
            nome: doc.data().produto,
            valor: doc.data().valor,
            id: doc.data().produtoID,
          })
        }
        }
    },
    async createPedido(){
      if(this.nomePedido == null || this.nomePedido == ''){
        this.alertCreate = true
      }
      else{
        this.pedidoValid = false
        this.defaction = false,
        this.dialogNomePedido = false
        this.dialogVenda = true
        this.uid = fb.auth.currentUser.uid;
        const res = await fb.pedidoItemsCollection.add({
          owner: this.uid,
          date: this.printDate(),
          nomePedido: this.nomePedido,
          tipo: "top"
        });
        const idPedidoAdd = res.id
        await fb.pedidoItemsCollection.doc(idPedidoAdd).update({
          pedidoID: idPedidoAdd,
        });
        this.idpedido = idPedidoAdd
      }
    },
    async addValor(valor, nome){
      this.uid = fb.auth.currentUser.uid;
      const res = await fb.pedidoItemsCollection.add({
        nome: nome,
        valor: valor,
        pedidoIDitem: this.idpedido,
        owner: this.uid,
        tipo: "item"
      });
      const idItemAdd = res.id
      await fb.pedidoItemsCollection.doc(idItemAdd).update({
        itemID: idItemAdd,
      });
      this.infos.valorTotal += valor
      this.lists.push({
        nome: nome,
        valor: valor,
        id: idItemAdd
      });
    },
    async minValor(valor, itemList, id){
      if(this.infos.valorTotal - valor < 0){
        this.infos.valorTotal = 0
      }
      else
      {
      this.infos.valorTotal -= valor
      }
      const v = this.lists.indexOf(itemList)
      this.lists.splice(v, 1)
      await deleteDoc(doc(fb.pedidoItemsCollection, id));
    },
    defined(){
      this.infos.valorTotal += this.acrescimoValor
      if(this.acrescimoValor == 0 && this.descontoValor == 0){
        this.valueAddValid = true
      }
      else{
        this.valueAdd = true
      }
      if(this.infos.valorTotal - this.descontoValor < 0){
        this.descontoValor = 0
      }
      else(
        this.infos.valorTotal -= this.descontoValor
      )
      this.defaction = true
      this.defactionBtn = false
      this.defactionBtnReset = true
    },
    resetOpcoes(){
      this.infos.valorTotal -= this.acrescimoValor
      this.infos.valorTotal += this.descontoValor
      this.defaction = false
      this.defactionBtn = true
      this.defactionBtnReset = false,
      this.valueAdd = false
      this.acrescimoValor = 0,
      this.descontoValor = 0
      this.valueAddValid = false
    },
    async cancelarPedido(){
      var deleteItems = fb.pedidoItemsCollection.where("pedidoID","==",this.idpedido);
      deleteItems.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          doc.ref.delete();
        });
      });
      this.dialogVenda = false
      this.infos.valorTotal = 0
      this.acrescimoValor = 0
      this.descontoValor = 0
      this.nomePedido = ''
      this.descPedido = ''
      this.lists = []
      this.valueAddValid = false
      this.valueAdd = false
      this.defactionBtn = true
      this.defactionBtnReset = false
      this.idpedido = ''
    },
    async createComanda(){
      if(this.infos.valorTotal == null || this.infos.valorTotal == 0){
        this.pedidoValid = true
      }
      else{
        if(this.descPedido == null || this.descPedido == ''){
          this.descPedido = "Nenhum detalhe definido."
        }
        if(this.acrescimoValor == null || this.acrescimoValor == 0 || this.acrescimoValor == ''){
          this.acrescimoValor = 0
        }
        if(this.descontoValor == null || this.descontoValor == 0 || this.descontoValor == ''){
          this.descontoValor = 0
        }

        await fb.pedidoItemsCollection.doc(this.idpedido).update({
          descricao: this.descPedido,
          valorAD: this.acrescimoValor,
          valorMN: this.descontoValor,
          valorTotal: this.infos.valorTotal
        });
        this.dialogVenda = false
        this.infos.valorTotal = 0
        this.acrescimoValor = 0
        this.descontoValor = 0
        this.nomePedido = ''
        this.descPedido = ''
        this.lists = []
        this.valueAddValid = false
        this.valueAdd = false
        this.defactionBtn = true
        this.defactionBtnReset = false
        this.idpedido = ''
        this.buscarComandas();
      }
    },
    async buscarComandas(){
      this.uid = fb.auth.currentUser.uid;
      this.comanda = [];
      this.pedidos = [];

      const logTasks = await fb.pedidoItemsCollection.where("owner","==",this.uid).where("tipo","==","top").get();
        for (const doc of logTasks.docs) {
          this.comanda.push({
            nome: doc.data().nomePedido,
            desc: doc.data().descricao,
            valorAdd: doc.data().valorAD,
            valorMin: doc.data().valorMN,
            id: doc.data().pedidoID,
            valor: doc.data().valorTotal
            });
          }
      const logTasks2 = await fb.pedidoItemsCollection.where("owner","==",this.uid).where("tipo","==","item").get();
        for (const doc of logTasks2.docs) {
          this.pedidos.push({
            pedidos: doc.data().nome,
            valor:doc.data().valor,
            id: doc.data().pedidoIDitem
            });
          }
      
    },
    printDate: function () {
      return new Date().toLocaleDateString();
    },
    
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