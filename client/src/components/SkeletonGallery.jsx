import React from 'react';
import '../assets/css/skeleton.css';

const SkeletonGallery = () => {
	return (
		<div className="skeleton-gallery">
			{Array.from({ length: 12 }).map((_, index) => (
				<div key={index} className="skeleton-gallery-card">
					<div className="skeleton-image"></div>
					<div className="skeleton-content">
						<div className="skeleton-title"></div>
						<div className="skeleton-category"></div>
					</div>
				</div>
			))}
		</div>
	);
};

export default SkeletonGallery;
