import React, {
  createContext,
  useState,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Create Context
export const ChatContext = createContext();

//Asyncstorage Msg Save
const STORAGE_KEY = 'chatConversations';

// PROVIDER
const ChatProvider = ({ children }) => {

  const [conversations, setConversations] = useState({});
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

 // LOAD DATA
  useEffect(() => {
    loadConversations();
    loadUser();
    loadUsers();
  },[]);

  const loadConversations = async () => {
    try {
      const data = await AsyncStorage.getItem(
        STORAGE_KEY,
      );
      if (data) {
        setConversations(
          JSON.parse(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const saveConversations = async data => {
    try {
      setConversations(data);
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const createChatId = (
    userA,
    userB,
  ) => {
    return [
      String(userA),
      String(userB),
    ]
      .sort()
      .join('_');
  };
   
  const getMessages = (
    currentUserId,
    targetUserId,
  ) => {
    const chatId = 
    createChatId(
      currentUserId,
      targetUserId,
    );
    return (
      conversations[chatId] || []
    );
  };

  const sendMessage = async (
    currentUserId,
    targetUserId,
    newMessages,
  ) => {
    try {
      const chatId = createChatId(
        currentUserId,
        targetUserId,
      );

      const updated = {
        ...conversations,

        [chatId]: [
          ...newMessages,
          ...(conversations[
            chatId
          ] || []),
        ],
      };
      await saveConversations(updated);
    } catch (error) {
      console.log(error);
    }
  }
  // LOAD CURRENT USER
  const loadUser = async () => {
    try {
      const savedUser =
        await AsyncStorage.getItem('currentUser');

      if (savedUser) {
        setUser(
          JSON.parse(savedUser))
      };
    } catch (error) {
      console.log(error);
    }
  };
  // LOAD ALL USERS
  const loadUsers = async () => {
    try {
      const savedUsers =
        await AsyncStorage.getItem(
          'users',
        );

      if (savedUsers) {
        setUsers(
          JSON.parse(savedUsers),
        )
      };
    } catch (error) {
      console.log(error);
    }
  };
  const refreshUsers = async () => {
    await loadUsers();
  }

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        users,
        setUsers,
        refreshUsers,

        conversations,
        getMessages,
        sendMessage,

        loadUser,
      }}>

      {children}

    </ChatContext.Provider>
  );
};

export default ChatProvider;