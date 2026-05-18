import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const SignUp = () => {

  // NAVIGATION
  const navigation = useNavigation();

  // INPUT STATES
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // ERROR STATES
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] =
    useState('');

  // PASSWORD SHOW/HIDE STATES
  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // SIGN UP FUNCTION
  const handleSignUp = async () => {

    let isValid = true;

    // CLEAR OLD ERRORS
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

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
        'Password must be at least 6 characters',
      );

      isValid = false;
    }

    // CONFIRM PASSWORD VALIDATION
    else if (confirmPassword === '') {

      setConfirmPasswordError(
        'Confirm password is required',
      );

      Alert.alert(
        'Error',
        'Please confirm password',
      );

      isValid = false;

    } else if (confirmPassword !== password) {

      setConfirmPasswordError(
        'Passwords do not match',
      );

      Alert.alert(
        'Error',
        'Passwords  and confirn password do not match',
      );

      isValid = false;
    }

    // SAVE DATA IN ASYNCSTORAGE
    if (isValid) {

      // CREATE USER OBJECT
      const userData = {
        email: email,
        password: password,
      };

      // SAVE DATA
      await AsyncStorage.setItem(
        'userData',
        JSON.stringify(userData),
      );

      Alert.alert(
        'Success',
        'Account created successfully',
        [
          {
            text: 'OK',
            onPress: () =>
              navigation.navigate('SignIn'),
          },
        
        ],
      );

      // CLEAR INPUTS
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  
  };

  return (
    <View style={style.container}>

      {/* TITLE */}
      <Text style={style.SignUptxt}>
        SignUp
      </Text>

      <Text style={style.Text}>
        Please create a new account
      </Text>

      <View style={style.container1}>

        {/* EMAIL */}
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

        {/* PASSWORD */}
        <Text style={style.pwdtxt}>
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
              size={20}
              color="black"
              style={style.Eyeicon}
            />
          </TouchableOpacity>
        </View>

        {/* PASSWORD ERROR */}
        {passwordError ? (
          <Text style={style.errorText}>
            {passwordError}
          </Text>
        ) : null}

        {/* CONFIRM PASSWORD */}
        <Text style={style.Confirmtxt}>
          Confirm Password
        </Text>

        <View
          style={style.Confirminputcontainer}>

          <TextInput
            style={style.Confirminput}
            placeholder="Confirm password"
            secureTextEntry={
              !showConfirmPassword
            }
            value={confirmPassword}
            onChangeText={text =>
              setConfirmPassword(text)
            }
          />

          {/* CONFIRM PASSWORD EYE ICON */}
          <TouchableOpacity
            onPress={() =>
              setShowConfirmPassword(
                !showConfirmPassword,
              )
            }>

            <Icon
              name={
                showConfirmPassword
                  ? 'eye'
                  : 'eye-off'
              }
              size={20}
              color="black"
              style={style.confirmEyeicon}
            />
          </TouchableOpacity>
        </View>

        {/* CONFIRM PASSWORD ERROR */}
        {confirmPasswordError ? (
          <Text style={style.errorText}>
            {confirmPasswordError}
          </Text>
        ) : null}
      </View>

      {/* SIGN UP BUTTON */}
      <TouchableOpacity
        style={style.btncontainer}
        onPress={handleSignUp}>

        <Text style={style.btnTxt}>
          Sign Up
        </Text>
      </TouchableOpacity>

      {/* SIGN IN */}
      <TouchableOpacity
        style={style.row}
        onPress={() =>
          navigation.navigate('SignIn')
        }>

        <Text style={style.Txt}>
          Already have an account?
        </Text>

        <Text style={style.Txt1}>
          SignIn
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

const style = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 122,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },

  SignUptxt: {
    fontSize: 42,
    color: '#4280EF',
    fontWeight: 'bold',
  },

  Text: {
    paddingTop: 10,
    fontSize: 16,
    color: '#2C2C2C',
  },

  container1: {
    paddingTop: 43,
  },

  emailtxt: {
    fontSize: 15,
    color: '#222222',
  },

  emailinputcontainer: {
    paddingTop: 10,
  },

  emailinput: {
    borderWidth: 1,
    borderRadius: 10,
    height: 48,
    width: '100%',
    paddingLeft: 15,
    fontSize: 16,
  },

  pwdtxt: {
    fontSize: 15,
    color: '#222222',
    paddingTop: 15,
  },

  pwdinputcontainer: {
    paddingTop: 10,
    position: 'relative',
  },

  pwdinput: {
    borderWidth: 1,
    borderRadius: 10,
    height: 48,
    width: '100%',
    paddingLeft: 15,
    paddingRight: 50,
    fontSize: 16,
  },

  Eyeicon: {
    position: 'absolute',
    right: 15,
    top: -35,
  },

  Confirmtxt: {
    fontSize: 15,
    color: '#222222',
    paddingTop: 15,
  },

  Confirminputcontainer: {
    paddingTop: 10,
    position: 'relative',
  },

  Confirminput: {
    borderWidth: 1,
    borderRadius: 10,
    height: 48,
    width: '100%',
    paddingLeft: 15,
    paddingRight: 50,
    fontSize: 16,
  },

  confirmEyeicon: {
    position: 'absolute',
    right: 15,
    top: -35,
  },

  btncontainer: {
    backgroundColor: '#4280EF',
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
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
  },

  Txt1: {
    fontSize: 13,
    color: 'red',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },

  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 13,
  },
});
