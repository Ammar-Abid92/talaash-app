import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import MissingPersonReportForm from './ReportForm'
import SignInForm from '../SignIn'
import { useSelector } from 'react-redux';
import { getUserFromAsyncStorage } from '../../../services/helper';


const FoundPerson = ({ route, navigation }) => {
    
    const user = useSelector(state=>state.user.user)
    const [userData, setUserData] = useState(null);

    console.log("USER in redux----->", user)

    useEffect(() => {
        checkUserFromStorage();
      }, []);


      const checkUserFromStorage = async () => {
        const storedUser = await getUserFromAsyncStorage();
        console.log("User in ASYNC---->", storedUser)
        if (storedUser) {
            setUserData(storedUser);
        }
      };

    return userData?.uid ? (
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