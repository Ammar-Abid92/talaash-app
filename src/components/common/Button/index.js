/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ActivityIndicator, Button} from 'react-native-paper';

const CustomButton = ({
  type,
  icon,
  onPress,
  title,
  btnColor,
  txtColor,
  style,
  disabled,
  loader,
}) => {
  console.log('LOADERRRRRRRRRRRRR----->', loader);
  return type === 'elevated' ? (
    <Button
      icon={icon ? icon : ''}
      mode="elevated"
      onPress={onPress}
      buttonColor={btnColor}
      textColor={txtColor}
      style={style}
      disabled={disabled}>
      {loader ? (
        <View>
          <ActivityIndicator
            animating={true}
            color={txtColor}
            size="small"
            style={{marginRight: 10}}
          />
        </View>
      ) : null}
      <Text style={{color: txtColor}}>{title}</Text>
    </Button>
  ) : type === 'contained' ? (
    <Button
      icon={icon ? icon : ''}
      mode="contained"
      onPress={onPress}
      buttonColor={btnColor}
      textColor={txtColor}
      style={style}
      disabled={disabled}
      loading={loader ? true : false}>
      {title}
    </Button>
  ) : type === 'outlined' ? (
    <Button
      icon={icon ? icon : ''}
      mode="outlined"
      onPress={onPress}
      buttonColor={btnColor}
      textColor={txtColor}
      style={style}
      disabled={disabled}>
      {loader ? (
        <View>
          <ActivityIndicator
            animating={true}
            color={txtColor}
            size="small"
            style={{marginRight: 10}}
          />
        </View>
      ) : null}
      <Text style={{color: txtColor}}>{title}</Text>
    </Button>
  ) : type === 'contained-tonal' ? (
    <Button
      icon={icon ? icon : ''}
      mode="contained-tonal"
      onPress={onPress}
      buttonColor={btnColor}
      textColor={txtColor}
      style={style}
      disabled={disabled}>
      {loader ? (
        <View>
          <ActivityIndicator
            animating={true}
            color={txtColor}
            size="small"
            style={{marginRight: 10}}
          />
        </View>
      ) : null}
      <Text style={{color: txtColor}}>{title}</Text>
    </Button>
  ) : null;
};

export default CustomButton;
