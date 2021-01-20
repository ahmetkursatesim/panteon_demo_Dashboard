import React, {useContext, useEffect, useState,useRef} from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";
import "./style.css";
import { area } from "d3";
import Context from "../config/context";
import debounce from "lodash/debounce";


function useResize(ref) {
    const [state, setState] = useState();
    useEffect(() => {
        const getSize = debounce(() => {
            if (!ref || !ref.current) {
                return;
            }
            const width = ref.current.offsetWidth;
            const height = ref.current.offsetHeight;
            setState({
                width,
                height
            });
        }, 150);
        window.addEventListener("resize", getSize);
        getSize();
        return () => window.removeEventListener("resize", getSize);
    }, [ref]);

    return state;
}


const  ChartContainer = () => {

    const context = useContext(Context);
    const {rankHistory,getRankHistory} = context;
    const rootRef = useRef(null);
    const size = useResize(rootRef);
    useEffect(() => {
        getRankHistory()
        if (!size || !rankHistory) {
            return;
        }
        let { width, height } = size;
        width=width*90/100
        height=height*80/100
        let margin =50;
        let lineOpacity = "0.50";
        let lineOpacityHover = "1";
        let otherLinesOpacityHover = "0.1";
        let lineStroke = "2px";
        let circleOpacity = "0.85";
        let circleOpacityOnLineHover = "0.25";
        let data=rankHistory
        let parseDate = d3.timeParse("%Y-%m-%d");
        let timeFormat = d3.timeFormat("%B %d");
        let bisectDate = d3.bisector(function(d) { return d.date; }).left;
        data.forEach(function (d) {
            d.values.forEach(function (d) {
                d.date = typeof(d.date)=="string"?parseDate(d.date):d.date;
                d.rank = d.rank;

            });
        });

        var xScale = d3
            .scaleTime()
            .domain(d3.extent(data[0].values, (d) => d.date))
            .range([0, width - margin]);

        var yScale = d3
            .scaleLinear()
            .domain([0, d3.max(data[0].values, (d) => d.rank)])
            .range([height - margin, 0]);
        var color = d3.scaleOrdinal(d3.schemeCategory10);
        d3.selectAll("g")
            .remove();
        var svg = d3
            .select("#chart2")
            .append("g")
            .attr("transform", `translate(${margin}, ${25})`)
            .on("mouseleave",function (){
                d3.selectAll(".dot")
                    .remove();
                d3.selectAll(".line").style("opacity", lineOpacity);
                d3.selectAll(".circle").style("opacity", circleOpacity);
                d3.select(this)
                    .style("stroke-width", lineStroke)
                d3.selectAll(".area")
                    .remove();
                d3.selectAll(".areas")
                    .remove();
            })
            .on("touchend",function (){
                d3.selectAll(".dot")
                    .remove();
                d3.selectAll(".line").style("opacity", lineOpacity);
                d3.selectAll(".circle").style("opacity", circleOpacity);
                d3.select(this)
                    .style("stroke-width", lineStroke)
                d3.selectAll(".area")
                    .remove();
                d3.selectAll(".areas")
                    .remove();
            })
        var line = d3.line().x((d) => xScale(d.date)).y((d) => yScale(d.rank));
        var div = d3.select("body").append("div")
            .attr("class", "tooltip sb9")
            .style("display", "none");
        let lines = svg.append("g").attr("class", "lines");

        lines
            .selectAll(".line-group")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "line-group")
            .append("path")
            .attr("class", "line")
            .attr("d", (d) => line(d.values))
            .style("stroke", (d, i) => color(i))
            .style("opacity", lineOpacity)
            .on("mousemove",function (d,i){
                d3.selectAll(".line").style("opacity", otherLinesOpacityHover);
                d3.selectAll(".circle").style("opacity", circleOpacityOnLineHover);
                d3.selectAll(".line").style("opacity", lineOpacity);
                d3.selectAll(".circle").style("opacity", circleOpacity);
                d3.select(this)
                    .style("stroke-width", lineStroke)
                d3.selectAll(".area")
                    .remove();
                d3.selectAll(".areas")
                    .remove();
                var colorSpecial=color(i);
                d3.selectAll(".dot")
                    .remove();
                var areaGenerator =d3.area()
                    .x(function(d) { return xScale(d.date) })
                    .y0(yScale(0))
                    .y1(function(d) { return yScale(d.rank) })
                let areas = svg.append("g").attr("class", "areas");
                areas.selectAll(".area-group")
                    .data(d)
                    .enter()
                    .append("g")
                    .attr("class", "area-group")
                    .append("path")
                    .attr("class", "area")
                    .attr("d", d => areaGenerator(d.values))
                svg
                    .append("g")
                    .append("path")
                    .attr("class", "area")
                    .datum(d)
                    .style("fill", colorSpecial)
                    .style("opacity",0.25)
                    .attr("d", d => areaGenerator(d.values));
                d3.select(this)
                    .style("opacity", lineOpacityHover)
                const dot = svg.append("g").attr("class","dot").attr("display", "");
                dot.append("circle").data(data).attr("r", 6).style("fill", colorSpecial).style("stroke","#e5e5e5").style("stroke-width",5)
                    .on("mouseover", function(m) {
                        div.transition()
                            .style("display", "");
                        div.html(d.name + "<br/>"+timeFormat(d4.date)+":"+d4.rank)
                            .style("left", (d3.event.pageX-75) + "px")
                            .style("top", (d3.event.pageY -65) + "px");
                    })
                    .on("mouseout", function(d) {
                        div.transition()
                            .style("display", "none");
                    });

                var x0 = xScale.invert(d3.mouse(this)[0]),
                    i = bisectDate(d.values, x0, 1),
                    d0 = d.values[i - 1],
                    d1 = d.values[i],
                    d4 = x0 - d0.date > d1.date - x0 ? d1 : d0;
                dot.attr("transform", `translate(${xScale(d4.date)},${yScale(d4.rank)})`);


            })
            .on("touchmove",function (d,i){
                d3.selectAll(".line").style("opacity", otherLinesOpacityHover);
                d3.selectAll(".circle").style("opacity", circleOpacityOnLineHover);
                d3.selectAll(".line").style("opacity", lineOpacity);
                d3.selectAll(".circle").style("opacity", circleOpacity);
                d3.select(this)
                    .style("stroke-width", lineStroke)
                d3.selectAll(".area")
                    .remove();
                d3.selectAll(".areas")
                    .remove();
                var colorSpecial=color(i);
                d3.selectAll(".dot")
                    .remove();
                var areaGenerator =d3.area()
                    .x(function(d) { return xScale(d.date) })
                    .y0(yScale(0))
                    .y1(function(d) { return yScale(d.rank) })
                let areas = svg.append("g").attr("class", "areas");
                areas.selectAll(".area-group")
                    .data(d)
                    .enter()
                    .append("g")
                    .attr("class", "area-group")
                    .append("path")
                    .attr("class", "area")
                    .attr("d", d => areaGenerator(d.values))
                svg
                    .append("g")
                    .append("path")
                    .attr("class", "area")
                    .datum(d)
                    .style("fill", colorSpecial)
                    .style("opacity",0.25)
                    .attr("d", d => areaGenerator(d.values));
                d3.select(this)
                    .style("opacity", lineOpacityHover)
                const dot = svg.append("g").attr("class","dot").attr("display", "");
                dot.append("circle").data(data).attr("r", 6).style("fill", colorSpecial).style("stroke","#e5e5e5").style("stroke-width",5)
                    .on("touchstart", function(d) {
                        div.transition()
                            .style("display", "");
                        div	.html(d.name + "<br/>"  + d.close)
                            .style("left", (d3.event.pageX) + "px")
                            .style("top", (d3.event.pageY - 28) + "px");
                    })
                    .on("touchend", function(d) {
                        div.transition()
                            .style("display", "none");
                    });

                var x0 = xScale.invert(d3.mouse(this)[0]),
                    i = bisectDate(d.values, x0, 1),
                    d0 = d.values[i - 1],
                    d1 = d.values[i],
                    d4 = x0 - d0.date > d1.date - x0 ? d1 : d0;
                dot.attr("transform", `translate(${xScale(d4.date)},${yScale(d4.rank)})`);


            })
        var xAxis = d3.axisBottom(xScale).tickFormat(timeFormat).ticks(5);
        var yAxis = d3.axisLeft(yScale).ticks(5);


        svg
            .append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0, ${height - margin})`)
            .call(xAxis);
        svg
            .append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("y", 15)
            .attr("transform", "rotate(-90)")
            .attr("fill", "#fff")
            .text("Total values");


    }, [size])
    return (
        <div id="chart" className="chart-area" ref={rootRef}>
            {size && (
                <svg id="chart2" width={size.width} height={size.height}>

                </svg>
            )}

        </div>
    )
}
export default ChartContainer;






