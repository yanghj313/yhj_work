import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGalleries } from '../api';

const GalleryDetail = () => {
  const { id } = useParams();
  const [gallery, setGallery] = useState(null);

  useEffect(() => {
    if (id) {
      getGalleries().then((galleries) => {
        const found = galleries.find((g) => g.id === parseInt(id));
        setGallery(found);
      });
    }
  }, [id]);

  if (!gallery) return <p>Loading...</p>;

  const { title, description } = gallery.attributes;

  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default GalleryDetail;
