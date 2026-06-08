import React, {
  useEffect,
  useState,
} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelcomeScreen from '../screen/Auth/WelcomeScreen';
import SignIn from '../screen/Auth/SignIn';
import SignUp from '../screen/Auth/SignUp';
import BottomTab from './BottomTab';
import Chat from '../screen/Main/Chat';

const Stack = createNativeStackNavigator();
const AppNavigator = () => {

const [ isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLogin();
  },[]);

  const checkLogin = async () => {
    try {
      const value = await AsyncStorage.getItem( 'isLoggedIn');

      setIsLoggedIn(
       value === 'true'
      );
     } catch (error) {
      console.log(error);
    } 
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name="BottomTab"
            >
              {props => (
                <BottomTab
                  {...props}
                  setIsLoggedIn={setIsLoggedIn}
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="Chat"
              component={Chat}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="WelcomeScreen"
              component={
                WelcomeScreen
              }
            />

            <Stack.Screen
              name="SignIn">
              {props => (
                <SignIn
                  {...props}
                  setIsLoggedIn={
                    setIsLoggedIn
                  }
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="SignUp"
            >
              {props => (
                <SignUp
                  {...props}
                  setIsLoggedIn={
                    setIsLoggedIn
                  }
                />
              )}
            </Stack.Screen>
          </>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;