import { Button, TextInput, Text, View, StyleSheet } from 'react-native';
import React, {useState} from 'react';

import MyCalendar, {getDate} from './CalendarComponent';
import { getUserData } from './LoginingPage';
import Map, {getMarkers} from './ElemMap';
import Sockets from './Socket';

// основная функция обработки запроса пользователя на получение данных для регистрации
// нового "плана"
const PlanWay = () => {

    // отслеживаем состояние изменения переменных даты и названия пути
    const [nameWay, changeName] = useState('');

    // обработчик кнопки сохранить
    const savePlans = async () => {
        // сбор данных для отправки
        const login = getUserData()[0];
        const date = getDate();
        const startPoint = getMarkers()[0];
        const endPoint = getMarkers()[1];

        const answer = await Sockets.getServer(["AddPlan", login, nameWay, date, startPoint, endPoint]);
        console.log(answer);
    }

    // обработчик кнопки отмена
    // удалить данные об имени и дате поездки
    const clearPlans = () => {
        changeName("");
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

            <MyCalendar/>
            
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
        paddingHorizontal: 8,
    }
});

export default PlanWay;