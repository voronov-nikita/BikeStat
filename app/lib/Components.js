import { useNavigation } from '@react-navigation/native';

import { TouchableOpacity, Image, StyleSheet, View, TextInput, Text } from 'react-native';
import React from 'react';


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
