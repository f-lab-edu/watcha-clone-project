import { StaticRequest } from '@watcha/api';
import { genresQueryOptions } from '@watcha/queries';
import NotFound from '@pages/NotFound';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { getPatterBackGround } from '@utils/style.util';

const GenreList = () => {
  const { type } = useParams();
  const { data: genresData } = useSuspenseQuery(
    genresQueryOptions(type as 'movie' | 'tv', StaticRequest.baseRequest),
  );

  if (type !== 'movie' && type !== 'tv') {
    return <NotFound type='404' />;
  }

  return (
    <div className='ga-root'>
      <h1 className='ga-title'>{type === 'movie' ? '비디오' : 'TV'} 장르</h1>
      <div className='ga-grid'>
        {genresData.genres.map((g, index) => (
          <div
            key={`${type}-${g.id}`}
            className='ga-card'
            // onClick={() => navigate(`/search?genre=${genre.label}`)}
          >
            <div
              className='ga-card-bg'
              style={{
                ...getPatterBackGround(index),
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right center',
                backgroundSize: '55% auto',
              }}
            />
            <span className='ga-card-label'>{g.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreList;
