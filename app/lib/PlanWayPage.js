import {
    Button,
    TextInput,
    Text,
    View,
    StyleSheet,
    ImageBackground,
    SafeAreaView,
} from "react-native";
import React, { useState } from "react";

import MyCalendar, { getDate } from "./CalendarComponent";
import { getUserData } from "./LoginingPage";
import Map, { getMarkers, getDataWay } from "./ElemMap";
import Sockets from "./Socket";

// основная функция обработки запроса пользователя на получение данных для регистрации
// нового "плана"
const PlanWay = () => {
    // отслеживаем состояние изменения переменных даты и названия пути
    const [nameWay, changeName] = useState("");

    // обработчик кнопки сохранить
    const savePlans = async () => {
        // сбор данных для отправки
        const login = getUserData()[0];
        const date = getDate();
        const markerList = getMarkers();
        const jsonDataWay = getDataWay();
        // условие проверки данных на пустоту
        // Это нужно чтобы не отображать непонятные(пустые) данные, пришедшие от БД
        if (nameWay != "" && date != "" && markerList.length == 2) {
            // полный сбор данных перед отправкой
            const startPoint = markerList[0];
            const endPoint = markerList[1];

            const _ = await Sockets.getServer([
                "AddPlan",
                login,
                nameWay,
                date,
                startPoint,
                endPoint,
                jsonDataWay["distanceInKilometers"],
                jsonDataWay["timeInSeconds"],
            ]);
            const title = "Успешно";
            const options = {
                body: "Вы успешно запланировали поездку.",
            };
            showWebNotification(title, options);


        } else {
            const title = "Ошибка";
            const options = {
                body: "Вы заполинили не все данные",
            };
            showWebNotification(title, options);
        }
    };

    // обработчик кнопки отмена
    // удалить данные об имени и дате поездки
    const clearPlans = () => {
        changeName("");
    };

    return (
        <ImageBackground
            source={{ uri: require("../assets/images/bg1.png") }}
            style={styles.container}
        >
            <SafeAreaView style={styles.box}>
            <Text style={styles.headText}>ЗАПЛАНИРУЙТЕ ПОЕЗДКУ</Text>

            <TextInput
                style={styles.textInput}
                placeholder="введите название для поездки"
                autoFocus={true}
                onChangeText={changeName}
                value={nameWay}
            />

            <MyCalendar />
                {/* <ScrollView> */}
                    <View style={styles.containerMap}>
                        <Map />
                    </View>

                    <View style={styles.buttons}>
                        <Button
                            title="Сохранить"
                            color="black"
                            onPress={savePlans}
                        />
                        
                    </View>
                {/* </ScrollView> */}
            </SafeAreaView>
        </ImageBackground>
    );
};

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

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        display: 'flex',
        width: '100%',
        height: '100vh',
        margin: 0,
    },

    containerMap: {
        width: 900,
        height: 500,
        //padding: 20,
        borderColor: "black",
        borderWidth: 3,
        marginHorizontal: 170,
    },
    box: {
        flexDirection: "column",

        //justifyContent: 'space-between',
    },

    textInput: {
        height: 50,
        width: 400,
        borderColor: "black",
        borderWidth: 2,
        marginBottom: 10,
        padding: 10,
        backgroundColor: "#FFFFFF",
        // color: '#A5A5A5',
        color: "black",
        fontWeight: "bold",
        marginHorizontal: 1230,
        marginTop: 80,
    },

    headText: {
        fontSize: 34,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 10,
        textAlign: "center",
        alignContent: "center",
        justifyContent: "center",
        textShadowColor: "#FFFFFFFF",
        textShadowOffset: { width: 2, height: 2 },
    },

    buttons: {
        flexDirection: "row",
        justifyContent: "space-round",
        alignContent: "center",
        paddingHorizontal: 8,
        marginBottom: 70,
        marginHorizontal: 550,
        marginTop: 10,
    },
});

export default PlanWay;
