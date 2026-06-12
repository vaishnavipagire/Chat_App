import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Color } from '../../styles/Color';
import { Border } from '../../styles/Border';
import { padding } from '../../styles/Padding';
import { fontsize } from '../../styles/FontSize';
import { size } from '../../styles/Size';
import { ThemeContext } from '../../context/ThemeProvider';

const WelcomeScreen = () => {
  const { theme } = useContext(ThemeContext);
  const style = getStyles(theme);
  const navigation = useNavigation();

  return (
    <View style={style.imagecontainer}>
      <ImageBackground
        source={
          theme.background === '#121212'
            ? null
            : require('../../assets/image1.jpg')} style={style.imagecontainer}>
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
const getStyles = theme =>
  StyleSheet.create({
    imagecontainer: {
      flex: 1,
      height: '100%',
      width: '100%',
      backgroundColor: theme.background,
    },
    maincontainer: {
      paddingTop: padding.highest,
      paddingHorizontal: padding.larger,
      alignItems: 'center',
    },
    WelTxt: {
      fontWeight: 'bold',
      fontSize: fontsize.xxl,
      color: theme.primary,
      alignSelf: 'flex-start'
    },
    text: {
      fontSize: fontsize.xl,
      fontWeight: 'bold',
      color: theme.text,
      paddingTop: padding.small,
    },
    existTxt: {
      fontSize: fontsize.xl,
      fontWeight: 'bold',
      paddingBottom: padding.small,
      paddingTop: padding.big,
      paddingLeft: padding.small,
      textAlign: 'center',
      color: theme.text
    },
    Btncontainer: {
      paddingTop: padding.m,
      backgroundColor: Color.blue,
      height: size.m,
      width: size.biggest,
      borderRadius: Border.xm,
      alignItems: 'center',
      backgroundColor: theme.primary,
    },
    btnTxt: {
      fontSize: fontsize.xl,
      color: Color.white,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
    text1container: {
      paddingTop: padding.xxxl,
      flexDirection: 'row',
      paddingLeft: padding.B,
    },
    CutoTxt: {
      fontSize: fontsize.xl,
      color: Color.black,
      fontWeight: 'bold',
      color: theme.text,
    },
    createTxt: {
      fontSize: fontsize.xl,
      color: theme.primary,
      fontWeight: 'bold',
    },
  })