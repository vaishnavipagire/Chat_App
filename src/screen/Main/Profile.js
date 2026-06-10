
import React, {useContext,} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChatContext } from '../../context/ChatProvider';
import { Color } from '../../styles/Color';
import { Border } from '../../styles/Border';
import { Margin } from '../../styles/Margin';
import { padding } from '../../styles/Padding';
import { fontsize } from '../../styles/FontSize';
import { size } from '../../styles/Size';
import {Switch} from 'react-native';
import { ThemeContext } from '../../context/ThemeProvider';

const Profile = ({ setIsLoggedIn }) => {

const { user, setUser } = useContext(ChatContext);

const {darkMode ,setDarkMode} = useContext(ThemeContext);
//  console.log('Dark Mode:',darkMode);

  // LOGOUT
  const handleLogout = async () => {
    try {

      //Remove Login status
      await AsyncStorage.removeItem('isLoggedIn');

      //Clear global USer
      setUser(null);

      //Update Login State   
      setIsLoggedIn(false);

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
         <Image style={styles.profileImage}
          source={require('../../assets/profileimage.png')} />
        <Text style={styles.userName}> {user?.name}</Text>
       <Text style={styles.userTag}> {user?.email} </Text>

    <View style ={styles.switchContainer}>
      <Text>Dark Mode</Text>
    </View>

      <Switch
       value={darkMode}
       onValueChange={setDarkMode}/>
    </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogout}>
       <Text style={styles.buttonText}> Logout </Text>
     </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Color.white,
  },

  header: {
    alignItems: 'center',
    paddingVertical: padding.large,
  },

  profileImage: {
    height:size.big,
    width: size.big,
    borderRadius: Border.xxl,
    borderWidth: Border.xs,
    borderColor: Color.white,
  },

  userName: {
    fontSize: fontsize.big,
    fontWeight: 'bold',
    marginTop: Margin.l,
    color: Color. gray20,
  },

  userTag: {
    fontSize: fontsize.m,
    color:Color.gray,
    marginBottom: Margin.l,
  },
  switchContainer:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:20,
  },
 button: {
    backgroundColor: Color. DodgerBlue,
    marginHorizontal:Margin.xxl,
    padding: padding.l,
    borderRadius: Border.xm,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom:Margin.large,
  },

  buttonText: {
    color: Color.white,
    fontSize: fontsize.xl,
    fontWeight: 'bold',
  },
});