import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";

// Замените этот импорт или URL на актуальный путь к вашему TopoJSON файлу карты России
import russiaMap from "./map_russia.json";

// Определяем интерфейсы для типов данных
interface RussiaMapProps {
  width: number;
  height: number;
}

const RussiaMap: React.FC<RussiaMapProps> = ({ width, height }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  // TODO: render map
  useEffect(() => {
    // Функция для загрузки и рендеринга карты
    const drawMap = async () => {
      const width = 800;
      const height = 600;

      let features = topojson.feature(
        russiaMap,
        russiaMap.objects.map
      ).features;

      const projection = d3.geoMercator().fitSize([width, height], features);
      const pathGenerator = d3.geoPath().projection(projection);

      // Выбор и очистка SVG элемента
      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .style("background-color", "#f0f0f0");

      svg.selectAll("*").remove();

      // Рендеринг геометрических фигур
      svg
        .selectAll("path")
        .data(features)
        .enter()
        .append("path")
        .attr("d", pathGenerator)
        .attr("fill", "#69b3a2")
        .attr("stroke", "#fff")
        .attr("stroke-width", 0.5);
    };

    drawMap();
  });

  return <svg ref={svgRef}></svg>;
};

export default RussiaMap;
