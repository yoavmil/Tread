const places = [
  // ─── טבע / פארקים לאומיים ──────────────────────────────────────────────────
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

  // ─── חופים ──────────────────────────────────────────────────────────────────
  {
    name: 'חוף גורדון',
    category: 'nature', region: 'center',
    description: '',
    coordinates: { lat: 32.0809, lng: 34.7657 },
    externalUrl: ''
  },
  {
    name: 'חוף פרישמן',
    category: 'nature', region: 'center',
    description: '',
    coordinates: { lat: 32.0780, lng: 34.7648 },
    externalUrl: ''
  },
  {
    name: 'חוף הילטון',
    category: 'nature', region: 'center',
    description: '',
    coordinates: { lat: 32.0885, lng: 34.7668 },
    externalUrl: ''
  },
  {
    name: 'חוף דור הבונים',
    category: 'nature', region: 'north',
    description: '',
    coordinates: { lat: 32.6124, lng: 34.9212 },
    externalUrl: 'https://www.parks.org.il/reserve-park/dor-habonim-beach-nature-reserve/'
  },
  {
    name: 'שמורת חוף האלמוגים',
    category: 'nature', region: 'south',
    description: '',
    coordinates: { lat: 29.5073, lng: 34.9176 },
    externalUrl: 'https://www.parks.org.il/reserve-park/coral-beach-nature-reserve/'
  },
  {
    name: 'חוף קיסריה',
    category: 'nature', region: 'center',
    description: '',
    coordinates: { lat: 32.4985, lng: 34.8906 },
    externalUrl: ''
  },
  {
    name: 'חוף אכזיב',
    category: 'nature', region: 'north',
    description: '',
    coordinates: { lat: 33.0452, lng: 35.0960 },
    externalUrl: ''
  },
  {
    name: 'חוף פלמחים',
    category: 'nature', region: 'center',
    description: '',
    coordinates: { lat: 31.9317, lng: 34.6976 },
    externalUrl: 'https://www.parks.org.il/reserve-park/palmahim-beach-national-park/'
  },

  // ─── היסטוריה ───────────────────────────────────────────────────────────────
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

  // ─── מסלולי טיול ────────────────────────────────────────────────────────────
  {
    name: 'מכתש רמון',
    category: 'trail', region: 'south', difficulty: 'moderate',
    description: '',
    coordinates: { lat: 30.5651, lng: 34.8037 },
    externalUrl: 'https://www.parks.org.il/reserve-park/ramon-crater-nature-reserve/'
  },
  {
    name: 'הר ארבל',
    category: 'trail', region: 'north', difficulty: 'moderate',
    description: '',
    coordinates: { lat: 32.8066, lng: 35.5027 },
    externalUrl: 'https://www.parks.org.il/reserve-park/arbel-national-park/'
  },
  {
    name: 'נחל עמוד',
    category: 'trail', region: 'north', difficulty: 'moderate',
    description: '',
    coordinates: { lat: 32.8831, lng: 35.5317 },
    externalUrl: 'https://www.parks.org.il/reserve-park/nahal-amud-nature-reserve/'
  },
  {
    name: 'נחל יהודיה',
    category: 'trail', region: 'north', difficulty: 'moderate',
    description: '',
    coordinates: { lat: 32.9256, lng: 35.7372 },
    externalUrl: 'https://www.parks.org.il/reserve-park/yehudiyya-forest-nature-reserve/'
  },
  {
    name: 'נחל פרת',
    category: 'trail', region: 'jerusalem', difficulty: 'moderate',
    description: '',
    coordinates: { lat: 31.8341, lng: 35.3747 },
    externalUrl: 'https://www.parks.org.il/reserve-park/nahal-prat-nature-reserve/'
  },
  {
    name: 'הר מירון',
    category: 'trail', region: 'north', difficulty: 'easy',
    description: '',
    coordinates: { lat: 32.9820, lng: 35.4116 },
    externalUrl: 'https://www.parks.org.il/reserve-park/meron-reserve/'
  },
  {
    name: 'טיול לילה למצדה',
    category: 'trail', region: 'south', difficulty: 'moderate',
    description: '',
    coordinates: { lat: 31.3157, lng: 35.3535 },
    externalUrl: 'https://www.parks.org.il/reserve-park/masada-national-park/'
  },

  // ─── שביל ישראל (46 קטעים) ─────────────────────────────────────────────────
  {
    name: 'שביל ישראל מקטע 1 חדש: חרמון – בניאס',
    category: 'trail', region: 'north', difficulty: 'hard',
    description: '',
    coordinates: { lat: 33.28893, lng: 35.76284 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-1'
  },
  {
    name: 'שביל ישראל מקטע 2 חדש: בניאס – תל חי',
    category: 'trail', region: 'north', difficulty: 'moderate',
    description: '',
    coordinates: { lat: 33.23774, lng: 35.57863 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-2'
  },
  {
    name: 'שביל ישראל מקטע 2: תל-חי – מצודת ישע',
    category: 'trail', region: 'north', difficulty: 'moderate',
    description: '',
    coordinates: { lat: 33.20176, lng: 35.55582 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-3'
  },
  {
    name: 'שביל ישראל מקטע 3: נבי יושע – נחל דישון',
    category: 'trail', region: 'north', difficulty: 'moderate',
    description: '',
    coordinates: { lat: 33.11825, lng: 35.55042 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-4'
  },
  {
    name: 'שביל ישראל מקטע 4: נחל דישון – הר מירון',
    category: 'trail', region: 'north', difficulty: 'hard',
    description: '',
    coordinates: { lat: 32.99672, lng: 35.41697 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-5'
  },
  {
    name: 'שביל ישראל מקטע 5: הר מירון – נחל מירון',
    category: 'trail', region: 'north', difficulty: 'moderate',
    description: '',
    coordinates: { lat: 32.97475, lng: 35.42985 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-6'
  },
  {
    name: 'שביל ישראל מקטע 6: נחל עמוד',
    category: 'trail', region: 'north', difficulty: 'moderate',
    description: '',
    coordinates: { lat: 32.88661, lng: 35.50263 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-7'
  },
  {
    name: 'שביל ישראל מקטע 7: נחל עמוד תחתון – טבריה עילית',
    category: 'trail', region: 'north', difficulty: 'moderate',
    description: '',
    coordinates: { lat: 32.84446, lng: 35.51058 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-8'
  },
  {
    name: 'שביל ישראל מקטע 8: טבריה – ירדנית',
    category: 'trail', region: 'north', difficulty: 'easy',
    description: '',
    coordinates: { lat: 32.72760, lng: 35.55692 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-9'
  },
  {
    name: 'שביל ישראל מקטע 9: הירדן – תבור',
    category: 'trail', region: 'north', difficulty: 'moderate',
    description: '',
    coordinates: { lat: 32.68573, lng: 35.38752 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-10'
  },
  {
    name: 'שביל ישראל מקטע 10: התבור – משהד',
    category: 'trail', region: 'north', difficulty: 'moderate',
    description: '',
    coordinates: { lat: 32.70927, lng: 35.33887 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-11'
  },
  {
    name: 'שביל ישראל מקטע 11: משהד – ציפורי – יפתחאל',
    category: 'trail', region: 'north', difficulty: 'easy',
    description: '',
    coordinates: { lat: 32.75757, lng: 35.18922 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-12'
  },
  {
    name: 'שביל ישראל מקטע 12: יפתחאל – קיבוץ יגור',
    category: 'trail', region: 'north', difficulty: 'easy',
    description: '',
    coordinates: { lat: 32.74006, lng: 35.09924 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-13'
  },
  {
    name: 'שביל ישראל מקטע 13: קיבוץ יגור – צומת אורן',
    category: 'trail', region: 'north', difficulty: 'moderate',
    description: '',
    coordinates: { lat: 32.71144, lng: 35.02899 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-14'
  },
  {
    name: 'שביל ישראל מקטע 14: מערת אצבע – הר חורשן',
    category: 'trail', region: 'center', difficulty: 'moderate',
    description: '',
    coordinates: { lat: 32.62648, lng: 34.97693 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-15'
  },
  {
    name: 'שביל ישראל מקטע 15: הר חורשן – ג\'סר א-זרקא',
    category: 'trail', region: 'center', difficulty: 'easy',
    description: '',
    coordinates: { lat: 32.53516, lng: 34.91187 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-16'
  },
  {
    name: 'שביל ישראל מקטע 16: ג\'סר א-זרקא – חדרה',
    category: 'trail', region: 'center', difficulty: 'easy',
    description: '',
    coordinates: { lat: 32.45377, lng: 34.88533 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-17'
  },
  {
    name: 'שביל ישראל מקטע 17: חדרה – החוף הירוק',
    category: 'trail', region: 'center', difficulty: 'easy',
    description: '',
    coordinates: { lat: 32.31367, lng: 34.84576 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-18'
  },
  {
    name: 'שביל ישראל מקטע 18: החוף הירוק – תל-אביב',
    category: 'trail', region: 'center', difficulty: 'easy',
    description: '',
    coordinates: { lat: 32.15762, lng: 34.79572 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-19'
  },
  {
    name: 'שביל ישראל מקטע 19: תל-אביב – מקורות הירקון',
    category: 'trail', region: 'center', difficulty: 'easy',
    description: '',
    coordinates: { lat: 32.12033, lng: 34.87498 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-20'
  },
  {
    name: 'שביל ישראל מקטע 20: מקורות הירקון – מצפה מודיעים',
    category: 'trail', region: 'center', difficulty: 'moderate',
    description: '',
    coordinates: { lat: 31.97203, lng: 34.96080 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-21'
  },
  {
    name: 'שביל ישראל מקטע 21: מצפה מודיעים – לטרון',
    category: 'trail', region: 'center', difficulty: 'moderate',
    description: '',
    coordinates: { lat: 31.85209, lng: 34.98272 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-22'
  },
  {
    name: 'שביל ישראל מקטע 22: לטרון – שער הגיא',
    category: 'trail', region: 'jerusalem', difficulty: 'moderate',
    description: '',
    coordinates: { lat: 31.80955, lng: 35.02790 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-23'
  },
  {
    name: 'שביל ישראל מקטע 23: שער הגיא – קיבוץ צובה',
    category: 'trail', region: 'jerusalem', difficulty: 'moderate',
    description: '',
    coordinates: { lat: 31.78328, lng: 35.09055 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-24'
  },
  {
    name: 'שביל ישראל מקטע 24: צובה – סטף – חורבת חנות',
    category: 'trail', region: 'jerusalem', difficulty: 'moderate',
    description: '',
    coordinates: { lat: 31.73114, lng: 35.06329 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-25'
  },
  {
    name: 'שביל ישראל מקטע 25: חורבת חנות – מצפה משואה',
    category: 'trail', region: 'center', difficulty: 'moderate',
    description: '',
    coordinates: { lat: 31.68297, lng: 34.97261 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-26'
  },
  {
    name: 'שביל ישראל מקטע 26: מצפה משואה – בית גוברין',
    category: 'trail', region: 'center', difficulty: 'easy',
    description: '',
    coordinates: { lat: 31.60669, lng: 34.89214 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-27'
  },
  {
    name: 'שביל ישראל מקטע 27: בית גוברין – תל קשת',
    category: 'trail', region: 'center', difficulty: 'easy',
    description: '',
    coordinates: { lat: 31.55884, lng: 34.84893 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-28'
  },
  {
    name: 'שביל ישראל מקטע 28: תל קשת – צומת דביר',
    category: 'trail', region: 'south', difficulty: 'easy',
    description: '',
    coordinates: { lat: 31.41093, lng: 34.84292 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-29'
  },
  {
    name: 'שביל ישראל מקטע 29: צומת דביר – צומת שוקת',
    category: 'trail', region: 'south', difficulty: 'easy',
    description: '',
    coordinates: { lat: 31.37642, lng: 34.87226 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-30'
  },
  {
    name: 'שביל ישראל מקטע 30: כרמים – הר עמשא',
    category: 'trail', region: 'south', difficulty: 'moderate',
    description: '',
    coordinates: { lat: 31.33586, lng: 35.03420 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-31'
  },
  {
    name: 'שביל ישראל מקטע 31: הר עמשא – פארק ערד',
    category: 'trail', region: 'south', difficulty: 'moderate',
    description: '',
    coordinates: { lat: 31.26479, lng: 35.14519 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-32'
  },
  {
    name: 'שביל ישראל מקטע 32: ים המלח ומדבר יהודה',
    category: 'trail', region: 'south', difficulty: 'hard',
    description: '',
    coordinates: { lat: 31.20057, lng: 35.36481 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-33'
  },
  {
    name: 'שביל ישראל מקטע 33: מצד תמר – המכתש הגדול',
    category: 'trail', region: 'south', difficulty: 'hard',
    description: '',
    coordinates: { lat: 30.93363, lng: 35.14546 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-34'
  },
  {
    name: 'שביל ישראל מקטע 34: המכתש הגדול – מעלה צין',
    category: 'trail', region: 'south', difficulty: 'hard',
    description: '',
    coordinates: { lat: 30.85834, lng: 34.93261 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-35'
  },
  {
    name: 'שביל ישראל מקטע 35: מעלה צין – עין שביב',
    category: 'trail', region: 'south', difficulty: 'hard',
    description: '',
    coordinates: { lat: 30.74420, lng: 34.88589 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-36'
  },
  {
    name: 'שביל ישראל מקטע 36: עין שביב – מצפה רמון',
    category: 'trail', region: 'south', difficulty: 'moderate',
    description: '',
    coordinates: { lat: 30.66523, lng: 34.87468 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-37'
  },
  {
    name: 'שביל ישראל מקטע 37: מצפה רמון – הר סהרונים',
    category: 'trail', region: 'south', difficulty: 'hard',
    description: '',
    coordinates: { lat: 30.57314, lng: 34.84838 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-38'
  },
  {
    name: 'שביל ישראל מקטע 38: הר סהרונים – הערבה',
    category: 'trail', region: 'south', difficulty: 'hard',
    description: '',
    coordinates: { lat: 30.31678, lng: 35.00993 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-39'
  },
  {
    name: 'שביל ישראל מקטע 39: ספיר – שיזפון',
    category: 'trail', region: 'south', difficulty: 'moderate',
    description: '',
    coordinates: { lat: 30.18511, lng: 35.00785 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-40'
  },
  {
    name: 'שביל ישראל מקטע 40: שיזפון – פארק תמנע',
    category: 'trail', region: 'south', difficulty: 'moderate',
    description: '',
    coordinates: { lat: 29.93308, lng: 34.99104 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-41'
  },
  {
    name: 'שביל ישראל מקטע 41: פארק תמנע – באר אורה',
    category: 'trail', region: 'south', difficulty: 'moderate',
    description: '',
    coordinates: { lat: 29.80644, lng: 34.99288 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-42'
  },
  {
    name: 'שביל ישראל מקטע 42: נחל רחם – קניון שחורת',
    category: 'trail', region: 'south', difficulty: 'hard',
    description: '',
    coordinates: { lat: 29.72449, lng: 34.97007 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-43'
  },
  {
    name: 'שביל ישראל מקטע 43: קניון שחורת – עין נטפים',
    category: 'trail', region: 'south', difficulty: 'hard',
    description: '',
    coordinates: { lat: 29.62610, lng: 34.93550 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-44'
  },
  {
    name: 'שביל ישראל מקטע 44: הר יואש – טאבה',
    category: 'trail', region: 'south', difficulty: 'hard',
    description: '',
    coordinates: { lat: 29.52801, lng: 34.89972 },
    externalUrl: 'https://www.teva.org.il/israel-national-trail/id-45'
  },

  // ─── ערים ושכונות ───────────────────────────────────────────────────────────
  {
    name: 'יפו העתיקה',
    category: 'city', region: 'center',
    description: '',
    coordinates: { lat: 32.0524, lng: 34.7521 },
    externalUrl: ''
  },
  {
    name: 'נווה צדק',
    category: 'city', region: 'center',
    description: '',
    coordinates: { lat: 32.0614, lng: 34.7612 },
    externalUrl: ''
  },
  {
    name: 'צפת העתיקה',
    category: 'city', region: 'north',
    description: '',
    coordinates: { lat: 32.9647, lng: 35.4966 },
    externalUrl: ''
  },
  {
    name: 'גנות הבהאי חיפה',
    category: 'city', region: 'north',
    description: '',
    coordinates: { lat: 32.8147, lng: 34.9886 },
    externalUrl: 'https://www.ganbahai.org.il/'
  },
  {
    name: 'הרובע היהודי',
    category: 'city', region: 'jerusalem',
    description: '',
    coordinates: { lat: 31.7748, lng: 35.2297 },
    externalUrl: ''
  },
  {
    name: 'הרובע המוסלמי',
    category: 'city', region: 'jerusalem',
    description: '',
    coordinates: { lat: 31.7806, lng: 35.2338 },
    externalUrl: ''
  },
  {
    name: 'הרובע הנוצרי',
    category: 'city', region: 'jerusalem',
    description: '',
    coordinates: { lat: 31.7783, lng: 35.2282 },
    externalUrl: ''
  },
  {
    name: 'פלורנטין',
    category: 'city', region: 'center',
    description: '',
    coordinates: { lat: 32.0589, lng: 34.7680 },
    externalUrl: ''
  },
  {
    name: 'נחלת בנימין',
    category: 'city', region: 'center',
    description: '',
    coordinates: { lat: 32.0680, lng: 34.7714 },
    externalUrl: ''
  },
  {
    name: 'שוק מחנה יהודה',
    category: 'city', region: 'jerusalem',
    description: '',
    coordinates: { lat: 31.7843, lng: 35.2094 },
    externalUrl: ''
  },
  {
    name: 'ראש פינה',
    category: 'city', region: 'north',
    description: '',
    coordinates: { lat: 32.9749, lng: 35.5444 },
    externalUrl: ''
  },
  {
    name: 'זכרון יעקב',
    category: 'city', region: 'north',
    description: '',
    coordinates: { lat: 32.5695, lng: 34.9518 },
    externalUrl: ''
  },
  {
    name: 'אילת',
    category: 'city', region: 'south',
    description: '',
    coordinates: { lat: 29.5581, lng: 34.9482 },
    externalUrl: ''
  },
  {
    name: 'העיר הלבנה',
    category: 'city', region: 'center',
    description: '',
    coordinates: { lat: 32.0795, lng: 34.7800 },
    externalUrl: ''
  },
  {
    name: 'נצרת העתיקה',
    category: 'city', region: 'north',
    description: '',
    coordinates: { lat: 32.7028, lng: 35.2983 },
    externalUrl: ''
  }
];

module.exports = places;
