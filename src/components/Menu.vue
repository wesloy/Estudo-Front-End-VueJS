<template>
  <div >
    <v-toolbar
      id="menu"
      dark
      dense
      class="my-2"
    >
    <div class="text-left">
    <v-menu offset-y      
      :close-on-content-click= "fecharMenu"
    >

        <template v-slot:activator="{ on, attrs }">
          <v-btn         
            v-bind="attrs"
            v-on="on"
            class="mx-1"                    
            fab
            color="primary"
            large
            @click="fecharMenu = false"
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>

        <v-list>
            <v-list-group
              v-for="item in items"
              :key="item.title"
              v-model="item.active"
              :prepend-icon="item.action"
              color="primary"
              no-action
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </template>              

              <v-list-item
                id="list-item"
                v-for="child in item.items"
                :key="child.title"                
                link 
                @click="navegacaoMenu(child.to), fecharMenu = true"                
              >
                <v-list-item-content>
                  <v-list-item-title v-text="child.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-list>

    </v-menu>
  </div>

      <v-toolbar-title>Sentinella</v-toolbar-title>

      <v-spacer></v-spacer>
      
        <v-row
          align="center"
          justify="end"
        >
          <v-icon dense class="mr-1"> mdi-account-circle </v-icon>
          <span>{{ email }}</span>

          <v-btn icon @click="logout">
            <v-icon dense large class="ml-3 mr-1">mdi-logout</v-icon>
          </v-btn>

        </v-row>
    </v-toolbar>
  </div>
</template>

<script>

import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
         items: [
            {
              action: 'mdi-home',
              // active: true, // usado para pré ativar um menu ao abrir
              items: [
                { title: 'Principal', to: 'Principal' }, //criar forma de apresentar volume disponível para trabalho
              ],
              title: 'Home',
            },
            {
              action: 'mdi-ticket',
              // active: true, // usado para pré ativar um menu ao abrir
              items: [
                { title: 'DLP', to: 'NaoEncontrado' }, //criar forma de apresentar volume disponível para trabalho
                { title: 'Bra - Alteração de Limite', to: 'NaoEncontrado' },
                { title: 'Bra - Alteração de Endereço', to: 'NaoEncontrado' },
                { title: 'Bra - Manutenção Própria', to: 'NaoEncontrado' },
                { title: 'Bra - Saques Compulsivos', to: 'NaoEncontrado' },
                { title: 'Tamnun', to: 'NaoEncontrado' },
              ],
              title: 'Auditorias',
            },
            {
              action: 'mdi-text-box-check',              
              items: [
                { title: 'Planos de Ação', to: 'NaoEncontrado' },
                { title: 'Documentos Oficiais', to: 'NaoEncontrado' },                
              ],
              title: 'Monitoramento',
            },
            {
              action: 'mdi-feature-search',
              items: [
                { title: 'Dados AD', to: 'NaoEncontrado' },
                { title: 'Dados Cadastrais Associados', to: 'ConsultaDadosCadastrais' },
                { title: 'Ficha de Risco', to: 'NaoEncontrado' },
                { title: 'Gestores / Não Gestores', to: 'NaoEncontrado' },
              ],
              title: 'Consultas',
            },
            {
              action: 'mdi-desktop-mac-dashboard',
              items: [
                { title: 'Analistas', to: 'NaoEncontrado' },
                { title: 'Filas de Auditorias', to: 'NaoEncontrado' },
                { title: 'SLAs', to: 'NaoEncontrado' },
              ],
              title: 'Relatórios',
            },
            {
              action: 'mdi-send-lock',
              items: [
                { title: 'Análises', to: 'NaoEncontrado' },                
                { title: 'DLP', to: 'NaoEncontrado' },
                { title: 'Documentos Oficiais', to: 'NaoEncontrado' },                
                { title: 'Planos de Ação', to: 'NaoEncontrado' },
                { title: 'Tamnun', to: 'NaoEncontrado' },                
              ],
              title: 'Extrações de Bases',
            },
            {
              action: 'mdi-wrench',
              items: [
                { title: 'Filas', to: 'NaoEncontrado' },
                { title: 'Finalizações', to: 'NaoEncontrado' },
                { title: 'Subfinalizações', to: 'NaoEncontrado' },
                { title: 'Tamnun', to: 'NaoEncontrado' },
                { title: 'Usuários', to: 'Sobre' }
              ],
              title: 'Configurações',
            },
            {
              action: 'mdi-coffee-to-go',
              items: [{ title: 'Logout', to: 'Login' }],
              title: 'Sair',
            },
        ],
        fecharMenu: false,
      }
    },
    methods: {
      ...mapActions('login', [
                  'setMensagens',
                  'setLogout', 
                  'limparMensagens'
                  ]),

      logout() {
        this.setLogout()
        this.$router.push({name: 'Login'})
      },

      navegacaoMenu(to) {
        
        if (to === 'Login') {
          this.logout()
        } else if (to !== '') {          
          this.$router.push({name: to})
        }
        
      }
    },    
    computed:{
      ...mapGetters('login', { 
          email: 'getEmail'
        })
    },
  }
</script>

  
<style scoped>

  #menu{
    background:  #067ac2;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right,  #067ac2, #26a805, #ffe000);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #067ac2, #26a805, #ffe000) !important; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  #list-item{
    background-color: rgb(218, 241, 250);
  }

</style>