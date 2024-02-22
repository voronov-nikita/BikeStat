import { TouchableOpacity, Image, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

import ModalHistory from "./HistoryMorePage";

import Sockets from "./Socket";


// создание константных переменных окружения
// Профиль
const profileImage = require("../assets/images/profile.png");
// Домой
const homeImage = require("../assets/images/home.png");
// Выход
const logoutImage = require("../assets/images/logout.png");
// 

// Кнопка, которая будет отображаться в верхнем правом углу
// Кнопка переводит пользователя в профиль с его инфомрацией
export const ProfileButton = () => {
    // создаем обьект навигатора для перемещений
    const navigation = useNavigation();

    // если на икноку нажали, то изменить текущие состояние навигатора
    const navigateToProfile = () => {
        navigation.navigate("Profile");
    };

    return (
        <TouchableOpacity onPress={navigateToProfile}>
            <Image
                source={profileImage}
                style={{ width: 35, height: 35, marginRight: 15 }}
            />
        </TouchableOpacity>
    );
};

// Кнопка, которая будет отобраджаться в верхнем левом углу
// Кнопка переводит пользователя на домашнюю страницу
export const HomeButton = () => {
    // создаем обьект навигатора для перемещений
    const navigation = useNavigation();

    // если на икноку нажали, то изменить текущие состояние навигатора
    const navigateToHome = () => {
        navigation.navigate("Main");
    };

    return (
        <TouchableOpacity onPress={navigateToHome}>
            <Image
                source={homeImage}
                style={{ width: 35, height: 35, marginLeft: 25 }}
            />
        </TouchableOpacity>
    );
};

// Кнопка выхода из приложения и аккаунта
// Кнопка отображается только в профиле пользователя и на только на месте иконки профиля
export const LogOutButton = () => {
    // создаем обьек навигатора для перемещений
    const navigation = useNavigation();

    // обработчик кнопки выход
    const navigateOut = () => {
        navigation.navigate("Logining");
    };

    return (
        <TouchableOpacity onPress={navigateOut}>
            <Image
                source={logoutImage}
                style={{ width: 35, height: 35, marginRight: 25 }}
            />
        </TouchableOpacity>
    );
};

// Интерактивый блок с данными от пользовательской активности
// нужно для отображения нескольких блоков одновременно
// условно это единый пример того, как должны выглядеть все блоки поездок
// Хранит в себе необходимость показывать информацию как об истории так и о запланированной поездки
export const InteractiveBlock = ({ data, id, otherFunction}) => {
    // показать или скрыть модальный блок
    // нужно для отображения истории поездок
    const [modalVisible, setModalVisible] = useState(false);

    // создаем объект навигатора для перемещений
    const navigation = useNavigation();

    // обработчик кнопки перемещений
    const startWay = () => {
        if (id === "Starting") {
            // переместиться с текущими данными в другое окно
            navigation.navigate("Starting", { data });
        } else {
            // отобразить модальный блок истории
            setModalVisible(true);
        }
    };

    // обработчикикнопки отмена
    const closeModal = () => {
        // скрыть модальный блок
        setModalVisible(false);
    };

    // отправить запрос на удаление каких-то данных из БД на сервере
    const FuncDeleteWay = async () => {

        // переменная в которую запишем результат
        let answer = "";

        // если 
        if (id === "Starting") {
            answer = await Sockets.getServer(["DeleteWay", data.login, data.title]);
        }else{
            answer = await Sockets.getServer(["DeleteHistory", data.login, data.title]);
        }
        if (answer == "Success"){
            // вызвать удаленную функцию из другого экрана
            otherFunction(true);
        }
    };

    return (
        <TouchableOpacity
            style={styles.containerInterfaceBlock}
            onPress={startWay}
        >
            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <View style={{ flex: 1, marginRight: 10 }}>
                    <Text style={styles.textTitle}>
                        Название: {"\t"}
                        {data.title}
                    </Text>
                    <Text style={styles.textTitle}>
                        Дата: {"\t"}
                        {data.date}
                    </Text>
                    <Text style={styles.textTitle}>
                        Сложность: {"\t"}
                        {data.level}
                    </Text>
                    <ModalHistory
                        modalVisible={modalVisible}
                        closeModal={closeModal}
                        data={data}
                    />
                </View>

                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <ImageButton
                        onPress={FuncDeleteWay}
                        imageSource={require("../assets/images/garbage.png")}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

// Объект картинка-кнопка
// Объект используется для отоьбражения иконок, кнопок начала и конца маршрута и прочее
// принимает в себя два аргумента: функцию, которая сработает при нажатии и путь к картинке
export const ImageButton = ({ onPress, imageSource }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Image source={imageSource} style={styles.image} />
        </TouchableOpacity>
    );
};

// Блок-обьект для отображения персональных рекомендаций пользователям
// Принимает в себя один аргумент - содержание рекомендации
export const InformationSheet = ({ content }) => {
    return (
        <View style={styles.textContainer}>
            <Text style={[styles.textText, { fontWeight: "bold" }]}>
                Рекомендации:
            </Text>
            <Text style={styles.textText}>{content}</Text>
        </View>
    );
};


const styles = {
    containerInterfaceBlock: {
        backgroundColor: "#e3dfb8ff",
        borderRadius: 20,
        borderColor: "black",
        padding: 10,
        margin: 7,
        borderWidth: 3,
    },
    textTitle: {
        fontSize: 16,
        fontWeight: "bold",
        alignContent: "center",
        justifyContent: "center",
    },

    image: {
        width: 50,
        height: 50,
    },
    button: {
        margin: 8,
    },

    textContainer: {
        backgroundColor: "#fff",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 5,
        padding: 16,
        width: 500,
        marginRight: 20,
        marginTop: 10,
    },
    textText: {
        color: "black",
        fontSize: 16,
        textAlign: "center",
    },
};
