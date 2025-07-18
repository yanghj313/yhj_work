import React from 'react';
import '../assets/css/SubHeader.css';

const SubHeader = ({ title = '서브 타이틀', backgroundImage }) => {
	return (
		<header className="sub-header-simple" style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}>
			<h1 className="sub-header-title">{title}</h1>

			{/* 곡선으로 상하 마감된 주황빛 SVG 파도 */}
			<div className="wave">
				<svg className="gnb_wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 100" preserveAspectRatio="none">
					<defs>
						<path
							id="gentle-wave"
							d="
                M-160 44
                C-130 44 -102 26 -72 26
                S-14 44 16 44
                S74 26 104 26
                S162 44 192 44
                S250 26 280 26
                S338 44 368 44
                S426 26 456 26
                S514 44 544 44

                C514 64 456 64 456 64
                S368 64 368 64
                S280 64 280 64
                S192 64 192 64
                S104 64 104 64
                S16 64 16 64
                S-72 64 -72 64
                S-160 64 -160 64
                Z"
						/>
					</defs>
					<g className="parallax">
						<use xlinkHref="#gentle-wave" x="0" y="0" fill="rgba(255, 163, 100, 0.3)" />
						<use xlinkHref="#gentle-wave" x="0" y="5" fill="rgba(255, 122, 89, 0.5)" />
						<use xlinkHref="#gentle-wave" x="0" y="10" fill="rgba(255, 85, 70, 0.8)" />
					</g>
				</svg>
			</div>
		</header>
	);
};

export default SubHeader;
