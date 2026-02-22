const historical = [
  // ─── אתרים היסטוריים ────────────────────────────────────────────────────────
  {
    name: "קיסריה",
    category: "historical",
    region: "center",
    description: "",
    coordinates: { lat: 32.5004, lng: 34.8892 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%a7%d7%99%d7%a1%d7%a8%d7%99%d7%94/",
  },
  {
    name: "תל מגידו",
    category: "historical",
    region: "north",
    description: "",
    coordinates: { lat: 32.5842, lng: 35.1848 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%aa%d7%9c-%d7%9e%d7%92%d7%99%d7%93%d7%95/",
  },
  {
    name: "בית שאן",
    category: "historical",
    region: "north",
    description: "",
    coordinates: { lat: 32.4983, lng: 35.4997 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%91%d7%99%d7%aa-%d7%a9%d7%90%d7%9f/",
  },
  {
    name: "עכו העתיקה",
    aliases: ["אולמות האבירים"],
    category: "historical",
    region: "north",
    description: "",
    coordinates: { lat: 32.9236, lng: 35.0722 },
    externalUrl:
      "https://www.parks.org.il/activity/%D7%A2%D7%9B%D7%95-%D7%90%D7%95%D7%9C%D7%9E%D7%95%D7%AA-%D7%94%D7%90%D7%91%D7%99%D7%A8%D7%99%D7%9D-%D7%94%D7%A2%D7%99%D7%A8-%D7%A9%D7%9E%D7%AA%D7%97%D7%AA-%D7%95%D7%94%D7%A2%D7%99%D7%A8-%D7%A9%D7%9E/",
  },
  {
    name: "תל באר שבע",
    category: "historical",
    region: "south",
    description: "",
    coordinates: { lat: 31.2395, lng: 34.8481 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%aa%d7%9c-%d7%91%d7%90%d7%a8-%d7%a9%d7%91%d7%a2/",
  },
  {
    name: "מצודת נמרוד",
    aliases: ["מבצר נמרוד", "קלעת נמרוד"],
    category: "historical",
    region: "north",
    description: "",
    coordinates: { lat: 33.2476, lng: 35.7105 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%D7%92%D7%9F-%D7%9C%D7%90%D7%95%D7%9E%D7%99-%D7%9E%D7%91%D7%A6%D7%A8-%D7%A0%D7%9E%D7%A8%D7%95%D7%93-%D7%A7%D7%9C%D7%A2%D7%AA-%D7%A0%D7%9E%D7%A8%D7%95%D7%93/",
  },
  {
    name: "עבדת",
    category: "historical",
    region: "south",
    description: "",
    coordinates: { lat: 30.7942, lng: 34.7733 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%a2%d7%91%d7%93%d7%aa/",
  },
  {
    name: "שיבטה הנבטית",
    aliases: ["שבטה"],
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%a9%d7%91%d7%98%d7%94/",
    category: "historical",
    region: "south",
    difficulty: null,
    description: "",
    coordinates: {
      lat: 30.8831,
      lng: 34.6299,
    },
  },
  {
    name: "כוכב הירדן",
    category: "historical",
    region: "north",
    description: "",
    coordinates: { lat: 32.59651513960659, lng: 35.48697566986082 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%9b%d7%95%d7%9b%d7%91-%d7%94%d7%99%d7%a8%d7%93%d7%9f/",
  },
  {
    name: "בית שערים",
    category: "historical",
    region: "north",
    description: "",
    coordinates: { lat: 32.70387432249928, lng: 35.130490898424924 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%91%d7%99%d7%aa-%d7%a9%d7%a2%d7%a8%d7%99%d7%9d/",
  },
  {
    name: "שביל הנחש",
    category: "historical",
    region: "south",
    description: "",
    coordinates: { lat: 31.3118, lng: 35.3636 },
    externalUrl: "",
  },
  {
    name: "הרודיון",
    category: "historical",
    region: "jerusalem",
    description: "",
    coordinates: { lat: 31.6663, lng: 35.2437 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%a4%d7%90%d7%a8%d7%a7-%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%94%d7%a8%d7%95%d7%93%d7%99%d7%95%d7%9f/",
  },
  {
    name: "ממשית",
    category: "historical",
    region: "south",
    description: "",
    coordinates: { lat: 30.8333, lng: 34.8 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%9e%d7%9e%d7%a9%d7%99%d7%aa/",
  },
  {
    name: "בית גוברין",
    category: "historical",
    region: "center",
    description: "",
    coordinates: { lat: 31.6083, lng: 34.8983 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%91%d7%99%d7%aa-%d7%92%d7%95%d7%91%d7%a8%d7%99%d7%9f/",
  },
  {
    name: "ציפורי",
    category: "historical",
    region: "north",
    description: "",
    coordinates: { lat: 32.75, lng: 35.2833 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%a6%d7%99%d7%a4%d7%95%d7%a8%d7%99/",
  },
  {
    name: "חמת טבריה",
    category: "historical",
    region: "north",
    description: "",
    coordinates: { lat: 32.7667, lng: 35.5333 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%97%d7%9e%d7%aa-%d7%98%d7%91%d7%a8%d7%99%d7%94/",
  },
  {
    name: "מבצר מונפור",
    category: "historical",
    region: "north",
    description: "",
    coordinates: { lat: 33.0, lng: 35.2167 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%9e%d7%91%d7%a6%d7%a8-%d7%9e%d7%95%d7%a0%d7%a4%d7%95%d7%a8/",
  },
  {
    name: "כורזים",
    category: "historical",
    region: "north",
    description: "",
    coordinates: { lat: 32.9167, lng: 35.5667 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%9b%d7%95%d7%a8%d7%96%d7%99%d7%9d/",
  },
  {
    name: "בית אלפא",
    category: "historical",
    region: "north",
    description: "",
    coordinates: { lat: 32.5167, lng: 35.4167 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%91%d7%99%d7%aa-%d7%90%d7%9c%d7%a4%d7%90/",
  },
  {
    name: "סוסיתא",
    category: "historical",
    region: "north",
    description: "",
    coordinates: { lat: 32.7833, lng: 35.6667 },
    externalUrl: "https://www.parks.org.il/reserve-park/susita/",
  },
  {
    name: "ברעם",
    category: "historical",
    region: "north",
    description: "",
    coordinates: { lat: 33.0667, lng: 35.4333 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%91%d7%a8%d7%a2%d7%9d/",
  },
  {
    name: "תל דור",
    category: "historical",
    region: "center",
    description: "",
    coordinates: { lat: 32.6167, lng: 34.9167 },
    externalUrl: "https://www.parks.org.il/reserve-park/teldor/",
  },
  {
    name: "מבצר יחיעם",
    category: "historical",
    region: "north",
    description: "",
    coordinates: { lat: 32.9833, lng: 35.1833 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%9e%d7%91%d7%a6%d7%a8-%d7%99%d7%97%d7%99%d7%a2%d7%9d/",
  },
  {
    name: "תל אשקלון",
    category: "historical",
    region: "center",
    description: "",
    coordinates: { lat: 31.6667, lng: 34.55 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%90%d7%a9%d7%a7%d7%9c%d7%95%d7%9f/",
  },
  {
    name: "אפולוניה",
    aliases: ["תל ארשף"],
    category: "historical",
    region: "center",
    description: "",
    coordinates: { lat: 32.2, lng: 34.8167 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%90%d7%a4%d7%95%d7%9c%d7%95%d7%a0%d7%99%d7%94-%d7%aa%d7%9c-%d7%90%d7%a8%d7%a9%d7%a3/",
  },
  {
    name: "עיר דוד",
    category: "historical",
    region: "jerusalem",
    description: "",
    coordinates: { lat: 31.7722, lng: 35.2356 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%a2%d7%99%d7%a8-%d7%93%d7%95%d7%93/",
  },
  {
    name: "כפר נחום",
    category: "historical",
    region: "north",
    description: "",
    coordinates: { lat: 32.8817, lng: 35.575 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%9b%d7%a4%d7%a8-%d7%a0%d7%97%d7%95%d7%9d/",
  },
  {
    name: "חומות ירושלים",
    category: "historical",
    region: "jerusalem",
    description: "",
    coordinates: { lat: 31.7767, lng: 35.2317 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/jerusalem-walls-national-park/",
  },
  {
    name: "תל ערד",
    category: "historical",
    region: "south",
    description: "",
    coordinates: {
      lat: 31.278192059922123,
      lng: 35.12642920548614,
    },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%aa%d7%9c-%d7%a2%d7%a8%d7%93/",
  },
  {
    name: "קומראן",
    category: "historical",
    region: "south",
    description: "",
    coordinates: { lat: 31.7417, lng: 35.4583 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%a4%d7%90%d7%a8%d7%a7-%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%a7%d7%95%d7%9e%d7%a8%d7%90%d7%9f/",
  },
  {
    name: "תל לכיש",
    category: "historical",
    region: "center",
    description: "",
    coordinates: { lat: 31.5583, lng: 34.85 },
    externalUrl: "https://www.parks.org.il/reserve-park/lachish/",
  },
  {
    name: "כורסי",
    category: "historical",
    region: "north",
    description: "",
    coordinates: { lat: 32.8333, lng: 35.6667 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%9b%d7%95%d7%a8%d7%a1%d7%99/",
  },
  {
    name: "תל חצור",
    category: "historical",
    region: "north",
    description: "",
    coordinates: { lat: 33.0167, lng: 35.5667 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%aa%d7%9c-%d7%97%d7%a6%d7%95%d7%a7/",
  },
  {
    name: "סבסטיה",
    aliases: ["שומרון"],
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%a4%d7%90%d7%a8%d7%a7-%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%a9%d7%95%d7%9e%d7%a8%d7%95%d7%9f-%d7%a1%d7%91%d7%a1%d7%98%d7%99%d7%94/",
    category: "historical",
    region: "judea",
    difficulty: "easy",
    description:
      "עתיקות של שומרון, בירת ישראל מימי התנך, וגם של העיר סבסטיה שבנה הורדוס בימי הבית השני.",
    coordinates: {
      lat: 32.277092,
      lng: 35.192313,
    },
  },
  {
    name: "הר הבית",
    aliases: ["בית המקדש", "הר בית ה'"],
    externalUrl: "",
    category: "historical",
    region: "jerusalem",
    difficulty: null,
    description: "לעלות רק בטהרה",
    coordinates: {
      lat: 31.778157,
      lng: 35.237185,
    },
  },
];

module.exports = historical;
