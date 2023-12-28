
import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const StartRoute = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <Text>Start Way</Text>
        </SafeAreaView>
    );
};

export default StartRoute;
