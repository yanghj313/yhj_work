import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getGalleries } from '../api';

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
          <li key={g.id}>
            <Link to={`/gallery/${g.id}`}>{g.attributes.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GalleryList;
