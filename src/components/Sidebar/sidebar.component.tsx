import React, { Dispatch, SetStateAction } from "react";
import { Sidebar } from "primereact/sidebar";
import { JwtPayload } from "../../features/auth/authSlice";
import { Button } from "primereact/button";

interface AppSidebarProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  user: JwtPayload | null;
  appendTo?: HTMLElement;
}

const AppSidebar: React.FC<AppSidebarProps> = ({
  visible,
  setVisible,
  user,
  appendTo,
}) => {
  return (
    <div className="">
      <Sidebar
        className="border-round-left-xl fadeinright"
        visible={visible}
        onHide={() => setVisible(false)}
        position="right"
        appendTo={appendTo}
      >
        {/* TODO: ADD BTN FOR LOGIN SIGNIN IF NOT AUTH */}
      </Sidebar>
    </div>
  );
};

export default AppSidebar;
