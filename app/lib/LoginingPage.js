import {
    StyleSheet,
    Image,
    View,
    TextInput,
    Button,
    Text,
    ImageBackground,
} from "react-native";
import React, { useState } from "react";

import Sockets from "./Socket";

// в переменной будут храниться последние введенные данные об успешной авторизации
// Это нужно для переноса параметров в другие файлы приложения
let userData = [];

// функция вызова уведомления операционной системы
const showWebNotification = (title, options) => {
    if ("Notification" in window) {
        if (Notification.permission === "granted") {
            new Notification(title, options);
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    new Notification(title, options);
                }
            });
        }
    }
};

// основная функция обработки пользовательского запроса на домашнюю страницу
export default function Logining({ navigation }) {
    const [message, setMessage] = useState("ВВЕДИТЕ ЛОГИН И ПАРОЛЬ");
    const [login, setInputLogin] = useState("");
    const [password, setInputPassword] = useState("");

    // функция изменения состояния текста ЛОГИНА
    const changeLogin = (textLogin) => {
        setInputLogin(textLogin);
    };

    // функция изменения состояния текста ПАРОЛЯ
    const changePassword = (textPassword) => {
        setInputPassword(textPassword);
    };

    // функция отправки запроса на авторизацию
    const authorization = async () => {
        const answer = await Sockets.getServer(["SignIn", login, password]);

        if (answer == "Success") {
            userData = [login, password];
            navigation.navigate("Main");
        } else {
            setMessage("Неверный логин или пароль, попробуйте снова.");
        }
    };

    // функция отправки запроса на регестрацию
    const registaration = async () => {
        const answer = await Sockets.getServer(["SignUp", login, password]);
        console.log(answer);

        if (answer == "Success") {
            const title = "Успешно";
            const options = {
                body: "Вы успешно зарегистривовали нового пользователя,\nтеперь вы можете авторизоваться",
            };
            showWebNotification(title, options);
            // сразу после регистрации авторизуем пользователя
            authorization();
        } else {
            const title = "Ошибка";
            const options = {
                body: "Вы не можете зарегистрироваться прямо сейчас.\nПопробуйте снова, позже",
            };
            showWebNotification(title, options);
            setMessage("Пользователь с таким логином уже зарегистривован.");
        }
    };

    // основной внешний вид
    return (
        <ImageBackground
            source={{ uri: require("../assets/images/bg1.png") }}
            style={styles.container}
        >

            {/* Иконка велосипедаиста */}
            <Image
                source={require("../assets/images/cycling.png")}
                style={styles.image}
            />

            <View style={styles.space} />
            {/* Сообщение о состоянии пользовательской авторизации */}
            <Text style={styles.headText}>{message}</Text>

            <View style={styles.space} />

            {/* Поле ввода логина пользователя */}
            <TextInput
                style={styles.textInput}
                placeholder="login"
                autoFocus={true}
                onChangeText={changeLogin}
                value={login}
            />

            {/* Поле ввода пароля пользователя */}
            <TextInput
                style={styles.textInput}
                placeholder="password"
                secureTextEntry={true}
                onChangeText={changePassword}
                value={password}
            />

            <View>
                {/* Кнопка отправки запроса на вход */}
                <Button
                    style={styles.buttonInput}
                    title="Войти"
                    color="#000000"
                    onPress={authorization}
                />

                {/* Отступ между кнопками */}
                <View style={styles.space} />

                {/* Кнопка отправки запроса на регистрацию */}
                <Button
                    style={styles.buttonInput}
                    color="#000000"
                    title="Зарегистрироваться"
                    onPress={registaration}
                />
            </View>
        </ImageBackground>
    );
}

// фунция получения введенного логина и пароля
// для оптимизации доставки данных в другие файлы
export const getUserData = () => {
    return userData;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },

    textInput: {
        height: 40,
        borderColor: "black",
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        backgroundColor: "#FFFFFFFF",
        color: "black",
        fontWeight: "bold",
    },

    buttonInput: {
        padding: 10,
        marginBottom: 50,
    },

    space: {
        width: 20,
        height: 5,
        marginBottom: 10,
    },

    image: {
        width: 80,
        height: 80,
        resizeMode: "cover",
    },

    headText: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        alignContent: "center",
        justifyContent: "center",
        textShadowColor: "#FFFFFFFF",
        textShadowOffset: { width: 2, height: 2 },
    },
});
