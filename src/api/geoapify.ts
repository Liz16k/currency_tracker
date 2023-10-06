import { type LngLatLike } from 'mapbox-gl';

const key = '';
const limit = 25;
export const mockSuggestions = ['USD', 'EUR', 'GBP', 'AUD', 'CAD'];

const fetchGeolocation = async () => {
  const response = await fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=${key}`);
  const {
    city,
    country,
    location: { longitude: lng, latitude: lat },
  } = await response.json();

  const geoData: {
    city: string
    country: string
    location: LngLatLike
  } = {
    location: { lng, lat },
    city: city.name,
    country: country.name,
  };
  return geoData;
};

const fetchPlaceId = async (place: string) => {
  const query = encodeURIComponent(place);
  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&format=json&apiKey=${key}`,
  );
  const json = await response.json();
  return json.results[0].place_id;
};

function generateRandomCurrencies(currencies = mockSuggestions) {
  const randomCount = Math.floor(Math.random() * (currencies.length + 1));
  const shuffledCurrencies = currencies.sort(() => Math.random() - 0.5);
  return shuffledCurrencies.slice(0, randomCount);
}

const fetchBanks = async (): Promise<IBankPoint[]> => {
  const { city, country } = await fetchGeolocation();
  const placeId = await fetchPlaceId(`${city}, ${country}`);
  const response = await fetch(
    `https://api.geoapify.com/v2/places?categories=service.financial&filter=place:${placeId}&limit=${limit}&apiKey=${key}`,
  );
  const json: any = await response.json();
  const points = json.features.map((p: Omit<IBankPoint, 'available_currencies'>) => {
    const availableCurrencies = generateRandomCurrencies();
    return { ...p, available_currencies: availableCurrencies };
  });
  return points;
};

interface ICoordinates {
  lat: number
  lng: number
}
interface IBankPoint {
  formatted_address: string
  geometry: {
    location: ICoordinates
    viewport: {
      northeast: ICoordinates
      southwest: ICoordinates
    }
  }
  icon: string
  icon_background_color: string
  icon_mask_base_uri: string
  name: string
  place_id: string
  reference: string
  types: string[]
  available_currencies: string[]
}

export { fetchBanks, fetchGeolocation, fetchPlaceId };
export type { IBankPoint, ICoordinates };
