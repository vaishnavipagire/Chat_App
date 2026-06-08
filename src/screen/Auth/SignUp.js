
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

const SignUp = ({ navigation,setIsLoggedIn }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Get setUser
  const { setUser } = useContext(ChatContext);

  const handleSignUp = async () => {
    try {
      if (
        !name.trim() ||
        !email.trim() ||
        !password.trim()
      ) {
        Alert.alert(
          'Validation',
          'Please fill all fields'
        );
        return;
      }
     //Get User Data
      const usersData = await AsyncStorage.getItem('users');

        //Parse users
      const users = usersData
        ? JSON.parse(usersData)
        : [];

     //Check exist email
      const emailExists = users.some(
        user =>
          user.email.toLowerCase() ===
          email.trim().toLowerCase()
      );
          //Email exist check
      if (emailExists) {
        Alert.alert(
          'Account Exists',
          'Email already registered'
        );
        return;
      }
       //Create new user
      const newUser = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password.trim(),
      };
       // Create upadate user array
      const updatedUsers = [...users, newUser];
        
      //Save user
      await AsyncStorage.setItem( 
        'users',
        JSON.stringify(updatedUsers)
      );
         //Save Current User
      await AsyncStorage.setItem(
         'currentUser',
        JSON.stringify(newUser)
      );

      // Save Login status
      await AsyncStorage.setItem(
        'isLoggedIn',
        'true'
      );
      //update context
      setUser(newUser);

      if(setIsLoggedIn){
        setIsLoggedIn(true);
       }

      Alert.alert(
        'Success',
        'Account created successfully',
      );
    } catch (error) {
      console.log(error);

      Alert.alert(
        'Error',
        'Something went wrong'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Create Account
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

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
        onPress={handleSignUp}>
        <Text style={styles.buttonText}>
          Sign Up
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('SignIn')
        }>
        <Text style={styles.link}>
          Already have an account?
          {' '}Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

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
    height:size.l,
    borderWidth: Border.s,
    borderColor:Color.gray1,
    borderRadius: Border.m,
    paddingHorizontal: padding.xs,
    marginBottom: Margin.xxl,
  },

  button: {
    height: size.l,
    backgroundColor:Color.DodgerBlue,
    borderRadius: Border.m,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color:Color.white,
    fontSize: fontsize.xl,
    fontWeight: '600',
  },

  link: {
    marginTop:Margin.xxxl,
    textAlign: 'center',
    color:Color.DodgerBlue,
  },
});