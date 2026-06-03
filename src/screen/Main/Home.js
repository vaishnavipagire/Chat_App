import { View, Text, FlatList, StyleSheet, TextInput, Image, TouchableOpacity} from 'react-native';
import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dots from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Search from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { ChatContext } from '../../context/ChatProvider';

const Home = () => { 
  const navigation = useNavigation();

  //Get users from context
  const { users, user} = useContext(ChatContext);
//   console.log('users',users);

    const filteredUsers = users.filter(
      item => item.id !== user?.id
    )

     return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>

      <View style={styles.container}>
        <Text style={styles.title}>Chats</Text>
        <Icon name="search" style={styles.searchicon} />
        <Dots name="dots-three-vertical" style={styles.dotsicon} />
      </View>

      <View style={styles.container2}>
        <Search name="search" style={styles.searchicons} size={20} />
        <TextInput style={styles.searchBar} placeholder="Search users" />
      </View>

   
       <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}

           //Empty State
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icons name="chat" size={80} color="#B0B0B0" />
            <Text style={styles.emptyText}>No Chates Yet</Text>
            <Text style={styles.emptyText1}>Start a new conversation</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Chat',
              {
                receiverId: item.id,
                receiverName: item.name,
              }
            )}>
            <View style={styles.itemContainer}>
              <Image source={require('../../assets/image3.jpg')} style={styles.image} />
              <View style={styles.textContainer}>
                <View style={styles.nameRow}>
                  <Text style={styles.userName}>{item.name}</Text>
                  <Text style={styles.time}>
                    {new Date().toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </View>
                <Text style={styles.subText}>Hello</Text>
              </View>
            </View>
          </TouchableOpacity>
        
        )}
      />
      <View style={styles.container1}>
        <Icons name="chat-bubble" style={styles.chaticon} />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#065D54',
    paddingTop: 50,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: 'white',
    flex: 1,
    fontWeight: 'bold',
  },
  searchicon: {
    fontSize: 20,
    color: '#FFFFFF',
    marginRight: 15,
  },
  dotsicon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  container2: {
    padding: 15,
  },
  searchicons: {
    position: 'absolute',
    top: 25,
    left: 25,
    zIndex: 1,
    color: '#767779',
  },
  searchBar: {
    borderRadius: 20,
    height: 40,
    paddingLeft: 45,
    backgroundColor: '#F0F0F0',
    color: '#000',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
   loaderText: {
    marginTop: 10,
    color: '#065D54',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1, justifyContent: 'center',
    alignItems: 'center',
    marginTop: 180,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 15,
  },
  emptyText1: {
    fontSize: 15,
    color: 'gray',
    marginTop: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  image: {
    width: 55,
    height: 55,
  },
  textContainer: {
    marginLeft: 15,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  time: {
    fontSize: 12,
    color: 'grey',
    paddingLeft: 180,
  },
  subText: {
    color: 'gray',
    fontSize: 14,
  },
  container1: {
    backgroundColor: '#1BC55C',
    borderRadius: 20,
    height: 60,
    width: 60,
    position: 'absolute',
    bottom: 30,
    right: 17,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  chaticon: {
    fontSize: 26,
    color: '#FFFFFF',
  },
});

