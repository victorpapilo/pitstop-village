// Central place for the restaurant's real-world details.
// Edit these values any time — nothing else in the app needs to change.
export const siteConfig = {
  name: "Pitstop Village",
  tagline: "A poolside stop on Banana Island, worth the whole trip.",
  address: "44 Alexander Avenue, Ikoyi, Lagos 106104, Nigeria",
  phoneDisplay: "+234 916 047 7000",
  whatsappNumber: "2349160477000", // digits only, country code first — used for wa.me links
  hours: "Open daily · 6:00 AM – 1:00 AM",
  rating: 4.4,
  ratingCount: 231,
  mapEmbedQuery: "Pitstop Village, 44 Alexander Ave, Ikoyi, Lagos",
  mapsUrl: "https://www.google.com/maps/place/Pitstop+Village/@6.4490544,3.1612566,11z/data=!4m10!1m2!2m1!1srestaurants+in+Banana+Island,+Lagos!3m6!1s0x103bf50030e6c7bd:0xe0ba72bc18183323!8m2!3d6.4490544!4d3.4496477",
};

export const whatsappLink = (message) =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
