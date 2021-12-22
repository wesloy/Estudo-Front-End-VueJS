<template>

    <v-container dark>
        <v-card-title class="text-h3 justify-center mt-1 font-weight-bold white--text">Sentinella</v-card-title>
        <v-divider class="mx-16"></v-divider>
        <v-card-title class="text-subtitle-1 justify-center light-blue--text">Informe suas credenciais</v-card-title>
        <v-row dense>
            <v-text-field 
                v-model="user"               
                label="Usuário de Rede Algar"
                clearable
                required            
                class="mr-5 ml-5"
                dark
            >                
            </v-text-field>
            <v-text-field                
                v-model="password"
                :type="show ? 'text': 'password'"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"                              
                @click:append='show = !show'
                label="Senha"
                clearable
                counter    
                required            
                class="mr-5 ml-5"
                dark
            >
            </v-text-field>
        </v-row>
        <v-row dense class="mt-4 pb-0" justify-space-around>
            <v-col></v-col>
            <v-col>
            <v-btn @click="validar" color="light-blue lighten-5">
                <v-icon left>mdi-checkbox-marked-circle</v-icon>
                Entrar
            </v-btn>
            </v-col>
            <v-col></v-col>
        </v-row>
    </v-container>

</template>

<script>
import { mapActions } from 'vuex'

export default {
    data () {        
        return {
            name: 'Login',
            show: false,
            password: '',
            user: ''         
        }
    },
    methods: {
        ...mapActions('login', ['setMensagens', 'setLogin', 'setLogout', 'limparMensagens']),

        validar() {  
            
            let msg = []
            
            if (this.user == '') {
                msg.push("É necessário fornecer o Usuário de rede")
            }
            if (this.password == '') {
                msg.push("É necessário fornecer a senha de acesso")
            } 

            if (msg.length > 0) {
                this.setMensagens(msg)                
            } else {
                this.setMensagens(null)
                let payload = {
                        'user': this.user,
                        'password': this.password,
                        'sistema': 'Sentinella'
                    }

                this.auttenticar(payload)
            }
        },

        auttenticar (payload) {            
            this.setLogin(payload)
        }

    },
}
</script>
