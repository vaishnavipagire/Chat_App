import React, {
  useEffect,
  useState,
} from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import WelcomeScreen from '../screen/WelcomeScreen';
import SignIn from '../screen/SignIn';
import SignUp from '../screen/SignUp';
import BottomTab from './BottomTab';
import Chat from '../screen/Chat';
import Home from '../screen/Home';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {

  //Login State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //Loaddding state
  const [loading, setLoading] = useState(true);

  // CHECK LOGIN STATUS
  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {

    try {
      //Get store value
      const value = await AsyncStorage.getItem('isLoggedIn');

      //State update
      setIsLoggedIn(value === 'true');//false

    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };

  // LOADING
  if (loading) {
    return null;
  }

  return (

    <NavigationContainer>

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>

        {isLoggedIn ? (
          <>
            <Stack.Screen
              name="BottomTab">
              {props => (
                <BottomTab
                  {...props}
                  setIsLoggedIn={
                    setIsLoggedIn
                  }
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="Chat"
              component={Chat}

              options={({ route }) => ({
                headerShown: false,

                title:
                  route.params
                    ?.userName ||
                  'Chat',

                headerStyle: {
                  backgroundColor:
                    '#065D54',
                },

                headerTintColor:
                  '#fff',

                headerTitleStyle: {
                  fontWeight:
                    'bold',
                },
              })}
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
              component={SignUp}
            />

            <Stack.Screen
              name="Chat"
              component={Chat}

              options={({ route }) => ({
                headerShown: false,

                title:
                  route.params
                    ?.userName ||
                  'Chat',

                headerStyle: {
                  backgroundColor:
                    '#065D54',
                },

                headerTintColor:
                  '#fff',

                headerTitleStyle: {
                  fontWeight:
                    'bold',
                },
              })}
            />
            {/* <Stack.Screen
              name="Home"
              component={Home}
            /> */}
          </>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;