import React, { useContext, useEffect, useState } from 'react'
import { View, Text, FlatList, Image, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import List from './List';
import CustomButton from '../../common/Button';
import { LanguageContext } from '../../../context/LanguageContext';
import { ThemeContext } from '../../../context/ThemeContext';
import { getCollectionData, getToken, requestUserPermission } from '../../../services/firebase';
import { collectionNames } from '../../../services/firebase/collectionsMap';
import { ActivityIndicator } from 'react-native';
import useGetCollectionData from '../../../hooks/useGetCollectionData';

const { height, width, fontScale } = Dimensions.get('window');


const MissingPeople = ({ navigation }) => {

    const [I18n, changeLanguage] = useContext(LanguageContext)
    
    const [theme, setTheme] = useContext(ThemeContext)
    const [loading, setLoading] = useState(true);
    
    const { data } = useGetCollectionData(collectionNames.missing, setLoading)
    
    useEffect(() => {
        requestUserPermission();
        getToken();
    }, [])

    return (
        <SafeAreaView style={styles.mainContainer} >

            <View style={styles.heading} >
                <Text style={{ ...styles.headingContent, color: theme.dark }} >
                    All missing people
                </Text>
            </View>



            {!loading ? (

                <FlatList
                    data={data}
                    renderItem={List}
                    keyExtractor={(item) => item.id}
                    style={styles.flatList}
                />
            ) : (
                <ActivityIndicator />
            )}


            <View style={styles.buttonContainer} >
                <CustomButton type="contained" title="Want to add a missing person ? " btnColor={theme.backgroundColor} txtColor="#ffffff"
                    style={styles.buttonStyle}
                    onPress={() => navigation.navigate('found')}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
    },
    heading: {

        marginTop: 10,
        marginLeft: 8,
        marginBottom: 5
    },
    headingContent: {
        fontSize: 20,
    },
    flatList: {
        flex: 1,
        padding: 16,
    },
    buttonContainer: {
        flex: 0.2,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonStyle: {
        width: "80%",
    }
});

export default MissingPeople