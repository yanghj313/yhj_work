import React from 'react';
import '../assets/css/SubHeader.css';

const SubHeader = ({ title = '서브페이지 타이틀', backgroundImage }) => {
	return (
		<header className="sub-header-simple" style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}>
			<h1 className="sub-header-title">{title}</h1>

			{/* 파도 SVG */}
			<div className="svg-wave">
				<svg viewBox="0 0 1440 320" preserveAspectRatio="none">
					<path
						fill="url(#grad)"
						fillOpacity="1"
						d="M0,224L60,229.3C120,235,240,245,360,234.7C480,224,600,192,720,176C840,160,960,160,1080,170.7C1200,181,1320,203,1380,213.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
					/>
					<defs>
						<linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="#6bd4e1" />
							<stop offset="100%" stopColor="#1b82a7" />
						</linearGradient>
					</defs>
				</svg>
			</div>
		</header>
	);
};

export default SubHeader;
