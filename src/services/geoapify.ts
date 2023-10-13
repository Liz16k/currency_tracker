import { GEOAPIFY_API_KEY } from '@utils/envrionment';
import genRandomCurrencyList from '@utils/genRandomCurrencyList';

import { type IBankPoint, type IGeoData } from './types';

const key = GEOAPIFY_API_KEY;
const limit = 25;

const fetchGeolocation = async (): Promise<IGeoData> => {
  const response = await fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=${key}`);
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
};

const fetchPlaceId = async (place: string): Promise<string> => {
  const query = encodeURIComponent(place);
  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&format=json&apiKey=${key}`,
  );
  const json = await response.json();
  return json.results[0].place_id;
};

const fetchBanks = async (): Promise<IBankPoint[]> => {
  const { city, country } = await fetchGeolocation();
  const placeId = await fetchPlaceId(`${city}, ${country}`);
  const response = await fetch(
    `https://api.geoapify.com/v2/places?categories=service.financial&filter=place:${placeId}&limit=${limit}&apiKey=${key}`,
  );

  const json: { features: Array<Omit<IBankPoint, 'available_currencies'>> } = await response.json();
  const points = json.features.map((p) => {
    const availableCurrencies = genRandomCurrencyList();
    return { ...p, available_currencies: availableCurrencies };
  });
  return points;
};

export { fetchBanks, fetchGeolocation, fetchPlaceId };
