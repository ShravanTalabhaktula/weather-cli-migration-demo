import https from 'https';

interface WeatherData {
  city: string;
  temperature: string;
  windSpeed: string;
  condition: string;
}

function fetch(
  url: string,
  headers: Record<string, string> = {}
): Promise<string> {
  return new Promise((resolve, reject) => {
    let data: string = '';
    const request = https
      .get(url, { headers }, (res) => {
        res.on('data', (chunk: Buffer) => (data += chunk));
        res.on('end', () => resolve(data));
      })
      .on('error', reject);
  });
}

async function getCoordinates(city: string) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    city
  )}`;
  const json = JSON.parse(
    await fetch(url, { 'User-Agent': 'weather-cli-demo' })
  );
  if (!json.length) throw new Error('Location not found');
  return { lat: json[0].lat, lon: json[0].lon };
}

async function getWeather(lat: string, lon: string) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  const { current_weather: w } = JSON.parse(await fetch(url));
  return {
    temperature: `${w.temperature}°C`,
    windSpeed: `${w.windspeed} km/h`,
    condition: w.weathercode.toString(),
  };
}

async function fetchData(city: string): Promise<WeatherData> {
  const { lat, lon } = await getCoordinates(city);
  const weather = await getWeather(lat, lon);
  return {
    city,
    ...weather,
  };
}

export = fetchData;
