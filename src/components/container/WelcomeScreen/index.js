import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { LanguageContext } from '../../../context/LanguageContext'
import CustomModal from '../../common/Modal'
import en from '../../../languageConfig/en'
import roman from '../../../languageConfig/roman'
import { ThemeContext } from '../../../context/ThemeContext'
import { orangeTheme, pinkTheme } from '../../../constants/theme'
import { welcomeImg } from '../../../assets'
import Header from '../../common/Header'
import CustomButton from '../../common/Button'

const { height, width, fontScale } = Dimensions.get('window');


const WelcomeScreen = () => {

    const [I18n, changeLanguage] = useContext(LanguageContext)
    const [theme, setTheme] = useContext(ThemeContext)
    const [languageModal, setLanguageModal] = useState(false);
    const [themeModal, setThemeModal] = useState(false)
    const [language, setLanguage] = useState('en');
    const [welcomeModal, setWelcomeModal] = useState(false)



    useEffect(() => {
        let modalView = setTimeout(() => {
            setWelcomeModal(true)
        }, 3000)

        return () => clearTimeout(modalView);
    }, []);

    const handleSelectedLanguage = (lang) => {
        if (lang === "en") {
            changeLanguage(en)
        } else if (lang === "roman") {
            changeLanguage(roman)
        }
        setLanguage(lang)
        setLanguageModal(false)
    }

    const handleSelectedTheme = (theme) => {

        if (theme === "orangeTheme") {

            setTheme(orangeTheme)
        } else if (theme === "pinkTheme") {
            setTheme(pinkTheme)

        }
        setThemeModal(false)
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            {/* <Header title="Welcome" /> */}

            <View style={{ marginTop: 60, height: 90 }} >
                <Text style={{ fontSize: 30, color: theme.text, fontFamily: 'Inter-Bold' }}>
                    {I18n.welcome}
                </Text>
            </View>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                <Text style={{ fontSize: 18, color: theme.dark, fontFamily: 'Inter-Bold' }}>
                    {I18n.configure_app}
                </Text>
                <View style={{ flexDirection: 'row' }} >

                    <TouchableOpacity
                        onPress={() => setLanguageModal(true)}>
                        <View style={{ borderWidth: 1, width: width * 0.4, margin: 5, padding: 10, borderRadius: 15, backgroundColor: theme.highlight }} >
                            <Text>
                                Change Language ? Click here
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setThemeModal(true)}>
                        <View style={{ borderWidth: 1, width: width * 0.4, margin: 5, padding: 10, borderRadius: 15, backgroundColor: theme.highlight }} >
                            <Text>
                                Change Theme ? Click here
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>


            <View style={{ marginBottom: 60, width: width * 0.5 }} >
                <CustomButton type="contained" title="Next" btnColor={theme.backgroundColor} txtColor="#ffffff"
                />
            </View>

            {/* <CustomModal
                type="welcome"
                toggle={welcomeModal}
                setToggle={setWelcomeModal}
                language={language}
            /> */}

            {languageModal &&
                <CustomModal
                    type="languageModal"
                    toggle={languageModal}
                    setToggle={setLanguageModal}
                    language={language}
                    action1={handleSelectedLanguage}
                />
            }

            {themeModal &&
                <CustomModal
                    type="themeModal"
                    toggle={themeModal}
                    setToggle={setThemeModal}
                    action1={handleSelectedTheme}
                />
            }

        </View>


    )
}

export default WelcomeScreen