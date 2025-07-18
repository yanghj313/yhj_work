import React from 'react';
import '../assets/css/SubHeader.css';

const SubHeader = ({ title = '서브 타이틀', backgroundImage }) => {
	return (
		<header className="sub-header-simple" style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}>
			<h1 className="sub-header-title">{title}</h1>

			{/* 주황빛 3겹 파도 */}
			<div className="wave">
				<svg className="gnb_wave" viewBox="0 0 1200 100" preserveAspectRatio="none">
					<defs>
						<path
							id="gentle-wave"
							d="
								M0,30 
								C150,90 350,-30 600,30 
								C850,90 1050,-30 1200,30 
								L1200,100 L0,100 Z"
						/>
					</defs>
					<g className="parallax">
						<use href="#gentle-wave" fill="rgba(255,163,100,0.3)" className="wave1" />
						<use href="#gentle-wave" fill="rgba(255,122,89,0.5)" className="wave2" />
						<use href="#gentle-wave" fill="rgba(255,85,70,0.8)" className="wave3" />
					</g>
				</svg>
			</div>
		</header>
	);
};

export default SubHeader;
