import React from 'react';
import '../assets/css/SubHeader.css';

const SubHeader = ({ title = '서브 타이틀', backgroundImage }) => {
	return (
		<header className="subTop" style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}>
			<h1 className="sub-header-title">{title}</h1>

			{/* 한 겹 파도 */}
			<div className="wave_one">
				<svg className="gnb_wave" viewBox="0 24 150 28" preserveAspectRatio="none">
					<defs>
						<path
							id="gentle-wave"
							d="M-160 44c30 0 
                58-18 88-18s
                58 18 88 18 
                58-18 88-18 
                58 18 88 18
                v44h-352z"
						/>
					</defs>
					<g className="parallax">
						<use xlinkHref="#gentle-wave" x="50" y="6" fill="#ff5722" />
					</g>
				</svg>
			</div>
		</header>
	);
};

export default SubHeader;
