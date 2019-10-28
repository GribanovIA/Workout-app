<template>
    <!-- Необходимо дождаться когда данные загрузсятся из стора, т.к. иначе будет выдавать ошибку - не находит свойство exercises. Так же необходимо ставить if на самый корневой элемент , иначе не работает. Например если поставить проверку на main выдает ошибку -->
    <div v-if='Object.keys($store.getters.workouts).length !== 0'>
        <div class="main">
            <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
            <h1 class='display-4'>{{$route.params.workoutName}}</h1>
            
            <div v-for='(exercise, exerciseIndex) in exercises' class="exercises" :key='exerciseIndex'>
                <h3>{{exercise.exerciseName}}</h3>
                <b-card v-for="(set, setIndex) in exercise.sets" :header="'Подход '+(setIndex+1)" :key='setIndex'>
                    <b-card-text>
                        <Changing class='size' textBefore='Вес: ' textAfter=' кг' :value='set.weight' @update="edit(exerciseIndex, setIndex, 'weight', $event)" tag='h1'></Changing>
                        <Changing class='size' textBefore="Повторения: " :value='set.reps' @update="edit(exerciseIndex, setIndex, 'reps', $event)" tag='h1'></Changing>
                    </b-card-text>
                </b-card>
            </div>
            <b-btn @click.prevent='saveGoal' variant="success">Новая цель</b-btn>
        </div>
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
                    text: this.$route.params.workoutName,
                    active: true
                }
            ],
            id: this.$route.query.id
            
        }
    },
    computed:{
        exercises(){
            let id = this.id;
            let workout = this.$store.getters.workouts[id];
            let exercises = workout.exercises;

            return exercises;
        }
    },
    methods:{
        edit(exerciseIndex, setIndex, type, event){
            let value = event;
            let payload = {
                value: value,
                id: this.id,
                type: type,
                exerciseIndex: exerciseIndex,
                setIndex: setIndex
            };
            this.$store.commit('inputChangeStore', payload);

        },
        async saveGoal(){

            await this.$store.dispatch('saveGoal', this.id);
            
        }
    }
}
</script>


<style scoped lang="scss">
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