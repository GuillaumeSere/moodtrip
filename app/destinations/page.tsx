import { moods } from "../lib/moods";
import DestinationCard from "../components/DestinationCard";
import { getCityImage } from "../lib/unsplash";
import { getWeather } from "../lib/weather";

type EnrichedDest = {
city: string;
lat: number;
lon: number;
mood: string;
image?: string | null;
weather?: { temperature: number; windspeed: number; condition?: string };
};

export default async function DestinationPage() {
    // Préparer toutes les destinations avec image et météo
    const allDestinations = await Promise.all(
        Object.entries(moods).map(async ([mood, destinations]) => {
            const enrichedDestinations = await Promise.all(
                destinations.map(async (dest) => {
                    // Récupérer image
                    let image: string | null = null;
                    try {
                        image = await getCityImage(dest.city);
                    } catch (e) {
                        console.warn(`Image not found for ${dest.city}`);
                    }

                    // Récupérer météo
                    let weather;
                    try {
                        weather = await getWeather(dest.lat, dest.lon);
                    } catch (e) {
                        console.warn(`Weather not found for ${dest.city}`);
                    }

                    return {
                        ...dest,
                        mood,
                        image,
                        weather,
                    };
                })
            );

            return [mood, enrichedDestinations];
        })
    );

   const enrichedMoods: Record<string, EnrichedDest[]> = Object.fromEntries(allDestinations);

    return (
        <main className="min-h-screen pt-30 bg-linear-to-br from-slate-400 to-slate-700 text-white p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl md:text-5xl font-bold mb-10 text-center">
                    🌍 Toutes les destinations
                </h1>

                {Object.entries(enrichedMoods).map(([mood, destinations]) => {
                    // Ici on dit à TS que destinations est un tableau
                    const destArray = destinations as Array<{
                        city: string;
                        lat: number;
                        lon: number;
                        mood: string;
                        image?: string | null;
                        weather?: { temperature: number; windspeed: number; condition?: "partlyCloudy" | "sunny" | "cloudy" | "rain" | "snow" }
                        description?: string;
                    }>;

                    return (
                        <section key={mood} className="mb-12">
                            <h2 className="text-2xl md:text-3xl font-semibold mb-6 capitalize border-b border-white/20 pb-2">
                                {mood}
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {destArray.map((dest) => (
                                    <DestinationCard
                                        key={dest.city}
                                        city={dest.city}
                                        mood={dest.mood}
                                        image={dest.image}
                                        weather={dest.weather}
                                        description={dest.description}
                                    />
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>
        </main>
    );
}