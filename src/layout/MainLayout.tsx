import React, { useState } from "react";
import AppSidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isLoad: boolean = useSelector((state: RootState) => state.app.isLoad);
  const [sidebarVisible, setVisible] = useState(false);

  return (
    <div>
      <Topbar onClickAvatar={() => setVisible(!sidebarVisible)} />
      <AppSidebar
        visible={sidebarVisible}
        setVisible={setVisible}
        appendTo={document.getElementById("topbar-mainlayout") as HTMLElement}
      />
      {isLoad ? <ProgressSpinner /> : null}
      {/* TODO: Change state after click btn */}
      {children}
    </div>
  );
};

export default MainLayout;
