import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import { SearchRequest } from '../../api/dto/searchRequest';
import { useNowPlaying } from '../../api/hooks/useMovies';
import { Content } from '../../types/content';

import { Link } from 'react-router';
import 'swiper/css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const HeroCarousel = () => {
  const { data: nowPlayingData } = useNowPlaying(new SearchRequest());
  const swiperRef = useRef<SwiperRef>(null);

  const [slides, setSlides] = useState<Content[] | null>(null);

  useEffect(() => {
    const slideList = nowPlayingData?.data?.results ?? [];
    setSlides(slideList.length > 0 ? slideList.slice(0, 10) : []);
  }, [nowPlayingData]);

  return (
    <>
      <div className='carousel-section'>
        <div className='carousel-outer'>
          {slides && slides.length > 0 && (
              <Swiper
                ref={swiperRef}
                slidesPerView={1}
                loop
                modules={[Autoplay, Pagination, Navigation]}
                autoplay={{
                  delay: 4000,
                  // disableOnInteraction: false, // 터치 후에도 계속 자동
                  pauseOnMouseEnter: true, // 마우스 올리면 멈춤 (PC UX 좋음)
                }}
                navigation={{
                  nextEl: '.next-right',
                  prevEl: '.prev-left',
                }}
                observer
                observeParents
                >
                {slides?.map((slide, index) => (
                  <SwiperSlide key={slide.id}>
                    <div className='hero'>
                      {/* 배경 이미지 */}
                      <img
                        src={`https://image.tmdb.org/t/p/original${slide.backdrop_path}`}
                        className='hero-img'
                      />

                      {/* 오버레이 */}
                      <div className='hero-overlay'>
                        <div className='hero-content'>
                          <h1 className='hero-title'>{slide.title}</h1>
                          <p className='hero-desc'>{slide.overview}</p>

                          <Link to={`/contents/${slide.id}`}>
                            <button className='hero-btn'>시청하기</button>
                          </Link>
                        </div>

                        {/* 우측 하단 카운터 */}
                        <div className='hero-counter'>
                          {index + 1} / {slides.length}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

          <button className='prev-left arrow arrow-left'>{'<'}</button>
          <button className='next-right arrow arrow-right'>{'>'}</button>
        </div>
      </div>
    </>
  );
};

export default HeroCarousel;
