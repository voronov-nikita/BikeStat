import { View, StyleSheet, Button, Modal, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import React, { useState } from 'react';

// переменная для храния выбранной даты
// переменная потом импортируется константным типом, поэтому 
let GlobalDate = "";


// инициализация обьекта календаря
const MyCalendar = () => {

    // переменные константы состояния даты и состояния скрытия
    const [selectedDate, setSelectedDate] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    // 
    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
    };

    // если нажали "OK", то сохранить и свернуть календарь
    const handleOkPress = () => {
        // сохраняем
        GlobalDate = selectedDate;
        // Закрываем модальное окно
        setIsVisible(false);
    };

    // Обработка нажатия кнопки "Отмена"
    const handleCancelPress = () => {
        // свернуть календарь
        setIsVisible(false);
    };

    return (
    <View>
        <View style={styles.oneLine}>
            <Button
                title="Выбрать дату"
                color="#000000"
                onPress={() => setIsVisible(true)} 
            />
            <View style={{height: 10}}>
                <Text style={styles.textDate}>{selectedDate}</Text>
            </View>
            

        </View>

        <Modal
            transparent={true}
            animationType="slide"
            visible={isVisible}
            onRequestClose={() => setIsVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Calendar
                        onDayPress={onDayPress}
                        markedDates={{ [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' } }}
                        hideExtraDays={true}
                    />
                    <View style={styles.buttonContainer}>
                        <Button 
                            title="ОК"
                            color="#000000"
                            onPress={handleOkPress} 
                        />
                        <Button 
                            title="Отмена"
                            color="#000000"
                            onPress={handleCancelPress} 
                        />
                    </View>
                </View>
            </View>
        </Modal>
    </View>
    );
};

// функция получения выбранной даты
// является общедоступной функцией
export const getDate = () => {
    return (GlobalDate);
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        width: '60%',
        borderWidth: 3,
    },
    selectedDateText: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    oneLine:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 1230,
        height: 35,


    },
    textDate:{
        marginLeft: 12,
        fontSize: 20,
        fontWeight: 'bold',
        textShadowColor: "#FFFFFFFF",
        textShadowOffset: { width: 1, height: 1 },
    }
});

export default MyCalendar;
