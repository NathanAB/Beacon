import React, { useState } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Constants from '../../../../constants';

// Center the map to somewhere in DC by default
const DEFAULT_CENTER = {
  lat: 38.907257,
  lng: -77.036538,
};

const DateMap = ({ google, placeIds }) => {
  const [places, setPlaces] = useState([]);
  const fetchPlaces = (mapProps, map) => {
    if (!placeIds || !placeIds.length) {
      return;
    }
    const service = new google.maps.places.PlacesService(map);
    placeIds.forEach(placeId => {
      service.getDetails(
        {
          placeId,
          fields: ['name', 'geometry'],
        },
        (place, status) => {
          if (status !== google.maps.places.PlacesServiceStatus.OK) {
            console.error('Failed to fetch place details');
            return;
          }
          setPlaces(places.concat(place));
          console.log(place);
        },
      );
    });
  };

  const renderMarkers = () => {
    return places.map(place => {
      return <Marker key={place.name} name={place.name} position={place.geometry.location} />;
    });
  };

  const mapCenter = places && places.length ? places[0].geometry.location : DEFAULT_CENTER;
  return (
    <Map google={google} zoom={15} onReady={fetchPlaces} center={mapCenter}>
      {renderMarkers()}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: Constants.KEYS.MAPS_API_KEY,
})(DateMap);
