import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

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

	useEffect(() => {
		const diameter = 600;
		const svg = d3.select(svgRef.current).attr('width', diameter).attr('height', diameter);

		const root = d3.hierarchy({ children: interests }).sum(d => d.value);
		const pack = d3.pack().size([diameter, diameter]).padding(5);
		const nodes = pack(root).leaves();

		const group = svg
			.selectAll('g')
			.data(nodes)
			.join('g')
			.attr('transform', d => `translate(${d.x},${d.y})`);

		group
			.append('circle')
			.attr('r', d => d.r)
			.attr('fill', '#6EC6CA')
			.attr('stroke', '#333')
			.on('click', (event, d) => alert(`${d.data.name} 클릭됨!`));

		group
			.append('text')
			.text(d => d.data.name)
			.attr('text-anchor', 'middle')
			.attr('dy', '.3em')
			.style('font-size', d => Math.min(d.r / 3, 16))
			.style('fill', '#fff');
	}, []);

	return (
		<div style={{ textAlign: 'center' }}>
			<svg ref={svgRef}></svg>
		</div>
	);
};

export default InterestBubbleChart;
