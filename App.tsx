
import React from 'react'
import AppNavigator from './src/navigation/AppNavigator';
import ChatProvider from './src/context/ChatProvider';
import  ThemeProvider  from './src/context/ThemeProvider';

import 'react-native-get-random-values';

const App = () => {
  return (
    <ThemeProvider>
    <ChatProvider>
      <AppNavigator/>
    </ChatProvider>
    </ThemeProvider>
  )
}

export default App;
