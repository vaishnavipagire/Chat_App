import React, {
  useCallback,
  useContext,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { GiftedChat, Bubble} from 'react-native-gifted-chat';
import {ChatContext} from '../../context/ChatProvider';
import LinkPreviewCard from '../../component/LinkPreviewCard';
import { Color } from '../../styles/Color';
import { Border } from '../../styles/Border';
import { Margin } from '../../styles/Margin';
import { fontsize } from '../../styles/FontSize';
import { size } from '../../styles/Size';

  const Chat = ({ route }) => {
  const isOnline = true ;

  const { user, getMessages, sendMessage } = useContext(ChatContext);

  const receiverId = route.params?.receiverId;
  console.log("receiverId: ", receiverId);

  const receiverName = route.params?.receiverName;
  console.log("receiverName: ", receiverName);

  //Load Msg
  const messages = getMessages(user?.id, receiverId);

  const onSend = useCallback(
    (newMessages = []) => {
      sendMessage(
        user.id,
        receiverId,
        newMessages,
      );
    },
    [ user,receiverId]);

    const renderBubble = (props)=>
      {
    const text = props.currentMessage?.text || '';

    //URL detect
    const match = text.match(/(https?:\/\/[^\s]+)/g);

       if(match){
       return(
     <LinkPreviewCard url={match[0]} />
      )
     }
      return <Bubble {...props} />;
    };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {receiverName}
        </Text>

        <Text style={styles.statusText}>
          {isOnline ?'Online':'Offline'}
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
        renderBubble={renderBubble}
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
    height:size.large,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: Border.s,
    borderBottomColor:Color.LightGray,
    backgroundColor:Color.white,
  },
  headerTitle:{
    fontSize: fontsize.xl,
    fontWeight: '600',
  },
  statusText:{
    fontSize:fontsize.A,
    color:Color.gray,
    marginTop:Margin.xs,
  },
});