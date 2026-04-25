import StaticRequest from '@api/dto/staticRequest';
import { genresQueryOptions } from '@api/hooks/videoQueries';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import GenreCarousel from './GenreCarousel';

const GenreSection = () => {
  const {
    data: movieData,
    isPending: isMoviePending,
    isFetching: isMovieFetching,
  } = useQuery(genresQueryOptions('movie', StaticRequest.baseRequest));
  const {
    data: tvData,
    isPending: isTvPending,
    isFetching: isTvFetching,
  } = useQuery(genresQueryOptions('tv', StaticRequest.baseRequest));

  return (
    <div>
      <div className='sp-section'>
        <div className='sp-section-header'>
          <span className='sp-section-title'>영화 장르</span>
          <Link to='/genre/movie' className='sp-more-btn'>
            모두 보기
          </Link>
        </div>
        <GenreCarousel type='movie' items={movieData?.data.genres ?? []} ranDomIndex={10} />
      </div>

      <div className='sp-section'>
        <div className='sp-section-header'>
          <span className='sp-section-title'>TV 장르</span>
          <Link to='/genre/tv' className='sp-more-btn'>
            모두 보기
          </Link>
        </div>
        <GenreCarousel type='tv' items={tvData?.data.genres ?? []} ranDomIndex={3} />
      </div>
    </div>
  );
};

export default GenreSection;
