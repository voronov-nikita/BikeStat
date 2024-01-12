import React, { useState } from "react";
import { useRoute } from '@react-navigation/native';
import { SafeAreaView, Button, Text } from "react-native";

import Sockets from "./Socket";

const Starting = () =>{

    const route = useRoute();
    const { data } = route.params;

    const [buttonText, changeText] = useState("Start");
    
    const func = () => {

        if (buttonText === "Start"){
            changeText("Stop");
        } else{
            changeText("Start");
        }
        
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.textTitle}>{data.title}</Text>
            <Button
                title={buttonText}
                onPress={func}
                color="#000000"
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