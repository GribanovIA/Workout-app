import firebase from 'firebase';

export default {

  state: {
    workouts: {},
    workoutsHistory: {},
    some: 'text',
    pushId: '',
  },
  getters: {
    workouts(state) {
      return state.workouts;
    },
    some(state) {
      return state.some;
    },
    workoutsHistory(state) {
      return state.workoutsHistory;
    },
    pushId(state) {
        return state.pushId;
    }
  },
  mutations: {
      getPushId(state, id){
        state.pushId = id;
      },
    inputChangeStore(state, {
      value, id, type, exerciseIndex, setIndex,
    }) {
      state.workouts[id].exercises[exerciseIndex].sets[setIndex][type] = value;
    },
    addInfoFromDatabase(state, payload) {
      state.workouts = payload;
    },
    addWorkout(state, payload) {
      const { id } = payload;
      state.workouts[id] = payload;
    },
    test(state) {
      state.some = 'fukc';
    },
    changeStore(state) {
      state.some = 'new value some';
    },
    fetchWorkoutsHistory(state, payload) {
      state.workoutsHistory = payload;
    },
    updateWorkout(state, workout) {
      console.log(workout.id);
      const key = workout.id;
      state.workouts[key] = workout;
    },
  },

  actions: {
      async getPushId({commit, dispatch }) {
        const uid = await dispatch('getUid');
        const obj = await firebase.database().ref(`users/${uid}/workouts`).push({});
        const id = obj.key;
        commit('getPushId', id);
      },
    async addWorkout({ commit, dispatch }, payload) {
      const uid = await dispatch('getUid');
      const { id } = payload;
      console.log(`
      uid = ${uid},
      pushId = ${id}
      `);
      await firebase.database().ref(`users/${uid}/workouts/${id}`).set(payload);
      commit('addWorkout', payload);
    },
    async saveGoal({ getters, dispatch }, id) {
      const uid = await dispatch('getUid');
      const workout = getters.workouts[id];
      await firebase.database().ref(`users/${uid}/workouts/${id}`).set(workout);
    },
    async addWorkoutsHistory({ dispatch }, payload) {
      const uid = await dispatch('getUid');
      await firebase.database().ref(`users/${uid}/workoutsHistory`).set(payload);
    },
    async fetchWorkoutsHistory({ commit, dispatch }) {
      const uid = await dispatch('getUid');
      let payload = (await firebase.database().ref(`users/${uid}/workoutsHistory`).once('value')).val();
      payload = payload || {};

      commit('fetchWorkoutsHistory', payload);
    },
    async fetchInfoFromDatabase({ commit, dispatch }) {
      const uid = await dispatch('getUid');
      const result = (await firebase.database().ref(`users/${uid}/workouts`).once('value')).val();
      // let arr = [];
      // for(let key in result){
      //     let elem = result[key];
      //     elem.id = key;
      //     arr.push(elem);
      // }
      // let arr = Object.values(result);
      commit('addInfoFromDatabase', result);
    },
    async updateWorkout({ commit, dispatch }, workout) {
      console.log(workout.id);
      const uid = await dispatch('getUid');
      const { id } = workout;
      await firebase.database().ref(`users/${uid}/workouts/${id}`).set(workout);
      commit('updateWorkout', workout);
    },
    test({ commit }, id) {
      commit('test');
    },
  },
};
