import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import store from "./context/Store";
import { Provider } from "react-redux";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18next from "i18next";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-http-backend";
import Backend from "i18next-http-backend";

import commonEn from "./i18next/en/common.json";
import signinEn from "./i18next/en/signin.json";
import commonJa from "./i18next/ja/common.json";
import signinJa from "./i18next/ja/signin.json";

const resources = {
  en: { common: commonEn, siginin: signinEn },
  ja: { common: commonJa, siginin: signinJa },
};

const options = {
  order: ["querystring", "navigator"],
  lookupQuerystring: "lng",
};

i18next
  .use(Backend)
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: options,
    interpolation: { escapeValue: false }, // React already does escaping
    fallbackLng: "en",
    supportedLngs: ["en", "ja"],
    resources: {
      en: {
        common: { test: "test" },
        signin: {
          title: "Sign in",
        },
      },
      ja: {
        common: { test: "test" },
        signin: {
          title: "サインイン",
        },
      },
    },
    // resources,
    ns: ["common", "signin"],
    defaultNS: "common",
    debug: false,
    backend: {
      loadPath: "/api/locales/{{lng}}/{{ns}}",
      allowMultiLoading: false,
      crossDomain: true,
      withCredentials: false,
    },
  });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
