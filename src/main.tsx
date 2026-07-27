import { Layout } from "components/Layout";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { SplashPage } from "pages/Splash";

import "styles/global.css";
import "styles/tailwind.css";

function App() {
  const [showSplash, setShowSplash] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      navigate("/lobby", { replace: true });
    }, 1000);
    return () => clearTimeout(timer);
  }, [navigate]);

  if (showSplash) return <SplashPage />;
  return <Layout />;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
