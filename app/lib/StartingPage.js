import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import {
    SafeAreaView,
    Button,
    Text,
    View,
    ImageBackground,
} from "react-native";

import Timer from "./Timer";
import Map from "./ElemMap";
import Sockets from "./Socket";
import { getUserData } from "./LoginingPage";

const Starting = () => {
    const navigation = useNavigation();

    const [maxPulse, changeMaxPulse] = useState(null);
    const [minPulse, changeMinPulse] = useState(null);
    const [curPulse, changeCurPulse] = useState(null);

    const [isRunning, setIsRunning] = useState(false);
    const [StartStopWay, changeState] = useState("Начать поездку");

    const route = useRoute();
    const { data } = route.params;
    const [seconds, setSeconds] = useState(data.time);

    useEffect(() => {
        // отправка запроса и прием, обработка ответов
        const yourFunction = async () => {
            let newData = await Sockets.getServer(["GetPulse"]);

            newData = JSON.parse(newData);

            const newMax = newData[0];
            const newMin = newData[1];

            changeMaxPulse(Math.max(maxPulse, newMin));
            changeMinPulse(Math.min(minPulse, newMax));
            if (newMax != 0 && minPulse == 0) {
                changeMinPulse(newMax);
            }
            changeCurPulse((newMax + newMin) / 2);
        };

        // задаем интервал с размерностью 3 секунды
        const intervalId = setInterval(yourFunction, 3 * 1000);

        return () => clearInterval(intervalId);
    }, []);

    // обработка на кнопку паузы
    const handleStartPause = () => {
        if (StartStopWay === "Начать поездку") {
            changeState("Остановить поездку");
            setIsRunning(true);
        } else {
            changeState("Начать поездку");
            setIsRunning(false);
        }
    };
    // обрабока кнопки "Начать заново"
    const handleReset = () => {
        setSeconds(data.time);
        changeState("Начать поездку");
        setIsRunning(false);
    };

    const completeWay = () => {
        const login = getUserData()[0];
        const name = data.title;
        const level = data.level;
        const date = data.date;
        const start = data.startPoint;
        const end = data.endPoint;
        const lenway = data.len;
        const time = data.time;

        const avgPulse = (maxPulse + minPulse) / 2;

        Sockets.sendServer([
            "CompletePlan",
            login,
            name,
            level,
            date,
            start,
            end,
            maxPulse,
            minPulse,
            avgPulse,
            lenway,
            time,
        ]);

        navigation.navigate("Main");
    };

    const getSpeed = () => {
        const base = (data.len / data.time).toFixed(1);
        const randomFraction = Math.random();
        // Масштабируем и сдвигаем число в нужный диапазон
        const speed = base * 0.6 + randomFraction * (base * 1.4 - base * 0.6);

        return speed.toFixed(1);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={{ uri: require("../assets/images/bgbeige.png") }}
                style={styles.container}
            >
                <Text style={styles.headText}>{data.title}</Text>
                <SafeAreaView style={styles.box}>
                    <View style={styles.containerPulse}>
                        <Text style={styles.textPulse}>
                            Текущий пульс: {curPulse}
                        </Text>
                    </View>
                    <View style={styles.containerPulse}>
                        <Text style={styles.textPulse}>
                            Ваша скорость: {getSpeed()} км/ч
                        </Text>
                    </View>
                    <View style={styles.containerPulse}>
                        <Text style={styles.textPulse}>
                            Оставшееся время:
                            <Timer
                                time={seconds * 125}
                                funcActivate={isRunning}
                            />
                        </Text>
                    </View>
                </SafeAreaView>
                <SafeAreaView style={styles.box}>
                    <View style={styles.containerMap}>
                        <Map
                            startPoint={data.startPoint}
                            endPoint={data.endPoint}
                        />
                    </View>
                    <View style={styles.buttonsContainer}>
                        <View style={{ height: 10, paddingTop: 15 }}>
                            <Button
                                title={StartStopWay}
                                onPress={handleStartPause}
                                color="#010101"
                                style={{ height: 10 }}
                            />
                        </View>
                        <View style={styles.emptySpase}></View>
                        <View style={{ height: 10, paddingTop: 15 }}>
                            <Button
                                title="Начать заново"
                                onPress={handleReset}
                                color="#010101"
                                style={{ height: 10 }}
                            />
                        </View>
                        <View style={styles.emptySpase}></View>
                        <View style={{ height: 10, paddingTop: 15 }}>
                            <Button
                                title="Завершить маршрут"
                                onPress={completeWay}
                                color="#010101"
                                style={{ height: 10 }}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = {
    container: {
        justifyContent: "space-between",
        display: "flex",
        width: "100%",
        height: "100vh",
        margin: 0,
    },
    box: {
        width: "50%",
        marginBottom: 30,
    },

    containerMap: {
        width: 900,
        height: 600,
        padding: 10,
        alignContent: "center",
        justifyContent: "center",
        marginHorizontal: 100,
        borderColor: "black",
        borderWidth: 3,
    },

    headText: {
        fontSize: 34,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 10,
        alignContent: "center",
        justifyContent: "center",
        textShadowColor: "#FFFFFF",
        textShadowOffset: { width: 2, height: 2 },
        textAlign: "center",
    },

    containerPulse: {
        backgroundColor: "#ebebeb",
        width: "50%",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 2,
        marginHorizontal: 1230,
    },

    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
        marginHorizontal: 550,
    },

    button: {
        marginHorizontal: 10,
        padding: 10,
        paddingLeft: 10,
        backgroundColor: "#dddddd",
        borderRadius: 5,
        borderWidth: 2,
    },

    textPulse: {
        fontSize: 16,
        alignContent: "center",
        justifyContent: "center",
        margin: 8,
        fontWeight: "bold",
    },

    emptySpase: {
        margin: 15,
    },
};

export default Starting;
