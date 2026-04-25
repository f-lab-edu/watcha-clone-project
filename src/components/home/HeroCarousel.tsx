import StaticRequest from '@api/dto/staticRequest';
import { nowPlayingQueryOptions } from '@api/hooks/movieQueries';
import Carousel from '@components/Carousel/Carousel';
import HeroCarouselSkeleton from '@components/skeleton/HeroCarouselSkeleton';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

const HeroCarousel = () => {
  const {
    data: heroData,
    isPending,
    isFetching,
  } = useSuspenseQuery(nowPlayingQueryOptions(StaticRequest.baseRequest));
  const contents = heroData.data.results ?? [];

  if (isPending || isFetching) {
    return <HeroCarouselSkeleton />;
  }

  return (
    <div className='carousel-section'>
      <div className='carousel-outer'>
        <Carousel
          loop={true}
          items={contents.map((content, index) => (
            <Link
              to={`/contents/${content.title ? 'movie' : 'tv'}/${content.id}`}
              style={{ cursor: 'pointer' }}>
              <div className='hero'>
                <img
                  src={`https://image.tmdb.org/t/p/w1280${content.backdrop_path}`}
                  className='hero-img'
                  alt={`hero-img-${content.title ? content.title : content.name}`}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
                <div className='hero-overlay'>
                  <div className='hero-content'>
                    <h1 className='hero-title'>{content.title}</h1>
                    <p className='hero-desc'>{content.overview}</p>
                    <button className='hero-btn'>시청하기</button>
                  </div>
                  <div className='hero-counter'>
                    {index + 1} / {contents.length}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        />
      </div>
    </div>
  );
};

export default HeroCarousel;
