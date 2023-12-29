import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';


// Кнопка, которая будет отобраджаться в верхнем 
export const ProfileButton = () => {
    const navigation = useNavigation();

    const navigateToProfile = () => {
        navigation.navigate('Profile');
    };

    return (
        <Button title='PROFILE' onPress={navigateToProfile}/>
    );
};


// Кнопка, которая будет отобраджаться в верхнем 
export const HomeButton = () => {
    const navigation = useNavigation();

    const navigateToProfile = () => {
        navigation.navigate('Main');
    };

    return (
        <Button title='HOME' onPress={navigateToProfile}/>
    );
};
