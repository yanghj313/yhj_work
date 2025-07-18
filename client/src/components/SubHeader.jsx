import React from 'react';
import '../assets/css/SubHeader.css';

const SubHeader = ({ title = '서브 타이틀', backgroundImage }) => {
	return (
		<header className="subTop" style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}>
			<h1 className="sub-header-title">{title}</h1>
		</header>
	);
};

export default SubHeader;
