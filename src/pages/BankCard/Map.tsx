// eslint-disable-next-line

import 'mapbox-gl/dist/mapbox-gl.css';

import { Map, Marker, Popup } from 'mapbox-gl';
import React, { useEffect, useRef } from 'react';

import { fetchGeolocation, type IBankPoint } from '../../api/geoapify';

const MapComponent = ({ points }: { points: IBankPoint[] }) => {
  const mapContainer: any = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const { location } = await fetchGeolocation();
      const map = new Map({
        accessToken: '',
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: location,
        zoom: 12,
      });

      points.forEach((point: any) => {
        new Marker({ color: 'red' })
          .setLngLat(point.geometry.coordinates)
          .setPopup(new Popup({ offset: 25, className: 'marker-popup-content' }).setHTML(`<p>${point.properties.address_line2}<p>${point.available_currencies}</p></p>`))
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
