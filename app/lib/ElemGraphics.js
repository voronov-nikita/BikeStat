import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { View, StyleSheet } from 'react-native';
import React from 'react';



const LineChartExample = ({width=500, height=500, color="red", dataArray, title}) => {

    return (
        <LineChart width={width} height={height}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#eeeeee" strokeDasharray="10 10" />
            
            <Line type="monotone" dataKey="value" stroke={color} data={dataArray} name={title} />
            
            <Tooltip />
            <Legend />
        </LineChart>
        
    );
};


export const MultiLineChart = ({data}) => {
        return (
        <View style={styles.container}>
            <LineChart width={800} height={200} data={data} name={"Грфик максимального и минимального пульса."}>
                <XAxis dataKey="name" />
                <YAxis />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="maxPulse" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="minPulse" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        backgroundColor: '#fff',
    },
});

export default LineChartExample;
