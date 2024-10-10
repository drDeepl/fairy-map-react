import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import store from "./store/index";
import { Provider } from "react-redux";
import "./assets/index.scss";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/home/Home";
import NotFoundPage from "./pages/NotFoundPage";

import MapComponent from "./features/map/map.component";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const data = {
  data: [
    { id: "1", codeISO: "50000", name: "custom point 1", count: 383 },
    { id: "2", codeISO: "50000", name: "custom point 2", count: 189 },
    { id: "3", codeISO: "50000", name: "custom point 3", count: 336 },
    { id: "4", codeISO: "50000", name: "custom point 4", count: 645 },
    { id: "5", codeISO: "50000", name: "custom point 5", count: 145 },
    { id: "6", codeISO: "50000", name: "custom point 6", count: 608 },
    { id: "7", codeISO: "50000", name: "custom point 7", count: 527 },
    { id: "8", codeISO: "50000", name: "custom point 8", count: 2178 },
    { id: "9", codeISO: "50000", name: "custom point 9", count: 453 },
    { id: "10", codeISO: "50000", name: "custom point 11", count: 1081 },
    { id: "11", codeISO: "50000", name: "custom point 12", count: 389 },
    { id: "12", codeISO: "50000", name: "custom point 13", count: 5213 },
    { id: "13", codeISO: "50000", name: "custom point 14", count: 591 },
    { id: "14", codeISO: "50000", name: "custom point 15", count: 163 },
    { id: "15", codeISO: "50000", name: "custom point 16", count: 269 },
    { id: "16", codeISO: "50000", name: "custom point 17", count: 234 },
    { id: "17", codeISO: "50000", name: "custom point 18", count: 245 },
  ],
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PrimeReactProvider>
        <BrowserRouter>
          <MainLayout>
            <Suspense fallback={loading}>
              <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route
                  path="/map"
                  element={
                    <MapComponent
                      data={data}
                      width={window.innerWidth}
                      height={window.innerHeight}
                    />
                  }
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </MainLayout>
        </BrowserRouter>
      </PrimeReactProvider>
    </Provider>
  </React.StrictMode>
);
