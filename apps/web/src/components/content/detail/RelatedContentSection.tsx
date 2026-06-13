import StaticRequest from '@api/dto/staticRequest';
import { movieSimilarQueryOptions } from '@api/hooks/movieQueries';
import { videoSimilarQueryOptions } from '@api/hooks/videoQueries';
import CardPoster from '@components/home/CardPoster';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { getImageUrl } from 'src/utils/image.util';

const RelatedTab = ({ movieId, type }: { movieId: number; type: 'movie' | 'tv' }) => {
  const { data: relatedData } = useSuspenseQuery(
    type === 'movie'
      ? movieSimilarQueryOptions(movieId, StaticRequest.baseRequest)
      : videoSimilarQueryOptions(movieId, StaticRequest.baseRequest),
  );

  return (
    <div className='related-grid'>
      {relatedData.results
        .filter((m) => m.backdrop_path)
        .map((m) => (
          <Link to={`/contents/${m.title ? 'movie' : 'tv'}/${m.id}`}>
            <CardPoster
              key={`${m.id}`}
              img={getImageUrl(m.poster_path, 'w300')}
              alt={`related-card-poster-${m.title ? m.title : m.name}`}
            />
          </Link>
        ))}
    </div>
  );
};

export default RelatedTab;
