import React, {
  useEffect,
  useCallback,
  useState,
  useRef,
  ReactNode,
} from "react";
import * as d3 from "d3";
import * as d3Geo from "d3-geo";
import * as topojson from "topojson-client";
import { GeometryCollection, Topology } from "topojson-specification";
import { Feature, Geometry } from "geojson";

import { setAttributes } from "../../utils/d3/setAttributes.d3";

import { Button } from "primereact/button";

import koreaSidoMap from "./map12.json";

interface GeometryProperties {
  id: string;
  shapeName: string;
  shapeISO: string;
  shapeID: string;
  shapeGroup: string;
  shapeType: string;
}

export interface PointMapData {
  id: string;
  codeISO: string;
  name: string;
  count: number;
}

interface BubbleMapData extends PointMapData {
  size: number;
  index: number;
}

export interface TooltipProps {
  name: string;
  count: number;
  percent: number;
}

export interface RussiaMapData {
  data: PointMapData[];
}

export interface BubbleMapConfigProps {
  data: RussiaMapData;
}

const MapComponent: React.FC<BubbleMapConfigProps> = ({
  data,
}: BubbleMapConfigProps) => {
  const [width, setWidth] = useState<number>(+window.innerWidth);
  const [height, setHeight] = useState<number>(+window.innerHeight);

  const svgRef = useRef<SVGSVGElement | null>(null);

  const [mapScale, setScale] = useState<number>(300);

  const zoomStep = useRef<number>(0);

  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  const [plusBtnDisabled, setPlusBtnDisabled] = useState<boolean>(false);
  const [minusBtnDisabled, setMinusBtnDisabled] = useState<boolean>(true);

  const draw = async () => {
    console.log("DRAW MAP");
    setHeight(window.innerWidth);
    setWidth(window.innerWidth);

    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove();

    const g = svg.append("g");

    const russiaMap = convertTopojsonToGeoData(koreaSidoMap as any);

    const sidoGeometry = russiaMap.features;

    const projection = createProjection(sidoGeometry);

    const path: d3.GeoPath = createPath(projection);

    const sidoMap = createMap({
      g,
      className: "sido-map",
      data: sidoGeometry,
      path,
      attrs: {
        stroke: "#fff",
        "stroke-width": "0.5px",
      },
    });

    sidoMap.on("click", (event, d) => {
      console.log(d);
      sidoMap.duration(1000);
    });

    const sidoData = calculateBubbleSize(data.data);

    const sidoBubbles = createBubbles({
      svg,
      data: sidoData,
      className: "sido-bubble",
      geometry: sidoGeometry,
      path,
      isSidoBubble: true,
    });

    const zoom = createZoom({
      g,
      sidoBubbles,
      sidoMap,
    });

    svg.call(zoom);

    svg.attr("width", width).attr("height", height);
    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    window.addEventListener("resize", draw);

    addZoomEventToButton(svg, zoom);
    return () => window.removeEventListener("resize", draw);
  };

  const handleMouseEnter = (regionId: string) => {
    setActiveRegion(regionId);
  };

  const handleMouseLeave = () => {
    setActiveRegion(null);
  };

  function convertTopojsonToGeoData(topojsonMap: any) {
    const mapGeometry = topojson.feature(
      topojsonMap,
      topojsonMap.objects["map"] as GeometryCollection<GeometryProperties>
    );

    return mapGeometry;
  }

  const createProjection = (
    geometry: Feature<Geometry, GeometryProperties>[]
  ): d3.GeoProjection => {
    const projection = d3Geo
      .geoMercator()
      .fitSize([width, height], {
        type: "FeatureCollection",
        features: geometry,
      })
      .rotate([-180, 0])
      .center([-80, 0])
      .scale(mapScale);
    return projection;
  };

  function createPath(projection: d3.GeoProjection): d3.GeoPath {
    return d3Geo.geoPath().projection(projection);
  }

  function createMap({
    g,
    className,
    data,
    path,
    attrs,
  }: {
    g: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
    className: string;
    data: Feature<Geometry, GeometryProperties>[];
    path: d3.GeoPath<any, d3.GeoPermissibleObjects>;
    attrs: Record<string, string>;
  }) {
    const map = g
      .selectAll("path")
      .data(data)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("data-iso", (d) => d.properties.shapeISO)
      .attr("data-name", (d) => d.properties.shapeName)
      .attr("fill", "#dbdce0");

    setAttributes(map, attrs);

    return map;
  }

  function calculateBubbleSize(datas: PointMapData[]) {
    const counts = datas.map((d) => d.count);
    const maxCount = Math.max(...counts);

    return datas
      .sort((a, b) => b.count - a.count)
      .map((d, i) => {
        const value = maxCount === 0 || d.count === 0 ? 0 : d.count / maxCount;

        const size = value < 0.1 ? 3 : value * 30;
        const result = size % 2 === 0 ? size : size + 1;

        return {
          ...d,
          size: result,
          index: i,
        };
      });
  }

  function createBubbles({
    svg,
    data,
    className,
    geometry,
    path,
    isSidoBubble = true,
  }: {
    svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
    data: BubbleMapData[];
    className: string;
    geometry: Feature<Geometry, GeometryProperties>[];
    path: d3.GeoPath<any, d3.GeoPermissibleObjects>;
    isSidoBubble?: boolean;
  }) {
    const totalCount = data
      .map((d) => d.count)
      .reduce((prev, cur) => prev + cur, 0);

    const bubbles = svg.selectAll("bubbles").data(data).enter().append("g");

    if (!isSidoBubble) {
      bubbles.style("display", "none");
    }

    // bubbles
    //   .append("circle")
    //   .attr("class", "russia-regions-map__pulse")
    //   .attr("origin-r", (d) => d.size)
    //   .attr("r", (d) => d.size)
    //   .attr("stroke", "#253FEB")
    //   .attr("stroke-opacity", "0.4")
    //   .attr("stroke-width", "1.5")
    //   .attr("origin-stroke-width", "1.5")
    //   .attr("fill", "#fff")
    //   .attr("fill-opacity", "0.3");

    bubbles
      .append("circle")
      .attr("class", className)
      .attr("origin-r", (d) => d.size)
      .attr("r", (d) => d.size)
      .attr("cx", function (d) {
        const bubble = findBubble(geometry, d);

        const [cx, cy] = path.centroid(bubble.geometry);
        this.setAttribute("cy", String(cy));

        const sibling = d3.select(this.previousElementSibling);
        sibling.attr("cx", cx);
        sibling.attr("cy", cy);
        sibling.attr("transform-origin", `${cx} ${cy}`);

        return cx;
      })
      .style("fill", "#253FEB")
      .attr("fill-opacity", "0.3")

      .on("mouseover", (event, d) => {
        handleBubbleMouseOver.call(event, d, totalCount);
      })
      .on("mousemove", handleBubbleMouseMove)
      .on("mouseout", handleBubleMouseOut);

    return bubbles;
  }

  function findBubble(
    geoData: Feature<Geometry, GeometryProperties>[],
    data: BubbleMapData
  ) {
    return geoData.find((feature) => feature.properties.id === data.id);
  }

  function handleBubbleMouseOver(
    event: any,
    data: BubbleMapData,
    totalCount: number
  ) {
    this.setAttribute("fill-opacity", "1");

    updateTooltipPosition(event.pageX, event.pageY);
  }

  function handleBubbleMouseMove(event: any) {
    updateTooltipPosition(event.pageX, event.pageY);
  }

  function handleBubleMouseOut() {
    this.setAttribute("fill-opacity", "0.3");
    const tooltip = d3.select(".russia-regions-map__tooltip");
    tooltip.style("opacity", 0);
  }

  function updateTooltipPosition(pageX: number, pageY: number) {
    const tooltip = d3.select(".russia-regions-map__tooltip");
    const [tooltipWidth] = tooltip.style("width").split("px");
    const width = Number(tooltipWidth);

    tooltip.style("display", "block");
    const scrollX =
      typeof window.scrollX === "number" ? window.scrollX : window.pageXOffset;
    const isMousePointerOverflow =
      window.innerWidth + scrollX - pageX < width + 40;
    const offsetX = isMousePointerOverflow
      ? pageX - scrollX - width + 40
      : pageX - scrollX + 10;

    tooltip
      .style("left", offsetX + "px")
      .style("top", pageY + 20 + "px")
      .style("opacity", 1);
  }

  function createZoom({
    g,
    sidoBubbles,
  }: {
    g: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
    sidoBubbles: d3.Selection<SVGGElement, BubbleMapData, SVGGElement, unknown>;
    sidoMap: d3.Selection<SVGPathElement, unknown, SVGGElement, unknown>;
  }) {
    return d3
      .zoom()
      .scaleExtent([1, 80])
      .translateExtent([
        [-100, -100],
        [width + 100, height + 100],
      ])
      .on("zoom", (event) => {
        const { x, y, k: scale } = event.transform;
        g.attr("transform", event.transform);
        resizeBubbles({ bubbles: sidoBubbles, x, y, scale });
      });
  }

  function resizeBubbles({
    bubbles,
    x,
    y,
    scale,
  }: {
    bubbles: d3.Selection<SVGGElement, BubbleMapData, SVGGElement, unknown>;
    x: number;
    y: number;
    scale: number;
  }) {
    bubbles.attr("transform", `translate(${x}, ${y}) scale(${scale})`);
    const circles = bubbles.selectAll<SVGCircleElement, BubbleMapData>(
      "circle"
    );
    circles.each(function () {
      const self = this as SVGCircleElement;
      const r = parseFloat(self.getAttribute("origin-r") || "0");
      self.setAttribute("r", (r / scale).toString());
      const strokeWidth = parseFloat(
        self.getAttribute("origin-stroke-width") || "0"
      );
      self.setAttribute("stroke-width", (strokeWidth / scale).toString());
    });
  }

  function addZoomEventToButton(
    svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
    zoom: d3.ZoomBehavior<Element, unknown>
  ) {
    d3.select(".russia-bubble-map__zoom-in").on("click", function () {
      const inNum = zoomStep.current === 0 ? 15 : 80;
      zoom.scaleTo(svg.transition().duration(200), inNum);
    });
    d3.select(".russia-bubble-map__zoom-out").on("click", function () {
      const outNum = zoomStep.current === 2 ? 15 : 1;
      zoom.scaleTo(svg.transition().duration(200), outNum);
    });
  }

  const renderZoomButton = () => {
    return (
      <div className="btn-area visible">
        <Button className="russia-bubble-map__zoom-in" icon="pi pi-plus" />

        <Button className="russia-bubble-map__zoom-out" icon="pi pi-minus" />
      </div>
    );
  };

  useEffect(() => {
    draw();
  }, []);

  return (
    <div className="russia-regions-map">
      <svg className="w-full h-full" ref={svgRef} width="100%" height="100%" />
    </div>
  );
};

export default MapComponent;
