import React, {useState} from 'react';
import { StyleSheet, Image, View, SafeAreaView, TextInput, Button } from 'react-native';
import { connectServer, sendServer, getServer } from './Socket.js';


export default function Logining() {

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
        sendServer(["SignIn", login, password]);
        
    };

    // функция отправки запроса на регестрацию
    const registaration = () => {
        console.log(login, password);
    };

    // основной внешний вид
    return (
        <SafeAreaView style={styles.container}>
        {/* Иконка велосипедаиста */}
        <Image
        style={styles.mainIcon}
            source={require('../assets/images/cycling.png')}
        />


        {/* Поле ввода логина пользователя */}
        <TextInput
            style={styles.textInput}
            placeholder="Login: "
            autoFocus={true}
            onChangeText={changeLogin}
            value={login}
        />


        {/* Поле ввода пароля пользователя */}
        <TextInput
            style={styles.textInput}
            placeholder="Password: "
            secureTextEntry={true}
            onChangeText={changePassword}
            value={password}
        />

        <View>
            {/* Кнопка отправки запроса на вход */}
            <Button 
                style={styles.buttonInput}
                title="Войти"
                color="#000"
                onPress={authorization} 
            />

            {/* Отступ между кнопками */}
            <View style={styles.space} />

            {/* Кнопка отправки запроса на регестрацию */}
            <Button
            style={styles.buttonInput}
            color="#000"
            title="Зарегестрироваться"
            onPress={registaration} 
            />
        </View>

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
        marginBottom: 20,
        padding: 10,
    },

    buttonInput: {
        padding: 10,
        marginBottom: 50,
    },

    space:{
        width: 20,
        height: 5,
    },

    mainIcon:{

    }
});
