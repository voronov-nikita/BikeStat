// AppNavigator.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Screen1 from './MainPage';
import Screen2 from './PlanWayPage';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen
            name="Screen1"
            component={Screen1}
            options={{
                tabBarLabel: 'Экран 1',
            }}
            />
            <Tab.Screen
            name="Screen2"
            component={Screen2}
            options={{
                tabBarLabel: 'Экран 2',
            }}
            />
        </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
