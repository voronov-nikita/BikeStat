import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <Text>Profile</Text>
        </SafeAreaView>
    );
};

export default Profile;
