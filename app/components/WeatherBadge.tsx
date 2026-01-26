type Props = {
    temperature: number; // en °C
    windspeed: number;   // en km/h
    condition?: "partlyCloudy" | "sunny" | "cloudy" | "rain" | "snow"; // optionnel
};

export default function WeatherBadge({ temperature, windspeed, condition = "sunny" }: Props) {
    // Déterminer l’icône et la couleur selon la condition
    let icon = "☀️";
    let bgColor = "bg-yellow-400/20 text-yellow-200";

    switch (condition) {
        case "partlyCloudy":
            icon = "⛅"; // soleil avec nuage
            bgColor = "bg-yellow-300/20 text-yellow-200";
            break;
        case "cloudy":
            icon = "☁️";
            bgColor = "bg-gray-400/20 text-gray-200";
            break;
        case "rain":
            icon = "🌧️";
            bgColor = "bg-blue-400/20 text-blue-200";
            break;
        case "snow":
            icon = "❄️";
            bgColor = "bg-white/20 text-white";
            break;
        default:
            icon = "☀️";
            bgColor = "bg-yellow-400/20 text-yellow-200";
    }

    return (
        <div className={`flex items-center gap-4 p-4 mb-10 mt-10 rounded-2xl shadow-lg ${bgColor} backdrop-blur-md`}>
            <div className="text-3xl">{icon}</div>
            <div className="flex flex-col">
                <p className="font-semibold text-lg">{temperature}°C</p>
                <p className="text-sm">💨 {windspeed} km/h</p>
            </div>
        </div>
    );
}