<template>
    <div v-if='Object.keys($store.getters.workoutsHistory).length !== 0'>
        <div @keyup.enter="prevNext++">
            <b-row>
                <b-col cols="12">
                    <div class="title">
                        <div class="panel">
                            <div class="prev" @click="prevNext--"><img src="/Thin-Left.svg" width='75' height='75' alt=""></div>
                            <div class="year-month">
                                <h1 class="display-4 text-center">{{title.year}}</h1>
                                <h1>{{title.monthName}}</h1>
                            </div>
                            
                            
                            <div class="next"
                            @click="prevNext++" 
                            ><img src="/Thin-Right.svg" width='75' height='75' alt=""></div>
                        </div>
                        <div class="day-name-wrapper clearfix">
                            <div v-for='day in dayNames' class="day-name">
                                <h3>{{day}}</h3>
                            </div>
                        </div>
                        
                    </div>
                    
                    
                        <div class="item-wrapper clearfix">
                            <div v-for='day in days' class="item">
                                <router-link tag='div' :to='"/calendar/"+day.routerLink' v-if='day.type !== null' class="circle" :class="{today: day.today, success: day.type == 'success', bad: day.type == 'bad'}">
                                    <h3 class="day">{{day.date}}</h3>
                                </router-link>
                                <div v-else class="circle" :class="{today: day.today, success: day.type == 'success', bad: day.type == 'bad'}">
                                    <h3 class="day">{{day.date}}</h3>
                                </div>
                            </div>
                        </div>


                    <div class="legend">
                        <div class="today">
                            <div class="today-circle"></div>
                            <p class='lead'>Сегодня</p>
                        </div>
                        <div class="success">
                            <div class="success-circle"></div>
                            <p class='lead'>Удачная тренировка</p>
                        </div>
                        <div class="bad">
                            <div class="bad-circle"></div>
                            <p class='lead'>Неудачная тренировка</p>
                        </div>
                    </div>



                    
                </b-col>
                <div class="col-12 panel">
                </div>
            </b-row>
        </div>
    </div>
</template>

<script>
'use strict';
    export default {
        name: 'home',
        // async beforeCreated(){
        //     await this.$store.dispatch('fetchWorkoutsHistory');
        // },
        async mounted(){
            window.addEventListener('keyup',e=>{
                if(e.code == 'ArrowRight'){
                    this.prevNext++;
                }
                if(e.code == 'ArrowLeft'){
                    this.prevNext--;
                }
            })
            await this.$store.dispatch('fetchWorkoutsHistory');
            
        },
        data() {
            return {
                prevNext: 0,
                dayNames: [
                    'Пн',
                    'Вт',
                    'Ср',
                    'Чт',
                    'Пт',
                    'Сб',
                    'Вс'
                ],
                database:[
                    {date: '28-10-2019',type: 'success'}
                    // {date: new Date(2019,9,9),type: 'success'},
                    // {date: new Date(2019,9,11),type: 'bad'},
                    // {date: new Date(2019,9,15),type: 'success'},
                ],
                testObject : {
                    '31-10-2019' : {
                        name: 'hell0 world'
                    }
                },
                insideFunction: 'context'

            }
        },
        computed:{
            workoutsHistory(){
                return this.$store.getters.workoutsHistory;
            },
            days(){
                // Необходимо сделать в виде декоратора для объекта даты
                function dateFormat(date){
                    return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
                }
                function checkEqualDate(first, second){
                    return first === second;
                };
                function getType(date,workoutsHistory){
                    let workoutsHistoryKeys = Object.keys(workoutsHistory);
                    console.log(workoutsHistoryKeys);

                    let match = false;
                    workoutsHistoryKeys.forEach(workoutHistoryKey=>{
                        if(checkEqualDate(date,workoutHistoryKey)){
                            match = workoutHistoryKey;
                        }
                    });
                        let type = match ? workoutsHistory[match].type : null;
                    return type;

                }
                let dateIterable = this.date;
                // Получает текущий месяц
                let month = dateIterable.getMonth();
                //Узнаем какой день недели 1 число месяца
                dateIterable.setDate(1);
                let dayWeek = dateIterable.getDay() ? dateIterable.getDay() : 7;

                let dayNames={
                    0: 'Вс',
                    1: 'Пн',
                    2: 'Вт',
                    3: 'Ср',
                    4: 'Чт',
                    5: 'Пт',
                    6: 'Сб'
                }
                let days = [];
                // Заполняем пустыми значениями, чтобы указать каким днем недели является 1-ое число месяца.
                for(let i=0; i<dayWeek-1; i++){
                    days.push({date: '', name: ''});
                }




                // Узнаем кол-во дней в месяце и заполняем массив
                let i = 0;
                do{
                    // Изменяет дату на 1 день вперед
                    dateIterable.setDate(++i);
                    console.log(i);
                    let dateFormatValue = dateFormat(dateIterable);
                    let day = dateIterable.getDay();
                    // Делаем проверку на текущий день
                    let now = dateFormat(new Date());
                    days.push(
                        {
                            date: i,
                            routerLink: dateFormatValue,
                            name: dayNames[day],
                            today: checkEqualDate(dateFormatValue,now),
                            type: getType(dateFormatValue,this.workoutsHistory)
                        });
                    
                }while(month == dateIterable.getMonth());
                days.splice(-1,1);
                return days;


            },
            date(){
                let date = new Date();
                //Увеличиваем дату на месяц
                //Проблема если день приходится на 31 число , то смещение даты только на месяца с 31 днем. Необходимо обнулить день
                date.setDate(1);
                date.setMonth(date.getMonth() + this.prevNext);
                return date;
            },
            title(){
                let months = {
                    0: 'Январь',
                    1: 'Февраль',
                    2: 'Март',
                    3: 'Апрель',
                    4: 'Май',
                    5: 'Июнь',
                    6: 'Июль',
                    7: 'Август',
                    8: 'Сентябрь',
                    9: 'Октябрь',
                    10: 'Ноябрь',
                    11: 'Декабрь'
                }
                return {
                    monthName: months[this.date.getMonth()],
                    year: this.date.getFullYear()
                }
            }
        }
    }
