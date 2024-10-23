import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import store from "./store/index";
import { Provider } from "react-redux";
import "./assets/index.scss";
import HomePage from "./pages/home/Home";
import NotFoundPage from "./pages/not-found/not-found.page";
import WelcomePage from "./pages/welcome/welcome.page";
import PersonalPage from "./pages/personal-page/perosnal.page";
import { RoutePage } from "./pages/constants/route-page";
import MapPage from "./pages/map/map.page";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const value = {
  ripple: true,
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PrimeReactProvider value={value}>
        <BrowserRouter>
          <Suspense fallback={loading}>
            <Routes>
              <Route path={RoutePage.Welcome} element={<WelcomePage />} />
              <Route path={RoutePage.Home} element={<HomePage />} />
              <Route path={RoutePage.Map} element={<MapPage />} />
              <Route path={RoutePage.Personal} element={<PersonalPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </PrimeReactProvider>
    </Provider>
  </React.StrictMode>
);
