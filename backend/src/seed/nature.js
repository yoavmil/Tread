const nature = [
  // ─── שמורות טבע ופארקים לאומיים ────────────────────────────────────────────
  {
    name: "שמורת עין גדי",
    category: "nature",
    region: "south",
    description: "",
    coordinates: { lat: 31.4614, lng: 35.3884 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%D7%A9%D7%9E%D7%95%D7%A8%D7%AA-%D7%98%D7%91%D7%A2-%D7%A2%D7%99%D7%9F-%D7%92%D7%93%D7%99/",
  },
  {
    name: "מצדה",
    category: "nature",
    region: "south",
    description: "",
    coordinates: { lat: 31.3157, lng: 35.3535 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%D7%92%D7%9F-%D7%9C%D7%90%D7%95%D7%9E%D7%99-%D7%9E%D7%A6%D7%93%D7%94/",
  },
  {
    name: "פארק הכרמל",
    category: "nature",
    region: "north",
    description: "",
    coordinates: { lat: 32.7236, lng: 35.0436 },
    externalUrl: "https://www.parks.org.il/reserve-park/carmel-national-park/",
  },
  {
    name: "שמורת בניאס",
    category: "nature",
    region: "north",
    description: "",
    coordinates: { lat: 33.2479, lng: 35.6945 },
    externalUrl: "https://www.parks.org.il/reserve-park/banias-nature-reserve/",
  },
  {
    name: "פארק אכזיב",
    category: "nature",
    region: "north",
    description: "",
    coordinates: { lat: 33.0556, lng: 35.1017 },
    externalUrl: "https://www.parks.org.il/reserve-park/achziv-national-park/",
  },
  {
    name: "פארק תמנע",
    category: "nature",
    region: "south",
    description: "",
    coordinates: { lat: 29.7721, lng: 34.993 },
    externalUrl: "",
  },
  {
    name: "חי-בר יוטבתה",
    category: "nature",
    region: "south",
    description: "",
    coordinates: { lat: 29.8874, lng: 35.0643 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/hai-bar-yotvata-nature-reserve/",
  },
  {
    name: "שמורת תל דן",
    category: "nature",
    region: "north",
    description: "",
    coordinates: { lat: 33.2477, lng: 35.6509 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/tel-dan-nature-reserve/",
  },
  {
    name: "שמורת גמלא",
    category: "nature",
    region: "north",
    description: "",
    coordinates: { lat: 32.8958, lng: 35.7662 },
    externalUrl: "https://www.parks.org.il/reserve-park/gamla-nature-reserve/",
  },
  {
    name: "נחל ערוגות",
    category: "nature",
    region: "south",
    description: "",
    difficulty: "easy",
    coordinates: { lat: 31.456851504308418, lng: 35.38368612467038 },
    externalUrl: "https://www.parks.org.il/reserve-park/arugot",
  },
  {
    name: "אתר החרמון",
    category: "nature",
    region: "north",
    description: "",
    coordinates: { lat: 33.30889843057642, lng: 35.773922301015915 },
    externalUrl: "http://www.skihermon.co.il/",
  },
  {
    name: "שמורת עמק החולה",
    category: "nature",
    region: "north",
    description: "",
    coordinates: { lat: 33.0886, lng: 35.6108 },
    externalUrl: "",
  },
  {
    name: "שמורת עין אפק",
    category: "nature",
    region: "north",
    description: "",
    coordinates: { lat: 32.8478164534709, lng: 35.11079169649081 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%D7%A9%D7%9E%D7%95%D7%A8%D7%AA-%D7%98%D7%91%D7%A2-%D7%A2%D7%99%D7%9F-%D7%90%D7%A4%D7%A7/",
  },
  {
    name: "גן השלושה",
    aliases: ["הסחנה"],
    category: "nature",
    region: "north",
    description: "",
    coordinates: { lat: 32.4833, lng: 35.5167 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%92%d7%9f-%d7%94%d7%a9%d7%9c%d7%95%d7%a9%d7%94-%d7%94%d7%a1%d7%97%d7%a0%d7%94/",
  },
  {
    name: "חורשת טל",
    category: "nature",
    region: "north",
    description: "",
    coordinates: { lat: 33.2167, lng: 35.65 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%97%d7%95%d7%a8%d7%a9%d7%aa-%d7%98%d7%9c/",
  },
  {
    name: "עין עבדת",
    category: "nature",
    region: "south",
    description: "",
    coordinates: { lat: 30.8167, lng: 34.7667 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%a2%d7%99%d7%9f-%d7%a2%d7%91%d7%93%d7%aa/",
  },
  {
    name: "נחל עיון",
    aliases: ["התנור"],
    category: "nature",
    region: "north",
    description: "",
    coordinates: { lat: 33.25, lng: 35.5667 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%a9%d7%9e%d7%95%d7%a8%d7%aa-%d7%98%d7%91%d7%a2-%d7%a0%d7%97%d7%9c-%d7%a2%d7%99%d7%95%d7%9f-%d7%94%d7%aa%d7%a0%d7%95%d7%a8/",
  },
  {
    name: "נחל המשושים",
    category: "nature",
    region: "north",
    description: "",
    coordinates: { lat: 32.9833, lng: 35.7667 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%a9%d7%9e%d7%95%d7%a8%d7%aa-%d7%98%d7%91%d7%a2-%d7%a0%d7%97%d7%9c-%d7%94%d7%9e%d7%a9%d7%95%d7%a9%d7%99%d7%9d/",
  },
  {
    name: "גלבוע",
    category: "nature",
    region: "north",
    description: "",
    coordinates: { lat: 32.4833, lng: 35.4167 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%a9%d7%9e%d7%95%d7%a8%d7%aa-%d7%98%d7%91%d7%a2-%d7%92%d7%9c%d7%91%d7%95%d7%a2/",
  },
  {
    name: "מעיין חרוד",
    category: "nature",
    region: "north",
    description: "",
    coordinates: { lat: 32.55172992441953, lng: 35.357686906518246 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%9e%d7%a2%d7%99%d7%99%d7%9f-%d7%97%d7%a8%d7%95%d7%93/",
  },
  {
    name: "הר תבור",
    category: "nature",
    region: "north",
    description: "",
    coordinates: { lat: 32.6833, lng: 35.3833 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%a9%d7%9e%d7%95%d7%a8%d7%aa-%d7%98%d7%91%d7%a2-%d7%95%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%94%d7%a8-%d7%aa%d7%91%d7%95%d7%a8/",
  },
  {
    name: "נחל שניר-חצבאני",
    category: "nature",
    region: "north",
    description: "",
    coordinates: { lat: 33.2167, lng: 35.6333 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%a9%d7%9e%d7%95%d7%a8%d7%aa-%d7%98%d7%91%d7%a2-%d7%a0%d7%97%d7%9c-%d7%a9%d7%a0%d7%99%d7%a8-%d7%97%d7%a6%d7%91%d7%90%d7%a0%d7%99/",
  },
  {
    name: "נחל אלכסנדר",
    category: "nature",
    region: "center",
    description: "",
    coordinates: { lat: 32.3667, lng: 34.8833 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%a0%d7%97%d7%9c-%d7%90%d7%9c%d7%9b%d7%a1%d7%a0%d7%93%d7%a8-%d7%97%d7%95%d7%a3-%d7%91%d7%99%d7%aa-%d7%99%d7%a0%d7%90%d7%99/",
  },
  {
    name: "עינות צוקים",
    aliases: ["עין פשחה"],
    category: "nature",
    region: "south",
    description: "",
    coordinates: { lat: 31.7333, lng: 35.45 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%a9%d7%9e%d7%95%d7%a8%d7%aa-%d7%98%d7%91%d7%a2-%d7%a2%d7%99%d7%99%d7%a0%d7%95%d7%aa-%d7%a6%d7%95%d7%a7%d7%99%d7%9d-%d7%a2%d7%99%d7%9f-%d7%a4%d7%a9%d7%97%d7%94/",
  },
  {
    name: "חי-בר כרמל",
    category: "nature",
    region: "north",
    description: "",
    coordinates: { lat: 32.55, lng: 34.9667 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%a9%d7%9e%d7%95%d7%a8%d7%aa-%d7%98%d7%91%d7%a2-%d7%97%d7%99-%d7%91%d7%a8-%d7%91%d7%9b%d7%a8%d7%9e%d7%9c/",
  },
  {
    name: "מערת הנטיפים",
    category: "nature",
    region: "center",
    description: "",
    coordinates: { lat: 31.8, lng: 34.9833 },
    externalUrl:
      "https://www.parks.org.il/reserve-park/%d7%a9%d7%9e%d7%95%d7%a8%d7%aa-%d7%98%d7%91%d7%a2-%d7%9e%d7%a2%d7%a8%d7%aa-%d7%94%d7%a0%d7%98%d7%99%d7%a4%d7%99%d7%9d/",
  },
  {
    name: "גבעות מרר",
    aliases: [],
    externalUrl: "https://www.parks.org.il/reserve-park/mrar/",
    category: "nature",
    region: "center",
    difficulty: null,
    description: "ליד האנדרטה לצנחנים",
    coordinates: {
      lat: 31.841603,
      lng: 34.785626,
    },
  },
  {
    name: "שמורת טבע מעיינות גבתון",
    aliases: [],
    externalUrl: "https://www.parks.org.il/reserve-park/m-gibton/",
    category: "nature",
    region: "center",
    difficulty: null,
    description: "",
    coordinates: {
      lat: 31.852532,
      lng: 34.865464,
    },
  },
];

module.exports = nature;
