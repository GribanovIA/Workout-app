import firebase from 'firebase';
export default {

    state:{
        workouts: {},
        some: 'text'
    },
    getters:{
        workouts(state){
            return state.workouts;
        },
        some(state){
            return state.some;
        }
    },
    mutations:{
        inputChangeStore(state, {value ,id, type ,exerciseIndex, setIndex}){
            state.workouts[id].exercises[exerciseIndex].sets[setIndex][type] = value;
        },
        addInfoFromDatabase(state , payload){
            state.workouts = payload;
        },
        addWorkout(state, payload) {
            let key = payload.key;
            state.workouts[key] = payload;
        },
        test(state){
            state.some = 'fukc';
        },
        changeStore(state){
            state.some = 'new value some';
        }
    },

    actions:{
        async addWorkout({commit, dispatch},payload){
            
            let uid = await dispatch('getUid');
            let key = await firebase.database().ref(`users/${uid}/workouts`).push(payload);
            payload.key = key;
            commit('addWorkout', payload);
        },
        async saveGoal({getters,dispatch}, id) {
            let uid = await dispatch('getUid');
            let workout = getters.workouts[id];
            await firebase.database().ref(`users/${uid}/workouts/${id}`).set(workout);
            
        },
        async fetchInfoFromDatabase({commit ,dispatch}){
            let uid = await dispatch('getUid');
            let result = (await firebase.database().ref(`users/${uid}/workouts`).once('value')).val();
            // let arr = [];
            // for(let key in result){
            //     let elem = result[key];
            //     elem.id = key;
            //     arr.push(elem);
            // }
            // let arr = Object.values(result);
            commit('addInfoFromDatabase', result);
        },
        test({commit},id){
            commit('test');
        }
    }
}