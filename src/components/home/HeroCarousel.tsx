import StaticRequest from '@api/dto/staticRequest';
import { movieQueries } from '@api/hooks/movieQueries';
import Carousel from '@components/Carousel/Carousel';
import HeroCarouselSkeleton from '@components/skeleton/HeroCarouselSkeleton';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

import 'swiper/css';

const HeroCarousel = () => {
  const { data: heroData, isPending } = useQuery(
    movieQueries.nowPlaying(StaticRequest.baseRequest),
  );
  const contents = heroData?.data.results ?? [];

  return (
    <>
      {isPending || contents.length === 0 ? (
        <HeroCarouselSkeleton />
      ) : (
        <div className='carousel-section'>
          <div className='carousel-outer'>
            <Carousel
              loop={true}
              items={contents.map((content, index) => (
                <div key={`hero-swiper-${content.id}`} className='hero'>
                  <img
                    src={`https://image.tmdb.org/t/p/original${content.backdrop_path}`}
                    className='hero-img'
                  />
                  <div className='hero-overlay'>
                    <div className='hero-content'>
                      <h1 className='hero-title'>{content.title}</h1>
                      <p className='hero-desc'>{content.overview}</p>

                      <Link to={`/contents/${content.id}`}>
                        <button className='hero-btn'>시청하기</button>
                      </Link>
                    </div>
                    <div className='hero-counter'>
                      {index + 1} / {contents.length}
                    </div>
                  </div>
                </div>
              ))}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HeroCarousel;
