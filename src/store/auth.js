import firebase from 'firebase/app';

export default {
    actions: {
        async login({dispatch , commit}, {email, password}){
            try{
               let response = await firebase.auth().signInWithEmailAndPassword(email , password);
               console.log(response);
            }catch(e){
                throw e;
            }
        }
    }
}