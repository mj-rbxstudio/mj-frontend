import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "ISI_DARI_FIREBASE",
  authDomain: "ISI_DARI_FIREBASE",
  projectId: "ISI_DARI_FIREBASE",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
