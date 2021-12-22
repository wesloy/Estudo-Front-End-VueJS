<template>
    <div class="mt-3" v-if="dados.length">
        <tabela-listar-dados 
                :lista="dados"
                titulo="Dados Cadastrais dos Associados"
        /> 
   </div>
   <div class="mt-3" v-else>
       <v-data-table
            item-key="name"
            class="elevation-1"
            loading
            loading-text="Carregando... Por favor aguarde..."
        ></v-data-table>
   </div>
</template>

<script>
    import TabelaListarDados from '@/components/TabelaListarDados'
    import { mapGetters } from 'vuex'
    import { mapActions } from 'vuex'

    export default {

        name: "ConsultaDadosCadastraisView",

        components: { TabelaListarDados },

        data() {
            return {                           
                
            }
        },

        computed:{
            ...mapGetters('procedures', {
                dados: 'getDadosAssociados'
            })
        },

        methods: {
            ...mapActions('procedures',[
                'setDadosAssociados'
            ]),

            getDados() {


                let payload = {
                    filtro: "centro-de-custo",
                    valor: "csi - coordena"
                }

                
                this.setDadosAssociados(payload)
            }
            
        },

        mounted() {
            this.getDados()
        }

    }    
</script>

<style lang="sass" scoped>

</style>