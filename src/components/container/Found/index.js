import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import MissingPersonReportForm from './ReportForm'
import SignInForm from '../SignIn'
import {AsyncStorage} from 'react-native';


const FoundPerson = ({ route, navigation }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

    useEffect(() => {
        checkUserAvailability()
    })

    const checkUserAvailability = async () => {
        const userId = await AsyncStorage.getItem('userId');
        setIsUserLoggedIn(userId ? true : false)
    }


    return isUserLoggedIn ? (
        <View style={styles.mainContainer} >
            <MissingPersonReportForm />
        </View>
    ) : (
        <View style={styles.mainContainer} >
            <SignInForm />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex:1
    }
})

export default FoundPerson