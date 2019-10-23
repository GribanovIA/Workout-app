<template>
    <b-row>
        <b-col cols='12'>
            <div v-for='workout in workouts' class="view">
                <h1 class='display-4'>{{workout.workoutName}}</h1>
                <b-card v-for='exercise in workout.exercises' :header='exercise.exerciseName'
                        header-tag="h6"
                        header-bg-variant="primary"
                        header-text-variant='white'
                        no-body>
                    <b-card-body>
                        <div v-for="(set, index) in exercise.sets" class="set">

                            <span class='number lead'>{{index + 1}}</span>
                            <b-card-text>
                                Вес: {{set.weight}} кг <br>
                                Кол-во повторений: {{set.reps}}
                            </b-card-text>
                        </div>
                    </b-card-body>
                </b-card>       
            </div>
        </b-col>
    </b-row>
</template>

<script>
import {mapState} from 'vuex';
export default {
    data() {
        return {
            
        }
    },
    computed:{
        workouts(){
            return this.$store.getters.workouts;
        }
    }
}
</script>

<style scoped lang="scss">
    
</style>