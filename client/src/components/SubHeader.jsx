import React from 'react';
import '../assets/css/SubHeader.css';

const SubHeader = ({ title = '서브 타이틀', backgroundImage }) => {
	return (
		<header className="sub-header-simple" style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}>
			<h1 className="sub-header-title">{title}</h1>

			<div className="multi-wave-wrapper">
				<div className="wave wave-back"></div>
				<div className="wave wave-mid"></div>
				<div className="wave wave-front"></div>
			</div>
		</header>
	);
};

export default SubHeader;
