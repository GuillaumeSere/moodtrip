"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

type Props = {
  city: string;
  lat: number;
  lon: number;
  image?: string | null;
};

const defaultIcon = L.icon({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function CityMap({ city, lat, lon, image }: Props) {
  return (
    <div className="w-full h-96 rounded-2xl overflow-hidden shadow-lg mb-6">
      <MapContainer
        center={[lat, lon]}
        zoom={12}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]} icon={defaultIcon}>
          <Popup>
            <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg text-center w-56">
              <h3 className="font-bold text-lg mb-2">{city}</h3>
              {image ? (
                <img
                  src={image}
                  alt={city}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
              ) : (
                <div className="w-full h-32 bg-gray-300 flex items-center justify-center rounded-lg mb-2">
                  Image non disponible
                </div>
              )}
              <p className="text-sm text-white/90">
                Coordonnées : {lat.toFixed(4)}, {lon.toFixed(4)}
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}