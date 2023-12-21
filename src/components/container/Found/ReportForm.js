import { theme } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, Text, Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../../context/ThemeContext';
import { LanguageContext } from '../../../context/LanguageContext';
import CustomButton from '../../common/Button';
import * as ImagePicker from 'react-native-image-picker';
import { Avatar } from '../../common/Avatar';
import { collectionNames } from '../../../services/firebase/collectionsMap';
import { getUserFromAsyncStorage } from '../../../services/helper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput, HelperText, Portal, RadioButton } from 'react-native-paper';
import Modal from "react-native-modal";
import { addDataToCollection } from '../../../services/firebase';


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
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [userData, setUserData] = useState({})

    useEffect(()=>{
        getUserFromAsyncStorage().then(res=>setUserData(res))
    }, [])

    console.log("userDATA------->",userData)

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

    const handleSubmit = async () => {

        console.log('Form submitted');
        let dataToSubmit = {
            name: fullName,
            age: age,
            gender: gender,
            last_seen_location: lastSeenLocation,
            description: description,
            image: selectedImage || '',
            reported_by: userData?.uid,
            missing_date: date && time ? date?.toLocaleDateString('en-GB') + ' ' + time?.toLocaleTimeString() : new Date()
        }

        try {
            console.log("dataToSubmit--->", dataToSubmit)
            let resp = await addDataToCollection(collectionNames.missing, dataToSubmit)
            console.log("DATA ADDED---->", resp)

        } catch (e) {
            console.log("ERR in data upload----->", e)
        }


    };

    const onAvatarChange = (image) => {
        console.log(image);
        selectedImage(image)
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

                {/* <Text onPress={() => setShowDatePicker(true)} style={{ fontSize: 20, marginBottom: 50, }}  >{`Missing date: ${date.toDateString()}`}</Text> */}

                <TouchableOpacity onPress={() => {
                    if (showDatePicker || showTimePicker){
                        setShowDatePicker(false)
                        setShowTimePicker(false)
                    }
                    setShowDatePicker(true)
                    console.log("HEREEEE", showDatePicker)
                }} >

                    <TextInput
                        label="Select Missing date and time"
                        value={ date && time ? date?.toLocaleDateString('en-GB') + ' ' + time?.toLocaleTimeString() : ""}
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
                <CustomButton type="contained" title="Submit" btnColor={theme.backgroundColor} txtColor="#ffffff" onPress={handleSubmit}
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
    },
    datePickerContainer: {
        padding: 40,
    },
});

export default MissingPersonReportForm;
