import StaticRequest from '@api/dto/staticRequest';
import { movieQueries } from '@api/hooks/movieQueries';
import { useMovieListByGenre } from '@api/hooks/useMovies';
import ListSkeleton from '@components/skeleton/ListSkeleton';
import SwiperSection from '@components/swiper/SwiperSection';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { SwiperSlide } from 'swiper/react';

import { getImageUrl } from 'src/utils/image.util';
import CardPoster from './CardPoster';

const MovieGenreList = () => {
  const { data: genresData, isPending: isGenresPending } = useQuery(
    movieQueries.genres(StaticRequest.baseRequest),
  );
  const genres = (genresData?.data.genres ?? []).slice(0, 5);
  const { data: movieList, isPending: isMovieListPending } = useMovieListByGenre(
    genres.map((g) => g.id),
    StaticRequest.baseRequest,
  );

  return (
    <>
      {isGenresPending || isMovieListPending ? (
        <ListSkeleton />
      ) : (
        <>
          {movieList.map(
            (list, id) =>
              list && (
                <SwiperSection title={genres[id].name}>
                  {list.map((m) => (
                    <SwiperSlide
                      key={`swiper-slide-${genres[id].name}-${m.id}`}
                      className='swiper-slide'>
                      <Link to={`/contents/${m.id}`}>
                        <CardPoster img={getImageUrl(m.poster_path, 'w342')} />
                      </Link>
                    </SwiperSlide>
                  ))}
                </SwiperSection>
              ),
          )}
        </>
      )}
    </>
  );
};

export default MovieGenreList;
