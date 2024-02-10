import { SafeAreaView, Text, View, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";

import Graphic, { MultiLineChart } from "./ElemGraphics";
import Sockets from "./Socket";
import { InformationSheet } from "./Components";

import { getUserData } from "./LoginingPage";

const Box = ({ children }) => (
    <View
        style={{
            flex: 1,
            backgroundColor: "#fafcfa",
            padding: 10,
            borderRadius: 10,
            marginBottom: 10,
        }}
    >
        {children}
    </View>
);

const Profile = () => {
    const [dataLevel, changeDataLevel] = useState([]);
    const [dataPulse, changePulse] = useState([]);
    const [dataLength, changeLength] = useState([]);
    const [textRecomend, changeRecomend] = useState("Рекомендаций нет!");

    const login = getUserData()[0];

    const getRecomned = async () => {
        const avg = 1;
        const answer = await Sockets.getServer(["GetRecomend", avg]);
        changeRecomend(answer);
    };

    const getDataForGraf = async () => {
        const p = await Sockets.getServer(["GetUserStatic", login]);
        let r = JSON.parse(p);

        const time0 = [];
        for (let i = 0; i < r[0].length; i++) {
            time0.push({ name: i, value: r[0][i]});
        }
        changeDataLevel(time0);

        const time1 = [];
        for (let i = 0; i < r[1].length; i++) {
            time1.push({ name: i, maxPulse: r[1][i], minPulse: r[2][i] });
        }
        changePulse(time1);

        const time2 = [];
        for (let i = 0; i < r[3].length; i++) {
            time2.push({ name: i, value: r[3][i] });
        }
        changeLength(time2);

        return r;
    };

    useEffect(() => {
        getDataForGraf();
        getRecomned();
    }, []);

    return (
        <ImageBackground
            source={{ uri: require("../assets/images/bgbeige.png") }}
            style={styles.container}
        >
            <SafeAreaView style={styles.container}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 10,
                    }}
                >
                    <Text style={styles.textLogin}>Пользователь: {login}</Text>
                    <InformationSheet content={textRecomend} />
                </View>
                <Text style={styles.header}>СТАТИСТИКА</Text>
                {/* <View style={styles.boxmaxi}>
                <Box>
                <Graphic width={400} height={200} color={"orange"} dataArray={dataLength.slice(-10)} title={"График длины маршрутов"}/>
                </Box>
            </View>
            <View style={styles.boxmaxi}>
                <Box>
                <Graphic width={400} height={200} color={"red"} dataArray={dataLevel.slice(-10)} title={"График сложности маршрутов"} />
                </Box>
            </View> */}

                <View style={styles.boxmini}>
                    <View style={{ marginHorizontal: 130 }}>
                        <Box>
                            <Graphic
                                width={700}
                                height={300}
                                color={"orange"}
                                dataArray={dataLength.slice(-10)}
                                title={"График длины маршрутов"}
                            />
                        </Box>
                    </View>
                    {/* <Box>
                    <Graphic width={400} height={200} color={"orange"} dataArray={dataLength.slice(-10)} title={"График длины маршрутов"}/>
                </Box> */}
                    <View style={{ marginHorizontal: 100 }}>
                        <Box>
                            <Graphic
                                width={700}
                                height={300}
                                color={"red"}
                                dataArray={dataLevel.slice(-10)}
                                title={"График сложности маршрутов"}
                            />
                        </Box>
                    </View>
                </View>

                <View style={styles.boxmaxi}>
                    <Box>
                        <MultiLineChart data={dataPulse} />
                    </Box>
                </View>
            </SafeAreaView>
        </ImageBackground>
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
    boxmini: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 1000,
        height: 320,
        marginBottom: 70,
        marginTop: 10,
    },
    boxmaxi: {
        flexDirection: "row",
        padding: 16,
        justifyContent: "space-between",
        width: 900,
        height: 300,
        marginBottom: 100,
        marginHorizontal: 130,
    },
    textLogin: {
        fontWeight: "bold",
        fontSize: 26,
        textDecorationLine: "underline",
        margin: 18,
    },

    header: {
        fontSize: 34,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 10,
        alignContent: "center",
        justifyContent: "center",
        textShadowColor: "#FFFFFFFF",
        textShadowOffset: { width: 2, height: 2 },
        textAlign: "center",
    },
};

export default Profile;
