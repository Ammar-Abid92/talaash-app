import React, { useContext } from 'react'
import { View, Text, FlatList, Image, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import List from './List';
import CustomButton from '../../common/Button';
import { LanguageContext } from '../../../context/LanguageContext';
import { ThemeContext } from '../../../context/ThemeContext';

const { height, width, fontScale } = Dimensions.get('window');


const MissingPeople = ({ navigation }) => {


    const [I18n, changeLanguage] = useContext(LanguageContext)
    const [theme, setTheme] = useContext(ThemeContext)

    const userData = [
        {
            id: '1',
            name: 'John Doe',
            joinDate: 'Missed on Jan 1, 2021',
            profileImage: require('../../../assets/images/person.jpeg'),
        },
        {
            id: '2',
            name: 'Jane Smith',
            joinDate: 'Missed on Feb 15, 2022',
            profileImage: require('../../../assets/images/person.jpeg'),
        },
        {
            id: '3',
            name: 'Jane Smith',
            joinDate: 'Missed on Feb 15, 2022',
            profileImage: require('../../../assets/images/person.jpeg'),
        },
        {
            id: '4',
            name: 'Jane Smith',
            joinDate: 'Missed on Feb 15, 2022',
            profileImage: require('../../../assets/images/person.jpeg'),
        }, {
            id: '5',
            name: 'Jane Smith',
            joinDate: 'Missed on Feb 15, 2022',
            profileImage: require('../../../assets/images/person.jpeg'),
        }, {
            id: '6',
            name: 'Jane Smith',
            joinDate: 'Missed on Feb 15, 2022',
            profileImage: require('../../../assets/images/person.jpeg'),
        }, {
            id: '7',
            name: 'Jane Smith',
            joinDate: 'Missed on Feb 15, 2022',
            profileImage: require('../../../assets/images/person.jpeg'),
        }, {
            id: '8',
            name: 'Jane Smith',
            joinDate: 'Missed on Feb 15, 2022',
            profileImage: require('../../../assets/images/person.jpeg'),
        }, {
            id: '9',
            name: 'Jane Smith',
            joinDate: 'Missed on Feb 15, 2022',
            profileImage: require('../../../assets/images/person.jpeg'),
        }, {
            id: '10',
            name: 'Jane Smith',
            joinDate: 'Missed on Feb 15, 2022',
            profileImage: require('../../../assets/images/person.jpeg'),
        }, {
            id: '11',
            name: 'Jane Smith',
            joinDate: 'Missed on Feb 15, 2022',
            profileImage: require('../../../assets/images/person.jpeg'),
        },
    ];

    return (
        <SafeAreaView style={styles.mainContainer} >

            <View style={styles.heading} >
                <Text style={styles.headingContent}  >
                    All missing people
                </Text>
            </View>

            <FlatList
                data={userData}
                renderItem={List}
                keyExtractor={(item) => item.id}
                style={styles.flatList}
            />

            <View style={styles.buttonContainer} >
                <CustomButton type="contained" title="Want to add a missing person ? " btnColor={theme.backgroundColor} txtColor="#ffffff"
                    style={styles.buttonStyle} 
                    onPress={()=>navigation.navigate('found')}
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