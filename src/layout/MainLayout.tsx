import React, { useState } from "react";
import AppSidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarVisible, setVisible] = useState(false);
  return (
    <div>
      <Topbar onClickAvatar={() => setVisible(!sidebarVisible)} />
      <AppSidebar
        visible={sidebarVisible}
        setVisible={setVisible}
        appendTo={document.getElementById("topbar-mainlayout") as HTMLElement}
      />
      {children}
    </div>
  );
};

export default MainLayout;
