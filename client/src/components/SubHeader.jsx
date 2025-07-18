import React from 'react';
import '../assets/css/SubHeader.css';

const SubHeader = ({ title = '노을 파도', backgroundImage }) => {
	return (
		<header className="sub-header-simple" style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}>
			<h1 className="sub-header-title">{title}</h1>

			<div className="wave-wrapper">
				<svg className="wave-svg wave1" viewBox="0 0 1440 320" preserveAspectRatio="none">
					<path d="M0,160L60,176C120,192,240,224,360,213.3C480,203,600,149,720,138.7C840,128,960,160,1080,176C1200,192,1320,160,1380,144L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
				</svg>
				<svg className="wave-svg wave2" viewBox="0 0 1440 320" preserveAspectRatio="none">
					<path d="M0,192L80,186.7C160,181,320,171,480,176C640,181,800,203,960,192C1120,181,1280,139,1360,117.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" />
				</svg>
				<svg className="wave-svg wave3" viewBox="0 0 1440 320" preserveAspectRatio="none">
					<path d="M0,224L60,213.3C120,203,240,181,360,160C480,139,600,117,720,117.3C840,117,960,139,1080,154.7C1200,171,1320,181,1380,186.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
				</svg>
			</div>
		</header>
	);
};

export default SubHeader;
