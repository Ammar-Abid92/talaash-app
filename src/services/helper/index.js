import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_KEY } from '../../constants';



export const saveUserToAsyncStorage = async (user) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.log('Error saving user to storage:', error);
  }
};

export const removeUserFromAsyncStorage = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    console.log('Error removing user from storage:', error);
  }
};

