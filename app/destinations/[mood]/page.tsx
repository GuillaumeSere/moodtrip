import { moods } from "../../lib/moods";
import { getWeather } from "../../lib/weather";
import { getCityImage } from "../../lib/unsplash";
import { notFound } from "next/navigation";
import CityMap from "@/app/components/CityMap";
import DestinationCard from "@/app/components/DestinationCard";

type Props = {
  params: Promise<{ mood: string }>;
};

export default async function DestinationPage({ params }: Props) {
    const { mood } = await params;
    const destinations = moods[mood as keyof typeof moods];

    if (!destinations) return notFound();

    // Choix aléatoire d'une ville
    const random = destinations[Math.floor(Math.random() * destinations.length)];

    const image = await getCityImage(random.city);
    const weather = await getWeather(random.lat, random.lon);

    return (
        <main className="min-h-screen pt-30 bg-linear-to-br from-slate-400 to-slate-700 text-white flex flex-col items-center">
            <div className="max-w-4xl w-full">

                <h1 className="text-4xl md:text-5xl font-bold mb-6 capitalize">
                    Ambiance  {mood} → {random.city}
                </h1>

                <p className="text-white/80 text-lg mb-2">
                    Une destination parfaite pour une ambiance <span className="capitalize font-semibold">{mood}</span> vibe ✨
                </p>

                {image && (
                    <img
                        src={image}
                        alt={random.city}
                        className="rounded-2xl w-full h-100 object-cover mb-6 shadow-xl"
                    />
                )}

                {weather && (
                    <div className="mb-8">
                    <DestinationCard
                        city={random.city}
                        mood={mood}
                        weather={{
                            temperature: weather.temperature,
                            windspeed: weather.windspeed,
                            condition: weather.condition, // à récupérer de ton API météo
                        }}
                          description={random.description}
                    />
                    </div>
                )}
                <CityMap city={random.city} lat={random.lat} lon={random.lon} image={image} />
            </div>
        </main>
    );
}