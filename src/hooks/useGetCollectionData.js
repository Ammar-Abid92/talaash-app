import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';

const useGetCollectionData = (collectionName, setLoading) => {

    const [data, setData] = useState([])

    useEffect(()=>{

        firestore().collection(collectionName).onSnapshot(querySnapshot => {
            let myData = []
            querySnapshot.forEach(documentSnapshot => {
                myData.push({
                    ...documentSnapshot.data(),
                    id: documentSnapshot.id,
                })
            });
            setData(myData)
            setLoading(false)
        }, (error => {
            console.log("ERROR FETCHING COLLECTION----->", error)
        }));
    }, [collectionName])

    return { data }

}

export default useGetCollectionData;