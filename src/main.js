import Vue from 'vue'
import App from './App.vue'

import router from './router'
import axios from 'axios'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(Vuex)
Vue.prototype.$axios=axios

const store = new Vuex.Store({
    state:{
        count:1
    },
    getters:{
        getCount(state){
            console.log(22222); 
            if(state.count>0){
                console.log(11111); 
                return state.count              
            }else{
              return 1;
            }
        }
    },
    mutations:{
        update(state,info){
            console.log(info.name+"--------"+info.age)
            state.count++
        }
    },
    actions:{
        update(store,info){
          console.log("aciton...")
          store.commit('update',info)
      }
    }
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
