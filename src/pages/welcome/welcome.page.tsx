import { Button } from "primereact/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  function handleClickToMap() {
    navigate("/map");
  }

  return (
    <div className="welcome-page__container">
      <div className="actions__container flex align-items-center gap-3">
        <Button
          outlined
          rounded
          className="fadeinleft animation-duration-1000"
          onClick={handleClickToMap}
        >
          <span>к карте</span>
          <span className="pi pi-arrow-right ml-2"></span>
        </Button>
        <Button className="fadeinright animation-duration-1000">войти</Button>
      </div>
    </div>
  );
};

export default WelcomePage;
