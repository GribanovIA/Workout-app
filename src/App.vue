<template>
    <div id="app">
        <component :is="layout">
            
        </component>
      
    </div>
</template>

<script>
import MainLayout from './layouts/MainLayout';
import EmptyLayout from './layouts/EmptyLayout';
export default{
    components:{
        MainLayout,EmptyLayout
    },
    mounted(){

    },
    data(){
        return {
            
        }
    },
    computed:{
        layout(){
            return (this.$route.meta.layout || 'empty')+'-layout';
        }
    },    
    methods:{

    }
}
</script>

<style lang="scss">
// Здесь импортируем глобальные стили для нашего проекта
// ~ - папка node modules
// @import 'assets/index.css';
</style>