import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screen/Main/Home';
import Profile from '../screen/Main/Profile';

import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomTab = ({ setIsLoggedIn }) => {

  return (

    <Tab.Navigator
      screenOptions={({ route }) => ({
       tabBarIcon: ({ color, size }) => {

          let iconName;

          if (route.name === 'Home') {
             iconName = 'home';
         } else if (route.name === 'Chat') {
            iconName = 'chatbubbles';
          }
          else if (route.name === 'Profile') {
          iconName = 'person';
         }
          return (
            <Icon
              name={iconName}
              size={size}
              color={color}
            />
          );
        },

        tabBarActiveTintColor: '#007BFF',
        tabBarInactiveTintColor: 'gray',

        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
        },
        headerShown: false,

      })}
    >
       <Tab.Screen
        name="Home"
        component={Home}
      />

      <Tab.Screen name="Profile">
        {props => (
          <Profile
            {...props}
            setIsLoggedIn={setIsLoggedIn}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>

  );

};

export default BottomTab;