<template>
  <div v-if="Object.keys($store.getters.workouts).length !== 0">
    <b-row>
      <b-col cols="12">
        <div class="main">
          <div class="get-start">
            <div class="select">
              <b-form-select v-model="selected" :state="selectValid" :options="options" />
              <b-form-invalid-feedback id="input-live-feedback">
                Выберите любую тренировку
              </b-form-invalid-feedback>
            </div>

            <b-btn
              pill
              size="lg"
              class="pulse"
              variant="primary"
              @click="getStart"
            >
              Начать тренировку
            </b-btn>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      selected: null,
      // options: [
      //     {value: null , text: 'Please select some workout'},
      //     {value: '125262sdKJGSoe125', text: 'Ноги+грудь'},
      //     {value: 'SEHse6-126s623HG', text: 'Спина'}
      // ],
      selectValid: null,
      changeData: this.$store.getters.workouts,
    };
  },
  computed: {
    options() {
      const options = [{ value: null, text: 'Please select some workout' }];
      const { workouts } = this.$store.getters;
      for (const key in workouts) {
        const { workoutName } = workouts[key];
        const obj = {
          value: key,
          text: workoutName,
        };
        options.push(obj);
      }
      return options;
    },
  },
  watch: {},
  mounted() {
    //   this.$store.watch(
    //       (state, getters) => Object.keys(getters.workouts),
    //       (newValue, oldValue) => {
    //           console.log(`Updating from ${oldValue} to ${newValue}`);
    //       }
    //   )
  },
  methods: {
    getStart() {
      if (!this.selected) {
        this.selectValid = false;
      } else {
        this.selectValid = true;
        const { workoutName } = this.$store.getters.workouts[this.selected];
        this.$router.push(
          `workout?id=${this.selected}&workoutName=${workoutName}`,
        );
      }
    },
    changeStore() {
      console.log('click');
      this.$store.commit('changeStore');
    },
  },
};
</script>

<style scoped lang="scss">
.main {
}

.select {
  width: 50%;
}
.get-start {
  border: 1px solid #000;
  height: 300px;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.pulse {
  margin: 25px;
  cursor: pointer;
  box-shadow: 0 0 0 rgba(0, 123, 255, 0.4);
  animation: pulse 2s infinite;
}
.pulse:hover {
  animation: none;
}
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.4);
  }
  70% {
    box-shadow: 0 0 0 30px rgba(0, 123, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0);
  }
}
</style>
