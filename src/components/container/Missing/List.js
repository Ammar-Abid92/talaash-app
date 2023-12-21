import React, { useContext } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { dateAndTimeFormatter } from '../../../constants/utils';

const List = ({ item }) => {

    console.log("ITEM---->", item)

    return (
        <View style={styles.userContainer}>
            <Image source={{uri: item.image}} style={styles.profileImage} />
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.joinDate}>Missed on {item.missing_date}</Text>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        marginTop:8,

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