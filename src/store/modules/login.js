
import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        user: {
            nome: "",
            email: "",
            token: "",
            logado: false,            
        },
        mensagens: []
    },
    getters: {
        getLogado(state){
            return state.user.logado
        },
        getNome(state){
            return state.user.nome
        },
        getEmail(state){
            return state.user.email
        },
        getToken(state){
            return state.user.token
        },
        getMensagens(state){
            return state.mensagens
        }
    },
    mutations:{
        setLogin(state, payload){

            if (payload.access_token) {               
                state.user.nome = payload.user.username
                state.user.email = payload.user.email
                state.user.token = payload.access_token
                state.user.logado = true
            } else {
                state.user = {}
                state.user.logado = false
            }
        },
        setLogout(state) {
            state.user.nome = ''
            state.user.email = ''
            state.user.token = ''
            state.user.logado = false
        },
        setMensagens(state, payload){
            state.mensagens = payload
        },
        limparMensagens(state) {
            state.mensagens = []
        }
    },
    actions: {
      async setLogin({ commit }, payload) {
            // Fazer requisição no micro serviço integrado com o AD
            // payload: {
            //                  "user": "wesleyel",
            //                  "password": "123",
            //                  "sistema": "Sentinella"
            //          }     
            await Vue.prototype.$httpAuth.post('auth', payload)
                        .then(response => {
                            commit('setLogin', response.data)
                        })
                        .catch(Error => {
                            let msg = []
                            if (Error.message.includes('40')) {
                                msg.push('Usuário ou senha inválido. Confira e tente novamente!')                                
                            } else if (Error.message.includes('50')) {
                                msg.push('Servidor Sentinella está inacessível no momento')  
                            } else {
                                msg.push(Error.message)
                            }
                            commit('setMensagens',msg)
                        })
        },
        setLogout({commit}) {
            commit('setLogout')
        },
        setMensagens({ commit }, payload) {
            commit('setMensagens', payload)
        },
        limparMensagens({commit}) {
            commit('limparMensagens')
        }

    }

}