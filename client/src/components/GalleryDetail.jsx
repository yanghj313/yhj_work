import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGalleryDetail } from './api';

const GalleryDetail = () => {
  const { id } = useParams();
  const [gallery, setGallery] = useState(null);

  useEffect(() => {
    if (id) getGalleryDetail(id).then(setGallery);
  }, [id]);

  if (!gallery) return <p>Loading...</p>;

  const { title, descripton } = gallery.attributes;

  return (
    <div>
      <h2>{title}</h2>
      <p>{descripton}</p>
    </div>
  );
};

export default GalleryDetail;
