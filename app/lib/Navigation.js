import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import {ProfileButton, HomeButton} from './Components'

import LoginingScreen from './LoginingPage';
import Profile from './ProfilePage';
import Starting from './StartingPage';
import Main from './MainPage';


// создаем экхемпляр объекта навигатора состояний 
const Stack = createStackNavigator();

// обрабатываем первичный запрос пользователя
// По умолчанию откроются данные для ввода логина и пароля
const AppNavigator = () => {
    return (
        <NavigationContainer>
                <Stack.Navigator 
                    initialRouteName="Logining"
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: '#000',
                            color: '#fff',
                        },
                    }}
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
                            headerLeft: () => <HomeButton/>,
                        }}
                    />
                    <Stack.Screen 
                        name="Profile" 
                        component={Profile}
                        options={{
                            headerTintColor: "#ffffff"
                        }}
                    />

                    <Stack.Screen 
                        name="Starting" 
                        component={Starting}
                    />
                </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
