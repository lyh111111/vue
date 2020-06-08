import vue from "vue"
import VueRouter from "vue-router"
import register from "../components/register.vue"
vue.use(VueRouter)
const couter = new VueRouter({
    routes:[
        {path:"/login",component:resolve => require(['../components/login.vue'],resolve)},
        {path:"/register",component:register},
        {
            path:"/",components:{
                a:()=>import('../components/login.vue'),
                b:register
            }
        }
    ]
})
export default couter
