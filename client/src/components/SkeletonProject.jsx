import React from 'react';
import '../assets/css/skeleton.css';

const SkeletonProject = () => {
	return (
		<div className="skeleton-project">
			<ul>
				{Array.from({ length: 9 }).map((_, index) => (
					<li key={index} className="skeleton-project-card">
						<div className="skeleton-media-container">
							<div className="skeleton-thumbnail"></div>
						</div>
						<strong className="skeleton-project-title">
							<div className="skeleton-title-text"></div>
						</strong>
						<br />
						<div className="skeleton-role"></div>
						<div className="skeleton-period"></div>
						<div className="skeleton-tags">
							<div className="skeleton-tag"></div>
							<div className="skeleton-tag"></div>
							<div className="skeleton-tag"></div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default SkeletonProject;
