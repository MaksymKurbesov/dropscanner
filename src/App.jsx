import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./sharedUI/Header/Header.jsx";
import Footer from "./sharedUI/Footer/Footer.jsx";
import { useAuthState } from "./hooks/userAuthState.js";
import { auth } from "./main.jsx";

function App() {
  const [user, loading] = useAuthState(auth);

  return (
    <>
      <Header user={user} />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
