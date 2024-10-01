import React from "react";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { Button } from "primereact/button";

const AppSidebar: React.FC = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="App">
      <Button
        icon="pi pi-angle-double-right w-6"
        rounded
        text
        onClick={() => setVisible(true)}
        className="p-mr-2"
      />
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        className="border-round-right-xl fadeinleft"
      >
        <h1 style={{ fontWeight: "normal" }}>Users Information Here</h1>
        <Button
          className="p-button-text"
          icon="pi pi-check"
          onClick={() => alert("Button 1 clicked")}
        />
        <Button
          className="p-button-text"
          icon="pi pi-times"
          onClick={() => alert("Button 2 clicked")}
        />
      </Sidebar>
    </div>
  );
};

export default AppSidebar;
