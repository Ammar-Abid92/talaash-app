import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

const useGetCollectionData = collectionName => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [nonIdeal, setNonIdeal] = useState(false);

  useEffect(() => {
    firestore()
      .collection(collectionName)
      .onSnapshot(
        querySnapshot => {
          let myData = [];
          querySnapshot.forEach(documentSnapshot => {
            myData.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          setData(myData);
          setLoading(false);
        },
        error => {
          console.log('ERROR FETCHING COLLECTION----->', error);
          setError('error');
          setNonIdeal(true);
        }
      );
  }, [collectionName]);

  return {data, loading, error, nonIdeal};
};

export default useGetCollectionData;
