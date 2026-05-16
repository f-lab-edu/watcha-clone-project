import { StaticRequest } from '@watcha/api';
import { topRatedQueryOptions } from '@watcha/queries';
import { Carousel } from '@watcha/ui';
import CarouselSection from '@components/swiper/CarouselSection';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

import CardPoster from './CardPoster';

const TopRatedSection = () => {
  const { data: topRatedData } = useSuspenseQuery(topRatedQueryOptions(StaticRequest.baseRequest));
  const contents = topRatedData.results ?? [];

  return (
    <CarouselSection title='오늘의 TOP 10'>
      <Carousel
        breakpoints={{
          320: { slidesPerView: 2, slidesPerGroup: 2 },
          640: { slidesPerView: 3, slidesPerGroup: 3 },
          1024: { slidesPerView: 6, slidesPerGroup: 6 },
        }}
        gap={10}
        items={contents.map((m, i) => (
          <Link key={m.id} to={`/contents/${m.title ? 'movie' : 'tv'}/${m.id}`}>
            <div className='rank-card'>
              <div className='rank-number'>{i + 1}</div>
              <CardPoster
                img={`https://image.tmdb.org/t/p/w342${m.poster_path}`}
                alt={`top-rated-poster-${m.title ? m.title : m.name}`}
              />
            </div>
          </Link>
        ))}
      />
    </CarouselSection>
  );
};

export default TopRatedSection;
