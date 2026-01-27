import { notFound } from "next/navigation";
import { moods } from "../../../lib/moods";
import { getCityImage } from "../../../lib/unsplash";
import { getWeather } from "../../../lib/weather";
import WeatherBadge from "../../../components/WeatherBadge";

type Props = {
  params: Promise<{ mood: string; city: string }>;
};

export default async function DestinationDetailPage({ params }: Props) {
  const { mood, city } = await params;

  if (!(mood in moods)) return notFound();

  const destination = moods[mood as keyof typeof moods].find(
    d => d.city.toLowerCase() === city.toLowerCase()
  );

  if (!destination) return notFound();

  const image = await getCityImage(destination.city);
  const weather = await getWeather(destination.lat, destination.lon);

  const activities = [
    "Visiter les sites emblématiques",
    "Explorer la gastronomie locale",
    "Faire une activité nature ou sportive",
  ];

  const links = [
    { name: "Site officiel", url: "#" },
    { name: "Réservations & billets", url: "https://www.skyscanner.fr/" },
  ];

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <div className="relative h-230">
        {image && <img src={image} alt={destination.city} className="w-full h-full object-cover" />}
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
          <h1 className="text-5xl font-bold drop-shadow-lg">{destination.city}</h1>
          {weather && <WeatherBadge temperature={weather.temperature} windspeed={weather.windspeed} condition={weather.condition} />}
        </div>
      </div>

      <section className="max-w-4xl mx-auto p-6 space-y-6">
        <h2 className="text-3xl font-semibold">À faire à {destination.city}</h2>
        <p className="text-white/80">{destination.description || "Découvrez cette magnifique destination !"}</p>

        <ul className="list-disc list-inside space-y-1 text-white/80">
          {activities.map((act, i) => <li key={i}>{act}</li>)}
        </ul>

        <div className="space-y-2">
          {links.map((link, i) => (
            <a key={i} href={link.url} className="text-blue-400 m-2 hover:underline">{link.name}</a>
          ))}
        </div>
      </section>
    </main>
  );
}