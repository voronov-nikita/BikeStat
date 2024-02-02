import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, Text, View, ImageBackground } from 'react-native';
import React, {useEffect, useState} from 'react';

import Graphic, {MultiLineChart} from './ElemGraphics';
import Sockets from './Socket';
import { InformationSheet } from './Components';

import { getUserData } from './LoginingPage';


const Box = ({ children }) => (
    <View
        style={{
            flex: 1,
            backgroundColor: '#fafcfa',
            padding: 10,
            borderRadius: 10,
            marginBottom: 10,
        }}>
        {children}
    </View>
);

const Profile = () => {

    const [dataLevel, changeDataLevel] = useState([]);
    const [dataPulse, changePulse] = useState([]);
    const [dataLength, changeLength] = useState([]);
    const [textRecomend, changeRecomend] = useState('Рекомендаций нет!');

    const login = getUserData()[0];

    const transData = ( lst ) => {
        const time = [];
        for (let i = 0; i < lst.length; i++) {
            time.push({name: i, value: lst[i]});
        }
        return time;
    };


    const getRecomned = async () => {
        const answer = await Sockets.getServer(['GetRecomend', login]);
        changeRecomend(answer);
    }


    const getDataForGraf = async () => {
        const p = await Sockets.getServer(['GetUserStatic', login]);
        let r = JSON.parse(p);
        changeDataLevel(transData(r[0]));

        const time1 = [];
        for (let i = 0; i < r[0].length; i++) {
            time1.push({name: i, maxPulse: r[1][i], minPulse:r[2][i]});
        }
        changePulse(time1);

        const time2 = [];
        for (let i = 0; i < r[2].length; i++) {
            time2.push({name: i, value: r[2][i]});
        }
        changeLength(time2);

        return r;
    };


    useEffect(() => {
        getDataForGraf();
        // getRecomned();
    }, []);

    return (
        <ImageBackground
                    source={{ uri: require('../assets/images/bggreen1.png')}}
                    style={styles.container}
                >
        <SafeAreaView>
            <View style={{flexDirection: 'row', justifyContent:"space-between", marginTop: 10}}>
                <Text style={styles.textLogin}>Пользователь: {login}</Text>
                <InformationSheet content={textRecomend} />
            </View>
            
            <View style={styles.box}>
                <Box style={styles.item}>
                    <Graphic width={400} height={200} color={"orange"} dataArray={dataLength.slice(-10)} title={"График длины маршрутов"}/>
                </Box>
                <Box style={styles.item}>
                    <Graphic width={400} height={200} color={"red"} dataArray={dataLevel.slice(-10)} title={"График сложности маршрутов"} />
                </Box>
            </View>

            <View style={styles.box}>
                <Box>
                    <MultiLineChart data={dataPulse} />
                </Box>
            </View>
        </SafeAreaView>
        </ImageBackground>
    );
};


const styles = {
    box:{
        flexDirection: 'row',
        padding: 16,
    },
    textLogin:{
        fontWeight: 'bold',
        fontSize: 26,
        textDecorationLine: 'underline',
        margin: 18,
    }
};

export default Profile;
