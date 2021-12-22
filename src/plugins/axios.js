/* eslint-disable no-irregular-whitespace */
import Vue from 'vue'
import axios from 'axios'
import store from '../store/index'

// Isso é necessário porque, por padrão, os cookies não são passados ​​pelo Axios.
// Ativo é possível enviar todas as solicitações com credenciais como: cabeçalhos de autorização, certificados de cliente TLS ou cookies.
// O cookie de token de acesso e outros dados necessários obtidos da API precisam ser definidos nos cabeçalhos de solicitação para solicitações futuras.
// Por isso, a ativação.
// axios.defaults.withCredentials = true 

Vue.use(
    {
        install(Vue) {
            Vue.prototype.$httpAuth = axios.create ({
                baseURL: 'http://localhost:8080/api/'
                // baseURL: 'v1'
            })
            
            Vue.prototype.$httpSentinella = axios.create ({ 
                baseURL: 'http://10.200.54.184:5200/api/',
                headers: {
                    "Authorization" : "Berer " + store.state.login.user.token
                }
            })
        }
    }
)
