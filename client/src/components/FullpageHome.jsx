import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import './fullpage.css';

const FullpageHome = () => (
	<ReactFullpage
		scrollingSpeed={800}
		navigation
		anchors={['intro', 'projects', 'skills', 'experiences', 'gallery']}
		render={({ fullpageApi }) => {
			return (
				<ReactFullpage.Wrapper>
					<div className="section intro">
						<h1>👋 반갑습니다!</h1>
						<p>프론트엔드 포트폴리오에 오신 걸 환영합니다.</p>
					</div>

					<div className="section projects">
						<h2>📁 주요 프로젝트</h2>
						<p>개발했던 주요 프로젝트들을 소개합니다.</p>
					</div>

					<div className="section skills">
						<h2>🛠 사용 기술</h2>
						<p>React, CSS, JavaScript 등 다양한 기술 스택을 사용합니다.</p>
					</div>

					<div className="section experiences">
						<h2>💼 업무 경험</h2>
						<p>그동안의 커리어를 정리해놓았습니다.</p>
					</div>

					<div className="section gallery">
						<h2>📷 갤러리</h2>
						<p>프로젝트 관련 이미지나 자료들을 모아두었습니다.</p>
					</div>
				</ReactFullpage.Wrapper>
			);
		}}
	/>
);

export default FullpageHome;
