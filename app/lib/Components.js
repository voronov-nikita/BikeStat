import { TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';


// Кнопка, которая будет отобраджаться в верхнем правом углу
// Кнопка переводит пользователя в профиль с его инфомрацией
export const ProfileButton = () => {
    const navigation = useNavigation();

    const navigateToProfile = () => {
        navigation.navigate('Profile');
    };

    return (
        <TouchableOpacity 
            onPress={navigateToProfile}
        >
            <Image 
                source={require('../assets/images/profile.png')} 
                style={{ width: 35, height: 35, marginRight: 15 }} 
            />

        </TouchableOpacity>
    );
};


// Кнопка, которая будет отобраджаться в верхнем левом углу
// Кнопка переводит пользователя на домашнюю страницу
export const HomeButton = () => {
    const navigation = useNavigation();

    const navigateToHome = () => {
        navigation.navigate('Main');
    };

    return (
        <TouchableOpacity 
            onPress={navigateToHome}
        >
            <Image 
                source={require('../assets/images/home.png')} 
                style={{ width: 35, height: 35, marginLeft: 25 }} 
            />

        </TouchableOpacity>
    );
};


// Интерактивый блок с данными от пользовательской активности
// нужно для отображения нескольких блоков одновременно
// условно это единый пример того, как должны выглядеть все блоки поездок
export const InteractiveBlock = ({ data }) => {

    const startWay = () => {
        console.log("ЧТОООООООООООООООО");
    }

    return (
        <TouchableOpacity 
            style={styles.containerInterfaceBlock}
            onPress={startWay}
        >
            <Text>Title: {data.title}</Text>
            <Text>Date: {data.date}</Text>
            <Text>Start Point: {data.startPoint}</Text>
            <Text>End Point: {data.endPoint}</Text>
            <Text>Level: {data.level}</Text>
        </TouchableOpacity>
    );
};

const styles = {
    containerInterfaceBlock: {
        padding: 20,
        borderWidth: 1,
        borderColor: '#cccссс',
        margin: 20,
    },
};

