<template>
    <b-row>
        <b-col cols='4'>
            <div class="main-title">
                <h1>{{message}}</h1>
                <div class="field">
                    <label for="workout-name">Название тренировки</label>
                    <b-form-input v-model='payload.workoutName' class='sasat' @input.native='updateStore' id='workout-name'></b-form-input>
                </div>
            </div>
            <div class="sub-title">
                <div class="field">
                    <label for="exercise-name">Название упражнения</label>
                    <b-form-input v-model.trim='payload.exercises[currentExercise].exerciseName' id='exercise-name'></b-form-input>
                </div>
                <div class="field">
                    <label for="sets">Количество подходов</label>
                    <b-form-input v-model.number='sets' id='sets'></b-form-input>
                </div>
                <div class="field">
                    <label for="weight">Вес</label>
                    <b-form-input v-model='payload.exercises[currentExercise].sets[currentSet - 1].weight' id='weight'></b-form-input>
                </div>
                <div class="field">
                    <label for="reps">Количество повторений</label>
                    <b-form-input v-model='payload.exercises[currentExercise].sets[currentSet - 1].reps' id='reps'></b-form-input>
                </div>
            </div>

            <b-btn @click='addSet' v-if='currentSet < sets' block variant='primary'>{{currentSet+ " / "+ sets}}</b-btn>    
            <b-btn @click='addExercise' v-else block variant='primary'>Добавить упражнение</b-btn>   

        </b-col>
        <b-col cols="7" offset-sm="1">
            <div class="view">
                <h1 class='display-4'>{{payload.workoutName}}</h1>
                <h3>{{payload.muscle}}</h3>
                <b-card v-for='exercise in payload.exercises' :header='exercise.exerciseName'
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
            <b-btn @click='addWorkout' variant='success'>Создать тренировку</b-btn>
            
        </b-col>
    </b-row>    
</template>

<script>
import {mapState} from 'vuex';
import Changing from '@/components/Changing.vue';
export default {
    components:{
        Changing
    },
    data() {
        return {
            inputValue: ['Workout name'],
            payload:{
                workoutName: '',
                exercises:[
                    {
                        exerciseName: ' ',
                        sets:[
                            {
                                weight: '',
                                reps: ''
                            }
                        ]
                    }
                ]
                
            },
            sets: '',
            currentSet: 1,
            currentExercise: 0
        }
    },
    computed:{
        ...mapState([
            'message'
        ])
    },
    methods:{
        updateStore(event){
            let value = event.target.value;
            let name = event.target.getAttribute('name');
            this[name] = value;
        },
        async addWorkout(){
            await this.$store.dispatch('addWorkout',this.payload);
            this.payload = {
                workoutName: '',
                exercises:[
                    {
                        exerciseName: ' ',
                        sets:[
                            {
                                weight: '',
                                reps: ''
                            }
                        ]
                    }
                ]
                
            };
            this.sets = '';
            this.currentSet = 1;
            this.currentExercise = 0;
        },
        addExercise(){
            this.sets = '';
            this.currentSet = 1;
            this.currentExercise++;
            this.payload.exercises.push({
                exerciseName: ' ',
                sets:[
                    {
                        weight: '',
                        reps: ''
                    }
                ]
            })
        },
        addSet(){
            this.payload.exercises[this.currentExercise].sets.push({
                weight: '',
                reps: ''
            });
            this.currentSet++;
        }
    }
}
</script>

<style scoped lang="scss">
    .root{
        width: 100%;
    }
    .main-title{
        .field{
            margin-top: 50px;
        }
    }
    .sub-title{
        margin-top: 113px;
        .field{
            margin-bottom: 20px;
        }
    }
    .view{
        overflow: auto;
        margin-bottom: 12px;
        height: 675px;
        .display-4{
            margin-top: 48px;
        }
        h3{
            margin-top: 27px;
            margin-bottom: 20px;
        }
        .card{
            margin-top: 30px;
            width: 80%;
            .card-body{
                span.number{
                    margin-bottom: 10px;
                    margin-right: 25px;
                    font-size: 67px;
                    color: #6C757D;
                }
                .card-text{
                    line-height: 35px;
                }
                .set{
                    display: flex;
                    align-items: center;
                }
            }
        }
        
        
    }
    
    
</style>