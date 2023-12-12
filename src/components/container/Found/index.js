import React from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import MissingPersonReportForm from './ReportForm'
import SignInForm from '../SignIn'

const FoundPerson = ({ route, navigation }) => {

    let user = false

    return user ? (
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