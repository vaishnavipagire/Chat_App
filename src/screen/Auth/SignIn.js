
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChatContext } from '../../context/ChatProvider';
import { Color } from '../../styles/Color';
import { Border } from '../../styles/Border';
import { Margin } from '../../styles/Margin';
import { padding } from '../../styles/Padding';
import { fontsize } from '../../styles/FontSize';
import { size } from '../../styles/Size';

const SignIn = ({ navigation,setIsLoggedIn}) => {

const {setUser} = useContext(ChatContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      if (!email.trim() || !password.trim()) {
        Alert.alert(
          'Validation',
          'Please enter email and password');
        return;
      }
      const usersData = await AsyncStorage.getItem('users');

      const users = usersData
        ? JSON.parse(usersData)
        : [];

          //Find match user
      const foundUser = users.find(
        user =>
          user.email.toLowerCase() ===
          email.trim().toLowerCase() &&
          user.password === password
      );

      if (!foundUser) {
        Alert.alert(
          'Login Failed',
          'Invalid email or password'
        );
        return;
      }

      //Save current user
      await AsyncStorage.setItem(
        'currentUser',
        JSON.stringify(foundUser)
      );

       //Save login status
      await AsyncStorage.setItem(
        'isLoggedIn',
        'true'
      );
      
      //Global user update
       setUser(foundUser);

     //Update login state
     if(setIsLoggedIn){
        setIsLoggedIn(true);
     }
    } catch (error) {
      console.log('Login Error:',error);

      Alert.alert(
        'Error',
        'Something went wrong'
      );
    }
  };

  return (
      <View style={styles.container}>
      <Text style={styles.title}> Sign In </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity 
         onPress={() =>
        navigation.navigate('SignUp')
        }>
        <Text style={styles.link}>Create Account </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: padding.xxl,
  },
 title: {
    fontSize: fontsize.high,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Margin.large,
  },

  input: {
    borderWidth: Border.s,
    borderColor:Color.gray1,
    borderRadius: Border.m,
    paddingHorizontal: padding.xs,
    height:size.l,
    marginBottom:Margin.xxl,
  },

  button: {
    height: size.l,
    borderRadius: Border.m,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:Color. DodgerBlue,
    marginTop: Margin.l,
  },

  buttonText: {
    color: Color.white,
    fontSize: fontsize.xl,
    fontWeight: '600',
  },

  link: {
    textAlign: 'center',
    marginTop: Margin.xxxl,
    color: Color.DodgerBlue,
  },
});