import { createBrowserRouter } from "react-router-dom";
import Index from "./pages/Index/Index.jsx";
import App from "./App.jsx";
import Airdrops from "./pages/Airdrops/Airdrops.jsx";
import Earn from "./pages/Earn/Earn.jsx";
import Address from "./pages/Address/Address.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import TermsOfService from "./pages/TermsOfService/TermsOfService.jsx";
import Privacy from "./pages/Privacy/Privacy.jsx";

export const routes = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <Index /> },
        { path: "/airdrops", element: <Airdrops /> },
        { path: "/earn", element: <Earn /> },
        { path: "/address/:walletId", element: <Address /> },
        { path: "/dashboard/overview", element: <Dashboard /> },
        { path: "/terms", element: <TermsOfService /> },
        { path: "/privacy", element: <Privacy /> },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_startTransition: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);
