/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {Button} from 'react-native-paper';
import CustomButton from '../../common/Button';
import {themeStyleSheet} from '../../../constants';
import {ThemeContext} from '../../../context/ThemeContext';
import {removeUserFromAsyncStorage} from '../../../services/helper';
import {useDispatch} from 'react-redux';
import {setUser} from '../../../redux/slice/userSlice';
const {height, width, fontScale} = Dimensions.get('window');

const ProfileScreen = ({navigation, route}) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const dispatch = useDispatch();

  const profileData = route?.params?.adPoster;
  console.log(profileData);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Reported By</Text>
      </View>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={{uri: profileData?.uri ?? 'https://via.placeholder.com/150'}}
        />
        <Text style={styles.name}>{profileData?.name}</Text>
        <Text style={styles.email}>{profileData?.email}</Text>
        <Text style={styles.bio}>
          {`Address: ${profileData?.address}, ${profileData?.city}, ${profileData?.country}.`}
        </Text>
        <Text style={styles.bio}>{`Phone: ${profileData?.phone}`}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          type="contained"
          title="Logout"
          btnColor={theme.backgroundColor}
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
  );
};

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
    width: width * 0.91,
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

export default ProfileScreen;
