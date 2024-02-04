import { YMaps, Map, Placemark, RoutePanel } from '@pbe/react-yandex-maps';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


let routeData;
let listMarkers = [];


const MapWithRoute = ({startPoint, endPoint}) => {
    const apiKey = "57c7a565-032b-462e-a08a-7a39eff08ebb";

    const [route, setRoute] = useState(null);
    const [routeInfo, setRouteInfo] = useState(null);
    const [markers, setMarkers] = useState([]);

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

        if (markers.length === 0) {
            // Если это первая точка, просто добавьте ее в список маркеров
            setMarkers([coordinates]);
        } else if (markers.length === 1) {

            // Если это вторая точка, установите маршрут и получите информацию о маршруте
            const startCoords = markers[0];
            // Обновите список маркеров
            setMarkers([startCoords, coordinates]);

            // записываем глобальные переменные для дальнейшего импорта
            listMarkers = [startCoords, coordinates];


            setRoute({
                from: startCoords,
                to: coordinates,
            });

            try {
                const info = await getBicycleRouteInfo(startCoords, coordinates);
                setRouteInfo(info);
                routeData = info;

            } catch (error) {
                console.error('Произошла ошибка при получении информации о маршруте:', error.message);
                setRouteInfo(null);
            }

        }
    };

    useEffect(() => {
        
        if (startPoint && endPoint){
            setRoute({
                from: startPoint,
                to: endPoint,
            });
        }
    }, [route]);

    return (
        <YMaps query={{ apikey: apiKey }}>
            <Map
                defaultState={{
                    center: [55.751574, 37.573856],
                    zoom: 13,
                }}
                width="100%"
                height="600px"
                onClick={handleMapClick}
            >
                {markers.map((marker, index) => (
                    <Placemark
                        key={`marker-${index}`}
                        geometry={marker}
                        options={{
                            preset: 'islands#circleDotIcon',
                        }}
                    />
                ))}

                {route && <RoutePanel route={routeInfo} />}

            </Map>
        </YMaps>
    );
};

export const getRoute = () => {
    return route;
}

export const getMarkers = () => {
    return listMarkers;
};

export const getDataWay = () =>{
    return routeData;
}


export default MapWithRoute;