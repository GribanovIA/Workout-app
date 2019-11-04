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
            <b-btn @click='saveToDB' variant="primary">Final</b-btn>
        </div>
    </div>
</template>

<script>
import Changing from '../components/Changing';
export default {
    components:{
        Changing
    },
    async mounted(){
        await this.$store.dispatch('fetchWorkoutsHistory');
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
            ],
            // workout: JSON.parse(JSON.stringify(this.$store.getters.workouts[this.$route.query.id])),
            // workoutsHistory: this.$store.getters.workoutsHistory
        }
    },
    computed:{
        workout(){
            return JSON.parse(JSON.stringify(this.$store.getters.workouts[this.$route.query.id]));
        },
        workoutsHistory(){
            return this.$store.getters.workoutsHistory;
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
        saveToDB(){
            function dateFormat(date){
                return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
            }
            function concat(newObj, oldObj){
                let exercisesLength = newObj.exercises.length,
                    concatObj = {};
                concatObj.workoutName = newObj.workoutName;
                concatObj.exercises = [];
                let i = 0;
                let j = 0;
                for(i; i< exercisesLength; i++){
                    let exercise = newObj.exercises[i].exerciseName;
                    concatObj.exercises.push({
                        exerciseName: newObj.exercises[i].exerciseName,
                        sets:[]
                    });
                    for(j; j<newObj.exercises[i].sets.length; j++){
                        concatObj.exercises[i].sets.push({
                            new: newObj.exercises[i].sets[j],
                            old: oldObj.exercises[i].sets[j]
                        });
                    }
                }
                return concatObj;
            }
            let dateString = dateFormat(new Date());
            let concatObj = concat(this.workout,this.$store.getters.workouts[this.$route.query.id]);
            concatObj.type = 'bad';
            this.workoutsHistory[dateString] = concatObj;
            // this.workoutsHistory[dateString] = {
            //     type: 'bad',
            //     new: this.workout,
            //     old: this.$store.getters.workouts[this.$route.query.id]
            // }
            let save = this.workoutsHistory;
            this.$store.dispatch('addWorkoutsHistory', save)
            this.$store.dispatch('updateWorkout',this.workout);
        }
    }
}
</script>

<style scoped lang="scss">
    
</style>