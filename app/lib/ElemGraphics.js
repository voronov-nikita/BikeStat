import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import React from 'react';


const LineChartExample = ({width=500, height=500, color="red", dataArray}) => {

    return (
        <LineChart width={width} height={height}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#eeeeee" strokeDasharray="10 10" />
            
            <Line type="monotone" dataKey="value" stroke={color} data={dataArray} name="Статистика" />
            
            <Tooltip />
            <Legend />
        </LineChart>
    );
};

export default LineChartExample;
