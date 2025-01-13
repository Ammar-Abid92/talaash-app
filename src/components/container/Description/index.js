/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { themeStyleSheet } from '../../../constants';
import { getUserDetailsById } from '../../../services/firebase';
import { shareContent } from '../../../services/helper';

const Description = ({ navigation, route }) => {
  const bio = route?.params?.bio;

  const userId = bio?.reported_by;
  const [adPosterDetails, setAdPosterDetails] = useState();

  const apiCall = async () => {
    try {
      const userData = await getUserDetailsById(userId);
      setAdPosterDetails(userData || {});
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    apiCall();
  }, [route, userId]);

  const handleShare = () => {
    shareContent({
      title: 'Missing Person Info !!',
      message: `Posted by: ${adPosterDetails?.name || 'Anonymous'}
        Contact #: ${adPosterDetails?.phone || 'N/A'}
        \nMissing Person Information:
        Name: ${bio?.name || 'N/A'}
        \nLast Seen Location: ${bio?.last_seen_location || 'N/A'}
        \nMissing Date: ${bio?.missing_date || 'N/A'}
        \n---- Download Talaash App to help find missing persons ----`,
    });
  };

  const handleContact = () => {
    if (adPosterDetails?.phone) {
      const phone = adPosterDetails.phone.replace('0', '+92');
      Linking.openURL(`tel:${phone}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.posterDetailsContainer}>
          <Image
            source={{
              uri: adPosterDetails?.uri || 'https://via.placeholder.com/150',
            }}
            style={styles.posterImage}
          />
          <TouchableOpacity
            style={styles.adPosterDetails}
            onPress={() =>
              navigation.navigate('profile', { adPoster: adPosterDetails })
            }>
            <Text style={styles.adPosterName}>
              Posted by: {adPosterDetails?.name || 'Anonymous'}
            </Text>
            <Text style={styles.adPosterInfo}>
              City: {adPosterDetails?.city || 'N/A'}
            </Text>
            <Text style={styles.adPosterInfo}>
              Phone: {adPosterDetails?.phone || 'N/A'}
            </Text>
          </TouchableOpacity>
        </View>

        <Card.Content>
          <Text style={styles.bioInfo}>Name: {bio?.name || 'N/A'}</Text>
          <Text style={styles.bioInfo}>Gender: {bio?.gender || 'N/A'}</Text>
          <Text style={styles.bioInfo}>
            Missing Location: {bio?.last_seen_location || 'N/A'}
          </Text>
          <Text style={styles.bioInfo}>
            Missing Date: {bio?.missing_date || 'N/A'}
          </Text>
          {bio?.image && (
            <Card.Cover
              style={styles.image}
              source={{ uri: bio.image }}
              resizeMode="contain"
            />
          )}
        </Card.Content>

        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
            <Icon name="check" size={20} color="#0362fc" />
            <Text style={styles.actionText}>Found</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Icon name="share" size={20} color="#0362fc" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleContact}>
            <Icon name="phone" size={20} color="#0362fc" />
            <Text style={styles.actionText}>Contact</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </ScrollView>
  );
};

export default Description;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  card: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 6,
  },
  posterDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  posterImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: themeStyleSheet.primary,
  },
  adPosterDetails: {
    marginLeft: 10,
    flex: 1,
    backgroundColor: themeStyleSheet.extraLightGray3,
    padding: 10,
    borderRadius: 10,
  },
  adPosterName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: themeStyleSheet.darkGray,
  },
  adPosterInfo: {
    fontSize: 14,
    color: themeStyleSheet.darkGray,
  },
  bioInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: themeStyleSheet.textPrimary,
  },
  image: {
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: themeStyleSheet.primary,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeStyleSheet.primary,
    padding: 10,
    borderRadius: 10,
    width: Dimensions.get('window').width / 3.5,
    justifyContent: 'center',
  },
  actionText: {
    color:"#0362fc",
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
