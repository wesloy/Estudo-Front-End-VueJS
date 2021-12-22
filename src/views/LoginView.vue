<template>
  <v-container id="conteudo" fluid fill-height mb-5>        
    <v-row no-gutters justify-space-around>
      <v-col></v-col>
      <v-col sm6 offset-sm3>
          <v-card          
          elevation="5"
          width="400px" 
          height="400px" 
          color="blue accent-3"   
          >
          <Login />
          </v-card>      
      </v-col>
      <v-col></v-col>
    </v-row>

    
      <v-row align="center" v-for="m in mensagens" :key="m">
        <!-- <v-col></v-col> -->
        <v-col class="grow">
          <v-alert
                dismissible
                prominent
                border="right"
                colored-border
                type="error"
                elevation="2"         
                @click="fecharAlertas"
          >
            <span> {{ m }} </span>              
          </v-alert>
        </v-col>
        <!-- <v-col></v-col> -->
      </v-row>
    
  </v-container>

</template>

<script>

  import Login from '../components/Login.vue'
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'

  export default { 
    name: 'LoginView',
    components: {
      Login,
    },
    data() {
      return {
        alertar: false,
      }
    },

    methods: {
      ...mapActions('login', [
                      'setMensagens',
                      'setLogado', 
                      'limparMensagens'
                      ]),

      fecharAlertas() {
        this.limparMensagens()        
        this.alertar = !this.alertar
      },
    },

    computed:{
      ...mapGetters('login', { 
        mensagens: 'getMensagens',
          logado: 'getLogado'
        })
    },

    watch:{
      mensagens() {
        if (this.mensagens != null) {          
          this.alertar = true
        }
      },
      
      logado() {
        if (this.logado) {          
          this.$router.push({name: 'Principal'})
        }
      },      
    }
  }
</script>

<style scoped>

  #conteudo{
    background:  #067ac2 !important;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom,  #067ac2, #26a805, #ffe000) !important;  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #067ac2, #26a805, #ffe000) !important; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

</style>