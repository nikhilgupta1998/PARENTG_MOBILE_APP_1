import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { APP_LANGUAGE } from "../utils/constrats";
import en from "./en/translation.json";
import ar from "./ar/translation.json";
import hi from "./hi/translation.json";
import { ConvertedToObjectType } from "./types";

const translationsJson = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
  hi: {
    translation: hi,
  },
};

export type TranslationResource = typeof en;
export type LanguageKey = keyof TranslationResource;

export const translations: ConvertedToObjectType<TranslationResource> =
  {} as any;

/*
 * Converts the static JSON file into an object where keys are identical
 * but values are strings concatenated according to syntax.
 * This is helpful when using the JSON file keys and still have the intellisense support
 * along with type-safety
 */
const convertLanguageJsonToObject = (obj: any, dict: any, current?: string) => {
  Object.keys(obj).forEach((key: any) => {
    const currentLookupKey = current ? `${current}.${key}` : key;
    if (typeof obj[key] === "object") {
      dict[key] = {};
      convertLanguageJsonToObject(obj[key], dict[key], currentLookupKey);
    } else {
      dict[key] = currentLookupKey;
    }
  });
};

export const i18n = i18next
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init(
    {
      compatibilityJSON: "v3",
      resources: translationsJson,
      fallbackLng: "en",
      lng: APP_LANGUAGE,
      debug: false,
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
    },
    () => {
      convertLanguageJsonToObject(en, translations);
    }
  );
