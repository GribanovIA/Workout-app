<template>
    <div>
        <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
        <h1 class='display-4'>{{$route.params.goalName}}</h1>
        <div class="exercises">
            <h3>Жим лежа</h3>
            <b-card v-for="(set, index) in sets" :header="'Подход '+(index+1)" :key='index'>
                <b-card-text>
                    <Changing class='size' textBefore='Вес: ' textAfter=' кг' :value='set.weight' v-model='set.weight' tag='h1'></Changing>
                    <Changing class='size' textBefore="Повторения: " :value='set.reps' v-model='set.reps' tag='h1'></Changing>
                </b-card-text>
            </b-card>
        </div>
        <b-btn variant="success">Новая цель</b-btn>
    </div>
</template>

<script>
import Changing from '@/components/Changing';
export default {
    components:{
        Changing
    },
    data() {
        return {
            breadcrumbs:[
                {
                    text: 'Home',
                    to: '/'
                },
                {
                    text: 'New Goals',
                    to: '/newGoals'
                },
                {
                    text: this.$route.params.goalName,
                    active: true
                }
            ],
            sets:[
                {
                    weight: 25,
                    reps: 18
                },
                {
                    weight: 32,
                    reps: 14
                },
                {
                    weight: 45,
                    reps: 9
                },
                {
                    weight: 45,
                    reps: 9
                },
                {
                    weight: 45,
                    reps: 9
                }
            ]
            
        }
    },
}
</script>


<style lang="scss">
    .input{
        width: 400px;
    }
    .display-4{
        font-size: 3.5rem;
        text-align: center;
    }
    .breadcrumb{
        margin-top: 40px;
    }
    .exercises{
        overflow: auto;
        height: 500px;
    }
    .card{
        margin-bottom: 20px;
    }
    .card-text{
        display: flex;
        h1{
            margin-right: 85px;
            margin-bottom: 40px;
        }
    }
    .btn{
        display: block;
        width: 250px;
        margin: 10px auto 60px;
        
    }
    // На малых экранах
    @media screen and (max-width: 576px) {
        .display-4 {
            text-align: center;
            font-size: 40px;
        }
        .exercises{
            overflow: scroll;
            height: 250px;
        }
        .input:nth-child(odd){
            width: 300px;
        }
        
        h3{
            font-size: 1rem;
        }
    }
</style>