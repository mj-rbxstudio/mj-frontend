import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA11HcV76G1PEBWgqep7W9aEgcorCSG3tI",
  authDomain: "mj-roblox-studio-1a630.firebaseapp.com",
  projectId: "mj-roblox-studio-1a630",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
