import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Color } from '../../styles/Color';
import { Border } from '../../styles/Border';
import { padding } from '../../styles/Padding';
import { fontsize } from '../../styles/FontSize';
import { size } from '../../styles/Size';

const WelcomeScreen = () => {

  const navigation = useNavigation();

  return (
    <View style={style.imagecontainer}>
      <ImageBackground
        source={require('../../assets/image1.jpg')} style={style.imagecontainer}>
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
    paddingTop: padding.highest,
    paddingHorizontal: padding.larger,
    alignItems: 'center',
  },
  WelTxt: {
    fontWeight: 'bold',
    fontSize: fontsize.xxl,
    color:Color.blue,
    alignSelf: 'flex-start'
  },
  text: {
    fontSize: fontsize.xl,
    fontWeight: 'bold',
    color: Color.black,
    paddingTop: padding.small,
  },
  imagecontainer:{
    flex: 1,
    height: '100%',
    width: '100%',
  },
  existTxt: {
    fontSize: fontsize.xl,
    fontWeight: 'bold',
    paddingBottom: padding.small,
    paddingTop: padding.big,
    paddingLeft: padding.small,
    textAlign: 'center'
  },
  Btncontainer: {
    paddingTop:padding.m,
    backgroundColor: Color.blue,
    height:size.m,
    width:size.biggest,
    borderRadius: Border.xm,
    alignItems: 'center',
  },
  btnTxt: {
    fontSize:fontsize.xl,
    color: Color.white,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  text1container: {
    paddingTop: padding.xxxl,
    flexDirection: 'row',
    paddingLeft:padding.B,
  },
  CutoTxt: {
    fontSize: fontsize.xl,
    color: Color.black,
    fontWeight: 'bold',
  },
  createTxt: {
    fontSize: fontsize.xl,
    color: Color.blue,
    fontWeight: 'bold',
  },
})