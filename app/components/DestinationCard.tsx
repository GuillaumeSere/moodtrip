import WeatherBadge from "./WeatherBadge";

type Props = {
  city: string;
  mood: string;
  image?: string | null;
  weather?: { temperature: number; windspeed: number; condition?: "partlyCloudy"| "sunny" | "cloudy" | "rain" | "snow" };
  description?: string;
};

export default function DestinationCard({ city, mood, image, weather, description }: Props) {
  return (
    <div className="relative bg-gray-900 group rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300">
      {image && (
        <div className="absolute inset-0">
          <img
            src={image}
            alt={city}
            className="w-full h-full object-cover brightness-90 group-hover:brightness-100 transition-all duration-300"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent"></div>
        </div>
      )}

      <div className="relative p-6 flex flex-col justify-end h-60">
        <h2 className="text-lg md:text-xl font-bold text-white drop-shadow-lg capitalize">
          {mood} → {city}
        </h2>
        {description && (
          <p className="mt-1 text-white/80 text-sm drop-shadow-md">{description}</p>
        )}
      </div>

      {weather && (
        <div className="absolute top-0 right-4">
          <WeatherBadge
            temperature={weather.temperature}
            windspeed={weather.windspeed}
            condition={weather.condition}
          />
        </div>
      )}
    </div>
  );
}