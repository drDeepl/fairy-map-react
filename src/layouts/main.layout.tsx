import React, { useState } from "react";
import AppSidebar from "../components/Sidebar/sidebar.component";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import { setLoading } from "../store/appSlice";
import { AuthState } from "../features/auth/authSlice";
import "./layouts.module.scss";
import Topbar from "../components/Topbar/topbar.component";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isLoad: boolean = useSelector((state: RootState) => state.app.isLoad);
  const [sidebarVisible, setVisible] = useState(false);
  const authState: AuthState = useSelector((state: RootState) => state.auth);

  return (
    <>
      <div className="main-layout__container flex justify-content-center">
        <Topbar
          user={authState.user}
          onClickAvatar={() => setVisible(!sidebarVisible)}
        />
        <AppSidebar
          visible={sidebarVisible}
          setVisible={setVisible}
          user={authState.user}
          appendTo={document.getElementById("topbar-mainlayout") as HTMLElement}
        />
        <div className="main-layout__content">{children}</div>
      </div>
    </>
  );
};

export default MainLayout;