</script>
<style lang="scss">
    .legend{
        .today,.success,.bad{
            display: flex;
            align-items: center;
            background: none;
            margin-bottom: 16px;

            .today-circle,.success-circle,.bad-circle{
                width: 25px;
                height: 25px;
                border-radius: 50%;
            }
            .today-circle{
                background: #15557B;
            }
            .success-circle{
                background: #129522;
            }
            .bad-circle{
                background: #C01F17;
            }
            p{
                margin-left: 35px;
                margin-bottom: 0;
            }
        }
        
        
    }
    .item-wrapper{
        // border-left: 2px solid #d3d3d3;
        // border-top: 2px solid #d3d3d3;

    }
    .item{
        float: left;
        position: relative;
        width: 14.28%;
        // border-right: 2px solid #d3d3d3;
        // border-bottom: 2px solid #d3d3d3;
        height: 158px;
        .circle{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100px;
            height: 100px;
            border-radius: 50%;
            h3{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
        
    }
    .day-name-wrapper{
        margin-top: -40px;
    }
    .day-name{
        color: #fff;
        float: left;
        text-align: center;
        position: relative;
        width: 14.28%;
        h3{
        }
        
    }
    .day{
        text-align: right;
        color: #6b6b6b;
    }
    .day-name1{
        margin-bottom: 30px;
    }
    .panel{
        color: #fff;
        display: flex;
        justify-content: space-between;
        // align-items: center;
        width: 100%;
        margin: 0 auto;
    }
    .prev,.next{
        position: relative;
        cursor: pointer;
        height: 193px;
        width: 169px;
        transition: all 0.2s ease-out;
        &:hover{
            background-color: #3B81AA;
        }

        img{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            
        }
    }
    .title{
        background: #15557B;
    }
    .today{
        background: #15557B;
        .day{
            color: #fff;
        }
    }
    .success,.bad{
        cursor: pointer;
    }
    .success{
        background: #129522;
        &:hover{
            background-color: #0C7119;
        }
        h3{
            color: #fff;
        }
    }
    .bad{
        background: #C01F17;
        &:hover{
            background-color: #AB1B14;
        }
        h3{
            color: #fff;
        }
    }
    
</style>