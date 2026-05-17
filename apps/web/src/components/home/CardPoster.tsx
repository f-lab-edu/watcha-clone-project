import ImageComp from '@components/image/ImageComp';

type CardPosterProps = {
  img: string;
  alt: string;
};

const CardPoster = ({ img, alt }: CardPosterProps) => {
  return (
    <div className='card-poster'>
      <ImageComp src={img} alt={alt} className='card-poster-img' />
      <div className='card-poster-overlay' />
    </div>
  );
};

export default CardPoster;
