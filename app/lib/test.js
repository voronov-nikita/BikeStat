import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { View } from 'react-native';


const LineChartExample = () => {
    // Ваши данные точек
    const data = [
        { name: '1', value: 10 },
        { name: '2', value: 15 },
        { name: '3', value: 7 },
        { name: '4', value: 12 },
        // ... добавьте свои данные
    ];

    // Ваши данные точек
    const atad = [
        { name: '1', value: 1 },
        { name: '2', value: 2 },
        { name: '3', value: 3 },
        { name: '4', value: 4 },
        { name: '5', value: 0 },
        { name: '6', value: 0 },
        { name: '7', value: 0 },
        { name: '8', value: 0 },
        // ... добавьте свои данные
    ];

    return (
        <LineChart width={400} height={300}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="10 10" />
            <Line type="monotone" dataKey="value" stroke="blue" data={data} name="График 1" />
            <Line type="monotone" dataKey="value" stroke="red" data={atad} name="График 2" />
            <Tooltip />
            <Legend />
        </LineChart>
    );
};

export default LineChartExample;
