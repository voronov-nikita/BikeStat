import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import LoginingScreen from './LoginingPage';
import Main from './MainPage';

const Stack = createStackNavigator();


const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Logining">
                <Stack.Screen 
                    name="Logining" 
                    component={LoginingScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="Main" 
                    component={Main}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>

        </NavigationContainer>
    );
};

export default AppNavigator;
