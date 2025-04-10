import { useEffect, useState } from 'react';
import { getGalleries } from './api';

const GalleryList = () => {
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    getGalleries().then(setGalleries);
  }, []);

  return (
    <div>
      <h2>🖼️ 갤러리</h2>
      <ul>
        {galleries.map((g) => (
          <li key={g.id}>{g.attributes.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default GalleryList;
