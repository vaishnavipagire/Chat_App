import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={style.imagecontainer}>
      <ImageBackground
        source={require('../assets/image1.jpg')} resizeMode="cover" style={style.imagecontainer}>
        <View style={style.maincontainer}>
          <Text style={style.WelTxt}>Welcome</Text>
          <Text style={style.text}>Lets get started</Text>


          <View>
            <Text style={style.existTxt}>Existing customer/ Get started</Text>
            <TouchableOpacity style={style.Btncontainer} onPress={() => navigation.navigate('SignIn')}>
              <Text style={style.btnTxt}>Sign in</Text>
            </TouchableOpacity>
          </View>

          <View style={style.text1container}>
            <Text style={style.CutoTxt}>New customer?</Text>
            <Text style={style.createTxt} onPress={() => navigation.navigate('SignUp')}>Create new account </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default WelcomeScreen;
const style = StyleSheet.create({
  maincontainer: {
    paddingTop: 134,
    paddingHorizontal: 60,
    alignItems: 'center',
  },
  WelTxt: {
    fontWeight: 'bold',
    fontSize: 42,
    color: '#4280EF',
    alignSelf: 'flex-start'
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '2C2C2C',
    paddingTop: 10,
  },
  imagecontainer: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  existTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 10,
    paddingTop: 227,
    paddingLeft: 10,
    textAlign: 'center'
  },
  Btncontainer: {
    paddingTop: 13,
    backgroundColor: '#4280EF',
    height: 48,
    width: 321,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnTxt: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  text1container: {
    paddingTop: 27,
    flexDirection: 'row',
    paddingLeft: 24,
  },
  CutoTxt: {
    fontSize: 16,
    color: '#2C2C2C',
    fontWeight: 'bold',
  },
  createTxt: {
    fontSize: 16,
    color: '#4280EF',
    fontWeight: 'bold',
  },
})