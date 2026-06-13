import ImageComp from '@components/image/ImageComp';
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
      <ImageComp src={img} alt={alt} className='card-poster-img' />
      <div className='card-poster-overlay' />
    </div>
  );
};

export default CardPoster;
