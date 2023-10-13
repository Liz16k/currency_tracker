import 'mapbox-gl/dist/mapbox-gl.css';

import { Map, Marker, Popup } from 'mapbox-gl';
import React, { useEffect, useRef } from 'react';

import { fetchGeolocation } from '../../services/geoapify';
import { type MapComponentProps } from './types';

const MapComponent: React.FC<MapComponentProps> = ({ points }) => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { location } = await fetchGeolocation();
      const map = new Map({
        accessToken: '',
        container: mapContainer.current as HTMLElement,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: location,
        zoom: 12,
      });

      points.forEach(({ geometry, properties, available_currencies }: any) => {
        new Marker({ color: 'red' })
          .setLngLat(geometry.coordinates)
          .setPopup(new Popup({ offset: 25, className: 'marker-popup-content' }).setHTML(`<p>${properties.address_line2}<p>${available_currencies}</p></p>`))
          .addTo(map);
      });

      return () => {
        map.remove();
      };
    };

    void fetchData();
  }, [points]);

  return <div ref={mapContainer} className="map" />;
};

export default MapComponent;
