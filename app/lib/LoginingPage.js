import { StyleSheet, Image, View, SafeAreaView, TextInput, Button } from 'react-native';
import React, {useState} from 'react';

import Sockets from './Socket';


const showWebNotification = (title, options) => {
    if ('Notification' in window) {
        if (Notification.permission === 'granted') {
            new Notification(title, options);
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                new Notification(title, options);
            }
        });
        }
    }
};


export default function Logining({ navigation }) {

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
    const authorization = async () => {
        const answer = await Sockets.getServer(["SignIn", login, password]);
        console.log(answer);

        if (answer=="Success"){
            navigation.navigate('Main');
        }else{
            console.log('NO DATA');
        }
        
    };

    // функция отправки запроса на регестрацию
    const registaration = async () => {
        const answer = await Sockets.getServer(["SignUp", login, password]);
        console.log(answer);
        
        if (answer=="Success"){
            const title = 'Успешно';
            const options = {
            body: 'Вы успешно зарегистривовали нового пользователя,\nтеперь вы можете авторизоваться',
            };
            showWebNotification(title, options);
        } else{
            const title = 'Ошибка';
            const options = {
            body: 'Вы не можете зарегистрироваться прямо сейчас.\nПопробуйте снова, позже',
            };
            showWebNotification(title, options);
        }
    };

    // основной внешний вид
    return (
        <SafeAreaView style={styles.container}>
        {/* Иконка велосипедаиста */}
        <Image
            source={require('../assets/images/cycling.png')}
            style={styles.image}
        />

        <View style={styles.space} />

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

    image: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
    },
});
