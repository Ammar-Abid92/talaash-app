import React, { useContext, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import CustomButton from '../../common/Button';
import { LanguageContext } from '../../../context/LanguageContext';
import { ThemeContext } from '../../../context/ThemeContext';
import { EMAIL_REGEX, PHONE_REGEX } from '../../../constants/utils';
import { useEffect } from 'react';
import { Avatar } from '../../common/Avatar';
import { useNavigation } from '@react-navigation/native';


const { height, width, fontScale } = Dimensions.get('window');


const SignInForm = () => {
    const navigation = useNavigation();

    const [I18n, changeLanguage] = useContext(LanguageContext)
    const [theme, setTheme] = useContext(ThemeContext)

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        email: '',
        phone: '',
        password: ''
    })

    useEffect(() => {
        if (phone.length && !PHONE_REGEX.test(phone)) {

            setErrors({
                ...errors,
                phone: "Phone number is wrong"
            })
        } else {
            setErrors({
                ...errors,
                phone: ""
            })
        }
    }, [password])


    const handleSignIn = () => {
        console.log('Sign In pressed');

    };


    return (
        <View style={styles.mainContainer} >
            <Text style={styles.header}>You need to login to report the missing person</Text>

            <ScrollView style={styles.container} >

                <TextInput
                    label={errors?.phone ? errors.phone : "Phone number"}
                    value={phone}
                    onChangeText={(text) => {
                        setErrors({
                            ...errors,
                            phone: ''
                        })
                        setPhone(text)
                    }}
                    mode="outlined"
                    keyboardType="number-pad"
                    style={styles.input}
                    activeOutlineColor={theme.backgroundColor}
                    placeholder="03xxxxxxxxx or +923xxxxxxxxx"
                    maxLength={13}
                    error={errors.phone}

                />

                <TextInput
                    label={errors?.password ? errors.password : "Your password"}
                    value={password}

                    onChangeText={(text) => {

                        setPassword(text)
                    }}
                    mode="outlined"
                    secureTextEntry
                    style={styles.input}
                    activeOutlineColor={theme.backgroundColor}
                    error={errors.password}

                />

                <Text
                    style={styles.signUpText}
                    onPress={() => { navigation.navigate("authRoutes") }}
                >
                    New user ? Sign up please
                </Text>


            </ScrollView>
            <View style={styles.buttonContainer} >
                <CustomButton
                    type="contained"
                    title="Log in"
                    btnColor={theme.backgroundColor}
                    txtColor="#ffffff"
                    style={styles.buttonStyle}
                    onPress={handleSignIn}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    header: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    container: {
        flex: 0.75,
        marginTop: 20
    },
    input: {
        marginBottom: 16,
    },
    buttonContainer: {
        flex: 0.2,
        width: width * 0.91,
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonStyle: {
        width: "80%",
    },
    signUpText: {
        marginTop: 20,
        fontSize: 15,
        textDecorationLine: 'underline',
        textAlign: 'center'
    },
});

export default SignInForm;
