import firebase from 'firebase';
export default {

    state:{
        workouts: [],
        some: 'text'
    },
    getters:{
        workouts(state){
            return state.workouts;
        }
    },
    mutations:{
        addInfo(state , payload){
            state.workouts = payload;
        },
        addWorkout(state, payload) {
            state.workouts.push(payload);
        }
    },

    actions:{
        async addWorkout({commit, dispatch},payload){
            commit('addWorkout', payload);
            let uid = await dispatch('getUid');
            await firebase.database().ref(`users/${uid}/workouts`).push(payload);
        },
        async fetchInfo({commit ,dispatch}){
            let uid = await dispatch('getUid');
            let result = (await firebase.database().ref(`users/${uid}/workouts`).once('value')).val();
            let arr = Object.values(result);
            commit('addInfo', arr);
        }
    }
}