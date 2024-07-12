/* eslint-disable prettier/prettier */
import React from 'react';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../components/container/SplashScreen';
import WelcomeScreen from '../components/container/WelcomeScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MissingPeople from '../components/container/Missing';
import FoundPerson from '../components/container/Found';
import {Text, View} from 'react-native';
import CustomTabBar from '../components/common/CustomTabBar';
import CustomHeader from '../components/common/TabBarHeader';
import SignUpForm from '../components/container/SignUp';
import SignInForm from '../components/container/SignIn';
import Account from '../components/container/Account';
import Description from '../components/container/Description';
import ProfileScreen from '../components/container/Profile';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function InitialRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="splashScreen"
      headerMode="none"
      screenOptions={{
        useNativeDriver: true,
        headerShown: false,
      }}>
      <Stack.Screen name="splashScreen" component={SplashScreen} />
      {/* <Stack.Screen name="welcome" component={WelcomeScreen} /> */}
      <Stack.Screen name="mainRoute" component={MainRoutes} />
    </Stack.Navigator>
  );
}

function AuthRoutes() {
  return (
    <Stack.Navigator initialRouteName="signUp" headerMode="none">
      <Stack.Screen
        name="signUp"
        component={SignUpForm}
        options={{
          title: 'Registeration',
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen name="signIn" component={SignInForm} />
    </Stack.Navigator>
  );
}

const MyTabsWithHeader = () => {
  return (
    <View style={{flex: 1}}>
      <CustomHeader />
      <TabRoutes />
    </View>
  );
};

function MainRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="home"
      headerMode="none"
      screenOptions={{
        useNativeDriver: true,
        headerShown: false,
      }}>
      <Stack.Screen name="home" component={MyTabsWithHeader} />
      <Stack.Screen name="authRoutes" component={AuthRoutes} />
      <Stack.Screen name="account" component={Account} />
      <Stack.Screen
        name="description"
        component={Description}
        options={{
          headerShown: true,
          title: 'Missing Description',
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          title: 'Reported By',
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: 'white',
        }}
      />
    </Stack.Navigator>
  );
}

function TabRoutes({route}) {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="missing"
        component={MissingPeople}
        options={{tabBarLabel: 'All missing persons'}}
      />
      <Tab.Screen
        name="found"
        component={FoundPerson}
        options={{tabBarLabel: 'Report missing person'}}
      />
    </Tab.Navigator>
  );
}

const appRoutes = () => {
  return (
    <NavigationContainer>
      <InitialRoutes />
    </NavigationContainer>
  );
};

export default appRoutes;
