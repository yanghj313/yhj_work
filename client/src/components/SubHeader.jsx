import React from 'react';
import '../assets/css/SubHeader.css';

const SubHeader = ({ title = '서브 타이틀', backgroundImage }) => {
	return (
		<header className="sub-header-simple" style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}>
			<h1 className="sub-header-title">{title}</h1>

			<div className="pic-wave-wrapper">
				<svg className="pic-wave" viewBox="0 0 1200 200" preserveAspectRatio="none">
					<defs>
						<linearGradient id="picWaveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="0%" stopColor="#6ec3f4" />
							<stop offset="100%" stopColor="#1e81ce" />
						</linearGradient>
					</defs>
					<path d="M0,100 C150,200 350,0 600,100 C850,200 1050,0 1200,100 L1200,200 L0,200 Z" fill="url(#picWaveGradient)" />
				</svg>
			</div>
		</header>
	);
};

export default SubHeader;
