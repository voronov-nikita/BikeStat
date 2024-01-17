import React, { useState, useEffect } from "react";
import { useRoute } from '@react-navigation/native';
import { SafeAreaView, Button, Text, View } from "react-native";

import Timer from "./Timer";
import Map from "./ElemMap";
import Sockets from "./Socket";
import { getUserData } from "./LoginingPage";


const Starting = () =>{

    const [maxPulse, changeMaxPulse] = useState(1);
    const [minPulse, changeMinPulse] = useState(10000);

    const route = useRoute();
    const { data } = route.params;
    

    useEffect(() => {
        // отправка запроса и прием, обработка ответов
        const yourFunction = async () => {
            let newData = await Sockets.getServer(['GetPulse']);

            newData = JSON.parse(newData);

            const newMax = newData[0];
            const newMin = newData[1];

            console.log(newMax, newMin);

            changeMaxPulse(Math.max(maxPulse, newMax));
            changeMinPulse(Math.min(minPulse, newMin));
        };

        // задаем интервал с размерностью 2 секунды
        const intervalId = setInterval(yourFunction, 2*1000);
    
        return () => clearInterval(intervalId);
    }, []);

    const func = () => {
        const login = getUserData()[0];
        const name = data.title;
        const level = data.level;
        const start = data.startPoint;
        const end = data.endPoint;
        const lenway = data.lenway;
        const time = data.time;

        const avgPulse = (maxPulse+minPulse)/2;

        Sockets.sendServer(["CompletePlan",
            login, name, level, start, end, maxPulse, minPulse, avgPulse, lenway, time
        ]);
        
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.textTitle}>{data.title}</Text>

            <Text>{maxPulse}</Text>
            <Text>{minPulse}</Text>

            <Timer time={data.time}/>

            <View style={styles.containerMap}>
                <Map startPoint={data.startPoint} endPoint={data.endPoint}/>
            </View>

            <Button
                title="Завершить маршрут"
                onPress={func}
                color="#010101"
                style={styles.buttonAction}
            />
        </SafeAreaView>
    );
}


const styles = {
    container:{

    },
    containerMap:{
        width:"60%", 
        height:"40%",
        padding: 10,
    },
    textTitle:{
        fontSize: 30,
        fontWeight: 'bold',
        alignContent: 'center',
        justifyContent: 'center',
        
    },

    buttonAction: {

    },
};


export default Starting;