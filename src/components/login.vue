<template>
    <div>
        登录页面{{$store.state.count}}
        <button @click="show">+</button>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script>
    export default {
        methods:{
            show(){
                this.$store.state.count++
            }
        }
    }
</script>