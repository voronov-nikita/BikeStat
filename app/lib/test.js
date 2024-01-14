import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark, RoutePanel } from '@pbe/react-yandex-maps';
import axios from 'axios';

const MapWithRoute = () => {
  const apiKey = "57c7a565-032b-462e-a08a-7a39eff08ebb";

  const [route, setRoute] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);

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

  const getBicycleRouteInfo = async (startCoords, endCoords) => {
    try {
      const osrmUrl = 'https://router.project-osrm.org/route/v1/bicycle/';
      const waypoints = `${startCoords[1]},${startCoords[0]};${endCoords[1]},${endCoords[0]}`;

      const response = await axios.get(`${osrmUrl}${waypoints}?steps=false&geometries=geojson&overview=full`);
      const data = response.data;

      if (data.routes && data.routes.length > 0) {
        const timeInSeconds = data.routes[0].duration;
        const distanceInKilometers = (data.routes[0].distance / 1000).toFixed(2);

        return {
          timeInSeconds,
          distanceInKilometers,
        };
      } else {
        throw new Error('Не удалось получить маршрут');
      }
    } catch (error) {
      console.error('Ошибка запроса:', error.message);
      throw error;
    }
  };

  const handleMapClick = async (event) => {
    const coordinates = event.get('coords');

    // Если у нас уже есть местоположение пользователя, строим маршрут
    if (userLocation) {
      setRoute({
        from: userLocation,
        to: coordinates,
      });

      try {
        const info = await getBicycleRouteInfo(userLocation, coordinates);
        setRouteInfo(info);
      } catch (error) {
        // Обработка ошибок
        console.error('Произошла ошибка при получении информации о маршруте:', error.message);
        setRouteInfo(null);
      }
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

        {routeInfo && (
          <div style={{ position: 'absolute', top: 0, left: 0, padding: '10px', background: 'white', zIndex: 1000 }}>
            <p>Примерное время: {routeInfo.timeInSeconds} сек</p>
            <p>Примерное расстояние: {routeInfo.distanceInKilometers} км</p>
          </div>
        )}
      </Map>
    </YMaps>
  );
};

export default MapWithRoute;
