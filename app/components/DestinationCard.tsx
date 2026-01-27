import WeatherBadge from "./WeatherBadge";
import Link from "next/link";

type Props = {
  city: string;
  mood: string;
  image?: string | null;
  weather?: { temperature: number; windspeed: number; condition?: "partlyCloudy"| "sunny" | "cloudy" | "rain" | "snow" };
  description?: string;
  slug?: string; // pour générer le lien vers la page de détail
};

export default function DestinationCard({ city, mood, image, weather, description, slug }: Props) {
  return (
    <Link href={`/destinations/${mood}/${city.toLowerCase()}`} className="group relative rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300">
      {/* Image de fond */}
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

      {/* Contenu */}
      <div className="relative h-60 flex  flex-col justify-end p-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-lg capitalize">
          {mood} → {city}
        </h2>
        {description && (
          <p className="mt-1 text-white/80 text-sm drop-shadow-md">
            {description}
          </p>
        )}
      </div>

      {/* WeatherBadge en overlay */}
      {weather && (
        <div className="absolute top-4 right-4">
          <WeatherBadge
            temperature={weather.temperature}
            windspeed={weather.windspeed}
            condition={weather.condition}
          />
        </div>
      )}

      {/* Overlay bouton “Découvrir” */}
      <div className="absolute top-8 flex items-end justify-center p-6 pointer-events-none">
        <span className="bg-white/20 text-white px-4 py-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
          Découvrir
        </span>
      </div>
    </Link>
  );
}