import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import russiaTopojson from "./map12.json";
import * as topojson from "topojson-client";
import { Feature } from "geojson";
const MapComponent: React.FC = () => {
  const svgRef = useRef(null);
  const [width, setWidth] = useState<Number>(window.innerWidth);
  const [height, setHeight] = useState<Number>(window.innerHeight);

  const drawMap = () => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);

      svg.selectAll("*").remove();

      const geoData = topojson.feature(
        russiaTopojson as any,
        russiaTopojson.objects.map as any
      );

      const projection = d3
        .geoMercator()
        .fitSize([width, height], geoData)
        .rotate([-100, 0])
        .precision(0.3);

      const path = d3.geoPath().projection(projection) as any;

      const mapGroup = svg.append("g");

      const zoom = d3
        .zoom()
        .scaleExtent([1, 8])
        .on("zoom", (event) => {
          mapGroup.attr("transform", event.transform);
        });

      mapGroup
        .append("g")
        .selectAll("path")
        .data(geoData.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "#ccc")
        .attr("stroke", "#fff")
        .on("click", function (event, d) {
          const [[x0, y0], [x1, y1]] = path.bounds(d);
          event.stopPropagation();
          svg
            .transition()
            .duration(750)
            .call(
              zoom.transform,
              d3.zoomIdentity
                .translate(width / 2, height / 2)
                .scale(
                  Math.min(
                    8,
                    0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)
                  )
                )
                .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
            );
          d3.select(this).attr("fill", "#F00");
        });

      mapGroup
        .append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "url(#map-gradient)")
        .style("opacity", 0.6)
        .attr("mask", "url(#map-mask)");

      svg.call(zoom);
    }
  };

  useEffect(() => {
    drawMap();
  }, [width]);

  return <svg ref={svgRef} width={width - 50} height={height - 110}></svg>;
};

export default MapComponent;
