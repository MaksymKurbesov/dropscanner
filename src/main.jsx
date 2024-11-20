import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { routes } from "./routes.jsx";
import { RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import AuthService from "./services/AuthService.js";
import { UserProvider } from "./context/UserContext.jsx";
import UserService from "./services/UserService.js";
import { SignInModalProvider } from "./context/SignInModalContext.jsx";
import { TourProvider } from "@reactour/tour";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import {DrainerProvider} from "./context/DrainerContext.jsx";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDsPkfeWIwnG42xreJQ78cGi0RQ8OS4uew",
  authDomain: "airdrops-4fb75.firebaseapp.com",
  projectId: "airdrops-4fb75",
  storageBucket: "airdrops-4fb75.firebasestorage.app",
  messagingSenderId: "17411012414",
  appId: "1:17411012414:web:de8dbbd3c39c33b6b0de6f",
});

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

export const authService = new AuthService();
export const userService = new UserService();

window.addEventListener("beforeunload", function (event) {
  event.stopImmediatePropagation();
});

const steps = [
  {
    selector: "#join-chat",
    content: (
      <div id={"step1"}>
        <p>
          Tap the "Join Chat" button to become part of our vibrant community.
          Connect, share, and stay updated with everything we have to offer.
          Don’t miss out—join us now!
        </p>
      </div>
    ),
  },
  {
    selector: "#eligible-airdrops",
    content: (
      <div id={"step2"}>
        <p>
          This is where your future airdrops will appear! After connecting your
          wallet, check back here for new rewards.
        </p>
      </div>
    ),
  },
  {
    selector: "#your-addresses",
    content: (
      <div id={"step3"}>
        <p>
          Here you can see all your tracked wallets. Stay updated on eligible
          airdrops and additional insights linked to each wallet. Make sure your
          wallets are up-to-date to never miss an opportunity!
        </p>
      </div>
    ),
  },
  // ...
];

const disableBody = (target) => disableBodyScroll(target);
const enableBody = (target) => enableBodyScroll(target);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <MantineProvider>
    <TourProvider
      steps={steps}
      scrollSmooth
      afterOpen={disableBody}
      beforeClose={enableBody}
    >
      <UserProvider>
        <SignInModalProvider>
	        <DrainerProvider>
            <RouterProvider router={routes} />
	        </DrainerProvider>
        </SignInModalProvider>
      </UserProvider>
    </TourProvider>
  </MantineProvider>,
  // </StrictMode>,
);
