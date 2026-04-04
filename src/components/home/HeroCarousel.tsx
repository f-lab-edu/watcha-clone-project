import { useRef } from 'react';
import { Link } from 'react-router';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import StaticRequest from '@api/dto/staticRequest';
import { movieQueries } from '@api/hooks/movieQueries';
import HeroCarouselSkeleton from '@components/skeleton/HeroCarouselSkeleton';
import { useQuery } from '@tanstack/react-query';
import 'swiper/css';

const HeroCarousel = () => {
  const { data: heroData, isPending } = useQuery(
    movieQueries.nowPlaying(StaticRequest.baseRequest),
  );
  const contents = heroData?.data.results ?? [];

  const swiperRef = useRef<SwiperRef>(null);
  return (
    <>
      {isPending || contents.length === 0 ? (
        <HeroCarouselSkeleton />
      ) : (
        <div className='carousel-section'>
          <div className='carousel-outer'>
            <Swiper
              ref={swiperRef}
              slidesPerView={1}
              loop
              modules={[Autoplay, Pagination, Navigation]}
              autoplay={{
                delay: 4000,
                pauseOnMouseEnter: true,
              }}
              navigation={{
                nextEl: '.next-right',
                prevEl: '.prev-left',
              }}
              observer
              observeParents>
              {contents.map((content, index) => (
                <SwiperSlide key={`hero-swiper-${content.id}`}>
                  <div className='hero'>
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
                </SwiperSlide>
              ))}
            </Swiper>

            <button className='prev-left arrow arrow-left'>{'<'}</button>
            <button className='next-right arrow arrow-right'>{'>'}</button>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroCarousel;
