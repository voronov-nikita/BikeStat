import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import LoginingScreen from './LoginingPage';
import Profile from './ProfilePage';
import Main from './MainPage';

import {ProfileButton, HomeButton} from './Components'


const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="Logining"
                >

                <Stack.Screen 
                    name="Logining" 
                    component={LoginingScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen 
                    name="Main" 
                    component={Main}
                    options={{
                        headerTitle: ' ',
                        headerRight: () => <ProfileButton />,
                        headerLeft: () => <HomeButton/>
                    }}
                />
                <Stack.Screen 
                    name="Profile" 
                    component={Profile}
                    
                />
            </Stack.Navigator>

        </NavigationContainer>
    );
};

export default AppNavigator;
