<template>
    <div>
        <h1 @click="show">注册页面{{$store.getters.getCount}}</h1>
        <button @click="show1">-</button>
        <button @click="show2">+</button>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script>
    export default {
        data:function(){
            return {}
        },
        methods:{
           
            show(){
                 console.log(this.$axios)
               this.$axios.get('../a.json').then((response1) => {
                    console.log(response1.data.name)
                })
            },
            show1(){
                this.$store.state.count--
            },
            show2(){
                this.$store.dispatch('update',{
                    name:"张三",
                    age:"19"
                })
            }
        }
    }
</script>