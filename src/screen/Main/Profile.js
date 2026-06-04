
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

const Profile = ({ setIsLoggedIn }) => {

const { user, setUser } = useContext(ChatContext);

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
          source={require('../../assets/profileimage.png')}
        />

        <Text style={styles.userName}> {user?.name}</Text>

        <Text style={styles.userTag}> {user?.email} </Text>
      </View>

      {/* LOGOUT */}
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
    backgroundColor: '#fff',
  },

  header: {
    alignItems: 'center',
    paddingVertical: 40,
  },

  profileImage: {
    height: 140,
    width: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: '#fff',
  },

  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },

  userTag: {
    fontSize: 14,
    color: 'grey',
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#007AFF',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 30,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});