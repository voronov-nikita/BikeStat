import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import React from 'react';


const LineChartExample = ({width, height, color, dataArray}) => {

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
