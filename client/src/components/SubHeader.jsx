import React from 'react';
import '../assets/css/SubHeader.css';

const SubHeader = ({ title = '서브 타이틀', backgroundImage }) => {
	return (
		<header className="sub-header-simple" style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}>
			<h1 className="sub-header-title">{title}</h1>

			<div className="multi-wave-wrapper">
				<svg className="wave wave-back" viewBox="0 0 1440 320" preserveAspectRatio="none">
					<path
						fill="#b1d4e0"
						fillOpacity="1"
						d="M0,96L60,112C120,128,240,160,360,186.7C480,213,600,235,720,213.3C840,192,960,128,1080,122.7C1200,117,1320,171,1380,197.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
					></path>
				</svg>
				<svg className="wave wave-mid" viewBox="0 0 1440 320" preserveAspectRatio="none">
					<path
						fill="#5db7de"
						fillOpacity="0.7"
						d="M0,160L80,149.3C160,139,320,117,480,138.7C640,160,800,224,960,213.3C1120,203,1280,117,1360,74.7L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
					></path>
				</svg>
				<svg className="wave wave-front" viewBox="0 0 1440 320" preserveAspectRatio="none">
					<path
						fill="#1e81ce"
						fillOpacity="1"
						d="M0,192L80,181.3C160,171,320,149,480,133.3C640,117,800,107,960,128C1120,149,1280,203,1360,229.3L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
					></path>
				</svg>
			</div>
		</header>
	);
};

export default SubHeader;
