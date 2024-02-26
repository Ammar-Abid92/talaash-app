/* eslint-disable prettier/prettier */
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {
  getFirestore,
  collection,
  addDoc,
} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

export const signUpService = (
  email,
  password,
  name,
  address,
  city,
  country,
  uri,
  phone
) => {
  return new Promise((resolve, reject) => {
    if (email && password) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          // Save user information to Firestore
          let {uid} = auth().currentUser;
          const singleUser = {
            email,
            uid,
            name,
            address,
            city,
            country,
            uri,
            phone,
          };
          console.log(
            'AUTH>CURR==',
            auth().currentUser,
            'Single User, ==',
            singleUser
          );
          let result = saveUserToFirestore(singleUser);
          resolve(result);
        })
        .then(() => {
          console.log(
            'User signed up successfully and user information saved to Firestore'
          );
        })
        .catch(e => {
          console.log('ERROR IN SIGN UP--->', e);
          reject(e.code);
        });
    } else {
      reject('Credentials are not provided correctly!');
    }
  });
};

export const signInService = (email, password) => {
  return new Promise((resolve, reject) => {
    if (email && password) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          console.log('SIGN In SUCCESSFUL ---->', res);
          resolve(res);
        })
        .catch(e => {
          console.log('ERROR IN SIGN In--->', e);
          reject(e.code);
        });
    } else {
      reject('Credentials are not provided correctly!');
    }
  });
};

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
  console.log('Token---->', token);
};

export const addDataToCollection = async (collectionName, data) => {
  const db = getFirestore();
  const docRef = await addDoc(collection(db, collectionName), data);
  console.log('Document written ', docRef);
  return docRef;
};

export const uploadImage = async (imageName, path) => {
  try {
    const storageRef = storage().ref(`images/${imageName}`);
    const response = await fetch(path);
    const imageBlob = await response.blob();
    await storageRef.put(imageBlob);
    const downloadURL = await storageRef.getDownloadURL();
    console.log('URL----->', downloadURL);
    return downloadURL;
  } catch (e) {
    console.log('ERRORRR----->', e);
  }
};

// Function to save user information to Firestore
const saveUserToFirestore = async user => {
  try {
    const {email, uid, name, address, city, country, uri, phone} = user;

    await firestore().collection('users').doc(uid).set({
      email,
      uid,
      name,
      address,
      city,
      country,
      uri,
      phone,
    });

    console.log('User information saved to Firestore');
    return await user;
  } catch (error) {
    console.error('Error saving user information to Firestore:', error);
    throw error;
  }
};

// Function to get user details by ID
export const getUserDetailsById = async userId => {
  try {
    const userDoc = await firestore().collection('users').doc(userId).get();

    if (userDoc.exists) {
      // Extract user data from the document
      const userData = userDoc.data();
      return userData;
    } else {
      // Handle the case when the user document does not exist
      console.log('User not found');
      return null;
    }
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error('Error fetching user details:', error);
    return null;
  }
};

// // Example usage
// const userId = 'your_user_id'; // Replace with the actual user ID
// getUserDetailsById(userId).then((userData) => {
//   if (userData) {
//     console.log('User Details:', userData);
//     // Do something with the user details
//   } else {
//     console.log('User not found or error occurred');
//   }
// });
