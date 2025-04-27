import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageModal = ({ images, startIndex, onClose }) => {
	const settings = {
		initialSlide: startIndex,
		dots: true,
		infinite: true,
		arrows: true,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content" onClick={e => e.stopPropagation()}>
				<button className="modal-close" onClick={onClose}>
					X
				</button>
				<Slider initialSlide={currentSlide} slidesToShow={1} slidesToScroll={1} infinite={true} arrows={true} dots={true} speed={500}>
					{selected.images.map((img, idx) => (
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
