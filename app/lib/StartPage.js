import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, Text } from 'react-native';
import React from 'react';

const StartRoute = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <Text>Start Way</Text>
        </SafeAreaView>
    );
};

export default StartRoute;
