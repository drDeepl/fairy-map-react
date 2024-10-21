import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { fetchMapData } from "../map/mapSlice";
import { ProgressSpinner } from "primereact/progressspinner";
import { FeatureCollection } from "geojson";

interface ScreenSize {
  mapWidth: number;
  mapHeight: number;
}

const MapComponent: React.FC = () => {
  const [heroSelect, setHeroSelect] = useState("batman");
  const [minHero, setMinHero] = useState(null);
  const [maxHero, setMaxHero] = useState(null);

  const [screenSize, setScreenSize] = useState<ScreenSize>({
    mapWidth: document.documentElement.clientWidth,
    mapHeight: document.documentElement.clientHeight,
  });

  const dispatch = useDispatch();
  const { dataMap, loading, error } = useSelector(
    (state: RootState) => state.map
  );

  const mapSvgRef = useRef<SVGSVGElement | null>(null);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const tooltipDiv = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(fetchMapData());
  }, [dispatch]);

  function drawMap(features: FeatureCollection) {
    console.log(features);
    const mapProjection = d3
      .geoAlbers()
      .rotate([-105, 0]) //  .rotate([-105,0])
      .center([-10, 65])
      .parallels([50, 70]) //.parallels([52, 64])
      .scale(700)
      .translate([screenSize.mapWidth / 2, screenSize.mapHeight / 2])
      .precision(0.1);

    // Path
    const mapPath = d3.geoPath().projection(mapProjection);

    // SVG
    // const svg = d3
    //   .select(mapSvgRef.current)
    //   .attr("width", screenSize.mapWidth)
    //   .attr("height", screenSize.mapHeight)
    //   .attr("fill", "blue");

    document.body.style.overflow = "hidden";

    const svg = d3
      .select(mapContainerRef.current)
      .append("svg")
      .attr("width", screenSize.mapWidth)
      .attr("height", screenSize.mapHeight)
      .style("background-color", "#82A9FD");

    svg.selectAll("*").remove();

    const g = svg.append("g");

    tooltipDiv.current = d3
      .select(mapContainerRef.current)
      .append("div")
      .attr("class", "map-tooltip")
      .style("opacity", 0);

    // Tooltip

    // Zoom
    svg.call(
      d3
        .zoom()
        .scaleExtent([1 / 2, 5])
        .on("zoom", (event) => {
          g.attr("transform", event.transform);
        })
    );

    g.selectAll("path")
      .data(features as any)
      .enter()
      .append("path")
      .attr("d", mapPath)
      .style("stroke", "#82A9FD")
      .style("stroke-width", "0.5")
      .style("fill", "rgb(255,255,225)");

    const getHeroFilePath = () => {
      return `http:localhost:5173/${heroSelect}.csv`;
    };

    const drawHeroCircles = (mapProjection, g) => {
      const heroFilePath = getHeroFilePath();
      g.selectAll("circle").remove();

      d3.csv(heroFilePath).then((heroData) => {
        console.log(heroData);
        findMinAndMaxHero(heroData);

        g.selectAll("circle")
          .data(heroData)
          .enter()
          .append("circle")
          .attr("cx", (d) => mapProjection([d.lon, d.lat])[0])
          .attr("cy", (d) => mapProjection([d.lon, d.lat])[1])
          .attr("r", (d) => calculateRadius(d.metric))
          .style("fill", "rgb(30,166,191)")
          .style("opacity", 0.85)
          .on("mouseover", (event, d) => {
            tooltipDiv.current.transition().duration(200).style("opacity", 0.9);
            tooltipDiv.current
              .text(`${d.place} - ${d.metric}`)
              .style("left", `${event.pageX}px`)
              .style("top", `${event.pageY - 28}px`);
          })
          .on("mouseout", () => {
            tooltipDiv.current.transition().duration(500).style("opacity", 0);
          });
      });
    };

    drawHeroCircles(mapProjection, g);

    const findMinAndMaxHero = (heroData) => {
      const metrics = heroData.map((d) => +d.metric);
      setMinHero(Math.min(...metrics));
      setMaxHero(Math.max(...metrics));
    };

    const calculateRadius = (metric) => {
      // Add your calculation logic here
      return 5; // Placeholder value
    };
  }

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        mapWidth: document.documentElement.clientWidth,
        mapHeight: document.documentElement.clientHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    // Очистка события при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dataMap]);

  if (loading)
    return (
      <div className="flex justify-content-center align-items-center min-h-screen">
        <ProgressSpinner />
      </div>
    );
  if (dataMap) {
    console.log(dataMap);
    drawMap(dataMap);
    return <div ref={mapContainerRef}></div>;
  }
};

export default MapComponent;
