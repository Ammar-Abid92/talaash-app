import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_KEY } from '../constants';

const useGetUserFromAsync = (isLoggedIn) => {

    const [userData, setUserData] = useState(null)

    useEffect(() => {

        AsyncStorage.getItem(USER_KEY).then(res => {
            setUserData(res ? JSON.parse(res) : null)
            console.log("USER IN ASYN--->", userData, res)
        }).catch(e => {
            console.log('Error getting user from storage:', error);
            setUserData(null);
        })
        
    }, [isLoggedIn])

    return { userData }

}

export default useGetUserFromAsync;