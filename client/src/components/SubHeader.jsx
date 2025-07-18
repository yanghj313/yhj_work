import React from 'react';
import '../assets/css/SubHeader.css';

const SubHeader = ({ title = '서브 타이틀', backgroundImage }) => {
	return (
		<header className="sub-header-simple" style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}>
			<h1 className="sub-header-title">{title}</h1>

			{/* 아래가 곡선으로 마감된 파도 */}
			<div className="wave">
				<svg className="wave-layer" viewBox="0 0 1440 320" preserveAspectRatio="none">
					<path className="wave1" d="M0,160 C360,320 1080,0 1440,160 C1080,320 360,0 0,160 Z" />
				</svg>
				<svg className="wave-layer" viewBox="0 0 1440 320" preserveAspectRatio="none">
					<path className="wave2" d="M0,180 C360,300 1080,60 1440,180 C1080,300 360,60 0,180 Z" />
				</svg>
				<svg className="wave-layer" viewBox="0 0 1440 320" preserveAspectRatio="none">
					<path className="wave3" d="M0,200 C360,280 1080,120 1440,200 C1080,280 360,120 0,200 Z" />
				</svg>
			</div>
		</header>
	);
};

export default SubHeader;
