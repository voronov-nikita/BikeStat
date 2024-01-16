import React, { useState } from "react";
import { useRoute } from '@react-navigation/native';
import { SafeAreaView, Button, Text } from "react-native";

import Timer from "./Timer";
import Sockets from "./Socket";
import { getUserData } from "./LoginingPage";


const Starting = () =>{

    const route = useRoute();
    const { data } = route.params;
    
    const func = () => {
        const login = getUserData()[0];

        Sockets.sendServer(["CompletePlan", ]);
        
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.textTitle}>{data.title}</Text>
            <Timer time={data.time}/>
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