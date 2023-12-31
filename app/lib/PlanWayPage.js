import { useNavigation } from '@react-navigation/native';
import { Button, SafeAreaView, Text } from 'react-native';
import React from 'react';

import { ButtonDialog } from './Components';

const PlanWay = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <ButtonDialog/>
            <Text>Plan Way</Text>
        </SafeAreaView>
    );
};

export default PlanWay;
