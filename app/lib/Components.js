import { useNavigation } from '@react-navigation/native';

import { TouchableOpacity, Image, StyleSheet, View, Text, Modal, Button, TextInput } from 'react-native';
import React, {useState} from 'react';

import Sockets from './Socket';

// Кнопка, которая будет отобраджаться в верхнем 
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


// Кнопка, которая будет отобраджаться в верхнем 
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


export const ButtonDialog = () => {
    const [isModalVisible, setModalVisible] = useState(false);

    const [nameWay, changeName] = useState('');
    const [dateWay, changeDate] = useState('');

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const saveDatas = async () => {

        const answer = await Sockets.getServer(["CreatePlan", nameWay, dateWay]);
        console.log(answer);

        setModalVisible(!isModalVisible);
    };

    return (
        <View>
            <Button 
                title='+'
                onPress={toggleModal}
                color="#000000"
                
            />

        <Modal transparent={true} animationType="slide" visible={isModalVisible} onRequestClose={toggleModal}>
            <View style={styles.PlanContainer}>
                <View>
                    <Text style={styles.PlanContainerText}>Запланировать поездку</Text>
                    
                    <TextInput
                        style={styles.textInput}
                        placeholder="Название: "
                        autoFocus={true}
                        onChangeText={changeName}
                        value={nameWay}
                    />

                    <View style={styles.space}></View>

                    <TextInput
                        style={styles.textInput}
                        placeholder="Дата поездки: "
                        autoFocus={true}
                        onChangeText={changeDate}
                        value={dateWay}
                    />

                    <View style={styles.PlanButtons}>
                        <Button
                            title='Сохранить'
                            onPress={saveDatas}
                            color="#000000"
                        />
                        <Button
                            title='Отмена'
                            onPress={toggleModal}
                            color="#000000"
                        />
                    </View>
                </View>
            </View>
        </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    space: {
        marginBottom: 8,
    },

    PlanContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    PlanContainerText: {
        color: '#fafafa',
        fontWeight: 'bold',
        marginBottom: 16,
        fontSize: 24,
    },
    PlanButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginTop: 16,
    }
});