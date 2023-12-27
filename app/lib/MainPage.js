
import React from 'react';
import { SafeAreaView, Text, Button } from 'react-native';

import ButtomBar from './ButtomNavigation';

const HomePage = ({ navigation }) => {

    return (
        <ButtomBar />
        // <SafeAreaView>
        //     <Text>Second Screen</Text>
        //     <Button
        //         title="Go back to Home"
        //         onPress={() => navigation.navigate('Logining')}
        //     />
        // </SafeAreaView>
    );
};

export default HomePage;
