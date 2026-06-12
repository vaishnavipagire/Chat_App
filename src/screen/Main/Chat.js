import React, {
  useState,
  useContext,
  useEffect,
  useRef,
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
import { ThemeContext } from '../../context/ThemeProvider';
import { size } from '../../styles/Size';
import { fontsize } from '../../styles/FontSize';
import { Margin } from '../../styles/Margin';
import DropIcon from 'react-native-vector-icons/Feather';

const Chat = ({ route }) => {
  const isOnline = true;

  const { user, getMessages, sendMessage, markMsgRead } = useContext(ChatContext);
  const { theme } = useContext(ThemeContext);
  // console.log(theme);
  const styles = getStyles(theme);

  const receiverId = route.params?.receiverId;
  const receiverName = route.params?.receiverName;

  const flatListRef = useRef(null);

  useEffect(() => {
    if (receiverId) {
      markMsgRead(user?.id, receiverId);
    };
  }, [receiverId]);

  const [message, setMessage] = useState('');
  //Msg load-chat
  const messages = getMessages(user?.id, receiverId);
  //  console.log('Messages:',message);

  const scrollToBottom = () => {
  if (flatListRef.current && messages && messages.length > 0) {
    flatListRef.current.scrollToIndex({
      index: 0,
      animated: true,
    });
  }
};
  useEffect(()=>{
    scrollToBottom();
  },[messages]);

  const handleSend = () => {
    // console.log('Typed Message:', message );
    if (!message.trim()) {
      return;
    }
    const newMessage = {
      _id: Date.now().toString(),
      text: message,
      createdAt: new Date(),
      read: false,
      user: {
        _id: user.id,
        name: user.name,
      }
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
    scrollToBottom();
  };
  const renderItem = ({ item, index }) => {
    // console.log('Sender:',item.user?.name);
    // console.log('Message:',item.text);
    const isMe =
      item.user._id === user.id;

    const previousMessage = messages[index + 1];
    const isSameUser =
      previousMessage &&
      previousMessage.user._id === item.user._id;

    const showAvatar = !isSameUser;

    const match =
      item.text?.match(/(https?:\/\/[^\s]+)/g);

    const time = new Date(
      item.createdAt
    ).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    if (match)
      return (
        <View style={{
          alignSelf: isMe
            ? 'flex-end'
            : 'flex-start',
          margin: 8,
        }}>
          <Text style={styles.senderName}>
            {isMe ? 'You' : item.user.name}
          </Text>

          <LinkPreviewCard url={match[0]} />
          <Text style={styles.timeText}>
            {time} </Text>
        </View>
      )
    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: isMe
          ? 'flex-end'
          : 'flex-start',
        marginHorizontal: 8,
        marginVertical: 4,
      }}>
        <View style={styles.avatarContainer}>
          {showAvatar && !isMe && (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {(item.user?.name || '?')
                  .charAt(0)
                  .toUpperCase()}
              </Text>
            </View>
          )}
        </View>
        <View
          style={[
            styles.messageContainer,
            isMe
              ? styles.myMessage
              : styles.otherMessage,
          ]}>
          {showAvatar && (
            <Text style={[styles.senderName,
            {
              color: isMe
                ? '#fff'
                : theme.text,
            }
            ]}>
              {isMe ? 'You' : item.user.name}
            </Text>
          )}
          <Text style={[styles.messageText,
          {
            color: isMe ? '#fff' : theme.text
          }
          ]}>
            {item.text}
          </Text>
          <Text style={[styles.timeText,
          {
            color: isMe ? '#fff' : theme.text,
          }
          ]}> {time} </Text>
        </View>
      </View>
    )
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {receiverName}
        </Text>
        <Text style={styles.statusText}>
          {isOnline ? 'Online' : 'Offline'}
        </Text>
      </View>
      <FlatList
        ref={flatListRef} 
        data={messages}
        keyExtractor={item => item._id}
        renderItem={({ item, index }) =>
          renderItem({ item, index })
        }
        inverted
      />
      <TouchableOpacity style={styles.floatingDownArrow} onPress={scrollToBottom}>
        <DropIcon name="chevrons-down" size={25} color='black' />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type message..."
          placeholderTextColor={theme.subText}
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}>
          <Icon name="send" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Chat;
const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      height: size.xl,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
    },
    headerText: {
      fontSize: fontsize.xl,
      fontWeight: 'bold',
      color: theme.text,
    },
    timeText: {
      fontSize: fontsize.C,
      marginTop: Margin.A,
      alignSelf: 'flex-end',
      color: theme.text,
    },
    avatarContainer: {
      width: size.s,
      alignItems: 'center',
    },
    avatar: {
      height: 30,
      width: 30,
      borderRadius: 16,
      backgroundColor: theme.primary,
      alignItems: 'center',
      marginBottom: 26,
    },
    avatarText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 4,
    },
    statusText: {
      fontSize: 12,
      alignItems: 'center',
      color: theme.text,
    },
    floatingDownArrow: {
      position: 'absolute',
      bottom: 60,
      right: 10,
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    messageContainer: {
      maxWidth: '75%',
      padding: 10,
      margin: 8,
      borderRadius: 12,
    },
    myMessage: {
      alignSelf: 'flex-end',
      backgroundColor: theme.primary,
    },
    otherMessage: {
      alignSelf: 'flex-start',
      backgroundColor: theme.card,
      borderRadius: 12,
    },
    senderName: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 4,
      color: theme.text,
    },
    messageText: {
      paddingLeft: 5,
    },
    inputContainer: {
      flexDirection: 'row',
      padding: 10,
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderRadius: 20,
      paddingHorizontal: 15,
      backgroundColor: theme.card,
      color: theme.text,
    },
    sendButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginLeft: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
    },
    sendText: {
      color: '#007BFF',
      fontWeight: 'bold',
    },
  });


