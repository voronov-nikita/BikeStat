
import React from 'react';
import { SafeAreaView, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PlanWay = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <Text>Plan Way</Text>
            <Button
                title="Go back to Home"
                onPress={() => navigation.navigate('Logining')}
            />
        </SafeAreaView>
    );
};

export default PlanWay;
