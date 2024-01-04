import { useNavigation } from '@react-navigation/native';
import { Button, TextInput, Text, View, StyleSheet } from 'react-native';
import React, {useState} from 'react';

import Map, {getMarkers} from './MapComponent';
import { getUserData } from './LoginingPage';
import Sockets from './Socket';

const PlanWay = () => {

    const [nameWay, changeName] = useState('');
    const [dateWay, changeDate] = useState('');

    const savePlans = async () => {
        
        const login = getUserData()[0];
        const startPoint = getMarkers()[0];
        const endPoint = getMarkers()[1];

        const answer = await Sockets.getServer(["AddPlan", login, nameWay, dateWay, startPoint, endPoint]);
        console.log(answer);
    }

    // удалит данные об имени и дате поезки
    const clearPlans = () => {
        changeName("");
        changeDate("");
    }

    return (
        <View style={styles.container}>

            <Text style={styles.headText}>
                Введите необходимые данные для планирования поезки
            </Text>

            <TextInput
                style={styles.textInput}
                placeholder="Название для поездки: "
                autoFocus={true}
                onChangeText={changeName}
                value={nameWay}
            />

            <TextInput
                style={styles.textInput}
                placeholder="Дата для поездки: "
                onChangeText={changeDate}
                value={dateWay}
            />
            <View style={styles.containerMap}>
                <Map/>
            </View>

            <View style={styles.buttons}>
                <Button
                    title='Сохранить'
                    color="black"
                    onPress={savePlans}
                />

                <Button
                    title='Отмена'
                    color="black"
                    onPress={clearPlans}
                />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        alignContent:'center',
    },

    containerMap:{
        flex:1, 
        width:"70%", 
        height:"45%",
        padding: 10,
    },

    textInput:{
        height: 40,
        borderColor: 'gray', 
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },

    headText:{
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        alignContent: 'center',
        justifyContent: 'center'
    },

    buttons:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    }
});

export default PlanWay;