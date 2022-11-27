import { initReactI18next } from "react-i18next";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-http-backend";

import { common as commonEn } from "./en/Common";
import { common as commonJa } from "./ja/Common";
import { auth as authEn } from "./en/Auth";
import { auth as authJa } from "./ja/Auth";

export const resources = {
  en: { common: commonEn, auth: authEn },
  ja: { common: commonJa, auth: authJa },
};

export const options = {
  order: ["querystring", "navigator"],
  lookupQuerystring: "lng",
};

i18next
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: options,
    interpolation: { escapeValue: false }, // React already does escaping
    fallbackLng: "en",
    supportedLngs: ["en", "ja"],
    resources,
    debug: false,
  });

export default i18next;
