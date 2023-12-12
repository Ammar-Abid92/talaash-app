import React, { useContext } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const List = ({ item }) => {
    
    return (
        <View style={styles.userContainer}>
            <Image source={item.profileImage} style={styles.profileImage} />
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.joinDate}>{item.joinDate}</Text>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        backgroundColor: '#EDF9FE',
        margin:2,

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