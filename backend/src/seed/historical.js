const historical = [
  // ─── אתרים היסטוריים ────────────────────────────────────────────────────────
  {
    name: 'קיסריה',
    category: 'historical', region: 'center',
    description: '',
    coordinates: { lat: 32.5004, lng: 34.8892 },
    externalUrl: 'https://www.parks.org.il/reserve-park/caesarea-national-park/'
  },
  {
    name: 'תל מגידו',
    category: 'historical', region: 'north',
    description: '',
    coordinates: { lat: 32.5842, lng: 35.1848 },
    externalUrl: 'https://www.parks.org.il/reserve-park/megiddo-national-park/'
  },
  {
    name: 'בית שאן',
    category: 'historical', region: 'north',
    description: '',
    coordinates: { lat: 32.4983, lng: 35.4997 },
    externalUrl: 'https://www.parks.org.il/reserve-park/beit-shean-national-park/'
  },
  {
    name: 'עכו העתיקה',
    category: 'historical', region: 'north',
    description: '',
    coordinates: { lat: 32.9236, lng: 35.0722 },
    externalUrl: 'https://www.parks.org.il/reserve-park/akko-old-city/'
  },
  {
    name: 'תל באר שבע',
    category: 'historical', region: 'south',
    description: '',
    coordinates: { lat: 31.2395, lng: 34.8481 },
    externalUrl: 'https://www.parks.org.il/reserve-park/tel-beer-sheva-national-park/'
  },
  {
    name: 'מצודת נמרוד',
    category: 'historical', region: 'north',
    description: '',
    coordinates: { lat: 33.2476, lng: 35.7105 },
    externalUrl: 'https://www.parks.org.il/reserve-park/nimrod-fortress-national-park/'
  },
  {
    name: 'עבדת',
    category: 'historical', region: 'south',
    description: '',
    coordinates: { lat: 30.7942, lng: 34.7733 },
    externalUrl: 'https://www.parks.org.il/reserve-park/avdat-national-park/'
  },
  {
    name: 'שיבטה',
    category: 'historical', region: 'south',
    description: '',
    coordinates: { lat: 30.8831, lng: 34.6299 },
    externalUrl: 'https://www.parks.org.il/reserve-park/shivta-national-park/'
  },
  {
    name: 'כוכב הירדן',
    category: 'historical', region: 'north',
    description: '',
    coordinates: { lat: 32.5941, lng: 35.4937 },
    externalUrl: 'https://www.parks.org.il/reserve-park/belvoir-national-park/'
  },
  {
    name: 'בית שערים',
    category: 'historical', region: 'north',
    description: '',
    coordinates: { lat: 32.7021, lng: 35.1318 },
    externalUrl: 'https://www.parks.org.il/reserve-park/beit-shearim-national-park/'
  },
  {
    name: 'שביל הנחש',
    category: 'historical', region: 'south',
    description: '',
    coordinates: { lat: 31.3118, lng: 35.3636 },
    externalUrl: 'https://www.parks.org.il/reserve-park/masada-national-park/'
  },
  {
    name: 'העיר העתיקה ירושלים',
    category: 'historical', region: 'jerusalem',
    description: '',
    coordinates: { lat: 31.7767, lng: 35.2345 },
    externalUrl: 'https://www.parks.org.il/'
  },
  {
    name: 'הרודיון',
    category: 'historical', region: 'jerusalem',
    description: '',
    coordinates: { lat: 31.6663, lng: 35.2437 },
    externalUrl: 'https://www.parks.org.il/reserve-park/herodium-national-park/'
  },
  {
    name: 'ממשית',
    category: 'historical', region: 'south',
    description: '',
    coordinates: { lat: 30.8333, lng: 34.8000 },
    externalUrl: 'https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%9e%d7%9e%d7%a9%d7%99%d7%aa/'
  },
  {
    name: 'בית גוברין',
    category: 'historical', region: 'center',
    description: '',
    coordinates: { lat: 31.6083, lng: 34.8983 },
    externalUrl: 'https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%91%d7%99%d7%aa-%d7%92%d7%95%d7%91%d7%a8%d7%99%d7%9f/'
  },
  {
    name: 'ציפורי',
    category: 'historical', region: 'north',
    description: '',
    coordinates: { lat: 32.7500, lng: 35.2833 },
    externalUrl: 'https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%a6%d7%99%d7%a4%d7%95%d7%a8%d7%99/'
  },
  {
    name: 'חמת טבריה',
    category: 'historical', region: 'north',
    description: '',
    coordinates: { lat: 32.7667, lng: 35.5333 },
    externalUrl: 'https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%97%d7%9e%d7%aa-%d7%98%d7%91%d7%a8%d7%99%d7%94/'
  },
  {
    name: 'מבצר מונפור',
    category: 'historical', region: 'north',
    description: '',
    coordinates: { lat: 33.0000, lng: 35.2167 },
    externalUrl: 'https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%9e%d7%91%d7%a6%d7%a8-%d7%9e%d7%95%d7%a0%d7%a4%d7%95%d7%a8/'
  },
  {
    name: 'כורזים',
    category: 'historical', region: 'north',
    description: '',
    coordinates: { lat: 32.9167, lng: 35.5667 },
    externalUrl: 'https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%9b%d7%95%d7%a8%d7%96%d7%99%d7%9d/'
  },
  {
    name: 'בית אלפא',
    category: 'historical', region: 'north',
    description: '',
    coordinates: { lat: 32.5167, lng: 35.4167 },
    externalUrl: 'https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%91%d7%99%d7%aa-%d7%90%d7%9c%d7%a4%d7%90/'
  },
  {
    name: 'סוסיתא',
    category: 'historical', region: 'north',
    description: '',
    coordinates: { lat: 32.7833, lng: 35.6667 },
    externalUrl: 'https://www.parks.org.il/reserve-park/susita/'
  },
  {
    name: 'ברעם',
    category: 'historical', region: 'north',
    description: '',
    coordinates: { lat: 33.0667, lng: 35.4333 },
    externalUrl: 'https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%91%d7%a8%d7%a2%d7%9d/'
  },
  {
    name: 'תל דור',
    category: 'historical', region: 'center',
    description: '',
    coordinates: { lat: 32.6167, lng: 34.9167 },
    externalUrl: 'https://www.parks.org.il/reserve-park/teldor/'
  },
  {
    name: 'מבצר יחיעם',
    category: 'historical', region: 'north',
    description: '',
    coordinates: { lat: 32.9833, lng: 35.1833 },
    externalUrl: 'https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%9e%d7%91%d7%a6%d7%a8-%d7%99%d7%97%d7%99%d7%a2%d7%9d/'
  },
  {
    name: 'תל אשקלון',
    category: 'historical', region: 'center',
    description: '',
    coordinates: { lat: 31.6667, lng: 34.5500 },
    externalUrl: 'https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%90%d7%a9%d7%a7%d7%9c%d7%95%d7%9f/'
  },
  {
    name: 'אפולוניה',
    aliases: ['תל ארשף'],
    category: 'historical', region: 'center',
    description: '',
    coordinates: { lat: 32.2000, lng: 34.8167 },
    externalUrl: 'https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%90%d7%a4%d7%95%d7%9c%d7%95%d7%a0%d7%99%d7%94-%d7%aa%d7%9c-%d7%90%d7%a8%d7%a9%d7%a3/'
  },
  {
    name: 'עיר דוד',
    category: 'historical', region: 'jerusalem',
    description: '',
    coordinates: { lat: 31.7722, lng: 35.2356 },
    externalUrl: 'https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%a2%d7%99%d7%a8-%d7%93%d7%95%d7%93/'
  },
  {
    name: 'כפר נחום',
    category: 'historical', region: 'north',
    description: '',
    coordinates: { lat: 32.8817, lng: 35.5750 },
    externalUrl: 'https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%9b%d7%a4%d7%a8-%d7%a0%d7%97%d7%95%d7%9d/'
  },
  {
    name: 'חומות ירושלים',
    category: 'historical', region: 'jerusalem',
    description: '',
    coordinates: { lat: 31.7767, lng: 35.2317 },
    externalUrl: 'https://www.parks.org.il/reserve-park/jerusalem-walls-national-park/'
  },
  {
    name: 'תל ערד',
    category: 'historical', region: 'south',
    description: '',
    coordinates: { lat: 31.2833, lng: 35.1167 },
    externalUrl: 'https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%aa%d7%9c-%d7%a2%d7%a8%d7%93/'
  },
  {
    name: 'קומראן',
    category: 'historical', region: 'south',
    description: '',
    coordinates: { lat: 31.7417, lng: 35.4583 },
    externalUrl: 'https://www.parks.org.il/reserve-park/%d7%a4%d7%90%d7%a8%d7%a7-%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%a7%d7%95%d7%9e%d7%a8%d7%90%d7%9f/'
  },
  {
    name: 'תל לכיש',
    category: 'historical', region: 'center',
    description: '',
    coordinates: { lat: 31.5583, lng: 34.8500 },
    externalUrl: 'https://www.parks.org.il/reserve-park/lachish/'
  },
  {
    name: 'כורסי',
    category: 'historical', region: 'north',
    description: '',
    coordinates: { lat: 32.8333, lng: 35.6667 },
    externalUrl: 'https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%9b%d7%95%d7%a8%d7%a1%d7%99/'
  },
  {
    name: 'תל חצור',
    category: 'historical', region: 'north',
    description: '',
    coordinates: { lat: 33.0167, lng: 35.5667 },
    externalUrl: 'https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%aa%d7%9c-%d7%97%d7%a6%d7%95%d7%a7/'
  },
];

module.exports = historical;
