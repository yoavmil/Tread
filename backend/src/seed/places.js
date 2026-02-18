const places = [
  // ─── NATURE / NATIONAL PARKS ───────────────────────────────────────────────
  {
    name: 'Ein Gedi Nature Reserve',
    nameHe: 'שמורת עין גדי',
    category: 'nature',
    region: 'south',
    description: 'Lush oasis on the shores of the Dead Sea with dramatic waterfalls, ibex, and hiking trails through desert canyons.',
    coordinates: { lat: 31.4614, lng: 35.3884 },
    externalUrl: 'https://www.parks.org.il/reserve-park/ein-gedi-nature-reserve/'
  },
  {
    name: 'Masada National Park',
    nameHe: 'מצדה',
    category: 'nature',
    region: 'south',
    description: 'Iconic ancient fortress atop an isolated rock plateau above the Dead Sea. UNESCO World Heritage Site.',
    coordinates: { lat: 31.3157, lng: 35.3535 },
    externalUrl: 'https://www.parks.org.il/reserve-park/masada-national-park/'
  },
  {
    name: 'Mount Carmel National Park',
    nameHe: 'פארק הכרמל',
    category: 'nature',
    region: 'north',
    description: 'Israel\'s largest national park, covering forested hills above Haifa with caves, springs, and Druze villages.',
    coordinates: { lat: 32.7236, lng: 35.0436 },
    externalUrl: 'https://www.parks.org.il/reserve-park/carmel-national-park/'
  },
  {
    name: 'Banias Nature Reserve',
    nameHe: 'שמורת בניאס',
    category: 'nature',
    region: 'north',
    description: 'Ancient springs feeding a rushing stream through lush forest, with a Crusader palace and impressive waterfall.',
    coordinates: { lat: 33.2479, lng: 35.6945 },
    externalUrl: 'https://www.parks.org.il/reserve-park/banias-nature-reserve/'
  },
  {
    name: 'Achziv National Park',
    nameHe: 'פארק אכזיב',
    category: 'nature',
    region: 'north',
    description: 'Ancient coastal town ruins alongside beautiful beaches and natural tidal pools on the Mediterranean.',
    coordinates: { lat: 33.0556, lng: 35.1017 },
    externalUrl: 'https://www.parks.org.il/reserve-park/achziv-national-park/'
  },
  {
    name: 'Timna Valley Park',
    nameHe: 'פארק תמנע',
    category: 'nature',
    region: 'eilat',
    description: 'Ancient copper mines surrounded by spectacular rock formations including the famous "Mushroom" and King Solomon\'s Pillars.',
    coordinates: { lat: 29.7721, lng: 34.9930 },
    externalUrl: 'https://www.parktimna.co.il/'
  },
  {
    name: 'Hai-Bar Yotvata Nature Reserve',
    nameHe: 'חי-בר יוטבתה',
    category: 'nature',
    region: 'eilat',
    description: 'Wildlife reserve dedicated to breeding endangered desert animals including oryx, onagers, and ostriches.',
    coordinates: { lat: 29.8874, lng: 35.0643 },
    externalUrl: 'https://www.parks.org.il/reserve-park/hai-bar-yotvata-nature-reserve/'
  },
  {
    name: 'Tel Dan Nature Reserve',
    nameHe: 'שמורת תל דן',
    category: 'nature',
    region: 'north',
    description: 'Ancient Canaanite city with one of the world\'s oldest arched gateways, surrounded by lush streams and forest.',
    coordinates: { lat: 33.2477, lng: 35.6509 },
    externalUrl: 'https://www.parks.org.il/reserve-park/tel-dan-nature-reserve/'
  },
  {
    name: 'Gamla Nature Reserve',
    nameHe: 'שמורת גמלא',
    category: 'nature',
    region: 'north',
    description: 'Ancient Jewish city on a dramatic ridge in the Golan, with Israel\'s largest griffon vulture colony and stunning waterfalls.',
    coordinates: { lat: 32.8958, lng: 35.7662 },
    externalUrl: 'https://www.parks.org.il/reserve-park/gamla-nature-reserve/'
  },
  {
    name: 'Nahal Arugot',
    nameHe: 'נחל ערוגות',
    category: 'nature',
    region: 'south',
    description: 'Beautiful canyon near Ein Gedi with permanent pools, waterfalls, and rich desert flora in the Judean Desert.',
    coordinates: { lat: 31.4348, lng: 35.4009 },
    externalUrl: 'https://www.parks.org.il/reserve-park/ein-gedi-nature-reserve/'
  },
  {
    name: 'Mount Hermon Reserve',
    nameHe: 'שמורת הר חרמון',
    category: 'nature',
    region: 'north',
    description: 'Israel\'s highest peak (2,814m), with alpine meadows, rare flora, and Israel\'s only ski resort.',
    coordinates: { lat: 33.4170, lng: 35.8593 },
    externalUrl: 'https://www.parks.org.il/reserve-park/mount-hermon-reserve/'
  },
  {
    name: 'Hula Nature Reserve',
    nameHe: 'שמורת עמק החולה',
    category: 'nature',
    region: 'north',
    description: 'Restored wetland nature reserve in the Jordan Valley — a key stop on the bird migration route between Africa and Europe.',
    coordinates: { lat: 33.0886, lng: 35.6108 },
    externalUrl: 'https://www.hulalake.com/'
  },
  {
    name: 'En Afek Nature Reserve',
    nameHe: 'שמורת עין אפק',
    category: 'nature',
    region: 'north',
    description: 'Ancient flour mill complex beside a natural spring and stream, surrounded by lush riverside vegetation.',
    coordinates: { lat: 32.8811, lng: 35.1286 },
    externalUrl: 'https://www.parks.org.il/reserve-park/en-afek-nature-reserve/'
  },

  // ─── HISTORICAL SITES ──────────────────────────────────────────────────────
  {
    name: 'Caesarea National Park',
    nameHe: 'קיסריה',
    category: 'historical',
    region: 'center',
    description: 'Ancient Roman harbor city built by Herod, with an amphitheater, hippodrome, and Crusader fortifications on the Mediterranean.',
    coordinates: { lat: 32.5004, lng: 34.8892 },
    externalUrl: 'https://www.parks.org.il/reserve-park/caesarea-national-park/'
  },
  {
    name: 'Megiddo National Park',
    nameHe: 'תל מגידו',
    category: 'historical',
    region: 'north',
    description: 'Tell containing 26 layers of ancient civilizations. UNESCO World Heritage Site and the biblical Armageddon.',
    coordinates: { lat: 32.5842, lng: 35.1848 },
    externalUrl: 'https://www.parks.org.il/reserve-park/megiddo-national-park/'
  },
  {
    name: 'Beit She\'an National Park',
    nameHe: 'בית שאן',
    category: 'historical',
    region: 'north',
    description: 'Remarkably preserved Roman-Byzantine city with a colonnaded street, bathhouse, and impressive theater.',
    coordinates: { lat: 32.4983, lng: 35.4997 },
    externalUrl: 'https://www.parks.org.il/reserve-park/beit-shean-national-park/'
  },
  {
    name: 'Akko (Acre) Old City',
    nameHe: 'עכו העתיקה',
    category: 'historical',
    region: 'north',
    description: 'UNESCO-listed Crusader city with underground halls, a caravanserai, Ottoman hammam, and the largest Crusader dining hall in the world.',
    coordinates: { lat: 32.9236, lng: 35.0722 },
    externalUrl: 'https://www.parks.org.il/reserve-park/akko-old-city/'
  },
  {
    name: 'Tel Be\'er Sheva',
    nameHe: 'תל באר שבע',
    category: 'historical',
    region: 'south',
    description: 'UNESCO World Heritage Site — the biblical city of Abraham\'s well, with excavated Iron Age city remains and a remarkable water system.',
    coordinates: { lat: 31.2395, lng: 34.8481 },
    externalUrl: 'https://www.parks.org.il/reserve-park/tel-beer-sheva-national-park/'
  },
  {
    name: 'Nimrod Fortress',
    nameHe: 'מצודת נמרוד',
    category: 'historical',
    region: 'north',
    description: 'Massive Crusader-era castle perched on a ridge in the Golan Heights with commanding views of the Hermon and Hula Valley.',
    coordinates: { lat: 33.2476, lng: 35.7105 },
    externalUrl: 'https://www.parks.org.il/reserve-park/nimrod-fortress-national-park/'
  },
  {
    name: 'Avdat National Park',
    nameHe: 'עבדת',
    category: 'historical',
    region: 'south',
    description: 'UNESCO-listed Nabataean and Byzantine city in the Negev Highlands, with well-preserved churches, towers, and wine press.',
    coordinates: { lat: 30.7942, lng: 34.7733 },
    externalUrl: 'https://www.parks.org.il/reserve-park/avdat-national-park/'
  },
  {
    name: 'Shivta National Park',
    nameHe: 'שיבטה',
    category: 'historical',
    region: 'south',
    description: 'UNESCO-listed Nabataean city in the Negev desert, with three well-preserved Byzantine churches and ancient agricultural terraces.',
    coordinates: { lat: 30.8831, lng: 34.6299 },
    externalUrl: 'https://www.parks.org.il/reserve-park/shivta-national-park/'
  },
  {
    name: 'Belvoir Fortress',
    nameHe: 'כוכב הירדן',
    category: 'historical',
    region: 'north',
    description: 'Best-preserved Crusader castle in Israel, positioned 500m above the Jordan Valley with panoramic views to the Golan.',
    coordinates: { lat: 32.5941, lng: 35.4937 },
    externalUrl: 'https://www.parks.org.il/reserve-park/belvoir-national-park/'
  },
  {
    name: 'Beit She\'arim National Park',
    nameHe: 'בית שערים',
    category: 'historical',
    region: 'north',
    description: 'UNESCO-listed ancient Jewish necropolis with vast catacombs and sarcophagi, a major center of Jewish culture in the 2nd–4th centuries.',
    coordinates: { lat: 32.7021, lng: 35.1318 },
    externalUrl: 'https://www.parks.org.il/reserve-park/beit-shearim-national-park/'
  },
  {
    name: 'Masada Snake Path',
    nameHe: 'שביל הנחש',
    category: 'historical',
    region: 'south',
    description: 'The ancient winding path ascending the eastern face of Masada, still hikeable today as in the Roman siege era.',
    coordinates: { lat: 31.3118, lng: 35.3636 },
    externalUrl: 'https://www.parks.org.il/reserve-park/masada-national-park/'
  },
  {
    name: 'Old City of Jerusalem',
    nameHe: 'העיר העתיקה ירושלים',
    category: 'historical',
    region: 'jerusalem',
    description: 'UNESCO-listed walled city containing Judaism\'s holiest site, Christianity\'s Church of the Holy Sepulchre, and Islam\'s Dome of the Rock.',
    coordinates: { lat: 31.7767, lng: 35.2345 },
    externalUrl: 'https://www.parks.org.il/'
  },
  {
    name: 'Herodium National Park',
    nameHe: 'הרודיון',
    category: 'historical',
    region: 'jerusalem',
    description: 'Herod\'s palace-fortress built inside a volcano-shaped artificial hill, containing his recently discovered tomb.',
    coordinates: { lat: 31.6663, lng: 35.2437 },
    externalUrl: 'https://www.parks.org.il/reserve-park/herodium-national-park/'
  },

  // ─── HIKING TRAILS ─────────────────────────────────────────────────────────
  {
    name: 'Makhtesh Ramon (Ramon Crater)',
    nameHe: 'מכתש רמון',
    category: 'trail',
    region: 'south',
    description: 'The world\'s largest erosion crater — 40km long, 2–10km wide. Center of hiking and desert exploration in the Negev.',
    coordinates: { lat: 30.5651, lng: 34.8037 },
    difficulty: 'moderate',
    externalUrl: 'https://www.parks.org.il/reserve-park/ramon-crater-nature-reserve/'
  },
  {
    name: 'Mount Arbel',
    nameHe: 'הר ארבל',
    category: 'trail',
    region: 'north',
    description: 'Dramatic cliffs above the Sea of Galilee with ancient cave fortifications. The classic via ferrata descent offers stunning views.',
    coordinates: { lat: 32.8066, lng: 35.5027 },
    difficulty: 'moderate',
    externalUrl: 'https://www.parks.org.il/reserve-park/arbel-national-park/'
  },
  {
    name: 'Nahal Amud',
    nameHe: 'נחל עמוד',
    category: 'trail',
    region: 'north',
    description: 'Scenic stream canyon running from the Galilee hills to the Sea of Galilee, with prehistoric cave sites along the route.',
    coordinates: { lat: 32.8831, lng: 35.5317 },
    difficulty: 'moderate',
    externalUrl: 'https://www.parks.org.il/reserve-park/nahal-amud-nature-reserve/'
  },
  {
    name: 'Israel National Trail — Galilee Section',
    nameHe: 'שביל ישראל — גליל',
    category: 'trail',
    region: 'north',
    description: 'Northern section of the 1,100km Israel National Trail, crossing the Galilee highlands, valleys, and the Sea of Galilee shores.',
    coordinates: { lat: 33.0161, lng: 35.4961 },
    difficulty: 'hard',
    externalUrl: 'https://www.israeltrail.net/'
  },
  {
    name: 'Israel National Trail — Negev Section',
    nameHe: 'שביל ישראל — נגב',
    category: 'trail',
    region: 'south',
    description: 'Dramatic southern section of the Israel National Trail crossing the Negev highlands, makhteshim, and desert landscapes.',
    coordinates: { lat: 30.8500, lng: 34.7500 },
    difficulty: 'hard',
    externalUrl: 'https://www.israeltrail.net/'
  },
  {
    name: 'Nahal Yehudia',
    nameHe: 'נחל יהודיה',
    category: 'trail',
    region: 'north',
    description: 'Popular Golan trail with refreshing natural pools and waterfalls. The black trail includes a challenging rappel down a waterfall.',
    coordinates: { lat: 32.9256, lng: 35.7372 },
    difficulty: 'moderate',
    externalUrl: 'https://www.parks.org.il/reserve-park/yehudiyya-forest-nature-reserve/'
  },
  {
    name: 'Wadi Qelt (Nahal Prat)',
    nameHe: 'נחל פרת',
    category: 'trail',
    region: 'jerusalem',
    description: 'Spectacular desert canyon from Jerusalem to Jericho, passing St. George\'s Monastery clinging to the cliff face.',
    coordinates: { lat: 31.8341, lng: 35.3747 },
    difficulty: 'moderate',
    externalUrl: 'https://www.parks.org.il/reserve-park/nahal-prat-nature-reserve/'
  },
  {
    name: 'Mount Meron',
    nameHe: 'הר מירון',
    category: 'trail',
    region: 'north',
    description: 'Israel\'s highest peak in the Galilee (1,208m), with oak and laurel forests and the tomb of Rabbi Shimon Bar Yochai.',
    coordinates: { lat: 32.9820, lng: 35.4116 },
    difficulty: 'easy',
    externalUrl: 'https://www.parks.org.il/reserve-park/meron-reserve/'
  },
  {
    name: 'Masada Night Hike',
    nameHe: 'טיול לילה למצדה',
    category: 'trail',
    region: 'south',
    description: 'Pre-dawn hike up Masada\'s snake path to watch sunrise over the Dead Sea — one of Israel\'s iconic experiences.',
    coordinates: { lat: 31.3157, lng: 35.3535 },
    difficulty: 'moderate',
    externalUrl: 'https://www.parks.org.il/reserve-park/masada-national-park/'
  },

  // ─── BEACHES ───────────────────────────────────────────────────────────────
  {
    name: 'Gordon Beach, Tel Aviv',
    nameHe: 'חוף גורדון',
    category: 'beach',
    region: 'center',
    description: 'Central Tel Aviv beach lined with cafes and beach volleyball courts, busy and vibrant year-round.',
    coordinates: { lat: 32.0809, lng: 34.7657 },
    externalUrl: ''
  },
  {
    name: 'Frishman Beach, Tel Aviv',
    nameHe: 'חוף פרישמן',
    category: 'beach',
    region: 'center',
    description: 'Popular central Tel Aviv beach next to the Ben Gurion statue, with calm waters and a lively promenade.',
    coordinates: { lat: 32.0780, lng: 34.7648 },
    externalUrl: ''
  },
  {
    name: 'Hilton Beach, Tel Aviv',
    nameHe: 'חוף הילטון',
    category: 'beach',
    region: 'center',
    description: 'North Tel Aviv beach renowned as a gay-friendly space and dog beach. Has a skate park and is popular with surfers.',
    coordinates: { lat: 32.0885, lng: 34.7668 },
    externalUrl: ''
  },
  {
    name: 'Dor Habonim Beach',
    nameHe: 'חוף דור הבונים',
    category: 'beach',
    region: 'north',
    description: 'Beautiful nature beach north of Caesarea with lagoons, ruins, and quiet coves ideal for snorkeling.',
    coordinates: { lat: 32.6124, lng: 34.9212 },
    externalUrl: 'https://www.parks.org.il/reserve-park/dor-habonim-beach-nature-reserve/'
  },
  {
    name: 'Coral Beach Nature Reserve, Eilat',
    nameHe: 'שמורת חוף האלמוגים',
    category: 'beach',
    region: 'eilat',
    description: 'Israel\'s only coral reef, in the Red Sea. World-class snorkeling and diving with tropical fish and vibrant corals.',
    coordinates: { lat: 29.5073, lng: 34.9176 },
    externalUrl: 'https://www.parks.org.il/reserve-park/coral-beach-nature-reserve/'
  },
  {
    name: 'Caesarea Beach',
    nameHe: 'חוף קיסריה',
    category: 'beach',
    region: 'center',
    description: 'Sandy beach with the backdrop of the ancient Roman harbor and aqueduct ruins — swimming next to history.',
    coordinates: { lat: 32.4985, lng: 34.8906 },
    externalUrl: ''
  },
  {
    name: 'Achziv Beach',
    nameHe: 'חוף אכזיב',
    category: 'beach',
    region: 'north',
    description: 'Long sandy beach north of Nahariya with calm, clear Mediterranean waters and the ruins of the ancient port city.',
    coordinates: { lat: 33.0452, lng: 35.0960 },
    externalUrl: ''
  },
  {
    name: 'Palmahim Beach',
    nameHe: 'חוף פלמחים',
    category: 'beach',
    region: 'center',
    description: 'Quiet natural beach south of Tel Aviv with sand dunes, an ancient Philistine harbor, and a nature reserve.',
    coordinates: { lat: 31.9317, lng: 34.6976 },
    externalUrl: 'https://www.parks.org.il/reserve-park/palmahim-beach-national-park/'
  },

  // ─── CITIES & NEIGHBORHOODS ─────────────────────────────────────────────────
  {
    name: 'Jaffa (Old Jaffa)',
    nameHe: 'יפו העתיקה',
    category: 'city',
    region: 'center',
    description: 'Ancient port city absorbed into Tel Aviv, with a renovated artists\' quarter, flea market, and views of the Tel Aviv skyline.',
    coordinates: { lat: 32.0524, lng: 34.7521 },
    externalUrl: ''
  },
  {
    name: 'Neve Tzedek, Tel Aviv',
    nameHe: 'נווה צדק',
    category: 'city',
    region: 'center',
    description: 'Tel Aviv\'s first neighborhood, now a charming district of restored Ottoman-era houses, boutique shops, and galleries.',
    coordinates: { lat: 32.0614, lng: 34.7612 },
    externalUrl: ''
  },
  {
    name: 'Safed (Tzfat) Old City',
    nameHe: 'צפת העתיקה',
    category: 'city',
    region: 'north',
    description: 'Hilltop city and center of Kabbalah mysticism, with blue-painted alleyways, ancient synagogues, and an artists\' colony.',
    coordinates: { lat: 32.9647, lng: 35.4966 },
    externalUrl: ''
  },
  {
    name: 'Haifa Baha\'i Gardens',
    nameHe: 'גנות הבהאי חיפה',
    category: 'city',
    region: 'north',
    description: 'UNESCO-listed terraced gardens ascending Mount Carmel, surrounding the golden-domed Shrine of the Bab. Breathtaking symmetry.',
    coordinates: { lat: 32.8147, lng: 34.9886 },
    externalUrl: 'https://www.ganbahai.org.il/'
  },
  {
    name: 'Jerusalem — Jewish Quarter',
    nameHe: 'הרובע היהודי',
    category: 'city',
    region: 'jerusalem',
    description: 'Rebuilt after 1967, the Jewish Quarter hosts the Western Wall plaza, the Cardo Roman street, and the Hurva Synagogue.',
    coordinates: { lat: 31.7748, lng: 35.2297 },
    externalUrl: ''
  },
  {
    name: 'Jerusalem — Muslim Quarter',
    nameHe: 'הרובע המוסלמי',
    category: 'city',
    region: 'jerusalem',
    description: 'Largest and most populous quarter of the Old City, with the Via Dolorosa, vibrant souks, and the Temple Mount.',
    coordinates: { lat: 31.7806, lng: 35.2338 },
    externalUrl: ''
  },
  {
    name: 'Jerusalem — Christian Quarter',
    nameHe: 'הרובע הנוצרי',
    category: 'city',
    region: 'jerusalem',
    description: 'Home to the Church of the Holy Sepulchre and pilgrim hostels, with centuries of Christian presence in the Old City.',
    coordinates: { lat: 31.7783, lng: 35.2282 },
    externalUrl: ''
  },
  {
    name: 'Florentin, Tel Aviv',
    nameHe: 'פלורנטין',
    category: 'city',
    region: 'center',
    description: 'Tel Aviv\'s edgy bohemian neighborhood with street art, independent bars, vintage shops, and a thriving nightlife scene.',
    coordinates: { lat: 32.0589, lng: 34.7680 },
    externalUrl: ''
  },
  {
    name: 'Nachalat Binyamin',
    nameHe: 'נחלת בנימין',
    category: 'city',
    region: 'center',
    description: 'Eclectic pedestrian street in central Tel Aviv with a twice-weekly arts and crafts fair and Bauhaus architecture.',
    coordinates: { lat: 32.0680, lng: 34.7714 },
    externalUrl: ''
  },
  {
    name: 'Mahane Yehuda Market, Jerusalem',
    nameHe: 'שוק מחנה יהודה',
    category: 'city',
    region: 'jerusalem',
    description: 'Jerusalem\'s famous open-air market selling fresh produce, baked goods, spices, and local street food. Transforms to a bar district at night.',
    coordinates: { lat: 31.7843, lng: 35.2094 },
    externalUrl: ''
  },
  {
    name: 'Rosh Pinna',
    nameHe: 'ראש פינה',
    category: 'city',
    region: 'north',
    description: 'One of Israel\'s first modern Jewish settlements (1882), now a charming hilltop village with stone houses, galleries, and mountain views.',
    coordinates: { lat: 32.9749, lng: 35.5444 },
    externalUrl: ''
  },
  {
    name: 'Zichron Ya\'akov',
    nameHe: 'זכרון יעקב',
    category: 'city',
    region: 'north',
    description: 'Founded by Baron Rothschild in 1882, this wine town on Mount Carmel has a beautiful restored pedestrian street and wineries.',
    coordinates: { lat: 32.5695, lng: 34.9518 },
    externalUrl: ''
  },
  {
    name: 'Eilat City Center',
    nameHe: 'אילת',
    category: 'city',
    region: 'eilat',
    description: 'Israel\'s southernmost city on the Red Sea, a resort town with diving, water sports, duty-free shopping, and year-round sun.',
    coordinates: { lat: 29.5581, lng: 34.9482 },
    externalUrl: ''
  },
  {
    name: 'Tel Aviv — White City (Bauhaus)',
    nameHe: 'העיר הלבנה',
    category: 'city',
    region: 'center',
    description: 'UNESCO-listed concentration of International Style (Bauhaus) architecture, with over 4,000 buildings from the 1930s–50s.',
    coordinates: { lat: 32.0795, lng: 34.7800 },
    externalUrl: ''
  },
  {
    name: 'Nazareth Old City',
    nameHe: 'נצרת העתיקה',
    category: 'city',
    region: 'north',
    description: 'The city of Jesus\' childhood, with the Basilica of the Annunciation, a vibrant Arab market, and a rich mix of Christian and Muslim holy sites.',
    coordinates: { lat: 32.7028, lng: 35.2983 },
    externalUrl: ''
  }
];

module.exports = places;
