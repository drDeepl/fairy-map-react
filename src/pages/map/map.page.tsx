import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import MapComponent from "../../features/map/map.component";
import Topbar from "../../components/Topbar/topbar.component";
import { ProgressSpinner } from "primereact/progressspinner";
import { fetchMapData } from "../../features/map/mapSlice";
import { AuthState } from "../../features/auth/authSlice";

const MapPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { dataMap, loading, error } = useSelector(
    (state: RootState) => state.map
  );

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
      <Topbar user={authState.user} />
      <div className="map-pag__content">
        {dataMap ? <MapComponent features={dataMap} /> : ""}
      </div>
    </div>
  );
};

export default MapPage;
