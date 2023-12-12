import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';


const CustomButton = ({type, icon, onPress, title, btnColor, txtColor, style}) => {
  return type === "elevated" ?
    <Button icon={icon ? icon : ""} mode="elevated" onPress={onPress} buttonColor={btnColor} textColor={txtColor} style={style} >
        {title}
    </Button>
    : type === "contained" ?
    <Button icon={icon ? icon : ""} mode="contained" onPress={onPress} buttonColor={btnColor} textColor={txtColor} style={style} >
        {title}
    </Button>
    : type === "outlined" ?
    <Button icon={icon ? icon : ""} mode="outlined" onPress={onPress} buttonColor={btnColor} textColor={txtColor} style={style} >
        {title}
    </Button>
    : type === "contained-tonal" ?
    <Button icon={icon ? icon : ""} mode="contained-tonal" onPress={onPress} buttonColor={btnColor} textColor={txtColor} style={style} >
        {title}
    </Button>
    : null
}

export default CustomButton

const styles = StyleSheet.create({})