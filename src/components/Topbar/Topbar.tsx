import React from "react";
import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";

interface TopbarProps {
  onClickAvatar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onClickAvatar }) => {
  const end = (
    <div className="flex align-items-center gap-2">
      <InputText placeholder="Search" type="text" />
      <Avatar label="A" shape="circle" size="large" onClick={onClickAvatar} />
    </div>
  );
  return (
    <div
      id="topbar-mainlayout "
      className="pl-3 pr-3 opacity-100 w-full fixed mt-1"
    >
      <Menubar className="border-round-2xl shadow-2" end={end} />
    </div>
  );
};

export default Topbar;
