import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';


const USER_KEY = 'loggedInUser';

export const saveUserToAsyncStorage = async (user) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.log('Error saving user to storage:', error);
  }
};

export const getUserFromAsyncStorage = async () => {
  try {
    const userJson = await AsyncStorage.getItem(USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.log('Error getting user from storage:', error);
    return null;
  }
};

export const removeUserFromAsyncStorage = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    console.log('Error removing user from storage:', error);
  }
};

