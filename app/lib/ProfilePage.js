import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, Text } from 'react-native';
import React from 'react';

const Profile = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <Text>Profile</Text>
        </SafeAreaView>
    );
};

export default Profile;
