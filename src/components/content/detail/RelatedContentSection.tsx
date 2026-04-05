import StaticRequest from '@api/dto/staticRequest';
import { movieQueries } from '@api/hooks/movieQueries';
import CardPoster from '@components/home/CardPoster';
import { useQuery } from '@tanstack/react-query';

const RelatedTab = ({ movieId }: { movieId: number }) => {
  const { data } = useQuery(movieQueries.similar(movieId, StaticRequest.baseRequest));

  return (
    <div className='related-grid'>
      {data?.data.results
        .filter((m) => m.backdrop_path)
        .map((m) => (
          <CardPoster
            key={`related-${m.id}`}
            img={`https://image.tmdb.org/t/p/w300${m.poster_path}`}
          />
        ))}
    </div>
  );
};

export default RelatedTab;
