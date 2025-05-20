import React from 'react';
import '../assets/css/SubHeader.css';

const SubHeader = ({ title = '서브페이지 타이틀', backgroundImage = '/img/main_img/onsen_bg.jpg' }) => {
	return (
		<header className="sub-header-simple" style={{ backgroundImage: `url(${backgroundImage})` }}>
			<h1 className="sub-header-title">{title}</h1>
		</header>
	);
};

export default SubHeader;
