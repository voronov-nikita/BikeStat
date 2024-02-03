import React, { useEffect, useState } from "react";
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    ImageBackground,
} from "react-native";

import { InteractiveBlock } from "./Components";
import FilterButton from "./DropdownFilter";

import { getUserData } from "./LoginingPage";
import Sockets from "./Socket";

export let timeArray = [];

const StartRoute = () => {

    const [dataArray, changeDataArray] = useState([]);
    const [filters, changeFilter] = useState([1, 2, 3]);
    const [filteredData, setFilteredData] = useState([]);


    useEffect(() => {
        getArray();
    }, []);


    useEffect(() => {
        filterArray();
    }, [filters]);


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
            time: (rawData[8] / 150).toFixed(2)
        };
    };

    // функция отправляет запрос на сервер и заполняет массив с данными
    const getArray = async () => {
        const login = getUserData()[0];
        let answer = await Sockets.getServer(["GetPlans", login]);
        answer = JSON.parse(answer);

        // собираем данные и формируем их в отдельный массив для отображения
        if (answer.length !== 0) {
            const newDataArray = answer.map(transformData);
            changeDataArray(newDataArray);
        }
    }

    const filterArray = () => {
        let newData = [];
        if (filters.length > 0){
            newData = dataArray.filter(item => filters.includes(parseInt(item.level, 10)));
        }else{
            newData = dataArray;
        }
        setFilteredData(newData);
    }

    const renderItem = ({ item }) => (
        <View>
            <InteractiveBlock data={item} id={"Starting"} />
        </View>
    );


    return (
        <ImageBackground
            source={{ uri: require("../assets/images/bg1.png") }}
            style={styles.container}
        >
            <Text style={styles.headText}>ЗАПЛАНИРОВАННЫЕ ПОЕЗДКИ</Text>
            <View style={{ flex: 1 }}>
                <View>
                    <View style={styles.filterbutton}>
                        <FilterButton changeFunction={changeFilter}/>
                    </View>
                </View>
                <View style={styles.container}>
                    {filteredData.length > 0 ? (
                        <FlatList
                            data={filteredData}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                        />
                    ) : (dataArray.length > 0 ? (
                        <FlatList
                            data={dataArray}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                        />
                    ) : (
                        <Text style={styles.textNoneWay}>
                            У вас нет запланированных маршрутов
                        </Text>
                    )
                    )}
                </View>
            </View>
        </ImageBackground>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: -1,
    },
    textNoneWay: {
        textAlign: "center",
        justifyContent: "center",
        fontSize: 26,
        margin: 30,
    },
    filterbutton: {
        marginRight: 15,
        marginBottom: 4,
        marginTop: 4,
        alignSelf: "flex-end",
        zIndex: 10,
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
        textAlign: 'center',
    },
});

export default StartRoute;
