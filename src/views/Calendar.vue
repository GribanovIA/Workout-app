<template>
  <div v-if="Object.keys($store.getters.workoutsHistory).length !== 0">
    <div @keyup.enter="prevNext++">
      <b-row>
        <b-col cols="12">
          <div class="title">
            <div class="panel">
              <div class="prev" @click="prevNext--">
                <img class="arrow" src="/Thin-Left.svg" alt>
              </div>
              <div class="year-month">
                <h1 class="display-4 text-center year">
                  {{ title.year }}
                </h1>
                <h1 class="month">
                  {{ title.monthName }}
                </h1>
              </div>

              <div class="next" @click="prevNext++">
                <img class="arrow" src="/Thin-Right.svg" alt>
              </div>
            </div>
            <div class="day-name-wrapper clearfix">
              <div v-for="day in dayNames" class="day-name">
                <h3>
                  {{ day }}
                </h3>
              </div>
            </div>
          </div>

          <div class="item-wrapper clearfix">
            <div v-for="day in days" class="item">
              <router-link
                v-if="day.type !== null"
                tag="div"
                :to="'/calendar/' + day.routerLink"
                class="circle"
                :class="{today: day.today, success: day.type === 'success', neutral: day.type === 'neutral', bad: day.type === 'bad'}"
              >
                <h3 class="day">
                  {{ day.date }}
                </h3>
              </router-link>
              <div
                v-else
                class="circle"
                :class="{today: day.today, success: day.type === 'success', neutral: day.type === 'neutral', bad: day.type === 'bad'}"
              >
                <h3 class="day">
                  {{ day.date }}
                </h3>
              </div>
            </div>
          </div>

          <!-- <div class="legend">
            <div class="today">
              <div class="today-circle"></div>
              <p class="lead">Сегодня</p>
            </div>
            <div class="success">
              <div class="success-circle"></div>
              <p class="lead">Удачная тренировка</p>
            </div>
            <div class="bad">
              <div class="bad-circle"></div>
              <p class="lead">Неудачная тренировка</p>
            </div>
          </div>-->
        </b-col>
        <div class="col-12 panel" />
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      prevNext: 0,
      dayNames: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    };
  },
  computed: {
    workoutsHistory() {
      return this.$store.getters.workoutsHistory;
    },
    days() {
      // Необходимо сделать в виде декоратора для объекта даты
      function dateFormat(date) {
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      }

      function checkEqualDate(first, second) {
        return first === second;
      }

      function getType(date, workoutsHistory) {
        const workoutsHistoryKeys = Object.keys(workoutsHistory);
        // console.log(workoutsHistoryKeys);

        let match = false;
        workoutsHistoryKeys.forEach((workoutHistoryKey) => {
          if (checkEqualDate(date, workoutHistoryKey)) {
            match = workoutHistoryKey;
          }
        });
        const type = match ? workoutsHistory[match].type : null;
        return type;
      }

      const dateIterable = new Date();
      // Увеличиваем дату на месяц
      // Проблема если день приходится на 31 число , то смещение даты только на месяца с 31 днем. Необходимо обнулить день
      dateIterable.setDate(1);
      dateIterable.setMonth(dateIterable.getMonth() + this.prevNext);

      console.log(dateIterable);
      // Получает текущий месяц
      const month = dateIterable.getMonth();
      // Узнаем какой день недели 1 число месяца
      dateIterable.setDate(1);
      const dayWeek = dateIterable.getDay() ? dateIterable.getDay() : 7;

      const dayNames = {
        0: 'Вс',
        1: 'Пн',
        2: 'Вт',
        3: 'Ср',
        4: 'Чт',
        5: 'Пт',
        6: 'Сб',
      };
      const days = [];
      // Заполняем пустыми значениями, чтобы указать каким днем недели является 1-ое число месяца.
      for (let i = 0; i < dayWeek - 1; i++) {
        days.push({
          date: '',
          name: '',
        });
      }

      // Узнаем кол-во дней в месяце и заполняем массив
      let i = 0;
      do {
        // Изменяет дату на 1 день вперед
        dateIterable.setDate(++i);
        // console.log(i);
        const dateFormatValue = dateFormat(dateIterable);
        const day = dateIterable.getDay();
        // Делаем проверку на текущий день
        const now = dateFormat(new Date());
        days.push({
          date: i,
          routerLink: dateFormatValue,
          name: dayNames[day],
          today: checkEqualDate(dateFormatValue, now),
          type: getType(dateFormatValue, this.workoutsHistory),
        });
      } while (month === dateIterable.getMonth());
      days.splice(-1, 1);
      return days;
    },
    date() {
      const date = new Date();
      // Увеличиваем дату на месяц
      // Проблема если день приходится на 31 число , то смещение даты только на месяца с 31 днем. Необходимо обнулить день
      date.setDate(1);
      date.setMonth(date.getMonth() + this.prevNext);
      return date;
    },
    title() {
      const months = {
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
        11: 'Декабрь',
      };
      return {
        monthName: months[this.date.getMonth()],
        year: this.date.getFullYear(),
      };
    },
  },
  // async beforeCreated(){
  //     await this.$store.dispatch('fetchWorkoutsHistory');
  // },
  async mounted() {
    window.addEventListener('keyup', (e) => {
      if (e.code === 'ArrowRight') {
        this.prevNext = this.prevNext + 1;
      }
      if (e.code === 'ArrowLeft') {
        this.prevNext = this.prevNext - 1;
      }
    });
    await this.$store.dispatch('fetchWorkoutsHistory');
    // console.log(Object.keys(this.$store.getters.workoutsHistory));
    // console.log(this.days);
    // console.log(this.date);
  },
};
</script>
<style lang="scss">
.legend {
    .today,
    .success,
    .bad {
        display: flex;
        align-items: center;
        background: none;
        margin-bottom: 16px;

        .today-circle,
        .success-circle,
        .bad-circle {
            width: 25px;
            height: 25px;
            border-radius: 50%;
        }

        .today-circle {
            background: #15557b;
        }

        .success-circle {
            background: #129522;
        }

        .bad-circle {
            background: #c01f17;
        }

        p {
            margin-left: 35px;
            margin-bottom: 0;
        }
    }
}

