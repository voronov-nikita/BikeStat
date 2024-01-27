import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, Button, Text, View } from "react-native";

import Timer from "./Timer";
import Map from "./ElemMap";
import Sockets from "./Socket";
import { getUserData } from "./LoginingPage";

const Starting = () => {
    const navigation = useNavigation();

    const [maxPulse, changeMaxPulse] = useState(null);
    const [minPulse, changeMinPulse] = useState(null);
    const [curPulse, changeCurPulse] = useState(null);

    const route = useRoute();
    const { data } = route.params;

    useEffect(() => {
        // отправка запроса и прием, обработка ответов
        const yourFunction = async () => {
            let newData = await Sockets.getServer(["GetPulse"]);

            newData = JSON.parse(newData);

            const newMax = newData[0];
            const newMin = newData[1];

            changeMaxPulse(Math.max(maxPulse, newMin));
            changeMinPulse(Math.min(minPulse, newMax));
            changeCurPulse((newMax + newMin) / 2);
        };

        // задаем интервал с размерностью 3 секунды
        const intervalId = setInterval(yourFunction, 3 * 1000);

        return () => clearInterval(intervalId);
    }, []);

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

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.textTitle}>{data.title}</Text>

            <View style={styles.containerPulse}>
                <Text style={styles.textPulse}>
                    Текущий пульс: {curPulse}
                </Text>
                <Text style={styles.textPulse}>
                    Максимальный пульс в пути: {maxPulse}
                </Text>
                <Text style={styles.textPulse}>
                    Минимальный пульс в пути: {minPulse}
                </Text>
            </View>

            <Timer time={data.time}/>

            <View style={styles.containerMap}>
                <Map startPoint={data.startPoint} endPoint={data.endPoint} />
            </View>

            <Button
                title="Завершить маршрут"
                onPress={completeWay}
                color="#010101"
                style={styles.buttonAction}
                width="80%"
            />
        </SafeAreaView>
    );
};

const styles = {
    container: {
        alignContent: "center",
        alignItems: "center",
    },

    containerMap: {
        width: "60%",
        height: "40%",
        padding: 10,
        alignContent: "center",
        justifyContent: "center",
    },
    textTitle: {
        fontSize: 30,
        fontWeight: "bold",
        alignContent: "center",
        justifyContent: "center",
        marginBottom: 6,
    },

    buttonAction: {},

    containerPulse:{
        backgroundColor: '#ebebeb',
        width: "80%",
        borderColor: 'black', 
        borderWidth: 2,
        borderRadius: 2,
    },

    textPulse: {
        fontSize: 16,
        alignContent: "center",
        justifyContent: "center",
        margin: 8,
    },
};

export default Starting;
