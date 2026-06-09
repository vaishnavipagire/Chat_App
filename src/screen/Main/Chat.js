import React, {
  useState,
  useContext,
} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

import { ChatContext } from '../../context/ChatProvider';
import Icon from 'react-native-vector-icons/Ionicons';
import LinkPreviewCard from '../../component/LinkPreviewCard';

const Chat = ({route}) => {
  const isOnline = true ;

  const { user, getMessages, sendMessage } = useContext(ChatContext);

  const receiverId = route.params?.receiverId;
  const receiverName = route.params?.receiverName;

  const [message, setMessage] = useState('');

  //Msg load-chat
  const messages = getMessages(
    user?.id,
    receiverId,
  );
  //  console.log('Messages:',message);

  const handleSend = () => {
    // console.log('Typed Message:', message );
     if (!message.trim()) {
      return;
    }

    const newMessage = {
      _id: Date.now().toString(),
      text: message,
      createdAt: new Date(),
      user: {
        _id: user.id,
        name: user.name,
      },
    };
    // console.log('New Message:', newMessage );

     //Save Msg Async
    sendMessage(
      user.id,
      receiverId,
      [newMessage],
    );
    // console.log('Message sent ');
    setMessage('');
  };

  const renderItem = ({ item }) => {
    // console.log('Sender:',item.user?.name);
    // console.log('Message:',item.text);

    const isMe = 
    item.user._id === user.id;

    const match = 
    item.text?.match(/(https?:\/\/[^\s]+)/g);

    const time = new Date(
      item.createdAt
    ).toLocaleTimeString([],{
      hour:'2-digit',
      minute:'2-digit',
    }
  );

    if(match)
      return(
        <View style={{
                alignSelf:isMe
                ?'flex-end'
                :'flex-start',
                margin:8,
        }}>
          <Text style={styles.senderName}>
          {isMe ? 'You': item.user.name}
        </Text>

        <LinkPreviewCard url={match[0]}/>
         <Text style={styles.timeText}>
          {time} 
          </Text>
        </View>
       )
    return (
      <View
        style={[
          styles.messageContainer,
          isMe
            ? styles.myMessage
            : styles.otherMessage,
        ]}>
           <Text style={styles.senderName}>
          {isMe ? 'You': item.user.name}
        </Text>
        
          <Text style={styles.messageText}> {item.text}  </Text>
      
           <Text style={styles.timeText}> {time} </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
     <View style={styles.header}>
        <Text style={styles.headerText}>
          {receiverName}
        </Text>
        <Text style={styles.statusText}>
           {isOnline ?'Online':'Offline'}
         </Text>
      </View>
        
      <FlatList
       data={messages}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type message..."
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}>
        <Icon
        name="send"
        size={24}
        color='#4280EF'
        />
    </TouchableOpacity>
         </View>
       </View>
  );
};

export default Chat;
const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#fff',
  },
 header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeText:{
     fontSize:10,
     marginTop:4,
     alignSelf:'flex-end',
     color:'#666',
  },
statusText:{
  fontSize:12,
  alignItems:'center',
},
  messageContainer: {
    maxWidth: '75%',
    padding: 10,
    margin: 8,
    borderRadius: 12,
  },
 myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007BFF',
  },
otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
    borderRadius:12,
  },
senderName:{
  fontSize:12,
  fontWeight:'bold',
  marginBottom:4,
  color:'#444',
},
  messageText: {
    color: '#000',
  },

  inputContainer: {
    flexDirection:'row',
    padding: 10,
  },
 input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
  },
 sendButton: {
    width:50,
    height:50,
    borderRadius:25,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems:'center',
    marginLeft:10,
  },
  sendText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },

});