import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import Modal from "react-native-modal";
import { themeStyleSheet } from '../../../constants';
import { LanguageContext } from '../../../context/LanguageContext';
import spacing from '../../../constants/spacing';
import { ThemeContext } from '../../../context/ThemeContext';
import * as Animatable from "react-native-animatable";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CustomButton from '../Button';



const { height, width, fontScale } = Dimensions.get('window');


const CustomModal = ({
    type,
    toggle,
    setToggle,
    language,
    action1,

}) => {

    const anim = {
        from: {
            top: 0,
        },
        to: {
            top: 65,
        },
    };

    const [I18n, changeLanguage] = useContext(LanguageContext)
    const [theme, setTheme] = useContext(ThemeContext)


    if (type == "languageModal") {
        return (
            <Modal
                isVisible={toggle}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                style={{ margin: 0 }}
                useNativeDriver
                onBackdropPress={() => setToggle(false)}
            >
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <View
                        style={{
                            backgroundColor: "white",
                            width: width,
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15,
                        }}>
                        <View
                            style={{
                                height: height * 0.1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottomWidth: 2,
                                borderColor: theme.jacketColor,
                            }}>
                            <View style={{ marginLeft: 15 }}>
                                <Text style={{ fontSize: 16, color: theme.dark }}>
                                    {I18n.select_your_language}
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={{
                                    marginRight: 15,
                                    height: '100%',
                                    width: '10%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={() => setToggle(false)}>
                                <Text> X </Text>
                            </TouchableOpacity>
                        </View>

                        <View
                            style={{
                                height: height * 0.25,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 10
                            }}>
                            <View
                                style={{
                                    width: '100%',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <TouchableOpacity
                                    testID="english_button"
                                    style={
                                        language === 'en'
                                            ? { ...styles.btnLanguageSelect, backgroundColor: theme.highlight }
                                            : { ...styles.btnLanguage, backgroundColor: theme.highlight }
                                    }
                                    onPress={() => action1('en')}>

                                    <Text
                                        style={
                                            language === 'en'
                                                ? { ...styles.btnText, color: theme.text }
                                                : { ...styles.btnSubText, color: theme.text }
                                        }>
                                        ENGLISH
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    width: '100%',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <TouchableOpacity
                                    testID="roman_button"
                                    style={
                                        language === 'roman'
                                            ? { ...styles.btnLanguageSelect, backgroundColor: theme.highlight }
                                            : { ...styles.btnLanguage, backgroundColor: theme.highlight }
                                    }
                                    onPress={() => action1('roman')}>

                                    <Text
                                        style={
                                            language === 'roman'
                                                ? { ...styles.btnText, color: theme.text }
                                                : { ...styles.btnSubText, color: theme.text }
                                        }>
                                        ROMAN
                                    </Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
    else if (type === "themeModal") {
        return (
            <Modal
                isVisible={toggle}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                style={{ margin: 0 }}
                useNativeDriver
                onBackdropPress={() => setToggle(false)}
            >
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <View
                        style={{
                            backgroundColor: "white",
                            width: width,
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15,
                        }}>
                        <View
                            style={{
                                height: height * 0.1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottomWidth: 2,
                                borderColor: theme.jacketColor,
                            }}>
                            <View style={{ marginLeft: 15 }}>
                                <Text style={{ fontSize: 16, color: themeStyleSheet.mainColor }}>
                                    {I18n.select_theme}
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={{
                                    marginRight: 15,
                                    height: '100%',
                                    width: '10%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={() => setToggle(false)}>
                                <Text> X </Text>
                            </TouchableOpacity>
                        </View>

                        <View
                            style={{
                                height: height * 0.25,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 10
                            }}>
                            <View
                                style={{
                                    width: '100%',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <TouchableOpacity

                                    style={
                                        language === 'en'
                                            ? { ...styles.btnLanguageSelect, backgroundColor: theme.highlight }
                                            : { ...styles.btnLanguage, backgroundColor: theme.highlight }
                                    }
                                    onPress={() => action1("orangeTheme")}>

                                    <Text
                                        style={
                                            language === 'en'
                                                ? styles.btnText
                                                : styles.btnSubText
                                        }>
                                        ORANGE
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    width: '100%',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <TouchableOpacity
                                    testID="roman_button"
                                    style={
                                        language === 'roman'
                                            ? { ...styles.btnLanguageSelect, backgroundColor: theme.highlight }
                                            : { ...styles.btnLanguage, backgroundColor: theme.highlight }
                                    }
                                    onPress={() => action1('pinkTheme')}>

                                    <Text
                                        style={
                                            language === 'roman'
                                                ? { ...styles.btnText, color: theme.text }
                                                : { ...styles.btnSubText, color: theme.text }
                                        }>
                                        PINK
                                    </Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                    </View>
                </View>
            </Modal>
        )
    } else if (type === "welcome") {
        return (
            <Modal
                isVisible={toggle}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                style={{ margin: 0 }}
                useNativeDriver
                onBackdropPress={() => setToggle(false)}
            >
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <View
                        style={{
                            backgroundColor: "white",
                            width: width,
                            borderTopLeftRadius: 45,
                            borderTopRightRadius: 45,
                            height: height * 0.4
                        }}>


                        <View
                            style={{
                                height: height * 0.25,
                                justifyContent: 'center',
                                // alignItems: 'flex-start',
                                marginTop: 10
                            }}>
                            <View
                                style={{
                                    width: '80%',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',

                                }}>
                                <Text
                                    numberOfLines={2}
                                    style={
                                        {
                                            color: theme.dark,
                                            fontSize: 20,
                                            marginLeft:20,
                                            marginTop:8,
                                            fontFamily:'Roboto-MediumItalic'
                                        }
                                    }
                                >
                                    {I18n.pick_component}
                                </Text>
                            </View>

                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 20
                            }}
                            >

                                <Animatable.View animation={anim} iterationCount={'infinite'} easing='linear' duration={500} direction="alternate">
                                    <Icon name="arrow-down" size={35} color={theme.dark} />
                                </Animatable.View>
                            </View>

                            <View style={{
                                justifyContent: 'center',
                                width: width*0.5,
                                top:70,
                                marginLeft:"25%",
                            }} >
                                <CustomButton type="elevated" title="Let's grab" btnColor={theme.dark} txtColor={theme.secondaryText} onPress={()=>setToggle(false)} />
                            </View>


                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

export default CustomModal

const styles = StyleSheet.create({

    btnLanguage: {
        borderWidth: 1,
        width: width * 0.4,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 5,
        height: spacing.huge,
    },
    btnLanguageSelect: {

        width: width * 0.4,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 5,
        height: spacing.huge,
    },

    btnText: {
        fontWeight: "bold",
        fontSize: 16
    },

    btnSubText: {
        fontSize: 12
    },
})