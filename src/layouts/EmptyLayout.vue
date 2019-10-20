<template>
    <div class='layout-grey'>
        <b-container>
            <router-view />
        </b-container>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
}
</script>


<style scoped lang="scss">

    .layout-grey{
        background-color: rgb(190, 190, 190);
    }
</style>