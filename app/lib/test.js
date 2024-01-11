// PointChart.js
import React from 'react';
import { View } from 'react-native';
import { LineChart, Grid } from 'react-native-svg-charts';

const PointChart = () => {
    const data = [10, 20, 30, 40, 25, 35, 15];
    return (
        <View style={{ height: 200, padding: 20 }}>
        <LineChart
            style={{ flex: 1 }}
            data={data}
            svg={{ stroke: 'rgb(134, 65, 244)' }}
            contentInset={{ top: 20, bottom: 20 }}
        >
            <Grid />
        </LineChart>
        </View>
    );
};

export default PointChart;
