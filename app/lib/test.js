import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from '@teovilla/react-native-web-maps';

const App = () => {
  const [markers, setMarkers] = useState([]);
  const [routeInfo, setRouteInfo] = useState(null);

  useEffect(() => {
    if (markers.length === 2) {
      const origin = markers[0].coordinate;
      const destination = markers[1].coordinate;

      // Replace 'YOUR_API_KEY' with your OpenRouteService API key
      const openRouteServiceApiKey = '5b3ce3597851110001cf6248d5e983b2d9584213b016651d9f63f634';
      
      // Fetch route information from OpenRouteService
      fetch(`https://api.openrouteservice.org/v2/directions/foot-walking?api_key=${openRouteServiceApiKey}&start=${origin[1]},${origin[0]}&end=${destination[1]},${destination[0]}`)
        .then(response => response.json())
        .then(data => {
          if (data.features && data.features.length > 0) {
            const distance = data.features[0].properties.segments[0].distance;
            const duration = data.features[0].properties.segments[0].duration;

            setRouteInfo({
              distance: distance,
              duration: duration,
            });
          }
        })
        .catch(error => console.error('Error:', error));
    }
  }, [markers]);

  const handleMapPress = (event) => {
    console.log(event);
    const newMarker = {
      coordinate: [event.nativeEvent.coordinate.longitude, event.nativeEvent.coordinate.latitude],
      title: `Маркер ${markers.length + 1}`,
    };

    setMarkers([...markers, newMarker]);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        provider="google"
        googleMapsApiKey="AIzaSyDCLjvzoAkX4iMGyi3cXu6-ilcWI4FkFgc"
        initialRegion={{ latitude: 55.7558, longitude: 37.6176, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
        onPress={handleMapPress}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
          />
        ))}
      </MapView>

      {routeInfo && (
        <View style={{ padding: 10, backgroundColor: 'white', alignSelf: 'center', position: 'absolute', bottom: 80, borderRadius: 5 }}>
          <Text>Расстояние: {routeInfo.distance} метров</Text>
          <Text>Время в пути: {routeInfo.duration} секунд</Text>
        </View>
      )}

      <View style={{ position: 'absolute', bottom: 16, alignSelf: 'center' }}>
        <TouchableOpacity onPress={() => setMarkers([])}>
          <View style={{ padding: 10, backgroundColor: 'red', borderRadius: 5 }}>
            <Text style={{ color: 'white' }}>Очистить маркеры</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
