import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from '../screen/WelcomeScreen';
import SignIn from '../screen/SignIn';
import SignUp from '../screen/SignUp';
import HomeScreen from '../screen/HomeScreen';

const stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{headerShown:false}}
        />
        <stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown:false}}
        />
         <stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown:false}}
        />
         <stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown:false}}
        />
      </stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator;