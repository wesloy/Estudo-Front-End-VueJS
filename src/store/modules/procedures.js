import Vue from 'vue'

export default {
    namespaced: true,
    
    state: {
        dados: [] //[{key:'value 1'}, {key:'value 2'}]
    },

    getters: {
        getDadosAssociados(state) {
            return state.dados
        }
    },

    mutations: {
        setDadosAssociados(state, payload) {
            state.dados = payload
        }
 
    },

    actions: {
        async setDadosAssociados({commit}, payload) {
            // Payload será o filtro e o valor a ser passado para a API
            // Exemplo: { filtro: 'CPF', valor: '123' }

            await Vue.prototype.$httpSentinella(`procedures/dados-associado/${payload["filtro"]}/${payload["valor"]}`)
            .then(
                response => {

                    let info = response.data
                    let registros = []

                    for (var i in info) {
                        registros.push(info[i])
                        commit('setDadosAssociados', registros)
                    }
                  
                } 
            )
            .catch(error => {
                console.log(error.response.data.message)
            })
        }
    }

}