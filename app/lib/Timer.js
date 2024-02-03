import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { ImageButton } from './Components';


const resetImage = require("../assets/reset.png");
const startImage = require("../assets/start.png");
const pauseImage = require("../assets/pause.png");


const Timer = ({time}) => {
    const [curentImage, setState] = useState(startImage);
    const [seconds, setSeconds] = useState(time);
    const [isRunning, setIsRunning] = useState(false);

    // сработает только при инициализации интерфейса
    useEffect(() => {
        let interval;

        if (isRunning && seconds > 0) {
        interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);
        }

        if (seconds <= 0 && isRunning){
            handleStartPause();
            setIsRunning(false);
            setSeconds(0);
            const title = 'Время вышло';
            const options = {
                body: 'Проверьте показатели и результат,\nзатем завершите маршрут.',
            };
            showWebNotification(title, options);
        }

        return () => clearInterval(interval);
    }, [isRunning, seconds]);

    // обработка на кнопку паузы
    const handleStartPause = () => {

        if (curentImage===startImage){
            setState(pauseImage);
        }else{
            setState(startImage);
        }

        setIsRunning(prevState => !prevState);
    };
    // обрабока кнопки "Начать заново"
    const handleReset = () => {
        setSeconds(time);
        setState(startImage);
        setIsRunning(false);
    };

    // переделывает секунды в нормальный формат временного диапазона
    const formatTime = (totalSeconds) => {
        totalSeconds*=150;  
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const remainingSeconds = Math.floor(totalSeconds % 60);

        const pad = (value) => (value < 10 ? `0${value}` : value);

        return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.timerText}>{formatTime(seconds)}</Text>
            {/* <View style={styles.buttonsContainer}>
                <ImageButton onPress={handleStartPause} imageSource={curentImage} />
                <ImageButton onPress={handleReset} imageSource={resetImage} />
            </View> */}
        </View>
    );
};


// функция вызова уведомления операционной системы
const showWebNotification = (title, options) => {
    if ('Notification' in window) {
        if (Notification.permission === 'granted') {
            new Notification(title, options);
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                new Notification(title, options);
            }
        });
        }
    }
};


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    timerText: {
        fontSize: 16,
        alignContent: "center",
        justifyContent: "center",
        margin: 8,
        fontWeight: 'bold',
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    button: {
        marginHorizontal: 10,
        padding: 10,
        backgroundColor: '#dddddd',
        borderRadius: 5,
    },
});

export default Timer;
