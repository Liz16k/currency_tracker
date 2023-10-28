import 'mapbox-gl/dist/mapbox-gl.css';

import { fetchGeolocation } from '@services/geoapify';
import { type IBankPoint } from '@services/types';
import { useQuery } from '@tanstack/react-query';
import { LastUpdateContext, type LastUpdateContextType } from '@utils/Contexts';
import { MAPBOX_KEY } from '@utils/envrionment';
import {
  Map, Marker, NavigationControl, Popup,
} from 'mapbox-gl';
import React, {
  type FC, useContext, useEffect, useRef,
} from 'react';

import { type MapComponentProps } from './types';

const MapComponent: FC<MapComponentProps> = ({ points }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const { setLastUpdate }: LastUpdateContextType = useContext(LastUpdateContext);

  const {
    dataUpdatedAt,
    isLoading,
    data,
  } = useQuery({
    queryKey: ['geolocation'],
    queryFn: async () => fetchGeolocation(),
    retryDelay: (attempt) => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
    staleTime: 1e3 * 60,
  });

  useEffect(() => {
    const map = new Map({
      accessToken: MAPBOX_KEY,
      container: mapContainer.current as HTMLElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: data?.location,
      zoom: 12,
    });

    points.forEach(({ geometry, properties, available_currencies }: IBankPoint) => {
      new Marker({ color: 'red' })
        .setLngLat(geometry.coordinates)
        .setPopup(new Popup({ offset: 25, className: 'marker-popup-content' }).setHTML(`<p>${properties.formatted}, <span>${available_currencies.toString()}</span></p>`))
        .addTo(map);
    });

    map.addControl(new NavigationControl());

    return () => {
      map.remove();
    };
  }, [data, points]);

  useEffect(() => {
    const event = new Date(dataUpdatedAt);
    setLastUpdate(event.toLocaleTimeString('it-IT'));
  }, [dataUpdatedAt, setLastUpdate]);

  return (
    <>
      {isLoading && <h3>Loading...</h3>}
      <div ref={mapContainer} className="map" />
    </>
  );
};

export default MapComponent;
