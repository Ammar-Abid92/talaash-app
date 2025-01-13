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

export const signUpService = async (
  email,
  password,
  name,
  address,
  city,
  country,
  uri,
  phone
) => {
  if (!email || !password) {
    throw new Error('Credentials are not provided correctly!');
  }

  try {
    // Create a new user with email and password
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    const { uid } = userCredential.user;

    const singleUser = {
      email,
      uid,
      name: name || 'Name',
      address: address || 'Address',
      city: city || 'City',
      country: country || 'Country',
      uri: uri || 'https://via.placeholder.com/150',
      phone: phone || 'phone',
    };

    await saveUserToFirestore(singleUser);

    console.log('User signed up successfully and information saved to Firestore');
    return singleUser;
  } catch (error) {
    console.log('Error during sign-up:', error);
    throw new Error(error.code || 'Error during sign-up');
  }
};

export const signInService = (email, password) => {
  return new Promise((resolve, reject) => {
    if (email && password) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(async userCredential => {
          const { uid } = userCredential.user; // Get the UID of the signed-in user
          console.log('SIGN IN SUCCESSFUL ---->', uid);

          // Fetch user details from Firestore
          try {
            const userDoc = await firestore()
              .collection('users')
              .doc(uid)
              .get();

            if (userDoc.exists) {
              console.log('USER DATA FROM FIRESTORE ---->', userDoc.data());
              resolve(userDoc.data());
            } else {
              console.error('No such user document in Firestore');
              reject('No user data found in Firestore');
            }
          } catch (firestoreError) {
            console.error('Error fetching user details from Firestore ---->', firestoreError);
            reject(firestoreError.message);
          }
        })
        .catch(e => {
          console.error('ERROR IN SIGN IN ---->', e);
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
    const { uid, ...userData } = user;
    await firestore().collection('users').doc(uid).set(userData);
    console.log('User information saved to Firestore:', userData);
    return userData;
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
