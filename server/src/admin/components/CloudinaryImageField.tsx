import React from 'react';

type Props = {
  value?: {
    url: string;
    name?: string;
  };
};

const CloudinaryImageField: React.FC<Props> = ({ value }) => {
  if (!value?.url) return null;

  return (
    <img
      src={value.url}
      alt={value.name || '이미지'}
      style={{
        maxWidth: '180px',
        objectFit: 'contain',
        borderRadius: '8px',
        marginTop: '0.5rem',
      }}
    />
  );
};

export default CloudinaryImageField;
