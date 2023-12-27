import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const host = 'ws://192.168.0.10:8090';

const App = () => {
  const [socket, setSocket] = useState(null);

  const connectServer = () => {
    const socket = new WebSocket(host);
    socket.onopen = () => {
      console.log('WebSocket connected');
      setSocket(socket);
    };
  }

  const sendDataToServer = () => {
    connectServer();
    if (socket && socket.readyState === WebSocket.OPEN) {
      const dataToSend = ["SignIn", "login", "password"];
      socket.send(JSON.stringify(dataToSend));
    }
  };

  // переда началом всей работы подключимся к серверу, чтобы потом не было проблемм
  // connectServer();
  return (
    <View>
      <Text>WebSocket Example</Text>
      <Button title="Send Data to Server" onPress={sendDataToServer} />
    </View>
  );
};

export default App;
