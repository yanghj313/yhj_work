import React from 'react';
import '../assets/css/skeleton.css';

const SkeletonProject = () => {
	return (
		<div className="skeleton-project">
			{Array.from({ length: 9 }).map((_, index) => (
				<div key={index} className="skeleton-project-card">
					<div className="skeleton-media-container">
						<div className="skeleton-thumbnail"></div>
					</div>
					<div className="skeleton-project-title"></div>
				</div>
			))}
		</div>
	);
};

export default SkeletonProject;
