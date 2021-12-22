
<template>
<div class="mt-5">
    <v-card class="mx-2" id="conteudo">

        <v-card-title id="cabecalho" class="mb-5">
            <v-row>
                <h2>{{ titulo }}</h2>
            </v-row>

            <v-spacer></v-spacer>            

            <v-row>
             <!-- <v-select
                id="selecaoItens"
                :items="listarFiltros"
                label="Filtrar Coluna:"                
                justify-end
                class="mx-2"
                v-model="itemKey"
            >
                <template v-slot:item="{ item, attrs, on }">
                    <v-list-item
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-list-item-title
                        :id="attrs['aria-labelledby']"
                        v-text="item"
                        ></v-list-item-title>
                    </v-list-item>
                </template>
            </v-select> -->

            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Pesquisar"
                single-line
                hide-details
                justify-end
                class="ml-3"
            ></v-text-field>
        </v-row>
        </v-card-title>

        <v-data-table
            id="tabela"
            v-model="selected"
            :headers="headers"
            :items="lista"
            :item-key="itemKey"
            :search="search"
            :footer-props="{itemsPerPageText: 'Linhas por página:', sortBy: 'Ordenar por'}"            
            :single-select = 'singleSelect'
            show-select
            multi-sort   
            class="elevation-2 mt-1"
            :loading = "loading"
        >
        </v-data-table> 
    </v-card>

        <v-row
            class="mt-2 ml-2"
            align="center"
            justify="start"
        >
            <v-btn
                class="ma-2"
                color="info"
                :disabled='loading'
                @click="exportarCVS"
                >
                Exportar CSV
            </v-btn>
        </v-row>
</div>   
</template>

<script>
    export default {
        props: {
            lista: {
                type: [],                
                required: true
            },
            titulo: {
                type: String,
                required: true
            }
        },
        data () {
            return {
                listarFiltros: [],
                itemKey: '',
                selected: [],
                singleSelect: false,
                loading: false,
                search: ''
            }
        },
        computed: {            
            headers() {

                let header = []
                    
                let titulos = Object.keys(this.lista[0])
                
                for (var info in titulos) {
                    
                    header.push({
                        text: titulos[info].toString().toUpperCase(),
                        value: titulos[info]
                    }) 
                }
                
                return header
            }
          
        },
         methods: {
            exportarCVS() {
                
                if (!this.selected.length) {
                    alert("Não foi selecionado nenhum registro para ser exportado!")
                    return
                } else {
                    this.loading = true
                    setTimeout(() => (this.loading = false), 3000)  //necessário visto a construção do CSV é muito rápida
                }

                let csvContent = "data:text/csv;charset=utf-8,";
                csvContent += [
                    Object.keys(this.lista[0]).join(";"),
                    ...this.selected.map(item => Object.values(item).join(";"))
                ]
                    .join("\n")
                    .replace(/(^\[)|(\]$)/gm, "")

                const data = encodeURI(csvContent)
                const link = document.createElement("a")
                link.setAttribute("href", data)
                link.setAttribute("download", this.titulo + ".csv")
                link.click()


            },
            setListarFiltros() {

                let array = Object.keys(this.lista[0])
                
                for (var item in array) {
                    this.listarFiltros.push(array[item].toUpperCase())
                }
                
            },
            setItemKey() {
                let titulos = Object.keys(this.lista[0])
                this.itemKey =  titulos[0]
            }
        },

        mounted() {
            // this.setListarFiltros()
            this.setItemKey()
        }

    }
</script>

<style scoped>
   
    #tabela {
        background: #afdbf3;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to bottom, #ffffff, #a4d7f3);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to bottom, #fFffff, #b3dff7); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        border: none

    }

</style>