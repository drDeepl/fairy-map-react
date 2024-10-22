import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import store from "./store/index";
import { Provider } from "react-redux";
import "./assets/index.scss";
import MainLayout from "./layouts/main.layout";
import HomePage from "./pages/home/Home";
import NotFoundPage from "./pages/NotFoundPage";

import WelcomePage from "./pages/welcome/welcome.page";
import MapComponent from "./features/map/map.component";
import PersonalPage from "./pages/personal-page/perosnal.page";
import { RoutePage } from "./pages/constants/routes.enum";

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
            <MainLayout>
              <Routes>
                <Route path={RoutePage.Welcome} element={<WelcomePage />} />
                <Route path={RoutePage.Home} element={<HomePage />} />
                <Route path={RoutePage.Map} element={<MapComponent />} />
                <Route path={RoutePage.Personal} element={<PersonalPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </MainLayout>
          </Suspense>
        </BrowserRouter>
      </PrimeReactProvider>
    </Provider>
  </React.StrictMode>
);
