import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

// ASYNC STORAGE IMPORT
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const SignIn = () => {

  // NAVIGATION
  const navigation = useNavigation();

  // INPUT STATES
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ERROR STATES
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // PASSWORD SHOW/HIDE
  const [showPassword, setShowPassword] =
    useState(false);

  // LOGIN FUNCTION
  const handleLogin = async () => {

    let isValid = true;

    // CLEAR OLD ERRORS
    setEmailError('');
    setPasswordError('');

    // EMAIL VALIDATION
    if (email === '') {

      setEmailError('Email is required');

      Alert.alert(
        'Error',
        'Please enter email',
      );

      isValid = false;

    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        email,
      )
    ) {

      setEmailError('Enter valid email');

      Alert.alert(
        'Error',
        'Please enter valid email',
      );

      isValid = false;
    }

    // PASSWORD VALIDATION
    else if (password === '') {

      setPasswordError('Password is required');

      Alert.alert(
        'Error',
        'Please enter password',
      );

      isValid = false;

    } else if (password.length < 6) {

      setPasswordError(
        'Password must be at least 6 characters',
      );

      Alert.alert(
        'Error',
        'Invalid password',
      );

      isValid = false;
    }

    // LOGIN LOGIC
    if (isValid) {

      // GET DATA FROM ASYNC STORAGE
      const savedData =
        await AsyncStorage.getItem('userData');

      // CONVERT STRING INTO OBJECT
      const userData = JSON.parse(savedData);
      console.log(userData,'userdata');
      

      // CHECK USER EXISTS
      if (!userData) {

        Alert.alert(
          'Error',
          'No user found. Please sign up first',
        );

        return;
      }

      // CHECK EMAIL AND PASSWORD
      if (
        email === userData.email &&
        password === userData.password
      ) {

        Alert.alert(
          'Success',
          'Login successful',
        );

        navigation.navigate('Message');

      } else {

        Alert.alert(
          'Error',
          'Invalid email or password',
        );
      }
    }
  };

  return (
    <View style={style.titlecontainer}>

      {/* TITLE */}
      <Text style={style.SignInTXT}>
        Sign in
      </Text>

      {/* EMAIL */}
      <View style={style.emailcontainer}>

        <Text style={style.emailtxt}>
          Email
        </Text>

        <View style={style.emailinputcontainer}>

          <TextInput
            style={style.emailinput}
            placeholder="Enter email"
            value={email}
            onChangeText={text =>
              setEmail(text)
            }
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* EMAIL ERROR */}
        {emailError ? (
          <Text style={style.errorText}>
            {emailError}
          </Text>
        ) : null}
      </View>

      {/* PASSWORD */}
      <View style={style.pwdcontainer}>

        <Text style={style.pwdltxt}>
          Password
        </Text>

        <View style={style.pwdinputcontainer}>

          <TextInput
            style={style.pwdinput}
            placeholder="Enter password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={text =>
              setPassword(text)
            }
          />

          {/* EYE ICON */}
          <TouchableOpacity
            onPress={() =>
              setShowPassword(!showPassword)
            }>

            <Icon
              name={
                showPassword
                  ? 'eye'
                  : 'eye-off'
              }
              style={style.Eyeicon}
              size={20}
              color="#000"
            />
          </TouchableOpacity>
        </View>

        {/* PASSWORD ERROR */}
        {passwordError ? (
          <Text style={style.errorText}>
            {passwordError}
          </Text>
        ) : null}

        {/* FORGOT PASSWORD */}
        <View style={style.forgotcontainer}>
          <Text style={style.forgotTXT}>
            Forgot password?
          </Text>
        </View>

        {/* SIGN IN BUTTON */}
        <TouchableOpacity
          style={style.Btncontainer}
          onPress={handleLogin}>

          <Text style={style.btnTxt}>
            Sign in
          </Text>
        </TouchableOpacity>

        {/* SIGN UP */}
        <TouchableOpacity
          style={style.row}
          onPress={() =>
            navigation.navigate('SignUp')
          }>

          <Text style={style.Txt}>
            Don't have an account?
          </Text>

          <Text style={style.Txt1}>
            SignUp
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;

const style = StyleSheet.create({

  titlecontainer: {
    flex: 1,
    paddingTop: 123,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },

  SignInTXT: {
    fontWeight: 'bold',
    fontSize: 42,
    color: '#4280EF',
  },

  emailcontainer: {
    paddingTop: 96,
  },

  emailtxt: {
    fontSize: 15,
    color: '#2C2C2C',
  },

  emailinputcontainer: {
    paddingTop: 9,
  },

  emailinput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 10,
    height: 48,
    width: '100%',
    color: 'black',
    paddingLeft: 16,
  },

  pwdcontainer: {
    paddingTop: 20,
  },

  pwdltxt: {
    fontSize: 15,
    color: '#2C2C2C',
  },

  pwdinputcontainer: {
    paddingTop: 12,
    position: 'relative',
  },

  pwdinput: {
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 10,
    height: 48,
    width: '100%',
    paddingLeft: 17,
    paddingRight: 50,
    fontSize: 16,
  },

  Eyeicon: {
    position: 'absolute',
    right: 15,
    top: -35,
  },

  forgotcontainer: {
    alignItems: 'flex-end',
    paddingTop: 15,
  },

  forgotTXT: {
    color: '#F78720',
    fontSize: 14,
  },

  Btncontainer: {
    backgroundColor: '#4280EF',
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  btnTxt: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  Txt: {
    fontSize: 13,
    alignSelf: 'center',
  },

  Txt1: {
    fontSize: 13,
    color: 'red',
    marginLeft: 5,
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
  },

  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 13,
  },
});