/* eslint-disable prettier/prettier */
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Button, Card, Chip, IconButton, Text} from 'react-native-paper';
import CustomButton from '../../common/Button';
import {ThemeContext} from '../../../context/ThemeContext';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {
  getFirestore,
  collection,
  addDoc,
} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {getUserDetailsById} from '../../../services/firebase';
import {themeStyleSheet} from '../../../constants';

const Description = ({navigation, route}) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const bio = route?.params?.bio;

  const userId = bio?.reported_by; // Replace with the actual user ID
  const [adPosterDetails, setAdPosterDetails] = useState();

  const apiCall = async () => {
    await getUserDetailsById(userId).then(userData => {
      if (userData) {
        // console.log('User Details:', userData);
        // Do something with the user details(
        setAdPosterDetails(userData);
      } else {
        console.log('User not found or error occurred');
      }
    });
  };
  useEffect(() => {
    apiCall();
  }, [route, userId, apiCall]);

  return (
    <View style={styles.container}>
      <Card style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 10,
            marginVertical: 10,
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri: adPosterDetails?.uri
                ? adPosterDetails?.uri
                : 'https://via.placeholder.com/150',
            }}
            style={styles.posterImage}
          />
          <TouchableOpacity
            style={{
              marginLeft: 10,
              borderRadius: 10,
              borderWidth: 0.5,
              padding: 8,
              width: Dimensions.get('window').width * 0.6,
              backgroundColor: themeStyleSheet.extraLightGray3,
            }}
            onPress={() =>
              navigation.navigate('profile', {
                adPoster: adPosterDetails,
              })
            }>
            <Text>
              Posted by: {adPosterDetails ? adPosterDetails?.name : 'Anonymous'}
            </Text>
            <Text>
              City: {adPosterDetails ? adPosterDetails?.city : 'Anonymous'}
            </Text>
            <Text style={{fontSize: 11, fontWeight: 'bold'}}>More...</Text>
          </TouchableOpacity>
        </View>

        <Card.Content>
          <Text variant="bodyMedium">Name: {bio.name}</Text>
          <Text variant="bodyMedium">
            Gender: {bio.gender ? bio.gender : ' -'}
          </Text>
          <Text variant="bodyMedium">
            Missing Location:{' '}
            {bio.last_seen_location ? bio.last_seen_location : ' -'}
          </Text>
          <Text variant="bodyMedium" style={{marginBottom: 20}}>
            Missing Date: {bio.missing_date}
          </Text>
          <Card.Cover
            style={{marginTop: 30, borderColor: 'blue', borderWidth: 1}}
            source={{uri: bio.image}}
            resizeMode="contain"
          />
        </Card.Content>

        <View
          style={{
            flexDirection: 'row',
            marginVertical: 250,
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <Button
            icon="question"
            buttonColor="#2196F3"
            textColor="white"
            mode="">
            Found
          </Button>

          <Button icon="share" buttonColor="#2196F3" textColor="white">
            Share
          </Button>
          <Button icon="message" buttonColor="#2196F3" textColor="white">
            Contact
          </Button>
        </View>
      </Card>
    </View>
  );
};

export default Description;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  posterImage: {
    width: 60,
    height: 60,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: 'blue',
  },
});
