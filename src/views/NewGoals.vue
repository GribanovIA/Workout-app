<template>
  <div>
    <b-row>
      <b-col cols="12">
        <b-breadcrumb :items="breadcrumbs" />
      </b-col>
      <b-col v-for="workout in workouts" cols="12" sm="4">
        <router-link tag="div" :to="`/newGoals/`+workout.workoutName+`?id=${workout.id}`">
          <b-card :title="workout.workoutName">
            <b-card-text>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </b-card-text>
          </b-card>
        </router-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: [
        {
          text: 'Home',
          to: '/',
        },
        {
          text: 'New Goals',
          active: true,
        },

      ],
      // goals:[
      //     {
      //         title: 'Ноги+Грудь',
      //         description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
      //     },
      //     {
      //         title: 'Спина+Трицепс',
      //         description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
      //     },
      //     {
      //         title: 'Пресс',
      //         description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
      //     },
      //     {
      //         title: 'Руки',
      //         description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
      //     },
      //     {
      //         title: 'Ноги полностью',
      //         description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
      //     },
      //     {
      //         title: 'Ноги+Грудь',
      //         description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
      //     },
      // ]
    };
  },
  computed: {
    workouts() {
      const { workouts } = this.$store.getters;
      const workoutsArray = [];
      for (const key in workouts) {
        const elem = workouts[key];
        elem.id = key;
        workoutsArray.push(elem);
      }
      return workoutsArray;
    },
  },
};
</script>


<style scoped lang="scss">
    .breadcrumb{
        margin-top: 40px;
        margin-bottom: 85px;
    }
    .card{
        margin-bottom: 20px;
        cursor: pointer;
        transition: all .2s ease-out;
        &:hover{
            box-shadow: 0px 10px 23px #D9D9D9;
        }
    }

    @media screen and (max-width: 576px) {
        margin-bottom: 30px;

    }

</style>
