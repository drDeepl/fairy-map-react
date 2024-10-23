import React, { useRef } from "react";
import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";

import { JwtPayload } from "../../features/auth/authSlice";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { useNavigate } from "react-router-dom";

interface TopbarProps {
  user: JwtPayload | null;
}

const Topbar: React.FC<TopbarProps> = ({ user }) => {
  const authPanel = useRef(null);
  const navigate = useNavigate();

  function handleOnClicknPersonalPage() {
    navigate("/me");
  }
  const authActions = (
    <div className="flex align-items-center gap-2">
      <Button label="войти"></Button>
      <Button label="зарегистрироваться" text></Button>
    </div>
  );

  const handleOnClickAvatar = (e) => {
    authPanel.current.toggle(e);
  };
  return (
    <div
      id="topbar-mainlayout"
      className="flex justify-content-between pl-3 pr-3  w-full fixed mt-3"
    >
      <div className="search-panel__container flex justify-content-start">
        <InputText
          placeholder="Search"
          type="text"
          className="pa-1 border-round-3xl max-h-5rem shadow-2"
        />
        <Button
          icon="pi pi-caret-right"
          className="ml-2 bg-black-alpha-50 w-2rem border-none outline-none"
          severity="secondary"
        />
      </div>

      <Avatar
        className="bg-white border-round-xl shadow-2"
        icon={!user ? "pi pi-user" : ""}
        label={user ? user.email.slice(0, 1) : ""}
        size="large"
        style={{ color: "var(--surface-500)" }}
        onClick={(e) => handleOnClickAvatar(e)}
      />
      <OverlayPanel ref={authPanel}>
        {!user ? (
          authActions
        ) : (
          <Button
            label="личный кабинет"
            onClick={handleOnClicknPersonalPage}
          ></Button>
        )}
      </OverlayPanel>
    </div>
  );
};

export default Topbar;
