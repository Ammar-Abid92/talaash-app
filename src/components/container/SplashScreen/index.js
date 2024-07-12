import { View, Text, Image, Platform, Dimensions } from 'react-native'
import React from 'react'
import splashImg  from '../../../assets/images/talaash-splash.png'
// import { Spinner } from 'native-base'
import { ActivityIndicator } from 'react-native-paper';

import { themeStyleSheet } from '../../../constants'
import spacing from '../../../constants/spacing'

const SplashScreen = ({navigation}) => {

  const { height, width, fontScale } = Dimensions.get('window');

  setTimeout(() => {

    navigation.reset({
      routes: [{
          name: 'mainRoute',
          params: {
              fromSplash: true,
          }
      }]
  });

  }, 3000);


  return (
    <View testID='splash_screen' style={{ backgroundColor: "#fff", justifyContent: "center", alignItems: "center", height: "100%", }}>
      <Image
        source={splashImg}
        style={{ height: Platform.OS == 'android' ? height * 0.5 : 100, width: Platform.OS == 'android' ? width : 300, position: "absolute" }}
      />
      <View style={{ height: "50%", justifyContent: "center", alignItems: 'flex-end', flexDirection: 'row', marginTop:200, marginLeft:20 }}>
        <Text style={{ color: themeStyleSheet.mainColor, fontSize: 16 }}>Find your missing ones</Text>
        <ActivityIndicator animating={true} color="purple" size={20} style={{ height: 20, paddingHorizontal: 10 }} />
      </View>

    </View>
  )
}

export default SplashScreen