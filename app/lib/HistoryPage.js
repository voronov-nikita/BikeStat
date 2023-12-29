import { SafeAreaView, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

const UserHistory = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <Text>Plan Way</Text>
            <Button
                title="HISTORY"
                onPress={() => navigation.navigate('Logining')}
            />
        </SafeAreaView>
    );
};

export default UserHistory;
