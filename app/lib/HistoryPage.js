import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

import { InteractiveBlock } from './Components';

import { getUserData } from './LoginingPage';
import Sockets from "./Socket";

const UserHistory = () => {

    const [dataArray, changeDataArray] = useState([{}]);

    useEffect(() => {
        getArray();
    }, []);


    const transformData = (rawData) => {
        return {
            id: rawData[0],
            login: rawData[1],
            title: rawData[2],
            date: rawData[3],
            level: rawData[4],
            startPoint: rawData[5],
            endPoint: rawData[6],
        };
    }

    // функция отправляет запрос на сервер и заполняет массив с данными
    const getArray = async () => {
        const login = getUserData()[0];
        let answer = await Sockets.getServer(["GetPlans", login]);
        answer = JSON.parse(answer);
        if (answer.length != 0){
            dataArray.shift();
        }
        for (let i = 0; i < answer.length; i++) {
            const newData = transformData(answer[i]);
            changeDataArray(dataArray => [...dataArray, newData]);
        }
    }

    return (
        <ScrollView>
            {dataArray.map((data, index) => (
                <InteractiveBlock key={index} data={data} />
            ))}
        </ScrollView>
    );
};

export default UserHistory;
