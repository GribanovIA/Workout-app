<template>
    <h1>Login</h1>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    computed:{
        layout(){
            console.log(this.$route.meta);
            return 'some';
        }
    }
}
</script>