/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {dateAndTimeFormatter} from '../../../constants/utils';
import {useNavigation} from '@react-navigation/native';

const List = ({item, navigation}) => {
  //   console.log('ITEM---->', item);

  return (
    <TouchableOpacity
      style={styles.userContainer}
      onPress={() => navigation.navigate('description', {bio: item})}>
      {item.image != null ? (
        <Image source={{uri: item?.image}} style={styles.profileImage} />
      ) : null}
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.joinDate}>Missed on {item.missing_date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 8,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'column',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  joinDate: {
    color: 'gray',
  },
});

export default List;
