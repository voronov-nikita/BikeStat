import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, Text } from 'react-native';
import React from 'react';


const PlanWay = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <Text>Plan Way</Text>
        </SafeAreaView>
    );
};

export default PlanWay;
