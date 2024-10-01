import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import { store } from "./store/store";
import { Provider } from "react-redux";
import "./assets/index.scss";
import DefaultLayout from "./layout/MainLayout";
import Home from "./pages/home/Home";
import NotFoundPage from "./pages/NotFoundPage";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PrimeReactProvider>
        <BrowserRouter>
          <Suspense fallback={loading}>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<DefaultLayout />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </PrimeReactProvider>
    </Provider>
  </React.StrictMode>
);
