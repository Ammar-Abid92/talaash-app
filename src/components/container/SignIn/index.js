import React, { useContext, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import CustomButton from '../../common/Button';
import { LanguageContext } from '../../../context/LanguageContext';
import { ThemeContext } from '../../../context/ThemeContext';
import { EMAIL_REGEX } from '../../../constants/utils';
import { useEffect } from 'react';
import { Avatar } from '../../common/Avatar';
import { useNavigation } from '@react-navigation/native';
import { signInService } from '../../../services/firebase';
import CustomToast from '../../common/Toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/slice/userSlice';
import { saveUserToAsyncStorage } from '../../../services/helper';


const { height, width, fontScale } = Dimensions.get('window');


const SignInForm = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [I18n, changeLanguage] = useContext(LanguageContext)
    const [theme, setTheme] = useContext(ThemeContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isVisible, setIsVisible] = useState(false)
    const [toastTitle, setToastTitle] = useState('')
    const [toastType, setToastType] = useState('')

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        if (email.length && !EMAIL_REGEX.test(email)) {

            setErrors({
                ...errors,
                email: "email address is formatted wrong"
            })
        } else {
            setErrors({
                ...errors,
                email: ""
            })
        }
    }, [password])


    const handleSignIn = () => {
        console.log('Sign In pressed', Object.values(errors), errors);

        if (!errors.email && !errors.password ) {

            signInService(email, password)
                .then(res => {
                    console.log(res)
                    const { displayName, email, emailVerified, phoneNumber, photoURL, uid } = res.user;
                    saveUserToAsyncStorage(res.user)
                    dispatch(setUser({ displayName, email, emailVerified, phoneNumber, photoURL, uid }))
                    setIsVisible(true)
                    setToastTitle("Sign in successful")
                    setToastType('success')
                })
                .catch(e => {
                    setIsVisible(true)
                    console.log(e)
                    setToastTitle(e)
                    setToastType('fail')
                })
        }
    };


    return (
        <View style={styles.mainContainer} >
            <Text style={{ ...styles.header, color: theme.dark }}>You need to login to report the missing person</Text>

            <ScrollView style={styles.container} >

                <TextInput
                    label={errors?.email ? errors.email : "Email address"}
                    value={email}
                    onChangeText={(text) => {
                        setErrors({
                            ...errors,
                            email: ''
                        })
                        setEmail(text)
                    }}
                    mode="outlined"
                    keyboardType="email-address"
                    style={styles.input}
                    activeOutlineColor={theme.backgroundColor}
                    error={errors.email}

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
                    style={{ ...styles.signUpText, color: theme.dark }}
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
                    disabled={!errors.email && !errors.password ? false : true}
                />
            </View>

            {isVisible && (
                <CustomToast
                    isVisible={isVisible}
                    onDismiss={() => {}}
                    title={toastTitle}
                    type={toastType}
                />
            )}
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
