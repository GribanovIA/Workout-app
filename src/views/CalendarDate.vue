<template>
    <!--
        Если пользователь переходит со страницы Calendar в под маршрут Calendar/date данные подгружаются нормально т.к. они были проинициализированны в компоненте Calendar. Но если мы уже находимся на странице Calendar/date и попробуем обновиться, то данные не будут подгружены, передается пустой объект. Поэтому необходимо создать дополнительную проверку на наличие в объекте workoutsHistory данных. Так же необходимо повторно обратиться к firebase database, иначе объект workoutsHistory никогда не заполнится данными. Можно оптимизировать используя проверку на наличие данных в workoutsHistory в хуке mounted.
     -->
    <div v-if='Object.keys($store.getters.workoutsHistory).length !== 0'>
        <h1>{{$route.params.date}}</h1>
        <b-card v-for='exercise in exercises' :header='exercise.exerciseName'
                header-tag="h6"
                header-bg-variant="primary"
                header-text-variant='white'
                no-body>
            <b-card-body>
                <div v-for="(set, index) in exercise.sets" class="set">

                    <span class='number lead'>{{index + 1}}</span>
                    <b-card-text>
                        Вес: <span class='new-value'>{{set.new.weight}} кг</span> /  <span class='old-value'>{{set.old.weight}} кг</span><br>
                        Кол-во повторений: <span class='new-value'>{{set.new.reps}}</span> / <span class='old-value'>{{set.old.reps}}</span> <br>
                    </b-card-text>
                </div>
            </b-card-body>
        </b-card> 
    </div>
    <!-- <div>
        <h1>{{$route.params.date}}</h1>
        <h5>{{workoutsHistory}}</h5>
    </div> -->
</template>

<script>
export default {
    async mounted(){
        await this.$store.dispatch('fetchWorkoutsHistory');     
    },
    data() {
        return {
            
        }
    },
    computed:{
        workoutsHistory() {
            return this.$store.getters.workoutsHistory;
        },
        exercises(){
            return this.workoutsHistory[this.$route.params.date].exercises;
        }
    }
}
</script>

<style scoped lang="scss">
    span.new-value{
        font-weight: 600;
        font-size: 18px;
    }
    span.old-value{
        color: rgb(131, 131, 131);
    }
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
        
        

    
    
</style>