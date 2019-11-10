<template>
  <div v-if="Object.keys($store.getters.workouts).length !== 0">
    <div class="main">
      <b-breadcrumb :items="breadcrumbs" />
      <h1 class="display-4">
        {{ $route.query.workoutName }}
      </h1>

      <div v-for="(exercise, exerciseIndex) in exercises" :key="exerciseIndex" class="exercises">
        <h3>{{ exercise.exerciseName }}</h3>
        <b-card v-for="(set, setIndex) in exercise.sets" :key="setIndex" :header="'Подход '+(setIndex+1)">
          <b-card-text>
            <Changing class="size" text-before="Вес: " text-after=" кг" :value="set.weight" tag="h1" @update="edit(exerciseIndex, setIndex, 'weight', $event)" />
            <Changing class="size" text-before="Повторения: " :value="set.reps" tag="h1" @update="edit(exerciseIndex, setIndex, 'reps', $event)" />
          </b-card-text>
        </b-card>
      </div>
      <b-btn variant="primary" @click="saveToDB">
        Final
      </b-btn>
    </div>
  </div>
</template>

<script>
import Changing from '../components/Changing';

export default {
  components: {
    Changing,
  },
  data() {
    return {
      breadcrumbs: [
        {
          text: 'Home',
          to: '/',
        },
        {
          text: this.$route.query.workoutName,
          active: true,
        },
      ],
    };
  },
  computed: {
    workout() {
      return JSON.parse(JSON.stringify(this.$store.getters.workouts[this.$route.query.id]));
    },
    workoutsHistory() {
      return this.$store.getters.workoutsHistory;
    },
    exercises() {
      return this.workout.exercises;
    },
  },
  async mounted() {
    await this.$store.dispatch('fetchWorkoutsHistory');
  },
  methods: {
    edit(exerciseIndex, setIndex, type, event) {
      const { id } = this.$route.query;
      this.workout.exercises[exerciseIndex].sets[setIndex][type] = event;
    },
    saveToDB() {
      function dateFormat(date) {
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      }
      function concat(newObj, oldObj) {
        const exercisesLength = newObj.exercises.length;
        const concatObj = {};
        concatObj.workoutName = newObj.workoutName;
        concatObj.exercises = [];
        // let i = 0;
        // let j = 0;
        for (let i = 0; i < newObj.exercises.length; i++) {
          concatObj.exercises.push({
            exerciseName: newObj.exercises[i].exerciseName,
            sets: [],
          });
          for (let j = 0; j < newObj.exercises[i].sets.length; j++) {
            concatObj.exercises[i].sets.push({
              new: newObj.exercises[i].sets[j],
              old: oldObj.exercises[i].sets[j],
            });
          }
        }
        return concatObj;
      }
      function getType(workoutHistory) {
        let good = 0;
        let neutral = 0;
        let bad = 0;
        let allSets = 0;
        let type = null;
        let amountExercises = 0;

        workoutHistory.exercises.forEach((exercise) => {
          amountExercises += 1;
          exercise.sets.forEach((set) => {
            allSets += 1;
            // console.log(`
            // new weight = ${set.new.weight},
            // old weight = ${set.old.weight}
            // `);
            if ((set.new.reps < set.old.reps) || (set.new.weight < set.old.weight)) {
              bad += 1;
            } else if ((set.new.reps === set.old.reps) && (set.new.weight === set.old.weight)) {
              neutral += 1;
            } else if ((set.new.reps > set.old.reps) || (set.new.weight > set.old.weight)) {
              good += 1;
            }
          });
        });
        console.log(`
                    amountExercises = ${amountExercises},
                    good = ${good},
                    neutral = ${neutral},
                    bad = ${bad}
                `);
        if (bad / allSets > 0.1) {
          type = 'bad';
        } else if (neutral / allSets > 0.4) {
          type = 'neutral';
        } else {
          type = 'success';
        }
        return type;
      }
      const dateString = dateFormat(new Date());
      const workoutHistory = concat(this.workout, this.$store.getters.workouts[this.$route.query.id]);
      const type = getType(workoutHistory);
      console.log(`type = ${type}`);
      workoutHistory.type = type;
      this.workoutsHistory[dateString] = workoutHistory;
      // this.workoutsHistory[dateString] = {
      //     type: 'bad',
      //     new: this.workout,
      //     old: this.$store.getters.workouts[this.$route.query.id]
      // }
      const save = this.workoutsHistory;
      this.$store.dispatch('addWorkoutsHistory', save);
      this.$store.dispatch('updateWorkout', this.workout);
    },
  },
};
</script>

<style scoped lang="scss">

</style>
