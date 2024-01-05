import { View, StyleSheet, Button, Modal, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import React, { useState } from 'react';


let GlobalDate = "";


const MyCalendar = () => {

    const [selectedDate, setSelectedDate] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
    };

    const handleOkPress = () => {
        // Выводим дату в консоль
        GlobalDate = selectedDate;
        // Закрываем модальное окно
        setIsVisible(false);
        setSelectedDate('');
    };

    const handleCancelPress = () => {
        // Обработка нажатия кнопки "Отмена"
        setSelectedDate('');
        setIsVisible(false);
    };

    return (
    <View>

        <Button
            title="Выбрать дату"
            color="#000000"
            onPress={() => setIsVisible(true)} 
        />

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
        width: '80%',
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
});

export default MyCalendar;
