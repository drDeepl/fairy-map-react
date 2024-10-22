import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

import { AuthState } from "../features/auth/authSlice";
import "./layouts.module.scss";
import Topbar from "../components/Topbar/topbar.component";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const authState: AuthState = useSelector((state: RootState) => state.auth);

  return (
    <>
      <div className="main-layout__container flex justify-content-center">
        <Topbar user={authState.user} />
        <div className="main-layout__content">{children}</div>
      </div>
    </>
  );
};

export default MainLayout;
