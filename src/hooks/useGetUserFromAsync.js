import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { USER_KEY } from '../constants';

const useGetUserFromAsync = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await AsyncStorage.getItem(USER_KEY);
        setUserData(res ? JSON.parse(res) : null);
      } catch (error) {
        console.log('Error getting user from storage:', error);
        setUserData(null);
      }
    };

    fetchUserData();
  }, []); // Fetch only once on mount

  return { userData, setUserData };
};

export default useGetUserFromAsync;
