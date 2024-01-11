import React, { useState } from "react";
import { SafeAreaView, Button, Text } from "react-native";

import Sockets from "./Socket";

const Starting = ({data}) =>{

    const [buttonText, changeText] = useState("Start");
    
    const func = () => {

        if (buttonText === "Start"){
            changeText("Stop");
        } else{
            changeText("Start");
        }
        
    };
    
    console.log(data);
    return (
        <SafeAreaView>
            <Text>{data}</Text>
            <Button
                title={buttonText}
                onPress={func}
            />
        </SafeAreaView>
    );
}

export default Starting;