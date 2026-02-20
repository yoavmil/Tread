const nature = [
  // ─── שמורות טבע ופארקים לאומיים ────────────────────────────────────────────
  {
    name: 'שמורת עין גדי',
    category: 'nature', region: 'south',
    description: '',
    coordinates: { lat: 31.4614, lng: 35.3884 },
    externalUrl: 'https://www.parks.org.il/reserve-park/ein-gedi-nature-reserve/'
  },
  {
    name: 'מצדה',
    category: 'nature', region: 'south',
    description: '',
    coordinates: { lat: 31.3157, lng: 35.3535 },
    externalUrl: 'https://www.parks.org.il/reserve-park/masada-national-park/'
  },
  {
    name: 'פארק הכרמל',
    category: 'nature', region: 'north',
    description: '',
    coordinates: { lat: 32.7236, lng: 35.0436 },
    externalUrl: 'https://www.parks.org.il/reserve-park/carmel-national-park/'
  },
  {
    name: 'שמורת בניאס',
    category: 'nature', region: 'north',
    description: '',
    coordinates: { lat: 33.2479, lng: 35.6945 },
    externalUrl: 'https://www.parks.org.il/reserve-park/banias-nature-reserve/'
  },
  {
    name: 'פארק אכזיב',
    category: 'nature', region: 'north',
    description: '',
    coordinates: { lat: 33.0556, lng: 35.1017 },
    externalUrl: 'https://www.parks.org.il/reserve-park/achziv-national-park/'
  },
  {
    name: 'פארק תמנע',
    category: 'nature', region: 'south',
    description: '',
    coordinates: { lat: 29.7721, lng: 34.9930 },
    externalUrl: ''
  },
  {
    name: 'חי-בר יוטבתה',
    category: 'nature', region: 'south',
    description: '',
    coordinates: { lat: 29.8874, lng: 35.0643 },
    externalUrl: 'https://www.parks.org.il/reserve-park/hai-bar-yotvata-nature-reserve/'
  },
  {
    name: 'שמורת תל דן',
    category: 'nature', region: 'north',
    description: '',
    coordinates: { lat: 33.2477, lng: 35.6509 },
    externalUrl: 'https://www.parks.org.il/reserve-park/tel-dan-nature-reserve/'
  },
  {
    name: 'שמורת גמלא',
    category: 'nature', region: 'north',
    description: '',
    coordinates: { lat: 32.8958, lng: 35.7662 },
    externalUrl: 'https://www.parks.org.il/reserve-park/gamla-nature-reserve/'
  },
  {
    name: 'נחל ערוגות',
    category: 'nature', region: 'south',
    description: '',
    coordinates: { lat: 31.4348, lng: 35.4009 },
    externalUrl: 'https://www.parks.org.il/reserve-park/ein-gedi-nature-reserve/'
  },
  {
    name: 'שמורת הר חרמון',
    category: 'nature', region: 'north',
    description: '',
    coordinates: { lat: 33.4170, lng: 35.8593 },
    externalUrl: 'https://www.parks.org.il/reserve-park/mount-hermon-reserve/'
  },
  {
    name: 'שמורת עמק החולה',
    category: 'nature', region: 'north',
    description: '',
    coordinates: { lat: 33.0886, lng: 35.6108 },
    externalUrl: ''
  },
  {
    name: 'שמורת עין אפק',
    category: 'nature', region: 'north',
    description: '',
    coordinates: { lat: 32.8811, lng: 35.1286 },
    externalUrl: 'https://www.parks.org.il/reserve-park/en-afek-nature-reserve/'
  },
  {
    name: 'גן השלושה (הסחנה)',
    category: 'nature', region: 'north',
    description: '',
    coordinates: { lat: 32.4833, lng: 35.5167 },
    externalUrl: 'https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%92%d7%9f-%d7%94%d7%a9%d7%9c%d7%95%d7%a9%d7%94-%d7%94%d7%a1%d7%97%d7%a0%d7%94/'
  },
  {
    name: 'חורשת טל',
    category: 'nature', region: 'north',
    description: '',
    coordinates: { lat: 33.2167, lng: 35.6500 },
    externalUrl: 'https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%97%d7%95%d7%a8%d7%a9%d7%aa-%d7%98%d7%9c/'
  },
  {
    name: 'עין עבדת',
    category: 'nature', region: 'south',
    description: '',
    coordinates: { lat: 30.8167, lng: 34.7667 },
    externalUrl: 'https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%a2%d7%99%d7%9f-%d7%a2%d7%91%d7%93%d7%aa/'
  },
  {
    name: 'נחל עיון (התנור)',
    category: 'nature', region: 'north',
    description: '',
    coordinates: { lat: 33.2500, lng: 35.5667 },
    externalUrl: 'https://www.parks.org.il/reserve-park/%d7%a9%d7%9e%d7%95%d7%a8%d7%aa-%d7%98%d7%91%d7%a2-%d7%a0%d7%97%d7%9c-%d7%a2%d7%99%d7%95%d7%9f-%d7%94%d7%aa%d7%a0%d7%95%d7%a8/'
  },
  {
    name: 'נחל המשושים',
    category: 'nature', region: 'north',
    description: '',
    coordinates: { lat: 32.9833, lng: 35.7667 },
    externalUrl: 'https://www.parks.org.il/reserve-park/%d7%a9%d7%9e%d7%95%d7%a8%d7%aa-%d7%98%d7%91%d7%a2-%d7%a0%d7%97%d7%9c-%d7%94%d7%9e%d7%a9%d7%95%d7%a9%d7%99%d7%9d/'
  },
  {
    name: 'גלבוע',
    category: 'nature', region: 'north',
    description: '',
    coordinates: { lat: 32.4833, lng: 35.4167 },
    externalUrl: 'https://www.parks.org.il/reserve-park/%d7%a9%d7%9e%d7%95%d7%a8%d7%aa-%d7%98%d7%91%d7%a2-%d7%92%d7%9c%d7%91%d7%95%d7%a2/'
  },
  {
    name: 'מעיין חרוד',
    category: 'nature', region: 'north',
    description: '',
    coordinates: { lat: 32.5500, lng: 35.3833 },
    externalUrl: 'https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%9e%d7%a2%d7%99%d7%99%d7%9f-%d7%97%d7%a8%d7%95%d7%93/'
  },
  {
    name: 'הר תבור',
    category: 'nature', region: 'north',
    description: '',
    coordinates: { lat: 32.6833, lng: 35.3833 },
    externalUrl: 'https://www.parks.org.il/reserve-park/%d7%a9%d7%9e%d7%95%d7%a8%d7%aa-%d7%98%d7%91%d7%a2-%d7%95%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%94%d7%a8-%d7%aa%d7%91%d7%95%d7%a8/'
  },
  {
    name: 'נחל שניר-חצבאני',
    category: 'nature', region: 'north',
    description: '',
    coordinates: { lat: 33.2167, lng: 35.6333 },
    externalUrl: 'https://www.parks.org.il/reserve-park/%d7%a9%d7%9e%d7%95%d7%a8%d7%aa-%d7%98%d7%91%d7%a2-%d7%a0%d7%97%d7%9c-%d7%a9%d7%a0%d7%99%d7%a8-%d7%97%d7%a6%d7%91%d7%90%d7%a0%d7%99/'
  },
  {
    name: 'נחל אלכסנדר',
    category: 'nature', region: 'center',
    description: '',
    coordinates: { lat: 32.3667, lng: 34.8833 },
    externalUrl: 'https://www.parks.org.il/reserve-park/%d7%92%d7%9f-%d7%9c%d7%90%d7%95%d7%9e%d7%99-%d7%a0%d7%97%d7%9c-%d7%90%d7%9c%d7%9b%d7%a1%d7%a0%d7%93%d7%a8-%d7%97%d7%95%d7%a3-%d7%91%d7%99%d7%aa-%d7%99%d7%a0%d7%90%d7%99/'
  },
  {
    name: 'עינות צוקים (עין פשחה)',
    category: 'nature', region: 'south',
    description: '',
    coordinates: { lat: 31.7333, lng: 35.4500 },
    externalUrl: 'https://www.parks.org.il/reserve-park/%d7%a9%d7%9e%d7%95%d7%a8%d7%aa-%d7%98%d7%91%d7%a2-%d7%a2%d7%99%d7%99%d7%a0%d7%95%d7%aa-%d7%a6%d7%95%d7%a7%d7%99%d7%9d-%d7%a2%d7%99%d7%9f-%d7%a4%d7%a9%d7%97%d7%94/'
  },
  {
    name: 'חי-בר כרמל',
    category: 'nature', region: 'north',
    description: '',
    coordinates: { lat: 32.5500, lng: 34.9667 },
    externalUrl: 'https://www.parks.org.il/reserve-park/%d7%a9%d7%9e%d7%95%d7%a8%d7%aa-%d7%98%d7%91%d7%a2-%d7%97%d7%99-%d7%91%d7%a8-%d7%91%d7%9b%d7%a8%d7%9e%d7%9c/'
  },
  {
    name: 'מערת הנטיפים',
    category: 'nature', region: 'center',
    description: '',
    coordinates: { lat: 31.8000, lng: 34.9833 },
    externalUrl: 'https://www.parks.org.il/reserve-park/%d7%a9%d7%9e%d7%95%d7%a8%d7%aa-%d7%98%d7%91%d7%a2-%d7%9e%d7%a2%d7%a8%d7%aa-%d7%94%d7%a0%d7%98%d7%99%d7%a4%d7%99%d7%9d/'
  },
];

module.exports = nature;
