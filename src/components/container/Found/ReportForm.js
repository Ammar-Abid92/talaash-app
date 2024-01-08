import { theme } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, Text, Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../../context/ThemeContext';
import { LanguageContext } from '../../../context/LanguageContext';
import CustomButton from '../../common/Button';
import * as ImagePicker from 'react-native-image-picker';
import { Avatar } from '../../common/Avatar';
import { collectionNames } from '../../../services/firebase/collectionsMap';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput, HelperText, Portal, RadioButton } from 'react-native-paper';
import Modal from "react-native-modal";
import { addDataToCollection, uploadImage } from '../../../services/firebase';
import useGetUserFromAsync from '../../../hooks/useGetUserFromAsync';
import CustomToast from '../../common/Toast';
import { useNavigation } from '@react-navigation/native';


const { height, width, fontScale } = Dimensions.get('window');


const MissingPersonReportForm = () => {

    const navigation = useNavigation();


    const [I18n, changeLanguage] = useContext(LanguageContext)
    const [theme, setTheme] = useContext(ThemeContext)

    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [lastSeenLocation, setLastSeenLocation] = useState('');
    const [description, setDescription] = useState('');
    const [selectedImageURL, setSelectedImageURL] = useState(null);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [uri, setUri] = useState(undefined);


    const [isVisible, setIsVisible] = useState(false)
    const [toastTitle, setToastTitle] = useState('')
    const [toastType, setToastType] = useState('')
    const [loading, setLoading] = useState(false)


    const { userData } = useGetUserFromAsync();

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setShowDatePicker(false)
        setShowTimePicker(true)

    };

    const onTimeChange = (selectedTime) => {

        const { nativeEvent } = selectedTime;
        const selectTime = nativeEvent.timestamp || time.getTime();
        setTime(new Date(selectTime));
        console.log("checkkk", time)
        setShowDatePicker(false)
        setShowTimePicker(false)
    }

    const emptyState = () => {
        setFullName('')
        setAge('')
        setGender('')
        setDescription('')
        setLastSeenLocation('')
        setSelectedImageURL(null)
        setDate(new Date())
        setTime(new Date())
        setUri(undefined)

    }

    console.log("LOADING--->", loading)

    const handleSubmit = async () => {

        setLoading(true)

        console.log('Form submitted');
        let dataToSubmit = {
            name: fullName,
            age: age,
            gender: gender,
            last_seen_location: lastSeenLocation,
            description: description,
            image: selectedImageURL || null,
            reported_by: userData?.uid,
            missing_date: date && time ? date?.toLocaleDateString('en-GB') + ' ' + time?.toLocaleTimeString() : new Date()
        }

        addDataToCollection(collectionNames.missing, dataToSubmit).then(resp => {

            console.log("DATA ADDED---->", resp)
            setIsVisible(true)
            setToastTitle("Person added successfully")
            setToastType('success')
            setLoading(false)

            setTimeout(() => {
                emptyState();
            }, 1000);
            
        }).catch(e => {

            console.log("ERR in data upload----->", e)
            setToastTitle(e)
            setToastType('fail')
            setLoading(false)
            setIsLoggedIn(false)
        })

    };

    const onAvatarChange = async (image) => {

        const { path } = image;
        let name = path.split('/')[path.split('/').length - 1]
        let URL = await uploadImage(name, path)
        console.log("URL HERE------>", URL)
        setSelectedImageURL(URL);

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
                        defaultURI={uri}
                        setUri={setUri}
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
                            <RadioButton value="other" color={theme.backgroundColor} />
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

                <TouchableOpacity onPress={() => {
                    if (showDatePicker || showTimePicker) {
                        setShowDatePicker(false)
                        setShowTimePicker(false)
                    }
                    setShowDatePicker(true)
                }} >

                    <TextInput
                        label="Select Missing date and time"
                        value={date && time ? date?.toLocaleDateString('en-GB') + ' ' + time?.toLocaleTimeString() : ""}
                        editable={false}
                        activeOutlineColor={theme.backgroundColor}
                        style={{ marginBottom: 20 }}

                    />
                </TouchableOpacity>

                {
                    showDatePicker && !showTimePicker && (

                        <Modal
                            isVisible={showDatePicker && !showTimePicker}
                            animationIn="slideInUp"
                            animationOut="slideOutDown"
                            style={{ margin: 0 }}
                            useNativeDriver
                            onBackdropPress={() => {
                                setShowDatePicker(false)
                                setShowTimePicker(false)
                            }}

                        >
                            <View style={styles.datePickerContainer}>
                                <DateTimePicker
                                    value={date ? date : ''}
                                    mode="date"
                                    display="default"
                                    onChange={onDateChange}
                                />
                            </View>
                        </Modal>
                    )
                }

                {!showDatePicker && showTimePicker && (

                    <Modal
                        isVisible={!showDatePicker && showTimePicker}
                        animationIn="slideInUp"
                        animationOut="slideOutDown"
                        style={{ margin: 0 }}
                        useNativeDriver
                        onBackdropPress={() => {
                            setShowDatePicker(false)
                            setShowTimePicker(false)
                        }}
                    >
                        <View style={styles.datePickerContainer}>
                            <DateTimePicker
                                value={time ? time : ''}
                                mode="time"
                                display="default"
                                onChange={onTimeChange}
                            />
                        </View>
                    </Modal>
                )}

            </ScrollView>
            <View style={styles.buttonContainer} >
                <CustomButton
                    type="contained"
                    title="Submit"
                    btnColor={theme.backgroundColor}
                    txtColor="#ffffff"
                    onPress={handleSubmit}
                    style={styles.buttonStyle}
                    loader={true}
                    disabled={fullName.length && selectedImageURL ? false : true}

                />
            </View>

            {isVisible && (
                <CustomToast
                    isVisible={isVisible}
                    onDismiss={() => { }}
                    title={toastTitle}
                    type={toastType}
                    setIsVisible={setIsVisible}
                />
            )}
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
        flex: 0.1,
        width: width * 0.91,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:1

    },
    buttonStyle: {
        width: "80%",
        justifyContent: 'center',
        alignItems: 'center',
    },

    datePickerContainer: {
        padding: 40,
    },
});

export default MissingPersonReportForm;
