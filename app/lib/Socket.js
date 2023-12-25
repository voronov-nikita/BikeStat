// Пример логики для WebSocket системы отправки данных


import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const WebSocketExample = () => {
  const [ws, setWs] = useState(null);
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  // Функция для установки соединения при нажатии на кнопку
  const connectWebSocket = () => {
    const socket = new WebSocket('ws://192.168.0.10:8888');

    socket.onopen = () => {
      console.log('WebSocket opened');
      setWs(socket);
    };

    socket.onmessage = (event) => {
      const received = event.data;
      console.log('Received message:', received);
      setReceivedMessage(received);
    };

    socket.onclose = (event) => {
      console.log('WebSocket closed:', event);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  };

  // Функция для отправки сообщения при нажатии на кнопку
  const sendMessage = () => {
    if (ws && message) {
      ws.send(message);
      setMessage('');
    }
  };

  // Функция для закрытия соединения
  const disconnectWebSocket = () => {
    if (ws) {
      ws.close();
      setWs(null);
    }
  };

  return (
    <View>
      <Text>WebSocket Example</Text>
      <Button title="Connect" onPress={connectWebSocket} />
      <TextInput
        placeholder="Type your message"
        value={message}
        onChangeText={(text) => setMessage(text)}
      />
      <Button title="Send" onPress={sendMessage} />
      <Button title="Disconnect" onPress={disconnectWebSocket} />
      <Text>Received message: {receivedMessage}</Text>
    </View>
  );
};

// export default WebSocketExample;
