import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

function ChartD3JS() {
  const chartRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get('/budget.json');
      const budgetData = res.data.budget;

      const labels = budgetData.map(item => item.title);
      const data = budgetData.map(item => item.budget);

      return labels.map((label, i) => ({
        label: label,
        value: parseInt(data[i], 10),
      }));
    };

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', 340)
      .attr('height', 450)
      .append('g')
      .attr('transform', `translate(${340 / 2},${450 / 2})`);

    const width = 340,
      height = 450,
      radius = Math.min(width, height) / 4;

    const pie = d3
      .pie()
      .sort(null)
      .value((d) => d.value);

    const arc = d3
      .arc()
      .outerRadius(radius * 0.8)
      .innerRadius(radius * 0.4);

    const outerArc = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    const color = d3
      .scaleOrdinal()
      .domain([
        'Lorem ipsum',
        'dolor sit',
        'amet',
        'consectetur',
        'adipisicing',
        'elit',
        'sed',
        'do',
        'eiusmod',
        'tempor',
        'incididunt',
      ])
      .range([
        '#98abc5',
        '#8a89a6',
        '#7b6888',
        '#6b486b',
        '#a05d56',
        '#d0743c',
        '#ff8c00',
      ]);

    const drawChart = async () => {
      const data = await getData();

      /* ------- PIE SLICES ------- */
      const slices = svg
        .selectAll('path.slice')
        .data(pie(data), (d) => d.data.label);

      slices
        .enter()
        .append('path')
        .attr('class', 'slice')
        .style('fill', (d) => color(d.data.label))
        .transition()
        .duration(1000)
        .attrTween('d', function (d) {
          this._current = this._current || d;
          const interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return (t) => arc(interpolate(t));
        });

      slices
        .transition()
        .duration(1000)
        .attrTween('d', function (d) {
          const interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return (t) => arc(interpolate(t));
        });

      slices.exit().remove();

      /* ------- TEXT LABELS ------- */
      const text = svg.selectAll('text').data(pie(data), (d) => d.data.label);

      text
        .enter()
        .append('text')
        .attr('dy', '.35em')
        .text((d) => d.data.label)
        .transition()
        .duration(1000)
        .attrTween('transform', function (d) {
          const interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return (t) => {
            const d2 = interpolate(t);
            const pos = outerArc.centroid(d2);
            pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
            return `translate(${pos})`;
          };
        })
        .styleTween('text-anchor', function (d) {
          const interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return (t) => {
            const d2 = interpolate(t);
            return midAngle(d2) < Math.PI ? 'start' : 'end';
          };
        });

      text.exit().remove();

      /* ------- SLICE TO TEXT POLYLINES ------- */
      const polyline = svg.selectAll('polyline').data(pie(data), (d) => d.data.label);

      polyline
        .enter()
        .append('polyline')
        .transition()
        .duration(1000)
        .attrTween('points', function (d) {
          const interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return (t) => {
            const d2 = interpolate(t);
            const pos = outerArc.centroid(d2);
            pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
            return [arc.centroid(d2), outerArc.centroid(d2), pos];
          };
        });

      polyline.exit().remove();
    };

    const midAngle = (d) => d.startAngle + (d.endAngle - d.startAngle) / 2;

    drawChart();

    return () => {
      d3.select(chartRef.current).selectAll('*').remove();
    };
  }, []);

  return <div id="d3Chart" ref={chartRef}></div>;

}

export default ChartD3JS;
