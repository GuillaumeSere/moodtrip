import MoodCard from "./components/MoodCard";
import { getRandomBackground } from "./lib/unsplash";

const moods = [
  { name: "relax", emoji: "😌" },
  { name: "adventure", emoji: "🧗" },
  { name: "romantic", emoji: "💕" },
  { name: "nature", emoji: "🌿" },
  { name: "city", emoji: "🌆" },
  { name: "fun", emoji: "🥳" },
];

export default async function Home() {
  const background = await getRandomBackground();

  return (
    <main
      className="min-h-screen pt-20 flex flex-col items-center px-6 py-16 bg-cover bg-center"
      style={{
        backgroundImage: background
          ? `url(${background})`
          : "linear-gradient(to bottom right, #1e293b, #334155)", // fallback
      }}
    >
      <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6 drop-shadow-lg">
        MoodTrip 🌍
      </h1>

      <p className="text-white/80 text-lg md:text-xl text-center max-w-2xl mb-12 drop-shadow-md">
        Choisissez votre humeur et nous trouverons votre destination idéale. ✨
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {moods.map((mood) => (
          <MoodCard key={mood.name} mood={mood.name} emoji={mood.emoji} />
        ))}
      </div>
    </main>
  );
}