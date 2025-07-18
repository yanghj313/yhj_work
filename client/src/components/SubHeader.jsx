import React from 'react';
import '../assets/css/SubHeader.css';

const SubHeader = ({ title = '서브 타이틀', backgroundImage }) => {
	return (
		<header className="sub-header-simple" style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}>
			<h1 className="sub-header-title">{title}</h1>

			<div className="wave-wrapper">
				<svg className="wave-svg wave1" viewBox="0 0 1440 320" preserveAspectRatio="none">
					<path d="M0,192 C240,320 480,0 720,192 C960,384 1200,64 1440,192 L1440,320 L0,320 Z" />
				</svg>
				<svg className="wave-svg wave2" viewBox="0 0 1440 320" preserveAspectRatio="none">
					<path d="M0,160 C240,288 480,64 720,160 C960,256 1200,32 1440,160 L1440,320 L0,320 Z" />
				</svg>
				<svg className="wave-svg wave3" viewBox="0 0 1440 320" preserveAspectRatio="none">
					<path d="M0,192 C240,320 480,96 720,192 C960,288 1200,128 1440,192 L1440,320 L0,320 Z" />
				</svg>
			</div>
		</header>
	);
};

export default SubHeader;
