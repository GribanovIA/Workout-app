<template>




                <b-row>
                    <b-col cols='4'>
                        <div class="main-title">
                            <div class="field">
                                <label for="workout-name">Название тренировки</label>
                                <b-form-input id='workout-name'></b-form-input>
                            </div>
                            <div class="field">
                                <label for="muscle-name">Название группы мышц</label>
                                <b-form-input id='muscle-name'></b-form-input>
                            </div>
                        </div>
                        <div class="sub-title">
                            <div class="field">
                                <label for="exercise-name">Название упражнения</label>
                                <b-form-input id='exercise-name'></b-form-input>
                            </div>
                            <div class="field">
                                <label for="sets">Количество подходов</label>
                                <b-form-input id='sets'></b-form-input>
                            </div>
                            <div class="field">
                                <label for="weight">Вес</label>
                                <b-form-input id='weight'></b-form-input>
                            </div>
                            <div class="field">
                                <label for="reps">Количество повторений</label>
                                <b-form-input id='reps'></b-form-input>
                            </div>
                        </div>
                        <b-btn block variant='primary'>Добавить упражнение</b-btn>    
                    </b-col>
                    <b-col cols="7" offset-sm="1">
                        <div class="view">
                            <h1 class='display-4'>Ноги+Грудь</h1>
                            <h3>Ноги</h3>
                            <b-card header='Жим лежа'
                                    header-tag="h6"
                                    header-bg-variant="primary"
                                    header-text-variant='white'
                                    no-body>
                                <b-card-body>
                                    <div class="set">
                                        <span class='number lead'>1</span>
                                        <b-card-text>
                                            Вес: 50 кг <br>
                                            Кол-во повторений: 12
                                        </b-card-text>
                                    </div>
                                    <div class="set">
                                        <span class='number lead'>2</span>
                                        <b-card-text>
                                            Вес: 55 кг <br>
                                            Кол-во повторений: 10
                                        </b-card-text>
                                    </div>
                                    <div class="set">
                                        <span class='number lead'>3</span>
                                        <b-card-text>
                                            Вес: 67 кг <br>
                                            Кол-во повторений: 7
                                        </b-card-text>
                                    </div>
                                </b-card-body>
                            </b-card>
                            <b-card header='Приседания со свободным весом'
                                    header-tag="h6"
                                    header-bg-variant="primary"
                                    header-text-variant='white'
                                    no-body>
                                <b-card-body>
                                    <div class="set">
                                        <span class='number lead'>1</span>
                                        <b-card-text>
                                            Вес: 50 кг <br>
                                            Кол-во повторений: 12
                                        </b-card-text>
                                    </div>
                                    <div class="set">
                                        <span class='number lead'>2</span>
                                        <b-card-text>
                                            Вес: 55 кг <br>
                                            Кол-во повторений: 10
                                        </b-card-text>
                                    </div>
                                    <div class="set">
                                        <span class='number lead'>3</span>
                                        <b-card-text>
                                            Вес: 67 кг <br>
                                            Кол-во повторений: 7
                                        </b-card-text>
                                    </div>
                                </b-card-body>
                            </b-card>
                            
                        </div>
                        <b-btn variant='success'>Создать тренировку</b-btn>
                        
                    </b-col>
                </b-row>



        
</template>

<script>
import Changing from '@/components/Changing.vue';
export default {
    components:{
        Changing
    },
    data() {
        return {
            inputValue: ['Workout name']
        }
    },
}
</script>

<style lang="scss">
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
        height: 700px;
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