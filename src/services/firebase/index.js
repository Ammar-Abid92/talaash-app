import auth from "@react-native-firebase/auth"
import messaging from '@react-native-firebase/messaging';


export const signUpService = (email, password) => {

    return new Promise((resolve,reject)=>{
        if (email && password){

            auth().createUserWithEmailAndPassword(email, password).then(res=>{
                console.log("SIGN UP SUCCESSFUL ---->", res)
                resolve(res)
            })
            .catch(e=>{
                console.log("ERROR IN SIGN UP--->", e)
                reject(e.code)
            })
        } else {
            reject("Credentials are not provided correctly!")

        }
    })
}

export const signInService = (email, password) => {

    return new Promise((resolve,reject)=>{

        if (email && password){

            auth().signInWithEmailAndPassword(email, password).then(res=>{
                console.log("SIGN In SUCCESSFUL ---->", res)
                resolve(res)
            })
            .catch(e=>{
                console.log("ERROR IN SIGN In--->", e)
                reject(e.code)
            })
        } else {
            reject("Credentials are not provided correctly!")

        }
    })
}

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export const getToken = async () => {
    const token = await messaging().getToken();
    console.log("Token---->", token)
}