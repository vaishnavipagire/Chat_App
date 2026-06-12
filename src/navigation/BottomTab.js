import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screen/Main/Home';
import Profile from '../screen/Main/Profile';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../context/ThemeProvider';
import { padding } from '../styles/Padding';
import { size } from '../styles/Size';

const Tab = createBottomTabNavigator();
const BottomTab = ({ setIsLoggedIn }) => {
  const { theme } = useContext(ThemeContext);

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

        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.subText,

        tabBarStyle: {
          height: size.large,
          paddingBottom: padding.C,
          backgroundColor: theme.card,
          borderTopColor: theme.subText,
        },
        tabBarLabelStyle: {
          color: theme.text,
        },
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTintColor: theme.text,
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