import { View, Text, FlatList, StyleSheet, TextInput, Image, TouchableOpacity} from 'react-native';
import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dots from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Search from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { ChatContext } from '../../context/ChatProvider';
import { Color } from '../../styles/Color';

     const Home = () => { 
  const navigation = useNavigation();

  //Get users from context
  const { users, user,getMessages} = useContext(ChatContext);
   // console.log('users',users);

    const filteredUsers = users.filter(
      item => item.id !== user?.id
    )
    const getLastMessages = receiverId =>{
      const messages = getMessages(
        user?.id,
        receiverId
      );
      return messages.length > 0
      ? messages[0]
      : null;
    }
    const formatTime = date =>{
       if(!date) return '';

        const msgDate = new Date(date);

        const today = new Date();

        const yesterday = new Date();
        yesterday.setDate(today.getDate() -1 
      );

        //Today
        if
         (msgDate.toDateString() === today.toDateString()
        )
        {
           return msgDate.toLocaleTimeString([],{
            hour: '2-digit',
            minute: '2-digit',
        });
        };
        //Yesterday
          if
         (msgDate.toDateString() ===  
         yesterday.toDateString()
        ){
           return 'Yesterday';
        }
     }
  return (
    <View style={{ flex: 1, backgroundColor:Color.white }}>

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
            <Icons name="chat" size={80} color="Color.gray2" />
            <Text style={styles.emptyText}>No Chates Yet</Text>
            <Text style={styles.emptyText1}>Start a new conversation</Text>
          </View>
        }
        renderItem={({ item }) => {
           const lastMessage = getLastMessages(item.id);
           return (
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
                  <Text style={styles.userName}
                    numberOfLines={1}>
                    {item.name}</Text>
                   <Text style={styles.time}>
                    {formatTime( lastMessage?.createdAt)}</Text>
                </View>
                <Text style={styles.subText}
                   numberOfLines={1}>
                  {lastMessage?.text ||
                  'No message yet'}</Text>
              </View>
            </View>
          </TouchableOpacity>
       )}
      }
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
    backgroundColor: Color.green,
    paddingTop: 50,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color:Color.white,
    flex: 1,
    fontWeight: 'bold',
  },
  searchicon: {
    fontSize: 20,
    color:Color.white,
    marginRight: 15,
  },
  dotsicon: {
    fontSize: 20,
    color:Color.white,
  },
  container2: {
    padding: 15,
  },
  searchicons: {
    position: 'absolute',
    top: 25,
    left: 25,
    zIndex: 1,
    color:Color. DarkGrayishBlue,
  },
  searchBar: {
    borderRadius: 20,
    height: 40,
    paddingLeft: 45,
    backgroundColor:Color.LightGray1,
    color:Color.black,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
   loaderText: {
    marginTop: 10,
    color:Color.green,
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
    color: Color.gray3,
    marginTop: 15,
  },
  emptyText1: {
    fontSize: 15,
    color: Color.gray,
    marginTop: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor:Color.BrightGray,
  },
  image: {
    width: 55,
    height: 55,
  },
  textContainer: {
    flex:1,
    marginLeft: 15,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-betwwen',
    alignItems:'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color:Color.black1,
    flex:1,
  },
  time: {
    fontSize: 12,
    color: Color.gray,
  },
  subText: {
    color: Color.gray,
    fontSize: 14,
  },
  container1: {
    backgroundColor:Color.LightGreen,
    borderRadius: 20,
    height: 60,
    width: 60,
    position: 'absolute',
    bottom: 30,
    right: 17,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor:Color.black1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  chaticon: {
    fontSize: 26,
    color: Color.white,
  },
});

