import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const MapScreen = () => {
  const apiKey = '57c7a565-032b-462e-a08a-7a39eff08ebb';

  const [points, setPoints] = useState([]);
  const [route, setRoute] = useState(null);

  const handleAddPoint = (latitude, longitude) => {
    const newPoints = [...points, { latitude, longitude }];
    setPoints(newPoints);

    if (newPoints.length >= 2) {
      calculateRoute(newPoints);
    }
  };

  const calculateRoute = async (points) => {
    const url = `https://route.api.maps.yandex.net/v1/distancematrix?apikey=${apiKey}&mode=pedestrian&origins=${points[0].latitude},${points[0].longitude}&destinations=${points[1].latitude},${points[1].longitude}&format=json`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK') {
        setRoute(data);
      } else {
        console.error('Error calculating route:', data);
      }
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  return (
    <View>
      <Text>React Native Map with Yandex Routes</Text>
      <Button title="Add Point" onPress={() => handleAddPoint(55.753215, 37.622504)} />
      {/* Add more buttons or UI for adding points */}
      <Text>Points: {JSON.stringify(points)}</Text>
      {route && <Text>Route: {JSON.stringify(route)}</Text>}
    </View>
  );
};

export default MapScreen;
