import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Screen1 from './LoginingPage';
import Screen2 from './test';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
    <Tab.Navigator>
        <Tab.Screen name="Screen1" component={Screen1} />
        <Tab.Screen name="Screen2" component={Screen2} />
        <Tab.Screen name="Screen3" component={Screen2} />
    </Tab.Navigator>
    );
};

// const BottomTabNavigator = () => {
//     return (
//     <Tab.Navigator>
//         <Tab.Screen name="Screen1" component={Screen1} />
//         <Tab.Screen name="Screen2" component={Screen2} />
//         <Tab.Screen name="Screen3" component={Screen2} />
//     </Tab.Navigator>
//     );
// };


export default BottomTabNavigator;
