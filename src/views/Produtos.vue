<template>
  <v-app>
      <div class="pa-5">
        <div style="border-left-style:solid;border-left-color:#1976D2;border-left-width:8px;padding-left:10px;" class="text-h4 my-8">Cadastre seus produtos aqui!</div>
        <div style="color:gray;" class="h5 mt-2 mb-4">
        <v-alert
        outlined
        type="info"
        >
        Primeiramente crie suas classificações em <v-icon color="primary">mdi-bookmark-plus</v-icon> para deixar seus produtos organizados por classificação.
        </v-alert>
        </div>
        <v-card class="mt-8">
          <div class="text-h2 primary--text pa-5">Produtos</div>
          <v-divider></v-divider>
            <v-card-title>
              <div style="background-color:#BBDEFB;border-radius:15px;" align="center">
                <v-btn class="ma-4" fab dark color="primary" @click.stop="dialogProduto = !dialogProduto"><v-icon dark>mdi-basket-plus</v-icon></v-btn>
                <v-btn class="ma-4" fab dark color="primary" @click.stop="dialogClass = !dialogClass"><v-icon dark>mdi-bookmark-plus</v-icon></v-btn>
                <v-btn class="ma-4" fab dark color="primary" @click.stop="dialogClassDelete = !dialogClassDelete"><v-icon dark>mdi-bookmark-minus</v-icon></v-btn>
                <v-btn v-for="iconLog in iconsLogs" :key="iconLog.id" class="ma-4" fab dark color="primary" @click="configOpcaoValid()"><v-icon>{{  iconLog.icon  }}</v-icon></v-btn>
              </div>
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
                item-text="classeProduto"
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
              <v-chip class="warning ml-3" 
              :disabled="configOpcao"
              @click="logProduto(item.idproduto,dialogEditar)">
                <v-icon v-model="item.iconTableEdit"
                >
                  mdi-pencil
                </v-icon>
              </v-chip>
              <v-chip 
              :disabled="configOpcao"
              class="error ml-3" @click="deletarProduto(item.idproduto,desserts)">
              <v-icon v-model="item.iconTableExluir"
                >
                  mdi-delete
                </v-icon>
              </v-chip>
            </template>
            </v-data-table>
        </v-card>
      </div>
      <!-- DialogClassDelete
      --
      --
      --
      --
      --
      --
      -->
      <v-dialog v-model="dialogClassDelete" max-width="500px">
        <v-card>
         
          <v-card-title class="primary white--text">
            <v-icon class="mr-2" color="white">mdi-bookmark-minus</v-icon><span class="text-h6">Deletar classificação</span>
            <v-spacer></v-spacer>
            <v-icon @click="dialogClassDelete = false" color="white">mdi-close</v-icon>
          </v-card-title>
         
          <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        Classificações
                      </th>
                      <th class="text-right">
                        Opções
                      </th>
                      <th class="text-left">
                        ID
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr
                    v-for="classText of classTexts" :key="classText.id"
                    >
                  <td>{{ classText.name }}</td>
                  <td class="text-right"><v-icon @click="deletarClasse(classText.idClasse)" color="error">mdi-close</v-icon></td>
                  <td><v-chip class="gray">{{ classText.idClasse}}</v-chip></td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- DialogEdit
      --
      --
      --
      --
      --
      --
      -->
      <v-dialog v-model="dialogEditar" persistent max-width="700px">
        <v-card v-for="itemEdit in Edits" :key="itemEdit.id">
          <v-card-title class="primary white--text">
            <v-icon class="mr-2" color="white">mdi-pencil</v-icon><span class="text-h5">Editar produto</span> 
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
          <v-container>
            <v-form
                ref="formEditar"
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
                  :rules="[() => !!itemEdit.nomeProdutoEdit || 'Campo obrigatório']"
                  :error-messages="errorMessages"
                  append-icon="mdi-basket"
                  label="Nome do produto"
                  required
                  v-model="itemEdit.nomeProdutoEdit"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  :rules="[() => !!itemEdit.valorProdutoEdit || 'Campo obrigatório']"
                  append-icon="mdi-cash"
                  label="Valor do produto"
                  type="number"
                  v-model.number="itemEdit.valorProdutoEdit"
                  required
                  prefix="R$"
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
                v-model="itemEdit.tipoProdutoEdit"
                :items="items"
                item-text="classeProduto"
                clearable
                label="Classificações"
                required
                ></v-select>
              </v-col>

            </v-row>
            </v-form>
          </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialogEditar = !dialogEditar" elevation="2">
              Fechar
            </v-btn>
            <v-btn @click="salvarEditProdutos(itemEdit.nomeProdutoEdit,itemEdit.valorProdutoEdit,itemEdit.quantProdutoEdit,itemEdit.tipoProdutoEdit)" color="primary" elevation="2">
              Salvar
            </v-btn>  
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- DialogSalvar
      --
      --
      --
      --
      --
      --
      -->
    <v-dialog v-model="dialogProduto" persistent max-width="700px">
     <v-card>
        <v-card-title class="primary white--text">
          <v-icon class="mr-2" color="white">mdi-basket-plus</v-icon><span class="text-h5">Cadastrar produto</span>
        </v-card-title>
        <v-divider></v-divider>
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
                  label="Valor do produto"
                  type="number"
                  v-model.number="valorProduto"
                  required
                  prefix="R$"
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
                item-text="classeProduto"
                clearable
                label="Classificações"
                required
                ></v-select>
              </v-col>

            </v-row>
            </v-form>
          </v-container>
          <v-alert
          v-model="alertInputProdutos"
          transition="scale-transition"
          dismissible
          text
          type="warning"
          >Todos os campos devem ser preenchidos.</v-alert>
          <small>*faça suas classificações antes de registrar os produtos</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color=""
            elevation="2"
            @click="reset(nomeProduto,tipoProduto,valorProduto,quantProduto)"

          >
            fechar
          </v-btn>
          <v-btn
            :disabled="!valid"
            color="primary"
            elevation="2"
            @click="salvarFirebase(nomeProduto,valorProduto,tipoProduto,dialogProduto,quantProduto)"
          >
            salvar
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
      <!-- Dialog Classes
      --
      --
      --
      --
      -- 
      -->
      <v-dialog v-model="dialogClass" persistent max-width="500px">
        <v-card>
          <v-card-title class="primary white--text">
              <v-icon class="mr-2" color="white">mdi-bookmark-plus</v-icon> Cadastrar Classificações
          </v-card-title>
          <v-divider></v-divider>
          <v-alert
          v-model="alertInputProdutosClass"
          transition="scale-transition"
          dismissible
          text
          type="warning"
          class="ma-5"
          >Preencha o campo.
          </v-alert>
          <v-card-text>
          <v-form ref="formClass">
            <v-text-field
            label="Classificação"
            required
            v-model="nameClass"
            append-icon="mdi-bookmark"
            >
            </v-text-field>
          </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="resetClass()">
              fechar
            </v-btn>
            <v-btn @click="addClass()" class="primary">
              Salvar
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
        uid:'',
        configOpcao: false,
        dialogClassDelete:false,
        dialogEditar:false,
        dialogClass:false,
        dialogProduto:false,
        alertInputProdutosClass:false,
        alertInputProdutos:false,
        editValid:null,      
        valid: true,
        exemplo:null,
        multiLine: true,
        snackbar: false,
        search:'',
        iconsLogs:[],
        items:[],
        classTexts:[],
        Edits:[],
        headers: [
          {
            text: 'Produto',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Valor (R$)', value: 'valor',},
          { text: 'Classificação', value: 'classf',sortable:false },
          { text: 'ID', value: 'idproduto',sortable:false},
          { text: '',value: 'iconTable',sortable:false },
        ],
        desserts: [],
      }
    },
    mounted() {
    this.buscarProdutos();
    this.buscarClass();
    this.buscarClassTabela();
    this.configOpcaoValid();
    },
    methods: {
      //methods produtos salvar*******************************************************************************************
       async salvarFirebase () {
        //validate
        this.$refs.form.validate()
        if(this.nomeProduto == null || this.tipoProduto == null || this.valorProduto == null){
          this.alertInputProdutos=true
          this.dialogProduto=true
        }
        //firebase
        else{
            this.uid = fb.auth.currentUser.uid;
            const res = await fb.produtosCollection.add({
            uid: this.uid,
            produto: this.nomeProduto,
            valor: this.valorProduto,
            classe: this.tipoProduto,
            });
            const idprodutoAdd = res.id
            await fb.produtosCollection.doc(idprodutoAdd).update({
              produtoID: idprodutoAdd,
            });
            this.buscarProdutos();
            this.dialogProduto=false
            this.configOpcao=true
        }
        //reset form
        this.nomeProduto=null
        this.tipoProduto=null
        this.valorProduto=0
        this.$refs.form.resetValidation()
        
        
      },
      reset () {
        this.nomeProduto=null
        this.tipoProduto=null
        this.valorProduto=0
        this.dialogProduto=false
        this.$refs.form.resetValidation()
      },
      //methods produtos buscar*******************************************************************************************
      async buscarProdutos() {
        this.uid = fb.auth.currentUser.uid;
        this.desserts = [];
        const logTasks = await fb.produtosCollection.where("uid","==",this.uid).get();
        for (const doc of logTasks.docs) {
          this.desserts.push({
            idproduto: doc.data().produtoID,
            name: doc.data().produto,
            valor: doc.data().valor,
            classf: doc.data().classe,
                
            })
          }
        },
       //methods produtos deletar******************************************************************************************
      async deletarProduto(idproduto) {
        await deleteDoc(doc(fb.produtosCollection, idproduto));
        this.buscarProdutos();
      },
       //methods produtos editar*******************************************************************************************
      async logProduto(idproduto){
        this.dialogEditar = true
        this.Edits = [];
        this.idEditar = idproduto
        this.editValid = idproduto
        const logTasks = await fb.produtosCollection.where("produtoID", "==", this.idEditar).get();
        for (const doc of logTasks.docs) {
          this.Edits.push({
            nomeProdutoEdit: doc.data().produto,
            valorProdutoEdit: doc.data().valor,
            tipoProdutoEdit: doc.data().classe,
          })
        }
      },
      async salvarEditProdutos(nomeProdutoEdit,valorProdutoEdit,quantProdutoEdit,tipoProdutoEdit){
          await fb.produtosCollection.doc(this.editValid).update({
              produto: nomeProdutoEdit,
              valor: valorProdutoEdit,
              classe: tipoProdutoEdit
        });
        this.dialogEditar = false
        this.buscarProdutos();
      },
      //methods classse salvar********************************************************************************************
      async addClass(){
        if(this.nameClass == '' || this.nameClass == null){
          this.alertInputProdutosClass = true
        }
        else{
          this.uid = fb.auth.currentUser.uid;
           const res =  await fb.classeCollection.add({
             uid:this.uid,
             classeSelect: this.nameClass
           });
            const idclasseAdd = res.id
            await fb.classeCollection.doc(idclasseAdd).update({
              classeID: idclasseAdd,
            });
           this.buscarClass()
           this.buscarClassTabela()
           this.$refs.formClass.reset()
           this.dialogClass = false
        }
        
      },
      resetClass(){
        this.$refs.formClass.reset()
        this.dialogClass = false
      },
      //methods classse buscar********************************************************************************************
      async buscarClass(){
        this.uid = fb.auth.currentUser.uid;
        this.items = [];
        const logTasks = await fb.classeCollection.where("uid","==",this.uid).get();
        for (const doc of logTasks.docs) {
          this.items.push({
            classeProduto: doc.data().classeSelect,  
            })
          }
      },
      async buscarClassTabela(){
        this.uid = fb.auth.currentUser.uid;
        this.classTexts = [];
        const logTasks = await fb.classeCollection.where("uid","==",this.uid).get();
        for (const doc of logTasks.docs) {
          this.classTexts.push({
            name: doc.data().classeSelect,
            idClasse: doc.data().classeID  
            });
          }
      },
      //methods classse deletar***********************************************************************************************  
      async deletarClasse(idClasse){
        await deleteDoc(doc(fb.classeCollection, idClasse));
        this.buscarClassTabela();
        this.buscarClass();
      },
       //methods valid edit****************************************************************************************************
       configOpcaoValid(){
         this.iconsLogs = []
         if(this.configOpcao == false){
           this.iconsLogs.push({
              icon:'mdi-pencil'
           });
           this.configOpcao = true
         }
         else{
           this.iconsLogs.push({
              icon:'mdi-pencil-off'
           });
           this.configOpcao = false
         }

       }
    },

  }
</script>

<style>
</style>
