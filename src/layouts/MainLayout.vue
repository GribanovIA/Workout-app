<template>
    <b-container>

            <b-navbar toggleable='md' type='dark' variant='primary'>
                <b-navbar-brand to='/'>Workout</b-navbar-brand>
                <b-navbar-toggle target='nav-collapse'></b-navbar-toggle>
                <b-collapse id='nav-collapse' is-nav>
                    <b-navbar-nav>
                        <b-nav-item to='/newGoals'>New Goals</b-nav-item>
                        <b-nav-item to='/calendar'>Calendar</b-nav-item>
                        <b-nav-item to='/createWorkout'>Create Workout</b-nav-item>
                    </b-navbar-nav>
                    <b-navbar-nav class='ml-auto'>
                        <b-nav-item to='/login'>Login</b-nav-item>
                        <b-nav-item to='/registration'>Registration</b-nav-item>
                        <b-nav-item @click='logout'>Logout</b-nav-item>
                        <b-nav-item @click='getId'>Get User id</b-nav-item>
                        <b-nav-item to='/allTrainings'>All Trainings</b-nav-item>
                        <b-nav-item>Settings</b-nav-item>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>


            <router-view />

            
    </b-container>
        
</template>

<script>
export default {
    name: 'MainLayout',
    async mounted(){
        await this.$store.dispatch('fetchInfo');
    },
    data() {
        return {

        }
    },
    computed:{

    },
    methods:{
        async logout(){
            await this.$store.dispatch('logout');
            this.$router.push('/login');
        },
        getId(){
            let user = this.$store.dispatch('getUid');
            console.log(user);
        }
    },
    components:{

    }
}
</script>

<style scoped lang="scss">
    .main{
        
    }
</style>