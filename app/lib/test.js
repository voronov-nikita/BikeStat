import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

const App = () => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (text) => {
    setInputText(text);
  };

  const handleButtonPress = () => {
    console.log(inputText);
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10 }}
        placeholder="Type here..."
        onChangeText={handleInputChange}
        value={inputText}
      />
      <Button title="Show Input" onPress={handleButtonPress} />
    </View>
  );
};

export default App;
