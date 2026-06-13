import noImg from '@assets/images/no-img.png';
import { useEffect, useState } from 'react';

type ImageCompProps = {
  src: string;
  alt: string;
  className?: string;
};

// TODO fallback, retry, prefetch 추가 필요
const ImageComp = ({ src, alt, className }: ImageCompProps) => {
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => setImageSrc(src);
    image.onerror = () => setImageSrc(noImg);

    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [src]);

  if (!imageSrc) {
    return <div className='skeleton card-poster-skeleton' />;
  }

  return <img src={imageSrc} alt={alt} className={className} />;
};

export default ImageComp;
