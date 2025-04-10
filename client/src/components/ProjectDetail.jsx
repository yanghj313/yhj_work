import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjects } from '../api';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (id) {
      getProjects().then((projects) => {
        const found = projects.find((p) => p.id === parseInt(id));
        setProject(found);
      });
    }
  }, [id]);

  if (!project) return <p>Loading...</p>;

  const { title, description } = project.attributes;

  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default ProjectDetail;
