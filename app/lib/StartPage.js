import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

import { InteractiveBlock } from './Components';
import FilterButton from './DropdownFilter';

import { getUserData } from './LoginingPage';
import Sockets from "./Socket";


export let timeArray = [];


const StartRoute = () => {

    const [dataArray, changeDataArray] = useState([]);

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
            len: rawData[7],
            time: rawData[8]
        };
    }

    // функция отправляет запрос на сервер и заполняет массив с данными
    const getArray = async () => {

        const login = getUserData()[0];
        let answer = await Sockets.getServer(["GetPlans", login]);
        answer = JSON.parse(answer);

        if (answer.length != 0){
            for (let i = 0; i < answer.length; i++) {
                const newData = transformData(answer[i]);
                changeDataArray(dataArray => [...dataArray, newData]);
            }
        }
    }

    const renderItem = ({ item }) => (
        <View>
            <InteractiveBlock data={item} id={"Starting"} />
        </View>
    );

    return (
        <View style={{flex:1}}>
            <View>
                <View style={styles.filterbutton}>
                    <FilterButton />
                </View>
            </View>
            <View style={styles.container}>
                {dataArray.length > 0 ? (
                    <FlatList
                            data={dataArray}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                        />
                ) : (
                    <Text style={styles.textNoneWay}>У вас нет запланированных маршрутов</Text>
                )}
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    container:{
        flex:1
    },
    textNoneWay:{
        textAlign: 'center',
        justifyContent:'center',
        fontSize: 26,
        margin: 30
    },
    filterbutton:{
        marginRight: 15,
        marginBottom: 4,
        marginTop: 4,
        alignSelf: 'flex-end',
        zIndex: 3
    }
});


export default StartRoute;
