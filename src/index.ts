import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from 'node:process'
import fetchData from "./utils/fetchData.js";

const rl = createInterface({
    input,
    output,
});
const city = await rl.question('Enter a city name: ');
rl.close();

try {
    const weather = await fetchData(city);
    console.log(`\nWeather in ${weather.city}:`);
    console.log(`Temperature: ${weather.temperature}`);
    console.log(`Wind Speed: ${weather.windSpeed}`);
    console.log(`Condition: ${weather.condition}`);
} catch (err) {
    console.error('Error fetching weather data:', (err as Error).message);
}