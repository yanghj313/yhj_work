import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import Splitting from 'splitting';
import 'splitting/dist/splitting.css';

const interests = [
	{ name: '코딩', value: 80 },
	{ name: 'UI/UX 디자인', value: 70 },
	{ name: '영화', value: 60 },
	{ name: '독서', value: 55 },
	{ name: '러닝', value: 50 },
	{ name: '필라테스', value: 45 },
	{ name: '여행', value: 65 },
	{ name: '다이어리 꾸미기', value: 40 },
	{ name: '카메라', value: 50 },
	{ name: '패션', value: 60 },
];

const InterestBubbleChart = () => {
	const svgRef = useRef();
	const wrapperRef = useRef();
	const [dimensions, setDimensions] = useState({ width: 600, height: 600 });

	useEffect(() => {
		const resizeObserver = new ResizeObserver(entries => {
			for (let entry of entries) {
				const { width, height } = entry.contentRect;
				setDimensions({ width, height });
			}
		});
		if (wrapperRef.current) resizeObserver.observe(wrapperRef.current);
		return () => resizeObserver.disconnect();
	}, []);

	useEffect(() => {
		const { width, height } = dimensions;

		const svg = d3.select(svgRef.current).attr('width', width).attr('height', height);

		const simulation = d3
			.forceSimulation(interests)
			.force('charge', d3.forceManyBody().strength(5))
			.force('center', d3.forceCenter(width / 2, height / 2))
			.force(
				'collision',
				d3.forceCollide().radius(d => d.value / 2 + 4)
			)
			.on('tick', ticked);

		const node = svg
			.selectAll('g')
			.data(interests)
			.join('g')
			.call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended))
			.style('cursor', 'pointer')
			.on('click', (event, d) => alert(`${d.name} 클릭됨!`));

		node
			.selectAll('circle')
			.data(d => [d])
			.join('circle')
			.attr('r', d => d.value / 2)
			.attr('fill', '#6EC6CA')
			.attr('stroke', '#333')
			.attr('stroke-width', 1.5);

		node
			.selectAll('text')
			.data(d => [d])
			.join('text')
			.text(d => d.name)
			.attr('text-anchor', 'middle')
			.attr('dy', '.35em')
			.style('fill', '#fff')
			.style('font-size', d => Math.min(d.value / 5, 14));

		function ticked() {
			node.attr('transform', d => `translate(${d.x},${d.y})`);
		}

		function dragstarted(event, d) {
			if (!event.active) simulation.alphaTarget(0.3).restart();
			d.fx = d.x;
			d.fy = d.y;
		}

		function dragged(event, d) {
			d.fx = event.x;
			d.fy = event.y;
		}

		function dragended(event, d) {
			if (!event.active) simulation.alphaTarget(0);
			d.fx = null;
			d.fy = null;
		}
	}, [dimensions]);

	useEffect(() => {
		const titleEl = document.querySelector('[data-splitting]');
		if (titleEl && !titleEl.classList.contains('splitting')) {
			Splitting({ target: titleEl, by: 'chars' });
		}
	}, []);

	return (
		<div ref={wrapperRef} className="bubble-chart" style={{ textAlign: 'center', padding: '2rem', width: '100%', height: '100%' }}>
			<h1 className={`text text--rolling`} data-splitting>
				Interest
			</h1>
			<svg ref={svgRef}></svg>
		</div>
	);
};

export default InterestBubbleChart;
