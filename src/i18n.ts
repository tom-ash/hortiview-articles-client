import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/templateTranslations.json';
import es from './locales/es/templateTranslations.json';

// different instances have to be created since we initialize i18n for each of the modules and the main platform
const i18n = i18next.createInstance();

i18n
  // i18next-http-backend
  // loads translations from your server
  // https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    lng: 'en',
    fallbackLng: ['en', 'es', 'de'],
    resources: {
      en: {
        translation: en,
      },
      es: {
        translation: es,
      },
    },
    debug: true,
    returnObjects: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    returnNull: false,
  });

export default i18n;
