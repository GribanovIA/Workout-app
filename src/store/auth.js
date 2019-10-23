import firebase from 'firebase/app';

export default {
    actions: {
        async login({dispatch , commit}, {email, password}){
            try{
               let response = await firebase.auth().signInWithEmailAndPassword(email , password);
            //    console.log(response);
            //    let uid = dispatch('getUid');
            }catch(e){
                throw e;
            }
        },
        async logout(){
            await firebase.auth().signOut();
        },
        async register({dispatch}, {email, password , name}){
            try{
                let create = await firebase.auth().createUserWithEmailAndPassword(email, password);
                console.log(create);
                let uid = await dispatch('getUid');
                await firebase.database().ref(`users/${uid}/info`).set({name});

            }catch(e){
                throw e;
            }
        },
        async getUid(){
            const user = await firebase.auth().currentUser;
            return user ? user.uid : null;
        }
    }
}