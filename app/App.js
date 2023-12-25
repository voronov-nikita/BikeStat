import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, SafeAreaView, TextInput, Button } from 'react-native';

export default function App() {

  const [login, setInputLogin] = useState('');
  const [password, setInputPassword] = useState('');

  // функция изменения состояния текста ЛОГИНА
  const changeLogin = (textLogin) => {
    setInputLogin(textLogin);
  }

  // функция изменения состояния текста ПАРОЛЯ 
  const changePassword = (textPassword) => {
    setInputPassword(textPassword);
  }

  // функция отправки запроса на авторизацию
  const authorization = () => {
    console.log(login, password);
  };

  // функция отправки запроса на регестрацию
  const registaration = () => {
    console.log(login, password);
  };

  // основной внешний вид
  return (
    <SafeAreaView style={styles.container}>

      {/* <Image
        source={require('./assets/images/cycling.png')}
      /> */}

      <TextInput
        style={styles.textInput}
        placeholder="Login:"
        autoFocus={true}
        onChangeText={changeLogin}
        value={login}
      />

      <TextInput
        style={styles.textInput}
        placeholder="Password:"
        secureTextEntry={true}
        onChangeText={changePassword}
        value={password}
      />

      <Button 
        title="Войти"
        onPress={authorization} 
      />

      <Button
        style={styles.buttonInput}
        title="Зарегестрироваться"
        onPress={registaration} 
      />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },

  textInput: { 
    height: 40,
    borderColor: 'gray', 
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },

  buttonInput: {
    backgroundColor: '#000',
    color: 'white',
    padding: 10,
  }
});
