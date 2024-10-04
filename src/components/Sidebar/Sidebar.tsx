import React, { Dispatch, SetStateAction } from "react";
import { Sidebar } from "primereact/sidebar";

interface AppSidebarProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  appendTo?: HTMLElement;
}

const AppSidebar: React.FC<AppSidebarProps> = ({
  visible,
  setVisible,
  appendTo,
}) => {
  return (
    <div className="relative top-20">
      <Sidebar
        className="border-round-left-xl fadeinright"
        visible={visible}
        onHide={() => setVisible(false)}
        position="right"
        appendTo={appendTo}
      >
        <h2 style={{ fontWeight: "normal" }}>Users Information Here</h2>
      </Sidebar>
    </div>
  );
};

export default AppSidebar;