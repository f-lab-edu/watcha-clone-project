import StaticRequest from '@api/dto/staticRequest';
import { useMovieListByGenre } from '@api/hooks/useMovies';
import Carousel from '@components/Carousel/Carousel';
import ListSkeleton from '@components/skeleton/ListSkeleton';
import CarouselSection from '@components/swiper/CarouselSection';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

import { genresQueryOptions } from '@api/hooks/videoQueries';
import CardPoster from './CardPoster';

const MovieGenreList = () => {
  const { data: genresData, isPending: isGenresPending } = useSuspenseQuery(
    genresQueryOptions('movie', StaticRequest.baseRequest),
  );
  const genres = (genresData.data.genres ?? []).slice(0, 5);
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
                <CarouselSection title={genres[id].name}>
                  <Carousel
                    breakpoints={{
                      320: { slidesPerView: 2, slidesPerGroup: 2 },
                      640: { slidesPerView: 3, slidesPerGroup: 3 },
                      1024: { slidesPerView: 6, slidesPerGroup: 6 },
                    }}
                    gap={10}
                    items={list.map((m) => (
                      <Link to={`/contents/${m.title ? 'movie' : 'tv'}/${m.id}`}>
                        <CardPoster
                          img={`https://image.tmdb.org/t/p/w342${m.poster_path}`}
                          alt={`${genres[id].name}-genre-poster-${m.title ? m.title : m.name}`}
                        />
                      </Link>
                    ))}
                  />
                </CarouselSection>
              ),
          )}
        </>
      )}
    </>
  );
};

export default MovieGenreList;
