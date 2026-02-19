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
  // ─── ISRAEL NATIONAL TRAIL (שביל ישראל) — all 46 sections ──────────────────
  {
    name: 'Israel Trail – Seg. 1 (New): Hermon to Banias',
    nameHe: 'שביל ישראל מקטע 1 חדש: חרמון – בניאס',
    category: 'trail', region: 'north', difficulty: 'hard',
    description: 'New opening section descending from the Hermon ski resort through Alpine meadows and forests to the Banias springs.',
    coordinates: { lat: 33.350, lng: 35.780 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-1-החדש-חרמון-בניאס/'
  },
  {
    name: 'Israel Trail – Seg. 2 (New): Banias to Tel Hai',
    nameHe: 'שביל ישראל מקטע 2 חדש: בניאס – תל חי',
    category: 'trail', region: 'north', difficulty: 'moderate',
    description: 'From the lush Banias springs through the Golan foothills and Hula Valley rim to the historic Tel Hai farm.',
    coordinates: { lat: 33.275, lng: 35.620 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-2-החדש-בניאס-תל-חי/'
  },
  {
    name: 'Israel Trail – Seg. 2: Tel Hai to Metzudat Yosef',
    nameHe: 'שביל ישראל מקטע 2: תל-חי – מצודת ישע',
    category: 'trail', region: 'north', difficulty: 'moderate',
    description: 'Through the Upper Galilee Panhandle from the Tel Hai memorial to the Crusader-era Metzudat Yosef fortress ruins.',
    coordinates: { lat: 33.200, lng: 35.540 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-2/'
  },
  {
    name: 'Israel Trail – Seg. 3: Nabi Yusha to Nahal Dishon',
    nameHe: 'שביל ישראל מקטע 3: נבי יושע – נחל דישון',
    category: 'trail', region: 'north', difficulty: 'moderate',
    description: 'From the Ottoman-era Nabi Yusha police fort through Galilee ridges and forests down into the Dishon stream valley.',
    coordinates: { lat: 33.120, lng: 35.520 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-3/'
  },
  {
    name: 'Israel Trail – Seg. 4: Nahal Dishon to Mt. Meron',
    nameHe: 'שביל ישראל מקטע 4: נחל דישון – הר מירון',
    category: 'trail', region: 'north', difficulty: 'hard',
    description: 'Ascending from the Dishon gorge through oak forests and Galilee villages up to the summit area of Mt. Meron.',
    coordinates: { lat: 33.010, lng: 35.440 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-4/'
  },
  {
    name: 'Israel Trail – Seg. 5: Mt. Meron to Nahal Meron',
    nameHe: 'שביל ישראל מקטע 5: הר מירון – נחל מירון',
    category: 'trail', region: 'north', difficulty: 'moderate',
    description: 'Descending from Israel\'s highest Galilee peak through ancient Safed-area forests and the Meron stream canyon.',
    coordinates: { lat: 32.975, lng: 35.430 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-5/'
  },
  {
    name: 'Israel Trail – Seg. 6: Nahal Amud',
    nameHe: 'שביל ישראל מקטע 6: נחל עמוד',
    category: 'trail', region: 'north', difficulty: 'moderate',
    description: 'The classic Nahal Amud canyon route through prehistoric cave sites and lush riverside vegetation.',
    coordinates: { lat: 32.890, lng: 35.530 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-6/'
  },
  {
    name: 'Israel Trail – Seg. 7: Lower Amud to Upper Tiberias',
    nameHe: 'שביל ישראל מקטע 7: נחל עמוד תחתון – טבריה עילית',
    category: 'trail', region: 'north', difficulty: 'moderate',
    description: 'The lower reaches of Nahal Amud descending to the Sea of Galilee shoreline and up into upper Tiberias.',
    coordinates: { lat: 32.845, lng: 35.515 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-7/'
  },
  {
    name: 'Israel Trail – Seg. 8: Tiberias to Yardenit',
    nameHe: 'שביל ישראל מקטע 8: טבריה – ירדנית',
    category: 'trail', region: 'north', difficulty: 'easy',
    description: 'Along the western shore of the Sea of Galilee south from Tiberias to the Jordan River baptism site at Yardenit.',
    coordinates: { lat: 32.720, lng: 35.550 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-8/'
  },
  {
    name: 'Israel Trail – Seg. 9: Jordan River to Mt. Tabor',
    nameHe: 'שביל ישראל מקטע 9: הירדן – תבור',
    category: 'trail', region: 'north', difficulty: 'moderate',
    description: 'From the Jordan Valley floor climbing through the Galilee hills to the prominent dome of Mt. Tabor.',
    coordinates: { lat: 32.680, lng: 35.385 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-9/'
  },
  {
    name: 'Israel Trail – Seg. 10: Mt. Tabor to Mashad',
    nameHe: 'שביל ישראל מקטע 10: התבור – משהד',
    category: 'trail', region: 'north', difficulty: 'moderate',
    description: 'From the summit of the biblical Tabor descending westward through the lower Galilee to the Arab village of Mashad.',
    coordinates: { lat: 32.680, lng: 35.300 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-10/'
  },
  {
    name: 'Israel Trail – Seg. 11: Mashad through Zippori to Yiftahel',
    nameHe: 'שביל ישראל מקטע 11: משהד – ציפורי – יפתחאל',
    category: 'trail', region: 'north', difficulty: 'easy',
    description: 'Across the Bet Netofa Valley floor and through the ancient Zippori (Sepphoris) Roman city ruins.',
    coordinates: { lat: 32.715, lng: 35.210 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-11/'
  },
  {
    name: 'Israel Trail – Seg. 12: Yiftahel Junction to Kibbutz Yagur',
    nameHe: 'שביל ישראל מקטע 12: יפתחאל – קיבוץ יגור',
    category: 'trail', region: 'north', difficulty: 'easy',
    description: 'Through the western Jezreel Valley to the Carmel foothills, approaching Haifa from the east.',
    coordinates: { lat: 32.720, lng: 35.095 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-12/'
  },
  {
    name: 'Israel Trail – Seg. 13: Kibbutz Yagur to Oren Junction',
    nameHe: 'שביל ישראל מקטע 13: קיבוץ יגור – צומת אורן',
    category: 'trail', region: 'north', difficulty: 'moderate',
    description: 'Up the Carmel ridge through forests above Haifa with sea views, reaching the Oren junction on the spine of the Carmel.',
    coordinates: { lat: 32.710, lng: 35.030 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-13/'
  },
  {
    name: 'Israel Trail – Seg. 14: Ma\'arat Etzba to Har Horshin',
    nameHe: 'שביל ישראל מקטע 14: מערת אצבע – הר חורשן',
    category: 'trail', region: 'center', difficulty: 'moderate',
    description: 'Along the southern Carmel ridge through Mediterranean scrub and prehistoric cave sites south of Haifa.',
    coordinates: { lat: 32.620, lng: 34.990 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-14/'
  },
  {
    name: 'Israel Trail – Seg. 15: Har Horshin to Jisr az-Zarqa',
    nameHe: 'שביל ישראל מקטע 15: הר חורשן – ג\'סר א-זרקא',
    category: 'trail', region: 'center', difficulty: 'easy',
    description: 'Descending from the Carmel heights to the coastal plain and through the Arab fishing village of Jisr az-Zarqa.',
    coordinates: { lat: 32.530, lng: 34.910 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-15/'
  },
  {
    name: 'Israel Trail – Seg. 16: Jisr az-Zarqa to Hadera',
    nameHe: 'שביל ישראל מקטע 16: ג\'סר א-זרקא – חדרה',
    category: 'trail', region: 'center', difficulty: 'easy',
    description: 'Coastal plain walking through the Sharon Nature Reserve wetlands to the Hadera train station.',
    coordinates: { lat: 32.455, lng: 34.880 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-16/'
  },
  {
    name: 'Israel Trail – Seg. 17: Hadera to Green Beach',
    nameHe: 'שביל ישראל מקטע 17: חדרה – החוף הירוק',
    category: 'trail', region: 'center', difficulty: 'easy',
    description: 'Along the Mediterranean coast through Netanya and the Sharon plain to the Green Beach national park area.',
    coordinates: { lat: 32.310, lng: 34.855 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-17/'
  },
  {
    name: 'Israel Trail – Seg. 18: Green Beach to Tel Aviv',
    nameHe: 'שביל ישראל מקטע 18: החוף הירוק – תל-אביב',
    category: 'trail', region: 'center', difficulty: 'easy',
    description: 'Coastal promenade walking from the Yarkon mouth south along Tel Aviv\'s famous beachfront.',
    coordinates: { lat: 32.150, lng: 34.820 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-18/'
  },
  {
    name: 'Israel Trail – Seg. 19: Tel Aviv to Yarkon Springs',
    nameHe: 'שביל ישראל מקטע 19: תל-אביב – מקורות הירקון',
    category: 'trail', region: 'center', difficulty: 'easy',
    description: 'Following the Yarkon River east from Tel Aviv through parks and nature reserves to the river\'s source at Rosh HaAyin.',
    coordinates: { lat: 32.095, lng: 34.885 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-19/'
  },
  {
    name: 'Israel Trail – Seg. 20: Yarkon Springs to Modi\'im Lookout',
    nameHe: 'שביל ישראל מקטע 20: מקורות הירקון – מצפה מודיעים',
    category: 'trail', region: 'center', difficulty: 'moderate',
    description: 'Climbing from the coastal plain into the Ayalon Valley foothills toward the Hasmonean heartland of Modi\'in.',
    coordinates: { lat: 31.970, lng: 34.965 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-20/'
  },
  {
    name: 'Israel Trail – Seg. 21: Modi\'im Lookout to Latrun',
    nameHe: 'שביל ישראל מקטע 21: מצפה מודיעים – לטרון',
    category: 'trail', region: 'center', difficulty: 'moderate',
    description: 'Through the Ayalon Valley and Shephelah foothills to the historic Latrun crossroads with its Trappist monastery.',
    coordinates: { lat: 31.855, lng: 34.990 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-21/'
  },
  {
    name: 'Israel Trail – Seg. 22: Latrun to Sha\'ar HaGai',
    nameHe: 'שביל ישראל מקטע 22: לטרון – שער הגיא',
    category: 'trail', region: 'jerusalem', difficulty: 'moderate',
    description: 'Following the ancient Jerusalem road through the Aijalon Valley, passing 1948 war-era armored vehicles at Sha\'ar HaGai.',
    coordinates: { lat: 31.820, lng: 35.040 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-22/'
  },
  {
    name: 'Israel Trail – Seg. 23: Sha\'ar HaGai to Kibbutz Tzova',
    nameHe: 'שביל ישראל מקטע 23: שער הגיא – קיבוץ צובה',
    category: 'trail', region: 'jerusalem', difficulty: 'moderate',
    description: 'Ascending the Jerusalem Corridor through terraced hillsides, olive groves, and abandoned Arab villages to Kibbutz Tzova.',
    coordinates: { lat: 31.790, lng: 35.090 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-23/'
  },
  {
    name: 'Israel Trail – Seg. 24: Tzova through Sataf to Horvat Hanut',
    nameHe: 'שביל ישראל מקטע 24: צובה – סטף – חורבת חנות',
    category: 'trail', region: 'jerusalem', difficulty: 'moderate',
    description: 'Through the Jerusalem hills past the ancient Sataf terraced springs and gardens, a working reconstruction of ancient agriculture.',
    coordinates: { lat: 31.745, lng: 35.055 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-24/'
  },
  {
    name: 'Israel Trail – Seg. 25: Horvat Hanut to Mitzpe Mashua',
    nameHe: 'שביל ישראל מקטע 25: חורבת חנות – מצפה משואה',
    category: 'trail', region: 'center', difficulty: 'moderate',
    description: 'Through the Judean hills transitioning from the Jerusalem hinterland into the Elah Valley and Shephelah region.',
    coordinates: { lat: 31.675, lng: 34.965 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-25/'
  },
  {
    name: 'Israel Trail – Seg. 26: Mitzpe Mashua to Beit Guvrin',
    nameHe: 'שביל ישראל מקטע 26: מצפה משואה – בית גוברין',
    category: 'trail', region: 'center', difficulty: 'easy',
    description: 'Across the Shephelah lowlands to Beit Guvrin, famous for its thousands of hand-carved bell caves.',
    coordinates: { lat: 31.605, lng: 34.905 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-26/'
  },
  {
    name: 'Israel Trail – Seg. 27: Beit Guvrin to Tel Keshet',
    nameHe: 'שביל ישראל מקטע 27: בית גוברין – תל קשת',
    category: 'trail', region: 'center', difficulty: 'easy',
    description: 'Through the southern Shephelah, crossing biblical-era landscape with ancient tel sites and olive groves.',
    coordinates: { lat: 31.555, lng: 34.865 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-27/'
  },
  {
    name: 'Israel Trail – Seg. 28: Tel Keshet to Dvir Junction',
    nameHe: 'שביל ישראל מקטע 28: תל קשת – צומת דביר',
    category: 'trail', region: 'south', difficulty: 'easy',
    description: 'Into the northern Negev highlands along riverbeds and agricultural fields on the edge of the desert.',
    coordinates: { lat: 31.450, lng: 34.860 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-28/'
  },
  {
    name: 'Israel Trail – Seg. 29: Dvir Junction to Shoket Junction',
    nameHe: 'שביל ישראל מקטע 29: צומת דביר – צומת שוקת',
    category: 'trail', region: 'south', difficulty: 'easy',
    description: 'Crossing the northern Negev plains and streambeds where the Judean foothills give way to open semi-arid terrain.',
    coordinates: { lat: 31.330, lng: 34.820 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-29/'
  },
  {
    name: 'Israel Trail – Seg. 30: Carmim to Har Amasa',
    nameHe: 'שביל ישראל מקטע 30: כרמים – הר עמשא',
    category: 'trail', region: 'south', difficulty: 'moderate',
    description: 'Into the Judean Desert foothills climbing to Har Amasa, a prominent ridge with sweeping Negev and Dead Sea views.',
    coordinates: { lat: 31.265, lng: 35.005 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-30/'
  },
  {
    name: 'Israel Trail – Seg. 31: Har Amasa to Arad Park',
    nameHe: 'שביל ישראל מקטע 31: הר עמשא – פארק ערד',
    category: 'trail', region: 'south', difficulty: 'moderate',
    description: 'From the Har Amasa heights descending toward the northern edge of the Judean Desert near the ancient city of Arad.',
    coordinates: { lat: 31.220, lng: 35.125 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-31/'
  },
  {
    name: 'Israel Trail – Seg. 32: Dead Sea & Judean Desert',
    nameHe: 'שביל ישראל מקטע 32: ים המלח ומדבר יהודה',
    category: 'trail', region: 'south', difficulty: 'hard',
    description: 'The most extreme section — a multi-day traverse along the Dead Sea shore and through the barren Judean Desert canyons.',
    coordinates: { lat: 31.200, lng: 35.380 },
    externalUrl: 'https://shvilist.com/קטע-32-ים-המלח/'
  },
  {
    name: 'Israel Trail – Seg. 33: Metzad Tamar to Makhtesh HaGadol',
    nameHe: 'שביל ישראל מקטע 33: מצד תמר – המכתש הגדול',
    category: 'trail', region: 'south', difficulty: 'hard',
    description: 'A spectacular desert crossing from the Roman fort of Metzad Tamar to the rim of Makhtesh HaGadol (the Large Crater).',
    coordinates: { lat: 30.935, lng: 35.145 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-33/'
  },
  {
    name: 'Israel Trail – Seg. 34: Makhtesh HaGadol to Ma\'ale Zin',
    nameHe: 'שביל ישראל מקטע 34: המכתש הגדול – מעלה צין',
    category: 'trail', region: 'south', difficulty: 'hard',
    description: 'Through the dramatic interior of Makhtesh HaGadol and across the central Negev plateau to the Zin Valley escarpment.',
    coordinates: { lat: 30.850, lng: 34.965 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-34/'
  },
  {
    name: 'Israel Trail – Seg. 35: Ma\'ale Zin to Ein Shaviiv',
    nameHe: 'שביל ישראל מקטע 35: מעלה צין – עין שביב',
    category: 'trail', region: 'south', difficulty: 'hard',
    description: 'Through the Nahal Zin canyon and high Negev plateau, approaching the Ramon Crater from the north.',
    coordinates: { lat: 30.760, lng: 34.905 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-35/'
  },
  {
    name: 'Israel Trail – Seg. 36: Ein Shaviiv to Mitzpe Ramon',
    nameHe: 'שביל ישראל מקטע 36: עין שביב – מצפה רמון',
    category: 'trail', region: 'south', difficulty: 'moderate',
    description: 'Arriving at the rim of Makhtesh Ramon — the world\'s largest erosion crater — and the town of Mitzpe Ramon.',
    coordinates: { lat: 30.680, lng: 34.870 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-36/'
  },
  {
    name: 'Israel Trail – Seg. 37: Mitzpe Ramon through the Crater',
    nameHe: 'שביל ישראל מקטע 37: מצפה רמון – הר סהרונים',
    category: 'trail', region: 'south', difficulty: 'hard',
    description: 'The most iconic section — descending into and traversing Makhtesh Ramon, a 40km erosion crater with otherworldly geology.',
    coordinates: { lat: 30.540, lng: 34.825 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-37/'
  },
  {
    name: 'Israel Trail – Seg. 38: Har Saharonim to the Arava',
    nameHe: 'שביל ישראל מקטע 38: הר סהרונים – הערבה',
    category: 'trail', region: 'south', difficulty: 'hard',
    description: 'Exiting Makhtesh Ramon southward and descending from the Negev Highlands to the flat Arava Rift Valley floor.',
    coordinates: { lat: 30.350, lng: 34.895 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-38/'
  },
  {
    name: 'Israel Trail – Seg. 39: Sapir to Shizafon',
    nameHe: 'שביל ישראל מקטע 39: ספיר – שיזפון',
    category: 'trail', region: 'south', difficulty: 'moderate',
    description: 'Along the Arava Valley floor and into the southern Negev highlands through seasonal riverbeds and desert landscapes.',
    coordinates: { lat: 30.185, lng: 35.015 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-39/'
  },
  {
    name: 'Israel Trail – Seg. 40: Shizafon to Timna Park',
    nameHe: 'שביל ישראל מקטע 40: שיזפון – פארק תמנע',
    category: 'trail', region: 'eilat', difficulty: 'moderate',
    description: 'Through the southern Negev into the spectacular red sandstone formations of Timna Valley, site of ancient copper mines.',
    coordinates: { lat: 29.950, lng: 35.005 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-40/'
  },
  {
    name: 'Israel Trail – Seg. 41: Timna Park to Be\'er Ora',
    nameHe: 'שביל ישראל מקטע 41: פארק תמנע – באר אורה',
    category: 'trail', region: 'eilat', difficulty: 'moderate',
    description: 'From the Timna rock formations south through the Arava plain toward the Eilat Mountains.',
    coordinates: { lat: 29.820, lng: 35.020 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-41/'
  },
  {
    name: 'Israel Trail – Seg. 42: Nahal Raham to Shaharon Canyon',
    nameHe: 'שביל ישראל מקטע 42: נחל רחם – קניון שחורת',
    category: 'trail', region: 'eilat', difficulty: 'hard',
    description: 'Into the Eilat Mountains through dramatic black granite canyons and the narrow Shaharon slot canyon.',
    coordinates: { lat: 29.720, lng: 34.975 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-42/'
  },
  {
    name: 'Israel Trail – Seg. 43: Shaharon Canyon to Ein Netafim',
    nameHe: 'שביל ישראל מקטע 43: קניון שחורת – עין נטפים',
    category: 'trail', region: 'eilat', difficulty: 'hard',
    description: 'Through the rugged Eilat Mountains with Red Sea glimpses, past the spring of Ein Netafim — last water source before Eilat.',
    coordinates: { lat: 29.625, lng: 34.940 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-43/'
  },
  {
    name: 'Israel Trail – Seg. 44: Har Yoash to Taba (End)',
    nameHe: 'שביל ישראל מקטע 44: הר יואש – טאבה',
    category: 'trail', region: 'eilat', difficulty: 'hard',
    description: 'The final section — descending Har Yoash to the Red Sea at Taba, completing the 1,100km Israel National Trail.',
    coordinates: { lat: 29.545, lng: 34.920 },
    externalUrl: 'https://shvilist.com/שביל-ישראל-קטע-44/'
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
    category: 'nature',
    region: 'center',
    description: 'Central Tel Aviv beach lined with cafes and beach volleyball courts, busy and vibrant year-round.',
    coordinates: { lat: 32.0809, lng: 34.7657 },
    externalUrl: ''
  },
  {
    name: 'Frishman Beach, Tel Aviv',
    nameHe: 'חוף פרישמן',
    category: 'nature',
    region: 'center',
    description: 'Popular central Tel Aviv beach next to the Ben Gurion statue, with calm waters and a lively promenade.',
    coordinates: { lat: 32.0780, lng: 34.7648 },
    externalUrl: ''
  },
  {
    name: 'Hilton Beach, Tel Aviv',
    nameHe: 'חוף הילטון',
    category: 'nature',
    region: 'center',
    description: 'North Tel Aviv beach renowned as a gay-friendly space and dog beach. Has a skate park and is popular with surfers.',
    coordinates: { lat: 32.0885, lng: 34.7668 },
    externalUrl: ''
  },
  {
    name: 'Dor Habonim Beach',
    nameHe: 'חוף דור הבונים',
    category: 'nature',
    region: 'north',
    description: 'Beautiful nature beach north of Caesarea with lagoons, ruins, and quiet coves ideal for snorkeling.',
    coordinates: { lat: 32.6124, lng: 34.9212 },
    externalUrl: 'https://www.parks.org.il/reserve-park/dor-habonim-beach-nature-reserve/'
  },
  {
    name: 'Coral Beach Nature Reserve, Eilat',
    nameHe: 'שמורת חוף האלמוגים',
    category: 'nature',
    region: 'eilat',
    description: 'Israel\'s only coral reef, in the Red Sea. World-class snorkeling and diving with tropical fish and vibrant corals.',
    coordinates: { lat: 29.5073, lng: 34.9176 },
    externalUrl: 'https://www.parks.org.il/reserve-park/coral-beach-nature-reserve/'
  },
  {
    name: 'Caesarea Beach',
    nameHe: 'חוף קיסריה',
    category: 'nature',
    region: 'center',
    description: 'Sandy beach with the backdrop of the ancient Roman harbor and aqueduct ruins — swimming next to history.',
    coordinates: { lat: 32.4985, lng: 34.8906 },
    externalUrl: ''
  },
  {
    name: 'Achziv Beach',
    nameHe: 'חוף אכזיב',
    category: 'nature',
    region: 'north',
    description: 'Long sandy beach north of Nahariya with calm, clear Mediterranean waters and the ruins of the ancient port city.',
    coordinates: { lat: 33.0452, lng: 35.0960 },
    externalUrl: ''
  },
  {
    name: 'Palmahim Beach',
    nameHe: 'חוף פלמחים',
    category: 'nature',
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
