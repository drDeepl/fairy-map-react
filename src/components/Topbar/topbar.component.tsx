import React from "react";
import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";

import { JwtPayload } from "../../features/auth/authSlice";
import { Button } from "primereact/button";

interface TopbarProps {
  user: JwtPayload | null;
  onClickAvatar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onClickAvatar, user }) => {
  return (
    <div
      id="topbar-mainlayout"
      className="flex justify-content-between pl-3 pr-3  w-full fixed mt-3"
    >
      <div className="search-panel__container flex justify-content-start">
        <InputText
          placeholder="Search"
          type="text"
          className="border-1 border-round-3xl max-h-5rem shadow-2"
        />
        <Button icon="pi pi-caret-right opacity-40" className="ml-2" />
      </div>

      <Avatar
        className="bg-white border-round-xl shadow-2"
        icon={!user ? "pi pi-user" : ""}
        label={user ? user.email.slice(0, 1) : ""}
        size="large"
        style={{ color: "var(--surface-500)" }}
        onClick={onClickAvatar}
      />
    </div>
  );
};

export default Topbar;
