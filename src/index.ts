const readline = require('readline') as typeof import('readline');
const fetchData = require('./utils/fetchData');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter a city name: ', async (city: string) => {
  try {
    const weather = await fetchData(city);
    console.log(`\nWeather in ${weather.city}:`);
    console.log(`Temperature: ${weather.temperature}`);
    console.log(`Wind Speed: ${weather.windSpeed}`);
    console.log(`Condition: ${weather.condition}`);
  } catch (err) {
    console.error('Error fetching weather data:', (err as Error).message);
  } finally {
    rl.close();
  }
});
