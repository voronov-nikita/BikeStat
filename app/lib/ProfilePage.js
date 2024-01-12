import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, Text, View } from 'react-native';
import React from 'react';

import Graphic from './ElemGraphics';


const Profile = () => {
    const navigation = useNavigation();

    const data = [
        { name: '1', value: 10 },
        { name: '2', value: 15 },
        { name: '3', value: 7 },
        { name: '4', value: 12 },
        { name: '5', value: 12 },
        { name: '6', value: 12 },
    ];

    return (
        <SafeAreaView>
            <Text>Profile</Text>
            <View>
                <Graphic width={500} height={500} color={"red"} dataArray={data} />
            </View>
        </SafeAreaView>
    );
};

export default Profile;
