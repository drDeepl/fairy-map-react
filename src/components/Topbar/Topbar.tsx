import React from "react";
import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";

import { JwtPayload } from "../../features/auth/authSlice";

interface TopbarProps {
  user: JwtPayload | null;
  onClickAvatar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onClickAvatar, user }) => {
  const end = (
    <div className="flex align-items-center gap-2">
      <InputText placeholder="Search" type="text" />
      <Avatar
        label={user ? user.email.slice(0, 1) : "?"}
        shape="circle"
        size="large"
        onClick={onClickAvatar}
      />
    </div>
  );
  return (
    <div
      id="topbar-mainlayout"
      className="pl-2 pr-2 opacity-100 w-full fixed mt-2"
    >
      <Menubar className="border-round-2xl shadow-2" end={end} />
    </div>
  );
};

export default Topbar;
