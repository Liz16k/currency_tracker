import { ERRORS_MSG } from '@config/constants';
import {
  GEOAPIFY_API_KEY, GEOAPIFY_BASE_URL,
} from '@config/environment';
import { generateRandomCurrencyList } from '@utils/index';
import memoizeOne from 'memoize-one';

import { type IBankPoint, type IGeoData } from './types';

const limit = 25;

const fetchGeolocation = async (): Promise<IGeoData> => {
  try {
    const params = new URLSearchParams({});
    if (GEOAPIFY_API_KEY != null) params.set('apiKey', GEOAPIFY_API_KEY);

    const baseUrl = `${GEOAPIFY_BASE_URL}v1/ipinfo?`;
    const response = await fetch(`${baseUrl}${params.toString()}`);

    const {
      city,
      country,
      location: { longitude: lng, latitude: lat },
    } = await response.json();

    const geoData: IGeoData = {
      location: { lng, lat },
      city: city.name,
      country: country.name,
    };
    return geoData;
  } catch (error) {
    throw new Error(`${ERRORS_MSG.geolocation} ${(error as Error).message}`);
  }
};

const fetchPlaceId = memoizeOne(async (place: string): Promise<string> => {
  try {
    const params = new URLSearchParams({ text: encodeURIComponent(place), format: 'json' });
    if (GEOAPIFY_API_KEY != null) params.set('apiKey', GEOAPIFY_API_KEY);

    const baseUrl = `${GEOAPIFY_BASE_URL}v1/geocode/autocomplete?`;
    const response = await fetch(`${baseUrl}${params.toString()}`);

    const json = await response.json();
    return json?.results[0]?.place_id;
  } catch (error) {
    throw new Error(`${ERRORS_MSG.placeId} ${(error as Error).message}`);
  }
});

const fetchBanks = memoizeOne(async (): Promise<IBankPoint[]> => {
  try {
    const memoizedFetchGeolocation = memoizeOne(fetchGeolocation);
    const { city, country } = await memoizedFetchGeolocation();
    const placeId = await fetchPlaceId(`${city}, ${country}`);

    const params = new URLSearchParams({ categories: 'service.financial', filter: `place:${placeId}`, limit: limit.toString() });
    if (GEOAPIFY_API_KEY != null) params.set('apiKey', GEOAPIFY_API_KEY);

    const baseUrl = `${GEOAPIFY_BASE_URL}v2/places?`;
    const response = await fetch(`${baseUrl}${params.toString()}`);

    const json: { features: Array<Omit<IBankPoint, 'available_currencies'>> } = await response.json();
    const points = json?.features.map((p) => {
      const availableCurrencies = generateRandomCurrencyList();
      return { ...p, available_currencies: availableCurrencies };
    });
    return points;
  } catch (error) {
    throw new Error(`${ERRORS_MSG.banks} ${(error as Error).message}`);
  }
});

export { fetchBanks, fetchGeolocation, fetchPlaceId };
