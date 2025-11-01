import { getJson } from "./http.js";
import {
    NOMINATIM_BASE,
    OPEN_METEO_BASE,
    USER_AGENT,
    REQUEST_TIMEOUT_MS,
    WEATHER_CODE_MAP
} from "../config/constants.js";

interface WeatherData {
    city: string;
    temperature: string;
    windSpeed: string;
    condition: string;
}

function buildNominatimUrl(city: string) {
    return `${NOMINATIM_BASE}?format=json&q=${encodeURIComponent(city)}`;
}

function buildOpenMeteoUrl(lat: string, lon: string) {
    return `${OPEN_METEO_BASE}?latitude=${lat}&longitude=${lon}&current_weather=true`;
}

type NominatimResult = Array<{
    lat: string;
    lon: string;
    display_name: string;
}>;
type OpenMeteoResponse = {
    current_weather: {
        temperature: number;
        windspeed: number;
        weathercode: number;
    };
};

async function getCoordinates(city: string) {
    const url = buildNominatimUrl(city);
    const list = await getJson<NominatimResult>(
        url,
        {'User-Agent': USER_AGENT},
        REQUEST_TIMEOUT_MS
    );
    if (!list.length || !list[0]) throw new Error('Location not found');
    return {lat: list[0].lat, lon: list[0].lon};
}

async function getWeather(lat: string, lon: string) {
    const url = buildOpenMeteoUrl(lat, lon);
    const data = await getJson<OpenMeteoResponse>(url, {}, REQUEST_TIMEOUT_MS);
    const w = data.current_weather;
    const label = WEATHER_CODE_MAP[w.weathercode] ?? `Code ${w.weathercode}`;
    return {
        temperature: `${w.temperature}°C`,
        windSpeed: `${w.windspeed} km/h`,
        condition: label,
    };
}

export default async function fetchData(city: string): Promise<WeatherData> {
    const {lat, lon} = await getCoordinates(city);
    const weather = await getWeather(lat, lon);
    return {city, ...weather};
}
