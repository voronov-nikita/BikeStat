import { TouchableOpacity, Image, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';

import ModalHistory from './HistoryMorePage';


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
export const InteractiveBlock = ({ data, id }) => {

    const [modalVisible, setModalVisible] = useState(false);

    const navigation = useNavigation();

    const startWay = () => {
        if (id==="Starting"){
            navigation.navigate("Starting", {data});
        }else{
            setModalVisible(true);
        }
    }
    
    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View>
            <TouchableOpacity 
                style={styles.containerInterfaceBlock}
                onPress={startWay}
            >
                <Text style={styles.textTitle}>Название: {"\t"}{data.title}</Text>
                <Text style={styles.textTitle}>Дата: {"\t"}{data.date}</Text>
                <Text style={styles.textTitle}>Примерное время: {"\t"}{data.time} сек.</Text>
                <Text style={styles.textTitle}>Сложность: {"\t"}{data.level}</Text>
            </TouchableOpacity>

            <ModalHistory modalVisible={modalVisible} closeModal={closeModal} data={data} />
        </View>
    );
};


export const ImageButton = ({ onPress, imageSource }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Image source={imageSource} style={styles.image} />
        </TouchableOpacity>
    );
};

export const InformationSheet = ({content}) => {
    return (
        <View style={styles.textContainer}>
            <Text style={styles.textText}>{content}</Text>
        </View>
    );
};


const styles = {
    containerInterfaceBlock: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 10,
        margin: 7,
    },
    textTitle:{
        fontSize: 16,
        fontWeight: 'bold',
        alignContent: 'center',
        justifyContent: 'center'
    },

    image:{
        width: 50,
        height: 50,
    },
    button:{
        margin: 8,
    },


    textContainer: {
        backgroundColor: '#fff',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5,
        padding: 16,
        width: 200,
        marginRight: 20,
        marginTop: 10,
    },
    textText: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
    },
};

