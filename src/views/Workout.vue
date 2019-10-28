<template>
    <div v-if='Object.keys($store.getters.workouts).length !== 0'>
        <div class="main">
            <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
            <h1 class='display-4'>{{$route.query.workoutName}}</h1>
            
            <div v-for='(exercise, exerciseIndex) in exercises' class="exercises" :key='exerciseIndex'>
                <h3>{{exercise.exerciseName}}</h3>
                <b-card v-for="(set, setIndex) in exercise.sets" :header="'Подход '+(setIndex+1)" :key='setIndex'>
                    <b-card-text>
                        <Changing class='size' textBefore='Вес: ' textAfter=' кг' :value='set.weight' @update="edit(exerciseIndex, setIndex, 'weight', $event)" tag='h1'></Changing>
                        <Changing class='size' textBefore="Повторения: " :value='set.reps' @update="edit(exerciseIndex, setIndex, 'reps', $event)" tag='h1'></Changing>
                    </b-card-text>
                </b-card>
            </div>
            <!-- <b-btn @click.prevent='saveGoal' variant="success">Новая цель</b-btn> -->
        </div>
    </div>
</template>

<script>
import Changing from '../components/Changing';
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
                    text: this.$route.query.workoutName,
                    active: true
                }
            ]
        }
    },
    computed:{
        workout(){
            return JSON.parse(JSON.stringify(this.$store.getters.workouts[this.$route.query.id]));
        },
        exercises(){
            return this.workout.exercises;
        }
    },
    methods:{
        edit(exerciseIndex, setIndex, type, event){
            let id = this.$route.query.id;
            this.workout.exercises[exerciseIndex].sets[setIndex][type] = event;

        },
    }
}
</script>

<style scoped lang="scss">
    
</style>