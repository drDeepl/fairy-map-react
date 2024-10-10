import React, {
  useEffect,
  useCallback,
  useState,
  useRef,
  ReactNode,
} from "react";
import * as d3 from "d3";
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
  width: number;
  height: number;
  data: RussiaMapData;
  countLabel?: string;
  countPostfix?: string;
  percentLabel?: string;
  customTooltip?(params: TooltipProps): ReactNode;
}

const MapComponent: React.FC<BubbleMapConfigProps> = ({
  width,
  height,
  data,
  countLabel = "인원",
  countPostfix = "명",
  percentLabel = "비율",
  customTooltip,
}: BubbleMapConfigProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const zoomStep = useRef<number>(0);

  const [plusBtnDisabled, setPlusBtnDisabled] = useState<boolean>(false);
  const [minusBtnDisabled, setMinusBtnDisabled] = useState<boolean>(true);

  const [name, setName] = useState<string>("");
  const [count, setCount] = useState<number>(null);
  const [percent, setPercent] = useState<number>(null);

  const draw = async () => {
    // const svg = d3
    //   .select(".react-russia-bubble-map")
    //   .select("svg") as d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
    console.log("DRAW MAP");

    // if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove();

    const g = svg.append("g");

    // const { sidoGeometry } = await convertTopojsonToGeoData();
    const russiaMap = topojson.feature(
      koreaSidoMap,
      koreaSidoMap.objects["map"] as GeometryCollection<GeometryProperties>
    );

    const sidoGeometry = russiaMap.features;

    const path = createPath(sidoGeometry);

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

    addZoomEventToButton(svg, zoom);
  };

  async function convertTopojsonToGeoData() {
    const koreaSidoMap = await importTopoJsonLazy();

    const sidoGeometry = topojson.feature(
      koreaSidoMap,
      koreaSidoMap.objects["map"] as GeometryCollection<GeometryProperties>
    );

    return {
      sidoGeometry: sidoGeometry.features,
    };
  }

  async function importTopoJsonLazy() {
    const russiaMap = fetch("/map12.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data as unknown;
      }) as Promise<Topology>;

    return await russiaMap;
  }

  function createPath(geometry: Feature<Geometry, GeometryProperties>[]) {
    const projection = d3
      .geoMercator()
      .fitSize([width, height], {
        type: "FeatureCollection",
        features: geometry,
      })
      .rotate([-180, 0])
      .center([-80, 0])
      .precision(0.3);
    return d3.geoPath().projection(projection);
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
      .append("g")
      .attr("class", className)
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
    console.log("CREATE BUBBLES");
    const totalCount = data
      .map((d) => d.count)
      .reduce((prev, cur) => prev + cur, 0);

    const bubbles = svg.selectAll("bubbles").data(data).enter().append("g");
    // .append("g");

    if (!isSidoBubble) {
      bubbles.style("display", "none");
    }

    // bubbles
    //   .append("circle")
    //   .attr("class", "react-russia-bubble-map__pulse")
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

      .on("mouseover", function (event, d) {
        handleBubbleMouseOver.call(this, event, d, totalCount);
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

    setName(data.name);
    setCount(data.count);
    setPercent(Math.floor((data.count / totalCount) * 100));
  }

  function handleBubbleMouseMove(event: any) {
    updateTooltipPosition(event.pageX, event.pageY);
  }

  function handleBubleMouseOut() {
    this.setAttribute("fill-opacity", "0.3");
    const tooltip = d3.select(".react-russia-bubble-map__tooltip");
    tooltip.style("opacity", 0);
  }

  function updateTooltipPosition(pageX: number, pageY: number) {
    const tooltip = d3.select(".react-russia-bubble-map__tooltip");
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
    sidoMap,
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

        if (scale < 14) {
          resizeBubbles({ bubbles: sidoBubbles, x, y, scale });
          setAttributes(sidoMap, {
            "stroke-opacity": "1",
            "fill-opacity": "1",
          });

          sidoBubbles.style("display", "block");

          zoomStep.current = 0;
          setMinusBtnDisabled(scale === 1);
        } else if (scale >= 14 && scale < 46) {
          setAttributes(sidoMap, {
            "stroke-opacity": "0",
            "fill-opacity": "0",
          });

          sidoBubbles.style("display", "none");

          zoomStep.current = 1;
        } else {
          setAttributes(sidoMap, {
            "stroke-opacity": "0",
            "fill-opacity": "0",
          });

          sidoBubbles.style("display", "none");

          zoomStep.current = 2;
          setPlusBtnDisabled(scale === 80);
        }
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
    const circles = bubbles.selectAll("circle");
    circles.each(function () {
      const self = this as any;
      const r = self.getAttribute("origin-r");
      self.setAttribute("r", `${r / scale}`);
      const strokeWidth = self.getAttribute("origin-stroke-width");
      self.setAttribute("stroke-width", `${strokeWidth / scale}`);
    });
  }

  function addZoomEventToButton(
    svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
    zoom: d3.ZoomBehavior<Element, unknown>
  ) {
    d3.select(".react-russia-buble-map__zoom-in").on("click", function () {
      const inNum = zoomStep.current === 0 ? 15 : 80;
      zoom.scaleTo(svg.transition().duration(200), inNum);
    });
    d3.select(".react-russia-buble-map__zoom-out").on("click", function () {
      const outNum = zoomStep.current === 2 ? 15 : 1;
      zoom.scaleTo(svg.transition().duration(200), outNum);
    });
  }

  function renderTooltip() {
    if (customTooltip) {
      return customTooltip({
        name,
        count,
        percent,
      });
    }

    return (
      <>
        <strong>{name}</strong>
        <div>
          <span>{countLabel}</span>
          <span>
            {count}
            {countPostfix}
          </span>
        </div>
        <div>
          <span>{percentLabel}</span>
          <span>{percent}%</span>
        </div>
      </>
    );
  }

  function renderZoomButton() {
    return (
      <div className="btn-area visible">
        <Button className="react-russia-buble-map__zoom-in" icon="pi pi-plus" />

        <Button
          className="react-russia-buble-map__zoom-out"
          icon="pi pi-minus"
        />
      </div>
    );
  }

  useEffect(() => {
    draw().catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <div className="react-russia-bubble-map" style={{ width, height }}>
      <svg ref={svgRef} width={width} height={height} />
      <div className="react-russia-bubble-map__tooltip">{renderTooltip()}</div>
      {renderZoomButton()}
    </div>
  );
};

export default MapComponent;
