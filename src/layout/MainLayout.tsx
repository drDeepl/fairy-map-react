import React, { useState } from "react";
import AppSidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import { setLoading } from "../store/appSlice";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isLoad: boolean = useSelector((state: RootState) => state.app.isLoad);
  const [sidebarVisible, setVisible] = useState(false);

  return (
    <div className="flex justify-content-center">
      <Topbar onClickAvatar={() => setVisible(!sidebarVisible)} />
      <AppSidebar
        visible={sidebarVisible}
        setVisible={setVisible}
        appendTo={document.getElementById("topbar-mainlayout") as HTMLElement}
      />
      <div className="pt-8">{children}</div>
    </div>
  );
};

export default MainLayout;
