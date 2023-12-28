
import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Plan from './PlanWayPage';
import History from './HistoryPage';
import Start from './StartPage';

const Tab = createBottomTabNavigator();

const HomePage = () => {

    return (
        <Tab.Navigator 
        
            tabBarOptions={{
                labelStyle: styles.labelStyle,
            }}>

            <Tab.Screen 
                name="Plan Trip" 
                component={Plan}
            />

            <Tab.Screen 
                name="Start Trip" 
                component={Start} 
            />

            <Tab.Screen 
                name="History" 
                component={History} 
            />
        </Tab.Navigator>
    );
};


const styles = {
    labelStyle: {
        fontSize: 16,
        textAlign: 'center',
    },
    focusedLabel: {
        color: 'blue',
    },
    normalLabel: {
        color: 'black',
    },
};

export default HomePage;
