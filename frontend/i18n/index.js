const dictionaries = {
  en: require('./en.json'),
  hi: require('./hi.json'),
};

export function getDictionary(locale) {
  return dictionaries[locale] || dictionaries.en;
}
