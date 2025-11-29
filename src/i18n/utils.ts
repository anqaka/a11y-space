import pl from './pl.json';

const translations = { pl };

export function t(key: string, lang: keyof typeof translations = 'pl') {
  const keys = key.split('.');
  let value: any = translations[lang];
  for (const k of keys) {
    value = value?.[k];
  }
  return value || key;
}
