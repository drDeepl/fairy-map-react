import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import MapComponent from "../../features/map/map.component";
import Topbar from "../../components/topbar/topbar.component";
import { ProgressSpinner } from "primereact/progressspinner";
import { fetchMapData } from "../../features/map/mapSlice";
import { AuthState } from "../../features/auth/authSlice";
import AuthForm from "../../features/auth/auth.form";
import SignInModel from "../../features/auth/model/sign-in.model";

const MapPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { dataMap, loading, error } = useSelector(
    (state: RootState) => state.map
  );

  const [authFormVisible, setAuthFormVisible] = useState<boolean>(false);

  const handleClickSignIn = () => {
    setAuthFormVisible(true);
    console.log("click sign in");
  };

  const handleClickLogIn = () => {
    setAuthFormVisible(true);
    console.log("click log in");
  };

  const authState: AuthState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchMapData());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-content-center align-items-center min-h-screen">
        <ProgressSpinner />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="map-page__container flex justify-content-center">
      <Topbar
        user={authState.user}
        onClickSignIn={handleClickSignIn}
        onClickLogIn={handleClickLogIn}
      />
      <div className="map-pag__content">
        {dataMap ? <MapComponent features={dataMap} /> : ""}
      </div>
      <AuthForm
        title="Вход"
        dataModel={new SignInModel()}
        visible={authFormVisible}
        onSubmit={() => {
          console.log("on submit ");
        }}
        onCancel={() => {
          console.log("on cancel");
        }}
      />
    </div>
  );
};

export default MapPage;
