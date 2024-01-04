import MapView, { Marker } from '@teovilla/react-native-web-maps';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';


let listMarkers = [];


const ViewMap = () => {

    // отслеживание состояния маркера и локации пользователя в реальном времени
    const [markers, setMarkers] = useState([]);
    const [userLocation, setUserLocation] = useState(null);

    // считываю текщее положение пользователя (по возможности)
    useEffect(() => {
        // Получение текущего местоположения пользователя
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
        (position) => {
            setUserLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        },
        (error) => console.error(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    } else {
        console.error('Ваш браузер не поддерживает Geolocation API');
    }
    }, []);

    // если на карту будет произведено нажатие, то создаться новый маркер
    const handleMapPress = (event) => {
        // переменная для хранения данных о маркере
        let updatedMarkers;

        // если количество выбранных точек меньше 2-х, то добавить новый маркер
        if (markers.length < 2){
            updatedMarkers = [
            ...markers,
            {
                coordinate: event.nativeEvent.coordinate,
                title: `Маркер`,
            },
            ];

        // иначе удалить первый маркер и добавить новый
        } else{
            updatedMarkers = [
            ...markers.slice(1),
            {
                coordinate: event.nativeEvent.coordinate,
                title: `Маркер`,
            },
            ];
        }
        // изменить массив маркеров
        listMarkers = updatedMarkers;
        setMarkers(updatedMarkers);

    };

    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                provider="google"
                googleMapsApiKey="AIzaSyDCLjvzoAkX4iMGyi3cXu6-ilcWI4FkFgc"
                initialRegion={{ latitude: 55.7558, longitude: 37.6176, latitudeDelta: 0.02, longitudeDelta: 0.02 }}
                onPress={handleMapPress}
                >
                {markers.map((marker, index) => (
                    <Marker
                    key={index}
                    coordinate={marker.coordinate}
                    title={marker.title}
                    />
                ))}

                {userLocation && (
                    <Marker
                    coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}
                    title="Ваше местоположение"
                    description="Текущее местоположение пользователя"
                    />
                )}
            </MapView>
        </View>
    );
};

// функция получения массива маркеров
export const getMarkers = () => {
    return listMarkers;
}

export default ViewMap;

