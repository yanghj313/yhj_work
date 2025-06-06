import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/css/fullpage.css';

const ImageModal = ({ images, startIndex = 0, onClose }) => {
	const [isSwiping, setIsSwiping] = useState(false);

	const settings = {
		initialSlide: startIndex,
		dots: true,
		infinite: true,
		arrows: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 500,
		swipe: true,
		draggable: true,
		beforeChange: () => setIsSwiping(true),
		afterChange: () => setTimeout(() => setIsSwiping(false), 300),
	};

	const handleOverlayClick = () => {
		if (!isSwiping) {
			onClose();
		}
	};

	return (
		<div className="modal-overlay" onClick={handleOverlayClick}>
			<div className="modal-content" onClick={e => e.stopPropagation()}>
				<button className="modal-close" onClick={onClose}>
					X
				</button>
				<Slider {...settings}>
					{images.map((img, idx) => (
						<div key={idx} className="modal-slide-wrapper">
							<img src={img} alt={`slide-${idx}`} style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain' }} />
						</div>
					))}
				</Slider>
			</div>
		</div>
	);
};

export default ImageModal;
