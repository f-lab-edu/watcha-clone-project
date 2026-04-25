import StaticRequest from '@api/dto/staticRequest';
import { contentListByGenreQueryOptions, genresQueryOptions } from '@api/hooks/videoQueries';
import CardPoster from '@components/home/CardPoster';
import ListSkeleton from '@components/skeleton/ListSkeleton';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Genre } from 'src/types/content';
import { getImageUrl } from 'src/utils/image.util';
import NotFound from './NotFound';

const SearchTag = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeGenreFilter, setActiveGenreFilter] = useState<Genre | null>(null);

  const type = searchParams.get('type') as 'movie' | 'tv';
  const genreId = Number(searchParams.get('ids'));

  // TODO 무한 스크롤
  const { data, isPending, isFetching, isError } = useSuspenseQuery(
    contentListByGenreQueryOptions(type, genreId, StaticRequest.baseRequest),
  );

  const {
    data: genreData,
    isPending: isMoviePending,
    isFetching: isMovieFetching,
  } = useSuspenseQuery(genresQueryOptions(type, StaticRequest.baseRequest));

  useEffect(() => {
    if (!genreData) {
      return;
    }

    const foundGenre = genreData.data.genres.find((g) => g.id === Number(searchParams.get('ids')));
    if (foundGenre) {
      setActiveGenreFilter(foundGenre);
    }
  }, [genreData]);

  if ((type !== 'movie' && type !== 'tv') || Number.isNaN(genreId) || isError) {
    return <NotFound type='ERROR' />;
  }

  return (
    <div className='sp-root'>
      <div className='sp-genre-header'>
        <div className='sp-genre-page-title'>{type === 'movie' ? '영화' : 'TV'}</div>
      </div>

      <div className='sp-filter-row'>
        {genreData.data.genres.map((g) => (
          <button
            key={`filter-tab-${g.id}`}
            className={`sp-filter-chip ${activeGenreFilter?.id === g.id ? 'active' : ''}`}
            onClick={() => {
              setActiveGenreFilter((prev) => (prev?.id !== g.id ? g : prev));
              setSearchParams(`ids=${g.id}&type=${type}`);
            }}>
            {g.name}
          </button>
        ))}
      </div>

      {isPending || isFetching ? (
        <ListSkeleton />
      ) : (
        <div className='sp-poster-grid'>
          {data.data.results.map((content) => (
            <Link to={`/contents/${content.title ? 'movie' : 'tv'}/${content.id}`}>
              <CardPoster
                key={`search-tag-${content.id}`}
                img={getImageUrl(content.poster_path, 'w300')}
                alt={`search-list-poster-${content.title ? content.title : content.name}`}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchTag;
