import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import React from 'react';


import History from './HistoryPage';
import Plan from './PlanWayPage';
import Start from './StartPage';


const Tab = createBottomTabNavigator();

const HomePage = ({route}) => {
    try {
        const { login, password } = route.params;
    console.log(login, password);
    } catch (error) {
        
    }
    

    return (
        <Tab.Navigator 
            initialRouteName='Start Trip'
            tabBarOptions={{
                
                labelStyle: styles.labelStyle,
            }}>

            <Tab.Screen 
                name="Plan Trip" 
                component={Plan}
                options={{
                    headerShown: false,
                    tabBarIcon: () => (
                    <Image
                        source={require('../assets/images/plans.png')}
                        style={{ width: 20, height: 20 }}
                    />
                    ),
                }}
            />

            <Tab.Screen 
                name="Start Trip" 
                component={Start}
                options={{
                    headerShown:false,
                    tabBarIcon: () => (
                        <Image
                            source={require('../assets/images/cycling.png')}
                            style={{ width: 20, height: 20 }}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="History"
                component={History}
                options={{
                    headerShown:false,
                    tabBarIcon: () => (
                        <Image
                            source={require('../assets/images/history.png')}
                            style={{ width: 20, height: 20 }}
                        />
                    ),
                }}
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
