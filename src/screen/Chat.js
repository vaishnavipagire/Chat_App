import React, {
  useCallback,
  useContext,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat';
import {
  ChatContext,
} from '../context/ChatProvider';

const Chat = ({ route }) => {
  const { user, getMessages, sendMessage } = useContext(ChatContext);

  const receiverId = route.params?.receiverId;
  console.log("receiverId: ", receiverId);


  const receiverName = route.params?.receiverName;
  console.log("receiverName: ", receiverName);

  const messages = getMessages(user?.id, receiverId);

  const onSend = useCallback(
    (newMessages = [],

    ) => {
      sendMessage(
        user.id,
        receiverId,
        newMessages,
      );
    },
    [
      user,
      receiverId,
    ],
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {receiverName}
        </Text>
      </View>

      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: user.id,
          name: user.name,
        }}
        alwaysShowSend
        scrollToBottom
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  headerTitle:
  {
    fontSize: 18,
    fontWeight: '600',
  },
});