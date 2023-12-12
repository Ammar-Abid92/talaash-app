import { theme } from 'native-base';
import React, { useContext, useState } from 'react';
import { View, ScrollView, Text, Button, StyleSheet, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RadioButton } from 'react-native-paper';
import { ThemeContext } from '../../../context/ThemeContext';
import { LanguageContext } from '../../../context/LanguageContext';
import CustomButton from '../../common/Button';
import * as ImagePicker from 'react-native-image-picker';
import { Avatar } from '../../common/Avatar';

const { height, width, fontScale } = Dimensions.get('window');


const MissingPersonReportForm = () => {

    const [I18n, changeLanguage] = useContext(LanguageContext)
    const [theme, setTheme] = useContext(ThemeContext)
    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [lastSeenLocation, setLastSeenLocation] = useState('');
    const [description, setDescription] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);


    const handleSubmit = () => {
        // Handle the submission of the form data (e.g., send it to Firebase or an API).
        // You can add your logic here.
        console.log('Form submitted');
    };

    const onAvatarChange = (image) => {
        console.log(image);
        // upload image to server here 
    };

    return (
        <View style={styles.mainContainer} >

            <Text style={styles.header}>Report a Missing Person</Text>
            <ScrollView style={styles.container}>

                <View style={styles.imageContainer}>
                    <Avatar
                        onChange={onAvatarChange}
                        source={require('../../../assets/images/absent-user.jpg')}
                        avatarWidth={200}
                        avatarHeight={200}
                    />
                </View>
                <TextInput
                    label="Full Name"
                    value={fullName}
                    onChangeText={(text) => setFullName(text)}
                    style={styles.input}
                    mode="outlined"
                    activeOutlineColor={theme.backgroundColor}
                />
                <TextInput
                    label="Age"
                    value={age}
                    onChangeText={(text) => setAge(text)}
                    keyboardType="numeric"
                    mode="outlined"
                    style={styles.input}
                    activeOutlineColor={theme.backgroundColor}


                />
                <Text style={styles.genderLabel}>Gender:</Text>
                <View style={styles.radioContainer}>
                    <RadioButton.Group onValueChange={(value) => setGender(value)} value={gender} >
                        <View style={styles.radioItem}>
                            <RadioButton value="male" color={theme.backgroundColor} />
                            <Text>Male</Text>
                        </View>
                        <View style={styles.radioItem}>
                            <RadioButton value="female" color={theme.backgroundColor} />
                            <Text>Female</Text>
                        </View>
                        <View style={styles.radioItem}>
                            <RadioButton value="female" color={theme.backgroundColor} />
                            <Text>Other</Text>
                        </View>
                    </RadioButton.Group>
                </View>
                <TextInput
                    label="Last Seen Location"
                    value={lastSeenLocation}
                    onChangeText={(text) => setLastSeenLocation(text)}
                    style={styles.input}
                    mode="outlined"
                    activeOutlineColor={theme.backgroundColor}


                />
                <TextInput
                    label="Description"
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    multiline
                    numberOfLines={4}
                    style={styles.input}
                    mode="outlined"
                    activeOutlineColor={theme.backgroundColor}

                />
            </ScrollView>
            <View style={styles.buttonContainer} >
                <CustomButton type="contained" title="Submit" btnColor={theme.backgroundColor} txtColor="#ffffff"
                    style={styles.buttonStyle} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 16,
    },
    container: {
        flex: 1,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 16
    },
    selectedImage: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        marginBottom: 16,
    },
    input: {
        marginBottom: 16,
    },
    genderLabel: {
        fontSize: 16,
        marginBottom: 8,
    },
    radioContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    radioItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    buttonContainer: {
        display: 'flex',
        width: width * 0.92,
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonStyle: {
        width: "80%",
    }
});

export default MissingPersonReportForm;
