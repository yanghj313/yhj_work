import React from 'react';
import '../assets/css/SubHeader.css';

const SubHeader = ({ title = '서브 타이틀', backgroundImage }) => {
	return (
		<header className="sub-header-simple" style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}>
			<h1 className="sub-header-title">{title}</h1>

			{/* 주황빛 SVG 파도 (3겹) */}
			<div className="wave">
				<svg className="gnb_wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
					<defs>
						<path
							id="gentle-wave"
							d="
                M-160 44
                c30 0 58-18 88-18
                s58 18 88 18
                58-18 88-18
                58 18 88 18
                v44h-352z"
						/>
					</defs>
					<g className="parallax">
						<use xlinkHref="#gentle-wave" x="50" y="0" fill="rgba(255, 163, 100, 0.3)" />
						<use xlinkHref="#gentle-wave" x="50" y="3" fill="rgba(255, 122, 89, 0.5)" />
						<use xlinkHref="#gentle-wave" x="50" y="6" fill="rgba(255, 85, 70, 0.8)" />
					</g>
				</svg>
			</div>
		</header>
	);
};

export default SubHeader;
