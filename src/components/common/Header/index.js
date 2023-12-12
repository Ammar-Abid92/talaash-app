import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { LanguageContext } from '../../../context/LanguageContext'
import { ThemeContext } from '../../../context/ThemeContext'
import { Appbar } from 'react-native-paper';


const Header = ({title, firstIcon, firstAction, secondIcon, secondAction, backAction}) => {

  const [I18n, changeLanguage] = useContext(LanguageContext)
  const [theme, setTheme] = useContext(ThemeContext)

  return (
    <Appbar.Header>
     {backAction ? <Appbar.BackAction onPress={backAction} /> : null }
      <Appbar.Content title={title} />
      <Appbar.Action icon={firstIcon} onPress={firstAction} />
      <Appbar.Action icon={secondIcon} onPress={secondAction} />
    </Appbar.Header>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
  }
})