import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyAgE5ecY7pwRzmzTk4cVg4RDWQ-PslNY0c'
const Directions = ({ destination, origin,waypoints, onReady, params }) => (
    <MapViewDirections
        destination={destination}
        origin={origin}
        waypoints={waypoints}
        onReady={onReady}
        params={params}
        language="pt"
        mode="DRIVING"
        optimizeWaypoints={true}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={3}
        strokeColor="#222"

    />
);

export default Directions;
