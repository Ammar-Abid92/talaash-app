import React from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import {AsyncStorage} from 'react-native';

const CustomHeader = ({ route }) => {
    const navigation = useNavigation();

    const handleIconPress = async () => {

        const userId = await AsyncStorage.getItem('userId');
        if (userId){
            navigation.navigate('account');
        }

    }

    return (
        <View style={{ backgroundColor: '#2196F3', padding: 16, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 0.25, borderBottomEndRadius: 50 }}>
            <Text style={{ fontSize: 20, width: 200, color: '#fff' }}>Talaash, Find your missing ones</Text>

            <Icon name="user" size={30} color={"#000000"} onPress={handleIconPress} />

        </View>
    );
};

export default CustomHeader;