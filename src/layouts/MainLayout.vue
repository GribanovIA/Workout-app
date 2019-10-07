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
                        <b-nav-item>Login</b-nav-item>
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
    data() {
        return {

        }
    },
    computed:{

    },
    methods:{

    },
    components:{

    }
}
</script>

<style lang="scss">
    .main{
        
    }
</style>