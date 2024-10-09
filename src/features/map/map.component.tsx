import React from "react";

const MapComponent: React.FC = () => {
  let width = window.innerWidth;
  let height = window.innerHeight;

  const pointRadius = 1.5;
  let zoomedPointRadius = 1.5;
  let colorRegion;
  let projection = d3
    .geoAlbers()
    .rotate([-100, 0])
    .parallels([52, 64])
    .scale(1);
  let path = d3.geoPath().projection(projection);
  let data = topojson.feature(geojson, geojson.objects.map).features;
  return <svg></svg>;
};

export default MapComponent;
