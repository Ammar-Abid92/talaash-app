import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import useGetUserFromAsync from '../../../hooks/useGetUserFromAsync';
import SignInForm from '../SignIn';
import MissingPersonReportForm from './ReportForm';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_KEY } from '../../../constants';

const FoundPerson = () => {
  const { userData, setUserData } = useGetUserFromAsync();

  useFocusEffect(
    React.useCallback(() => {
      // Optional: Refresh user data on focus only if user is not already logged in
      if (!userData) {
        AsyncStorage.getItem(USER_KEY)
          .then(res => setUserData(res ? JSON.parse(res) : null))
          .catch(e => console.log('Error refreshing user data:', e));
      }
    }, [userData, setUserData])
  );

  return (
    <View style={styles.mainContainer}>
      {userData?.uid ? <MissingPersonReportForm /> : <SignInForm />}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default FoundPerson;
