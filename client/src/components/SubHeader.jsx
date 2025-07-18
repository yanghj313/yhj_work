import React from 'react';
import '../assets/css/SubHeader.css';

const SubHeader = ({ title = '서브페이지 타이틀', backgroundImage }) => {
	return (
		<header className="sub-header-simple" style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}>
			<h1 className="sub-header-title">{title}</h1>

			<div className="svg-waves">
				<div className="wave wave1"></div>
				<div className="wave wave2"></div>
			</div>
		</header>
	);
};

export default SubHeader;
