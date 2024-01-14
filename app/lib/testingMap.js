import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark, RoutePanel } from '@pbe/react-yandex-maps';


const MapWithRoute = () => {

    const apiKey = "57c7a565-032b-462e-a08a-7a39eff08ebb";
    
    const [route, setRoute] = useState(null);
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        // Получение текущих координат пользователя
        navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([latitude, longitude]);
        },
        (error) => {
            console.error('Error getting user location:', error.message);
        }
        );
    }, []);

    const handleMapClick = (event) => {
        const coordinates = event.get('coords');

        // Если у нас уже есть местоположение пользователя, строим маршрут
        if (userLocation) {
        setRoute({
            from: userLocation,
            to: coordinates,
        });
        }
    };

    return (
        <YMaps query={{ apikey: apiKey }}>
            <Map
                defaultState={{
                center: userLocation || [55.751574, 37.573856],
                zoom: 10,
                }}
                width="100%"
                height="600px"
                onClick={handleMapClick}
            >
                {userLocation && (
                    <Placemark
                        key="user"
                        geometry={userLocation}
                    />
                )}

                {route && <RoutePanel route={route} />}
            </Map>
        </YMaps>
    );
};

export default MapWithRoute;
