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
import MissingNonIdeal from './NonIdeal';

const { height, width, fontScale } = Dimensions.get('window');


const MissingPeople = ({ navigation }) => {

    const [I18n, changeLanguage] = useContext(LanguageContext)

    const [theme, setTheme] = useContext(ThemeContext)
    const [loading, setLoading] = useState(true);
    const [nonIdeal, setNonIdeal] = useState(false)

    const { data } = useGetCollectionData(collectionNames.missing, setLoading, setNonIdeal)

    useEffect(() => {
        requestUserPermission();
        getToken();
    }, [])

    return !loading && !nonIdeal ? (
        <SafeAreaView style={styles.mainContainer} >

            <View style={styles.heading} >
                <Text style={{ ...styles.headingContent, color: theme.dark }} >
                    All missing people
                </Text>
            </View>

            <FlatList
                data={data}
                renderItem={List}
                keyExtractor={(item) => item.id}
                style={styles.flatList}
            />

            <View style={styles.buttonContainer} >
                <CustomButton type="contained" title="Want to add a missing person ? " btnColor={theme.backgroundColor} txtColor="#ffffff"
                    style={styles.buttonStyle}
                    onPress={() => navigation.navigate('found')}
                />
            </View>

        </SafeAreaView>

    ) : nonIdeal ? (

        <MissingNonIdeal />

    ) : (

        <View style={styles.flatList} >
            <ActivityIndicator animating={true} color="black" size={50} style={{ paddingHorizontal: 10, flex: 1 }} />
        </View>
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