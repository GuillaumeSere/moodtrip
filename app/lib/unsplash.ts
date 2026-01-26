export async function getCityImage(city: string) {
const res = await fetch(
`https://api.unsplash.com/search/photos?query=${city}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
{ next: { revalidate: 86400 } }
);


if (!res.ok) {
console.error("Unsplash fetch failed", res.status, await res.text());
return null;
}


const data = await res.json();
if (!data.results || data.results.length === 0) {
console.warn("No Unsplash image found for city:", city);
return null;
}


return data.results[0].urls.regular;
}

// lib/unsplash.ts
export async function getRandomBackground() {
  const topics = ["travel", "nature", "city", "beach", "mountain", "adventure"];
  const topic = topics[Math.floor(Math.random() * topics.length)];

  const res = await fetch(
    `https://api.unsplash.com/photos/random?query=${topic}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
    { next: { revalidate: 86400 } }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data.urls.full;
}