import React, { useState } from 'react';
import { YMaps, Map, Placemark, RoutePanel } from '@pbe/react-yandex-maps';

const SimpleMapWithRoute = () => {
    const apiKey = "57c7a565-032b-462e-a08a-7a39eff08ebb";

    const [route, setRoute] = useState(null);

    const handleRouteChange = (event) => {
        const { route } = event.get('target');

        // Получаем точки начала и конца маршрута
        const from = route.getWayPoints().get(0).geometry.getCoordinates();
        const to = route.getWayPoints().get(1).geometry.getCoordinates();

        // Выводим координаты в консоль
        console.log('Начальная точка:', from);
        console.log('Конечная точка:', to);

        setRoute(route);
    };


    return (
        <YMaps query={{ apikey: apiKey }}>
            <Map
                defaultState={{
                    center: [55.751574, 37.573856],
                    zoom: 10,
                }}
                width="100%"
                height="600px"
            >
                {route && <Placemark geometry={route.getWayPoints().get(0).geometry.getCoordinates()} />}
                {route && <Placemark geometry={route.getWayPoints().get(1).geometry.getCoordinates()} />}

                <RoutePanel
                    onRouteChange={handleRouteChange}
                />
            </Map>
        </YMaps>
    );
};

export default SimpleMapWithRoute;
