import StaticRequest from '@api/dto/staticRequest';
import { movieQueries } from '@api/hooks/movieQueries';
import CardPoster from '@components/home/CardPoster';
import { useQuery } from '@tanstack/react-query';
import { getImageUrl } from 'src/utils/image.util';

const RelatedTab = ({ movieId }: { movieId: number }) => {
  const { data } = useQuery(movieQueries.similar(movieId, StaticRequest.baseRequest));

  return (
    <div className='related-grid'>
      {data?.data.results
        .filter((m) => m.backdrop_path)
        .map((m) => (
          <CardPoster key={`related-${m.id}`} img={getImageUrl(m.poster_path, 'w300')} />
        ))}
    </div>
  );
};

export default RelatedTab;
