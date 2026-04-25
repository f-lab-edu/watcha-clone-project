import { useState } from 'react';

type CardPosterProps = {
  img: string;
  alt: string;
};

const CardPoster = ({ img, alt }: CardPosterProps) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className='card-poster'>
      {!imgLoaded && <div className='skeleton card-poster-skeleton' />}
      <img
        src={img}
        alt={alt}
        className='card-poster-img'
        style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
        onLoad={() => setImgLoaded(true)}
      />
      <div className='card-poster-overlay' />
    </div>
  );
};

export default CardPoster;
