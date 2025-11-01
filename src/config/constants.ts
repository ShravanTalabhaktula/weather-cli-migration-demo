export const USER_AGENT =
  process.env.WEATHER_CLI_UA ?? 'weather-cli-migration-demo/1.0.0';
export const REQUEST_TIMEOUT_MS = 10_000;

export const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org/search';
export const OPEN_METEO_BASE = 'https://api.open-meteo.com/v1/forecast';

export const WEATHER_CODE_MAP: Record<number, string> = {
  0: 'Clear',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Drizzle',
  61: 'Rain',
  71: 'Snow',
  80: 'Rain showers',
};
