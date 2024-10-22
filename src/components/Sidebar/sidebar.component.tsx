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
  const customHeader = (
    <div className="flex align-items-center gap-2">
      <Button label="войти"></Button>
      <Button label="зарегистрироваться" text></Button>
    </div>
  );
  return (
    <div className="">
      <Sidebar
        className="border-round-left-xl fadeinright"
        visible={visible}
        header={
          !user ? customHeader : <div>Привет {user.email.split("@")[0]}</div>
        }
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
