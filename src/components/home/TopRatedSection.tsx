import StaticRequest from '@api/dto/staticRequest';
import { movieQueries } from '@api/hooks/movieQueries';
import ListSkeleton from '@components/skeleton/ListSkeleton';
import SwiperSection from '@components/swiper/SwiperSection';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { SwiperSlide } from 'swiper/react';

import { getImageUrl } from 'src/utils/image.util';
import CardPoster from './CardPoster';

const TopRatedSection = () => {
  const {
    data: topRatedData,
    isPending,
    isFetching,
  } = useQuery(movieQueries.topRated(StaticRequest.baseRequest));
  const contents = topRatedData?.data.results ?? [];

  if (isPending || isFetching) {
    return <ListSkeleton />;
  }

  return (
    <SwiperSection title='오늘의 TOP 10'>
      {contents.map((m, i) => (
        <SwiperSlide key={`swiper-slide-${m.id}`} className='swiper-slide'>
          <Link to={`/contents/${m.id}`}>
            <div className='rank-card'>
              <div className='rank-number'>{i + 1}</div>
              <CardPoster img={getImageUrl(m.poster_path, 'w342')} />
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </SwiperSection>
  );
};

export default TopRatedSection;
