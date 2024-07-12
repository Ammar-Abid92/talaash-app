import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import MissingPersonReportForm from './ReportForm';
import SignInForm from '../SignIn';
import {useSelector} from 'react-redux';
import {removeUserFromAsyncStorage} from '../../../services/helper';
import useGetUserFromAsync from '../../../hooks/useGetUserFromAsync';

const FoundPerson = ({route, navigation}) => {
  //   removeUserFromAsyncStorage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const user = useSelector(state => state.user.user);
  const {userData} = useGetUserFromAsync(user);

  console.log('INSIDE---->', userData);

  return userData?.uid ? (
    <View style={styles.mainContainer}>
      <MissingPersonReportForm />
    </View>
  ) : (
    <View style={styles.mainContainer}>
      <SignInForm setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default FoundPerson;
