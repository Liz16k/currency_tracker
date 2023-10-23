import 'mapbox-gl/dist/mapbox-gl.css';

import { MAPBOX_KEY } from '@config/environment';
import { fetchGeolocation } from '@services/geoapify';
import { useQuery } from '@tanstack/react-query';
import { LastUpdateContext, type LastUpdateContextType } from '@utils/Contexts';
import { Map, Marker, Popup } from 'mapbox-gl';
import React, { useContext, useEffect, useRef } from 'react';

import StyledMap from './styled';
import { type MapComponentProps } from './types';

const MapComponent: React.FC<MapComponentProps> = ({ points }) => {
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

    points.forEach(({ geometry, properties, available_currencies }: any) => {
      new Marker({ color: 'red' })
        .setLngLat(geometry.coordinates)
        .setPopup(new Popup({ offset: 25, className: 'marker-popup-content' }).setHTML(`<p>${properties.address_line2}<p>${available_currencies}</p></p>`))
        .addTo(map);
    });

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
      <StyledMap ref={mapContainer} />
    </>
  );
};

export default MapComponent;
