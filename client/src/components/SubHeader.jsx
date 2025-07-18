import React from 'react';
import '../assets/css/SubHeader.css';

const SubHeader = ({ title = '서브 타이틀', backgroundImage }) => {
	return (
		<header className="subTop" style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}>
			<h1 className="sub-header-title">{title}</h1>

			{/* 상단 SVG 파도 */}
			<div className="wave_before">
				<svg className="gnb_wave" viewBox="0 24 150 28" preserveAspectRatio="none">
					<defs>
						<path
							id="gentle-wave"
							d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 
              88 18v44h-352z"
						/>
					</defs>
					<g className="parallax">
						<use xlinkHref="#gentle-wave" x="50" y="6" fill="rgba(255,163,100,0.6)" />
					</g>
				</svg>
			</div>

			{/* 하단 SVG 파도 (180도 회전) */}
			<div className="wave_after">
				<svg className="gnb_wave" viewBox="0 24 150 28" preserveAspectRatio="none" style={{ transform: 'rotate(180deg)' }}>
					<defs>
						<path
							id="gentle-wave"
							d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 
              88 18v44h-352z"
						/>
					</defs>
					<g className="parallax">
						<use xlinkHref="#gentle-wave" x="50" y="6" fill="rgba(255,85,70,0.6)" />
					</g>
				</svg>
			</div>
		</header>
	);
};

export default SubHeader;
