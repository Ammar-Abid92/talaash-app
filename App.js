import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/routes';
import { NativeBaseProvider } from 'native-base';
import { LanguageProvider } from './src/context/LanguageContext';
import { ThemeProvider } from './src/context/ThemeContext';

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, [])

  return (
    <ThemeProvider>
      <LanguageProvider>
        {/* below is the props that is being passed to the language provider */}
        <Routes />
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App