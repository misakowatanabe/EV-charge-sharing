import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBKWGsBb0P1kRVYdYwjFZ8wpGdFI_nkd98",
  authDomain: "ev-charge-sharing.firebaseapp.com",
  projectId: "ev-charge-sharing",
  storageBucket: "ev-charge-sharing.appspot.com",
  messagingSenderId: "1081351689466",
  appId: "1:1081351689466:web:14e33ab4ae4fc99b2a6543",
  measurementId: "G-K3Y4RR69QP",
};

export const FirebaseConfig = () => {
  return initializeApp(firebaseConfig);
};
