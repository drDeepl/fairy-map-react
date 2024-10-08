import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { geoStitch } from "d3-geo-projection";
import { FeatureCollection } from "geojson";
import "./map.module.scss";
import map from "./russian_regions_fix.geo.json";

const MapComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const geoJsonData = geoStitch(map) as FeatureCollection;

  const renderMap = (geoJsonData: FeatureCollection) => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context: CanvasRenderingContext2D | null = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const devicePixelRatio = window.devicePixelRatio;

    const containerWidth = 960 * devicePixelRatio;
    const containerHeight = 500 * devicePixelRatio;

    canvas.width = containerWidth;
    canvas.height = containerHeight;

    const projection = d3
      .geoMercator()
      .fitSize([containerWidth, containerHeight], geoJsonData)
      .center(d3.geoCentroid(geoJsonData))
      .translate([containerWidth / 2, containerHeight / 2]);

    const path = d3.geoPath().projection(projection).context(context);

    context.clearRect(0, 0, containerWidth, containerHeight);

    context.beginPath();
    path(geoJsonData);
    context.strokeStyle = "black";
    context.lineWidth = 1;
    context.fillStyle = "lightgray";
    context.fill();
    context.stroke();
  };

  useEffect(() => {
    if (!geoJsonData) {
      return;
    }

    renderMap(geoJsonData);

    const handleResize = () => {
      renderMap(geoJsonData);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [geoJsonData]);

  return (
    <div className="map__container">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default MapComponent;
