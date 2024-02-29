import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import Routes from './src/routes';
import { LanguageProvider } from './src/context/LanguageContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

const App = () => {

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);

  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <LanguageProvider>
          <Routes />
        </LanguageProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
