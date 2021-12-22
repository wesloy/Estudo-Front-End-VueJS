<template>
  <v-app>    
    <v-main>            
      <Menu v-if="logado"/>
      <router-view :class="{margemTopo: logado}" />        
    </v-main>
  </v-app>
</template>

<script>

import { mapGetters } from 'vuex'
import Menu from './components/Menu.vue'

export default {
  name: 'App',
  components: {
    Menu
  },
  computed:{
    ...mapGetters('login', { 
        mensagens: 'getMensagens',
        logado: 'getLogado'
      })
    }, 
  data() {
    return {}
  }
}
</script>
<style scoped>

  .margemTopo {
    margin-top: 2;
  }

</style>




