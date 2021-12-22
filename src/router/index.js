import Vue from 'vue'
import VueRouter from 'vue-router'
import StoreLogin from '@/store/modules/login'

import Login from '@/views/LoginView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login 
  },
  {
    path: '/principal',
    name: 'Principal',  
    // Divisão de código de nível de rota
    // Isso gera um trecho separado para esta rota
    // que é carregado tardiamente, somente quando a rota é visitada
    // webpackChunkName é usado para agrupar um carregamento, usando o mesmo nome o Webpack carrega junto  
    component: () => import(/* webpackChunkName: "principal" */ '../views/PrincipalView.vue')
  },
  {
    path: '/sobre',
    name: 'Sobre',
    component: () => import(/* webpackChunkName: "principal" */ '../views/SobreView.vue')
  },
  {
    path: '/nao-encontrado',    
    name: 'NaoEncontrado',
    component: () => import(/* webpackChunkName: "principal" */ '../views/NaoEncontradoView.vue')
  },
  {
    path: '/consulta-dados-cadastrais',    
    name: 'ConsultaDadosCadastrais',
    component: () => import(/* webpackChunkName: "consultas" */ '../views/ConsultaDadosCadastraisView.vue')
  },
  {
    path: '*',
    redirect: '/nao-encontrado'
    //redirecionando qualquer rota não mapeada para a tela principal
    //pode ser usado para apresentar uma tela de erro como 404 tbm... 
    //se desejar que apenas uma certa rota digitada seja direcionada pode ser especificado no path
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {

  console.log('From: ' + from.name + '| To: ' + to.name + '| Logado: ' + StoreLogin.state.user.logado)

  if (to.name != 'Login') {
    
    if (StoreLogin.state.user.logado) {
      console.log('From: ' + from.name + '| To: ' + to.name + '| Logado: ' + StoreLogin.state.user.logado + ' - CONECTADO')
      next()
    } else {
      console.log('From: ' + from.name + '| To: ' + to.name + '| Logado: ' + StoreLogin.state.user.logado + ' - DESCONECTADO')
      next("/")
    }    

  } else {
    console.log('From: ' + from.name + '| To: ' + to.name + '| Logado: ' + StoreLogin.state.user.logado + ' - DESCONECTADO')
    next ()
  }
  
  // https://stackoverflow.com/questions/42603909/accessing-vuex-state-when-defining-vue-router-routes
  
})

export default router
