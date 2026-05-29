
import React from 'react'
import AppNavigator from './src/navigation/AppNavigator';
import ChatProvider from './src/context/ChatProvider';
import 'react-native-get-random-values';

const App = () => {
  return (
    <ChatProvider>
      <AppNavigator />
    </ChatProvider>
  )
}

export default App;
