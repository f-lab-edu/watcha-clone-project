import StaticRequest from '@api/dto/staticRequest';
import { movieQueries } from '@api/hooks/movieQueries';
import ListSkeleton from '@components/skeleton/ListSkeleton';
import SwiperSection from '@components/swiper/SwiperSection';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { SwiperSlide } from 'swiper/react';
import CardPoster from './CardPoster';

const TopRatedSection = () => {
  const { data: topRatedData, isPending } = useQuery(
    movieQueries.topRated(StaticRequest.baseRequest),
  );
  const contents = topRatedData?.data.results ?? [];

  return (
    <>
      {isPending || contents.length === 0 ? (
        <ListSkeleton />
      ) : (
        <SwiperSection title='오늘의 TOP 10'>
          {contents.map((m, i) => (
            <SwiperSlide key={`swiper-slide-${m.id}`} className='swiper-slide'>
              <Link to={`/movie/${m.id}`}>
                <div className='rank-card'>
                  <div className='rank-number'>{i + 1}</div>
                  <CardPoster img={`https://image.tmdb.org/t/p/w342${m.poster_path}`} />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </SwiperSection>
      )}
    </>
  );
};

export default TopRatedSection;
