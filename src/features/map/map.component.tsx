import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

import { feature } from "topojson-client";
import { presimplify, simplify } from "topojson-simplify";
import "./map.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchMapData } from "./mapSlice";

interface ScreenSize {
  width: number;
  height: number;
}

const MapComponent: React.FC = () => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    height: document.documentElement.clientHeight * window.devicePixelRatio,
    width: document.documentElement.clientWidth * window.devicePixelRatio,
  });

  document.documentElement.style.overflow = "hidden";

  const divRef = useRef(null);

  const dispatch = useDispatch<AppDispatch>();
  const { dataMap, loading, error } = useSelector(
    (state: RootState) => state.map
  );

  const drawMap = (russiaTopojson: any) => {
    const presimpifed = presimplify(russiaTopojson);
    const simplifed = simplify(presimpifed);

    const russiaGeojson = feature(simplifed as any, simplifed.objects.map);

    const data = russiaGeojson as d3.ExtendedFeatureCollection;

    d3.select(divRef.current).selectChild().remove();

    const svg = d3
      .select(divRef.current)
      .append("svg")
      .attr("width", screenSize.width)
      .attr("height", screenSize.height)
      .style("background-color", "#82A9FD");

    const map = svg.append("g");

    const projection = d3
      .geoMercator()
      .rotate([-180, 0])
      .scale(1)
      .translate([0, 0]);
    const path = d3.geoPath().projection(projection);

    const bounds = path.bounds(data);

    const dx = bounds[1][0] - bounds[0][0];
    const dy = bounds[1][1] - bounds[0][1];
    const x = (bounds[0][0] + bounds[1][0]) / 2;
    const y = (bounds[0][1] + bounds[1][1]) / 2;

    const scale = 1 / Math.max(dx / screenSize.width, dy / screenSize.height);

    const translate: [number, number] = [
      screenSize.width / 2 - scale * x,
      screenSize.height / 2 - scale * y,
    ];

    projection.scale(scale).translate(translate);

    const zoom = d3
      .zoom()
      .scaleExtent([1, 8]) // Задаем минимальное и максимальное значение для зума
      .on("zoom", (event) => {
        map.transition().duration(10).attr("transform", event.transform);
        // Добавляем transition для плавности
      });

    svg.call(zoom);

    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background-color", "white")
      .style("padding", "5px")
      .style("border", "1px solid #ccc")
      .style("border-radius", "4px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    data.features.forEach((feature) => {
      map
        .append("path")
        .attr("d", path(feature))
        .style("fill", "#FFFFFF")
        .style("stroke", "#82A9FD")
        .on("mouseover", function () {
          d3.select(this).style("fill", "red");
        })
        .on("mouseout", function () {
          d3.select(this).style("fill", "#FFFFFF");
          tooltip.style("opacity", 0);
        })
        .on("click", function () {
          console.log(feature);
          tooltip.transition().duration(200).style("opacity", 0.9);

          tooltip
            .html(`${feature.properties.name}`)
            .style("left", `${event.pageX}px`)
            .style("top", `${event.pageY - 50}px`); // Смещение вверх для видимости
        });
    });
  };
  useEffect(() => {
    dispatch(fetchMapData());
  }, [dispatch]);

  useEffect(() => {
    drawMap(dataMap);
    const handleResize = () => {
      setScreenSize({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    // Очистка события при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;
  if (dataMap) {
    console.log(dataMap);

    return <div ref={divRef} className="map__container"></div>;
  }
};

export default MapComponent;
