function mapWeatherToCondition(code: number, temp: number): "sunny" | "partlyCloudy" | "cloudy" | "rain" | "snow" {
  // pluie
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(code)) return "rain";
  // neige
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
  // nuageux
  if ([2, 3, 45, 48].includes(code)) return "cloudy";
  // partiellement nuageux / soleil
  if (code === 1) return "partlyCloudy";
  // ciel clair
  if (code === 0) return "sunny";

  return "sunny"; // fallback
}

export async function getWeather(lat: number, lon: number) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) throw new Error("Weather fetch failed");

  const data = await res.json();
  const current = data.current_weather;

  return {
    temperature: current.temperature,
    windspeed: current.windspeed,
    condition: mapWeatherToCondition(current.weathercode, current.temperature),
  };
}