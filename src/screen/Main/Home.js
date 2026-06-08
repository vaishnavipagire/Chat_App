import { View, Text, FlatList, StyleSheet, TextInput, Image, TouchableOpacity} from 'react-native';
import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dots from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Search from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { ChatContext } from '../../context/ChatProvider';
import { Color } from '../../styles/Color';
import { Border } from '../../styles/Border';
import { Margin } from '../../styles/Margin';
import { padding } from '../../styles/Padding';
import{spacing} from '../../styles/Spacing';
import { fontsize } from '../../styles/FontSize';
import { size } from '../../styles/Size';

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
    paddingTop: padding.high,
    flexDirection: 'row',
    paddingHorizontal: padding.l,
    paddingBottom: padding.xxl,
    alignItems: 'center',
  },
  title: {
    fontSize: fontsize.large,
    color:Color.white,
    flex: 1,
    fontWeight: 'bold',
  },
  searchicon: {
    fontSize: fontsize.large,
    color:Color.white,
    marginRight: Margin.xxl,
  },
  dotsicon: {
    fontSize: fontsize.large,
    color:Color.white,
  },
  container2: {
    padding: padding.l,
  },
  searchicons: {
    position: 'absolute',
    top: spacing.large,
    left: spacing.large,
    zIndex: 1,
    color:Color. DarkGrayishBlue,
  },
  searchBar: {
    borderRadius: Border.xl,
    height: size.s,
    paddingLeft: padding.long,
    backgroundColor:Color.LightGray1,
    color:Color.black,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
   loaderText: {
    marginTop: Margin.l,
    color:Color.green,
    fontSize: fontsize.xl,
  },
  emptyContainer: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:Margin.long,
  },
  emptyText: {
    fontSize: fontsize.large,
    fontWeight: 'bold',
    color: Color.gray3,
    marginTop:Margin.xxl,
  },
  emptyText1: {
    fontSize: fontsize.l,
    color: Color.gray,
    marginTop: Margin.small,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: padding.l,
    borderBottomWidth: Border.A,
    borderBottomColor:Color.BrightGray,
  },
  image: {
    width:size.xl,
    height: size.xl,
  },
  textContainer: {
    flex:1,
    marginLeft:Margin.xxl,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-betwwen',
    alignItems:'center',
  },
  userName: {
    fontSize: fontsize.xl,
    fontWeight: '600',
    color:Color.black1,
    flex:1,
  },
  time: {
    fontSize: fontsize.A,
    color: Color.gray,
  },
  subText: {
    color: Color.gray,
    fontSize: fontsize.m,
  },
  container1: {
    backgroundColor:Color.LightGreen,
    borderRadius: Border.xl,
    height:size.large,
    width: size.large,
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.m,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor:Color.black1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  chaticon: {
    fontSize: fontsize.long,
    color: Color.white,
  },
});

