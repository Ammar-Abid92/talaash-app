import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/routes';
import { NativeBaseProvider } from 'native-base';
import { LanguageProvider } from './src/context/LanguageContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { Provider } from 'react-redux'
import { store } from './src/redux/store';

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, [])

  return (

    <Provider store={store}>
      <ThemeProvider>
        <LanguageProvider>
          <Routes />
        </LanguageProvider>
      </ThemeProvider>
    </Provider>

  )
}

export default App  