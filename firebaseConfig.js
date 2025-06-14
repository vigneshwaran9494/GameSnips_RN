import { initializeApp } from "firebase/app";

/**
 * @description Firebase configuration
 * @type {Object}
 */
export const firebaseConfig = {
  apiKey: "AIzaSyCAWyokXFPFSNgQO58l1eRrO32ax5F5UlM",
  authDomain: "gamesnips-56871.firebaseapp.com",
  databaseURL: "https://gamesnips-56871-default-rtdb.firebaseio.com",
  projectId: "gamesnips-56871",
  storageBucket: "gamesnips-56871.firebasestorage.app",
  messagingSenderId: "671002997889",
  appId: "1:671002997889:web:831e8009fe66ddafec0980"
};

export const app = initializeApp(firebaseConfig);