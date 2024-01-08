import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator, Button } from 'react-native-paper';


const CustomButton = ({ type, icon, onPress, title, btnColor, txtColor, style, disabled, loader }) => {
    console.log("LOADERRRRRRRRRRRRR----->", loader)
    return type === "elevated" ?
        <Button icon={icon ? icon : ""} mode="elevated" onPress={onPress} buttonColor={btnColor} textColor={txtColor} style={style} disabled={disabled}>
            {loader ? (
                <View>
                    <ActivityIndicator animating={true} color={txtColor} size="small" style={{ marginRight: 10 }} />
                </View>
            ) : null}
            <Text style={{ color: txtColor }}>{title}</Text>
        </Button>
        : type === "contained" ?
            <Button icon={icon ? icon : ""} mode="contained" onPress={onPress} buttonColor={btnColor} textColor={txtColor} style={style} disabled={disabled}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     {/* <ActivityIndicator animating={true} color='black' size="small" style={{ paddingHorizontal: 10 }} /> */}
                    {/* {loader && <ActivityIndicator animating={true} color={txtColor} size="small" style={{ marginRight: 10 }} />} */}
                     <Text style={{ color: txtColor }}>{title}</Text>
                </View>
            </Button>
            : type === "outlined" ?
                <Button icon={icon ? icon : ""} mode="outlined" onPress={onPress} buttonColor={btnColor} textColor={txtColor} style={style} disabled={disabled}>
                    {loader ? (
                        <View>
                            <ActivityIndicator animating={true} color={txtColor} size="small" style={{ marginRight: 10 }} />
                        </View>
                    ) : null}
                    <Text style={{ color: txtColor }}>{title}</Text>
                </Button>
                : type === "contained-tonal" ?
                    <Button icon={icon ? icon : ""} mode="contained-tonal" onPress={onPress} buttonColor={btnColor} textColor={txtColor} style={style} disabled={disabled}>
                        {loader ? (
                            <View>
                                <ActivityIndicator animating={true} color={txtColor} size="small" style={{ marginRight: 10 }} />
                            </View>
                        ) : null}
                        <Text style={{ color: txtColor }}>{title}</Text>
                    </Button>
                    : null
}

export default CustomButton
