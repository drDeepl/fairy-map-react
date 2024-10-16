import { Button } from "primereact/button";
import React from "react";

const WelcomePage: React.FC = () => {
  return (
    <div className="welcome-page__container">
      <div className="actions__container flex align-items-center gap-3">
        <Button outlined rounded className="fadeinleft animation-duration-1000">
          <span>к карте</span>
          <span className="pi pi-arrow-right ml-2"></span>
        </Button>
        <Button className="fadeinright animation-duration-1000">войти</Button>
      </div>
    </div>
  );
};

export default WelcomePage;
