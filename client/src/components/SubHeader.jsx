import React from 'react';
import '../assets/css/SubHeader.css';

const SubHeader = ({ title = '서브 타이틀', backgroundImage }) => {
	return (
		<header className="sub-header-simple" style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}>
			<h1 className="sub-header-title">{title}</h1>

			<div className="wave-wrapper">
				<svg className="wave-svg wave1" viewBox="0 0 1440 320" preserveAspectRatio="none">
					<path d="M0,160 C240,320 480,0 720,160 C960,320 1200,0 1440,160 C1200,320 960,160 720,320 C480,480 240,160 0,320 Z" />
				</svg>
				<svg className="wave-svg wave2" viewBox="0 0 1440 320" preserveAspectRatio="none">
					<path d="M0,180 C240,300 480,60 720,180 C960,300 1200,60 1440,180 C1200,300 960,180 720,300 C480,420 240,180 0,300 Z" />
				</svg>
				<svg className="wave-svg wave3" viewBox="0 0 1440 320" preserveAspectRatio="none">
					<path d="M0,200 C240,280 480,120 720,200 C960,280 1200,120 1440,200 C1200,280 960,200 720,280 C480,360 240,200 0,280 Z" />
				</svg>
			</div>
		</header>
	);
};

export default SubHeader;
