import firebase from 'firebase/app';

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        const response = await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        throw e;
      }
    },
    async logout() {
      await firebase.auth().signOut();
    },
    async register({ dispatch }, { email, password, name }) {
      try {
        const create = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch('getUid');
        await firebase.database().ref(`users/${uid}/info`).set({ name });
      } catch (e) {
        throw e;
      }
    },
    async getUid() {
      const user = await firebase.auth().currentUser;
      return user ? user.uid : null;
    },
  },
};
