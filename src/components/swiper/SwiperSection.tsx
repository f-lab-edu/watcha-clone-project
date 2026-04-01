import { Navigation } from "swiper/modules";
import { Swiper } from "swiper/react";

import { useRef, useState } from "react";

type SwiperSectionProps = {
  children: React.ReactNode;
  title: string;
}

const SwiperSection = ({children, title}: SwiperSectionProps) => {
   const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<any>(null);  

  return (
    <div className='carousel-section'>
        <div className='section-header'>
          <span className='section-title'>{title}</span>
        </div>
        <div className='carousel-wrapper'>
          <Swiper
            modules={[Navigation]}
            spaceBetween={8}
            breakpoints={{
              320: { slidesPerView: 2, slidesPerGroup: 2 },
              640: { slidesPerView: 3, slidesPerGroup: 3 },
              1024: { slidesPerView: 6, slidesPerGroup: 6 },
            }}
            watchOverflow={true}
            normalizeSlideIndex={true}
            onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          >
            {children}
          </Swiper>
        {!isBeginning && (
          <button type={'button'} className="arrow arrow-left"  onClick={() => swiperRef.current?.slidePrev()}>
            ‹
          </button>
        )}
        {!isEnd && (
          <button type={'button'} className="arrow arrow-right"  onClick={() => swiperRef.current?.slideNext()}>
            ›
          </button>
        )}
        </div>
      </div>
  );
}

export default SwiperSection;