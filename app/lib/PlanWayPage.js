
import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PlanWay = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <Text>Plan Way</Text>
        </SafeAreaView>
    );
};

export default PlanWay;
