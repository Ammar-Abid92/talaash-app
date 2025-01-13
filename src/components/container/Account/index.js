import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { themeStyleSheet, USER_KEY } from '../../../constants';
import { setUser } from '../../../redux/slice/userSlice';
import { removeUserFromAsyncStorage } from '../../../services/helper';
import CustomButton from '../../common/Button';

const Account = ({ route, navigation }) => {

  const [userDetails, setUserDetails] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
  AsyncStorage.getItem(USER_KEY).then(
    (res) => {
      setUserDetails(JSON.parse(res));
    }
  ).catch(
    (error) => {
      console.log('Error getting user from storage:', error);
      setUserDetails(null);
    }
  );
}, []);
  
console.log('userDetails', userDetails);


  return userDetails ? (
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>My Details</Text>
    </View>
    <View style={styles.profileContainer}>
      <Image
        style={styles.profileImage}
        source={{uri: userDetails?.uri ?? 'https://via.placeholder.com/150'}}
      />
      <Text style={styles.name}>{userDetails?.name}</Text>
      <Text style={styles.email}>{userDetails?.email}</Text>
      <Text style={styles.bio}>
        {`Address: ${userDetails?.address}, ${userDetails?.city}, ${userDetails?.country}.`}
      </Text>
      <Text style={styles.bio}>{`Phone: ${userDetails?.phone}`}</Text>
    </View>
    <View style={styles.buttonContainer}>
      <CustomButton
        type="contained"
        title="Logout"
        btnColor="#2196F3"
        txtColor="#ffffff"
        style={styles.buttonStyle}
        onPress={() => {
          removeUserFromAsyncStorage();
          dispatch(setUser(null));
          navigation.navigate('missing');
        }}
      />
    </View>
  </View>
  ) : (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: themeStyleSheet.primary,
          textAlign: 'center',
          marginTop: 100
        }}>
      Not Logged In</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 50,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 0.2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Account