.item-wrapper {
// border-left: 2px solid #d3d3d3;
// border-top: 2px solid #d3d3d3;
}

.item {
  float: left;
  position: relative;
  width: 14.28%;
  // border-right: 2px solid #d3d3d3;
  // border-bottom: 2px solid #d3d3d3;
  height: 158px;

  .circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    border-radius: 50%;

    h3 {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

.day-name-wrapper {
  margin-top: -40px;
}

.day-name {
  color: #fff;
  float: left;
  text-align: center;
  position: relative;
  width: 14.28%;

  h3 {
  }
}

.day {
  text-align: right;
  color: #6b6b6b;
}

.day-name1 {
  margin-bottom: 30px;
}

.panel {
  color: #fff;
  display: flex;
  justify-content: space-between;
  // align-items: center;
  width: 100%;
  margin: 0 auto;
}

.prev,
.next {
  .arrow {
    width: 75px;
    height: 75px;
  }

  position: relative;
  cursor: pointer;
  height: 193px;
  width: 169px;
  transition: all 0.2s ease-out;

  &:hover {
    background-color: #3b81aa;
  }

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.title {
  background: #15557b;
}

.today {
  background: #15557b;

  .day {
    color: #fff;
  }
}

.success,
.neutral .bad {
  cursor: pointer;
}

.success {
  background: #129522;

  &:hover {
    background-color: #0c7119;
  }

  h3 {
    color: #fff;
  }
}

.bad {
  background: #c01f17;

  &:hover {
    background-color: #ab1b14;
  }

  h3 {
    color: #fff;
  }
}

.neutral {
  background: #a5a5a5;

  &:hover {
    background-color: #8f8e8e;
  }

  h3 {
    color: #fff;
  }
}

// На малых экранах
@media screen and (max-width: 576px) {
  .year {
    font-size: 16px;
  }

  .month {
    font-size: 16px;
    margin: 0;
  }

  .day-name-wrapper {
    margin-top: -26px;
  }

  .day-name {
    h3 {
      font-size: 16px;
    }
  }

  .prev,
  .next {
    .arrow {
      width: 25px;
      height: 25px;
    }

    position: relative;
    cursor: pointer;
    height: 100px;
    width: 80px;
    transition: all 0.2s ease-out;

    &:hover {
      background-color: #3b81aa;
    }
  }

  .item {
    float: left;
    position: relative;
    width: 14.28%;
    // border-right: 2px solid #d3d3d3;
    // border-bottom: 2px solid #d3d3d3;
    height: 60px;

    .circle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 40px;
      height: 40px;
      border-radius: 50%;

      h3 {
        font-size: 16px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
