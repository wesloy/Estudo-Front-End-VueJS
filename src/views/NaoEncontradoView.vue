<template>
      <v-alert
      class="mt-3"
      text
      prominent
      type="error"
      icon="mdi-cloud-alert"   
      >
            Página não localizada!
        
      </v-alert>
</template>
<script>

  
  export default {
    name: 'NaoEncontradoView',    
    data() {
      return { }
    },
    methods: {
      telaLogon() {
        this.$router.push({name: 'Login'})
      }
    }
  }
 
 
</script>

<style scoped>

</style>