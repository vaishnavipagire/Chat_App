
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

     //Check email
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

      //Login status
      await AsyncStorage.setItem(
        'isLoggedIn',
        'true'
      );
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
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
  },

  button: {
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  link: {
    marginTop: 20,
    textAlign: 'center',
    color: '#007AFF',
  },
});