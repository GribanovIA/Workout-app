<template>
  <b-row>
    <b-col cols="12" md="4">
      <div class="main-title">
        <div class="field">
          <label for="workout-name">Название тренировки</label>
          <b-form-input id="workout-name" v-model="payload.workoutName" class="sasat" @input.native="updateStore" />
        </div>
      </div>
      <div class="sub-title">
        <div class="field">
          <label for="exercise-name">Название упражнения</label>
          <b-form-input id="exercise-name" v-model.trim="payload.exercises[currentExercise].exerciseName" />
        </div>
        <div class="field">
          <label for="sets">Количество подходов</label>
          <b-form-input id="sets" v-model.number="sets" />
        </div>
        <div class="field">
          <label for="weight">Вес</label>
          <b-form-input id="weight" v-model="payload.exercises[currentExercise].sets[currentSet - 1].weight" />
        </div>
        <div class="field">
          <label for="reps">Количество повторений</label>
          <b-form-input id="reps" v-model="payload.exercises[currentExercise].sets[currentSet - 1].reps" />
        </div>
      </div>

      <b-btn v-if="currentSet < sets" block variant="primary" @click="addSet">
        {{ currentSet+ " / "+ sets }}
      </b-btn>
      <b-btn v-else block variant="primary" @click="addExercise">
        Добавить упражнение
      </b-btn>
    </b-col>
    <b-col cols="12" md="7" offset-md="1">
      <div class="view">
        <h1 class="display-4">
          {{ payload.workoutName }}
        </h1>
        <h3>{{ payload.muscle }}</h3>
        <b-card v-for="exercise in payload.exercises" :header="exercise.exerciseName"
                header-tag="h6"
                header-bg-variant="primary"
                header-text-variant="white"
                no-body
        >
          <b-card-body>
            <div v-for="(set, index) in exercise.sets" class="set">
              <span class="number lead">{{ index + 1 }}</span>
              <b-card-text>
                Вес: {{ set.weight }} кг <br>
                Кол-во повторений: {{ set.reps }}
              </b-card-text>
            </div>
          </b-card-body>
        </b-card>
      </div>
      <b-btn variant="success" @click="addWorkout">
        Создать тренировку
      </b-btn>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex';
import Changing from '@/components/Changing.vue';

export default {
  components: {
    Changing,
  },
  data() {
    return {
      inputValue: ['Workout name'],
      payload: {
        workoutName: '',
        exercises: [
          {
            exerciseName: ' ',
            sets: [
              {
                weight: '',
                reps: '',
              },
            ],
          },
        ],
      },
      sets: '',
      currentSet: 1,
      currentExercise: 0,
    };
  },
  computed: {
    ...mapGetters([
      'pushId',
    ]),
  },
  methods: {
    updateStore(event) {
      const { value } = event.target;
      const name = event.target.getAttribute('name');
      this[name] = value;
    },
    async addWorkout() {
      await this.$store.dispatch('getPushId');
      this.payload.id = this.$store.getters.pushId;
      await this.$store.dispatch('addWorkout', this.payload);
      this.payload = {
        id: '',
        workoutName: '',
        exercises: [
          {
            exerciseName: ' ',
            sets: [
              {
                weight: '',
                reps: '',
              },
            ],
          },
        ],

      };
      this.sets = '';
      this.currentSet = 1;
      this.currentExercise = 0;
    },
    addExercise() {
      this.sets = '';
      this.currentSet = 1;
      this.currentExercise++;
      this.payload.exercises.push({
        exerciseName: ' ',
        sets: [
          {
            weight: '',
            reps: '',
          },
        ],
      });
    },
    addSet() {
      this.payload.exercises[this.currentExercise].sets.push({
        weight: '',
        reps: '',
      });
      this.currentSet++;
    },
  },
};
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
@media screen and (max-width: 576px) {
    .sub-title{
        margin: 0;
    }
    .view{
        .card{
            margin: 0;
            width: 100%;
        }
    }
}


</style>
