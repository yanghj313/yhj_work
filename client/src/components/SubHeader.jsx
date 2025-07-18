import React from 'react';
import '../assets/css/SubHeader.css';

const SubHeader = ({ title = '노을지는 바다', backgroundImage }) => {
	return (
		<header className="sub-header-simple" style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}>
			<h1 className="sub-header-title">{title}</h1>

			<div className="wave-wrapper">
				<svg className="wave-svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
					<defs>
						<linearGradient id="sunsetWave" x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="0%" stopColor="#f9a76e" />
							<stop offset="50%" stopColor="#f46c5e" />
							<stop offset="100%" stopColor="#e76384" />
						</linearGradient>
					</defs>
					<path
						fill="url(#sunsetWave)"
						d="M0,224L60,197.3C120,171,240,117,360,101.3C480,85,600,107,720,112C840,117,960,107,1080,122.7C1200,139,1320,181,1380,202.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
					></path>
				</svg>
			</div>
		</header>
	);
};

export default SubHeader;
