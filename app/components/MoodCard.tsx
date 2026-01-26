import Link from "next/link";


type Props = {
    mood: string;
    emoji: string;
};


export default function MoodCard({ mood, emoji }: Props) {
    return (
        <Link
            href={`/destinations/${mood}`}
            className="group rounded-2xl bg-[#1e293b1c] backdrop-blur-lg border border-white/20 p-8 flex flex-col items-center justify-center text-center hover:scale-105 hover:bg-gray-800 transition-all duration-300 shadow-lg"
        >
            <div className="text-5xl mb-4 group-hover:rotate-6 transition-transform">
                {emoji}
            </div>
            <h2 className="text-xl font-semibold capitalize text-white">
                {mood}
            </h2>
        </Link>
    );
}